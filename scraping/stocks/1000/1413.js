module.exports = {
    "code": 1413,
    "name": "桧家HD",
    "parsers": [
        {
            "targets": [
                "http://www.hinokiya-holdings.jp/ir-topics.html",
                "http://www.hinokiya-holdings.jp/ir-topics.html/page/2",
                "http://www.hinokiya-holdings.jp/ir-topics.html/page/3",
                "http://www.hinokiya-holdings.jp/ir-topics.html/page/4",
                "http://www.hinokiya-holdings.jp/ir-topics.html/page/5",
                "http://www.hinokiya-holdings.jp/ir-topics.html/page/6",
                "http://www.hinokiya-holdings.jp/ir-topics.html/page/7",
                "http://www.hinokiya-holdings.jp/ir-topics.html/page/8",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $div = $(".news_area")
                $div.each((index, element) => {
                    const $element = $(element)
                    const date = new Date($element.find(".date > .time").text().trim().replace(/\./g, "/"))
                    const $a = $element.find(".news_txt > a")
                    const title = $a.text().trim()
                    const url = $a.attr("href")

                    if (typeof title !== "string") {
                        throw new Error("タイトルを取得できません")
                    }
                    if (typeof url !== "string") {
                        throw new Error("URLを取得できません")
                    }
                    if (!(date instanceof Date)) {
                        throw new Error("日付を取得できません")
                    }

                    result.push({ title, url, date })
                })
                return result
            }
        },
    ]
}