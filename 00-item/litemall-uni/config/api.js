let BaseUrl = 'http://admin.bsmall.byesame.com/wx'

export function HomeIndex() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BaseUrl + '/home/index',
			method: 'GET',
			success: res => resolve(res.data),
			fail: res => reject(res.data)
		})
	})
}