import httpRequest from '@/utils/httpRequest'
export function Whlist (params) {
  return httpRequest({
    url: httpRequest.adornUrl('/biosample/flupplan/list'),
    method: 'get',
    params: params
  })
}

export function Whadd (val) {
  return httpRequest({
    url: httpRequest.adornUrl('/biosample/flupplan/save'),
    method: 'post',
    data: val
  })
}

export function Whdell (val) {
  return httpRequest({
    url: httpRequest.adornUrl('/biosample/flupplan/delete'),
    method: 'post',
    data: val
  })
}
export function Whxiugai (val) {
  return httpRequest({
    url: httpRequest.adornUrl('/biosample/flupplan/update'),
    method: 'post',
    data: val
  })
}
