import { assign } from 'lodash'

import users from './users/en_US'
import things from './things/en_US'
const common = {
  el: {
    select: {
      noData: 'no matched data'
    }
  },
  config: {
    title: 'xxx Backend System',
    description: 'Description'
  },
  message: {
    save: {
      ok: 'Saved!',
      err: 'Error occured when saving!'
    },
    confirm: {
      title: 'warning',
      ok: 'save',
      cancel: 'cancel'
    },
    created: 'Create successed',
    createFailed: 'Create failed',
    updated: 'Update successed',
    updateFailed: 'Update failed',
    removed: 'Delete successed',
    removeFailed: 'Delete failed'
  },
  http: {
    error: {
      E401: 'Not authorized',
      E404: 'Url not found',
      E500: 'Server error',
      others: 'Some error occured, please try again'
    }
  },
  header: {
    settings: 'User settings',
    password: 'Password',
    logout: 'Logout',
    localeSetting: 'Locale',
    pageLimit: 'Data count limit per page',
    _password: {
      description: 'Change your password. It\'s strongly recommend that you should pick a complex password.',
      old: 'Old password',
      _new: 'New password',
      newConfirm: 'Confirm new password',
      rules: {
        old: 'Please input old password',
        _new: 'Please input new password',
        newConfirm: 'Please input new password again',
        notMatch: 'The two new password not matched'
      },
      afterChange: 'Password has changed, system will logout automaticaly, please re-login with the new password.'
    }
  },
  menu: {
    users: 'Users',
    things: 'Things'
  },
  toolbar: {
    create: 'Add',
    remove: 'Delete'
  },
  datatable: {
    operate: 'Operate'
  },
  pagination: {
    current: 'current',
    currentAppend: 'page',
    total: 'total',
    pages: 'total',
    pagesAppend: 'page'
  },
  login: {
    username: 'Please input the username',
    password: 'Please input the password',
    button: 'Log in'
  }
}

export default assign({}, common, { users, things })
