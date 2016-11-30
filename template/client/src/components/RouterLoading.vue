<template>
  <transition name="router-loading">
    <div class="loading" v-show="routeLoadingStatus">
      <div class="spinner"></div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['routeLoadingStatus'])
  }
}
</script>
<style lang="stylus" scoped>
@import "../assets/css/variable"
.loading
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  display flex
  align-items center
  justify-content center
  width 100%
  height 100%
  background-color rgba(0,0,0,.8)
  z-index 1000
.router-loading-leave-active
  background-color rgba(0,0,0,.1)
  transition all .5s

.spinner
  width 40px
  height 40px
  background-color $color-primary
  margin 100px auto
  -webkit-animation sk-rotateplane 1.2s infinite ease-in-out
  animation sk-rotateplane 1.2s infinite ease-in-out

@-webkit-keyframes sk-rotateplane
  0%
    -webkit-transform perspective(120px)

  50%
    -webkit-transform perspective(120px) rotateY(180deg)
    transform perspective(120px) rotateX(-180.1deg) rotateY(0deg)
    -webkit-transform perspective(120px) rotateX(-180.1deg) rotateY(0deg)

  100%
    -webkit-transform perspective(120px) rotateY(180deg)  rotateX(180deg)
    transform perspective(120px) rotateX(-180deg) rotateY(-179.9deg)
    -webkit-transform perspective(120px) rotateX(-180deg) rotateY(-179.9deg)

@keyframes sk-rotateplane
  0%
    transform perspective(120px) rotateX(0deg) rotateY(0deg)
    -webkit-transform perspective(120px) rotateX(0deg) rotateY(0deg)
  50%
    transform perspective(120px) rotateX(-180.1deg) rotateY(0deg)
    -webkit-transform perspective(120px) rotateX(-180.1deg) rotateY(0deg)
  100%
    transform perspective(120px) rotateX(-180deg) rotateY(-179.9deg)
    -webkit-transform perspective(120px) rotateX(-180deg) rotateY(-179.9deg)
</style>
