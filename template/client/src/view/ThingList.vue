<template>
  <content-module name="things">
    <el-breadcrumb separator="/" style="margin-bottom:.5rem">
      <el-breadcrumb-item to="/dashboard">{{$t('things.breadcrumb.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('things.breadcrumb.current')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-bottom:.5rem">
      <el-button type="primary" icon="plus" @click.native="createThing">{{$t('toolbar.create')}}</el-button>
    </div>
    <div>
      <el-card class="box-card" v-for="thing in things">
        <div slot="header" class="clearfix">
          <span>{{thing.name}}</span>
          <i class="el-icon-delete icon" @click="deleteThing(thing)"></i>
          <i class="el-icon-edit icon" @click="editThing(thing)"></i>
        </div>
        <p>
          {{thing.info}}
        </p>
      </el-card>
    </div>
    <el-dialog :title="form._id ? $t('things.edit.update') : $t('things.edit.create')" v-model="formVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item :label="$t('things.model.name')" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('things.model.description')">
          <el-input v-model="form.info"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="cancelForm">{{$t('message.confirm.cancel')}}</el-button>
        <el-button type="primary" @click.native="saveForm">{{$t('message.confirm.ok')}}</el-button>
      </span>
    </el-dialog>
  </content-module>
</template>
<script>
import { thing } from 'resources'
export default {
  data () {
    return {
      formVisible: false,
      form: {
        _id: '',
        name: '',
        info: ''
      },
      rules: {
        name: [{ required: true, message: this.$t('things.rules.name'), trigger: 'blur' }]
      },
      things: []
    }
  },
  methods: {
    fetch () {
      thing.query().then(data => data.json()).then(data => {
        this.things = data.data
      }).catch(err => {
        console.error(err)
      })
    },
    createThing () {
      this.formVisible = true
    },
    cancelForm () {
      this.form._id = ''
      this.form.name = ''
      this.form.info = ''
      this.formVisible = false
    },
    saveForm () {
      let promise
      if (this.form._id) {
        promise = thing.update({ _id: this.form._id }, this.form)
      } else {
        promise = thing.save({}, {
          name: this.form.name,
          info: this.form.info
        })
      }
      promise.then(() => {
        this.cancelForm()
        this.$message({
          type: 'success',
          message: this.form._id ? this.$t('message.updated') : this.$t('message.created')
        })
        this.fetch()
      }).catch(() => {})
    },
    editThing (thing) {
      Object.assign(this.form, thing)
      this.formVisible = true
    },
    deleteThing (thing) {
      this.$confirm(`This action will remove the selected thing: ${thing.name} forever, still going on?`, this.$t('message.confirm.title'), {
        type: 'warning'
      }).then(() => {
        thing.delete({ _id: thing._id }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('message.removed')
          })
          this.fetch()
        })
      }).catch(() => {})
    }
  },
  created () {
    this.fetch()
  }
}
</script>
<style lang="stylus" scoped>
@import "../assets/css/variable"
.box-card
  display inline-block
  width 20rem
  height 15rem
  margin .5rem
  .icon
    float right
    margin-left .5rem
    color $color-silver
    cursor pointer
    &:hover
      color $color-primary
</style>
