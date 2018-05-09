const gen = require('../../urlgen').urlGen
const oldest = 2008
const formatFunc = year => `http://www.k-higashimaru.co.jp/news/index.php?year=${year}`

module.exports = {
    "code": 2058,
    "name": "ヒガシマル",
    'parsers': [{
        'targets': gen(oldest, formatFunc),
        'format': 'html',
        'parse': $ => {
            const result = []
            $('div[class=news-content]').each((idx, elem) => {
                let dateTitleObj = null
                "「」"
                dateTitleObj = $($(elem).eq(0))


                let strDate = dateTitleObj.find('span')
                    .text()
                    .trim()

                if (strDate.indexOf(' ') >= 0) {
                    strDate = strDate.substr(0, strDate.indexOf(' '))
                }
                const arrDate = strDate
                    .split('.')
                    .map(str => parseInt(str, 10))

                if (arrDate.length !== 3 ||
                    arrDate.filter(x => !isFinite(x)).length > 0) {
                    throw new Error('日付を取得できません')
                }
                const date = new Date(2000 + arrDate[0], (arrDate[1] + 11) % 12, arrDate[2])
                if (!(date instanceof Date)) { throw new Error('日付を取得できません') }

                const title = dateTitleObj
                    .clone() //clone the element
                    .children() //select all the children
                    .remove() //remove all the children
                    .end() //again go back to selected element
                    .text().trim();

                const url = $(elem).find('div.MT5 > a').attr('href')
                const item = { title, url, date }
                console.log(item)
                result.push(item)
            })
            return result
        }
    }]
}
