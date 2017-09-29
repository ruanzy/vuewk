import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router.js'
import 'vue-easytable/libs/themes-base/index.css'
import './assets/styles.css'
import IEcharts from 'vue-echarts-v3/src/full.vue'
import {VTable, VPagination} from 'vue-easytable'
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(VueResource);
Vue.http.options.emulateHTTP = true;
Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push((request, next)  =>{
    var url = request.url;
		var prefix = "http://localhost:9090/";
		request.url = prefix + url;
    next((response) => {
        return response
    });
});
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
