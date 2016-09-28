<template>
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
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      things: []
    }
  },
  beforeRouteEnter (route, redirect, next) {
    Vue.http.get('things').then(data => data.json()).then(data => {
      next(vm => {
        vm.things = data.data
      })
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>
