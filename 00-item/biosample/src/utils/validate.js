/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 根据身份证号得到姓别和精确计算年龄
 */
export function analyzeIDCard (IDCard) {
  let sexAndAge = {}
  // 获取用户身份证号码
  let userCard = IDCard
  // 如果身份证号码为undefind则返回空
  if (!userCard) {
    return sexAndAge
  }
  // 得到性别
  if (parseInt(userCard.substr(16, 1)) % 2 === 1) {
    sexAndAge.sex = 1 // （男）
  } else {
    sexAndAge.sex = 2 // （女）
  }
  // 获取出生年月日
  // userCard.substring(6,10) + "-" + userCard.substring(10,12) + "-" + userCard.substring(12,14);
  let yearBirth = userCard.substring(6, 10)
  let monthBirth = userCard.substring(10, 12)
  let dayBirth = userCard.substring(12, 14)
  // 得到出生日期
  sexAndAge.birthday = new Date(yearBirth, monthBirth - 1, dayBirth)
  // 获取当前年月日并计算年龄
  let myDate = new Date()
  let monthNow = myDate.getMonth() + 1
  let dayNow = myDate.getDay()
  let age = myDate.getFullYear() - yearBirth
  if (monthNow < monthBirth || (monthNow === monthBirth && dayNow < dayBirth)) {
    age--
  }
  // 得到年龄
  sexAndAge.age = age
  // 返回性别和年龄
  return sexAndAge
}
