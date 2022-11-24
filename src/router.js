import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const admin = [
  {
    name: '1',
    path: '1',
    component: () => import('./components/pageA')
  },
  {
    name: '2',
    path: '2',
    component: () => import('./components/pageB')
  },
  {
    name: '3',
    path: '3',
    component: () => import('./components/pageC')
  }
]
const roleA = [
  {
    name: '4',
    path: '4',
    component: () => import('./components/pageD')
  },
  {
    name: '5',
    path: '5',
    component: () => import('./components/pageE')
  }
]
const roleB = [
  {
    name: '6',
    path: '6',
    component: () => import('./components/pageF')
  },
  {
    name: '7',
    path: '7',
    component: () => import('./components/pageG')
  }
]
const roleC = [
  {
    name: '8',
    path: '8',
    component: () => import('./components/pageH')
  },
  {
    name: '9',
    path: '9',
    component: () => import('./components/pageI')
  }
]

const router = new Router({
  mode: 'history',
  routes: [
    {
      name: '',
      path: '/',
      component: () => import('./components/HelloWorld')
    },
    {
      name: 'admin',
      path: '/admin',
      component: () => import('./components/adminPage'),
      children: admin
    },
    {
      name: 'roleA',
      path: '/roleA',
      component: () => import('./components/adminPage'),
      children: roleA
    },
    {
      name: 'roleB',
      path: '/roleB',
      component: () => import('./components/adminPage'),
      children: roleB
    },
    {
      name: 'roleC',
      path: '/roleC',
      component: () => import('./components/adminPage'),
      children: roleC
    }
  ]
})

export default router
