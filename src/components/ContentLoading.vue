<template>
  <transition name="content-loading">
    <div class="content-loading flex flex-main-center flex-cross-center" v-show="show">
      <div class="loader-inner">
        <div></div>
        <div></div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "../assets/css/variable"
.content-loading
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  background-color rgba(255, 255, 255, .9)
  z-index 10
  .loader-inner
    position relative
    > div
      position absolute
      left 0
      top 0
      width 35px
      height @width
      border 2px solid $color-primary
      border-bottom-color transparent
      border-top-color transparent
      border-radius 100%
      animation rotate 1s 0s ease-in-out infinite
      animation-fill-mode both
      &:last-child
        display inline-block
        left 10px
        top 10px
        width 15px
        height @width
        animation-duration 0.5s
        border-color $color-primary transparent $color-primary transparent
        animation-direction reverse
</style>
