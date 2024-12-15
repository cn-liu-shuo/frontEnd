// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	item: null
  },
  back(){
	//   返回上一页
	wx.navigateBack()
  },
  go(){
	// 跳转到tabbar
	wx.switchTab({
	  url: '/pages/mine/mine',
	})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
	// 接收跳转传参
	console.log(options);
	let prodList = [
		{
			pic: "/assets/pro_01.jpg",
			title: "平安保险",
			desc: "一会买个保险"
		},{
			pic: "/assets/pro_02.jpg",
			title: "太平洋保险",
			desc: "一会买两个保险"
		},{
			pic: "/assets/pro_03.jpg",
			title: "人寿保险",
			desc: "一会买三个保险"
		},
	]
	// 怎么去修改item?
	// this.setData({要赋值的data里的变量: 修改的值})
	this.setData({
		item: prodList[options.id]
	})
	// 获取
	// this.data.变量 只能查询不能修改，虽然修改了js数据，但是小程序没办法做到同步渲染
	console.log(this.data.item)
	

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
	console.log('监听页面卸载');
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