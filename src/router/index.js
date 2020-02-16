import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout'
Vue.use(Router)

const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
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
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  }
]
export { constantRouterMap }

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

//路由组件注册
export const asyncRouterMap = {

  '/views/layout/Layout': () => import('@/views/layout/Layout'),
  //蜂巢办
  '/views/dashboard/index': () => import('@/views/dashboard'),
  '/views/admin/index': () => import('@/views/admin/index'),
  '/views/project/index': () => import('@/views/project/index'),
  '/views/dispatch/index': () => import('@/views/dispatch/index'),
  '/views/run_monitor/index': () => import('@/views/run_monitor/index'),
  


}
