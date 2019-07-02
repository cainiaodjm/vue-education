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
                /**
                 * 将页面列表通过Object.entries 将对象转换成键值对数组 
                 * 键为路由 值为true or false 
                 * 通过every来判断整个列表是否全部为true 
                 * 为true的话 则将内部路由列表全部挂载到路由上
                 * 否则的话就要进行筛选
                 */
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