module.exports = {
    "code": 1333,
    "name": "極洋",
    "parsers": [
        {
            "targets": [
                "https://www.maruha-nichiro.co.jp/corporate/news_center/news_topics/2018/",
                "https://www.maruha-nichiro.co.jp/corporate/news_center/news_topics/2017/",
                "https://www.maruha-nichiro.co.jp/corporate/news_center/news_topics/2016/",
                "https://www.maruha-nichiro.co.jp/corporate/news_center/news_topics/2015/",
                "https://www.maruha-nichiro.co.jp/corporate/news_center/news_topics/2014/",
                "https://www.maruha-nichiro.co.jp/corporate/news_center/news_topics/2013/",
                "https://www.maruha-nichiro.co.jp/corporate/news_center/news_topics/2012/",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $li = $("#newsArchives").find("ul.newsList > li")
                $li.each((index, element) => {
                    const $a = $(element).find("a")
                    const url = "https://www.maruha-nichiro.co.jp" + $a.attr("href")
                    const date = new Date($($a).find("div > i").text().split(" ")[0])
                    const title = $($a).find("div > p").text().trim()

                    if (typeof title !== "string") {
                        throw new Error("タイトルを取得できません")
                    }
                    if (!(date instanceof Date)) {
                        throw new Error("日付を取得できません")
                    }

                    result.push({ title, url, date })
                })
                return result
            }
        }
    ]
}