webpackJsonp([14],{

/***/ "+g8z":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "IcnI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/_vue@2.5.10@vue/dist/vue.esm.js
var vue_esm = __webpack_require__("E7jK");

// EXTERNAL MODULE: ./node_modules/_vuex@3.0.1@vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("9rMa");

// EXTERNAL MODULE: ./node_modules/_js-cookie@2.2.0@js-cookie/src/js.cookie.js
var js_cookie = __webpack_require__("uAC3");
var js_cookie_default = /*#__PURE__*/__webpack_require__.n(js_cookie);

// CONCATENATED MODULE: ./src/store/modules/app.js


var app = {
  state: {
    sidebar: {
      opened: !+js_cookie_default.a.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    language: js_cookie_default.a.get('language') || 'en'
  },
  mutations: {
    TOGGLE_SIDEBAR: function TOGGLE_SIDEBAR(state) {
      if (state.sidebar.opened) {
        js_cookie_default.a.set('sidebarStatus', 1);
      } else {
        js_cookie_default.a.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    },
    CLOSE_SIDEBAR: function CLOSE_SIDEBAR(state, withoutAnimation) {
      js_cookie_default.a.set('sidebarStatus', 1);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: function TOGGLE_DEVICE(state, device) {
      state.device = device;
    },
    SET_LANGUAGE: function SET_LANGUAGE(state, language) {
      state.language = language;
      js_cookie_default.a.set('language', language);
    }
  },
  actions: {
    toggleSideBar: function toggleSideBar(_ref) {
      var commit = _ref.commit;

      commit('TOGGLE_SIDEBAR');
    },
    closeSideBar: function closeSideBar(_ref2, _ref3) {
      var commit = _ref2.commit;
      var withoutAnimation = _ref3.withoutAnimation;

      commit('CLOSE_SIDEBAR', withoutAnimation);
    },
    toggleDevice: function toggleDevice(_ref4, device) {
      var commit = _ref4.commit;

      commit('TOGGLE_DEVICE', device);
    },
    setLanguage: function setLanguage(_ref5, language) {
      var commit = _ref5.commit;

      commit('SET_LANGUAGE', language);
    }
  }
};

/* harmony default export */ var modules_app = (app);
// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/promise.js
var promise = __webpack_require__("rVsN");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// EXTERNAL MODULE: ./src/router/index.js + 10 modules
var router = __webpack_require__("YaEn");

// CONCATENATED MODULE: ./src/store/modules/permission.js


/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(function (role) {
      return route.meta.roles.indexOf(role) >= 0;
    });
  } else {
    return true;
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
  var res = [];
  routes.forEach(function (route) {
    var tmp = {
      path: route.moduleUrl,
      component: map[route.moduleActionName],
      hidden: route.moduleHide === 1,
      meta: { title: route.moduleTitle, icon: route.moduleIcon }
    };
    if (route.children && route.children.length > 0) {
      tmp.children = route.children;
      tmp.children = mapAsyncRouter(map, tmp.children);
    }
    if (route.pid !== 0) {
      tmp.name = route.moduleName;
      tmp.meta.noCache = route.noCache === 0 ? false : true;
    }
    if (route.moduleUrl === '') {
      tmp.redirect = 'SiteManage';
    }
    res.push(tmp);
  });
  return res;
}

var permission = {
  state: {
    routers: router["b" /* constantRouterMap */],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: function SET_ROUTERS(state, routers) {
      state.addRouters = routers;
      state.routers = router["b" /* constantRouterMap */].concat(routers);
    }
  },
  actions: {
    GenerateRoutes: function GenerateRoutes(_ref, data) {
      var commit = _ref.commit;

      return new promise_default.a(function (resolve) {
        var access = data.access;

        var map = router["a" /* asyncRouterMap */];
        var accessedRouters = mapAsyncRouter(map, access);
        accessedRouters.push({ path: '*', redirect: '/404', hidden: true });
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    }
  }
};

/* harmony default export */ var modules_permission = (permission);
// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("IHPB");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/get-iterator.js
var get_iterator = __webpack_require__("HzJ8");
var get_iterator_default = /*#__PURE__*/__webpack_require__.n(get_iterator);

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__("KH7x");
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__("aA9S");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// CONCATENATED MODULE: ./src/store/modules/tagsView.js





var tagsView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    ADD_VISITED_VIEW: function ADD_VISITED_VIEW(state, view) {
      if (state.visitedViews.some(function (v) {
        return v.path === view.path;
      })) return;
      state.visitedViews.push(assign_default()({}, view, {
        title: view.meta.title || 'no-name'
      }));
    },
    ADD_CACHED_VIEW: function ADD_CACHED_VIEW(state, view) {
      if (state.cachedViews.includes(view.name)) return;
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name);
      }
    },

    DEL_VISITED_VIEW: function DEL_VISITED_VIEW(state, view) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = get_iterator_default()(state.visitedViews.entries()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = slicedToArray_default()(_ref, 2);

          var i = _ref2[0];
          var v = _ref2[1];

          if (v.path === view.path) {
            state.visitedViews.splice(i, 1);
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    },
    DEL_CACHED_VIEW: function DEL_CACHED_VIEW(state, view) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = get_iterator_default()(state.cachedViews), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var i = _step2.value;

          if (i === view.name) {
            var index = state.cachedViews.indexOf(i);
            state.cachedViews.splice(index, 1);
            break;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    },

    DEL_OTHERS_VISITED_VIEWS: function DEL_OTHERS_VISITED_VIEWS(state, view) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = get_iterator_default()(state.visitedViews.entries()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _ref3 = _step3.value;

          var _ref4 = slicedToArray_default()(_ref3, 2);

          var i = _ref4[0];
          var v = _ref4[1];

          if (v.path === view.path) {
            state.visitedViews = state.visitedViews.slice(i, i + 1);
            break;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    },
    DEL_OTHERS_CACHED_VIEWS: function DEL_OTHERS_CACHED_VIEWS(state, view) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = get_iterator_default()(state.cachedViews), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var i = _step4.value;

          if (i === view.name) {
            var index = state.cachedViews.indexOf(i);
            state.cachedViews = state.cachedViews.slice(index, index + 1);
            break;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    },

    DEL_ALL_VISITED_VIEWS: function DEL_ALL_VISITED_VIEWS(state) {
      state.visitedViews = [];
    },
    DEL_ALL_CACHED_VIEWS: function DEL_ALL_CACHED_VIEWS(state) {
      state.cachedViews = [];
    },

    UPDATE_VISITED_VIEW: function UPDATE_VISITED_VIEW(state, view) {
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = get_iterator_default()(state.visitedViews), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var v = _step5.value;

          if (v.path === view.path) {
            v = assign_default()(v, view);
            break;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }

  },
  actions: {
    addView: function addView(_ref5, view) {
      var dispatch = _ref5.dispatch;

      dispatch('addVisitedView', view);
      dispatch('addCachedView', view);
    },
    addVisitedView: function addVisitedView(_ref6, view) {
      var commit = _ref6.commit;

      commit('ADD_VISITED_VIEW', view);
    },
    addCachedView: function addCachedView(_ref7, view) {
      var commit = _ref7.commit;

      commit('ADD_CACHED_VIEW', view);
    },
    delView: function delView(_ref8, view) {
      var dispatch = _ref8.dispatch,
          state = _ref8.state;

      return new promise_default.a(function (resolve) {
        dispatch('delVisitedView', view);
        dispatch('delCachedView', view);
        resolve({
          visitedViews: [].concat(toConsumableArray_default()(state.visitedViews)),
          cachedViews: [].concat(toConsumableArray_default()(state.cachedViews))
        });
      });
    },
    delVisitedView: function delVisitedView(_ref9, view) {
      var commit = _ref9.commit,
          state = _ref9.state;

      return new promise_default.a(function (resolve) {
        commit('DEL_VISITED_VIEW', view);
        resolve([].concat(toConsumableArray_default()(state.visitedViews)));
      });
    },
    delCachedView: function delCachedView(_ref10, view) {
      var commit = _ref10.commit,
          state = _ref10.state;

      return new promise_default.a(function (resolve) {
        commit('DEL_CACHED_VIEW', view);
        resolve([].concat(toConsumableArray_default()(state.cachedViews)));
      });
    },
    delOthersViews: function delOthersViews(_ref11, view) {
      var dispatch = _ref11.dispatch,
          state = _ref11.state;

      return new promise_default.a(function (resolve) {
        dispatch('delOthersVisitedViews', view);
        dispatch('delOthersCachedViews', view);
        resolve({
          visitedViews: [].concat(toConsumableArray_default()(state.visitedViews)),
          cachedViews: [].concat(toConsumableArray_default()(state.cachedViews))
        });
      });
    },
    delOthersVisitedViews: function delOthersVisitedViews(_ref12, view) {
      var commit = _ref12.commit,
          state = _ref12.state;

      return new promise_default.a(function (resolve) {
        commit('DEL_OTHERS_VISITED_VIEWS', view);
        resolve([].concat(toConsumableArray_default()(state.visitedViews)));
      });
    },
    delOthersCachedViews: function delOthersCachedViews(_ref13, view) {
      var commit = _ref13.commit,
          state = _ref13.state;

      return new promise_default.a(function (resolve) {
        commit('DEL_OTHERS_CACHED_VIEWS', view);
        resolve([].concat(toConsumableArray_default()(state.cachedViews)));
      });
    },
    delAllViews: function delAllViews(_ref14, view) {
      var dispatch = _ref14.dispatch,
          state = _ref14.state;

      return new promise_default.a(function (resolve) {
        dispatch('delAllVisitedViews', view);
        dispatch('delAllCachedViews', view);
        resolve({
          visitedViews: [].concat(toConsumableArray_default()(state.visitedViews)),
          cachedViews: [].concat(toConsumableArray_default()(state.cachedViews))
        });
      });
    },
    delAllVisitedViews: function delAllVisitedViews(_ref15) {
      var commit = _ref15.commit,
          state = _ref15.state;

      return new promise_default.a(function (resolve) {
        commit('DEL_ALL_VISITED_VIEWS');
        resolve([].concat(toConsumableArray_default()(state.visitedViews)));
      });
    },
    delAllCachedViews: function delAllCachedViews(_ref16) {
      var commit = _ref16.commit,
          state = _ref16.state;

      return new promise_default.a(function (resolve) {
        commit('DEL_ALL_CACHED_VIEWS');
        resolve([].concat(toConsumableArray_default()(state.cachedViews)));
      });
    },
    updateVisitedView: function updateVisitedView(_ref17, view) {
      var commit = _ref17.commit;

      commit('UPDATE_VISITED_VIEW', view);
    }
  }
};

/* harmony default export */ var modules_tagsView = (tagsView);
// EXTERNAL MODULE: ./src/api/login/login.js + 1 modules
var login = __webpack_require__("owW+");

// EXTERNAL MODULE: ./src/utils/auth.js
var auth = __webpack_require__("TIfe");

// CONCATENATED MODULE: ./src/store/modules/user.js




var user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: Object(auth["b" /* getToken */])(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    sys_role: '',
    setting: {
      articlePlatform: []
    },
    system: Object(auth["a" /* getSystem */])() || 1
  },

  mutations: {
    SET_CODE: function SET_CODE(state, code) {
      state.code = code;
    },
    SET_TOKEN: function SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_INTRODUCTION: function SET_INTRODUCTION(state, introduction) {
      state.introduction = introduction;
    },
    SET_SETTING: function SET_SETTING(state, setting) {
      state.setting = setting;
    },
    SET_STATUS: function SET_STATUS(state, status) {
      state.status = status;
    },
    SET_NAME: function SET_NAME(state, name) {
      state.name = name;
    },
    SET_AVATAR: function SET_AVATAR(state, avatar) {
      state.avatar = avatar;
    },
    SET_ROLES: function SET_ROLES(state, roles) {
      state.roles = roles;
    },
    SET_SYS_ROLE: function SET_SYS_ROLE(state, sys_role) {
      state.sys_role = sys_role;
    },
    SET_SYSTEMS: function SET_SYSTEMS(state, system) {
      state.system = system;
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername: function LoginByUsername(_ref, userInfo) {
      var commit = _ref.commit;

      var username = userInfo.username.trim();
      return new promise_default.a(function (resolve, reject) {
        Object(login["b" /* loginByUsername */])(username, userInfo.password).then(function (response) {
          if (response.data.status) {
            var data = response.data.data;
            commit('SET_TOKEN', data.token);
            Object(auth["e" /* setToken */])(data.token);
            Object(auth["d" /* setSystem */])(1);
            resolve();
          } else {
            reject(error);
          }
        }).catch(function (error) {
          reject(error);
        });
      });
    },


    // 获取用户信息
    GetUserInfo: function GetUserInfo(_ref2) {
      var commit = _ref2.commit,
          state = _ref2.state;

      return new promise_default.a(function (resolve, reject) {
        Object(login["a" /* getUserInfo */])({ token: state.token, systemId: state.system }).then(function (response) {
          if (!response.data) {
            // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error');
          }
          var data = response.data;
          if (data.roles && data.roles.length > 0) {
            // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles);
          } else {
            reject('getInfo: roles must be a non-null array !');
          }
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_INTRODUCTION', data.introduction);
          commit('SET_SYS_ROLE', data.sys_role);
          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
      });
    },


    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut: function LogOut(_ref3) {
      var commit = _ref3.commit,
          state = _ref3.state;

      return new promise_default.a(function (resolve, reject) {
        Object(login["c" /* logout */])(state.token).then(function () {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          Object(auth["c" /* removeToken */])();
          resolve();
        }).catch(function (error) {
          reject(error);
        });
      });
    },


    // 前端 登出
    FedLogOut: function FedLogOut(_ref4) {
      var commit = _ref4.commit;

      return new promise_default.a(function (resolve) {
        commit('SET_TOKEN', '');
        Object(auth["c" /* removeToken */])();
        resolve();
      });
    },


    // 动态修改权限
    ChangeRoles: function ChangeRoles(_ref5, role) {
      var commit = _ref5.commit;

      return new promise_default.a(function (resolve) {
        commit('SET_TOKEN', role);
        Object(auth["e" /* setToken */])(role);
        Object(login["a" /* getUserInfo */])(role).then(function (response) {
          var data = response.data;
          commit('SET_ROLES', data.roles);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_INTRODUCTION', data.introduction);
          commit('SET_SYS_ROLE', data.sys_role);
          resolve();
        });
      });
    },

    //切换系统动态改变权限
    ChangeSystem: function ChangeSystem(_ref6, system) {
      var commit = _ref6.commit,
          dispatch = _ref6.dispatch,
          state = _ref6.state;

      return new promise_default.a(function (resolve) {
        commit('SET_SYSTEMS', system);
        Object(auth["d" /* setSystem */])(system);
        Object(login["a" /* getUserInfo */])({ token: state.token, systemId: state.system }).then(function (response) {
          var data = response.data;
          commit('SET_ROLES', data.roles);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_INTRODUCTION', data.introduction);
          commit('SET_SYS_ROLE', data.sys_role);
          dispatch('GenerateRoutes', data); // 动态修改权限后 重绘侧边菜单
          resolve();
        });
      });
    }
  }
};

/* harmony default export */ var modules_user = (user);
// CONCATENATED MODULE: ./src/store/getters.js
var getters = {
  sidebar: function sidebar(state) {
    return state.app.sidebar;
  },
  language: function language(state) {
    return state.app.language;
  },
  device: function device(state) {
    return state.app.device;
  },
  visitedViews: function visitedViews(state) {
    return state.tagsView.visitedViews;
  },
  cachedViews: function cachedViews(state) {
    return state.tagsView.cachedViews;
  },
  token: function token(state) {
    return state.user.token;
  },
  avatar: function avatar(state) {
    return state.user.avatar;
  },
  name: function name(state) {
    return state.user.name;
  },
  introduction: function introduction(state) {
    return state.user.introduction;
  },
  status: function status(state) {
    return state.user.status;
  },
  roles: function roles(state) {
    return state.user.roles;
  },
  sys_role: function sys_role(state) {
    return state.user.sys_role;
  },
  system: function system(state) {
    return state.user.system;
  },
  setting: function setting(state) {
    return state.user.setting;
  },
  permission_routers: function permission_routers(state) {
    return state.permission.routers;
  },
  addRouters: function addRouters(state) {
    return state.permission.addRouters;
  }
};
/* harmony default export */ var store_getters = (getters);
// CONCATENATED MODULE: ./src/store/index.js








vue_esm["default"].use(vuex_esm["a" /* default */]);

var store = new vuex_esm["a" /* default */].Store({
  modules: {
    app: modules_app,
    permission: modules_permission,
    tagsView: modules_tagsView,
    user: modules_user
  },
  getters: store_getters
});

/* harmony default export */ var src_store = __webpack_exports__["a"] = (store);

/***/ }),

/***/ "Iu5b":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABYElEQVRYhc2X7XGDMAyGGYERGIENYDPYIGwQNikbhA3CBrDB0x8WV9dgkG1a8t75Lkcs6ZWtL2eZAkABPIA3UB7sq2XPAyg0ujWGn/zGC8h39ubyn41nEhGgZB8z0ACVrEa+7cF7YloSSUg1XqcSAOoUAt0FBNpY4777j8FxHGCivZTfFSaNrkYDVJZzhU2g/wODZ+ht7+9CcVWgxaLLMKUzBgswyFoidbzXgBgDBTepBbSBOkbW7MDUca0X3rwOILHg9hOl8KKoHxpHtk6gK7uDgsCg0FN/JAHNFcwKAr62bKN1hXKl4FY43AnEVm4fvTvJnKHZMd4E6ngBZQZMgYIrZuBLlvb0XEwfUYrvbUZyf/e1YyFgDyQ14XVdgxbJf9yBxJNS/zeSHZC4bygVAveO5UIiCanGfXGwIEHFT9D62nD80wyTHW6Kjvgfp+5k1XPhK7nDlO2z5/kke1WGvwEHYNxzJQIC6gAAAABJRU5ErkJggg=="

/***/ }),

/***/ "KItN":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "Kdyy":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "NHnr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var filters_namespaceObject = {};
__webpack_require__.d(filters_namespaceObject, "formatDate", function() { return formatDate; });
__webpack_require__.d(filters_namespaceObject, "formatGetDate", function() { return formatGetDate; });
__webpack_require__.d(filters_namespaceObject, "formatDateTamp", function() { return formatDateTamp; });

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/object/keys.js
var keys = __webpack_require__("ZLEe");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/_babel-polyfill@6.26.0@babel-polyfill/lib/index.js
var lib = __webpack_require__("briU");
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./node_modules/_vue@2.5.10@vue/dist/vue.esm.js
var vue_esm = __webpack_require__("E7jK");

// EXTERNAL MODULE: ./node_modules/_normalize.css@7.0.0@normalize.css/normalize.css
var normalize = __webpack_require__("OBsF");
var normalize_default = /*#__PURE__*/__webpack_require__.n(normalize);

// EXTERNAL MODULE: ./node_modules/_element-ui@2.13.2@element-ui/lib/element-ui.common.js
var element_ui_common = __webpack_require__("bQIR");
var element_ui_common_default = /*#__PURE__*/__webpack_require__.n(element_ui_common);

// EXTERNAL MODULE: ./node_modules/_element-ui@2.13.2@element-ui/lib/theme-chalk/index.css
var theme_chalk = __webpack_require__("gFLX");
var theme_chalk_default = /*#__PURE__*/__webpack_require__.n(theme_chalk);

// EXTERNAL MODULE: ./src/assets/css/index.scss
var css = __webpack_require__("+g8z");
var css_default = /*#__PURE__*/__webpack_require__.n(css);

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.2@babel-loader/lib!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=script&index=0!./src/App.vue
//
//
//
//
//

/* harmony default export */ var App = ({
  data: function data() {
    return {
      showLoading: false,
      reload: true
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.globalEvBus.$on("showLoading", function () {
      _this.showLoading = true;
    });
    this.globalEvBus.$on("hideLoading", function () {
      _this.showLoading = false;
    });
    this.globalEvBus.$on("reload", function () {
      _this.reload = false;
      _this.$nextTick(function () {
        _this.reload = true;
      });
    });
  }
});
// CONCATENATED MODULE: ./node_modules/_vue-loader@13.5.0@vue-loader/lib/template-compiler?{"id":"data-v-2a1c7b58","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=template&index=0!./src/App.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"loading",rawName:"v-loading.fullscreen",value:(_vm.showLoading),expression:"showLoading",modifiers:{"fullscreen":true}}],attrs:{"id":"app","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.01)"}},[(_vm.reload)?_c('router-view'):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_src_App = (esExports);
// CONCATENATED MODULE: ./src/App.vue
function injectStyle (ssrContext) {
  __webpack_require__("Qagy")
}
var normalizeComponent = __webpack_require__("/Xao")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  App,
  selectortype_template_index_0_src_App,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_App = (Component.exports);

// EXTERNAL MODULE: ./src/router/index.js + 10 modules
var router = __webpack_require__("YaEn");

// EXTERNAL MODULE: ./src/store/index.js + 5 modules
var store = __webpack_require__("IcnI");

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("4YfN");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/_nprogress@0.2.0@nprogress/nprogress.js
var nprogress = __webpack_require__("E4C3");
var nprogress_default = /*#__PURE__*/__webpack_require__.n(nprogress);

// EXTERNAL MODULE: ./node_modules/_nprogress@0.2.0@nprogress/nprogress.css
var _nprogress_0_2_0_nprogress_nprogress = __webpack_require__("ve9D");
var _nprogress_0_2_0_nprogress_nprogress_default = /*#__PURE__*/__webpack_require__.n(_nprogress_0_2_0_nprogress_nprogress);

// EXTERNAL MODULE: ./src/utils/auth.js
var auth = __webpack_require__("TIfe");

// CONCATENATED MODULE: ./src/permission.js




 // progress bar
 // progress bar style
 // getToken from cookie

nprogress_default.a.configure({ showSpinner: false }); // NProgress Configuration

// permissiom judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
  if (!permissionRoles) return true;
  return roles.some(function (role) {
    return permissionRoles.indexOf(role) >= 0;
  });
}

var whiteList = ['/login', '/authredirect']; // no redirect whitelist

router["c" /* default */].beforeEach(function (to, from, next) {
  nprogress_default.a.start(); // start progress bar
  if (Object(auth["b" /* getToken */])()) {
    // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' });
      nprogress_default.a.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store["a" /* default */].getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store["a" /* default */].dispatch('GetUserInfo').then(function (res) {
          // 拉取user_info
          var access = res.data.access; // note: roles must be a array! such as: ['editor','develop']
          var roles = res.data.roles; // note: roles must be a array! such as: ['editor','develop']
          store["a" /* default */].dispatch('GenerateRoutes', { access: access, roles: roles }).then(function () {
            // 根据roles权限生成可访问的路由表
            router["c" /* default */].addRoutes(store["a" /* default */].getters.addRouters); // 动态添加可访问路由表
            next(extends_default()({}, to, { replace: true })); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          });
          // const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
          // store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
          //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          // })
        }).catch(function (err) {
          store["a" /* default */].dispatch('FedLogOut').then(function () {
            element_ui_common["Message"].error(err || 'Verification failed, please login again');
            next({ path: '/' });
          });
        });
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store["a" /* default */].getters.roles, to.meta.roles)) {
          next(); //
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true } });
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
      nprogress_default.a.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});
