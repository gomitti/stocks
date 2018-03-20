module.exports = {
    "code": 1377,
    "name": "サカタのタネ",
    "parsers": [
        {
            "targets": [
                "http://www.sakataseed.co.jp/corporate/news/2018.html",
                "http://www.sakataseed.co.jp/corporate/news/2017.html",
                "http://www.sakataseed.co.jp/corporate/news/2016.html",
                "http://www.sakataseed.co.jp/corporate/news/2015.html",
                "http://www.sakataseed.co.jp/corporate/news/2014.html",
                "http://www.sakataseed.co.jp/corporate/news/2013.html",
                "http://www.sakataseed.co.jp/corporate/news/2012.html",
                "http://www.sakataseed.co.jp/corporate/news/2011.html",
                "http://www.sakataseed.co.jp/corporate/news/2010.html",
                "http://www.sakataseed.co.jp/corporate/news/2009.html",
                "http://www.sakataseed.co.jp/corporate/news/2008.html",
                "http://www.sakataseed.co.jp/corporate/news/2007.html",
                "http://www.sakataseed.co.jp/corporate/news/2006.html",
                "http://www.sakataseed.co.jp/corporate/news/2005.html",
                "http://www.sakataseed.co.jp/corporate/news/2004.html",
                "http://www.sakataseed.co.jp/corporate/news/2003.html",
                "http://www.sakataseed.co.jp/corporate/news/2002.html",
                "http://www.sakataseed.co.jp/corporate/news/2001.html",
                "http://www.sakataseed.co.jp/corporate/news/2000.html",
                "http://www.sakataseed.co.jp/corporate/news/1999.html",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $tr = $("#tNews").find("tbody > tr")
                $tr.each((index, element) => {
                    const $element = $(element)
                    const $a = $element.find(".tdModEleTitle > a")
                    const url = "http://www.sakataseed.co.jp/corporate/news/" + $a.attr("href")
                    const title = $a.text().trim()
                    let date_str = $element.find("th").text()
                    date_str = date_str.replace("年", "/")
                    date_str = date_str.replace("月", "/")
                    date_str = date_str.replace("日", "/")
                    const date = new Date(date_str)

                    if (typeof title !== "string") {
                        throw new Error("タイトルを取得できません")
                    }
                    if (!(date instanceof Date)) {
                        throw new Error("日付を取得できません")
                    }

                    result.push({ title, url, date })
                })
                return result
            }
        },
        {
            "targets": [
                "http://www.sakataseed.co.jp/corporate/ir/index.html",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $tr = $("#dIRNews").find("table.tModEleNews > tbody > tr")
                $tr.each((index, element) => {
                    const $element = $(element)
                    const $a = $element.find(".tdModEleTitle > a")
                    const url = "http://www.sakataseed.co.jp/corporate/" + $a.attr("href").replace("../", "")
                    const title = $a.text().trim()
                    let date_str = $element.find("th").text()
                    date_str = date_str.replace("年", "/")
                    date_str = date_str.replace("月", "/")
                    date_str = date_str.replace("日", "/")
                    const date = new Date(date_str)

                    if (typeof title !== "string") {
                        throw new Error("タイトルを取得できません")
                    }
                    if (!(date instanceof Date)) {
                        throw new Error("日付を取得できません")
                    }

                    result.push({ title, url, date })
                })
                return result
            }
        }
    ]
}