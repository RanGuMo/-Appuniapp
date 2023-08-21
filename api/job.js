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
export const jobGet = (page=1,name)=>{
	let skip = (page-1)*10
	let where = {}
	if(name){
		where.lv1 = name
	}
	return request.get('classes/job',{
		params:{
			limit:10,
			skip,
			where
		}
	})
}

//岗位详情
export const jobDetailGet = (id)=>{
	return request.get(`classes/job/${id}`)
}