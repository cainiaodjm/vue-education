const state ={
    tabList:[]
}
const mutations={
    //更新tabList方法
    /**
     * 
     * @param {*} state 
     * @param {*} route 当前添加得路由对象
     */
    UPDATE_ROUTER(state,route){
        if(!state.tabList.find(item=>item.name===route.name))state.tabList.push(route)
    }
}
const actions={
    
}

export default {
    state,
    mutations,
    actions
}