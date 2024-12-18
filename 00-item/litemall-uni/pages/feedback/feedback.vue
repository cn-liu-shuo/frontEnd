<template>
	<view class="feedback">
		<!-- 顶部导航 -->
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<view class="tit">
			反馈类型
		</view>
		<van-cell is-link arrow-direction="down" @click="showPopup">{{feedType}}</van-cell>
		<van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
			<van-picker :columns="columns" @change="onChange" />
		</van-popup>
		<view class="tit">
			反馈内容
		</view>
		<textarea v-model="content" rows="10"
			style="background-color: #fff; width: 92%;height: 480rpx;padding: 24rpx 32rpx;" :placeholder="placeholder"
			placeholder-style="font-size: 28rpx;line-height: 1.5;color: #c8c9cc;"></textarea>
		<view class="tit">
			联系方式
		</view>
		<input class="ipt" type="text" v-model="mobile" placeholder="请输入联系电话,方便我们与您联系"
			placeholder-style="font-size: 28rpx;color: #c8c9cc;" />
		<van-button type="primary" size="large" @click="onSubmit">提交</van-button>
	</view>
</template>

<script>
	import {
		NavBar,
		Cell,
		Popup,
		Picker,
		Button
	} from 'vant';
	import {
		FeedbackSubmit
	} from '../../config/api';
	export default {
		components: {
			[NavBar.name]: NavBar,
			[Cell.name]: Cell,
			[Popup.name]: Popup,
			[Picker.name]: Picker,
			[Button.name]: Button
		},
		data() {
			return {
				feedType: '',
				content: '',
				mobile: '',
				show: false,
				columns: ['商品相关', '功能异常', '优化建议', '其他'],
				placeholder: '对我们网站、商品、服务，你还有什么建议吗？你还希望在商城上买到什么？请告诉我们...'
			}
		},
		methods: {
			// 返回
			onClickLeft() {
				// 返回上一页
				uni.navigateBack()
			},
			// 弹出层
			showPopup() {
				this.show = true
			},
			// 选择器
			onChange(picker, value, index) {
				this.feedType = value
			},
			// 提交按钮
			onSubmit() {
				if (!this.feedType && !this.content && !this.mobile) {
					uni.showToast({
						title: '请输入联系电话',
						icon: 'none'
					})
				} else if (!this.feedType && !this.content) {
					uni.showToast({
						title: '请选择反馈类型',
						icon: 'none'
					})
				} else if (!this.content) {
					uni.showToast({
						title: '请输入反馈内容',
						icon: 'none'
					})
				} else if (this.mobile.length !== 11) {
					uni.showToast({
						title: '参数不对',
						icon: 'error'
					})
				} else {
					FeedbackSubmit({
						feedType: this.feedType,
						content: this.content,
						mobile: this.mobile
					}).then(res => {
						if (res.errmsg === '成功') {
							console.log(res);
							setTimeout(() => {
								uni.showToast({
									title: '感谢您宝贵的意见',
									icon: 'none'
								})
							}, 1000)
							this.onClickLeft()
						}
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.feedback {
		background-color: #f2f2f2;
		width: 100%;
		height: 100vh;
	}

	.tit {
		padding: 32rpx 32rpx 16rpx;
		font-size: 28rpx;
		color: #969799;
	}

	.ipt {
		padding: 24rpx 32rpx;
		background-color: #fff;
	}
</style>