import request from "@/utils/request"

// 列表
export function list(params){
    return request({
        method: "get",
        url: "/tienchin/clue/list",
        params: params
    })
}

// 渠道来源
export function channels(){
    return request({
        method: "get",
        url: "/tienchin/clue/channels",
    })
}

// 线索状态
export function clueStatus(){
    return request({
        method: "get",
        url: "/system/dict/data/type/clue_status",
    })
}

// 活动信息
export function activity(id){
    return request({
        method: "get",
        url: `/tienchin/clue/activity/${id}`,
    })
}

// 新增
export function clueAdd(data){
    return request({
        method: "post",
        url: `/tienchin/clue`,
        data
    })
}
// 删除
export function deleteClue(id){
    return request({
        method: "delete",
        url: `/tienchin/clue/${id}`,
    })
}

// 编辑详情
export function summaryClue(id){
    return request({
        method: "get",
        url: `/tienchin/clue/summary/${id}`,
    })
}

// 修改
export function updateClue(data){
    return request({
        method: "put",
        url: `/tienchin/clue`,
        data
    })
}

// 导出
export function exportClue(data){
    return request({
        method: "post",
        url: `/tienchin/course/export`,
        data,
        // 设置服务器返回的数据类型是个二进制文件对象（blob）
        responseType: "blob"
    })
}