const fs = require("fs")
const path = require("path")
const axios = require("axios")
const jschardet = require("jschardet")
const Iconv = require("iconv").Iconv
const cheerio = require("cheerio")

const request = axios.create({
    "responseType": "arraybuffer",
    "timeout": 5000,
})

const ascii_red = "\u001b[1;31m"
const ascii_green = "\u001b[1;32m"
const ascii_cyan = "\u001b[1;36m"
const ascii_reset = "\u001b[0m"

const console_green_bold = text => {
    return `${ascii_green}${text}${ascii_reset}`
}
const console_cyan_bold = text => {
    return `${ascii_cyan}${text}${ascii_reset}`
}
const console_red_bold = text => {
    return `${ascii_red}${text}${ascii_reset}`
}

// 全銘柄のパーサーを読み込み
fs.readdir("stocks", (err, directories) => {
    directories.forEach(dirname => {
        fs.readdir(`stocks/${dirname}`, (err, filenames) => {
            filenames.forEach(filename => {
                const stock_path = `./stocks/${dirname}/${filename}`
                const stock = require(stock_path)
                for (const parser of stock.parsers) {
                    request
                        .get(parser.target, {
                            // 文字コードの自動変換
                            "transformResponse": [
                                data => {
                                    if (parser.transformResponse) {
                                        // 独自定義の変換処理がある場合
                                        return parser.transformResponse(data)
                                    }
                                    // それ以外はエンコーディングを自動判別してutf-8に変換
                                    const { encoding } = jschardet.detect(data)
                                    const iconv = new Iconv(encoding, "UTF-8")
                                    return iconv.convert(data).toString()
                                }
                            ]
                        })
                        .then(response => {
                            const { data } = response
                            try {
                                if (parser.before) {
                                    parser.before()
                                }
                                if (parser.format === "jsonp") {
                                    const news = parser.parse(eval(data))
                                    console.log(news.length + "件")
                                    return
                                }
                                const $ = cheerio.load(data)
                                const news = parser.parse($)
                                console.log(news.length + "件")
                            } catch (error) {
                                console.log(console_red_bold(error.toString()))
                            }
                        })
                        .catch(error => {

                        })
                }
            })
        })
    });
})