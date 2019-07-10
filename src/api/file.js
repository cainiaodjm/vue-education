import axios from './index'
//获取所有文件
export const getFileList = (start=0,count=10) => {
  return axios.request({
    url: '/v1/file/get_file_list',
    method: 'get',
    params:{
      start,
      count
    }
  })
}
//获取文件
export const getFile = ({ key, type, source }) => {
  return axios.request({
    url: '/v1/file/get_file',
    method: 'post',
    data: {
      key,
      type,
      source
    },
  })
}
//获取文件
export const getFileByGet = ({ key, type, source }) => {
  return axios.request({
    url: '/v1/file/get_file',
    method: 'get',
    headers: { 'Content-Type': 'application/json,charset=utf-8' },
    responseType: 'blob', //二进制流 blob流  在这里选择
    params: {
      key,
      type,
      source
    },
  })
}