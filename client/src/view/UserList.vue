<template>
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
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      users: []
    }
  },
  beforeRouteEnter (route, redirect, next) {
    Vue.http.get('users').then(data => data.json()).then(data => {
      next(vm => {
        vm.users = data.data
      })
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>
