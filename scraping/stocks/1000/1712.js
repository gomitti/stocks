module.exports = {
    "code": 1712,
    "name": "ダイセキ環境ソリューション",
    "parsers": [
        {
            "targets": [
                "http://www.daiseki-eco.co.jp/ir/index.html",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $tr = $("#post-topics-ir > table > tbody > tr")
                $tr.each((index, element) => {
                    const $element = $(element)
                    const date = new Date($element.find("th").text().trim().replace(/\./g, "/"))

                    const $td = $element.find("td")
                    const $a = $($td).find("a")
                    const $span = $($td).find("span")

                    let title = $td.text().trim().replace($a.text(), "")
                    if($span.length === 1){
                        title = title.replace($span.text(), "")
                    }
                    title = title.trim()
                    
                    const url = "http://www.daiseki-eco.co.jp/ir/" + $a.attr("href")

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