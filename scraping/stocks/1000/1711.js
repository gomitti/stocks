module.exports = {
    "code": 1711,
    "name": "省電舎HD",
    "parsers": [
        {
            "targets": [
                "http://shodensya.com/ir/press/",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $tr = $(".ir-list > tbody > tr")
                $tr.each((index, element) => {
                    const $element = $(element)
                    const date = new Date($element.find("th").text().trim().replace(/\./g, "/"))

                    const $a = $element.find("td > a")
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