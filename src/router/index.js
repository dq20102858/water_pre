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
  },
  {
    path: '/set',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/set',
        component: () => import('@/views/set/index')
      },
      {
        path: '/speed',
        component: () => import('@/views/set/speed')
      },
      {
        path: '/alert',
        component: () => import('@/views/set/alert')
      },
      {
        path: '/bridge',
        component: () => import('@/views/set/bridge')
      }
      , {
        path: '/tunnel',
        component: () => import('@/views/set/tunnel')
      }
      ,
      {
        path: '/slope',
        component: () => import('@/views/set/slope')
      }
    ]
  },
  {
    path: '/search',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/search',
        component: () => import('@/views/search/index')
      },
      {
        path: '/overspeed',
        component: () => import('@/views/search/overspeed')
      }
    ]
  }
  ,
  {
    path: '/admin',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/admin',
        component: () => import('@/views/admin/index')
      },
      {
        path: '/departlist',
        component: () => import('@/views/admin/departlist')
      }  ,
      {
        path: '/postlist',
        component: () => import('@/views/admin/postlist')
      }
      ,
      {
        path: '/userlist',
        component: () => import('@/views/admin/userlist')
      } ,
      {
        path: '/demo',
        component: () => import('@/views/admin/demo')
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
export const asyncRouterMap = {

  '/views/layout/Layout': () => import('@/views/layout/Layout'),
  '/views/dashboard/index': () => import('@/views/dashboard'),//视频监控
  '/views/admin/index': () => import('@/views/admin/index'),//人员管理
  '/views/project/index': () => import('@/views/project/index'),//工程进度
  '/views/monitor/index': () => import('@/views/monitor/index'),//行车监控
  '/views/run_monitor/index': () => import('@/views/run_monitor/index'),//列车运行监控
  '/views/location/index': () => import('@/views/location/index'),//定位管理
  '/views/real_time/index': () => import('@/views/real_time/index'),//实时管理
  '/views/progress/index': () => import('@/views/progress/index'),//进度形象图
  '/views/security/index': () => import('@/views/security/index'),//安全管理
  '/views/dispatch/index': () => import('@/views/dispatch/index'),//调度命令
  '/views/apply/index': () => import('@/views/apply/index'),//施工请点
  '/views/plan/index': () => import('@/views/plan/index'),//施工计划
  '/views/search/index': () => import('@/views/search/index'),//查询统计
  '/views/description/index': () => import('@/views/description/index'),//项目介绍
  '/views/set/index': () => import('@/views/set/index'),//设置
  '/views/back/index': () => import('@/views/back/index'),//返回

  '/views/apply/daychart': () => import('@/views/apply/daychart'),//日班图表
  '/views/apply/conflictcheck': () => import('@/views/apply/conflictcheck'),//冲突检测
  '/views/apply/weekplan': () => import('@/views/apply/weekplan'),//周计划

  '/views/location/walldetector': () => import('@/views/location/walldetector'),//墙壁探测器
  '/views/location/cardetector': () => import('@/views/location/cardetector'),//车载探测器
  '/views/location/locationbind': () => import('@/views/location/locationbind'),//定位从设备
  '/views/location/device': () => import('@/views/location/device'),//机具



}
