import httpRequest from '@/utils/httpRequest'

export default {
  getSamplesDetailInfo (id) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/samplesdetail/info/' + id),
      method: 'get'
    })
  },
  getSamplesDetailDtoInfo (id) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/samples/detail/' + id),
      method: 'get'
    })
  },
  getForzenboxById (boxId) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/forzenbox/info/' + boxId),
      method: 'get'
    })
  },
  getBoxDetailInfo (boxId) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/forzenbox/box-detail-info/' + boxId),
      method: 'get'
    })
  },
  getSelectedCellByBoxId (boxId) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/samples/boxId/' + boxId),
      method: 'get'
    })
  },
  getBySampleId (sampleId) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/samplesdetail/getBySampleId/' + sampleId),
      method: 'get'
    })
  }
}
