module.exports = {
    "code": 1407,
    "name": "ウエストHD",
    "parsers": [
        {
            "targets": [
                "http://www.west-gr.co.jp/news/?nen=2018",
                "http://www.west-gr.co.jp/news/?nen=2017",
                "http://www.west-gr.co.jp/news/?nen=2016",
                "http://www.west-gr.co.jp/news/?nen=2015",
                "http://www.west-gr.co.jp/news/?nen=2014",
                "http://www.west-gr.co.jp/news/?nen=2013",
                "http://www.west-gr.co.jp/news/?nen=2012",
                "http://www.west-gr.co.jp/news/?nen=2011",
                "http://www.west-gr.co.jp/news/?nen=2010",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $dl = $("#main > ul > li > dl")
                $dl.each((index, element) => {
                    const $element = $(element)
                    const $a = $element.find("dd > a")
                    const url = "http://www.west-gr.co.jp" + $a.attr("href")
                    const title = $a.text().trim()

                    const date = new Date($element.find("dt").text().replace(/\./g, "/"))

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