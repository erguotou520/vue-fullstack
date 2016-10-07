/**
 * App router config
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import otherModuleRoutes from './module'
Vue.use(VueRouter)

const routes = [{
  path: '/login',
  component: (resolve) => {
    require(['../view/auth/Login.vue'], resolve)
  },
  meta: {
    skipAuth: true
  }
}, {
  path: '/',
  component: (resolve) => {
    require(['../view/CommonView.vue'], resolve)
  },
  children: [...otherModuleRoutes, {
    path: '/', redirect: '/dashboard'
  }]
}]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('changeRouteLoading', true).then(() => {
    // has logged in, redirect
    if (to.path === '/login' && store.getters.loggedIn) {
      next(from.query.redirect || '/')
    }
    if (!to.meta.skipAuth) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!store.getters.loggedIn) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })
})

router.afterEach(() => {
  store.dispatch('changeRouteLoading', false)
})

export default router
