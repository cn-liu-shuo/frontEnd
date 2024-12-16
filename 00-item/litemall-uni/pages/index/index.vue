<template>
	<view class="container">
		<!-- 搜索栏 -->
		<view class="search">
			<uni-search-bar readonly placeholder="点击前往搜索" bgColor="#f7f8fa" />
		</view>
		<!-- 轮播图 -->
		<swiper class="swiper" circular indicator-color="rgb(240, 240, 241)" indicator-active-color="#ffffff" indicator-dots
			autoplay :interval="2000" :duration="500">
			<swiper-item v-for="(item,index) in banner" :key="index">
				<image :src="item.url" style="width: 100%;"></image>
			</swiper-item>
		</swiper>
		<!-- 小图标列表 -->
		<view class="channel">
			<uni-grid :column="6" :show-border="false" :highlight="true" @change="change">
				<uni-grid-item v-for="(item, index) in channel" :index="index" :key="item.id">
					<view class="grid-item-box" style="background-color: #fff;">
						<image style="width: 40rpx" :src="item.iconUrl" mode="widthFix"></image>
						<text class="text">{{item.name}}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	import {
		HomeIndex
	} from '../../config/api';
	export default {
		data() {
			return {
				banner: [],
				channel: []
			}
		},
		methods: {
			getList() {
				HomeIndex().then(res => {
					if (res.errmsg === '成功') {
						console.log('res', res);
						this.banner = res.data.banner
						this.channel = res.data.channel
					}
				})
			}
		},
		created() {
			this.getList()
		}
	}
</script>

<style scoped lang="scss">
	.search {
		background-color: #ffffff;
	}
	.swiper {
		height: 460rpx !important;
	}

	.channel {
		background-color: #ffffff;
		margin-top: 10rpx;
		.image {
			width: 50rpx;
			height: 50rpx;
		}

		.text {
			font-size: 28rpx;
			margin-top: 10rpx;
		}

		.example-body {
			/* #ifndef APP-NVUE */
			// display: block;
			/* #endif */
		}

		.grid-dynamic-box {
			margin-bottom: 30rpx;
		}

		.grid-item-box {
			flex: 1;
			// position: relative;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

		.grid-item-box-row {
			flex: 1;
			// position: relative;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}

		.grid-dot {
			position: absolute;
			top: 10rpx;
			right: 30rpx;
		}

		.swiper {
			height: 840rpx;
		}

		/* #ifdef H5 */
		@media screen and (min-width: 1536rpx) and (max-width: 2850rpx) {
			.swiper {
				height: 1260rpx;
			}
		}

		@media screen and (min-width: 2850rpx) {
			.swiper {
				height: 1660rpx;
			}
		}
		/* #endif */
	}
</style>