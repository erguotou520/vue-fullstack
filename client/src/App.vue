<template>
  <div>
    <x-header></x-header>
    <x-menu></x-menu>
    <div class="app-container" :class="{'logged-in': loggedIn}">
      <transition name="router" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import XHeader from './components/Header'
import XMenu from './components/Menu'
export default {
  computed: {
    ...mapGetters([
      'loggedIn'
    ])
  },
  components: {
    XHeader,
    XMenu
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
a
  text-decoration none
.clearfix::after
  content ''
  display block
  clear both
.app-container
  padding 1rem
  &.logged-in
    padding-left ($menu-width + 1rem)
.router-enter-active
.router-leave-active
  transition all .5s cubic-bezier(0, 0, 0, 1)
.router-enter
  transform translate3D(150px, 0, 0)
  opacity .5
</style>