router["c" /* default */].afterEach(function () {
  nprogress_default.a.done(); // finish progress bar
});
// CONCATENATED MODULE: ./src/filters/index.js
//格式化时间
function formatDate(val) {
  if (typeof val === 'string') {
    val = val.replace(/-/g, '/');
  }
  var date = new Date(val);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  var day = date.getDate();
  day = day < 10 ? "0" + day : day;
  return year + "年" + month + "月" + day + "日";
}
//格式化时间
function formatGetDate(val) {
  if (typeof val === 'string') {
    val = val.replace(/-/g, '/');
  }
  var date = new Date(val);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  var day = date.getDate();
  day = day < 10 ? "0" + day : day;
  return year + "-" + month + "-" + day;
}
//格式化时间戳
function formatDateTamp(time, type) {
  var timestamp = time;
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return type == 'date' ? Y + M + D : Y + M + D + h + m + s;
}
// CONCATENATED MODULE: ./src/authorityCode.js
var authorityCode = {
    zizhu: 1,
    kaidian: 2
};

/* harmony default export */ var src_authorityCode = (authorityCode);
// EXTERNAL MODULE: ./node_modules/_echarts@3.8.5@echarts/index.js
var _echarts_3_8_5_echarts = __webpack_require__("7VF+");
var _echarts_3_8_5_echarts_default = /*#__PURE__*/__webpack_require__.n(_echarts_3_8_5_echarts);

