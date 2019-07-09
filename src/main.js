import Vue from 'vue'
import App from './App.vue'
import {defaultConfig} from './config'
import importDirective from './directive'
import router from './router'
import store from './store'
import Bus from './bus'
import fastclick from 'fastclick'
import iView from 'iview';

// require('./mock')
// if(process.env.NODE_ENV !== 'production') require('./mock')
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false
importDirective(Vue)
//向实例中注册$bus
Vue.prototype.$bus=Bus
Vue.use(iView);
fastclick.attach(document.body)
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = defaultConfig
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
