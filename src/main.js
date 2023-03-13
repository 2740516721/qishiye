import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import EelementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fontawesome-free-6.3.0-web/css/all.css'
import './assets/icon-font/iconfont.css'

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.use(EelementUI);

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
