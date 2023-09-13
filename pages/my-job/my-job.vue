<template>
  <view class="">
    <tn-tabs :list="list" :isScroll="false" :current="current" name="tab-name" @change="change"></tn-tabs>
    
    <!-- 没有获取到数据就展示这个 -->
    <view class="padding margin" v-if="!jobList.length">
      <tn-empty mode="data" icon="https://tuniao.ahuaaa.cn/componentsPage/static/images/empty/data.jpg"
        :imgWidth="300"></tn-empty>
    </view>
    <!-- 获取到数据就展示下面这个 -->
    <view class="padding-sm flex flex-wrap justify-between">
      <job-item v-for="item in jobList" :jobdata="item" />
    </view>
  </view>
  
</template>

<script>
import { jobGetList } from '../../api/job';
  export default {
    data() {
      return {
        list: [{
          'tab-name': '全部岗位'
        }, {
          'tab-name': '等待审核'
        }, {
          'tab-name': '已读简历',
        }, {
          'tab-name': '预约面试',
        }, {
          'tab-name': '已经拒绝',
        }],
        current: 0,
        jobList:[]
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.user.userInfo 
      }
    },
    onLoad() {
      jobGetList(this.userInfo.objectId).then(res=>{
        this.jobList = res.data.results
      })
    },
    methods: {
      change(index) {
        this.current = index;
        jobGetList(this.userInfo.objectId,index).then(res=>{
          this.jobList = res.data.results
        })
      }
    }
  }
</script>