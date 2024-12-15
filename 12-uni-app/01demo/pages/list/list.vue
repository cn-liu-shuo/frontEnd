<template>
	<view>
		<uni-badge class="uni-badge-left-margin" :inverted="true" text="123" type="info" />
		<uni-card :is-shadow="true" v-for="(item,index) in list" :key="index">
			<text class="uni-h6">{{item.name}}</text>
		</uni-card>
	</view>
</template>

<script>
	import {
		admin
	} from '../../api/login';
	export default {
		data() {
			return {
				queryInfo: {
					page: 1,
					rows: 10
				},
				list: []
			}
		},
		methods: {
			getList() {
				admin(this.queryInfo).then(res => {
					console.log(res);
					this.list = res.data.data.list
				})
			}
		},
		created() {
			this.getList()
		},
		onLoad(e) {
			console.log("========", e);
		}
	}
</script>

<style scoped lang="scss">
	.container {
		overflow: hidden;
	}

	.custom-cover {
		flex: 1;
		flex-direction: row;
		position: relative;
	}

	.cover-content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40px;
		background-color: rgba($color: #000000, $alpha: 0.4);
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 15px;
		font-size: 14px;
		color: #fff;
	}

	.card-actions {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 45px;
		border-top: 1px #eee solid;
	}

	.card-actions-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.card-actions-item-text {
		font-size: 12px;
		color: #666;
		margin-left: 5px;
	}

	.cover-image {
		flex: 1;
		height: 150px;
	}

	.no-border {
		border-width: 0;
	}
</style>