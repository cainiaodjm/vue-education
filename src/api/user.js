import axios from './index'

export const getUserInfo=()=>{
    return axios.request({
        url:'/getUserInfo',
        method:'get'
    })
}
export const authorization=()=>{
    return axios.request({
        url:'/v1/authorization',
        method:'post'
    })
}
export const login=(username,password)=>{
    return axios.request({
        url:'/v1/user/login',
        method:'post',
        data:{
            username:username,
            password:password
        }
    })
}