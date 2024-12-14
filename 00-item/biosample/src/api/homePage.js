import httpRequest from '@/utils/httpRequest'

export default {
  getHomePage () {
    return httpRequest({
      url: httpRequest.adornUrl('/biosample/home/info'),
      method: 'get'
    })
  }
}
