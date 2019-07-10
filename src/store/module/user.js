import {login,authorization} from '@/api/user'
import {setToken} from '@/lib/util'
const state={
    userName:'djm'
}
const mutations={

}
const actions={
    login({commit},{userName,password}){
        return new Promise((resolve,reject)=>{

            login(userName,password).then(res=>{
                if(res.err_code===0){
                    setToken(res.result.token)
                    resolve()
                }else{
                    reject(new Error("Error"))
                }
              
            }).catch(error=>{
                reject(new Error("Error"))
            })
        })
    },
    authorization({commit},token){
       return new Promise((resolve,reject)=>{
        authorization(token).then(res=>{
            /**
             * token过期时间为2小时 2个小时内去访问路由 都可以延续 但是2个小时都不动 则直接打回login
             */
            if(res.err_code===0){
                //每次认证都会获取新的token 来替换旧得token 来延续token得时间
                setToken(res.result.token)
                resolve(res.result.page_list)
            }else{
                reject(new Error('Error'))
            }
        }).catch(error=>{
            reject(new Error('Error'))
        })
       })
    }
}

export default{
    state,
    mutations,
    actions
}