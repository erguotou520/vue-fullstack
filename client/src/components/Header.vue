<template>
  <transition name="header">
    <header id="header" v-if="loggedIn">
      <h1></h1>
      <div class="nav" v-if="loggedIn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{username}}&nbsp;<i class="el-icon-caret-bottom el-icon-right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toProfile">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="doLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
  </transition>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'username',
      'loggedIn'
    ])
  },
  methods: {
    ...mapActions(['logout']),
    toProfile () {
      this.$router.push('/profile')
    },
    doLogout () {
      this.logout().then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
<style lang="stylus">
@import "../assets/css/variable"
.header-enter-active
.header-leave-active
  transition all .5s
.header-enter
.header-leave-active
  margin-top -($header-height)
#header
  display flex
  flex-direction row
  align-items center
  justify-content space-between
  padding 0 1rem
  background-color $color-white
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
</style>
