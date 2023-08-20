import request from '../utils/request.js'
//分类
export const categoryGet = ()=>{
	return request.get('classes/category',{
		params:{
			where:{
				parentId:'0-0'
			}
		}
	})
}

//岗位
export const jobGet = (page=1)=>{
	let skip = (page-1)*10
	return request.get('classes/job',{
		params:{
			limit:10,
			skip
		}
	})
}