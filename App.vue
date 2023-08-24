<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
      uni.getLocation({ //获取经纬度
        success: (res) => {
          console.log(res);
          let {
            longitude,
            latitude
          } = res
          // 让高德地图根据经纬度，下发城市信息
          let url =
            `https://restapi.amap.com/v3/geocode/regeo?key=b14931ccb50c276e1f79c1b4f42f6feb&location=${longitude},${latitude}` //经度在前，纬度在后
          uni.request({
            url,
            success: (res) => {
              console.log('地理位置', res);
              let {
                city,
                province
              } = res.data.regeocode.addressComponent
              let cityName = city.length ? city : province
              this.$store.commit('loc/initLocMut', {
                city: cityName,
                lnglat: [longitude, latitude]
              })
            }
          })
        }
      })

      //初始化用户信息
      try {
        const value = uni.getStorageSync('fxjy-userinfo-v3');
        if (value) {
          this.$store.commit('user/initInfoMut', value)
        }
      } catch (e) {
        // error
        console.log('没有提取到用户信息');
      }
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style lang='scss'>
  /*每个页面公共css */
  @import url('colorui/icon.css');
  @import url('colorui/main.css');
  @import url('colorui/animation.css');
  @import './tuniao-ui/index.scss';
  @import './tuniao-ui/iconfont.css';
  @import url('./static/font/iconfont.css');
</style>