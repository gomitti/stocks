module.exports = {
    "code": 1720,
    "name": "東急建設",
    "parsers": [
        {
            "targets": [
                "http://www.tokyu-cnst.co.jp/topics/index.html",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2017",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2017&p=2",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2017&p=3",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2016",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2016&p=2",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2015",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2015&p=2",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2015&p=3",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2015&p=4",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2014",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2014&p=2",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2013",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2013&p=2",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2013&p=3",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2012",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2012&p=2",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2011",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2011&p=2",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2011&p=3",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2010",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2010&p=2",
                "http://www.tokyu-cnst.co.jp/topics/index.html?yr=2010&p=3",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $a = $("#contents > .topics_eria > .category > .news > a")
                $a.each((index, element) => {
                    const $element = $(element)

                    const date = new Date($element.find(".data").text().trim().replace(/\./g, "/"))

                    const title = $element.find(".txt").text().trim()
                    const url = "http://www.tokyu-cnst.co.jp" + $element.attr("href")


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