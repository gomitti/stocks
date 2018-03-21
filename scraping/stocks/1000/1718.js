module.exports = {
    "code": 1718,
    "name": "美樹工業 ",
    "parsers": [
        {
            "targets": [
                "http://www.mikikogyo.co.jp/news/index.php?year=2018",
                "http://www.mikikogyo.co.jp/news/index.php?year=2017",
                "http://www.mikikogyo.co.jp/news/index.php?year=2017&offset=10",
                "http://www.mikikogyo.co.jp/news/index.php?year=2017&offset=20",
                "http://www.mikikogyo.co.jp/news/index.php?year=2016",
                "http://www.mikikogyo.co.jp/news/index.php?year=2013",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $a = $("#newsUL > li > a")
                $a.each((index, element) => {
                    const $element = $(element)

                    let date_str = $element.find(".date").text()
                    date_str = date_str.replace("年", "/")
                    date_str = date_str.replace("月", "/")
                    date_str = date_str.replace("日", "/")
                    const date = new Date(date_str)

                    const title = $element.find(".title").text().trim()
                    const url = "http://www.mikikogyo.co.jp" + $element.attr("href")

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