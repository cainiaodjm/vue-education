import Vue from 'vue'
import Router from 'vue-router'
import {routes} from './router'
import {getToken,setToken} from '@/lib/util'
import store from '@/store'
Vue.use(Router)
const router=new Router({
    routes
})
const HAS_LOGINED=true
router.beforeEach((to,from,next)=>{
    // if(to.name!=='login'){
    //     // console.log('login')
    //     if(HAS_LOGINED){
    //         next()
    //     }else{
    //         next({name:'login'})
    //     }
    // }else{
    //     // console.log('!login')
    //     if(HAS_LOGINED){
    //         next({name:'home'})
    //     }else{
    //         next()
    //     }
    // }
    //在进入页面前 需要判断用户是否有token
    const token=getToken()
    if(token){
        if(!store.state.router.hasGetRules){
            //调用认证接口获取菜单
            store.dispatch('authorization',token).then(page_list=>{
                //获取到可访问得页面后 需要进行页面过滤
                store.dispatch('concatRoutes',page_list).then(routers=>{
                    console.log(routers)
                    router.addRoutes(routers)
                    next({...to,replace:true})
                }).catch(()=>{
                    next({name:"login"})
                })
            })
        }else{
            next()
        }
    }else{
        if(to.name==="login")next()
        else next({name:'login'})
    }
    // if(token){
    //     //如果有token 还需要调用接口来判断token是否过期
    //     // if(!store.state.router.hanGetRules){
    //     //     //还没有获取用户的菜单
    //     // }
    //     store.dispatch('authorization',token).then(()=>{
    //         console.log("success")
    //     }).catch(()=>{
    //         setToken('')
    //         next({name:'login'})  
    //     })
    // }else{
    //     if(to.name==='login')next()
    //     else next({name:'login'})
    // }

})
//导航被确认之前(确认是指之前得所有的导航钩子都结束)
// router.beforeResolve(()=>{

// })
router.afterEach((to,from)=>{
    //logining=false
})
export default router