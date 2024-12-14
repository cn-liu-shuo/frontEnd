// 样本来源
import request from '@/utils/httpRequest'

// 渲染列表
export function hyclist (params) {
  return request({
    url: request.adornUrl('/biosample/donorsinfo/list'),
    method: 'get',
    params: params
  })
}

// 新增

export function hycaddlist (params) {
  return request({
    url: request.adornUrl('/biosample/donorsinfo/save'),
    method: 'post',
    data: params
  })
}

// 删除
export function hychandleDelete (id) {
  return request({
    url: request.adornUrl('/biosample/donorsinfo/delete'),
    method: 'post',
    data: id
  })
}

// 修改
export function hycxiugai (params) {
  return request({
    url: request.adornUrl('/biosample/donorsinfo/update'),
    method: 'post',
    data: params
  })
}
