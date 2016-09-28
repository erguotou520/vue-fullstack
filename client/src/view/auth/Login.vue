<template>
  <div class="login-wrapper">
    <el-form ref="form" :model="form" :rules="rules"
      label-width="80px" @submit.native.prevent="onSubmit">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" type="text"
          required :maxlength="20" :minlength="3"
          placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"
          required :maxlength="20" :minlength="3"
          placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox class="checkbox" v-model="remberme">一周之内免登录</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit"
          :disabled="!valid" :loading="loading" class="login-button">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { throttle } from 'lodash'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }]
      },
      remberme: false,
      loading: false,
      valid: false
    }
  },
  watch: {
    'form': {
      deep: true,
      handler: throttle(function (form) {
        this.$refs.form.validate((valid) => {
          this.valid = valid
        })
      }, 300)
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      this.$store.dispatch('LOGIN', {
        username: this.form.username,
        password: this.form.password,
        remberme: this.remberme
      }).then((data) => {
        this.loading = false
        this.$router.push(this.$route.query.redirect || '/')
      }).catch((err) => {
        console.error(err)
        this.$notify({
          title: '错误',
          message: '用户名或密码错误',
          type: 'error',
          duration: 1500
        })
        this.loading = false
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.login-wrapper
  width 24rem
  margin 7.5rem auto
.login-button
  width 100%
</style>