// EXTERNAL MODULE: ./node_modules/_vue-print-nb@1.5.0@vue-print-nb/lib/tag-textarea.umd.min.js
var tag_textarea_umd_min = __webpack_require__("eOLL");
var tag_textarea_umd_min_default = /*#__PURE__*/__webpack_require__.n(tag_textarea_umd_min);

// EXTERNAL MODULE: ./node_modules/_video.js@7.8.4@video.js/dist/video.es.js + 4 modules
var video_es = __webpack_require__("sSx7");

// EXTERNAL MODULE: ./node_modules/_video.js@7.8.4@video.js/dist/video-js.css
var video_js = __webpack_require__("Kdyy");
var video_js_default = /*#__PURE__*/__webpack_require__.n(video_js);

// EXTERNAL MODULE: ./node_modules/_vue-layer@1.2.0@vue-layer/lib/vue-layer.umd.min.js
var vue_layer_umd_min = __webpack_require__("zV+/");
var vue_layer_umd_min_default = /*#__PURE__*/__webpack_require__.n(vue_layer_umd_min);

// EXTERNAL MODULE: ./node_modules/_vue-layer@1.2.0@vue-layer/lib/vue-layer.css
var vue_layer = __webpack_require__("Qm6t");
var vue_layer_default = /*#__PURE__*/__webpack_require__.n(vue_layer);

