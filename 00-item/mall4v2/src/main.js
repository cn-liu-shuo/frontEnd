import Vue from 'vue'
import ElementUI from 'element-ui'
import App from '@/App'
import router from '@/router'                 // api: https://github.com/vuejs/vue-router
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
import '@/icons'                              // api: http://www.iconfont.cn/
import '@/element-ui-theme/style.css'
import Avue from '@smallwei/avue'             // api: https://avue.top
import '@smallwei/avue/lib/index.css'
import '@/assets/scss/index.scss'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import { isAuth } from '@/utils'
import dayjs from 'dayjs';                    // api: https://gitee.com/iamkun/dayjs
// import cloneDeep from 'lodash/cloneDeep'

Vue.use(Avue)
Vue.use(VueCookie)
Vue.use(ElementUI)
Vue.config.productionTip = false

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth     // 权限方法
Vue.prototype.$dayjs = dayjs;     // 时间方法

// 保存整站vuex本地储存初始状态
// process.env.VUE_APP_RESOURCES_URL['storeState'] = cloneDeep(store.state)

// element ui 中的单选框组件 el-radio-group 在近期使用中 报错（有关标签属性-aria-hidden），经测试chrome浏览器会出现这个问题。（在Edge浏览器和360浏览器上均无报错现象）
// 解决方案
Vue.directive('removeAriaHidden', {
  bind(el, binding) {
    let ariaEls = el.querySelectorAll('.el-radio__original');
    ariaEls.forEach((item) => {
      item.removeAttribute('aria-hidden');
    });
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
