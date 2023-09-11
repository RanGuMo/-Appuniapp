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
      <custom-input v-model="info.name" placeholder='请输入姓名' icon="icon-wode1"/>
    </view>
    
    <view class="padding">
      <view class="margin-bottom-sm">
        手机号
      </view>
      <custom-input v-model="info.phone" placeholder='请输入手机号' icon="icon-youxiang"/>
    </view>
    
    <view class="padding">
      <view class="margin-bottom-sm">
        简历
      </view>
      <!-- 进度条 -->
      <view v-if="step!==0" class="cu-progress radius striped active">
          <view class="bg-orange" :style="[{ width:step+'%'}]">{{step}}%</view>
      </view>
      <button class="cu-btn line-orange block lg" @click="handleUpload">上传简历</button>
    </view>
    
    <view class="flex padding justify-between save-cont" >
      <button class="cu-btn  lg">取消</button>
      <button class="cu-btn bg-orange lg" @click="handleSave">保存</button>
    </view>
    
  </view>
</template>

<script>
  import {pathToBase64} from '../../js_sdk/mmmm-image-tools/index.js'
  import CloudSDK from 'leancloud-storage'
  import { userUpdate } from '../../api/user'
  export default {
    data() {
      return {
        info:{
          name:'张三丰',
          phone:'18269269001',
          resume:'',
        },
        step:0,
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.user.userInfo;
      }
    },
    methods: {
    async  handleSave(){
        // console.log(this.info);
        let {objectId,sessionToken} = this.userInfo;  
        let res = await userUpdate(objectId,sessionToken,this.info);console.log(res);
        if(res.statusCode===200){
          uni.switchTab({ //修改用户信息成功，跳转到个人中心页
            url:'/pages/mine/mine'
          })
        }
        
      },
      // 上传简历
      handleUpload(){
          uni.chooseFile({
              success: async(res) => {
                  console.log(res);
                  // this.show = true
                  this.step = 40
                  let localFileUri = res.tempFilePaths[0] //本地临时资源路径
                  let base64  = await pathToBase64(localFileUri) // url转base64
                  this.step = 60
                  const file = new CloudSDK.File('resume.pdf', {base64}) //构建资源
                  this.step = 90
                  let res1 = await file.save() //保存资源
                  console.log(res1,111);
                  this.step = 100
                  this.info.resume = res1.attributes.url
                  uni.showToast({
                      title:'上传成功',
                      icon:'none'
                  })
              }
          })
      }
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