// EXTERNAL MODULE: ./node_modules/_vue-baidu-map@0.21.22@vue-baidu-map/index.js
var _vue_baidu_map_0_21_22_vue_baidu_map = __webpack_require__("Ginn");
var _vue_baidu_map_0_21_22_vue_baidu_map_default = /*#__PURE__*/__webpack_require__.n(_vue_baidu_map_0_21_22_vue_baidu_map);

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/object/define-properties.js
var define_properties = __webpack_require__("8zml");
var define_properties_default = /*#__PURE__*/__webpack_require__.n(define_properties);

// CONCATENATED MODULE: ./src/utils/eventBus.js

var events = {};
var globalEvBus = {
  install: function install(Vue) {
    Vue.globalEvBus = createEvBus();
    define_properties_default()(Vue.prototype, {
      globalEvBus: {
        get: function get() {
          return createEvBus();
        }
      }
    });
  }
};
function createEvBus() {
  return {
    $on: function $on(type, callBack) {
      if (events[type]) {
        events[type].push(callBack);
        return;
      }
      events[type] = [callBack];
    },
    $onece: function $onece(type, callBack) {
      callBack.isOnce = true;
      this.on(type, callBack);
    },
    $emit: function $emit(type) {
      if (events[type]) {
        events[type].forEach(function (callBack, idx) {
          if (callBack.isOnce) {
            callBack();
            events[type].splice(idx, 1);
            return;
          }
          callBack();
        });
      }
    },
    $remove: function $remove(type, callBack) {
      if (!callBack) {
        events[type] = [];
        return;
      }
      for (var i = 0; i < events[type].length; i++) {
        if (events[type][i] === callBack) {
          events[type].splice(i, 1);
        }
      }
    }
  };
}
/* harmony default export */ var eventBus = (globalEvBus);
// CONCATENATED MODULE: ./src/main.js



 // A modern alternative to CSS resets


 // global css



 // permission control
 // global filters


