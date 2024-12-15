const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const utils = require('../../utils/util')
// 获取应用实例
const app = getApp()

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
  },
  loginByWX(e){
	console.log(e.detail.userInfo);
	if (e.detail.userInfo) {
		// 调用登录api
		this.getLoginCode(e.detail.userInfo)
	}else{
		wx.showToast({
		  title: '失败',
		  icon: "error",
		  duration: 2000
		})
	}
  },
//   获取临时登录凭证
  getLoginCode(userInfo){
	utils.wxLogin().then( async res => {
		console.log(res)
		let loginParams = {
			code: res.code,
			userInfo
		}
		// 调用登录接口
		let loginRes = await utils.request("/auth/login_by_weixin", loginParams, "post")
		console.log(loginRes);
		if (loginRes.data.errno == 0) {
			wx.setStorageSync('token', loginRes.data.data.token)
			wx.showToast({
				title: '登陆成功',
				icon: "success",
				duration: 2000
			  })
			wx.navigateTo({
			  url: '/pages/address/address',
			})

		}
	} )
  },
  onChooseAvatar(e) {
	const { avatarUrl } = e.detail 
	console.log(e.detail);
    this.setData({
      avatarUrl,
    })
  },
  getPhoneNumber (e) {
    console.log(e)  // 动态令牌
   
  },
  onLoad(){
	//   访问全局globalData
	console.log(app.globalData.name);
  }
})