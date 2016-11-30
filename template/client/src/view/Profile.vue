<template>
  <el-form ref="form" :model="form" label-position="left" label-width="130px"
    :rules="rules" style="width:480px;margin:0 auto">
    <el-form-item label="用户名">
      {{username}}
    </el-form-item>
    <el-form-item label="请输入旧密码" prop="oldPassword">
      <el-input type="password" v-model="form.oldPassword"></el-input>
    </el-form-item>
    <el-form-item label="请输入新密码" prop="newPassword">
      <el-input type="password" v-model="form.newPassword"></el-input>
    </el-form-item>
    <el-form-item label="请再次输入密码" prop="confirmPassword">
      <el-input type="password" v-model="form.confirmPassword"></el-input>
    </el-form-item>
    <el-button type="primary" @click.native="changePassword" style="float:right">修改密码</el-button>
  </el-form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { omit } from 'lodash'
export default {
  data () {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [{
          required: true, message: '请输入旧密码', trigger: 'blur'
        }],
        newPassword: [{
          required: true, message: '请输入新密码', trigger: 'blur'
        }],
        confirmPassword: [{
          required: true, message: '两次输入的密码不一致', trigger: 'blur', validator: (rule, value, callback) => {
            if (value !== this.form.newPassword) {
              callback(new Error(rule.message))
            } else {
              callback()
            }
          }
        }]
      }
    }
  },
  computed: {
    ...mapGetters(['userId', 'username'])
  },
  methods: {
    ...mapActions(['logout']),
    changePassword () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.put(`users/${this.userId}/password`, omit(this.form, ['confirmPassword'])).then(res => {
            if (res.ok) {
              this.logout()
            }
          }).catch(() => {})
        }
      })
    }
  }
}
</script>
