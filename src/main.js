import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import EelementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.use(EelementUI);

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
