<template>
  <transition name="header">
    <header id="header" v-if="loggedIn">
      <h1></h1>
      <div class="nav" v-if="loggedIn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{username}}&nbsp;<i class="el-icon-caret-bottom el-icon-right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="showConfig">{{$t('header.settings')}}</el-dropdown-item>
            <el-dropdown-item @click.native="password.visible=true">{{$t('header.password')}}</el-dropdown-item>
            <el-dropdown-item @click.native="doLogout">{{$t('header.logout')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 用户设置 -->
      <el-dialog :title="$t('header.settings')" v-model="config.visible" size="small"
        top="4%" @close="cancelConfig">
        <el-form class="noline" ref="config" label-position="top"
          :model="config.form" :rules="config.rules">
          <el-form-item :label="$t('header.localeSetting')" prop="locale">
            <el-select v-model="config.form.locale">
              <el-option label="简体中文(zh_CN)" value="zh_CN"></el-option>
              <el-option label="English(en)" value="en"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('header.pageLimit')" prop="pageLimit">
            <el-slider v-model="config.form.pageLimit" :min="1" :max="100" show-input></el-slider>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="config.visible=false">{{$t('message.confirm.ok')}}</el-button>
          <el-button type="primary" @click.native="saveConfig">{{$t('message.confirm.ok')}}</el-button>
        </span>
      </el-dialog>
      <!-- 修改密码 -->
      <el-dialog :title="$t('header.password')" v-model="password.visible" size="small" @close="cancelPassword">
        <el-form label-position="top" :model="password.form"
          :rules="password.rules" ref="password">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('header._password.old')" prop="oldPassword">
                <el-input type="password" v-model="password.form.oldPassword"/>
              </el-form-item>
              <el-form-item :label="$t('header._password._new')" prop="password">
                <el-input type="password" v-model="password.form.password"/>
              </el-form-item>
              <el-form-item :label="$t('header._password.newConfirm')" prop="confirmPassword">
                <el-input type="password" v-model="password.form.confirmPassword"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('config.description')">
                <div>{{$t('header._password.description')}}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="password.visible=false">{{$t('message.confirm.cancel')}}</el-button>
          <el-button type="primary" @click.native="changePassword">{{$t('message.confirm.ok')}}</el-button>
        </span>
      </el-dialog>
    </header>
  </transition>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { merge } from 'lodash'
export default {
  data () {
    return {
      config: {
        visible: false,
        form: {
          locale: '',
          pageLimit: 10
        },
        rules: {
          locale: [{ required: true }],
          pageLimit: [{ type: 'number', required: true }]
        }
      },
      password: {
        visible: false,
        form: {
          oldPassword: '',
          password: '',
          confirmPassword: ''
        },
        rules: {
          oldPassword: [{
            required: true, message: this.$t('header._password.rules.old'), trigger: 'blur'
          }],
          password: [{
            required: true, message: this.$t('header._password.rules._new'), trigger: 'blur'
          }],
          confirmPassword: [{
            required: true, message: this.$t('header._password.rules.newConfirm'), trigger: 'blur'
          }, {
            trigger: 'blur', message: this.$t('header._password.rules.notMatch'), validator: (rule, value, callback) => {
              if (value !== this.password.form.password) {
                callback(new Error(rule.message))
              } else {
                callback()
              }
            }
          }]
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'loggedIn',
      'globalConfig'
    ])
  },
  methods: {
    ...mapActions(['logout', 'updateGlobalConfig']),
    doLogout () {
      this.logout().then(() => {
        this.$router.push('/login')
      })
    },
    showConfig () {
      this.config.visible = true
    },
    cancelConfig () {
      this.config.form.locale = this.globalConfig.locale
      this.config.form.pageLimit = this.globalConfig.pageLimit
      this.config.visible = false
    },
    saveConfig () {
      this.updateGlobalConfig(this.config.form)
      this.config.visible = false
      this.$message.success(this.$t('message.save.ok'))
    },
    cancelPassword () {
      this.$refs.password.resetFields()
      merge(this.password.form, {
        oldPassword: '',
        password: '',
        confirmPassword: ''
      })
      this.password.visible = false
    },
    changePassword () {
      this.$refs.password.validate(valid => {
        if (valid) {
          this.$http.put('password', this.password.form).then(res => {
            if (res.ok) {
              this.$notify.success(this.$t('header._password.afterChange'))
              this.password.visible = false
              setTimeout(() => {
                this.doLogout()
              }, 2000)
            }
          }).catch(() => {})
        }
      })
    }
  },
  created () {
    this.cancelConfig()
  }
}
</script>
<style lang="stylus">
@import "../assets/css/variable"
.header-enter-active
.header-leave-active
  transition all .5s
.header-enter
.header-leave-active
  margin-top -($header-height)
#header
  display flex
  flex-direction row
  align-items center
  justify-content space-between
  padding 0 1rem
  background-color $color-white
  h1
    float left
    height $header-height
    line-height @height
    margin 0
    font-weight normal
    > a
      color #fff
  .nav
    float right
    margin 0
    padding 0
</style>