// import 'default-passive-events'
// import echarts from 'echarts'

vue_esm["default"].prototype.$echarts = _echarts_3_8_5_echarts_default.a;

// import BaiduMap

 //调用浏览器打印插件
vue_esm["default"].use(tag_textarea_umd_min_default.a);

// import Video
 //浏览器视频插件

vue_esm["default"].prototype.$video = video_es["a" /* default */];

// import layer;


vue_esm["default"].prototype.$layer = vue_layer_umd_min_default()(vue_esm["default"]);
// 
vue_esm["default"].use(element_ui_common_default.a, {
  size: 'medium'
});
//

vue_esm["default"].use(_vue_baidu_map_0_21_22_vue_baidu_map_default.a, {
  ak: 'GsTerPPU46fUXlt09K8840K0HxTvKIIa'
});
//

vue_esm["default"].use(eventBus);
// Vue.use(VueQuillEditor)
// register global utility filters.
keys_default()(filters_namespaceObject).forEach(function (key) {
  vue_esm["default"].filter(key, filters_namespaceObject[key]);
});

vue_esm["default"].config.productionTip = false;

new vue_esm["default"]({
  el: '#app',
  router: router["c" /* default */],
  store: store["a" /* default */],
  template: '<App/>',
  components: { App: src_App }
});

/***/ }),

/***/ "OBsF":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Qagy":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Qm6t":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "TIfe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getToken;
/* harmony export (immutable) */ __webpack_exports__["e"] = setToken;
/* harmony export (immutable) */ __webpack_exports__["c"] = removeToken;
/* unused harmony export setId */
/* unused harmony export getId */
/* unused harmony export setType */
/* unused harmony export getType */
/* unused harmony export setUserId */
/* unused harmony export getUserId */
/* unused harmony export removeUserId */
/* unused harmony export setCustomId */
/* unused harmony export getCustomId */
/* unused harmony export setFreeId */
/* unused harmony export getFreeId */
/* unused harmony export setRentalId */
/* unused harmony export getRentalId */
/* unused harmony export setCodeId */
/* unused harmony export getCodeId */
/* harmony export (immutable) */ __webpack_exports__["d"] = setSystem;
/* harmony export (immutable) */ __webpack_exports__["a"] = getSystem;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_js_cookie__ = __webpack_require__("uAC3");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_js_cookie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_js_cookie__);

