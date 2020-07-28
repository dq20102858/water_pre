import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/ErrorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/ErrorPage/401'),
    hidden: true
  },
  {
    path: '/SiteManage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/SiteManage',
        component: () => import('@/views/SiteManage/index')
      }
    ]
  }, {
    path: '/DeviceManage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/DeviceManage',
        component: () => import('@/views/DeviceManage/index')
      }
    ]
  }, {
    path: '/OperationManage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/OperationManage',
        component: () => import('@/views/OperationManage/index')
      }
    ]
  }, {
    path: '/DispatchManage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/DispatchManage',
        component: () => import('@/views/DispatchManage/index')
      }
    ]
  }, {
    path: '/WarningManage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/WarningManage',
        component: () => import('@/views/WarningManage/index')
      }
    ]
  }, {
    path: '/setmanage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/setmanage',
        component: () => import('@/views/setmanage/index')
      },
      {
        path: '/setmanage/site',
        component: () => import('@/views/setmanage/site')
      },
      {
        path: '/setmanage/warning',
        component: () => import('@/views/setmanage/warning')
      }
    ]
  },
  {
    path: '/demo',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/demo',
        component: () => import('@/views/demo/index')
      },
      {
        path: '/demo/map',
        component: () => import('@/views/demo/map')
      }
    ]
  }
]
export { constantRouterMap }

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

//路由组件注册
export const asyncRouterMap = []
