import Vue from 'vue'
import Router from 'vue-router'
import {routes} from './router'
import {getToken,setToken} from '@/lib/util'
import store from '@/store'
Vue.use(Router)
const router=new Router({
    routes
})

/**
 * 每次进入页面前 vue-router都会触发这个钩子函数
 * 那么这个钩子函数首先判断用户是否有token
 * 如果没有token直接打回到Login
 * 如果有token 则先判断全局状态里是否已经获取了路由列表了
 * 如果有路由规则了 则放行
 * 如果还没有获取过路由列表 则先判断token是否过期 
 * 
 */
router.beforeEach((to,from,next)=>{
    //在进入页面前 需要判断用户是否有token
    const token=getToken()
    if(token){
        if(!store.state.router.hasGetRules){
            //调用认证接口获取菜单
            store.dispatch('authorization',token).then(page_list=>{
                console.log(page_list)
                //获取到可访问得页面后 需要进行页面过滤
                store.dispatch('concatRoutes',page_list).then(routers=>{
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
})
//导航被确认之前(确认是指之前得所有的导航钩子都结束)
// router.beforeResolve(()=>{

// })
router.afterEach((to,from)=>{
    //logining=false
})
export default router