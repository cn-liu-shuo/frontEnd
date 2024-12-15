import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 注册 全局组件
import pages from "./components/父子传参/son.vue"
// Vue.component("组件名", 组件)
Vue.component("pages", pages)


// 全局混入
import { mixin } from "./mixin"
Vue.mixin(mixin)

// 全局自定义指令
Vue.directive('hi', {
  // bind指令和元素绑定的时候触发
  bind(element, value){
    console.log(element, value, "绑定的时候");
    element.value = value.value
  },
  // 渲染的时候调用
  inserted(element, value){
    console.log(element, value, "渲染的时候");
    // 获取焦点
    element.focus()
  },
  // up
  update(element, value){
    console.log(element, value, "数据更新的时候");
  }
})



// npm i axios   npm i vue-axios
// 导入axios
import axios from 'axios'
import VueAxios from 'vue-axios';
// 导入阿里巴巴图标
import '@/assets/font/iconfont.css'

// 调用通过 this.$hi
Vue.prototype.$hi = "孙悟空"

// Vue.prototype和Vue.use有什么区别
// Vue.use 适用于注册专门在vue中使用的插件
// Vue.prototype 适用于注册vue生态外的插件或方法

// 使用axios
Vue.use(VueAxios, axios)

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
