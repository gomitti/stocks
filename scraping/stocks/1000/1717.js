module.exports = {
    "code": 1717,
    "name": "明豊ファシリティワークス",
    "parsers": [
        {
            "targets": [
                "https://www.meiho.co.jp/ir/news/",
                "https://www.meiho.co.jp/ir/news/y2017/",
                "https://www.meiho.co.jp/ir/news/y2016/",
                "https://www.meiho.co.jp/ir/news/y2015/",
                "https://www.meiho.co.jp/ir/news/y2014/",
                "https://www.meiho.co.jp/ir/news/y2013/",
                "https://www.meiho.co.jp/ir/news/y2012/",
                "https://www.meiho.co.jp/ir/news/y2011/",
                "https://www.meiho.co.jp/ir/news/y2010/",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $tr = $(".newsBlock > dl")
                $tr.each((index, element) => {
                    const $element = $(element)
                    const date = new Date($element.find("dt").text().trim())

                    const $a = $element.find("dd > a")
                    if ($a.length !== 1) {
                        return
                    }
                    const title = $a.text().trim()
                    const url = $a.attr("href").replace("../", "")

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