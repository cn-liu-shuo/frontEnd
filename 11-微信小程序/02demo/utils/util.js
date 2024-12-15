const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
// 封装wx.login
function wxLogin(){
	return new Promise((resolve, reject) => {
		wx.login({
			success: res => {
				if (res.code) {
					resolve(res)
				}else{
					reject(res)
				}
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

// 封装wx.request
function request(url, data = {}, method = "get"){
	return new Promise((resolve, reject) => {
		let baseUrl = "http://admin.bsmall.byesame.com/wx"
		wx.request({
		  url: baseUrl + url,
		  data,
		  method,
		  header: {
			  "Content-Type": "application/json",
			  "X-ByeSame-Token": wx.getStorageSync('token')
		  },
		  success: res => {
			resolve(res)
		  },
		  fail: err => {
			  reject(err)
		  }
		})
	})
}

module.exports = {
	wxLogin,
	request,
  formatTime
}
