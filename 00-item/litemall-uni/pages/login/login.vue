<template>
	<view>
		<view class="avatar">
			<image src="../../static/images/avatar_default.png" mode="widthFix"></image>
		</view>
		<view class="username">
			litemall-vue
		</view>
		<view class="ipt">
			<van-cell-group>
				<van-field v-model="queryInfo.username" clearable left-icon="user-circle-o" placeholder="请输入测试账号user123" />
			</van-cell-group>
			<van-cell-group>
				<van-field v-model="queryInfo.password" clearable left-icon="closed-eye" placeholder="请输入测试密码user123" />
			</van-cell-group>
		</view>
		<view class="subtitle">
			<view class="left">
				免费注册
			</view>
			<view class="right">
				忘记密码
			</view>
		</view>
		<view class="btn">
			<van-button type="danger" @click="onLogin">登录</van-button>
		</view>
		<view class="bottom">
			<view class="txt">技术支持：litemall</view>
		</view>
	</view>
</template>

<script>
	import {
		Cell,
		CellGroup,
		Field,
		Button
	} from 'vant';
	import {
		AuthLogin
	} from '../../config/api';
	export default {
		components: {
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Button.name]: Button
		},
		data() {
			return {
				queryInfo: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
			onLogin() {
				AuthLogin(this.queryInfo).then(res => {
					if(res.errmsg === '成功') {
						console.log(res);
						uni.setStorageSync('token', res.data.token)
						uni.switchTab({
							url: '/pages/user/user'
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	// 头像
	.avatar {
		text-align: center;
		padding-top: 60rpx;

		image {
			width: 110rpx;
			height: 110rpx;
			border-radius: 50%;
		}
	}

	// 用户名
	.username {
		text-align: center;
		padding-top: 10rpx;
		padding-bottom: 60rpx;
	}

	.ipt {
		padding: 0 40rpx;

		.van-cell-group {
			border: 2rpx solid #e5e5e5;
			margin-bottom: 20rpx;
		}
	}

	.subtitle {
		padding: 0 40rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
	}

	.btn {
		margin-top: 20rpx;
		padding: 0 40rpx;

		.van-button {
			width: 100%;
		}
	}

	.bottom {
		width: 100%;
		text-align: center;
		position: fixed;
		bottom: 100rpx;

		.txt {
			font-size: 24rpx;
			color: #999;
		}
	}
</style>