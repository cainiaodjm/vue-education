import axios from './index'
export const getFolderList=()=>{
    return axios.request({
        url:'/getFolderList',
        method:'get'
    })
}
export const getFileList=()=>{
    return axios.request({
        url:'/getFileList',
        method:'get'
    })
}
export const addUser=(data)=>{
    return axios.request({
        url:'users/add_user',
        data:data,
        method:'post'
    })
}
export const getTableData = () => {
    return axios.request({
      url: 'get_table_data',
      method: 'get'
    })
}
  