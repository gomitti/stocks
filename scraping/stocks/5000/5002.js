module.exports = {
    "code": 5002,
    "name": "昭和シェル",
    "parsers": [
        {
            "targets": [
                "http://www.showa-shell.co.jp/whatsnew/index.html"
            ],
            "format": "html",
            "parse": async $ => {
                const items = $("#content").find(".wn_main")
                const result = []
                items.each((index, element) => {
                    const $root = $(element)
                    const $a = $root.find(".title > a")
                    const title = $a.text().trim()
                    const date = new Date($root.find(".date").text())

                    if (typeof title !== "string") {
                        throw new Error("タイトルを取得できません")
                    }
                    if (!(date instanceof Date)) {
                        throw new Error("日付を取得できません")
                    }

                    const url = "http://www.showa-shell.co.jp" + $a.attr("href")
                    result.push({ title, url, date })
                })
                return result
            }
        },
        {
            "targets": [
                "http://www.showa-shell.co.jp/press_release/index.html"
            ],
            "format": "html",
            "parse": async $ => {
                const items = $("#content").find(".bottom15")
                const result = []
                items.each((index, element) => {
                    const $p = $(element).find("p")
                    const $a = $($p[0]).find("a")
                    const title = $a.text().trim()
                    const date = new Date($($p[1]).text())

                    if (typeof title !== "string") {
                        throw new Error("タイトルを取得できません")
                    }
                    if (!(date instanceof Date)) {
                        throw new Error("日付を取得できません")
                    }

                    const url = "http://www.showa-shell.co.jp" + $a.attr("href")
                    result.push({ title, url, date })
                })
                return result
            }
        },
        {
            "targets": [
                "http://www.showa-shell.co.jp/ir/topics.html"
            ],
            "format": "html",
            "parse": async $ => {
                const items = $("#content").find("table tbody tr")
                const result = []
                items.each((index, element) => {
                    const $td = $(element).find("td")
                    const date = new Date($($td[0]).text())
                    const $a = $($td[1]).find("div > a")
                    const title = $a.text().trim()

                    if (typeof title !== "string") {
                        throw new Error("タイトルを取得できません")
                    }
                    if (!(date instanceof Date)) {
                        throw new Error("日付を取得できません")
                    }

                    const url = "http://www.showa-shell.co.jp" + $a.attr("href")
                    result.push({ title, url, date })
                })
                return result
            }
        }
    ]
}