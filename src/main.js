import Vue from 'vue'
import App from './App'
import VueValidator from 'vue-validator'

Vue.use(VueValidator)

import router from './router'

// Start the app
router.start(App, '#app')
