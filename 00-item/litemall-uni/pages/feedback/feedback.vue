<template>
	<view>
		<!-- 顶部导航 -->
		<view class="navbar">
			<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		</view>
		意见反馈
	</view>
</template>

<script>
	import {
		NavBar
	} from 'vant';
	export default {
		components: {
			[NavBar.name]: NavBar
		},
		data() {
			return {

			}
		},
		methods: {
			// 返回
			onClickLeft() {
				// 返回上一页
				uni.navigateBack()
			}
		}
	}
</script>

<style>

</style>