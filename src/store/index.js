import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './actions'
import state from './actions'
import user from './module/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules:{
      user
  }
})
