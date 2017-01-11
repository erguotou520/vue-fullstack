<template>
  <transition name="menu">
    <div v-if="loggedIn" id="app-menu">
      <router-link class="logo-wrapper" to="/" exact>Backend System</router-link>
      <ul class="menu">
        <li class="menu-item">
          <router-link class="menu-link" to="/users">{{$t('menu.users')}}</router-link>
        </li>
        <li class="menu-item">
          <router-link class="menu-link" to="/things">{{$t('menu.things')}}</router-link>
        </li>
      </ul>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['loggedIn'])
  }
}
</script>
<style lang="stylus">
@import "../assets/css/variable"
.menu-enter-active
.menu-leave-active
  transition all .5s
.menu-enter
.menu-leave-active
  margin-left -($menu-width)
#app-menu
  width $menu-width
  min-width @width
  background-color $color-black-light
  overflow auto
  .logo-wrapper
    display block
    padding-left 1rem
    height $header-height
    line-height @height
    color #fff
    font-size 1.25rem
    background-color #435065
  > .menu
    margin 0
    padding 0
    list-style none
    .menu-item
      display block
      height 3.5rem
      line-height @height
      .menu-link
        display block
        padding-left 1.25rem
        color $color-silver-exact-light
        &:hover
          background-color $color-black-exact-light
        &.active
          color $color-primary
</style>
