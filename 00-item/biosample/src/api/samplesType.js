import httpRequest from '@/utils/httpRequest'

export default {
  getAllSampleTypes (params) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/sampletype/AllTypeList'),
      method: 'get',
      params
    })
  },
  getSampleTypeInfo (id) {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/sampletype/info/' + id),
      method: 'get'
    })
  }
}
