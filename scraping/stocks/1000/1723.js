module.exports = {
    "code": 1723,
    "name": "日本電技",
    "parsers": [
        {
            "targets": [
                "http://www.nihondengi.co.jp/investor/ir_news/",
                "http://www.nihondengi.co.jp/investor/ir_news/2017/",
                "http://www.nihondengi.co.jp/investor/ir_news/2016/",
                "http://www.nihondengi.co.jp/investor/ir_news/2015/",
                "http://www.nihondengi.co.jp/investor/ir_news/2014/",
                "http://www.nihondengi.co.jp/investor/ir_news/2013/",
                "http://www.nihondengi.co.jp/investor/ir_news/2012/",
                "http://www.nihondengi.co.jp/investor/ir_news/2011/",
                "http://www.nihondengi.co.jp/investor/ir_news/2010/",
                "http://www.nihondengi.co.jp/investor/ir_news/2009/",
                "http://www.nihondengi.co.jp/investor/ir_news/2008/",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $li = $(".typeA > li")
                $li.each((index, element) => {
                    const $element = $(element)

                    const $a = $element.find("a")
                    if ($a.length !== 1) {
                        return
                    }
                    const title = $a.text().trim()
                    const url = $a.attr("href").replace("../../", "")

                    $a.remove()
                    const date = new Date($element.text().trim())

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