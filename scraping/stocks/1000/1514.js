module.exports = {
    "code": 1514,
    "name": "住石HD",
    "parsers": [
        {
            "targets": [
                "http://www.sumiseki.co.jp/ir/shiryo.html",
                "http://www.sumiseki.co.jp/ir/kessan.html",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $tr = $("#main > table > tbody > tr")
                $tr.each((index, element) => {
                    const $element = $(element)

                    let date_str = $element.find(".td4").text()
                    date_str = date_str.replace("年", "/")
                    date_str = date_str.replace("月", "/")
                    date_str = date_str.replace("日", "/")
                    const date = new Date(date_str)

                    const $a = $element.find(".td3 > a")
                    const title = $a.text().trim()
                    const url = "http://www.sumiseki.co.jp/ir/" + $a.attr("href")

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