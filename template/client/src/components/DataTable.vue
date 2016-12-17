<template>
  <div class="ui-data-table flex flex-1 flex-column">
    <div v-if="$slots.toolbar" class="toolbar">
      <slot name="toolbar"></slot>
    </div>
    <div class="data-table flex flex-1" ref="wrapper">
      <el-table :data="data" border :height="avaliableHeight" :row-key="(row)=>row[rowKey]">
        <slot></slot>
      </el-table>
      <slot name="table"></slot>
      <transition name="fade">
        <div class="data-loading flex flex-main-center flex-cross-center" v-show="pending">
          <div class="loader-inner">
            <div></div>
            <div></div>
          </div>
        </div>
      </transition>
    </div>
    <pagination v-if="showPagination" :current="page.current"
      :total="page.total||0" @page-change="onPageChange"></pagination>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { merge } from 'lodash'
import Pagination from 'components/Pagination'

export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    rowKey: String,
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      avaliableHeight: 0,
      pending: false,
      page: {
        current: 1,
        limit: 0,
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters(['globalConfig'])
  },
  watch: {
    'globalConfig.pageLimit' (val) {
      this.page.current = 1
      this.page.limit = val
      this.$emit('page-change', 1)
    }
  },
  components: {
    Pagination
  },
  methods: {
    calcTableAvaliableHeight () {
      this.$nextTick(() => {
        this.avaliableHeight = this.$refs.wrapper.clientHeight
      })
    },
    query (resource, current, ...rest) {
      current = current || this.page.current
      this.pending = true
      const condition = merge({ page: { current, limit: this.globalConfig.pageLimit }}, ...rest)
      return resource.query(condition)
      .then(res => res.json()).then(data => {
        this.pending = false
        this.page.current = current || this.page.current
        this.page.total = data.page ? data.page.total : data.results.length
        return data.results
      })
    },
    onPageChange (targetPage) {
      this.$emit('page-change', targetPage)
    }
  },
  created () {
    this.page.limit = this.globalConfig.pageLimit
  },
  mounted () {
    this.calcTableAvaliableHeight()
    window.addEventListener('resize', this.calcTableAvaliableHeight)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcTableAvaliableHeight)
  }
}
</script>
<style lang="stylus">
@import "../assets/css/variable"
.ui-data-table
  .toolbar
    margin-bottom .5rem
    .el-form-item
      margin-bottom 0
  // data table
  .data-table
    position relative
    margin 0 -1rem
    font-size .75rem
    border-left none
    border-right none
    .el-table
      &::before
        background none
    > .data-loading
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
    .actions
      display flex
      align-items center
      justify-content center
      .el-tooltip
        margin-left 1rem
        &:first-child
          margin-left 0
        .el-tooltip__rel
          display inline-block
          line-height 1rem
      .icon
        margin-left .5rem
        line-height 1rem
        font-size 1rem
        color $color-primary
        cursor pointer
        &:first-child
          margin-left 0
        &:hover
          color $color-primary-light
    .fade-enter-active
    .fade-leave-active
      transition opacity .5s
    .fade-enter
    .fade-leave-active
      opacity 0
@media (max-width 64rem)
  .ui-data-table
    .data-table
      .actions
        .el-tooltip
          margin-left .5rem
</style>
