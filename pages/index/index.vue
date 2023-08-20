<template>
	<view class="flex justify-around margin">
    <!-- <view class="">
      文本1
    </view>
    <view class="">
      文本1
    </view>
	  <tn-button backgroundColor="#01BEFF" fontColor="#080808">自定义颜色按钮</tn-button>
	  <tn-button backgroundColor="tn-bg-blue" fontColor="tn-color-white">自定义颜色按钮</tn-button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
