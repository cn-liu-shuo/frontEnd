import httpRequest from '@/utils/httpRequest'

export default {
  getEquipmentDetailInfo (id) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/equipment/detail-info/' + id),
      method: 'get'
    })
  },
  getEquipmentList (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/equipment/list'),
      method: 'get',
      params: httpRequest.adornParams(params)
    })
  },
  exportExcel (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/equipment/export-excel-samples-store'),
      method: 'get',
      responseType: 'blob',
      withCredentials: false,
      params: params
    })
  },
  delete (id) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/equipment/delete'),
      method: 'post',
      data: [id]
    })
  },
  lsGetEquipmentmodelList (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/equipmentmodel/list'),
      method: 'get',
      params: httpRequest.adornParams(params)
    })
  },
  lsGetEquipmentGroupList (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/equipmentgroup/list'),
      method: 'get',
      params: httpRequest.adornParams(params)
    })
  },
  lsGetEquipmentGroupSequence (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/codecsequence/get-equipment-group-sequence'),
      method: 'get',
      params
    })
  },
  lsPostEquipmentgroup (data) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/equipmentgroup/save'),
      method: 'post',
      data: httpRequest.adornData(data)
    })
  },
  lsDeleteEquipmentgroup (ids) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/equipmentgroup/delete'),
      method: 'post',
      data: httpRequest.adornData(ids, false)
    })
  },
  lsGetEquipmentgroupRow (id) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/equipmentgroup/info/' + id),
      method: 'get',
      params: httpRequest.adornParams()
    })
  },
  lsUpdateEquipmentgroup (data) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/equipmentgroup/update'),
      method: 'post',
      data: httpRequest.adornData(data)
    })
  }
}
