<template>
  <content-module name="users">
    <el-breadcrumb separator="/" style="margin-bottom:.5rem">
      <el-breadcrumb-item to="/dashboard">{{$t('users.breadcrumb.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('users.breadcrumb.current')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <data-table :data="users" ref="users" row-key="_id"
      @page-change="fetch">
      <div slot="toolbar">
        <el-button type="primary" icon="plus" @click.native="createUser">{{$t('toolbar.create')}}</el-button>
      </div>
      <el-table-column property="_id" label="ID" sortable min-width="120"></el-table-column>
      <el-table-column property="username" :label="$t('users.model.username')" sortable min-width="120"></el-table-column>
      <el-table-column property="role" :label="$t('users.model.role')" min-width="90"></el-table-column>
      <el-table-column inline-template :label="$t('datatable.operate')" align="center" width="100">
        <el-button type="text" @click.native="deleteUser(row)">{{$t('toolbar.remove')}}</el-button>
      </el-table-column>
    </data-table>
    <el-dialog :title="$t('users.create.title')" v-model="formVisible" @close="cancelForm">
      <el-form :model="form" :rules="rules" ref="form"
        :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form-item :label="$t('users.model.username')" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('users.model.password')" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="formVisible=false">{{$t('message.confirm.cancel')}}</el-button>
        <el-button type="primary" @click.native="saveForm">{{$t('message.confirm.ok')}}</el-button>
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
          required: true, message: this.$t('users.rules.username'), trigger: 'blur'
        }],
        password: [{
          required: true, message: this.$t('users.rules.password'), trigger: 'blur'
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
              message: this.$t('message.created')
            })
            this.fetch()
          }).catch((err) => {
            this.$message({
              type: 'error',
              message: err.status === 422 ? this.$t('users.action.userExisted') : this.$t('message.createFailed')
            })
          })
        }
      })
    },
    deleteUser (user) {
      this.$confirm(`This action will remove the selected user: ${user.username} forever, still going on?`, this.$t('message.confirm.title'), {
        type: 'warning'
      }).then(() => {
        user.delete({ _id: user._id }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('message.removed')
          })
          this.fetch()
        })
      }).catch(() => {})
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.fetch()
    })
  }
}
</script>
