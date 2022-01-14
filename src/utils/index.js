/**
 * Created by PanJiaChen on 16/11/18.
 */
import { Message } from 'element-ui'
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
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
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
/**
 * 计算两个时间戳（秒） 相差多少天
 * @param {*} originTimestamp 
 * @param {*} targetTimestamp 
 * @returns 
 */
export function parseTimestampToDay(originTimestamp, targetTimestamp) {
  if (originTimestamp > targetTimestamp) return 0
  let _utc = targetTimestamp - originTimestamp
  return parseInt(_utc / (24 * 60 * 60))
}

/** 处理时间
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/*
 *移除HTML标签代码
 */
export function removeHtmlTag(str, length) {
  str = str.replace(/<\/?[^>]*>/g, '') // 去除HTML tag
  str = str.replace(/[ | ]*\n/g, '\n') // 去除行尾空白
  // str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
  str = str.replace(/ /ig, '')// 去掉
  str = str.substring(0, length)
  return str
}

export function splitDate(dates) {
  var len = dates.length
  var timestr = '' + dates.substring(0, len - 4) + '/' + dates.substring(len - 4, len - 2) + '/' + dates.substring(len - 2, len)
  return timestr
}

// 下载游戏
export function downloadActions(e, download_obj = {}) {
  e.preventDefault() // 阻止默认行为
  const _urlreg = /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
  if (download_obj.url && _urlreg.test(download_obj.url)) {
    // 创建a标签
    const link = document.createElement('a')
    link.setAttribute('target', '_self')
    // download属性
    link.setAttribute('download', download_obj.name)
    // href链接
    link.setAttribute('href', download_obj.url)
    // 自执行点击事件
    link.click()
    if (document.body.contains(link)) {
      document.body.removeChild(link)
    }
  } else {
    Message({
      message: '下载地址有误,请联系客服',
      type: 'error',
      duration: 5 * 1000,
      customClass: 'qytx__toast-error'
    })
  }
}
