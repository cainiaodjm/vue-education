import {
  getTagNavListFromLocalstorage,
  setTagNavListInLocalstorage
} from '../../lib/util'
export default {
  state:{
    tagNavList:[]
  },
  mutations:{
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