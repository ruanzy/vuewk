import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/index.vue'
import Login from './components/login.vue'
import Home from './page/home.vue'
import Dash from './page/dash.vue'
import Files from './page/file.vue'
import Content from './page/content.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/dash',
          component: Dash
        },
        {
          path: '/content',
          component: Content
        },
        {
          path: '/home',
          component: Home
        },
        {
          path: '/files',
          component: Files
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
