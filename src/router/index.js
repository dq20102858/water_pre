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
    path: '/sitemanage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/sitemanage',
        name: 'sitemanage',
        component: () => import('@/views/SiteManage/index')
      },
      {
        path: '/sitemanage/main',
        name: 'sitemanage-main',
        component: () => import('@/views/SiteManage/main')
      },
      {
        path: '/sitemanage/statisticswater',
        name: 'sitemanage-statisticswater',
        component: () => import('@/views/SiteManage/statisticsWater')
      }, {
        path: '/sitemanage/statisticsenergy',
        name: 'sitemanage-statisticsenergy',
        component: () => import('@/views/SiteManage/statisticsEnergy')
      }
      , {
        path: '/sitemanage/statisticswaterquality',
        name: 'sitemanage-statisticswaterquality',
        component: () => import('@/views/SiteManage/statisticsWaterQuality')
      }
    ]
  }, {
    path: '/devicemanage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/devicemanage',
        name: 'devicemanage',
        component: () => import('@/views/DeviceManage/index')
      },
      {
        path: '/devicemanage/detail',
        name: 'devicemanage-detail',
        component: () => import('@/views/DeviceManage/detail')
      }
    ]
  }, {
    path: '/sttendancemanage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/attendancemanage',
        name: 'attendancemanage',
        component: () => import('@/views/AttendanceManage/index')
      }
    ]
  }, {
    path: '/dispatchmanage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/dispatchmanage',
        name: 'dispatchmanage',
        component: () => import('@/views/DispatchManage/index')
      }
    ]
  }, {
    path: '/warningmanage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/warningmanage',
        name: 'warningmanage',
        component: () => import('@/views/WarningManage/index')
      }
    ]
  }, {
    path: '/recordmanage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/recordmanage',
        name: 'recordmanage',
        component: () => import('@/views/RecordManage/index')
      },
      {
        path: '/recordmanage/operation',
        name: 'recordmanage-operation',
        component: () => import('@/views/RecordManage/operation')
      },
      {
        path: '/recordmanage/samplinglist',
        name: 'recordmanage-samplinglist',
        component: () => import('@/views/RecordManage/samplinglist')
      }
    ]
  }, {
    path: '/setmanage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/setmanage',
        name: 'setmanage',
        component: () => import('@/views/setmanage/index')
      },
      {
        path: '/setmanage/site',
        name: 'setmanage-site',
        component: () => import('@/views/setmanage/site')
      },
      {
        path: '/setmanage/warning',
        name: 'setmanage-warning',
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
