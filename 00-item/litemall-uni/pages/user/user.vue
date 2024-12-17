<template>
	<view class="user">
		<view class="top">
			<view class="icon">
				<van-icon name="setting-o" size="25" color="#fff" />
			</view>
			<view class="avatar">
				<image src="../../static/images/avatar_default.png" mode=""></image>
			</view>
			<view class="nickname">
				{{userInfo.nickName}}
			</view>
		</view>
		<!-- 我的订单 -->
		<view class="order">
			<van-cell title="我的订单" is-link value="全部订单" />
			<van-grid>
				<van-grid-item icon="credit-pay" text="待付款" />
				<van-grid-item icon="records-o" text="待发货" />
				<van-grid-item icon="logistics" text="待收货" />
				<van-grid-item icon="completed-o" text="已完成" />
			</van-grid>
		</view>
		<!-- 我的优惠券 -->
		<view class="coupon">
			<van-cell title="我的优惠券" is-link value="全部优惠券" />
			<van-grid :column-num="3">
				<van-grid-item icon="clock-o" text="待使用" />
				<van-grid-item icon="passed" text="已使用" />
				<van-grid-item icon="close" text="过期关闭" />
			</van-grid>
		</view>
		<!-- 我的收藏 -->
		<view class="collect">
			<van-cell title="我的收藏" is-link />
		</view>
		<!-- 收货地址 -->
		<view class="address">
			<van-cell title="收货地址" is-link />
		</view>
		<!-- 服务中心 -->
		<view class="server">
			<van-cell title="服务中心" is-link />
		</view>
	</view>
</template>

<script>
	import {
		Icon,
		Cell,
		CellGroup,
		Grid,
		GridItem
	} from 'vant';
	export default {
		components: {
			[Icon.name]: Icon,
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup,
			[Grid.name]: Grid,
			[GridItem.name]: GridItem
		},
		data() {
			return {
				userInfo: null
			}
		},
		onLoad(options) {
			this.userInfo = uni.getStorageSync('userInfo')
			console.log(this.userInfo);
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.user {
		background-color: #f2f2f2;
		width: 100%;
		height: 100vh;
	}

	.top {
		background-image: url('../../static/images/user_head_bg.png');
		background-repeat: no-repeat;
		background-size: cover;

		.icon {
			text-align: right;
			padding: 10rpx 10rpx 10rpx 0;
		}

		.avatar {
			text-align: center;

			image {
				width: 110rpx;
				height: 110rpx;
				border-radius: 50%;
			}
		}

		.nickname {
			text-align: center;
			font-size: 28rpx;
			color: #fff;
			padding: 20rpx 0;
		}
	}

	// 我的订单
	.order {
		margin-top: 20rpx;
	}
	
	// 我的优惠券
	.coupon {
		margin-top: 20rpx;
	}
	
	.collect {
		margin-top: 20rpx;
	}
</style>