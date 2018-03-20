const fs = require("fs")
const path = require("path")
const axios = require("axios")
const jschardet = require("jschardet")
const Iconv = require("iconv").Iconv
const cheerio = require("cheerio")
const co = require("co")
const { argv } = require("yargs")

const request = axios.create({
    "responseType": "arraybuffer",
    "timeout": 30000,
})

const ascii_bold = "\u001b[1m"
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
const console_bold = text => {
    return `${ascii_bold}${text}${ascii_reset}`
}

const parse_data = async (parser, data) => {
    if (parser.format === "jsonp") {
        if (parser.setup_callback) {
            parser.setup_callback()
        }
        // JSONPの場合はevalすればobjectになる
        return parser.parse(eval(data))
    }
    // HTMLを解析
    const $ = cheerio.load(data)
    // スクレイピング
    return await parser.parse($)
}

const sleep = ms => {
    return input => {
        setTimeout(input, ms)
    };
}

// 全銘柄のパーサーを読み込み
fs.readdir("stocks", (err, directories) => {
    directories.forEach(dirname => {
        fs.readdir(`stocks/${dirname}`, (err, filenames) => {
            filenames.forEach(filename => {
                const path = `./stocks/${dirname}/${filename}`
                const stock = require(path)

                // 特定の銘柄だけ取得する場合
                if(argv.code) {
                    if(stock.code !== parseInt(argv.code)){
                        return
                    }
                }

                for (const parser of stock.parsers) {
                    co(function* () {
                        for (const target_url of parser.targets) {
                            request
                                .get(target_url, {
                                    // 文字コードの自動変換
                                    "transformResponse": [
                                        data => {
                                            if (parser.transformResponse) {
                                                // 独自定義の変換処理がある場合
                                                return parser.transformResponse(data)
                                            }
                                            // それ以外はエンコーディングを自動判別してutf-8に変換
                                            const { encoding } = jschardet.detect(data)
                                            const iconv = new Iconv(encoding, "UTF-8//IGNORE//TRANSLIT")
                                            return iconv.convert(data).toString()
                                        }
                                    ]
                                })
                                .then(async response => {
                                    const { data } = response
                                    try {
                                        const news = await parse_data(parser, data)
                                        console.log(target_url, news.length + "件")
                                    } catch (error) {
                                        console.log(console_bold(stock.code) + " " + console_red_bold(error.toString()))
                                    }
                                })
                                .catch(error => {
                                    console.log(error)
                                    console.log(console_bold(stock.code) + " " + console_red_bold(error.toString()) + target_url)
                                })
                            yield sleep(1000)
                        }
                    })
                }
            })
        })
    });
})