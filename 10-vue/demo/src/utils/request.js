import axios from "axios";
import Qs from "qs"

let baseUrl = "http://wish.byesame.com"

const service = axios.create({
    baseURL: baseUrl,
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
    config.headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    if (config.method == "get") {
        config.paramsSerializer = function(params){
            return Qs.stringify(params)
        }
    }

    return config
}, (err) => {
    return Promise.reject(err)
})

// 响应拦截器
service.interceptors.response.use(res => {
    console.log(res)
    if (res.status == 200) {
        return res.data
    }
})

export default service
