<template>
	<view>
		<van-search readonly placeholder="点击前往搜索" />
		<view class="content">
			<view class="tab">
				<van-sidebar v-model="activeKey" @change="onChange">
					<van-sidebar-item v-for="item in categoryList" :key="item.id" :title="item.name" />
				</van-sidebar>
			</view>
			<view class="detail">
				<view class="img">
					<image style="width: 500rpx; height: 160rpx;" :src="currentCategory.picUrl" mode="widthFix"></image>
				</view>
				<view class="desc">{{currentCategory.desc}}</view>
				<van-grid :border="false" :column-num="3">
					<van-grid-item v-for="item in currentSubCategory" :key="item.id">
						<view class="img">
							<image style="width: 140rpx;height: 140rpx;" :src="item.picUrl" mode=""></image>
						</view>
						<view class="name">{{item.name}}</view>
					</van-grid-item>
				</van-grid>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		Search,
		Sidebar,
		SidebarItem,
		Grid,
		GridItem
	} from 'vant';
	import {
		CatalogIndex,
		CatalogCurrent
	} from '../../config/api';
	export default {
		components: {
			[Search.name]: Search,
			[Sidebar.name]: Sidebar,
			[SidebarItem.name]: SidebarItem,
			[Grid.name]: Grid,
			[GridItem.name]: GridItem
		},
		data() {
			return {
				activeKey: 0,
				categoryList: [],
				currentCategory: {},
				currentSubCategory: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				CatalogIndex().then(res => {
					if (res.errmsg === '成功') {
						console.log(res);
						this.categoryList = res.data.categoryList
						this.currentCategory = res.data.currentCategory
						this.currentSubCategory = res.data.currentSubCategory
					}
				})
			},
			onChange(index) {
				CatalogCurrent(this.categoryList[index].id).then(res => {
					if(res.errmsg === '成功') {
						this.currentCategory = res.data.currentCategory
						this.currentSubCategory = res.data.currentSubCategory
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;

		.tab {
			.van-sidebar-item {
				padding: 24rpx 52rpx;
				background-color: #fff;
				border-bottom: 1rpx solid #e5e5e5;
			}

			.van-sidebar-item--select {
				color: red;
			}

			.van-sidebar-item--select::before {
				width: 2rpx;
				height: 100%;
			}
		}

		.detail {
			margin: 0 auto;

			.img {
				text-align: center;
			}

			.desc {
				font-size: 26rpx;
				text-align: center;
				margin: 20rpx 0;
			}

			::v-deep.van-grid-item__content {
				padding: 0 !important;
			}
		}
	}
</style>