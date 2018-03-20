module.exports = {
    "code": 1383,
    "name": "ベルグアース",
    "parsers": [
        {
            "targets": [
                "http://www.bergearth.co.jp/IR/library01.php",
                "http://www.bergearth.co.jp/IR/library02.php",
                "http://www.bergearth.co.jp/IR/library03.php",
                "http://www.bergearth.co.jp/IR/library04.php",
                "http://www.bergearth.co.jp/IR/library05.php",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $tr = $("#ir > table > tbody > tr")
                $tr.each((index, element) => {
                    const $td = $(element).find("td")

                    let date_str = $($td[0]).text().trim()
                    date_str = date_str.replace("年", "/")
                    date_str = date_str.replace("月", "/")
                    date_str = date_str.replace("日", "/")
                    const date = new Date(date_str)

                    const $a = $($td[1]).find("a")
                    const url = $a.attr("href")
                    const title = $a.text().trim()

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