var TokenKey = 'Admin-Token';
var ID = 'ID';
var ModuleType = 'ModuleType';
var UserId = 'UserId';
var CustomId = 'CustomId';
var FreeId = 'FreeId';
var RentalId = 'RentalId';
var QuestionId = 'QuestionId';
var CodeId = 'CodeId';
var System = 'System';
function getToken() {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.get(TokenKey);
}
function setToken(token) {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set(TokenKey, token);
}
function removeToken() {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.remove(TokenKey);
}
function setId(id) {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set(ID, id);
}
function getId() {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.get(ID);
}
function setType(type) {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set(ModuleType, type);
}
function getType() {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.get(ModuleType);
}
function setUserId(id) {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set(UserId, id);
}
function getUserId() {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.get(UserId);
}
function removeUserId() {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.remove(UserId);
}
function setCustomId(customId) {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set(CustomId, customId);
}
function getCustomId() {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.get(CustomId);
}
function setFreeId(freeId) {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set(FreeId, freeId);
}
function getFreeId() {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.get(FreeId);
}
function setRentalId(rentalId) {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set(RentalId, rentalId);
}
function getRentalId() {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.get(RentalId);
}
function setCodeId(codeId) {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set(CodeId, codeId);
}

function getCodeId() {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.get(CodeId);
}

function setSystem(system) {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set(System, system);
}
function getSystem() {
  return __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.get(System);
}

/***/ }),

/***/ "YaEn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/_vue@2.5.10@vue/dist/vue.esm.js
var vue_esm = __webpack_require__("E7jK");

