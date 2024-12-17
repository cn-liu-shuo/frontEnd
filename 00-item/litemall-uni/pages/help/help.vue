<template>
	<view class="help">
		<!-- 顶部导航 -->
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<!-- 问题列表 -->
		<van-collapse v-model="activeName" accordion>
			<van-collapse-item v-for="item in list" :key="item.id" :title="item.question">{{item.answer}}</van-collapse-item>
		</van-collapse>
	</view>
</template>

<script>
	import {
		NavBar,
		Collapse,
		CollapseItem
	} from 'vant';
	import {
		IssueList
	} from '../../config/api';
	export default {
		components: {
			[NavBar.name]: NavBar,
			[Collapse.name]: Collapse,
			[CollapseItem.name]: CollapseItem
		},
		data() {
			return {
				activeName: '1',
				list: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				IssueList().then(res => {
					if (res.errmsg === '成功') {
						this.list = res.data.list
					}
				})
			},
			// 返回
			onClickLeft() {
				// 返回上一页
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped lang="scss">
.help {
	background-color: #f2f2f2;
	width: 100%;
	height: 100vh;
}
</style>