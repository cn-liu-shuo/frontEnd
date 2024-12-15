<template>
	<view>
		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			:autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
			indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover"
						v-if="item.type=='video'"></video>
				</view>
			</swiper-item>
		</swiper>
		<button class="cu-btn bg-green shadow" @tap="LoadModal">
			点我
		</button>
		<view class="cu-load load-modal" v-if="loadModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="/static/logo.png" mode="aspectFit"></image>
			<view class="gray-text">加载中...</view>
		</view>
		<view class="example">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item label="用户名" required name="userName">
					<uni-easyinput v-model="valiFormData.userName" placeholder="请输入用户名" />
				</uni-forms-item>
				<uni-forms-item label="密码" required name="passWord">
					<uni-easyinput type="password" v-model="valiFormData.passWord" placeholder="请输入密码" />
				</uni-forms-item>
			</uni-forms>
			<button @click="submit('valiForm')">登录</button>
		</view>
	</view>
</template>

<script>
	import {
		login
	} from '../../api/login';
	export default {
		data() {
			return {
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				loadModal: false,
				// 校验表单数据
				valiFormData: {
					name: '',
					age: ''
				},
				// 校验规则
				rules: {
					userName: {
						rules: [{
							required: true,
							errorMessage: '用户名不能为空'
						}]
					},
					passWord: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}]
					}
				},
			}
		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			LoadModal(e) {
				this.loadModal = true;
				setTimeout(() => {
					this.loadModal = false;
				}, 2000)
			},
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					// uni.request({
					// 		url: "http://wish.byesame.com/login",
					// 		method: 'POST',
					// 		data: res,
					// 		success: (res) => {
					// 			console.log(res);
					// 		}
					// 	}
					// })
					login(res).then(res => {
						console.log(res);
						if (res.data.code === 200) {
							uni.setStorageSync("token", res.data.data.token)
							uni.navigateTo({
								url: '/pages/list/list'
							})
						}
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
		}
	}
</script>

<style>
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}

	.example {
		padding: 15px;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}
</style>