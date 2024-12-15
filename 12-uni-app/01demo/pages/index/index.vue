<template>
	<view class="content">
		<view class="" v-for="(item, index) in list" :key="index">{{item}} --- {{index}}</view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item>
					<view class="swiper-item uni-bg-red">
						<image src="../../static/ji.png" mode="widthFix"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">
						<image src="../../static/123.jpg" mode="widthFix"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-blue">
						<image src="../../static/321.jpg" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<button @click="go">跳转tabbar页面</button>
		<button @tap="goTo">跳转到非tabbar</button>
		<!-- 条件编译 -->
		<!-- 只在H5端显示 -->
		<!-- #ifdef H5 -->
			<text>H5显示</text>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				list: ["钢蛋", "铁蛋", "不锈钢蛋", "钛合金狗蛋"],
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		onLoad() {
			// 调用vueX
			// #ifdef H5
			console.log(this.$store.state.count)
			// #endif
		},
		methods: {
			go(){
				uni.switchTab({
					url: "/pages/mine/mine"
				})
			},
			goTo(){
				uni.navigateTo({
					url: "/pages/list/list?id=0"
				})
			}
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			setTimeout(() => {
				// 停止下拉刷新
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style scoped lang="scss">
	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}

	.swiper {
		height: 300rpx;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}

	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}

	.info {
		position: absolute;
		right: 20rpx;
	}

	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
