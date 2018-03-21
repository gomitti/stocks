const jschardet = require("jschardet")
const iconv = require("iconv-lite")
const cheerio = require("cheerio")
const axios = require("axios")
const co = require("co")
const fs = require("fs")

const request = axios.create({
    "responseType": "arraybuffer",
    "timeout": 30000,
})

const sleep = ms => {
    return input => {
        setTimeout(input, ms)
    };
}

const kabuben = [
    {
        "code": 1000,
        "url": "http://kabuben.com/stockhomepage/1000watch/"
    },
    {
        "code": 2000,
        "url": "http://kabuben.com/stockhomepage/2000watch/"
    },
    {
        "code": 3000,
        "url": "http://kabuben.com/stockhomepage/3000watch/"
    },
    {
        "code": 4000,
        "url": "http://kabuben.com/stockhomepage/4000watch/"
    },
    {
        "code": 5000,
        "url": "http://kabuben.com/stockhomepage/5000watch/"
    },
    {
        "code": 6000,
        "url": "http://kabuben.com/stockhomepage/6000watch/"
    },
    {
        "code": 7000,
        "url": "http://kabuben.com/stockhomepage/7000watch/"
    },
    {
        "code": 8000,
        "url": "http://kabuben.com/stockhomepage/8000watch/"
    },
    {
        "code": 9000,
        "url": "http://kabuben.com/stockhomepage/9000watch/"
    }
]

co(function* () {
    for (const page of kabuben) {
        try {
            fs.mkdirSync(`stocks/${page.code}`)
        } catch (error) {

        }
        request
            .get(page.url, {
                // 文字コードの自動変換
                "transformResponse": [
                    data => {
                        const { encoding } = jschardet.detect(data)
                        return iconv.decode(data, encoding, "UTF-8//IGNORE//TRANSLIT")
                    }
                ]
            })
            .then(response => {
                const $ = cheerio.load(response.data)
                const $tr = $("#GridView1 > tbody > tr")

                $tr.each((index, element) => {
                    if (index === 0) {
                        return
                    }
                    const $element = $(element)
                    const $td = $element.find("td")
                    const $span = $($td[0]).find("span")
                    const code = $($span[0]).text()
                    const campany_name = $($span[1]).text()
                    console.log(code, campany_name)

                    fs.writeFileSync(
                        `stocks/${page.code}/${code}.js`,
`module.exports = {
    "code": ${code},
    "name": "${campany_name}",
    "targets": [
        "",
    ],
}`,
                        err => {
                            if (err) {
                                throw err
                            }
                        })
                })
            })
            .catch(error => {
                console.log(error)
            })
        yield sleep(1000)
    }
})