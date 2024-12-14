// 随访记录
import request from '@/utils/httpRequest'

// 渲染列表
export function hyclist (params) {
  return request({
    url: request.adornUrl('/biosample/fluprecord/list'),
    method: 'get',
    params: params
  })
}

// 新增
export function hycaddlist (params) {
  return request({
    url: request.adornUrl('/biosample/fluprecord/save'),
    method: 'post',
    data: request.adornData(params)
  })
}

// 删除
export function hychandleDelete (id) {
  return request({
    url: request.adornUrl('/biosample/fluprecord/delete'),
    method: 'post',
    data: id
  })
}

// 修改
export function hycxiugai (params) {
  return request({
    url: request.adornUrl('/biosample/fluprecord/update'),
    method: 'post',
    data: params
  })
}
