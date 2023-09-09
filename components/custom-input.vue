<template>
	<view class="custom-input flex align-center padding-lr">
		<text class="iconfont margin-right" :class="icon"></text>
		<input type="text" v-bind:value="value" @input="handleInput" :placeholder="placeholder"/>
	</view>
</template>

<script>
	export default {
		name:"custom-input",
		props: {
			placeholder: {
				type: String,
				default: '开始寻找你梦寐以求的工作...'
			},
			icon:{
				type:String,
				default:'icon-a-001_sousuo'
			},
      value:{
        type:String,
      }
		},
    methods:{
      handleInput(e){
        this.$emit('input',e.target.value)
      }
    },
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.custom-input{
	height: 96upx;
	opacity: 1;
	border-radius: 8px;
	background: rgba(255, 255, 255, 1);
	border: 1px solid rgba(238, 238, 238, 1);
	.iconfont{
		font-size: 40upx;
		color: rgba(102, 110, 122, 1);
	}
}
</style>