export default [{
  path: '/dashboard',
  component: (resolve) => {
    require(['../view/Dashboard.vue'], resolve)
  }
}, {
  path: '/profile',
  component: (resolve) => {
    require(['../view/Profile.vue'], resolve)
  }
}, {
  path: '/users',
  component: (resolve) => {
    require(['../view/UserList.vue'], resolve)
  }
}, {
  path: '/things',
  component: (resolve) => {
    require(['../view/ThingList.vue'], resolve)
  }
}]
