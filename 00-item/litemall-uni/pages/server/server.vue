<template>
	<view class="server">
		<!-- 顶部导航 -->
		<view class="navbar">
			<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		</view>
		<van-cell-group>
			<!-- 联系客服 -->
			<van-cell title="联系客服" is-link @click="showPopup" />
			<van-popup v-model="show" style="width: 80%;padding: 40rpx;">
				<van-cell-group>
					<van-cell title="项目名称" value="litemall" />
					<van-cell title="项目地址" value="Github" />
					<van-cell title="项目地址" value="Gitee" />
					<van-cell title="联系电话" value="021-xxxx-xxxx" />
					<van-cell title="联系QQ" value="738696120" />
					<van-cell title="当前版本" value="V1.0" />
					<van-cell title="开源协议" value="MIT" />
				</van-cell-group>
			</van-popup>
			<!-- 意见反馈 -->
			<van-cell title="意见反馈" is-link @click="onFeedback"/>
			<!-- 常见问题 -->
			<van-cell title="常见问题" is-link @click="onHelp"/>
		</van-cell-group>
	</view>
</template>

<script>
	import {
		NavBar,
		Cell,
		CellGroup,
		Popup
	} from 'vant';
	export default {
		components: {
			[NavBar.name]: NavBar,
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup,
			[Popup.name]: Popup
		},
		data() {
			return {
				show: false,
			}
		},
		methods: {
			// 返回按钮
			onClickLeft() {
				uni.navigateBack()
			},
			showPopup() {
				this.show = true;
			},
			// 跳转到意见反馈页
			onFeedback() {
				uni.navigateTo({
					url: '/pages/feedback/feedback'
				})
			},
			// 跳转到常见问题页
			onHelp() {
				uni.navigateTo({
					url: '/pages/help/help'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.server {
		background-color: #f2f2f2;
		width: 100%;
		height: 100vh;
	}
</style>