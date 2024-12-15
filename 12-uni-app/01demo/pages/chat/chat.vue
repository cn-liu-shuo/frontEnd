<template>
	<view class="box">
		<view class="content">
			<view class="" v-for="(item, index) in chatList" :key="index">
				<!-- 其他人 -->
				<view class="txt" style="float: left;" v-if="item.userName != user">
					<image src="../../static/321.jpg" mode=""></image>
					<view class="msg">
						<text class="name">{{item.userName}}</text>
						<text class="info">{{item.data}}</text>
					</view>
				</view>
				<!-- 自己 -->
				<view class="txt" style="float: right;justify-content: flex-end;" v-else>
					<view class="msg">
						<text class="info">{{item.data}}</text>
					</view>
					<image src="../../static/ji.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="send">
			<input class="uni-input" v-model="msg" focus placeholder="自动获得焦点" />
			<button @click="send">发送</button>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatList: [],
				user: "ls",
				msg: null
			}
		},
		methods: {
			// 返回底部
			back() {
				uni.pageScrollTo({
					// 设置一个很大的值保证滚到底部
					screenTop: 9999,
					// 动画持续的时间
					duration: 300
				})
			},
			init() {
				// 链接后台
				uni.connectSocket({
					// zs ls ww
					url: "ws://124.220.152.89:8800/userName=" + this.user
				})
				// 2.接收数据
				uni.onSocketMessage((res) => {
					let obj = JSON.parse(res.data)
					console.log(obj)
					this.chatList = obj.chatList
					
					// 
					setTimeout(() => {
						this.back()
					},500)
				})
			},
			send() {
				// 发送聊天
				if (this.msg) {
					uni.sendSocketMessage({
						data: JSON.stringify({
							type: 2,
							data: this.msg
						})
					})
				}
				this.msg = null
			}
		},
		onShow() {
			this.init()
		},
		onHide() {
			// 关闭链接
			uni.closeSocket()
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .uni-input-input {
		background: #fff !important;
		border-radius: 20rpx;
		padding-left: 20rpx;
		height: 60rpx;
	}

	button {
		height: 60rpx;
		background: pink;
		font-size: 24rpx;
		color: #fff;
	}

	.send {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 40rpx;
		background: aquamarine;
	}

	.info {
		background: #fff;
		margin: 10rpx 20rpx;
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
	}

	.msg {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.txt {
		width: 100%;
		display: flex;
		align-items: flex-start;
		padding: 20rpx;
	}

	.name {
		margin: -10rpx 0 5rpx 20rpx;
		width: 100%;
	}

	image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.box {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 88rpx - 100rpx);
	}

	.content {
		flex: 9;
		width: 100%;
		background: skyblue;
		overflow-y: auto;
	}

	.send {
		flex: 1;
		width: 100%;
	}
</style>