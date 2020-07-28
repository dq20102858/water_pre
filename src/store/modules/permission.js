import { constantRouterMap, asyncRouterMap } from '@/router/index'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }
function mapAsyncRouter(map, routes) {
  const res = []
  routes.forEach(route => {
    const tmp = {
      path: route.moduleUrl,
      component: map[route.moduleActionName],
      hidden: route.moduleHide === 1,
      meta: { title: route.moduleTitle, icon: route.moduleIcon }
    }
    if (route.children && route.children.length > 0) {
      tmp.children = route.children
      tmp.children = mapAsyncRouter(map, tmp.children)
    }
    if (route.pid !== 0) {
      tmp.name = route.moduleName
      tmp.meta.noCache = route.noCache===0?false:true;
    }
    if (route.moduleUrl === '') {
      tmp.redirect = 'SiteManage'
    }
    res.push(tmp)
  })
  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { access } = data
        const map = asyncRouterMap
        // const accessedRouters = mapAsyncRouter(map, access)
        const accessedRouters = asyncRouterMap
        accessedRouters.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
