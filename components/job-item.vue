<template>
  <!-- 岗位组件 -->
  <view class="job-item padding-sm margin-bottom-sm" :class='cType'>
    <view class="flex justify-between align-center">
      <view class="flex align-center">
        <image class="cu-avatar round margin-right-xs" src="../static/img/avatar1.png" mode=""></image>
        千峰互联
      </view>
      <text class="iconfont icon-bookmark-o"></text>
    </view>
    <view class="margin-top-sm text-lg">
      前端开发工程师
    </view>
    <view class="margin-tb-xs">
      重庆*九龙坡
    </view>
    <view class="text-orange"  v-if="cType=='hot'">
      10k/月
    </view>
    <view class="" v-if="cType=='new'">
      描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
    </view>
    <view class="flex margin-top">
      <view class="margin-right">
        <text class='iconfont icon-browse margin-right-xs'></text>
         100
      </view>
      <view class="margin-right">
       
        <text class='iconfont icon-renqun margin-right-xs'></text>
        50
      </view>
    </view>


  </view>
</template>

<script>
  export default {
    name: "job-item",
    props: {
      cType: {
        type: String,
        default: 'hot', //hot 热门 new 最新
        validator(value){ 
          return ['hot','new'].includes(value) //ture 表示验证通过
        }
      },
    },
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  .job-item {
    // width: 344upx;
    // height: 336upx;
    border: 1px solid #eeeeee;
  }
  .hot{
    width: 344upx;
  }
</style>