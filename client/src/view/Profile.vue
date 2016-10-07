<template>
  <el-form ref="form" :model="form">
    <el-form-item prop="username" label="用户名" inline>      
      <el-input v-model="form.username" type="text"
        required :maxlength="20" :minlength="3"
        placeholder="请输入用户名"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      form: {
        username: ''
      }
    }
  },
  computed: {
    ...mapGetters(['username'])
  },
  created () {
    this.form.username = this.username
  }
}
</script>
