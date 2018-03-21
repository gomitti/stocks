const fs = require("fs")
const path = require("path")
const axios = require("axios")
const jschardet = require("jschardet")
const iconv = require("iconv-lite")
const { MongoClient } = require("mongodb")
const crypto = require("crypto")
const { argv } = require("yargs")
const jsdiff = require("diff")

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

const sleep = ms => {
    return input => {
        setTimeout(input, ms)
    };
}

const db_url = "mongodb://localhost:27017"
const db_name = "diff"

MongoClient.connect(db_url, function (err, client) {
    const db = client.db(db_name)

    // 全銘柄を読み込み
    fs.readdir("stocks", (err, directories) => {
        directories.forEach(dirname => {
            fs.readdir(`stocks/${dirname}`, (err, filenames) => {
                filenames.forEach(filename => {
                    const path = `./stocks/${dirname}/${filename}`
                    const stock = require(path)

                    // 特定の銘柄だけ取得する場合
                    if (argv.code) {
                        if (stock.code !== parseInt(argv.code)) {
                            return
                        }
                    }

                    for (const target_url of stock.targets) {
                        if (target_url.indexOf("http") !== 0) {
                            continue
                        }
                        request
                            .get(target_url, {
                                // 文字コードの自動変換
                                "transformResponse": [
                                    data => {
                                        const { encoding } = jschardet.detect(data)
                                        let html = iconv.decode(data, encoding, "UTF-8//IGNORE//TRANSLIT")
                                        // タブを消す
                                        html = html.replace(/\t/g, "")
                                        // スペースの連続を消す
                                        html = html.replace(/ {2,}/g, "")
                                        // 開業の連続を消す
                                        html = html.replace(/\n{2,}/g, "\n")
                                        // CDNのキャッシュの時刻などの不要な情報が入っていることがあるので削る
                                        html = html.replace(/<!--.+?-->/g, "")
                                        // javascriptは消す
                                        html = html.replace(/<script[\s\S]+<\/script>/mg, "")
                                        return html.trim()
                                    }
                                ]
                            })
                            .then(async response => {
                                const new_html = response.data
                                const new_hash = crypto.createHash("md5").update(new_html).digest("base64")
                                const collection = db.collection("stocks")
                                const result = await collection.findOne({ "code": stock.code, "url": target_url })
                                if (result === null) {
                                    await collection.insertOne({
                                        "code": stock.code,
                                        "url": target_url,
                                        "hash": new_hash,
                                        "html": new_html
                                    })
                                    console.log(`${console_cyan_bold(stock.code)} ${console_bold(target_url)} ${new_hash}`)
                                    return
                                }

                                await collection.update(
                                    {
                                        "code": stock.code,
                                        "url": target_url
                                    }, {
                                        "code": stock.code,
                                        "url": target_url,
                                        "hash": new_hash,
                                        "html": new_html
                                    }
                                )
                                
                                const old_hash = result.hash
                                if (old_hash !== new_hash) {
                                    const old_html = result.html
                                    const diff = jsdiff.diffLines(old_html, new_html)
                                    diff.forEach(part => {
                                        if (part.added) {
                                            console.log(console_green_bold(`+${part.value}`))
                                        }
                                        if (part.removed) {
                                            console.log(console_red_bold(`-${part.value}`))
                                        }
                                    })
                                    console.log(`${console_cyan_bold(stock.code)} ${console_bold(target_url)} ${old_hash} -> ${console_green_bold(new_hash)}`)
                                } else {
                                    console.log(`${console_cyan_bold(stock.code)} ${console_bold(target_url)} ${new_hash}`)
                                }

                            })
                            .catch(error => {
                                console.log(console_cyan_bold(stock.code) + " " + console_red_bold(error.toString()) + target_url)
                            })
                    }
                })
            })
        })
    })
})
