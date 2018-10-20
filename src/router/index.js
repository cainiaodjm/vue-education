import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
Vue.use(Router)
const router=new Router({
    routes
})
const HAS_LOGINED=true
router.beforeEach((to,from,next)=>{
    if(to.name!=='login'){
        // console.log('login')
        if(HAS_LOGINED){
            next()
        }else{
            next({name:'login'})
        }
    }else{
        // console.log('!login')
        if(HAS_LOGINED){
            next({name:'home'})
        }else{
            next()
        }
    }
})
//导航被确认之前(确认是指之前得所有的导航钩子都结束)
// router.beforeResolve(()=>{

// })
router.afterEach((to,from)=>{
    //logining=false
})
export default router