// pages/list/list.js
// 导入request
const utils = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
	list: [],
	page: 1,
	flag: false
  },
  getList(){
	wx.showLoading({
		title: '加载中',
	})
	let url = 'http://wish.byesame.com/wish'
	// 使用
	utils.request(url, {
		page: this.data.page,
		rows: 10
	}).then(res => {
		console.log(res);
		// console.log(this.data.list)
		wx.hideLoading()
		this.setData({
			list: [...this.data.list, ...res.data.data.list]
		})
	})

	//   let _this = this
	//   wx.request({
	// 	url: 'http://wish.byesame.com/wish',
	// 	method: "GET",
	// 	data: {
	// 		page: this.data.page,
	// 		rows: 10
	// 	},
	// 	header: {
	// 		"token": wx.getStorageSync('token')
	// 	},
	// 	success: (res) => {
	// 		console.log(res);
	// 		// console.log(this.data.list)
	// 		wx.hideLoading()
	// 		this.setData({
	// 			list: [...this.data.list, ...res.data.data.list]
	// 		})
	// 	}
	//   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
	this.getList()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
	this.setData({
		page: 1,
		list: []
	})
	this.getList()
	wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
	// 
		setTimeout(() => {
			this.setData({
				page: ++this.data.page,
				flag: false
			})
			this.getList()
		}, 1000)
	 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})