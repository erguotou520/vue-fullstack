var suppose = require('suppose')
var path = require('path')
var fs = require('fs')

var backendProject = 'vf-backend'
var mockProject = 'vf-mock'
// cd to parent folder
process.chdir(path.join(__dirname, '../../'))
console.log('Current pwd: ', process.cwd())
// remove folder
// fs.unlinkSync(path.join(__dirname, backendProject))
// fs.unlinkSync(path.join(__dirname, mockProject))
// console.log('Remove backend and mock folder: ', path.join(__dirname, backendProject), path.join(__dirname, mockProject))

// shell expect
// backend expect
suppose('vue', ['init', './vue-fullstack', backendProject])
  .when(/Project name/).respond('\n')
  .when(/Project description/).respond('\n')
  .when(/Author/).respond('\n')
  .when(/Use real backend server or mock server/).respond('\n')
  .when(/Port that backend server listen at development environment/).respond("\n")
  .when(/Port that frontend server listen at development environment/).respond('\n')
  .when(/MongoDB uri/).respond("\n")
  .when(/Need vue-i18n/).respond('Y\n')
  .on('error', function(err){
    console.log(err.message)
  })
  .end(function(code){
    console.log('Finish expecting backend.')
    fs.writeFileSync(path.join(__dirname, '../../', backendProject, 'Procfile'), 'web: node server/app.js')
    // add code: can't change admin's password
    var text = fs.readFileSync(path.join(__dirname, '../../', backendProject, 'server/api/user/user.controller.js'), { encoding: 'utf-8' })
    fs.writeFileSync(path.join(__dirname, '../../', backendProject, 'server/api/user/user.controller.js'), text.replace(/exports\.changePassword = function \(req, res, next\) \{/, 'exports.changePassword = function (req, res, next) {\nif(req.user.role==="admin"){return res.sendStatus(200)}\n'))
    // mock expect
    suppose('vue', ['init', './vue-fullstack', mockProject])
      .when(/Project name/).respond('\n')
      .when(/Project description/).respond('\n')
      .when(/Author/).respond('\n')
      .when(/Use real backend server or mock server/).respond('\033\[A\n')
      .when(/Port that frontend server listen at development environment/).respond('\n')
      .when(/Port that mock server listen at/).respond('\n')
      .when(/Need vue-i18n/).respond('Y\n')
      .on('error', function(err){
        console.log(err.message)
      })
      .end(function(code){
        console.log('Finish expecting mock.')
        fs.writeFileSync(path.join(__dirname, '../../', mockProject, 'Procfile'), 'web: node mock/index.js')
      })
  })
