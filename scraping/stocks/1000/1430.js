module.exports = {
    "code": 1430,
    "name": "ファーストコーポレーション",
    "parsers": [
        {
            "targets": [
                "https://www.xj-storage.jp/public-list/GetList.aspx?company=AS80280&fdate=20181231&pdate=20180101&len=10000&doctype=0,5,6,8,9,13,15,24,25,28,1,2,3,4,16,17,18,19,20,21,99,105,106,107,108,1030,1040,1080,1090,1100,1120,1130,1135,1136,1140,1150,1160,1170,1180,1190,1200,1210,1220,1230,1235,1236,1240,1250,1260,1270,1280,1290,1300,1310,1320,1350,1360,34,90,91,92,93,95,96,97,98,101,102,103,104,110,111,112,113,114,115,116,117,118,119,120,14,200&output=json&callback=callback",
                "https://www.xj-storage.jp/public-list/GetList.aspx?company=AS80280&fdate=20171231&pdate=20170101&len=10000&doctype=0,5,6,7,8,9,10,11,12,13,14,22,23,24,25,26,27,28,29,1,2,3,4,16,17,18,19,20,21,1030,1040,1080,1090,1100,1120,1130,1135,1136,1140,1150,1160,1170,1180,1190,1200,1210,1220,1230,1235,1236,1240,1250,1260,1270,1280,1290,1300,1310,1320,1350,1360,32,34,91,94,96,98,109,110,111,112,113,114,120&output=json&callback=callback",
                "https://www.xj-storage.jp/public-list/GetList.aspx?company=AS80280&fdate=20161231&pdate=20160101&len=10000&doctype=0,5,6,7,8,9,10,11,12,13,14,22,23,24,25,26,27,28,29,1,2,3,4,16,17,18,19,20,21,1030,1040,1080,1090,1100,1120,1130,1135,1136,1140,1150,1160,1170,1180,1190,1200,1210,1220,1230,1235,1236,1240,1250,1260,1270,1280,1290,1300,1310,1320,1350,1360,32,34,91,94,96,98,109,110,111,112,113,114,120&output=json&callback=callback",
                "https://www.xj-storage.jp/public-list/GetList.aspx?company=AS80280&fdate=20151231&pdate=20150101&len=10000&doctype=0,5,6,7,8,9,10,11,12,13,14,22,23,24,25,26,27,28,29,1,2,3,4,16,17,18,19,20,21,1030,1040,1080,1090,1100,1120,1130,1135,1136,1140,1150,1160,1170,1180,1190,1200,1210,1220,1230,1235,1236,1240,1250,1260,1270,1280,1290,1300,1310,1320,1350,1360,32,34,91,94,96,98,109,110,111,112,113,114,120&output=json&callback=callback",
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
                    throw new Error("ニュースを取得できません")
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