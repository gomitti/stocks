/* リンクを絶対パスにするためにスクレイプ中のサンプル用ページ,リゾルバを用意する */
const resolver = require('path').resolve
const samplePath = 'http://www.masufun.co.jp/ir/release/2010/'

const gen = require('../../urlgen').urlGen
const oldest = 2009
const formatFunc = year => `http://www.masufun.co.jp/ir/release/${year}/`
module.exports = {
    'code': 2008,
    'name': '増田粉',
    'parsers': [{
        'targets': gen(oldest, formatFunc),
        'format': 'html',
        'parse': $ => {
            const result = []
            $('div.topicsList').each(function(idx, elem) {
                const $item = $(elem)
                const title = $item.find('a').text().trim()
                if (typeof title !== 'string') { throw new Error('タイトルを取得できません') }
                const url = resolver(samplePath, $item.find('a').attr('href'))
                const arrDate = $item.find('dt').text().trim().split('.').map(str => parseInt(str, 10))
                if (arrDate.length !== 3 ||
                    arrDate.filter(x => !isFinite(x)).length > 0) {
                    throw new Error('日付を取得できません')
                }
                const date = new Date(arrDate[0], (arrDate[1] + 11) % 12, arrDate[2])
                if (!(date instanceof Date)) { throw new Error('日付を取得できません') }
                result.push({ title, url, date })
            })
            return result
        }
    }]
}