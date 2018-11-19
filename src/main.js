import Vue from 'vue'
import App from './App.vue'
import config from './config'
import router from './router'
import store from './store'
import Bus from './bus'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.config.productionTip = false
//向实例中注册$bus
Vue.prototype.$bus=Bus
Vue.use(iView);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
