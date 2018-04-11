const gen = () => {
  /*
    "https://www.nittofuji.co.jp/ir/info/YYYY/"が取得元になる
    */
  const now = (new Date()).getFullYear()
  const oldest = 2006
  const root = 'https://www.nittofuji.co.jp/ir/info'
  return Array.from(Array(now - oldest + 1).keys())
    .map(i => {
      return `${root}/${oldest + i}/`
    })
}
module.exports = {
  'code': 2003,
  'name': '日東富士',
  'parsers': [{
    'targets': gen(),
    'format': 'html',
    'parse': $ => {
      const result = []
      $('div[class=topicsBox] > dl').each(function () {
        const arrDate = $(this).find('dt').text()
          .match(/[0-9]+/g).map(function (elem) {
            return parseInt(elem, 10)
          })
        if (arrDate.length !== 3 ||
                    arrDate.filter(elem => { return !isFinite(elem) }).length > 0) {
          throw new Error('日付を取得できません')
        }
        // monthが0-11なので調整
        const date = new Date(arrDate[0], (arrDate[1] + 11) % 12, arrDate[2])

        const $elem = $(this).find('dd[class=icon]').next().find('a')
        /*
         * title："役員人事に関するお知らせ（PDF） [134KB]"
         * 余計な(PDF),バイト数の表記を取り除く
        */
        const title = $elem.text().trim()
          .replace(/（PDF） /g, '')
          .replace(/\[[0-9]+KB\]/, '')

        const url = $elem.attr('href')
        result.push({ title, url, date })
      })
      return result
    }
  }]
}
