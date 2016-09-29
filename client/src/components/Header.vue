<template>
  <header id="header" v-if="loggedIn">
    <div class="container clearfix">
      <div class="nav" v-if="loggedIn">
        <el-dropdown class="dropdown" :text="username" type="text" :icon-separate="false" trigger="click">
          <el-dropdown-item @click.native="toProfile">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'username',
      'loggedIn'
    ])
  },
  methods: {
    toProfile () {
      this.$router.push('/profile')
    },
    logout () {
      this.$store.dispatch('LOGOUT').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
<style lang="stylus">
@import "../assets/css/variable"
#header
  background-color $color-primary
  .container
    padding 0 1rem
  h1
    float left
    height $header-height
    line-height @height
    margin 0
    font-weight normal
    > a
      color #fff
  .nav
    float right
    margin 0
    padding 0
    height $header-height
    line-height @height
    .el-button
      color #f2f2f2
      &:hover
        color #fff
</style>
