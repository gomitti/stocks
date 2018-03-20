module.exports = {
    "code": 1408,
    "name": "サムシングHD",
    "parsers": [
        {
            "targets": [
                "http://v4.eir-parts.net/V4Public/EIR/1408/ja/announcement/announcement_1.js"
            ],
            "format": "jsonp",
            "setup_callback": () => {
                // JSONPの入力をそのまま返す
                global.eolparts_announcement_1 = data => {
                    return data
                }
            },
            "parse": async data => {
                const items = data.item
                if (Array.isArray(items) === false) {
                    throw new Error("@itemが配列ではありません")
                }
                const result = []
                for (const item of items) {
                    const date = new Date(item.date)

                    if (typeof item.title !== "string") {
                        throw new Error("タイトルを取得できません")
                    }
                    if (typeof item.link !== "string") {
                        throw new Error("URLを取得できません")
                    }
                    if (!(date instanceof Date)) {
                        throw new Error("日付を取得できません")
                    }

                    result.push({
                        "title": item.title,
                        "url": item.link,
                        date
                    })
                }
                return result
            }
        }
    ]
}