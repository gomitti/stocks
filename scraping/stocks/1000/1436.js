module.exports = {
    "code": 1436,
    "name": "フィット",
    "parsers": [
        {
            "targets": [
                "http://www.xj-storage.jp/public-list/GetList.aspx?company=AS71060&fdate=20181231&pdate=20180101&len=10000&dataID=c7b53c75-1480-41ca-aee3-fa85c7d3cbbc&output=json&callback=callback",
                "http://www.xj-storage.jp/public-list/GetList.aspx?company=AS71060&fdate=20171231&pdate=20170101&len=10000&dataID=c7b53c75-1480-41ca-aee3-fa85c7d3cbbc&output=json&callback=callback",
                "http://www.xj-storage.jp/public-list/GetList.aspx?company=AS71060&fdate=20161231&pdate=20160101&len=10000&dataID=c7b53c75-1480-41ca-aee3-fa85c7d3cbbc&output=json&callback=callback",
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
        },
        {
            "targets": [
                "http://www.fit-group.jp/news/news_type/press_release/",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $dl = $("section.lists > dl")
                $dl.each((index, element) => {
                    const $element = $(element)
                    const date = new Date($element.find("dt").text().trim().replace(/\./g, "/"))
                    const $a = $element.find(".title > a")
                    const title = $a.text().trim()
                    let url = $a.attr("href")

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
                })
                return result
            }
        },
    ]
}