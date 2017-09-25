import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router.js'
import 'vue-easytable/libs/themes-base/index.css'
import './assets/styles.css'
import IEcharts from 'vue-echarts-v3/src/full.vue'
import 'vue-echarts-v3/node_modules/echarts/theme/macarons.js'
import {VTable, VPagination} from 'vue-easytable'
Vue.use(VueResource);
Vue.http.options.emulateHTTP = true;
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.component('IEcharts', IEcharts)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next(true)
  } else {
    let userName = sessionStorage.getItem('userName')
    if (userName) {
      next(true)
    } else {
      next({path: '/login'})
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
