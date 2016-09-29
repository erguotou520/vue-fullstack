/**
 * App router config
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: (resolve) => {
    require(['../view/Dashboard.vue'], resolve)
  }
}, {
  path: '/login',
  component: (resolve) => {
    require(['../view/auth/Login.vue'], resolve)
  },
  meta: {
    skipAuth: true
  }
}, {
  path: '/users',
  component: (resolve) => {
    require(['../view/UserList.vue'], resolve)
  }
}, {
  path: '/things',
  component: (resolve) => {
    require(['../view/ThingList.vue'], resolve)
  }
}, {
  path: '*',
  component: Vue.component({
    template: '<div>Not found</div>'
  })
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
    if (to.matched[0] && to.matched[0].path === '/login' && store.getters.loggedIn) {
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
