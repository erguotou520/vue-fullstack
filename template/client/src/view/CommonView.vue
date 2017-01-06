<template>
  <div class="flex flex-1" style="width:100%">
    <transition name="router" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style lang="stylus">
.router-enter-active
.router-leave-active
  transition all .4s cubic-bezier(0, 0, 0, 1)
.router-enter
.router-leave-active
  opacity .1
.router-enter
  transform translate3D(100%, 0, 0)
.router-leave-active
  transform translate3D(-100%, 0, 0)
</style>
