export function myHeaders() {
	let headerObj = {}
	if (uni.getStorageSync('token')) {
		headerObj.token = uni.getStorageSync('token')
	}
	return headerObj
}
