<template>
  <div id="app-main">
    <x-menu></x-menu>
    <div class="app-wrapper">
      <x-header></x-header>
      <div class="app-container" :class="{active: loggedIn}">
        <!-- <router-loading></router-loading> -->
        <router-view></router-view>
      </div>
      <n-progress parent=".app-wrapper"></n-progress>
    </div>
  </div>
</template>
<script>
import XHeader from './components/Header'
import XMenu from './components/Menu'
// import RouterLoading from './components/RouterLoading'
import NProgress from './components/NProgress'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['loggedIn'])
  },
  components: {
    XHeader,
    XMenu,
    // RouterLoading,
    NProgress
  }
}
</script>
<style lang="stylus">
@import "assets/css/variable"
@import "assets/css/animate"

html
  font-size 16px
  font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
body
  margin 0
  padding 0
  background-color #f0f0f0
a
  text-decoration none
#app-main
  display flex
  width 100%
  height 100vh
  .app-wrapper
    flex 1
    display flex
    flex-flow column
    overflow-x hidden
    .app-container
      position relative
      flex 1
      display flex
      margin 0
      padding 1rem
      background-color #fff
      overflow auto
      &.active
        margin 1rem 1rem 0
</style>
