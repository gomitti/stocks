module.exports = {
    "code": 0000,               // 銘柄コード
    "name": "Campany Name",     // 社名
    // 対象のURL
    "targets": [
        "http://www.fc-m.co.jp/ir/news.html"
    ],

    // 文字コードの変換
    // たとえばHTMLで指定しているエンコーディングと実際のエンコーディングが異なるなどの
    // イレギュラーなサイトに対応できる
    "transformResponse": data => {
        const Iconv = require("iconv").Iconv
        const iconv = new Iconv("Shift_JIS", "UTF-8")
        return iconv.convert(data).toString()
    }
}