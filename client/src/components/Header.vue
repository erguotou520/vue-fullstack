<template>
  <header id="header">
    <div class="container clearfix">
      <h1>Backend System</h1>
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/" exact>Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/foo">Foo</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/bar">Bar</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>
<style lang="stylus" scoped>
@import "../assets/css/variable"
$header-height = 5rem
#header
  background-color $color-primary
  .container
    width 71.25rem
    margin 0 auto
  h1
    float left
    height $header-height
    line-height @height
    margin 0
    font-weight normal
    color #fff
    cursor normal
  .nav
    float right
    margin 0
    padding 0
    cursor pointer
  .nav-item
    position relative
    float left
    height 5rem
    line-height @height
    list-style none
    cursor pointer
    > a
      display inline-block
      padding 0 1.25rem
      color #fff
      opacity .8
      transition all .3s
      &.active
        opacity 1
        &::after
          content ''
          position absolute
          left 0
          top auto
          bottom 0
          width 100%
          height 4px
          background-color $color-primary-light
    &:hover > a
      opacity 1
    & + .nav-item
      margin-left 1.25rem
</style>
