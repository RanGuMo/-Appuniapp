import { userLogin } from "../api/user"

export default {
	namespaced:true,
	state(){
		return {
			userInfo:null
		}
	},
	mutations:{
		initInfoMut(state,info){
			state.userInfo = info
		}
	},
	actions:{
		userLoginAction(context,account){
			userLogin(account).then(res=>{
				// console.log(res);
				context.commit('initInfoMut',res.data) //状态机存储
				uni.setStorage({ //本地持久化存储
					key:'fxjy-userinfo-v3',
					data:res.data
				})
        uni.switchTab({ //登录成功，跳转到首页
          url:'/pages/home/home'
        })
				
			})
		}
	}
}