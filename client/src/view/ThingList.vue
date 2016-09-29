<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom:.5rem">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>事情管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="things"
      border
      style="width: 100%">
      <el-table-column
        property="_id"
        label="ID"
        sortable
        width="240">
      </el-table-column>
      <el-table-column
        property="name"
        label="名字"
        sortable
        width="240">
      </el-table-column>
      <el-table-column
        property="info"
        label="描述">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      things: []
    }
  },
  created () {
    this.$http.get('things').then(data => data.json()).then(data => {
      this.things = data.data
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>
