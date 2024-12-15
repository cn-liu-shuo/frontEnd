// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	userName: "",
	passWord: "",
  },
  goLogin(){
	wx.request({
	  url: 'http://wish.byesame.com/login',
	  method: "POST",
	  data: {
		  userName: this.data.userName,
		  passWord: this.data.passWord
	  },
	  header: {
		  "Content-Type": "application/x-www-form-urlencoded"
	  },
	  success(res){
		  console.log(res);
		//   同步
		  wx.setStorageSync('token', res.data.data.token)
		  console.log(wx.getStorageSync('token'));
		  wx.navigateTo({
			url: '/pages/list/list',
		  })
	  }
	})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
	console.log('监听页面加载');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
	console.log('监听页面初次渲染完成');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
	console.log('监听页面显示');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
	console.log('监听页面隐藏');
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
	console.log('监听用户下拉动作');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
	console.log('页面上拉触底事件');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
	console.log('用户点击右上角分享');
  }
})