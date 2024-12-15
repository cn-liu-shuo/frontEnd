// pages/address/address.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 支付
	async pay(){
		let param = {
			addressId: 149,
			cartId: 0,
			couponId: -1,
			grouponLinkId: 0,
			grouponRulesId: 0,
			message: "",
			userCouponId: -1,
		}
		// 把购物车id及地址id等信息传递给后端，拿到订单id （提交订单）
		let orderRes = await util.request('/order/submit', param, 'post')
		console.log(orderRes);
		// 获取支付api所需要的参数
		let payRes = await util.request('/order/prepay',{orderId: orderRes.data.data.orderId}, 'post')
		wx.requestPayment({
		  nonceStr: payRes.data.data.nonceStr,
		  package: payRes.data.data.packageValue,
		  paySign: payRes.data.data.paySign,
		  timeStamp: payRes.data.data.timeStamp,
		  signType: payRes.data.data.signType,
		  success: res => {
			  wx.showToast({
				title: '支付成功',
				icon: "success"
			  })
		  },
		  fail: err => {
			  wx.showToast({
				title: '支付失败',
				icon: "error"
			  })
		  }
		})
  },
  
	async addShop() {
		// 新增星云酥
		let shop = {
			goodsId: 1070000,
			number: 1,
			productId: 85,
		}
		let shopRes = await util.request('/cart/add', shop, 'post')
  },
  
	// 新增一个地址
	address() {
		util.request('/address/list').then(async res => {
			console.log(res);
			if (res.data.data.total == 0) {
				// 没有地址就新增地址
				let param = {
					addressDetail: "1",
					areaCode: "110101",
					city: "市辖区",
					county: "东城区",
					id: 0,
					isDefault: true,
					name: "1",
					province: "北京市",
					tel: "13200000000",
				}
				let addRes = await util.request('/address/save', param, "post")
			} else {
				wx.showToast({
					title: '已有地址',
				})
				return false
			}
		})
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})