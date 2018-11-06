import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import state from './state'
import user from './module/user'
import getters from './getters'
import saveInLoacal from './plugin/saveInLocal'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
      user
  },
  // plugins:[saveInLoacal]
})
