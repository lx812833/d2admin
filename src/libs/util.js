import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'

const util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

/**
 * @deprecated 请求根地址
 */

util.baseUrl = process.env.

  /**
   * 时间格式化
   * @param time (date or 时间戳)
   * @param cFormat
   * @returns {*}
   */
  util.parseTime = function (time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date = ""
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    // eslint-disable-next-line
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    // eslint-disable-next-line
    return time_str
  }

// console.log(parseTime(new Date()))                          //print 2019-12-16 11:10:31
// console.log(parseTime(new Date(), '{y}-{m}-{d}'))            //print 2019-12-16
// console.log(parseTime(new Date(), '{y}/{m}/{d}'))            //print 2019/12/16
// console.log(parseTime(new Date(), '{y}'))                    //print 2019
// console.log(parseTime(new Date(), '{h}:{i}:{s}'))            //print 11:14:31
// console.log(parseTime(new Date(), '{y}-{m}-{d} 星期 {a}'))   //print 2019-12-16 星期 一
// console.log(parseTime(new Date('2019/12/11')))              //print 2019-12-11 
// console.log(parseTime('2019-12-11 12:00:00'))               //print 2019-12-11 12:00:00
// console.log(parseTime(new Date().getTime()))                //print 2019-12-16 11:20:17


export default util
