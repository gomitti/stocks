module.exports = {
    "code": 1721,
    "name": "コムシスHD",
    "parsers": [
        {
            "targets": [
                "http://www.comsys-hd.co.jp/ir/index/index.php",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $root = $("#new")
                const $dt = $root.find("dt")
                const $dd = $root.find("dd")
                if ($dt.length !== $dd.length) {
                    throw new Error("ニュースの件数が不正です")
                }
                for (let i = 0; i < $dt.length; i++) {
                    const date = new Date($($dt[i]).text().trim().replace(/\./g, "/"))
                    const $a = $($dd[i]).find("a")
                    const title = $a.text().trim()
                    const url = "http://www.comsys-hd.co.jp/" + $a.attr("href").replace("../../", "")

                    if (typeof title !== "string") {
                        throw new Error("タイトルを取得できません")
                    }
                    if (!(date instanceof Date)) {
                        throw new Error("日付を取得できません")
                    }

                    result.push({ title, url, date })
                }
                return result
            }
        },
    ]
}