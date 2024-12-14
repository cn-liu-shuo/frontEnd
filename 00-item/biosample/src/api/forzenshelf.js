import httpRequest from '@/utils/httpRequest'

export default {
  batchAddShelf (data) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/forzenshelf/batch-add'),
      method: 'post',
      data: data
    })
  },
  getShelfByEquipmentId (equipmentId) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/forzenshelf/getShelfByEquipmentId/' + equipmentId),
      method: 'get'
    })
  },
  lsGetShelfForzenList (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/forzenshelf/list'),
      method: 'get',
      params: httpRequest.adornParams(params)
    })
  },
  lsDelShelfForzen (ids) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/forzenshelf/delete'),
      method: 'post',
      data: httpRequest.adornData(ids, false)
    })
  }
}
