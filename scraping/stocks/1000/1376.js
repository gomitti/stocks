module.exports = {
    "code": 1376,
    "name": "カネコ種",
    "parsers": [
        {
            "targets": [
                "http://www.kanekoseeds.jp/topics/",
                "http://www.kanekoseeds.jp/topics/page/2/",
                "http://www.kanekoseeds.jp/topics/page/3/",
                "http://www.kanekoseeds.jp/topics/page/4/",
                "http://www.kanekoseeds.jp/topics/page/5/",
                "http://www.kanekoseeds.jp/2018/03/",
                "http://www.kanekoseeds.jp/2018/01/",
                "http://www.kanekoseeds.jp/2017/10/",
                "http://www.kanekoseeds.jp/2017/09/",
                "http://www.kanekoseeds.jp/2017/08/",
                "http://www.kanekoseeds.jp/2017/07/",
                "http://www.kanekoseeds.jp/2017/04/",
                "http://www.kanekoseeds.jp/2017/01/",
                "http://www.kanekoseeds.jp/2016/10/",
                "http://www.kanekoseeds.jp/2016/09/",
                "http://www.kanekoseeds.jp/2016/08/",
                "http://www.kanekoseeds.jp/2016/07/",
                "http://www.kanekoseeds.jp/2016/05/",
                "http://www.kanekoseeds.jp/2016/04/",
                "http://www.kanekoseeds.jp/2016/03/",
                "http://www.kanekoseeds.jp/2016/01/",
                "http://www.kanekoseeds.jp/2015/10/",
                "http://www.kanekoseeds.jp/2015/09/",
                "http://www.kanekoseeds.jp/2015/08/",
                "http://www.kanekoseeds.jp/2015/07/",
                "http://www.kanekoseeds.jp/2015/04/",
                "http://www.kanekoseeds.jp/2015/03/",
                "http://www.kanekoseeds.jp/2015/01/",
                "http://www.kanekoseeds.jp/2014/11/",
                "http://www.kanekoseeds.jp/2014/10/",
                "http://www.kanekoseeds.jp/2014/09/",
                "http://www.kanekoseeds.jp/2014/08/",
            ],
            "format": "html",
            "parse": async $ => {
                const result = []
                const $post = $("#content").find("div.post")
                $post.each((index, element) => {
                    const $a = $(element).find(".entry-title > a")
                    const url = $a.attr("href")
                    const title = $a.text().trim()
                    let date_str = $($a).find(".entry-meta > a > .entry-date").text()
                    date_str = date_str.replace("年", "/")
                    date_str = date_str.replace("月", "/")
                    date_str = date_str.replace("日", "/")
                    const date = new Date(date_str)

                    if (typeof title !== "string") {
                        throw new Error("タイトルを取得できません")
                    }
                    if (!(date instanceof Date)) {
                        throw new Error("日付を取得できません")
                    }
                    
                    result.push({ title, url, date })
                })
                return result
            }
        }
    ]
}