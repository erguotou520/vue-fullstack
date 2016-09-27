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
      window.fetch('/api/things').then(function (res) {
        console.log(res.json())
      }).catch(function (err) {
        console.log(err.json())
      })
      this.name = 'Bar'
    }
  }
}
</script>
