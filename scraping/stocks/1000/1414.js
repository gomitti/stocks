module.exports = {
    "code": 1414,
    "name": "ショーボンド",
    "parsers": [
        {
            "targets": [
                "http://www.xj-storage.jp/public-list/GetList.aspx?company=AS02760&fdate=20181231&pdate=20180101&len=10000&output=json&callback=callback",
                "http://www.xj-storage.jp/public-list/GetList.aspx?company=AS02760&fdate=20171231&pdate=20170101&len=10000&output=json&callback=callback",
                "http://www.xj-storage.jp/public-list/GetList.aspx?company=AS02760&fdate=20161231&pdate=20160101&len=10000&output=json&callback=callback",
                "http://www.xj-storage.jp/public-list/GetList.aspx?company=AS02760&fdate=20151231&pdate=20150101&len=10000&output=json&callback=callback",
                "http://www.xj-storage.jp/public-list/GetList.aspx?company=AS02760&fdate=20141231&pdate=20140101&len=10000&output=json&callback=callback",
                "http://www.xj-storage.jp/public-list/GetList.aspx?company=AS02760&fdate=20131231&pdate=20130101&len=10000&output=json&callback=callback",
                "http://www.xj-storage.jp/public-list/GetList.aspx?company=AS02760&fdate=20121231&pdate=20120101&len=10000&output=json&callback=callback",
                "http://www.xj-storage.jp/public-list/GetList.aspx?company=AS02760&fdate=20111231&pdate=20110101&len=10000&output=json&callback=callback",
                "http://www.xj-storage.jp/public-list/GetList.aspx?company=AS02760&fdate=20101231&pdate=20100101&len=10000&output=json&callback=callback",
                "http://www.xj-storage.jp/public-list/GetList.aspx?company=AS02760&fdate=20091231&pdate=20090101&len=10000&output=json&callback=callback",
                "http://www.xj-storage.jp/public-list/GetList.aspx?company=AS02760&fdate=20081231&pdate=20080101&len=10000&output=json&callback=callback",
            ],
            "format": "jsonp",
            "setup_callback": () => {
                // JSONPの入力をそのまま返す
                global.callback = data => {
                    return data
                }
            },
            "parse": async data => {
                const { items } = data
                if (Array.isArray(items) === false) {
                    throw new Error("@itemが配列ではありません")
                }
                const result = []
                for (const item of items) {
                    const { title, files } = item
                    const date = new Date(item.publishDate)
                    
                    if (Array.isArray(files) === false || files.length === 0) {
                        continue
                    }
                    const file = files[0]
                    const { url } = file

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
                }
                return result
            }
        }
    ]
}