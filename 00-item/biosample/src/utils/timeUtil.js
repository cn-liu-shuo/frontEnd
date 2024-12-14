let timeUtil = {}

timeUtil.formatDate = (date, type) => {
  if (date === null) {
    return null
  }
  if ((date + '').indexOf('T') === -1) {
    return date
  }
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let minute = date.getMinutes()
  let second = date.getSeconds()
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? ('0' + second) : second
  if (type === 'ch') {
    return y + '年' + m + '月' + d + '日'
  } else {
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  }
}

timeUtil.getTimeFromDatePicker = (datePickerValue) => {
  if (datePickerValue === null || datePickerValue === '' || datePickerValue === undefined) {
    return null
  } else {
    return datePickerValue.getTime() / 1000
  }
}

timeUtil.dateFormatStr = (date, fmt) => {
  let o = {
    'M+': date.getMonth() + 1,                 // 月份
    'd+': date.getDate(),                    // 日
    'h+': date.getHours(),                   // 小时
    'm+': date.getMinutes(),                 // 分
    's+': date.getSeconds(),                 // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds()             // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export default timeUtil
