<template>
	<view class="index">
		<!-- 搜索 -->
		<view class="search">
			<van-search v-model="value" placeholder="请输入搜索关键词" />
		</view>
		<!-- 轮播图 -->
		<view class="swiper">
			<swiper style="height: 460rpx;" circular :indicator-dots="true" indicator-color="rgba(255,255,255,0.5)"
				indicator-active-color="#fff" :autoplay="true" :interval="2000" :duration="500">
				<swiper-item style="height: 460rpx;" v-for="item in banner" :key="item.id">
					<image style="width: 100%;height: 100%;" :src="item.url"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 通道 -->
		<view class="channel">
			<van-grid :border="false" :column-num="6">
				<van-grid-item v-for="item in channel" :key="item.id">
					<view class="img">
						<image :src="item.iconUrl" mode=""></image>
					</view>
					<view class="subtitle">
						<text>{{item.name}}</text>
					</view>
				</van-grid-item>
			</van-grid>
		</view>
		<!-- 优惠券 -->
		<view class="coupon">
			<view class="tit">优惠券</view>
			<view class="card">
				<view class="card-item" v-for="item in couponList" :key="item.id">
					<view class="top">
						<view class="discount">￥ <text>{{item.discount}}元</text> </view>
						<view class="name">{{item.name}}</view>
					</view>
					<view class="desc">{{item.desc}} - {{item.tag}}有效期：{{item.days}}天</view>
				</view>
			</view>
		</view>
		<!-- 团购专区 -->
		<view class="groupon">
			<van-cell title="团购专区" is-link value="更多团购商品" />
		</view>
		<!-- 品牌直供商 -->
		<view class="brand">
			<van-cell title="品牌直供商" is-link value="更多品牌商" />
			<van-grid :border="true" :column-num="2">
				<van-grid-item v-for="item in brandList" :key="item.id">
					<view class="img">
						<image style="width: 280rpx;height: 160rpx;" :src="item.picUrl"></image>
					</view>
					<view class="subtitle">
						{{item.name}}
					</view>
				</van-grid-item>
			</van-grid>
		</view>
		<!-- 新品首发 -->
		<view class="newGoods">
			<van-cell title="新品首发" is-link value="更多新品首发" />
			<van-grid :border="false" :column-num="2">
				<van-grid-item v-for="item in newGoodsList" :key="item.id">
					<view class="img">
						<image style="width: 340rpx;height: 360rpx;" :src="item.picUrl" mode=""></image>
					</view>
					<view class="name">{{item.name}}</view>
					<view class="retailPrice">￥{{item.retailPrice}}</view>
				</van-grid-item>
			</van-grid>
		</view>
		<!-- 人气推荐 -->
		<view class="hotGoods">
			<van-cell title="人气推荐" is-link value="更多人气推荐" />
			<view class="card" v-for="item in hotGoodsList" :key="item.id">
				<view class="left">
					<view class="img">
						<image style="width: 176rpx;height: 176rpx;" :src="item.picUrl" mode=""></image>
					</view>
				</view>
				<view class="right">
					<view class="name">{{item.name}}</view>
					<view class="brief">{{item.brief}}</view>
					<view class="price">
						<view class="retailPrice">￥ <text>{{item.retailPrice}}</text> .00</view>
						<view class="counterPrice">￥49</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 专题精选 -->
		<view class="topic">
			<van-cell title="专题精选" is-link value="更多专题精选" />
			<van-grid :column-num="2">
			  <van-grid-item v-for="item in topicList" :key="item.id">
			    <view class="img">
						<image style="width: 312rpx;" :src="item.picUrl" mode="widthFix"></image>
					</view>
					<view class="title">{{item.title}}</view>
					<view class="subtitle">{{item.subtitle}}</view>
			  </van-grid-item>
			</van-grid>
		</view>
	</view>
</template>

<script>
	import {
		HomeIndex
	} from '../../config/api';
	import {
		Search,
		Grid,
		GridItem,
		Cell,
		CellGroup,
		Card,
		Image as VanImage
	} from 'vant';
	export default {
		components: {
			[Search.name]: Search,
			[Grid.name]: Grid,
			[GridItem.name]: GridItem,
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup
		},
		data() {
			return {
				// 搜索
				value: '',
				// 轮播图
				banner: [],
				// 通道
				channel: [],
				// 优惠券
				couponList: [],
				// 团购专区
				grouponList: [],
				// 品牌直供商
				brandList: [],
				// 新品首发
				newGoodsList: [],
				// 人气推荐
				hotGoodsList: [],
				// 专题精选
				topicList: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				HomeIndex().then(res => {
					if (res.errmsg === '成功') {
						console.log(res);
						// 轮播图
						this.banner = res.data.banner
						// 通道
						this.channel = res.data.channel
						// 优惠券
						this.couponList = res.data.couponList
						// 团购专区
						this.grouponList = res.data.grouponList
						// 品牌直供商
						this.brandList = res.data.brandList
						// 新品首发
						this.newGoodsList = res.data.newGoodsList
						// 人气推荐
						this.hotGoodsList = res.data.hotGoodsList
						// 专题精选
						this.topicList = res.data.topicList
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.index {
		background-color: #f2f2f2;
		width: 100vw;
		height: 100%;
	}

	// 通道
	.channel {
		margin-top: 20rpx;
		background-color: #fff;

		.img {
			width: 80rpx;
			height: 40rpx;
			text-align: center;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.subtitle {
			margin-top: 10rpx;
			font-size: 28rpx;
			color: #333;
		}
	}

	// 优惠券
	.coupon {
		margin-top: 40rpx;
		background-color: #fff;
		padding: 20rpx 32rpx;

		.tit {
			font-size: 28rpx;
			color: #323233;
		}

		.card-item {
			border: 2rpx solid #ff0000;
			border-radius: 40rpx;
			margin: 20rpx 0;
			padding: 40rpx;

			.top {
				display: flex;

				.discount {
					font-size: 24rpx;
					color: #ff4444;

					text {
						font-size: 48rpx;
					}
				}

				.name {
					line-height: 64rpx;
					margin-left: 40rpx;
				}
			}

			.desc {
				font-size: 24rpx;
				color: #969799;
			}
		}
	}

	// 团购专区
	.groupon {
		margin-top: 40rpx;
	}

	// 品牌直供商
	.brand {
		margin-top: 40rpx;
	}

	// 新品首发
	.newGoods {
		margin-top: 40rpx;

		.name {
			font-size: 28rpx;
			color: #7b7474;
		}

		.retailPrice {
			font-size: 28rpx;
			color: #ab956d;
		}
	}

	// 人气推荐
	.hotGoods {
		margin-top: 40rpx;

		.card {
			padding: 16rpx 32rpx;
			background-color: #fff;
			display: flex;

			.right {
				padding: 16rpx 32rpx;

				.name {
					font-size: 28rpx;
					color: #323233;
				}

				.brief {
					font-size: 28rpx;
					color: #646566;
				}

				.price {
					margin-top: 30rpx;
					display: flex;

					.retailPrice {
						font-size: 24rpx;
						color: #323233;

						text {
							font-size: 32rpx;
						}
					}

					.counterPrice {
						font-size: 20rpx;
						color: #969799;
						text-decoration: line-through;
						line-height: 40rpx;
						margin-left: 10rpx;
					}
				}
			}
		}
	}

	// 专题精选
	.topic {
		margin-top: 40rpx;
		.title {
			color: #ab956d;
			font-size: 28rpx;
		}
		.subtitle {
			font-size: 20rpx;
			color: #ab956d;
		}
	}
</style>