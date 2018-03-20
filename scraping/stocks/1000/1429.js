module.exports = {
    "code": 1429,
    "name": "日本アクア",
    "parsers": [
        {
            "targets": [
                "https://www.n-aqua.jp/ir/ir_news/",
                "https://www.n-aqua.jp/ir/ir_news/page/2/",
                "https://www.n-aqua.jp/ir/ir_news/page/3/",
                "https://www.n-aqua.jp/ir/ir_news/page/4/",
                "https://www.n-aqua.jp/ir/ir_news/page/5/",
                "https://www.n-aqua.jp/ir/ir_news/page/6/",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $dl = $(".e_def_news")
                $dl.each((index, element) => {
                    const $element = $(element)
                    const date = new Date($element.find("dt.e_def_news_ttl").text().trim().replace(/\./g, "/"))
                    
                    const $a = $element.find("dd.e_def_news_cnts > a")
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

                    result.push({ url, title, date })
                })
                return result
            }
        },
    ]
}