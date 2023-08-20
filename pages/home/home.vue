<template>
  <!-- 首页 -->
  <view class="">
    <view class="flex justify-between padding align-center">
      <view class="">
        您好,
        <view class="text-xl">
          千峰互联
        </view>
      </view>
      <text class="iconfont icon-a-001_tongzhi text-xxl text-gray"></text>
    </view>
    <!-- 搜索框 -->
    <view class="padding-lr">
      <custom-input/>
    </view>
    <!-- 轮播图 -->
     <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
       <swiper-item>
         <view class="swiper-item">
           <image src="../../static/img/1.png" mode="aspectFill"></image>
         </view>
       </swiper-item>
       <swiper-item>
         <view class="swiper-item">
            <image src="../../static/img/2.png" mode="aspectFill"></image>
         </view>
       </swiper-item>
     </swiper>
     
     
     <!-- 九宫格 -->
     <view class="cu-list grid col-4 no-border">
       <view class="cu-item" v-for='item in 8'>
        <view class="text-center">
          <image class="grid-icon" src="../../static/logo.png" mode="heightFix"></image>
          <text>前端开发</text>
        </view>
       </view>
     </view>
     
     <!-- 为你推荐 -->
     <view class="flex justify-between padding">
       <text>为你推荐</text>
       <text class="text-sm text-orange">查看更多</text>
     </view>
     
    <view class="padding-sm flex flex-wrap justify-between">
      <job-item v-for="item in 2" />
    </view>
    <!-- 最新岗位 -->
    <view class="flex justify-between padding">
      <text>最新岗位</text>
      <text class="text-sm text-orange">查看更多</text>
    </view>
    
    <view class="padding-sm">
      <job-item c-type='new' />
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
swiper{
  margin:30upx;
}
.swiper-item{
  image{
    height: 320upx;
  }
}

.grid-icon{
  height: 64upx;
}
</style>