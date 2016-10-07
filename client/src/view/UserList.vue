<template>
  <div style="width:100%">
    <el-breadcrumb separator="/" style="margin-bottom:.5rem">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" icon="plus" @click.native="createUser" style="margin-bottom:.5rem">新增</el-button>
    <el-table
      :data="users"
      border
      style="width: 100%">
      <el-table-column
        property="_id"
        label="ID"
        sortable
        width="220">
      </el-table-column>
      <el-table-column
        property="username"
        label="用户名"
        sortable
        min-width="240">
      </el-table-column>
      <el-table-column
        property="role"
        label="角色"
        min-width="100">
      </el-table-column>
      <el-table-column
        inline-template
        label="操作"
        align="center"
        width="100">
        <template>
          <!-- <el-button type="warning" @click.native="updatePassword(row._id)">修改密码</el-button> -->
          <el-button type="text" @click.native="deleteUser(row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增用户" v-model="formVisible">
      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="cancelForm">取 消</el-button>
        <el-button type="primary" @click.native="saveForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      formVisible: false,
      users: []
    }
  },
  methods: {
    fetch () {
      this.$http.get('users').then(data => data.json()).then(data => {
        this.users = data.data
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
    deleteUser (_id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$http.delete('users/' + _id).then(() => {
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
  created () {
    this.fetch()
  }
}
</script>
