module.exports = {
    "code": 1605,
    "name": "国際石油開発帝石",
    "parsers": [
        {
            "targets": [
                "http://www.inpex.co.jp/news/index.html",
                "http://www.inpex.co.jp/news/news2016.html",
                "http://www.inpex.co.jp/news/news2015.html",
                "http://www.inpex.co.jp/news/news2014.html",
                "http://www.inpex.co.jp/news/news2013.html",
                "http://www.inpex.co.jp/news/news2012.html",
                "http://www.inpex.co.jp/news/news2011.html",
                "http://www.inpex.co.jp/news/news2010.html",
                "http://www.inpex.co.jp/news/news2009.html",
                "http://www.inpex.co.jp/news/news2008.html",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $tr = $("#releases > .entry > table > tbody > tr")
                $tr.each((index, element) => {
                    const $element = $(element)
                    const date = new Date($element.find("th").text())

                    const $td = $element.find("td")
                    if ($td.length !== 2) {
                        return
                    }
                    const $a = $($td[1]).find("a")
                    const title = $a.text().trim()
                    const url = "http://www.inpex.co.jp/news/" + $a.attr("href")

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