// EXTERNAL MODULE: ./node_modules/_vue-router@3.0.1@vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__("zO6J");

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("4YfN");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/_vuex@3.0.1@vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("9rMa");

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.2@babel-loader/lib!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=script&index=0!./src/views/layout/components/PageNavbar.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var PageNavbar = ({
  name: "PageNavbar",
  data: function data() {
    return {
      activeIndex: "1",
      levelList: null,
      isShow: false
    };
  },

  components: {},
  computed: extends_default()({}, Object(vuex_esm["b" /* mapGetters */])(["sidebar", "name", "avatar", "roles", "sys_role", "system"])),
  watch: {
    $route: function $route() {
      this.getBreadcrumb();
    }
  },
  created: function created() {
    // this.getBreadcrumb();
  },

  methods: {
    // getBreadcrumb() {
    //   let matched = this.$route.matched;
    //   this.levelList = matched;

    //   this.request({
    //     url: "/apply/getApplyLogs",
    //     method: "get"
    //   }).then(response => {
    //     let data = response.data;
    //     if (data.status == 1) {
    //       if (data.data.length > 0) {
    //         this.isShow = true;
    //       }
    //     }
    //   });
    // },
    // toggleSideBar() {
    //   this.$store.dispatch("toggleSideBar");
    // },
    logout: function logout() {
      this.$store.dispatch("LogOut").then(function () {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
    handleCommand: function handleCommand(system) {
      this.$store.dispatch("ChangeSystem", system).then(function () {
        location.href = "/";
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/_vue-loader@13.5.0@vue-loader/lib/template-compiler?{"id":"data-v-3b1d3614","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=template&index=0!./src/views/layout/components/PageNavbar.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"net-navbar",attrs:{"mode":"horizontal"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"SiteManage","mode":"horizontal"}},[_c('li',{staticClass:"logos"},[_c('img',{attrs:{"src":__webpack_require__("KItN")}}),_vm._v("某公司智能污水系统\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"/sitemanage"}},[_c('img',{staticClass:"iconss",attrs:{"src":__webpack_require__("nZu5")}}),_vm._v("站点分布")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"/devicemanage"}},[_c('img',{staticClass:"iconss",attrs:{"src":__webpack_require__("nZu5")}}),_vm._v("设备状态")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"/operationmanage"}},[_c('img',{staticClass:"iconss",attrs:{"src":__webpack_require__("nZu5")}}),_vm._v("运维记录")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"/dispatchmanage"}},[_c('img',{staticClass:"iconss",attrs:{"src":__webpack_require__("nZu5")}}),_vm._v("运维派单")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"/warningmanage"}},[_c('img',{staticClass:"iconss",attrs:{"src":__webpack_require__("nZu5")}}),_vm._v("告警列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"id":"setmanage","index":"/setmanage"}},[_c('img',{staticClass:"iconss",attrs:{"src":__webpack_require__("Iu5b")}}),_vm._v("设置")])],1)],1),_vm._v(" "),_c('div',{staticClass:"right-menu",staticStyle:{"display":"none"}},[(_vm.sys_role==1)?_c('span',[_c('router-link',{directives:[{name:"show",rawName:"v-show",value:(_vm.isShow),expression:"isShow"}],staticClass:"applylink",attrs:{"to":"weekplanapply"}},[_c('i',{staticClass:"el-icon-message"})])],1):_vm._e(),_vm._v(" "),_c('el-dropdown',{staticClass:"avatar-container right-menu-item",attrs:{"trigger":"click"}},[_c('div',{staticClass:"avatar-wrapper"},[_c('span',{staticStyle:{"font-size":"12px"}},[_vm._v("欢迎您，"+_vm._s(_vm.name))]),_vm._v(" "),_c('i',{staticClass:"el-icon-caret-bottom"})]),_vm._v(" "),_c('el-dropdown-menu',{attrs:{"slot":"dropdown"},slot:"dropdown"},[_c('el-dropdown-item',[_c('span',{staticStyle:{"display":"block"},on:{"click":_vm.logout}},[_vm._v("退出登录")])])],1)],1)],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_PageNavbar = (esExports);
// CONCATENATED MODULE: ./src/views/layout/components/PageNavbar.vue
function injectStyle (ssrContext) {
  __webpack_require__("bKo8")
}
var normalizeComponent = __webpack_require__("/Xao")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  PageNavbar,
  components_PageNavbar,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var layout_components_PageNavbar = (Component.exports);

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.2@babel-loader/lib!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=script&index=0!./src/views/layout/components/PageMain.vue
//
//
//
//
//
//
//
//
//

/* harmony default export */ var PageMain = ({
    provide: function provide() {
        return {
            reload: this.reload
        };
    },
    data: function data() {
        return {
            isRouterAlive: true
        };
    },

    computed: {
        cachedViews: function cachedViews() {
            return this.$store.state.tagsView.cachedViews;
        },
        key: function key() {
            return this.$route.fullPath;
        }
    },
    methods: {
        reload: function reload() {
            var _this = this;

            this.isRouterAlive = false;
            this.$nextTick(function () {
                _this.isRouterAlive = true;
            });
        }
    }
});
// CONCATENATED MODULE: ./node_modules/_vue-loader@13.5.0@vue-loader/lib/template-compiler?{"id":"data-v-add45faa","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=template&index=0!./src/views/layout/components/PageMain.vue
var PageMain_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[_c('transition',{attrs:{"name":"fade","mode":"out-in"}},[(_vm.isRouterAlive)?_c('keep-alive',{attrs:{"include":_vm.cachedViews}},[_c('router-view',{key:_vm.key})],1):_vm._e()],1)],1)}
var PageMain_staticRenderFns = []
var PageMain_esExports = { render: PageMain_render, staticRenderFns: PageMain_staticRenderFns }
/* harmony default export */ var components_PageMain = (PageMain_esExports);
// CONCATENATED MODULE: ./src/views/layout/components/PageMain.vue
var PageMain_normalizeComponent = __webpack_require__("/Xao")
/* script */

/* template */

/* template functional */
var PageMain___vue_template_functional__ = false
/* styles */
var PageMain___vue_styles__ = null
/* scopeId */
var PageMain___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var PageMain___vue_module_identifier__ = null
var PageMain_Component = PageMain_normalizeComponent(
  PageMain,
  components_PageMain,
  PageMain___vue_template_functional__,
  PageMain___vue_styles__,
  PageMain___vue_scopeId__,
  PageMain___vue_module_identifier__
)

/* harmony default export */ var layout_components_PageMain = (PageMain_Component.exports);

// CONCATENATED MODULE: ./src/views/layout/components/index.js


// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.2@babel-loader/lib!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=script&index=0!./src/views/layout/Layout.vue
//
//
//
//
//
//


// import ResizeMixin from "./mixin/ResizeHandler";
/* harmony default export */ var Layout = ({
  data: function data() {
    return {
      msg: 0
    };
  },

  components: {
    PageNavbar: layout_components_PageNavbar,
    PageMain: layout_components_PageMain
  },
  // mixins: [ResizeMixin],
  computed: {
    sidebar: function sidebar() {
      console.log(this.$store.state.app);
      return this.$store.state.app.sidebar;
    },
    device: function device() {
      return this.$store.state.app.device;
    },
    classObj: function classObj() {
      return {
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {}
});
// CONCATENATED MODULE: ./node_modules/_vue-loader@13.5.0@vue-loader/lib/template-compiler?{"id":"data-v-8dfb2ee0","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=template&index=0!./src/views/layout/Layout.vue
var Layout_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-wrapper",class:_vm.classObj},[_c('page-navbar',{attrs:{"msg":_vm.msg}}),_vm._v(" "),_c('page-main')],1)}
var Layout_staticRenderFns = []
var Layout_esExports = { render: Layout_render, staticRenderFns: Layout_staticRenderFns }
/* harmony default export */ var layout_Layout = (Layout_esExports);
// CONCATENATED MODULE: ./src/views/layout/Layout.vue
var Layout_normalizeComponent = __webpack_require__("/Xao")
/* script */

/* template */

/* template functional */
var Layout___vue_template_functional__ = false
/* styles */
var Layout___vue_styles__ = null
/* scopeId */
var Layout___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Layout___vue_module_identifier__ = null
var Layout_Component = Layout_normalizeComponent(
  Layout,
  layout_Layout,
  Layout___vue_template_functional__,
  Layout___vue_styles__,
  Layout___vue_scopeId__,
  Layout___vue_module_identifier__
)

/* harmony default export */ var views_layout_Layout = (Layout_Component.exports);

// CONCATENATED MODULE: ./src/router/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return constantRouterMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return asyncRouterMap; });




vue_esm["default"].use(vue_router_esm["a" /* default */]);

var constantRouterMap = [{
  path: '/login',
  component: function component() {
    return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, "T+/8"));
  },
  hidden: true
}, {
  path: '/authredirect',
  component: function component() {
    return __webpack_require__.e/* import() */(12).then(__webpack_require__.bind(null, "+abo"));
  },
  hidden: true
}, {
  path: '/404',
  component: function component() {
    return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, "fe7i"));
  },
  hidden: true
}, {
  path: '/401',
  component: function component() {
    return __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, "97xN"));
  },
  hidden: true
}, {
  path: '/SiteManage',
  component: views_layout_Layout,
  hidden: true,
  children: [{
    path: '/SiteManage',
    component: function component() {
      return __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, "vzEL"));
    }
  }]
}, {
  path: '/DeviceManage',
  component: views_layout_Layout,
  hidden: true,
  children: [{
    path: '/DeviceManage',
    component: function component() {
      return __webpack_require__.e/* import() */(7).then(__webpack_require__.bind(null, "wpiT"));
    }
  }]
}, {
  path: '/OperationManage',
  component: views_layout_Layout,
  hidden: true,
  children: [{
    path: '/OperationManage',
    component: function component() {
      return __webpack_require__.e/* import() */(9).then(__webpack_require__.bind(null, "2DO2"));
    }
  }]
}, {
  path: '/DispatchManage',
  component: views_layout_Layout,
  hidden: true,
  children: [{
    path: '/DispatchManage',
    component: function component() {
      return __webpack_require__.e/* import() */(5).then(__webpack_require__.bind(null, "70iE"));
    }
  }]
}, {
  path: '/WarningManage',
  component: views_layout_Layout,
  hidden: true,
  children: [{
    path: '/WarningManage',
    component: function component() {
      return __webpack_require__.e/* import() */(4).then(__webpack_require__.bind(null, "XiKT"));
    }
  }]
}, {
  path: '/setmanage',
  component: views_layout_Layout,
  hidden: true,
  children: [{
    path: '/setmanage',
    component: function component() {
      return __webpack_require__.e/* import() */(10).then(__webpack_require__.bind(null, "ZLKJ"));
    }
  }, {
    path: '/setmanage/users',
    component: function component() {
      return __webpack_require__.e/* import() */(6).then(__webpack_require__.bind(null, "1RuJ"));
    }
  }, {
    path: '/setmanage/site',
    component: function component() {
      return __webpack_require__.e/* import() */(8).then(__webpack_require__.bind(null, "2WB+"));
    }
  }, {
    path: '/setmanage/warning',
    component: function component() {
      return __webpack_require__.e/* import() */(11).then(__webpack_require__.bind(null, "st75"));
    }
  }]
}];


