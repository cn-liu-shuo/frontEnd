import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
console.log(store)
// npm i axios   npm i vue-axios
// 导入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// （如果vuex找不着）在vue实例原型上挂载 vuex
// Vue.prototype.$store = store
// 使用axios
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
