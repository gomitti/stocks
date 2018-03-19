module.exports = {
    "code": 5758,
    "name": "FCM",
    "parsers": [
        {
            "target": "http://v4.eir-parts.net/V4Public/EIR/5758/ja/announcement/announcement_1.js",
            "format": "jsonp",
            "before": () => {
                // JSONPの入力をそのまま返す
                global.eolparts_announcement_1 = data => {
                    return data
                }
            },
            "parse": data => {
                const items = data.item
                if (Array.isArray(items) === false) {
                    throw new Error("@itemが配列ではあり前ん")
                }
                const result = []
                for (const news of items) {
                    const { title, link } = news
                    result.push({
                        title,
                        "url": link
                    })
                }
                return result
            }
        }
    ]
}