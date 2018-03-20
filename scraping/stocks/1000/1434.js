module.exports = {
    "code": 1434,
    "name": "JESCOホールディングス",
    "parsers": [
        {
            "targets": [
                "http://www.jesco.co.jp/ja/news.html",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $h3 = $(".news-list-tabbed-2nd > ul.tabItems > li > h3")
                $h3.each((index, element) => {
                    const $element = $(element)
                    const date = new Date($element.find(".date").text().trim())

                    const $a = $element.find(".news_tx > a")
                    if($a.length !== 1){
                        return
                    }
                    const title = $a.text().trim()
                    let url = $a.attr("href")
                    if(url.indexOf("/") === 0){
                        url = "http://www.jesco.co.jp" + url
                    }

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