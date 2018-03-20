module.exports = {
    "code": 0000,               // 銘柄コード
    "name": "Campany Name",     // 社名
    "parsers": [                // パーサー
        {
            // パースするURL
            "target": "http://www.fc-m.co.jp/ir/news.html",

            // 対象URLのフォーマット
            // html, jsonpなど
            "format": "html",

            // JSONPの関数を定義
            setup_callback: () => {
                global.callback = data => {
                    return data
                }
            },

            // パース処理を書く
            // https://github.com/cheeriojs/cheerio
            // 記事タイトルとURLの辞書を配列に入れたものを返すようにする
            // 非同期処理が含まれる場合があるかもしれないので念のためasync関数にする
            "parse": async $ => {
                return []
            },

            // 文字コードの変換
            // たとえばHTMLで指定しているエンコーディングと実際のエンコーディングが異なるなどの
            // イレギュラーなサイトに対応できる
            "transformResponse": data => {
                const Iconv = require("iconv").Iconv
                const iconv = new Iconv("Shift_JIS", "UTF-8")
                return iconv.convert(data).toString()
            }
        }
    ]
}