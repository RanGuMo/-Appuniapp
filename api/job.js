import request from '../utils/request.js'
//分类
export const categoryGet = () => {
  return request.get('classes/category', {
    params: {
      where: {
        parentId: '0-0'
      }
    }
  })
}

//岗位
export const jobGet = (page = 1, name) => {
  let skip = (page - 1) * 10
  let where = {}
  if (name) {
    where.lv1 = name
  }
  return request.get('classes/job', {
    params: {
      limit: 10,
      skip,
      where
    }
  })
}

//岗位详情
export const jobDetailGet = (id) => {
  return request.get(`classes/job/${id}`)
}

// 岗位报名
export const jobPost = (joinData) => {
  return request.post(`classes/join`, joinData)
}

// 报名状态查询
export const joinStateGet = (userId, jobId) => {
  return request.get('classes/ReactJoin', {
    where: {
      userId,
      jobId
    }
  })
}

// 查询报名列表
export const jobGetList = (userId,state=0) => {
  let where = {userId}
  if(state!=0){
    where.state = state
  }
  return request.get('classes/join', {
    params: {
      where
    }
  })
}