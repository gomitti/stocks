module.exports = {
    "code": 1381,
    "name": "アクシーズ",
    "parsers": [
        {
            "targets": [
                "http://www.axyz-grp.co.jp/info/2018",
                "http://www.axyz-grp.co.jp/info/2017",
                "http://www.axyz-grp.co.jp/info/2016",
                "http://www.axyz-grp.co.jp/info/2015",
                "http://www.axyz-grp.co.jp/info/2014",
                "http://www.axyz-grp.co.jp/info/2013",
                "http://www.axyz-grp.co.jp/info/2012",
                "http://www.axyz-grp.co.jp/info/2011",
                "http://www.axyz-grp.co.jp/info/2010",
                "http://www.axyz-grp.co.jp/info/2009",
                "http://www.axyz-grp.co.jp/info/2008",
                "http://www.axyz-grp.co.jp/info/2007",
                "http://www.axyz-grp.co.jp/info/2006",
                "http://www.axyz-grp.co.jp/info/2005",
                "http://www.axyz-grp.co.jp/info/2004",
                "http://www.axyz-grp.co.jp/info/2003",
                "http://www.axyz-grp.co.jp/info/2002",
                "http://www.axyz-grp.co.jp/info/2001",
                "http://www.axyz-grp.co.jp/info/2000",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $li = $("#contents > article > li")
                $li.each((index, element) => {
                    const $element = $(element)
                    const $a = $element.find("dd > a")
                    const url = $a.attr("href")
                    const title = $a.text().trim()
                    const date_str = $element.find("dt").text().replace(/\./g, "/")
                    const m = date_str.match(/([0-9]+\/[0-9]+\/[0-9]+)/)
                    const date = new Date(m[1])

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