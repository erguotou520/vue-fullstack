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
            <el-dropdown-item @click.native="toProfile">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="showConfig">用户设置</el-dropdown-item>
            <el-dropdown-item @click.native="doLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 用户设置 -->
      <el-dialog title="用户设置" v-model="config.visible" size="small"
        top="4%" @close="cancelConfig">
        <el-form class="noline" ref="config" label-position="top"
          :model="config.form" :rules="config.rules">
          <el-form-item label="语言" prop="locale">
            <el-select v-model="config.form.locale">
              <el-option label="简体中文(zh_CN)" value="zh_CN"></el-option>
              <el-option label="English(en)" value="en"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="每页条目数" prop="pageLimit">
            <el-slider v-model="config.form.pageLimit" :min="1" :max="100" show-input></el-slider>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="config.visible=false">取 消</el-button>
          <el-button type="primary" @click.native="saveConfig">确 定</el-button>
        </span>
      </el-dialog>
    </header>
  </transition>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
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
    toProfile () {
      this.$router.push('/profile')
    },
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
      this.$message.success('已保存修改')
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
