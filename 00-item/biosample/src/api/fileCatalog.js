import httpRequest from '@/utils/httpRequest'

export default {
  getPersonCatalog (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/catalog/filecatalog/catalog-person'),
      method: 'get',
      params
    })
  },
  getAllSampleTypes (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/sampletype/AllTypeList'),
      method: 'get',
      params
    })
  },
  getSampleDetails (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/samples/detail/' + params),
      method: 'get'
    })
  }
}
