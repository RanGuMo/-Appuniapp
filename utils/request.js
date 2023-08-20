import { BASE,ID,KEY } from '../config/index.js';
import Request from '../js_sdk/luch-request/luch-request/index.js'
const http = new Request()
http.setConfig((config) => { /* config 为默认全局配置*/
    config.baseURL = BASE+'/1.1/'; /* 根域名 */
    config.header = {
        "X-LC-Id": ID,
        "X-LC-Key": KEY,
        "Content-Type": "application/json"
    }
    return config
})

http.interceptors.request.use((config) => { // 可使用async await 做异步操作
  return config
}, config => { // 可使用async await 做异步操作
  return Promise.reject(config)
})

http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
  console.log('响应拦截器',response)
  return response
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
  console.log(response)
  return Promise.reject(response)
})

export default http