// 接口基准地址
const base_url = 'http://admin.bsmall.byesame.com/wx'

// 获取首页列表
export function HomeIndex() {
	return new Promise((resolve,reject) => {
		uni.request({
			url: base_url + '/home/index',
			method: 'GET',
			success: res => resolve(res.data),
			fail: res => reject(res.data)
		})
	})
}