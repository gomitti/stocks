module.exports = {
    "code": 1515,
    "name": "日鉄鉱",
    "parsers": [
        {
            "targets": [
                "http://www.nittetsukou.co.jp/cms/press_2018.html",
                "http://www.nittetsukou.co.jp/cms/press_2017.html",
                "http://www.nittetsukou.co.jp/cms/press_2016.html",
                "http://www.nittetsukou.co.jp/cms/press_2015.html",
                "http://www.nittetsukou.co.jp/cms/press_2014.html",
                "http://www.nittetsukou.co.jp/cms/press_2013.html",
                "http://www.nittetsukou.co.jp/cms/press_2012.html",
                "http://www.nittetsukou.co.jp/cms/press_2011.html",
                "http://www.nittetsukou.co.jp/cms/press_2010.html",
                "http://www.nittetsukou.co.jp/cms/press_2009.html",
                "http://www.nittetsukou.co.jp/cms/press_2008.html",
                "http://www.nittetsukou.co.jp/cms/press_2007.html",
                "http://www.nittetsukou.co.jp/cms/press_2006.html",
                "http://www.nittetsukou.co.jp/cms/press_2005.html",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $tr = $("#text > table > tbody > tr")
                $tr.each((index, element) => {
                    const $element = $(element)

                    const date = new Date($element.find("td.date").text().replace(/\./g, "/"))

                    const $a = $element.find("td > a")
                    const title = $a.text().trim()
                    const url = "http://www.nittetsukou.co.jp" + $a.attr("href")

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