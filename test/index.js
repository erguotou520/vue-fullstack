var suppose = require('suppose')
var path = require('path')
var fs = require('fs')

var existed = false
var generateProjectName = 'test-fullstack'
if (fs.existsSync(path.join(__dirname, '../../', generateProjectName))) {
  existed = true
}

process.chdir(path.join(__dirname, '../../'))

// debug is an optional writeable output stream
var instance = suppose('vue', ['init', './vue-fullstack', generateProjectName])
if (existed) {
  instance.when(/Target directory exists/, 'Y\n')
}
instance
  .when(/Project name/).respond('\n')
  .when(/Project description/).respond('\n')
  .when(/Author/).respond('\n')
  .when(/Port that backend server listen at development environment/).respond("\n")
  .when(/Port that frontend server listen at development environment/).respond('\n')
  .when(/MongoDB uri/).respond("\n")
  .when(/Need vue-i18n/).respond('Y\n')
  .on('error', function(err){
    console.log(err.message)
  })
  .end(function(code){
    console.log('Done init')
  })
