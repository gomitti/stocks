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

            // パース処理前に何かを実行する場合
            // 例えばJSONPの関数を定義しておく等
            before: () => {

            },

            // パース処理を書く
            // https://github.com/cheeriojs/cheerio
            // 記事タイトルとURLの辞書を配列に入れたものを返すようにする
            "parse": $ => {
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