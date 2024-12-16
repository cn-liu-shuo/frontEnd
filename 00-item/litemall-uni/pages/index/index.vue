<template>
	<view class="container">
		<!-- 搜索栏 -->
		<uni-search-bar readonly placeholder="点击前往搜索" bgColor="#f7f8fa" />
		<!-- 轮播图 -->
		<swiper class="swiper" circular indicator-color="rgb(240, 240, 241)" indicator-active-color="#ffffff" indicator-dots autoplay :interval="2000" :duration="500">
			<swiper-item v-for="(item,index) in banner" :key="index">
				<image :src="item.url" style="width: 100%;"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		HomeIndex
	} from '../../config/api';
	export default {
		data() {
			return {
				banner: []
			}
		},
		methods: {
			getList() {
				HomeIndex().then(res => {
					if (res.errmsg === '成功') {
						console.log('res', res);
						this.banner = res.data.banner
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
.swiper {
	height: 460rpx !important;
}
</style>