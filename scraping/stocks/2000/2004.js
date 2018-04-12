const root = 'http://www.showa-sangyo.co.jp'
const gen = () => {
    /*
      "http://www.showa-sangyo.co.jp/corporate/news/index.html?y=YYYY"が取得元になる
      */
    const now = (new Date()).getFullYear()
    const oldest = 2018 //2007
    return Array.from(Array(now - oldest + 1).keys())
        .map(i => {
            return `${root}/corporate/news/index.html?y=${oldest + i}/`
        })
}
module.exports = {
    'code': 2004,
    'name': '昭和産',
    'parsers': [{
        'targets': gen(),
        'format': 'html',
        'parse': $ => {
            const result = []
            /*
             * 記事一覧のdivのみクラスが与えられていないのでそれを抜き出す.
             * そのdivの孫要素に各リリースの情報が格納されているのでこれを取り出す
             */

            const $array = $('.rightBox > div:nth-child(2) > div > div[class=clearfix]')
            console.log("$array",$array.length)

            $array.each((index, elem) => {
                const $link = $(elem).find('p[class=tx] > a')
                const date = $(elem).find('p[class=date]').text().trim()
                const url = `${root}${$link.attr('href')}`
                const title = $link.text().replace(/（[0-9]+KB）/,'').trim()
                console.log({ title, url, date })
            //    result.push({ title, url, date })
             })
            return result
        }
    }]
}
