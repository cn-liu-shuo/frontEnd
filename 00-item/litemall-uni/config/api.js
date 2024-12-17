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

export function CatalogIndex() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BaseUrl + '/catalog/index',
			method: 'GET',
			success: res => resolve(res.data),
			fail: res => reject(res.data)
		})
	})
}

export function CatalogCurrent(id) {
	return new Promise((resolve,reject) => {
		uni.request({
			url: BaseUrl + `/catalog/current?id=${id}`,
			method: 'GET',
			success: res => resolve(res.data),
			fail: res => reject(res.data)
		})
	})
}
