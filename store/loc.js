//集中管理用户地理位置信息：城市名称、经纬度
export default {
  namespaced: true,
  state() {
    return {
      city: '定位中..',
      lnglat: []
    }
  },
  mutations:{
    initLocMut(state,{city,lnglat}){
    			state.city = city
    			state.lnglat = lnglat
    }
  }
}