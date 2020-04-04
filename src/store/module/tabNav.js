const state ={
    //保存打开页面的列表
    tabList:[]
}
const mutations ={
    UPDATE_ROUTER(state,route){
        if(!state.tabList.find(item=> item.name === route.name)) state.tabList.push(route)
       
    }
}
const actions ={

}
export default{
    state,
    mutations,
    actions
}