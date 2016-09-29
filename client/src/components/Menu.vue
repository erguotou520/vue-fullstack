<template>
  <div v-if="loggedIn" id="app-menu">
    <router-link class="logo-wrapper" to="/" exact>Backend System</router-link>
    <el-menu class="el-menu"
      theme="dark" :router="true">
      <el-menu-item index="/users">Users</el-menu-item>
      <el-menu-item index="/things">Things</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "../assets/css/variable"
#app-menu
  width $menu-width
  min-width @width
  background-color #324057
  overflow auto
  .logo-wrapper
    display block
    padding-left 1rem
    height $header-height
    line-height @height
    color #fff
    font-size 1.25rem
    background-color #3663ad
</style>
