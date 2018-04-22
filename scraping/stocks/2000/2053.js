const root = 'http://www.chubushiryo.co.jp'
module.exports = {
  'code': 2053,
  'name': '中部飼',
  'parsers': [{
    'targets': [`${root}/news/`],
    'format': 'html',
    'parse': $ => {
      const result = []
      /* すべてのニュースリリースの日付とurl、タイトルが
             * 同階層に配置されているのでループを回して順に取得する
             */
      const $array = $('#news_all').children()
      for (var idx = 0; idx < $array.length; idx += 2) {
        const arrDate = $($array[idx]).find('dt > span.date').text().trim().split('.').map(str => parseInt(str, 10))
        if (arrDate.length !== 3 ||
                    arrDate.filter(x => !isFinite(x)).length > 0) {
          throw new Error('日付を取得できません')
        }
        const date = new Date(arrDate[0], (arrDate[1] + 11) % 12, arrDate[2])
        if (!(date instanceof Date)) { throw new Error('日付を取得できません') }
        const url = root + $($array[idx + 1]).find('a').attr('href')
        const title = $($array[idx + 1]).find('a').text()
        const item = { title, url, date }
        result.push(item)
      }
      return result
    }
  }]
}
