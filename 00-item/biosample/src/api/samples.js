import httpRequest from '@/utils/httpRequest'

export default {
  getSamplesInfo (id) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/samples/info/' + id),
      method: 'get'
    })
  },
  saveSamplesCollect (data) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/samples/save-collect'),
      method: 'post',
      data
    })
  },
  getInfoBySamplesCode (samplesCode) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/samples/get-info-by-code/' + samplesCode),
      method: 'get'
    })
  },
  getDictList () {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/samples/dict-list'),
      method: 'get'
    })
  },
  getLastOneByCreator () {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/samples/getLastOneByCreator'),
      method: 'get'
    })
  },
  getTableList (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/samples/list-vo'),
      method: 'get',
      params
    })
  }
}
