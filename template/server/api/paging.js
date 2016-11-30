var async = require('async')
module.exports = {
  listQuery: function (schema, search, selection, sort, page, callback) {
    for (var key in search) {
      if (search[key] === null || search[key] === undefined || search[key] === '') {
        delete search[key]
      }
    }
    async.parallel({
      total: function (done) {
        schema.count(search).exec(function (err, total) {
          done(err, total)
        })
      },
      records: function (done) {
        schema.find(search, selection).sort(sort).skip((+page.current - 1) * (+page.limit))
        .limit(+page.limit).exec(function (err, doc) {
          done(err, doc)
        })
      }
    }, function functionName (err, data) {
      callback(err, {
        page: {
          total: data.total
        },
        results: data.records
      })
    })
  }
}
