module.exports = {
    "code": 1401,
    "name": "エムビーエス",
    "parsers": [
        {
            "targets": [
                "http://www.homemakeup.co.jp/category/ir/2018/",
                "http://www.homemakeup.co.jp/category/ir/2017/",
                "http://www.homemakeup.co.jp/category/ir/2016/",
                "http://www.homemakeup.co.jp/category/ir/2015/",
                "http://www.homemakeup.co.jp/category/ir/2014/",
                "http://www.homemakeup.co.jp/category/ir/2013/",
                "http://www.homemakeup.co.jp/category/ir/2012/",
                "http://www.homemakeup.co.jp/category/ir/2011/",
                "http://www.homemakeup.co.jp/category/ir/2010/",
                "http://www.homemakeup.co.jp/category/ir/2009/",
                "http://www.homemakeup.co.jp/category/ir/2008/",
                "http://www.homemakeup.co.jp/category/ir/2007/",
                "http://www.homemakeup.co.jp/category/ir/2006/",
                "http://www.homemakeup.co.jp/category/ir/2005/",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $li = $("#right-column > article > section > ul > li")
                $li.each((index, element) => {
                    const $a = $(element).find("a")
                    const url = $a.attr("href")
                    const title = $a.find(".list-title").text().trim()

                    let date_str = $a.find(".list-date").text().trim()
                    date_str = date_str.replace("年", "/")
                    date_str = date_str.replace("月", "/")
                    date_str = date_str.replace("日", "/")
                    const date = new Date(date_str)

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