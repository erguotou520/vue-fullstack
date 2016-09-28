<template>
  <div v-if="loggedIn" class="menu">
    <el-menu class="el-menu-vertical-demo"
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
.menu
  position fixed
  top $header-height
  left 0
  bottom 0
  width $menu-width
  background-color #324057
  overflow auto
</style>
