var fms = require('fms')
var Mock = require('mockjs')

fms.post({
  title: 'Login',
  url: '/auth/local',
  request: {
    username: 'xxx',
    password: 'xxx'
  },
  resStatus: {
    err: 401
  },
  res: {
    ok: function () {
      return Mock.mock({
        token: '@string(32)'
      })
    },
    err: {
      message: 'Username or password is not correct.'
    }
  }
})

fms.get({
  title: 'Get user list',
  url: '/users',
  request: {
    page: {
      current: 2,
      limit: 15
    }
  },
  res: {
    ok: function () {
      return Mock.mock({
        page: {
          total: '@natural(5,20)'
        },
        'results|5-8': [{
          _id: '@uuid',
          name: '@name',
          username: '@name',
          role: '@pick(["user","admin"])',
          provider: 'local'
        }]
      })
    },
    err: {
      message: 'error when quering'
    }
  }
})

fms.get({
  title: 'Get a specified user',
  url: '/users/:id',
  resStatus: {
    err: 404
  },
  res: {
    ok: function () {
      return Mock.mock({
        _id: '@uuid',
        name: '@name',
        username: '@name',
        role: '@pick(["user","admin"])',
        provider: 'local'
      })
    }
  }
})

fms.get({
  title: 'Get user info',
  url: '/users/me',
  resStatus: {
    err: 401
  },
  res: {
    ok: function () {
      return Mock.mock({
        id: '@uuid'
      })
    }
  }
})

fms.post({
  title: 'Create a user',
  url: '/users',
  request: {
    name: 'xxx',
    username: 'xxx',
    password: 'xxx'
  },
  res: {
    ok: function () {
      return Mock.mock({
        token: '@string(32)'
      })
    }
  }
})

fms.put({
  title: 'Update user\'s password',
  url: '/users/:id/password',
  resStatus: {
    err: 403
  }
})

fms.ajax({
  title: 'Delete a user',
  type: 'delete',
  url: '/users/:id',
  resStatus: {
    ok: 204,
    err: 403
  },
  res: {
    ok: {}
  }
})