/* harmony default export */ var router = __webpack_exports__["c"] = (new vue_router_esm["a" /* default */]({
  scrollBehavior: function scrollBehavior() {
    return { y: 0 };
  },
  routes: constantRouterMap
}));

//路由组件注册
var asyncRouterMap = {};

/***/ }),

/***/ "bKo8":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "gFLX":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "nZu5":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACOklEQVRYR82XjU3DMBCFmwmACegGwASECSgTECYAJqBMAExAOwEwAWUDNqBMQJkgvCfZKDT2/ThFqiUrVWOfv3s+3znVaMtatWU8oyKgtm0P4cgpeo3O37vBsRWe7+gL9Leqqvh0NRcQQM5hfYo+Nq6y5HiAzY3jbQoFRR6DGlbb3XEEOwMY1RObqhBgGlggzNDG7bwG1EwyJAJtEKbLcCFBZYEAU8PK61BZMvNPcgEvAX04gtfLzZg6AhS38U9LAkGdKUbdGFb5xJhn9GiYx3+Cvm+YewsgrmMC0tT5hhUe5/vUwnDoCv/fKVArzN9TgWCMHj4pxii3eISNMchUQIV/W2/LYIheXwpASakzSmlb/wAgqikCLfD2OAcEA2ruinPhHGPqS3CO5aXWgFqPAWVrR4ByOZjaMgnoBR4xxsztv4F6EmtkmwDi6TnILJQ8qhIUgFwhkNqyGRbgNSPXxFrUnWTIR3OEQKMFNQdI1Z1ZmbVIy0O8uLEWxstbysGecymFaGCJviOoRCgmNZ6gXgtJkclVgmG2H6/Xs1wt07YtQhCImTaqRVWoMJ9a620XJ+SALCppC0rvk+pkgfjCWNNKoXo1LBrSboxaXSsBEmuhWpcMxdYDpRZmFShsHwN16EXflL9MQJ2Y4umT0kFKLQZws37vyclqBgpQPM486lYowtRaEu3CuYCcUG4Y8dhLkRq+ZCWlimCKgRSlimEGAWWgBsEMBupAxS+HiSeAU2HhDmpPFiwZu3VAP9qP6yXvcyxnAAAAAElFTkSuQmCC"

/***/ }),

/***/ "owW+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("4YfN");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/object/define-properties.js
var define_properties = __webpack_require__("8zml");
var define_properties_default = /*#__PURE__*/__webpack_require__.n(define_properties);

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/promise.js
var promise = __webpack_require__("rVsN");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// EXTERNAL MODULE: ./node_modules/_vue@2.5.10@vue/dist/vue.esm.js
var vue_esm = __webpack_require__("E7jK");

// EXTERNAL MODULE: ./node_modules/_axios@0.19.2@axios/index.js
var _axios_0_19_2_axios = __webpack_require__("I29D");
var _axios_0_19_2_axios_default = /*#__PURE__*/__webpack_require__.n(_axios_0_19_2_axios);

// EXTERNAL MODULE: ./node_modules/_element-ui@2.13.2@element-ui/lib/element-ui.common.js
var element_ui_common = __webpack_require__("bQIR");
var element_ui_common_default = /*#__PURE__*/__webpack_require__.n(element_ui_common);

// EXTERNAL MODULE: ./src/store/index.js + 5 modules
var store = __webpack_require__("IcnI");

// CONCATENATED MODULE: ./src/utils/request.js






var host = window.location.host;
// host = 'http://' + host
host =  true ? 'http://' + host : 'http://129.211.168.161:10003/';
// host = process.env.NODE_ENV == 'production' ? 'http://' + host : 'http://subway.nething.com/'
var service = _axios_0_19_2_axios_default.a.create({
  baseURL: host, // api的base_url
  withCredentials: true,
  timeout: 100000 // request timeout
});
// 请求前进行统一处理
service.interceptors.request.use(function (config) {
  vue_esm["default"].globalEvBus.$emit('showLoading');
  return config;
}, function (error) {
  // 对请求错误做些什么
  return promise_default.a.reject(error);
});

// 请求后进行统一处理
service.interceptors.response.use(function (response) {
  vue_esm["default"].globalEvBus.$emit('hideLoading');
  if (response.data.status == 0 && response.data.msg == '校验失败，请重新登录') {
    store["a" /* default */].dispatch('FedLogOut').then(function () {
      location.reload(); // 为了重新实例化vue-router对象 避免bug
    });
  } else {
    if (response.data.status == 0 && response.data.msg != '') {
      Object(element_ui_common["Message"])({
        message: response.data.msg,
        type: 'error',
        duration: 3 * 1000
      });
    }
    return response;
  }
}, function (error) {
  vue_esm["default"].globalEvBus.$emit('hideLoading');
  Object(element_ui_common["Message"])({
    message: '请求超时，请重试！',
    type: 'error',
    duration: 3 * 1000
  });
  return promise_default.a.reject(error);
});
define_properties_default()(vue_esm["default"].prototype, {
  hostURL: {
    get: function get() {
      return host;
    }
  },
  request: {
    get: function get() {
      return service;
    }
  }
});
/* harmony default export */ var request = (service);
// CONCATENATED MODULE: ./src/api/login/login.js
/* harmony export (immutable) */ __webpack_exports__["b"] = loginByUsername;
/* harmony export (immutable) */ __webpack_exports__["c"] = logout;
/* harmony export (immutable) */ __webpack_exports__["a"] = getUserInfo;



function loginByUsername(username, password) {
  var data = {
    username: username,
    password: password
  };
  return request({
    url: '/login/login',
    method: 'post',
    data: data
  });
}

function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  });
}

function getUserInfo(data) {
  return request({
    url: '/login/userInfo',
    method: 'get',
    params: extends_default()({}, data)
  });
}

/***/ }),

/***/ "ve9D":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},["NHnr"]);