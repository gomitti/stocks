module.exports = {
    "code": 1663,
    "name": "K＆Oエナジーグループ",
    "parsers": [
        {
            "targets": [
                "http://www.k-and-o-energy.co.jp/news/",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $li = $(".news_list > li")
                $li.each((index, element) => {
                    const $element = $(element)

                    let date_str = $element.find("em").text()
                    date_str = date_str.replace("年", "/")
                    date_str = date_str.replace("月", "/")
                    date_str = date_str.replace("日", "/")
                    const date = new Date(date_str)

                    const $a = $element.find("strong > a")
                    if($a.length !== 1){
                        return
                    }
                    const title = $a.text().trim()
                    const url = "http://www.k-and-o-energy.co.jp/" + $a.attr("href").replace("../", "")

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