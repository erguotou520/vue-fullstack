export default [{
  path: '/dashboard',
  component: (resolve) => {
    System.import('../view/Dashboard.vue').then(resolve)
  }
}, {
  path: '/users',
  component: (resolve) => {
    System.import('../view/UserList.vue').then(resolve)
  }
}, {
  path: '/things',
  component: (resolve) => {
    System.import('../view/ThingList.vue').then(resolve)
  }
}]
