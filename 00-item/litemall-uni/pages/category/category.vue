<template>
	<view class="category">
		<!-- 搜索栏 -->
		<view class="search">
			<uni-search-bar readonly placeholder="点击前往搜索" bgColor="#f7f8fa" />
		</view>
		<!-- 页面主要内容 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	// 页面颜色
	.category {
		background-color: #fff;
		width: 100vw;
		height: calc(100vh - 100rpx);
	}
// 搜索栏
.search {
	background-color: #fff;
}
</style>
