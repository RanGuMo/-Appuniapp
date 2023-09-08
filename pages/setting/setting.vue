<template>
  <view>
    <view class="padding text-center">
      <image class="cu-avatar xl round" src="../../static/img/avatar2.png" mode=""></image>
      <view class="margin-top-sm">
        <button class="cu-btn line-orange">修改头像</button>
      </view>
    </view>
    
    <view class="padding">
      <view class="margin-bottom-sm">
        姓名
      </view>
      <custom-input placeholder='请输入姓名'/>
    </view>
    
    <view class="padding">
      <view class="margin-bottom-sm">
        手机号
      </view>
      <custom-input placeholder='请输入手机号'/>
    </view>
    
    <view class="padding">
      <view class="margin-bottom-sm">
        简历
      </view>
      <button class="cu-btn line-orange block lg">上传简历</button>
    </view>
    
    <view class="flex padding justify-between save-cont" >
      <button class="cu-btn  lg">取消</button>
      <button class="cu-btn bg-orange lg">保存</button>
    </view>
    
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

<style lang='scss'>
.save-cont{
  .cu-btn{
    width:45%;
    /* flex-shrink: 0; */
  }
}
</style>
