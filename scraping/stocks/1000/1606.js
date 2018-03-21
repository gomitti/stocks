module.exports = {
    "code": 1606,
    "name": "日本海洋掘削",
    "parsers": [
        {
            "targets": [
                "http://www.jdc.co.jp/news/jp/2018/",
                "http://www.jdc.co.jp/news/jp/2017/",
                "http://www.jdc.co.jp/news/jp/2016/",
                "http://www.jdc.co.jp/news/jp/2015/",
                "http://www.jdc.co.jp/news/jp/2014/",
                "http://www.jdc.co.jp/news/jp/2013/",
                "http://www.jdc.co.jp/news/jp/2012/",
                "http://www.jdc.co.jp/news/jp/2011/",
                "http://www.jdc.co.jp/news/jp/2010/",
                "http://www.jdc.co.jp/news/jp/2009/",
                "http://www.jdc.co.jp/news/jp/2008/",
                "http://www.jdc.co.jp/news/jp/2007/",
                "http://www.jdc.co.jp/news/jp/2006/",
                "http://www.jdc.co.jp/news/jp/2005/",
                "http://www.jdc.co.jp/news/jp/2004/",
                "http://www.jdc.co.jp/news/jp/2003/",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $li = $("#news_list > li")
                $li.each((index, element) => {
                    const $element = $(element)
                    const date = new Date($element.find(".date").text().trim().replace(/-/g, "/"))

                    const $a = $element.find("a")
                    const title = $a.text().trim()
                    const url = "http://www.jdc.co.jp" + $a.attr("href")

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
        {
            "targets": [
                "http://v4.eir-parts.net/V4Public/EIR/1606/ja/announcement/announcement_3.js"
            ],
            "format": "jsonp",
            "setup_callback": () => {
                // JSONPの入力をそのまま返す
                global.eolparts_announcement_3 = data => {
                    return data
                }
            },
            "parse": async data => {
                const items = data.item
                if (Array.isArray(items) === false) {
                    throw new Error("ニュースを取得できません")
                }
                const result = []
                for (const item of items) {
                    const date = new Date(item.date)

                    if (typeof item.title !== "string") {
                        throw new Error("タイトルを取得できません")
                    }
                    if (!(date instanceof Date)) {
                        throw new Error("日付を取得できません")
                    }

                    result.push({
                        "title": item.title,
                        "url": item.link,
                        date
                    })
                }
                return result
            }
        }
    ]
}