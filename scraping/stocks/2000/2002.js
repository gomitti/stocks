const gen = () => {
  /*
    "https://www.nisshin.com/company/release/YYYY/"が取得元になる
    */
  const now = (new Date()).getFullYear()
  const oldest = 2000
  const root = 'https://www.nisshin.com/company/release'
  return Array.from(Array(now - oldest + 1).keys())
    .map(i => {
      return `${root}/${oldest + i}/`
    })
}

module.exports = {
  'code': 2002,
  'name': '日清粉G',
  'parsers': [{
    'targets': gen(),
    'format': 'html',
    'parse': $ => {
      const result = []
      const root = 'https://www.nisshin.com'
      $('ul[class=c-release-list__items] > li').each(function () {
        const $elem = $(this).find('a')

        /* __dateクラスのcontentに"yyyy年 M月 d日"の形式で
                 * 日付のテキストが保持されているのでパースする
                */

        let arrDate = $elem.find('span[class=__date]')
          .text()
          .match(/[0-9]+/g).map(function (elem) {
            return parseInt(elem, 10)
          })

        if (arrDate.length !== 3 ||
                    arrDate.filter(elem => { return !isFinite(elem) }).length > 0) {
          throw new Error('日付を取得できません')
        }
        // monthが0-11なので調整
        const date = new Date(arrDate[0], (arrDate[1] + 11) % 12, arrDate[2])

        if (!(date instanceof Date)) { throw new Error('日付を取得できません') }

        const title = $elem.find('span[class=__text]').text().trim()
        const url = root + $elem.attr('href')
        const item = { title, url, date }
        result.push(item)
      })
      return result
    }
  }]
}
