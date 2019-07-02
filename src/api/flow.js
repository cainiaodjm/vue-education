import axios from './index'
//获取所有期刊
export const getFlowList=()=>{
  return axios.request({
      url:'/v1/classic/list',
      method:'get'
  })
}