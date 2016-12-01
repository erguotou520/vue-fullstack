<template>
  <div class="ui-password">
    <el-input :placeholder="placeholder" :value="value" ref="input"
      :minlength="minlength" :maxlength="maxlength" :disabled="disabled"
      @input="$emit('input', arguments[0])" :type="show?'text':'password'">
    </el-input>
    <span class="icon cloudicon" :class="[iconClass]" @click="show=!show"></span>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: '',
    value: String,
    defaultVisible: {
      type: Boolean,
      default: false
    },
    minlength: Number,
    maxlength: Number,
    disabled: Boolean
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    iconClass () {
      return this.show ? 'icon-visible' : 'icon-invisible'
    }
  },
  create () {
    this.show = this.defaultVisible
  }
}
</script>
<style lang="stylus">
@import "../assets/css/variable"
.ui-password
  .icon
    position absolute
    right 4px
    top 0
    line-height 2.25rem
    font-size 1.25rem
    color $color-black-exact-light
    cursor pointer
    &:hover
      color $color-black-light
</style>
