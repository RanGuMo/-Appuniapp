import request from '../utils/request.js'
//登录
export const userLogin = (account)=>{
	return request.post('login',account)
}

