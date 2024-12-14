
import httpRequest from '@/utils/httpRequest'

export default {
  save (data) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/forzenshelfpositiondiable/save'),
      method: 'post',
      data: data
    })
  },
  getPositionDisableByEquipmentId (equipmentId) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/forzenshelfpositiondiable/list-by-equipment/' + equipmentId),
      method: 'get'
    })
  },
  delete (ids) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/forzenshelfpositiondiable/delete'),
      method: 'post',
      data: httpRequest.adornData(ids, false)
    })
  }
}
