import Vue from 'vue'
import Router from 'vue-router'
import * as roleMenu from './utils/roleMenu'

Vue.use(Router)
const admin = [
  {
    name: 'itemA',
    path: '1',
    component: () => import('./components/pageA')
  },
  {
    name: 'itemB',
    path: '2',
    component: () => import('./components/pageB')
  },
  {
    name: 'itemC',
    path: '3',
    component: () => import('./components/pageC')
  }
]
const roleA = [
  {
    name: 'itemD',
    path: '4',
    component: () => import('./components/pageD')
  },
  {
    name: 'itemE',
    path: '5',
    component: () => import('./components/pageE')
  }
]
const roleB = [
  {
    name: 'itemF',
    path: '6',
    component: () => import('./components/pageF')
  },
  {
    name: 'itemG',
    path: '7',
    component: () => import('./components/pageG')
  }
]
const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'index',
      path: '/',
      redirect: '/login',
      component: () => import('./components/loginPage')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('./components/loginPage')
    },
    {
      name: 'admin',
      path: '/admin',
      redirect: `/admin/${admin[0].path}`,
      component: () => import('./components/adminPage'),
      children: admin
    },
    {
      name: 'roleA',
      path: '/roleA',
      redirect: `/roleA/${roleA[0].path}`,
      component: () => import('./components/adminPage'),
      children: roleA
    },
    {
      name: 'roleB',
      path: '/roleB',
      redirect: `/roleB/${roleB[0].path}`,
      component: () => import('./components/adminPage'),
      children: roleB
    }
  ]
})

router.beforeEach((to, from, next) => {
  const arr = to.path.match(/(?<=\W)(\w+)/g)
  if (!roleMenu[arr[0]]) {
    return next()
  }
  const role = roleMenu[arr[0]].find(e => e.route.slice(1) === arr[1])
  const lsValue = sessionStorage.getItem('routerList') && JSON.parse(sessionStorage.getItem('routerList'))[0].value
  if (!role || arr[0] !== lsValue) {
    alert('router：请重试！')
    return router.push('/login')
  }
  next()
})
export default router
