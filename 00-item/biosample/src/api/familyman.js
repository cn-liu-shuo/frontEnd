import httpRequest from '@/utils/httpRequest'

export default {
  getFamilyManList (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/familyman/AllList'),
      method: 'get',
      params
    })
  },
  getFamilyManInfo (id) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/familyman/info/' + id),
      method: 'get'
    })
  },
  getList (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/familyman/list'),
      method: 'get',
      params: params
    })
  },
  getADD (query) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/familyman/save'),
      method: 'post',
      data: query
    })
  },
  getId (id) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/familyman/info/' + id),
      method: 'get'
    })
  },
  xiugai (data) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/familyman/update'),
      method: 'post',
      data
    })
  },
  newAdd (data) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/donorsinfo/update'),
      method: 'post',
      data: httpRequest.adornData(data)
    })
  },
  jianT (id) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/donorsinfo/getByIdCard/' + id),
      method: 'get'
    })
  },
  lookI (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/donorsinfo/list'),
      method: 'get',
      params
    })
  },
  kId (id) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/familyman/info/' + id),
      method: 'get'
    })
  }
}
