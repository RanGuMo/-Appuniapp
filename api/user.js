import request from '../utils/request.js'
//登录
export const userLogin = (account)=>{
	return request.post('login',account)
}

//注冊
export const userRegister = (account)=>{
	return request.post('users',account)
}


//更新用户信息
export const userUpdate = (userid,token,info)=>{
	return request.put(`users/${userid}`,info,{
		header:{
			'X-LC-Session':token //更新用户信息必须携带sessionToken
		}
	})
}

