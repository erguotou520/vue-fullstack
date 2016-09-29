<template>
  <div id="app-main">
    <x-menu></x-menu>
    <div class="app-wrapper">
      <x-header></x-header>
      <nprogress-container></nprogress-container>
      <div class="app-container" :class="{active: loggedIn}" v-loading="routeLoadingStatus">
        <transition name="router" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import XHeader from './components/Header'
import XMenu from './components/Menu'
export default {
  components: {
    NprogressContainer,
    XHeader,
    XMenu
  },
  computed: {
    ...mapGetters([
      'loggedIn',
      'routeLoadingStatus'
    ])
  }
}
</script>
<style lang="stylus">
@import "./assets/css/variable"
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
      margin 0
      padding 1rem
      background-color #fff
      overflow auto
      &.active
        margin 1rem 1rem 0
.router-enter-active
.router-leave-active
  transition all .5s cubic-bezier(0, 0, 0, 1)
.router-enter
  transform translate3D(150px, 0, 0)
  opacity .5
</style>
