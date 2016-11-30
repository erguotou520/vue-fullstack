<template>
  <content-module name="users">
    <el-breadcrumb separator="/" style="margin-bottom:.5rem">
      <el-breadcrumb-item to="/dashboard">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <data-table :data="users" ref="users" row-key="_id"
      @page-change="fetch">
      <div slot="toolbar">
        <el-button type="primary" icon="plus" @click.native="createUser">新增</el-button>
      </div>
      <el-table-column property="_id" label="ID" sortable min-width="120"></el-table-column>
      <el-table-column property="username" label="用户名" sortable min-width="120"></el-table-column>
      <el-table-column property="role" label="角色" min-width="90"></el-table-column>
      <el-table-column inline-template label="操作" align="center" width="100">
        <template>
          <!-- <el-button type="warning" @click.native="updatePassword(row._id)">修改密码</el-button> -->
          <el-button type="text" @click.native="deleteUser(row)">删除</el-button>
        </template>
      </el-table-column>
    </data-table>
    <el-dialog title="新增用户" v-model="formVisible" @close="cancelForm">
      <el-form :model="form" :rules="rules" ref="form"
        :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="formVisible=false">取 消</el-button>
        <el-button type="primary" @click.native="saveForm">确 定</el-button>
      </span>
    </el-dialog>
  </content-module>
</template>
<script>
import DataTable from 'components/DataTable'
import { user } from 'resources'
export default {
  data () {
    return {
      search: {
      },
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
      formVisible: false,
      users: []
    }
  },
  components: {
    DataTable
  },
  methods: {
    fetch (current = 1) {
      this.$refs.users.query(user, current, { search: this.search }).then(list => {
        this.users = list
      }).catch(err => {
        console.error(err)
      })
    },
    createUser () {
      this.formVisible = true
    },
    cancelForm () {
      this.form.username = ''
      this.form.password = ''
      this.formVisible = false
    },
    saveForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.post('users', this.form).then(() => {
            this.cancelForm()
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.fetch()
          }).catch((err) => {
            this.$message({
              type: 'error',
              message: err.status === 422 ? '用户名已存在' : '新增失败'
            })
          })
        }
      })
    },
    // updatePassword (_id) {
    //   this.$prompt('请输入新密码', '提示', {
    //     inputPattern: /^[\da-zA-Z_]{6,12}$/,
    //     inputErrorMessage: '密码至少6到12位，且只能是数字字母和下划线'
    //   }).then(value => {
    //     this.$http.put('users/' + _id + '/password').then(() => {
    //       this.$message({
    //         type: 'success',
    //         message: '密码已修改'
    //       })
    //     }).catch((error) => {
    //       console.error(error)
    //       this.$message({
    //         type: 'error',
    //         message: '密码修改未完成。'
    //       })
    //     })
    //   }).catch(() => {
    //     // do nothing
    //   })
    // },
    deleteUser (user) {
      this.$confirm(`此操作将删除用户: ${user.username}, 是否继续?`, '提示', {
        type: 'warning'
      }).then(() => {
        user.delete({ _id: user._id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetch()
        })
      }).catch(() => {
        // do nothing
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.fetch()
    })
  }
}
</script>
