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
const roleC = [
  {
    name: 'itemH',
    path: '8',
    component: () => import('./components/pageH')
  },
  {
    name: 'itemI',
    path: '9',
    component: () => import('./components/pageI')
  }
]
const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'index',
      path: '/',
      redirect: '/login',
      component: () => import('./components/indexPage')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('./components/indexPage')
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
    },
    {
      name: 'roleC',
      path: '/roleC',
      redirect: `/roleC/${roleC[0].path}`,
      component: () => import('./components/adminPage'),
      children: roleC
    }
  ]
})

router.beforeEach((to, from, next) => {
  const arr = to.path.match(/\W(\w+)/g)
  if (!roleMenu[arr[0].slice(1)]) {
    return next()
  }
  if (!roleMenu[arr[0].slice(1)].find(e => e.route === arr[1]) || arr[0].slice(1) !== localStorage.getItem('projectRole')) {
    return router.push('/login')
  }
  next()
})
export default router
