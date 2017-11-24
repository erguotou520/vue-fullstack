<template>
  <transition name="menu">
    <div v-if="loggedIn" id="app-menu">
      <router-link class="logo-wrapper" to="/" exact>Backend System</router-link>
      <el-menu :default-active="$route.path" theme="dark" :router="true">
        <el-menu-item index="/users">{{$t('menu.users')}}</el-menu-item>
        <el-menu-item index="/things">{{$t('menu.things')}}</el-menu-item>
      </el-menu>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import locales from 'locales/menu'
import { Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui'
export default {
  locales,
  computed: {
    ...mapGetters(['loggedIn'])
  },
  components: {
    [Menu.name]: Menu,
    [Submenu.name]: Submenu,
    [MenuItem.name]: MenuItem,
    [MenuItemGroup.name]: MenuItemGroup
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
  .el-submenu
  .el-menu-item
    .iconfont
      margin-right 10px
</style>
