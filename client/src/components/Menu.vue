<template>
  <div v-if="loggedIn" class="menu">
    <el-menu class="el-menu-vertical-demo"
      theme="dark" :router="true">
      <el-menu-item index="/foo">导航1
      </el-menu-item>
      <el-menu-item index="/bar">导航二</el-menu-item>
      <el-menu-item index="3">导航三</el-menu-item>
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
.menu
  position fixed
  top 5rem
  left 0
  bottom 0
  width 10.5rem
  background-color #324057
  overflow auto
</style>
