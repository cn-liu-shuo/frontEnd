// components/child/child.js
Component({
	// 接收父组件发送的数据
	properties: {
		title: {
			type: String
		}
	},
  /**
   * 页面的初始数据
   */
  data: {
	son: "猪耳朵"
  },
  methods: {
	send(){
		// 通过this.triggerEvent 向父组件发送数据
		this.triggerEvent("myson", this.data.son)
	  },
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