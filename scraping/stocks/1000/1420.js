module.exports = {
    "code": 1420,
    "name": "サンヨーホームズ",
    "parsers": [
        {
            "targets": [
                "http://www.sanyohomes.co.jp/backno/release/2018.html",
                "http://www.sanyohomes.co.jp/backno/release/2017.html",
                "http://www.sanyohomes.co.jp/backno/release/2016.html",
                "http://www.sanyohomes.co.jp/backno/release/2015.html",
                "http://www.sanyohomes.co.jp/backno/release/2014.html",
                "http://www.sanyohomes.co.jp/backno/release/2013.html",
                "http://www.sanyohomes.co.jp/backno/release/2012.html",
                "http://www.sanyohomes.co.jp/backno/release/2011.html",
                "http://www.sanyohomes.co.jp/backno/release/2010.html",
                "http://www.sanyohomes.co.jp/backno/release/2009.html",
                "http://www.sanyohomes.co.jp/backno/release/2008.html",
                "http://www.sanyohomes.co.jp/backno/release/2007.html",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $tr = $("#listBox > div > div > table > tbody > tr")
                $tr.each((index, element) => {
                    const $element = $(element)
                    if($element.attr("height") === 1){
                        return
                    }
                    const date = new Date($element.find("td > .date").text().trim().replace(/\./g, "/"))
                    const $a = $element.find("td > a")

                    const title = $a.text().trim()
                    const url = "http://www.sanyohomes.co.jp" + $a.attr("href")

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
        {
            "targets": [
                "http://v4.eir-parts.net/V4Public/EIR/1420/ja/announcement/announcement_7.js"
            ],
            "format": "jsonp",
            "setup_callback": () => {
                // JSONPの入力をそのまま返す
                global.eolparts_announcement_7 = data => {
                    return data
                }
            },
            "parse": async data => {
                const items = data.item
                if (Array.isArray(items) === false) {
                    throw new Error("ニュースを取得できません")
                }
                const result = []
                for (const item of items) {
                    const date = new Date(item.date)

                    if (typeof item.title !== "string") {
                        throw new Error("タイトルを取得できません")
                    }
                    if (!(date instanceof Date)) {
                        throw new Error("日付を取得できません")
                    }

                    result.push({
                        "title": item.title,
                        "url": item.link,
                        date
                    })
                }
                return result
            }
        }
    ]
}