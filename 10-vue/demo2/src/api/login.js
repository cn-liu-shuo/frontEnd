// 登录相关
import request from "@/utils/request"

export function login(datas){
    return request({
        method: "post",
        url: "/login",
        data: datas
    })
}

// 个人信息
export function getInfo(){
    return request({
        method: "get",
        url: "/getInfo",
    })
}

// 验证码
export function captchaImage(){
    return request({
        method: "get",
        url: "/captchaImage",
    })
}