const osLocale = require('os-locale')()

let _locale = 'zh_CN'
osLocale.then(locale => {
  if (locale !== _locale) {
    _locale = 'en_US'
  }
  // todo
})
