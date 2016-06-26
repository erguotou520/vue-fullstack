<template>
  <div>
    Hi, {{name}}!
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  route: {
    data () {
      this.name = 'Bar'
    }
  }
}
</script>
