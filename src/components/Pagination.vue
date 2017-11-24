<template>
  <div class="ui-pagination">
    <span class="current">{{$t('pagination.current')}}&nbsp;{{current}}&nbsp;{{$t('pagination.currentAppend')}}&nbsp;&nbsp;{{$t('pagination.pages')}}&nbsp;{{pages}}&nbsp;{{$t('pagination.pagesAppend')}}</span>
    <div class="navs">
      <a :disabled="current<=1" @click="change(1, current<=1)">
        <span class="iconfont icon-home-page"></span>
      </a>
      <a :disabled="current<=1" @click="change(current-1, current<=1)">
        <span class="el-icon-arrow-left"></span>
      </a>
      <a :disabled="current>=pages" @click="change(current+1, current>=pages)">
        <span class="el-icon-arrow-right"></span>
      </a>
      <a :disabled="current>=pages" @click="change(pages, current>=pages)">
        <span class="iconfont icon-last-page"></span>
      </a>
      <a @click="$emit('page-change', current)"><span class="iconfont icon-refresh"></span></a>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import locales from 'locales/pagination'
export default {
  locales,
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1,
      required: true
    }
  },
  computed: {
    ...mapGetters(['globalConfig']),
    pages () {
      return Math.round(this.total / this.globalConfig.pageLimit + 0.5)
    }
  },
  methods: {
    change (targetPage, disabled) {
      if (!disabled) {
        this.$emit('page-change', targetPage)
      }
    },
    reset () {
      this.$emit('page-change', 1)
    }
  }
}
</script>
<style lang="stylus">
@import "../assets/css/variable"
.ui-pagination
  display flex
  justify-content space-between
  align-items center
  padding .75rem 1rem
  border-top 1px solid $color-gray
  background-color #fff
  .navs
    > a
      float left
      width 2rem
      height 1.75rem
      line-height @height
      text-align center
      border-right 1px solid $color-gray
      background-color $color-white
      color $color-black-exact-light
      border 1px solid $color-gray
      border-right none
      cursor pointer
      &:last-child
        border-right 1px solid $color-gray
      &[disabled]
        color $color-silver-exact-light
        cursor not-allowed
        background-color $color-gray-exact-light
      &:hover
        background-color $color-primary
        color $color-white
        border-color $color-primary
</style>
