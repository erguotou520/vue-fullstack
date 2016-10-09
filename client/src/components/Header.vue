<template>
  <transition name="header">
    <header id="header" v-if="loggedIn">
      <div class="container">
        <div class="nav" v-if="loggedIn">
          <el-dropdown class="dropdown" :text="username" type="text" :icon-separate="false" trigger="click">
            <el-dropdown-item @click.native="toProfile">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="doLogout">退出</el-dropdown-item>
          </el-dropdown>
        </div>
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
  background-color $color-white
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
</style>
