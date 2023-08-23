<template>
  <view>
    <!-- 没有获取到数据就展示这个 -->
    <view class="padding margin" v-if="emptyShow">
      <tn-empty mode="data" icon="https://tuniao.ahuaaa.cn/componentsPage/static/images/empty/data.jpg"
        imgWidth="300"></tn-empty>
    </view>
    <!-- 获取到数据就展示下面这个 -->
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
        cateName: '',
        emptyShow: false, // 是否展示没有数据的图标
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
      setTimeout(() => {
        uni.getStorage({
          key: 'cateName',
          // success: ({
          //   data
          // }) => {
          //   console.log(data, '提取', this);
          //   this.jobList = []
          //   this.page = 1
          //   this.cateName = data
          //   this.fetchData(data)
          // },
          // fail: (err) => {
          //   this.jobList = []
          //   this.page = 1
          //   this.cateName = ''
          //   this.fetchData()
          // },
          complete: ({
            data
          }) => { //不管成功还是失败都会去执行，可以取代上面的success 和fail 
            console.log('complete', data);
            this.jobList = []
            this.page = 1
            this.cateName = data
            this.fetchData(data)
          }
        })
      }, 200) //定时器为了保证onTabItemTap先执行

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
    onTabItemTap() {
      // 点击底部tab栏时触发
      uni.removeStorage({
        key: 'cateName'
      })
    },
    methods: {
      fetchData(name) {
        jobGet(this.page, name).then(res => {
          uni.stopPullDownRefresh() //1.3获取到数据后关闭下拉刷新
          let {
            results
          } = res.data
          if (this.page == 1 && results.length === 0) {
            this.emptyShow = true //没有数据显示 图标
          }
          if (results.length) {
            this.emptyShow = false //有数据，关闭图标显示
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