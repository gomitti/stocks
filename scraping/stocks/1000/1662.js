module.exports = {
    "code": 1662,
    "name": "石油資源開発",
    "parsers": [
        {
            "targets": [
                "http://www.japex.co.jp/newsrelease/all/2018/",
                "http://www.japex.co.jp/newsrelease/all/2017/",
                "http://www.japex.co.jp/newsrelease/all/2016/",
                "http://www.japex.co.jp/newsrelease/all/2015/",
                "http://www.japex.co.jp/newsrelease/all/2014/",
                "http://www.japex.co.jp/newsrelease/all/2013/",
                "http://www.japex.co.jp/newsrelease/all/2012/",
                "http://www.japex.co.jp/newsrelease/all/2011/",
                "http://www.japex.co.jp/newsrelease/all/2010/",
                "http://www.japex.co.jp/newsrelease/all/2009/",
                "http://www.japex.co.jp/newsrelease/all/2008/",
                "http://www.japex.co.jp/newsrelease/all/2007/",
                "http://www.japex.co.jp/newsrelease/all/2006/",
                "http://www.japex.co.jp/newsrelease/all/2005/",
                "http://www.japex.co.jp/newsrelease/all/2004/",
                "http://www.japex.co.jp/newsrelease/all/2003/",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $dl = $(".newslist > .wrap > .inner > dl")
                $dl.each((index, element) => {
                    const $element = $(element)

                    let date_str = $element.find(".date").text()
                    date_str = date_str.replace("年", "/")
                    date_str = date_str.replace("月", "/")
                    date_str = date_str.replace("日", "/")
                    const date = new Date(date_str)

                    const $a = $element.find(".body > a")
                    const title = $a.text().trim()
                    const url = $a.attr("href")

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