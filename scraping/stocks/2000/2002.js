module.exports = {
    "code": 2002,
    "name": "日清粉G",
    "parsers": [{
        "targets": [
            "https://www.nisshin.com/company/release/2018/",
            "https://www.nisshin.com/company/release/2017/",
            "https://www.nisshin.com/company/release/2016/",
            "https://www.nisshin.com/company/release/2015/",
            "https://www.nisshin.com/company/release/2014/",
            "https://www.nisshin.com/company/release/2013/",
            "https://www.nisshin.com/company/release/2012/",
            "https://www.nisshin.com/company/release/2011/",
            "https://www.nisshin.com/company/release/2010/",
            "https://www.nisshin.com/company/release/2009/",
            "https://www.nisshin.com/company/release/2008/",
            "https://www.nisshin.com/company/release/2007/",
            "https://www.nisshin.com/company/release/2006/",
            "https://www.nisshin.com/company/release/2005/",
            "https://www.nisshin.com/company/release/2004/",
            "https://www.nisshin.com/company/release/2003/",
            "https://www.nisshin.com/company/release/2002/",
            "https://www.nisshin.com/company/release/2001/",
            "https://www.nisshin.com/company/release/2000/"
        ],
        "format": "html",
        "parse": $ => {
            const result = []
            const root = "https://www.nisshin.com"
            $("ul[class=c-release-list__items] > li").each(function() {
                const $elem = $(this).find("a")
                
                /*__dateクラスのcontentに"yyyy年 M月 d日"の形式で
                // 日付のテキストが保持されているのでパースする
                */
                
                let arr_date = $elem.find("span[class=__date]")
                    .text()
                    .match(/[0-9]+/g).map(function(elem) {
                        return parseInt(elem, 10)
                    })
                    
                if (arr_date.length !== 3 ||
                    arr_date.filter(elem => { return !isFinite(elem) }).length > 0) {
                    throw new Error("日付を取得できません")
                }
                
                const date = new Date(arr_date[0], (arr_date[1] + 11) % 12, arr_date[2])
                
                if (!(date instanceof Date))
                    throw new Error("日付を取得できません")
                
                const title = $elem.find("span[class=__text]").text().trim()
                const url = root + $elem.attr("href")
                const item = { title, url, date }
                result.push(item)
            })
            return result
        }
    }]
}
