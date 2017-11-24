var fms = require('fms')
var Mock = require('mockjs')

fms.get({
  title: 'Get thing list',
  url: '/things',
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
          info: '@paragraph',
          active: '@boolean'
        }]
      })
    },
    err: {
      message: 'error when quering'
    }
  }
})

fms.get({
  title: 'Get a specified thing',
  url: '/things/:id',
  resStatus: {
    err: 404
  },
  res: {
    ok: function () {
      return Mock.mock({
        _id: '@uuid',
        name: '@name',
        info: '@paragraph',
        active: '@boolean'
      })
    }
  }
})

fms.post({
  title: 'Create a thing',
  url: '/things',
  request: {
    name: 'xxx',
    info: 'xxx'
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
  title: 'Update a thing info',
  url: '/things/:id',
  request: {
    name: 'xxx',
    info: 'xxx',
    active: 'true|false'
  },
  resStatus: {
    err: 403
  }
})

fms.ajax({
  title: 'Delete a thing',
  type: 'delete',
  url: '/things/:id',
  resStatus: {
    ok: 204,
    err: 403
  },
  res: {
    ok: {}
  }
})
