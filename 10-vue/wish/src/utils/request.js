import axios from 'axios'
import { Message } from 'element-ui'
import { MessageBox } from "element-ui";
import router from '@/router'
import Qs from 'qs'


const service = axios.create({
    baseURL: "http://wish.byesame.com",
    timeout: 5000
})

service.interceptors.request.use((config) => {
    // 登录
    let token = localStorage.getItem('token')
    if (token && config.url != "/login") {
        config.headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            token
        }
    }

    if (config.method == 'get') {
        config.paramsSerializer = function(params){
            return Qs.stringify(params)
        }
    }

    

    return config
})


service.interceptors.response.use((res) => {
    console.log(res)
    if (res.status == 200 && res.data.code == 200) {
        return res.data
    }else if (res.data.code == 101) {
        Message.error("用户名或密码错误")
    }else if(res.data.code == 401){
        MessageBox({
            title: "提示",
            message: "您的登录已过期，请重新登录",
            showCancelButton: false,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false
          }).then(() => {
            // 送去登录
            router.push({
                path: "/login"
            })
            localStorage.removeItem('token')
          });
        return res.data
    }else{
        return Promise.reject(res.data)
    }
    
})

export default service