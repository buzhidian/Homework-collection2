import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: HomeView
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/Index.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router