import httpRequest from '@/utils/httpRequest'

export default {
  getSequenceNo (data) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/codecsequence/get-multi-sequence'),
      method: 'post',
      data
    })
  },
  getEquipmentGroupSequence () {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/codecsequence/get-equipment-group-sequence'),
      method: 'get'
    })
  },
  getEquipmentSequence () {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/codecsequence/get-equipment-sequence'),
      method: 'get'
    })
  },
  getShelfSequence () {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/codecsequence/get-shelf-sequence'),
      method: 'get'
    })
  },
  getBoxSequence () {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/codecsequence/get-box-sequence'),
      method: 'get'
    })
  }
}
