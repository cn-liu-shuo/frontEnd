import request from "@/utils/request"


export function adminList(params){
    return request({
        method: "get",
        url: "/admin",
        params
    })
}

export function adminSearch(id){
    return request({
        method: "get",
        url: "/admin/" + id,
    })
}

export function admindel(data){
    return request({
        method: "delete",
        url: "/admin",
        data
    })
}

export function adminAdd(data){
    return request({
        method: "post",
        url: "/admin",
        data
    })
}

export function adminEdit(data){
    return request({
        method: "put",
        url: "/admin",
        data
    })
}