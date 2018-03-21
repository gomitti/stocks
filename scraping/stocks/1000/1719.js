module.exports = {
    "code": 1719,
    "name": "安藤ハザマ",
    "parsers": [
        {
            "targets": [
                "http://www.ad-hzm.co.jp/ir/irnews.html",
                "http://www.ad-hzm.co.jp/ir/irnews_2017.html",
                "http://www.ad-hzm.co.jp/ir/irnews_2016.html",
                "http://www.ad-hzm.co.jp/ir/irnews_2015.html",
                "http://www.ad-hzm.co.jp/ir/irnews_2014.html",
                "http://www.ad-hzm.co.jp/ir/irnews_2013.html",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $tr = $("#irNewsArea > .listBlock > table > tbody > tr")
                $tr.each((index, element) => {
                    const $element = $(element)

                    const year = $element.find(".year").text()
                    const month = $element.find(".month").text()
                    const day = $element.find(".day").text()
                    const date = new Date(`${year}/${month}/${day}`)

                    const $a = $element.find(".link > a")
                    if($a.length !== 1){
                        return
                    }
                    const title = $a.text().trim()
                    const url = "http://www.ad-hzm.co.jp/" + $a.attr("href").replace("../../", "")

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