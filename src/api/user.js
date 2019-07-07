import axios from './index'

export const getUserInfo=()=>{
    return axios.request({
        url:'/getUserInfo',
        method:'get'
    })
}
export const authorization=(token)=>{
    return axios.request({
        url:'/v1/authorization',
        method:'post',
        data:{
            token
        }
    })
}
export const login=(account,secret)=>{
    return axios.request({
        url:'/v1/token',
        method:'post',
        data:{
            account,
            secret,
            type:101
        }
    })
}