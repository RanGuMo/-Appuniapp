<template>
  <view v-if="detail">
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
      <button v-if="state==0" @click="handleJoin" class="cu-btn bg-orange lg block">立即报名</button>
      <button v-if="state==1" class="cu-btn bg-grey lg block">等待审核</button>
      <button v-if="state==2" class="cu-btn bg-brown lg block">已读简历</button>
      <button v-if="state==3" class="cu-btn bg-cyan lg block">预约面试</button>
      <button v-if="state==4" class="cu-btn bg-red lg block">已经拒绝</button>
    </view>



  </view>
</template>

<script>
  import {
    jobDetailGet,
    jobPost,
    joinStateGet
  } from '../../api/job.js'

  import {
    getDistance
  } from '../../utils/tools.js'
  export default {
    data() {
      return {
        detail: {},
        distance: 0,
        jobLocation: [],
        state:0,
      }
    },
    computed: {
      lnglat() {
        return this.$store.state.loc.lnglat //用户位置 
      },
      userInfo() {
        return this.$store.state.user.userInfo
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
  
      this.checkState(options.id);// 获取报名状态
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
            let n = getDistance(location[1], location[0], this.lnglat[1], this.lnglat[0])
            this.distance = n.toFixed(1) // 取一位小数
            console.log(n, this.distance);
          }
        })
      },
      // 立即报名 点击事件
      handleJoin() {
        // 如果没有登录，引导到登录页面
        if (!this.userInfo) {
          uni.navigateTo({
            url: '/pages/login/login'
          })
          return
        }
        // 信息不完善，引导完善个人信息
        let {
          name,
          phone,
          resume
        } = this.userInfo;
        if (!name || !phone || !resume) {
          uni.showModal({
            title: '个人信息不完善',
            content: '请先完善个人信息后再进行报名操作',
            confirmColor: 'orange',
            success: function(res) {
              if (res.confirm) {
                uni.navigateTo({
                  url: '/pages/setting/setting'
                })
              }
            }

          })
          return
        }

        // 发起报名请求，保存数据到数据库中
        let userId = this.userInfo.objectId
        let jobId = this.detail.objectId
        let {
          brandLogo,
          brandName,
          jobName,
          cityName,
          areaDistrict,
          salaryDesc
        } = this.detail
        jobPost({
          userId,
          jobId,
          brandLogo,
          brandName,
          jobName,
          cityName,
          areaDistrict,
          salaryDesc,
          status: 1
        }).then(res=>{
          // 报名成功，修改状态为1
          this.state = 1;
          console.log(res,"发起报名请求，保存数据到数据库中");
        })
      },
      // 获取报名状态
      checkState(jobid){
        joinStateGet(this.userInfo.userid,jobid).then(res=>{
          let {results } = res.data;
          if(results.length){
            this.state = results[0].state //用户端报名状态保持跟后端一致
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