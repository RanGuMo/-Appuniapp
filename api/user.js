import request from '../utils/request.js'
//登录
export const userLogin = (account)=>{
	return request.post('login',account)
}

//注冊
export const userRegister = (account)=>{
	return request.post('users',account)
}

