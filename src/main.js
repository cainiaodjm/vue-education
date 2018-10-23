import Vue from 'vue'
import App from './App.vue'
import config from './config'
import router from './router'
import store from './store'
import Bus from './bus'

Vue.config.productionTip = false
//向实例中注册$bus
Vue.prototype.$bus=Bus

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
