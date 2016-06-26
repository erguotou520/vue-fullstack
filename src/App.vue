<template>
  <div>
    <a v-link="'/foo'">Go to foo</a>
    <a v-link="'/bar'">Go to bar</a>
    <a v-link="'/validate'">Go to validate example</a>
    <router-view transition="fade" transition-mode="out-in"></router-view>
  </div>
</template>
<script>
import store from './vuex/store'
export default {
  ready () {
    console.log('ready.')
  },
  store: store
}
</script>
<style>
.fade-transition {
  transition: all .3s ease;
}
.fade-enter, .fade-leave {
  opacity: 0;
}
</style>
