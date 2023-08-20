
import {BASE,KEY,ID} from '../config/index.js'
export function $http(url,method="GET",data={}){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:`${BASE}/1.1/${url}`,
			method,
			header:{
				"X-LC-Id": ID,
				"X-LC-Key": KEY,
				"Content-Type": "application/json"
			},
			data,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export function $get(url,data={}){
	return $http(url,'GET',data)
}