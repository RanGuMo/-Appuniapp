<template>
  <view>
    <view class="padding-sm flex flex-wrap justify-between">
      <job-item v-for="item in jobList" :jobdata="item" />
    </view>
  </view>
</template>

<script>
  import {
    jobGet
  } from '../../api/job'
  export default {
    data() {
      return {
        jobList: [],
        page: 1
      }
    },
    onLoad() {
      jobGet().then(res => {
        this.jobList = res.data.results
        this.page++
      })
    },
    // 下拉加载更多内容，触底就弹出提示
    onReachBottom() {
      console.log('触底了');
      jobGet(this.page).then(res => {
        let {
          results
        } = res.data
        if (results.length) {
          this.jobList = [
            ...this.jobList,
            ...results
          ]
          this.page++
          return
        }
        uni.showToast({
          title: "没有更多数据了",
          icon: 'none'
        })
      })
    },
    methods: {

    }
  }
</script>

<style>

</style>