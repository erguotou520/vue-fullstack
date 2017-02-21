export default [{
  path: '/dashboard',
  component: (resolve) => {
    import('../view/Dashboard.vue').then(resolve)
  }
}, {
  path: '/users',
  component: (resolve) => {
    import('../view/UserList.vue').then(resolve)
  }
}, {
  path: '/things',
  component: (resolve) => {
    import('../view/ThingList.vue').then(resolve)
  }
}]
