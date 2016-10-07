<template>
  <div class="login-wrapper">
    <h1>XXX Backend System</h1>
    <el-form ref="form" :model="form" :rules="rules"
      @submit.native.prevent="onSubmit">
      <el-form-item prop="username">
        <el-input v-model="form.username" type="text"
          required :maxlength="20" :minlength="3"
          placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" type="password"
          required :maxlength="20" :minlength="3"
          placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox class="checkbox" v-model="remberme">一周之内免登录</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login-button" :class="{error: loginError}" type="success"
          native-type="submit" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
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
      valid: false,
      loginError: false
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
    ...mapActions(['login']),
    onSubmit () {
      this.loading = true
      this.login({
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
        this.loginError = true
        setTimeout(() => {
          this.loginError = false
        }, 500)
      })
    }
  }
}
</script>
<style lang="stylus">
$input-width = 15rem
.login-wrapper
  align-self center
  margin -10rem auto 0
  > form
    width $input-width
    margin 0 auto
.login-button
  width 100%
  &.error
    animation shake .5s
</style>
