module.exports = {
    "code": 1419,
    "name": "タマホーム",
    "parsers": [
        {
            "targets": [
                "http://www.tamahome.jp/company/ir/press.html",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $dl = $("#newsSec > div > dl")
                $dl.each((index, section) => {
                    const $release = $(section).find(".irc_release")
                    $release.each((index, element) => {
                        const $element = $(element)

                        let date_str = $element.find(".irc_release_yyyymmdd").text().trim()
                        date_str = date_str.replace("年", "/")
                        date_str = date_str.replace("月", "/")
                        date_str = date_str.replace("日", "/")
                        const date = new Date(date_str)

                        const $a = $element.find(".irc_release_title > a")
                        const title = $a.text().trim()
                        const href = $a.attr("href")
                        if(!!href === false){
                            return
                        }
                        const url = "http://www.tamahome.jp/company/ir/" + href.replace("./", "")

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
                })
                return result
            }
        },
    ]
}