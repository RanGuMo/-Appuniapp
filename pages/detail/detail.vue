<template>
  <view>
    <view class="text-center">
      <image class="cu-avatar round xl margin-tb" :src="detail.brandLogo" mode=""></image>
      <view class="text-lg">
        <!-- 前端开发工程师 -->
        {{detail.jobName}}
      </view>
      <view class="text-orange margin-tb-sm">
        薪资待遇：{{detail.salaryDesc}}
      </view>
    </view>

    <view class="flex justify-around margin">
      <view class="">
        <image class="cu-avatar round margin-right-sm" src="../../static/img/job_icon1.png" mode=""></image>
        {{distance}}km
      </view>

      <view class="">
        <image class="cu-avatar round margin-right-sm" src="../../static/img/job_icon2.png" mode=""></image>
        {{detail.cityName}} · {{detail.areaDistrict}}
      </view>
    </view>


    <view class="flex justify-around margin-tb">
      <view class="">
        岗位详情
      </view>
      <view class="">
        企业信息
      </view>
    </view>

    <view class="padding">
      <view class="margin-bottom-sm">
        经验要求
      </view>
      <view class="">
        <view class="cu-tag bg-cyan" v-for="(item,index) in detail.jobLabels" :key="index">
          {{item}}
        </view>
      </view>
    </view>

    <view class="padding">
      <view class="margin-bottom-sm">
        技能要求
      </view>
      <view class="">
        <view class="cu-tag bg-orange" v-for="(item,index) in detail.skills" :key="index">
          {{item}}
        </view>
      </view>
    </view>

    <view class="padding">
      <view class="margin-bottom-sm">
        福利待遇
      </view>
      <view class="">
        <view class="cu-tag bg-purple" v-for="(item,index) in detail.welfareList" :key="index">
          {{item}}
        </view>
      </view>
    </view>

    <view class="padding">
      <view class="margin-bottom-sm">
        公司位置
      </view>
      <!-- 地图组件 -->
      <map class="gd-map" :latitude="jobLocation[1]" :longitude="jobLocation[0]" :markers="[{
        id:1,
        longitude:jobLocation[0],
        latitude:jobLocation[1],
        iconPath:'../../static/img/loc.png',
        width:50,
        height:50
      }]"></map>
    </view>

    <view class="padding cu-bar foot">
      <button class="cu-btn bg-orange lg block">立即报名</button>
    </view>



  </view>
</template>

<script>
  import {
    jobDetailGet
  } from '../../api/job.js'

  import {
    getDistance
  } from '../../utils/tools.js'
  export default {
    data() {
      return {
        detail: {},
        distance: 0,
        jobLocation: []
      }
    },
    computed: {
      lnglat() {
        return this.$store.state.loc.lnglat //用户位置 
      }
    },
    onLoad(options) {
      jobDetailGet(options.id).then(res => {
        this.detail = res.data;
        let {
          cityName,
          areaDistrict,
          city,
          businessDistrict
        } = res.data
        let address = cityName + areaDistrict
        this.getDist(address, city)

     



      })
    },
    methods: {
      // 根据岗位地址以及用户地址获取 两者之间 的距离
      getDist(address, city) {
        //计算岗位距离
        let url =
          `https://restapi.amap.com/v3/geocode/geo?key=e0119d3cbd6eb284068484cadeb50e07&address=${address}&city=${city}`
        uni.request({
          url,
          success: (res) => {
            let {
              location
            } = res.data.geocodes[0]
            location = location.split(',') //岗位经纬度
            this.jobLocation = location //获取经纬度，用于map地图显示
            let n = getDistance(location[1]*1, location[0]*1, this.lnglat[1]*1, this.lnglat[0]*1)
            this.distance = n.toFixed(1) // 取一位小数
            console.log(n, this.distance);
          }
        })
      }



    }
  }
</script>

<style lang="scss">
  .lg {
    width: 100%;
  }

  .cu-tag {
    margin: 10rpx 10rpx 0 0;
  }

  .gd-map {
    width: 100%;
    height: 300rpx;
    // border: 1px solid red;
  }
</style>