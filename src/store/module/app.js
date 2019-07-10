import {
  getTagNavListFromLocalstorage,
  setTagNavListInLocalstorage,
  getRouteTitleHandled,
  getMenuByRouter,
  routeHasExist
} from '../../lib/util'
export default {
  state:{
    tagNavList:[]
  },
  getters:{
    
  },
  mutations:{
    addTag(state,{route,type="unshift"}){
      //getRouteTitleHandled 会返回一个路由对象 
      let router=getRouteTitleHandled(route)
      if(!routeHasExist(state.tagNavList,router)){
        if (type === 'push') state.tagNavList.push(router)
        else{
          state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
      

    },
    setTagNavList(state,list){
      let tagList=[]
      if(list){
        tagList=[...list]
      }else{
        tagList=getTagNavListFromLocalstorage()||[]
      }
      if(tagList[0] && tagList[0].name !== 'home')tagList.shift()
      let homeTagIndex=tagList.findIndex(item=>item.name === 'home')
      if(homeTagIndex>0){
        let homeTag=tagList.splice(homeTagIndex,1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    }
  }
}