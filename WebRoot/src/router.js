import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/index.vue'
import Login from './components/login.vue'
import Home from './page/home.vue'
import Dash from './page/dash.vue'
import User from './page/user.vue'
import Role from './page/role.vue'
import File from './page/file.vue'
import Hadoop from './page/hadoop.vue'
import Spark from './page/spark.vue'
import Analyse from './page/analyse.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/user',
          component: User
        },
				{
          path: '/role',
          component: Role
        },
        {
          path: '/hadoop',
          component: Hadoop
        },
        {
          path: '/spark',
          component: Spark
        },
        {
          path: '/analyse',
          component: Analyse
        },
        {
          path: '/home',
          component: Home
        },
        {
          path: '/file',
          component: File
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
