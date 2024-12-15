import requset from "@/utils/request"

export function login(datas){
    return requset({
        method: "post",
        url: "/login",
        data: datas
    })
}