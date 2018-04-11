module.exports = {
  'code': 2001,
  'name': '日本粉',
  'parsers': [{
    'targets': [
      'http://www.nippn.co.jp/news/2018.html',
      'http://www.nippn.co.jp/news/2017.html',
      'http://www.nippn.co.jp/news/2016.html',
      'http://www.nippn.co.jp/news/2015.html',
      'http://www.nippn.co.jp/news/2014.html'
    ],
    'format': 'html',
    'parse': $ => {
      const result = []
      const root = 'http://www.nippn.co.jp'

      $('ul[class=list_news02] > li').each(function () {
        const $elem = $(this).find('span[class=icon_pdf01] > a')

        let url = root + $elem.attr('href')
        let title = $elem.text().trim()
        let date = new Date()
        /*
                 * /news/detail/__icsFiles/afieldfile/{yyyy}/{MM}/{dd}/no{N}_{title_eng}.pdf
                 * 上記のパスを得られるので、ファイルパスから日付を得る
                */
        const arrDate = url.split('/').map(function (elem) {
          return parseInt(elem, 10)
        })
        const year = arrDate[arrDate.length - 4]
        const month = arrDate[arrDate.length - 3]
        const day = arrDate[arrDate.length - 2]

        if (!(isFinite(year) && isFinite(month) && isFinite(day))) { throw new Error('日付を取得できません') }
        // monthが0-11なので調整
        date = new Date(year, (month + 11) % 12, day)

        if (!(date instanceof Date)) { throw new Error('日付を取得できません') }
        if (typeof title !== 'string') { throw new Error('タイトルを取得できません') }
        result.push({ title, url, date })
      })
      return result
    }
  }]
}
