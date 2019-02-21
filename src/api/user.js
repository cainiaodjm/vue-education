import axios from './index'

export const getUserInfo=()=>{
    return axios.request({
        url:'/getUserInfo',
        method:'get'
    })
}
export const authorization=()=>{
    return axios.request({
        url:'/authorization',
        method:'get'
    })
}
export const login=(username,password)=>{
    return axios.request({
        url:'/login',
        method:'post',
        data:{
            username:username,
            password:password
        }
    })
}