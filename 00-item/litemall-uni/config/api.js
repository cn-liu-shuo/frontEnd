let BaseUrl = 'http://admin.bsmall.byesame.com/wx'

// 获取首页内容
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

// 获取分类页内容
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

// 获取分类页详细内容
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

// 登录
export function AuthLogin(data) {
	return new Promise((resolve,reject) => {
		uni.request({
			url: BaseUrl + '/auth/login',
			method: 'POST',
			data: data,
			success: res => resolve(res.data),
			fail: res => reject(res.data)
		})
	})
}

// 获取常见问题列表
export function IssueList() {
	return new Promise((resolve,reject) => {
		uni.request({
			url: BaseUrl + '/issue/list',
			method: 'GET',
			success: res => resolve(res.data),
			fail: res => reject(res.data)
		})
	})
}