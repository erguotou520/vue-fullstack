<template>
  <div>
    Hi, {{name}}!
    <img :src="src" alt="" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      src: '/static/1.png',
      name: 'Foo'
    }
  }
}
</script>
