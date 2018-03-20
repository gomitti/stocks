module.exports = {
    "code": 1435,
    "name": "インベスターズクラウド",
    "parsers": [
        {
            "targets": [
                "https://www.xj-storage.jp/public-list/GetList.aspx?company=AS02693&fdate=20181231&pdate=20180101&len=10000&output=json&callback=callback",
                "https://www.xj-storage.jp/public-list/GetList.aspx?company=AS02693&fdate=20171231&pdate=20170101&len=10000&output=json&callback=callback",
                "https://www.xj-storage.jp/public-list/GetList.aspx?company=AS02693&fdate=20161231&pdate=20160101&len=10000&output=json&callback=callback",
                "https://www.xj-storage.jp/public-list/GetList.aspx?company=AS02693&fdate=20151231&pdate=20150101&len=10000&output=json&callback=callback",
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