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

router.beforeEach((route, redirect, next) => {
  // has logged in, redirect
  if (route.matched[0] && route.matched[0].path === '/login' && store.getters.loggedIn) {
    redirect(route.query.redirect || '/')
  }
  if (route.matched.every(record => !record.meta.skipAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      redirect({
        path: '/login',
        query: { redirect: route.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
