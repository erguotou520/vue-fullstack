<template></template>
<script>
import Vue from 'vue'
import nprogress from 'nprogress'
export default {
  props: {
    parent: String
  },
  created () {
    if (this.parent) {
      nprogress.configure({ parent: this.parent })
    }
    this.$router.beforeEach((to, from, next) => {
      nprogress.start()
      next()
    })
    this.$router.afterEach(() => {
      nprogress.done()
    })
    Vue.http.interceptors.push((request, next) => {
      nprogress.start()
      next(response => {
        nprogress.done()
        return response
      })
    })
  }
}
</script>
<style lang="stylus">
@import "../../../node_modules/nprogress/nprogress.css"
#nprogress .spinner
  display none
</style>
