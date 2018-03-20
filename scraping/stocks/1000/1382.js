module.exports = {
    "code": 1382,
    "name": "ホーブ",
    "parsers": [
        {
            "targets": [
                "http://www.hob.co.jp/ir/ir-top.htm",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $table = $("table")
                const $tr = $($table[1]).find("tbody > tr")
                $tr.each((index, element) => {
                    const $element = $(element)
                    const num_children = $element.children().length
                    if (num_children !== 4) {
                        return
                    }
                    const $td = $element.find("td")

                    const $td2 = $($td[2])
                    const whole_title = $td2.text().replace("\n", "").trim()
                    const font = $td2.find("font").text().trim()
                    const title = whole_title.replace(font, "").trim()
                    
                    let date_str = $($td[0]).text()
                    date_str = date_str.replace("年 ", "/")
                    date_str = date_str.replace("月", "/")
                    date_str = date_str.replace("日", "/")
                    const date = new Date(date_str)

                    const $a = $($td[3]).find("a")
                    const url = "http://www.hob.co.jp/ir/" + $a.attr("href")
                    
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