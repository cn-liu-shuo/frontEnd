<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			this.onLogin()
		},
		methods: {
			// 判断是否登录
			onLogin() {
				if (!uni.getStorageSync('token')) {
					uni.showToast({
						title: '未登录',
						icon: 'error'
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}, 2000)
				}
			}
		}
	}
</script>

<style>

</style>