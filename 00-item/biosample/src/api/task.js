import httpRequest from '@/utils/httpRequest'
export function getList (params) {
  return httpRequest({
    url: httpRequest.adornUrl('/biosample/task/list'),
    method: 'get',
    params: params
  })
}
export function getAd (params) {
  return httpRequest({
    url: httpRequest.adornUrl('/biosample/task/save'),
    method: 'post',
    data: params
  })
}
export function delApp (id) {
  return httpRequest({
    url: httpRequest.adornUrl('/biosample/task/delete'),
    method: 'post',
    data: id
  })
}

export function bianji (ccc) {
  return httpRequest({
    url: httpRequest.adornUrl('/biosample/task/update'),
    method: 'post',
    data: ccc
  })
}
