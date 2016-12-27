import Vue from 'vue'
// things resource
export const thing = Vue.resource('things{/_id}')
// users resource
export const user = Vue.resource('users{/_id}', {}, {
  changePassword: { method: 'put', url: 'users{/id}/password' }
})
