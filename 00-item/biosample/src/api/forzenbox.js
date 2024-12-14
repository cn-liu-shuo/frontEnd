
import httpRequest from '@/utils/httpRequest'

export default {
  batchAddShelf (data) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/forzenshelf/batch-add'),
      method: 'post',
      data: data
    })
  },
  getBoxByEquipmentId (equipmentId) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/forzenbox/getBoxByEquipmentId/' + equipmentId),
      method: 'get'
    })
  },
  getBoxsByShelfId (shelfId) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/forzenbox/getBoxByShelfId/' + shelfId),
      method: 'get'
    })
  },
  batchAddBox (data) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/forzenbox/batch-add'),
      method: 'post',
      data: data
    })
  }
}
