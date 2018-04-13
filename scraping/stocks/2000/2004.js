const gen = require('../../urlgen').urlGen
const root = 'http://www.showa-sangyo.co.jp'
const oldest = 2009
const formatFunc = year => `${root}/corporate/news/index.html?y=${year}`

module.exports = {
  'code': 2004,
  'name': '昭和産',
  'parsers': [{
    'targets': gen(oldest, formatFunc),
    'format': 'html',
    'parse': $ => {
      const result = []

      const $array = $('#mainBox > div.rightBox > div:nth-child(2) > div > div[class=clearfix]')
      $array.each((index, elem) => {
        const $link = $(elem).find('p[class=tx] > a')
        const date = new Date(Date.parse($(elem).find('p[class=date]').text().trim()))
        if (!(date instanceof Date)) { throw new Error('日付を取得できません') }
        const url = `${root}${$link.attr('href')}`
        const title = $link.text().replace(/（[0-9]+KB）/, '').trim()
        if (typeof title !== 'string') { throw new Error('タイトルを取得できません') }
        result.push({ title, url, date })
      })
      return result
    }
  }]
}
