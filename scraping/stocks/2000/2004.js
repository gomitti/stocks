const root = 'http://www.showa-sangyo.co.jp'

const gen = () => {
  /*
   * "http://www.showa-sangyo.co.jp/corporate/news/index.html?y=YYYY"が取得元になる
   */
  const now = (new Date()).getFullYear()
  const oldest = 2007

  return Array.from(Array(now - oldest + 1).keys())
    .map(i => {
      return `${root}/corporate/news/index.html?y=${oldest + i}`
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

      const $array = $('#mainBox > div.rightBox > div:nth-child(2) > div > div[class=clearfix]')
      $array.each((index, elem) => {
        const $link = $(elem).find('p[class=tx] > a')
        const date = new Date(Date.parse($(elem).find('p[class=date]').text().trim()))
        const url = `${root}${$link.attr('href')}`
        const title = $link.text().replace(/（[0-9]+KB）/, '').trim()
        const item = { title, url, date }
        console.log(item.date)
        result.push(item)
      })
      return result
    }
  }]
}
