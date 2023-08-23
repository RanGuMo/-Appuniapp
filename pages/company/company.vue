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
        page: 1,
        cateName: ''
      }
    },
    onLoad() {
      // jobGet().then(res => {
      //   this.jobList = res.data.results
      //   this.page++
      // })
      this.fetchData()
    },
    onShow() {
      uni.getStorage({
        key: 'cateName',
        success:({data}) => {
          console.log(data,'提取',this);
          this.jobList = []
          this.page = 1
          this.cateName = data
          this.fetchData(data)
        }
      })
    },
    // 下拉加载更多内容，触底就弹出提示
    onReachBottom() {
      console.log('触底了');
      this.fetchData(this.cateName);
    },
    onPullDownRefresh() { //1.先在pages中开启下拉刷新功能
      this.jobList = [];
      this.page = 1;
      this.fetchData(); //1.1 调用获取数据的方法
    },
    methods: {
      fetchData(name) {
        jobGet(this.page,name).then(res => {
          uni.stopPullDownRefresh() //1.3获取到数据后关闭下拉刷新
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
    }
  }
</script>

<style>

</style>