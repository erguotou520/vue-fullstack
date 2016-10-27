<template>
  <div>
    Dashboard
    <el-button type="info" @click.native="sendMessage">Send hello</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    sendMessage () {
      this.$socket.emit('client:hello', 'client hello')
    }
  },
  mounted () {
    this.$socket.on('server:hello', data => {
      this.$message.info(`Received from server: ${data}`)
    })
  }
}
</script>
