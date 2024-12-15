// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
	data: {
		// 是否显示面板指示点
		indicatorDots: true,
		// 是否自动切换
		autoplay: true,
		// 自动切换时间间隔
		interval: 2000,
		// 滑动动画时长
		duration: 500,
		list: [
			{
				url: "/assets/swiper01.jpg",
				title: "图片1"
			},
			{
				url: "/assets/swiper02.jpg",
				title: "图片2"
			},
			{
				url: "/assets/swiper03.jpg",
				title: "图片3"
			}
		],
		prodList: [
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
		],
		type: 1
	},
	// 方法和data同级
	handleClick(e){
		console.log("哈哈", e);
		// 接收参数 e.currentTarget.dataset
		let id = e.currentTarget.dataset.id
		// 跳转到detail 非tabber
		wx.navigateTo({
		  url: '/pages/detail/detail?id=' + id,
		})
	},
	father(){
		console.log("我是爸爸");
	},
	son(){
		console.log("你是儿子");
	}
})