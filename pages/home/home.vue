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
      <custom-input />
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
      <view
       class="cu-item" 
       v-for='item in cateList' 
       :key="item.objectId"
       @click="handleJobList(item)"
       >
        <view class="text-center">
          <image class="grid-icon" :src="item.icon" mode="heightFix"></image>
          <text>{{item.name}}</text>
        </view>
      </view>
      <view class="cu-item">
        <view class="text-center">
          <image class="grid-icon" src="../../static/img/home_grid5.png" mode="heightFix"></image>
          <text>更多</text>
        </view>
      </view>
    </view>


    <!-- 为你推荐 -->
    <view class="flex justify-between padding">
      <text>为你推荐</text>
      <text class="text-sm text-orange">查看更多</text>
    </view>

    <scroll-view scroll-x>
      <view class="padding-sm flex justify-between">
        <job-item v-for="item in jobList" :jobdata="item" class="margin-right-sm" />
      </view>
    </scroll-view>
   <!-- <view class="padding-sm flex flex-wrap justify-between">
      <job-item v-for="item in 2" />
    </view> -->
    <!-- 最新岗位 -->
    <view class="flex justify-between padding">
      <text>最新岗位</text>
      <text class="text-sm text-orange">查看更多</text>
    </view>

    <view class="padding-sm">
      <job-item c-type="new" v-for="item in jobList" :jobdata="item" />
    </view>

  </view>
</template>

<script>
  import {
    categoryGet,
    jobGet
  } from '../../api/job.js'
  import {
    $get
  } from '../../utils/http.js'
  export default {
    data() {
      return {
        cateList: [],
        jobList: []
      }
    },
    onLoad() {
      // 方法1:
      // uni.request({
      // 	url:'https://wojhrvmp.lc-cn-n1-shared.com/1.1/classes/category',
      // 	method:'GET',
      // 	header:{
      // 		"X-LC-Id": "WojHRvmpUDdDfo2kr9mfUVc2-gzGzoHsz",
      // 		"X-LC-Key": "RIiXkMSxvm1XzeptOeTOgvik",
      // 		"Content-Type": "application/json"
      // 	},
      // 	data:{
      // 		where:{
      // 			parentId:'0-0'
      // 		}
      // 	},
      // 	success: (res) => {
      // 		this.cateList = res.data.results
      // 	}
      // })
      //方法2：
      // $get('classes/category',{where:{parentId:'0-0'}}).then(res=>{
      // 	this.cateList = res.data.results
      // })
      // 方法3:
      categoryGet().then(res => {
        this.cateList = res.data.results
      })

      jobGet().then(res => {
        this.jobList = res.data.results
      })
    },
    methods: {
        handleJobList({name}){
          uni.setStorage({
            key:'cateName',
            data:name
          })
          uni.switchTab({
            url:'/pages/company/company'
          })
        }
    }
  }
</script>

<style lang='scss'>
  swiper {
    margin: 30upx;
  }

  .swiper-item {
    image {
      height: 320upx;
    }
  }

  .grid-icon {
    height: 64upx;
  }
</style>