<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom:.5rem">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="users"
      border
      style="width: 100%">
      <el-table-column
        property="_id"
        label="ID"
        sortable>
      </el-table-column>
      <el-table-column
        property="username"
        label="用户名"
        sortable
        width="240">
      </el-table-column>
      <el-table-column
        property="role"
        label="角色"
        width="240">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: []
    }
  },
  created () {
    this.$http.get('users').then(data => data.json()).then(data => {
      this.users = data.data
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>
