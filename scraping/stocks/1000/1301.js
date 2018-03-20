module.exports = {
    "code": 1301,
    "name": "極洋 ",
    "parsers": [
        {
            "targets": [
                "http://www.kyokuyo.co.jp/news/",
                "http://www.kyokuyo.co.jp/news/page/2/",
                "http://www.kyokuyo.co.jp/news/page/3/",
                "http://www.kyokuyo.co.jp/news/page/4/",
                "http://www.kyokuyo.co.jp/news/page/5/",
                "http://www.kyokuyo.co.jp/news/page/6/",
                "http://www.kyokuyo.co.jp/news/page/7/",
                "http://www.kyokuyo.co.jp/news/page/8/",
                "http://www.kyokuyo.co.jp/news/page/9/",
                "http://www.kyokuyo.co.jp/news/page/10/",
                "http://www.kyokuyo.co.jp/news/page/11/",
                "http://www.kyokuyo.co.jp/news/page/12/",
                "http://www.kyokuyo.co.jp/news/page/13/",
                "http://www.kyokuyo.co.jp/news/page/14/",
                "http://www.kyokuyo.co.jp/news/page/15/",
                "http://www.kyokuyo.co.jp/news/page/16/",
                "http://www.kyokuyo.co.jp/news/page/17/",
                "http://www.kyokuyo.co.jp/news/page/18/",
                "http://www.kyokuyo.co.jp/news/page/19/",
                "http://www.kyokuyo.co.jp/news/page/20/",
                "http://www.kyokuyo.co.jp/news/page/21/",
                "http://www.kyokuyo.co.jp/news/page/22/",
                "http://www.kyokuyo.co.jp/news/page/23/",
                "http://www.kyokuyo.co.jp/news/page/24/",
                "http://www.kyokuyo.co.jp/news/page/25/",
                "http://www.kyokuyo.co.jp/news/page/26/",
                "http://www.kyokuyo.co.jp/news/page/27/",
                "http://www.kyokuyo.co.jp/news/page/28/"
            ],
            "format": "html",
            "parse": $ => {
                const result = []
                const $tr = $("main").find("table.posts > tbody > tr")
                $tr.each((index, element) => {
                    const $td = $(element).find("td")
                    const date = new Date($($td[0]).find("time").attr("datetime"))
                    const $a = $($td[2]).find("a")
                    const title = $a.text()

                    if (typeof title !== "string") {
                        throw new Error("タイトルを取得できません")
                    }
                    if (!(date instanceof Date)) {
                        throw new Error("日付を取得できません")
                    }

                    const url = $a.attr("href")
                    result.push({ title, url, date })
                })
                return result
            }
        }
    ]
}