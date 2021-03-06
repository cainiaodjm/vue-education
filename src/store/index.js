import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import state from './state'
import user from './module/user'
import  app from './module/app'
import router from './module/router'
import topNav from './module/topNav'
import tabNav from './module/tabNav'
import getters from './getters'
import saveInLoacal from './plugin/saveInLocal'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
      user,
      router,
      // topNav,
      app,
      tabNav
  },
  // plugins:[saveInLoacal]
})
