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

                //"「」"に囲まれたテキストを得る　 
                //"『』"がある場合はこちらを優先する
                let title = dateTitleObj
                    .clone() //clone the element
                    .children() //select all the children
                    .remove() //remove all the children
                    .text().trim();
                title = title.substr(0, title.indexOf("\n"))
                //末尾の冗長な表現を削除する
                const endStrArr = [
                    "を発表しました",
                    "が発売されました",
                    "を更新しました",
                    "を掲載しました",
                    "を開設しました"
                ]
                endStrArr.forEach(function(endStr,index) {
                    if (title.indexOf(endStr) > 0) {
                        title = title.substr(0, title.indexOf(endStr))
                    }
                })
                
                //日付表現も冗長なので削除する
                if (title.match(/[0-9][0-9].[0-1][0-9].[0-3][0-9]/)) {
                    title = title.replace(/[0-9][0-9].[0-1][0-9].[0-3][0-9]/, '')
                }
                title = title.trim()
                if (title == void 0) {
                    throw new Error('タイトルを取得できません')
                }


                const url = $(elem).find('div.MT5 > a').attr('href')
                // URLがないニュースリリースは現状エラーとしておく
                if (url === undefined) {
                    throw new Error(`ニュースリリース「${title}」のリンク先を取得できません`)
                }
                const item = { title, url, date }
                result.push(item)
            })
            return result
        }
    }]
}
