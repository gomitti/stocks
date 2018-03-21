module.exports = {
    "code": 1518,
    "name": "三井松島産業",
    "parsers": [
        {
            "targets": [
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=2",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=3",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=4",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=5",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=6",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=7",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=8",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=9",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=10",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=11",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=12",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=13",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=14",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=15",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=16",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=17",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=18",
                "http://www.mitsui-matsushima.co.jp/ir/news/index.php?pcnt=19",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $li = $(".irNewsRelList > li")
                $li.each((index, element) => {
                    const $element = $(element)

                    const date = new Date($element.find(".irNewsListdDate").text().replace(/\./g, "/"))

                    const $a = $element.find(".irNewsListTxt > a")
                    if ($a.length !== 2) {
                        return
                    }
                    const title = $($a[0]).text().trim()
                    const url = "http://www.mitsui-matsushima.co.jp/" + $a.attr("href").replace("../../", "")

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