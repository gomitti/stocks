module.exports = {
    "code": 1716,
    "name": "第一カッター興業",
    "parsers": [
        {
            "targets": [
                "http://www.xj-storage.jp/public-list/GetList.aspx?company=AS92173&len=10000&doctype=1,2,3,4,16,17,18,19,20,21,24,25&output=json&callback=callback",
            ],
            "format": "jsonp",
            "setup_callback": () => {
                // JSONPの入力をそのまま返す
                global.callback = data => {
                    return data
                }
            },
            "parse": async data => {
                const { items } = data
                if (Array.isArray(items) === false) {
                    throw new Error("ニュースを取得できません")
                }
                const result = []
                for (const item of items) {
                    const { title, files } = item
                    const date = new Date(item.publishDate)

                    if (Array.isArray(files) === false || files.length === 0) {
                        continue
                    }
                    const file = files[0]
                    const { url } = file

                    if (typeof title !== "string") {
                        throw new Error("タイトルを取得できません")
                    }
                    if (typeof url !== "string") {
                        throw new Error("URLを取得できません")
                    }
                    if (!(date instanceof Date)) {
                        throw new Error("日付を取得できません")
                    }

                    result.push({ url, title, date })
                }
                return result
            }
        }
    ]
}