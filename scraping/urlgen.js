/**
 * @desc スクレイプ対象ページのURLの配列を生成します。
 * @notice  この関数はスクレイプ対象ページのURLに年が含まれているサイトのみを前提としています
 * @param {int} oldest  oldest year スクレイプ対象の中で最も古い年
 * @param {function} formatFunc  年からスクレイプ対象のURLを生成する関数
 *      e.g. year => `www.example.net/release/${year}/`
 * @return {array} スクレイプ対象ページのURLの配列
 */
const urlGen = (oldest, formatFunc) => {
    const now = (new Date()).getFullYear()
    return Array.from(Array(now - oldest + 1).keys())
        .map(i => {
            return formatFunc(oldest + i)
        })
}
module.exports = { urlGen }
