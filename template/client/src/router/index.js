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
    import('../view/auth/Login.vue').then(resolve)
  },
  meta: {
    skipAuth: true
  }
}, {
  path: '/',
  component: (resolve) => {
    import('../view/CommonView.vue').then(resolve)
  },
  children: [...otherModuleRoutes, {
    path: '/', redirect: '/dashboard'
  }]
}, {
  path: '*',
  component: {
    render (h) {
      return h('div', { staticClass: 'flex flex-main-center', attrs: { style: 'width:100%;font-size:32px' }}, 'Page not found')
    }
  }
}]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export function hook (userPromise) {
  // router
  router.beforeEach((to, from, next) => {
    // 确保用户身份信息已获取
    userPromise.then(() => {
      store.dispatch('changeRouteLoading', true).then(() => {
        // has logged in, reject
        if (to.path === '/login' && store.getters.loggedIn) {
          return next(false)
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
  })

  router.afterEach(() => {
    store.dispatch('changeRouteLoading', false)
  })
}

export default router
