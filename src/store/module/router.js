//导入初始的路由  包含登录页面和404
import{routes,routerMap} from '@/router/router.js'
//初始导入不需要权限的页面
const state={
    //挂载到路由实例上的实际路由
    routers: routes,
    hasGetRules:false
}
const mutations={
    //合并路由列表
    CONCAT_ROUTES(state,routerList){
        state.routers=routerList
        state.hasGetRules=true
    }
}

const getAccessRouterList=(routes,page_list)=>{
    return routes.filter(item=>{
        if(page_list[item.name]){
            if(item.children)item.children=getAccessRouterList(item.children,page_list)
            return true
        }else{
            return false
        }
    })
}

const actions={
    concatRoutes({commit},page_list){
        return new Promise((resolve,reject)=>{
            try{
                let routerList=[]
                //将获取到得页面列表转换成二维数组
                if(Object.entries(page_list).every(item=>item[1])){
                    routerList=routerMap
                }else{
                    //否则就要进行删选
                    routerList=getAccessRouterList(routerMap,page_list)
                }
                //合并路由
                commit('CONCAT_ROUTES',routerList)
                resolve(routerList)
            }catch(err){
                reject(err)
            }         
        })
    }
}
export default {
    state,
    mutations,
    actions
}