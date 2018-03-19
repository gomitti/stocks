module.exports = {
    "code": 5002,
    "name": "昭和シェル ",
    "parsers": [
        {
            "target": "http://www.showa-shell.co.jp/whatsnew/index.html",
            "format": "html",
            "parse": $ => {
                const items = $("#content").find(".wn_main")
                const result = []
                items.each((index, element) => {
                    const a = $(element).find(".title > a")
                    const title = a.text()
                    const url = "http://www.showa-shell.co.jp" + a.attr("href")
                    result.push({ title, url })
                })
                return result
            }
        },
        {
            "target": "http://www.showa-shell.co.jp/press_release/index.html",
            "format": "html",
            "parse": $ => {
                const items = $("#content").find(".bottom15")
                const result = []
                items.each((index, element) => {
                    const a = $(element).find("p > a")
                    const title = a.text()
                    const url = "http://www.showa-shell.co.jp" + a.attr("href")
                    result.push({ title, url })
                })
                return result
            }
        },
        {
            "target": "http://www.showa-shell.co.jp/ir/topics.html",
            "format": "html",
            "parse": $ => {
                const items = $("#content").find("table tbody tr")
                const result = []
                items.each((index, element) => {
                    const a = $(element).find("td > div > a")
                    const title = a.text()
                    const url = "http://www.showa-shell.co.jp" + a.attr("href")
                    result.push({ title, url })
                })
                return result
            }
        }
    ]
}