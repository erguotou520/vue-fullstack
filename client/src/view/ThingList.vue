<template>
  <content-module name="things">
    <el-breadcrumb separator="/" style="margin-bottom:.5rem">
      <el-breadcrumb-item to="/dashboard">{{$t('thing.breadcrumb.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('thing.breadcrumb.current')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-bottom:.5rem">
      <el-button type="primary" icon="plus" @click.native="createThing">{{$t('operation.create')}}</el-button>
    </div>
    <div>
      <el-card class="box-card" v-for="thing in things" :key="thing._id">
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
    <el-dialog :title="form._id ? $t('thing.edit.update') : $t('thing.edit.create')" v-model="formVisible">
      <el-form :model="form" :rules="rules" ref="thing">
        <el-form-item :label="$t('thing.model.name')" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('thing.model.description')">
          <el-input v-model="form.info"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="cancelForm">{{$t('confirm.cancel')}}</el-button>
        <el-button type="primary" @click.native="saveForm">{{$t('confirm.ok')}}</el-button>
      </span>
    </el-dialog>
  </content-module>
</template>
<script>
import { thing as thingRes } from 'resources'
import locales from 'locales/things'
export default {
  locales,
  data () {
    return {
      formVisible: false,
      form: {
        _id: '',
        name: '',
        info: ''
      },
      rules: {
        name: [{ required: true, message: this.$t('thing.rules.name'), trigger: 'blur' }]
      },
      things: []
    }
  },
  methods: {
    fetch () {
      thingRes.query().then(data => data.json()).then(data => {
        this.things = data.results
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
      this.$refs.thing.validate(valid => {
        if (valid) {
          let promise
          if (this.form._id) {
            promise = thingRes.update({ _id: this.form._id }, this.form)
          } else {
            promise = thingRes.save({}, {
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
        }
      })
    },
    editThing (thing) {
      Object.assign(this.form, thing)
      this.formVisible = true
    },
    deleteThing (thing) {
      this.$confirm(`This action will remove the selected thing: ${thing.name} forever, still going on?`, this.$t('confirm.title'), {
        type: 'warning'
      }).then(() => {
        thingRes.delete({ _id: thing._id }).then(() => {
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
