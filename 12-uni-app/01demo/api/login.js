let baseUrl = "http://wish.byesame.com"
import {
	myHeaders
} from "../utils/utils"

export function login(data) {
	return uni.request({
		url: baseUrl + '/login',
		method: 'POST',
		data: data
	})
}

export function admin(data) {
	return uni.request({
		url: baseUrl + '/admin',
		method: 'GET',
		data: data,
		header: myHeaders()
	})
}