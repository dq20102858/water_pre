webpackJsonp([6],{

/***/ "9bBU":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("mClu");
var $Object = __webpack_require__("FeBl").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "C4MV":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("9bBU"), __esModule: true };

/***/ }),

/***/ "QHYt":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.dialog-user .el-textarea {\r\n  width: 100% !important;\n}\n.dialog-user .el-textarea__inner {\r\n  height: 80px;\n}\n.dialog-user .el-form-item__label {\r\n  width: 110px;\n}\n.dialog-user .el-form-item__content {\r\n  margin-left: 110px;\n}\n.dialog-user .el-input--medium {\r\n  width: 100%;\n}\n.dialog-user .el-select {\r\n  width: 100%;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "bOdI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__("C4MV");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),

/***/ "lfKa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("bOdI");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/admin/userlist.vue

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
//
//
//

/* harmony default export */ var userlist = ({
  data: function data() {
    var _ref;

    return _ref = {
      userList: [],
      userPage_size: 20,
      userPage_cur: 1,
      userPage_items: 0
    }, defineProperty_default()(_ref, "userPage_size", 20), defineProperty_default()(_ref, "userPage_cur", 1), defineProperty_default()(_ref, "userPage_items", 0), defineProperty_default()(_ref, "userPage_total", 0), defineProperty_default()(_ref, "userDialogVisible", false), defineProperty_default()(_ref, "userDialogTitle", ""), defineProperty_default()(_ref, "userData", {}), defineProperty_default()(_ref, "userSearch", {}), defineProperty_default()(_ref, "userAddRules", {
      name: [{
        required: true,
        message: "请输入姓名2~30个字符",
        trigger: "blur"
      }, { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }],
      user_name: [{
        required: true,
        message: "请输入用户名2~30个字符",
        trigger: "blur"
      }, { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }],
      company_id: [{
        required: true,
        message: "请选择公司",
        trigger: "change"
      }],
      password: [{
        required: true,
        message: "请输入密码2~30个字符",
        trigger: "blur"
      }, { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }],
      passwordEdit: [{
        min: 2,
        max: 30,
        message: "请输入密码在2到30个字符",
        trigger: "blur"
      }],
      depart_id: [{
        required: true,
        message: "请选择部门",
        trigger: "change"
      }],
      post_id: [{
        required: true,
        message: "请选择职位",
        trigger: "change"
      }],
      dispatch: [{
        required: true,
        message: "请选择调度信息",
        trigger: "change"
      }]
    }), defineProperty_default()(_ref, "passwordOrg", ""), defineProperty_default()(_ref, "companySelectList", []), defineProperty_default()(_ref, "departSelectList", []), defineProperty_default()(_ref, "postSelectList", []), _ref;
  },
  created: function created() {
    this.getCompanyLists();
    this.getUserLists();
  },

  methods: {
    getUserLists: function getUserLists() {
      var _this = this;

      var page = this.userPage_cur;
      var user_name = this.userSearch.user_name;
      var company_id = this.userSearch.company_id;
      var depart_id = this.userSearch.depart_id;
      var post_id = this.userSearch.post_id;
      this.request({
        url: "/user/getUserPage",
        method: "get",
        params: { page: page, user_name: user_name, company_id: company_id, depart_id: depart_id, post_id: post_id }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this.userList = data.data.data;
          _this.userPage_cur = parseInt(data.data.current_page);
          _this.userPage_items = data.data.total;
          _this.userPage_size = data.data.per_page;
          _this.puserPage_total = data.data.last_page;
        }
      });
    },
    userChangePage: function userChangePage(value) {
      this.userPage_cur = value;
      this.getUserLists();
    },
    userFirstPage: function userFirstPage() {
      this.userPage_cur = 1;
      this.getUserLists();
    },
    userLastPage: function userLastPage() {
      this.userPage_cur = this.userPage_total;
      this.getUserLists();
    },
    userSearchPage: function userSearchPage() {
      this.userPage_cur = 1;
      this.getUserLists();
    },
    resetSerach: function resetSerach() {
      this.userSearch = {};
      this.getUserLists();
    },
    openAddUser: function openAddUser() {
      this.userData = {};
      this.userDialogVisible = true;
      this.userDialogTitle = "添加人员信息";
    },
    addUser: function addUser() {
      var _this2 = this;

      this.$refs["userRulesForm"].validate(function (valid) {
        if (valid) {
          var data = _this2.userData;
          var url = "/user/addUser";
          var baseid = _this2.userData.id;
          console.log("this.userData.id：" + _this2.userData.id);
          debugger;
          if (typeof baseid != "undefined") {
            url = "/user/editUser";
            var pwdEdit = _this2.userData.passwordEdit;
            if (pwdEdit != "" && typeof pwdEdit != "undefined") {
              _this2.userData.password = pwdEdit;
            } else {
              _this2.userData.password = _this2.passwordOrg;
            }
          }
          _this2.request({
            url: url,
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this2.userDialogVisible = false;
              _this2.userData.passwordEdit = "";
              _this2.$message({
                type: "success",
                message: "保存成功！"
              });
              _this2.getUserLists();
            }
          });
        }
      });
    },
    detailUser: function detailUser(id) {
      var _this3 = this;

      this.userDialogTitle = "修改人员信息";
      this.userDialogVisible = true;
      this.request({
        url: "/user/getUserDetial",
        method: "get",
        params: { id: id }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this3.userData = data.data;

          _this3.passwordOrg = data.data.password;
          _this3.getDepartListEdit(data.data.company_id); //部门
          _this3.getPostListEdit(data.data.depart_id); //职位
        }
      });
    },
    delUser: function delUser(id) {
      var _this4 = this;

      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this4.request({
          url: "/user/deleteUser",
          method: "post",
          data: { id: id }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            _this4.$message({
              type: "success",
              message: "删除成功！"
            });
            _this4.getUserLists();
          }
        });
      }).catch(function () {});
    },

    //公司 部门 职位
    getCompanyLists: function getCompanyLists() {
      var _this5 = this;

      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: 0, type: 1 }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this5.companySelectList = data.data;
        }
      });
    },
    getDepartLists: function getDepartLists(val) {
      var _this6 = this;

      this.$set(this.userData, "depart_id", "");
      this.$set(this.userData, "post_id", "");
      this.$set(this.userSearch, "depart_id", "");
      this.$set(this.userSearch, "post_id", "");
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: val, type: 2 }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this6.departSelectList = data.data;
        }
      });
    },
    getPostLists: function getPostLists(val) {
      var _this7 = this;

      this.$set(this.userData, "post_id", "");
      this.$set(this.userSearch, "post_id", "");
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: val, type: 3 }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this7.postSelectList = data.data;
        }
      });
    },
    getDepartListEdit: function getDepartListEdit(val) {
      var _this8 = this;

      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: val, type: 2 }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this8.departSelectList = data.data;
        }
      });
    },
    getPostListEdit: function getPostListEdit(val) {
      var _this9 = this;

      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: val, type: 3 }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this9.postSelectList = data.data;
        }
      });
    }
  }
  //
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-77da901b","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/admin/userlist.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"admins"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"userlist","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("xX+s")}}),_vm._v("人员管理\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"admin"}},[_vm._v("公司列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"departlist"}},[_vm._v("部门列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"postlist"}},[_vm._v("职位列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"userlist"}},[_vm._v("人员列表")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.openAddUser}},[_vm._v("添加人员")])],1),_vm._v(" "),_c('el-form-item',[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"请输入姓名"},model:{value:(_vm.userSearch.user_name),callback:function ($$v) {_vm.$set(_vm.userSearch, "user_name", $$v)},expression:"userSearch.user_name"}})],1),_vm._v(" "),_c('el-form-item',[_c('el-select',{attrs:{"placeholder":"请选择公司"},on:{"change":function($event){_vm.getDepartLists($event)}},model:{value:(_vm.userSearch.company_id),callback:function ($$v) {_vm.$set(_vm.userSearch, "company_id", $$v)},expression:"userSearch.company_id"}},_vm._l((this.companySelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',[_c('el-select',{attrs:{"placeholder":"请选择部门"},on:{"change":function($event){_vm.getPostLists($event)}},model:{value:(_vm.userSearch.depart_id),callback:function ($$v) {_vm.$set(_vm.userSearch, "depart_id", $$v)},expression:"userSearch.depart_id"}},_vm._l((this.departSelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',[_c('el-select',{attrs:{"placeholder":"请选择职位"},model:{value:(_vm.userSearch.post_id),callback:function ($$v) {_vm.$set(_vm.userSearch, "post_id", $$v)},expression:"userSearch.post_id"}},_vm._l((this.postSelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-so"},[_c('label',{staticClass:"el-form-item__label"}),_vm._v(" "),_c('el-button',{attrs:{"size":"small","icon":"el-icon-search","type":"primary"},on:{"click":_vm.getUserLists}},[_vm._v("查询")]),_vm._v(" "),_c('el-button',{attrs:{"size":"small","plain":""},on:{"click":_vm.resetSerach}},[_vm._v("重置")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.userList}},[_c('el-table-column',{attrs:{"type":"index","label":"序号","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"user_name","label":"用户名","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"姓名","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"depart","label":"部门","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"post","label":"职位","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"邮箱","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"update_time","label":"电话","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"dispatch_desc","label":"调度信息","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"120"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.detailUser(scope.row.id)}}},[_vm._v("修改")]),_vm._v(" "),_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.delUser(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.userList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":_vm.userPage_size,"current-page":this.userPage_cur,"total":this.userPage_items,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.userChangePage}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.userFirstPage}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.userLastPage}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-user",attrs:{"width":"700px","title":this.userDialogTitle,"close-on-click-modal":false,"visible":_vm.userDialogVisible},on:{"update:visible":function($event){_vm.userDialogVisible=$event}}},[_c('el-form',{ref:"userRulesForm",staticClass:"el-form-custom",attrs:{"model":_vm.userData,"rules":_vm.userAddRules}},[(this.userDialogTitle=='添加人员信息')?_c('el-form-item',{attrs:{"label":"用户名：","prop":"user_name"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.user_name),callback:function ($$v) {_vm.$set(_vm.userData, "user_name", $$v)},expression:"userData.user_name"}})],1):_vm._e(),_vm._v(" "),(this.userDialogTitle=='添加人员信息')?_c('el-form-item',{attrs:{"label":"密码：","prop":"password"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.password),callback:function ($$v) {_vm.$set(_vm.userData, "password", $$v)},expression:"userData.password"}})],1):_vm._e(),_vm._v(" "),(this.userDialogTitle=='修改人员信息')?_c('el-form-item',{attrs:{"label":"密码：","prop":"passwordEdit"}},[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"不修改密码请留空"},model:{value:(_vm.userData.passwordEdit),callback:function ($$v) {_vm.$set(_vm.userData, "passwordEdit", $$v)},expression:"userData.passwordEdit"}})],1):_vm._e(),_vm._v(" "),_c('el-form-item',{attrs:{"label":"姓名：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.name),callback:function ($$v) {_vm.$set(_vm.userData, "name", $$v)},expression:"userData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"公司名称：","prop":"company_id"}},[_c('el-select',{on:{"change":function($event){_vm.getDepartLists($event)}},model:{value:(_vm.userData.company_id),callback:function ($$v) {_vm.$set(_vm.userData, "company_id", $$v)},expression:"userData.company_id"}},_vm._l((this.companySelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门名称：","prop":"depart_id"}},[_c('el-select',{on:{"change":function($event){_vm.getPostLists($event)}},model:{value:(_vm.userData.depart_id),callback:function ($$v) {_vm.$set(_vm.userData, "depart_id", $$v)},expression:"userData.depart_id"}},_vm._l((this.departSelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"职位名称：","prop":"post_id"}},[_c('el-select',{model:{value:(_vm.userData.post_id),callback:function ($$v) {_vm.$set(_vm.userData, "post_id", $$v)},expression:"userData.post_id"}},_vm._l((this.postSelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"邮箱："}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.email),callback:function ($$v) {_vm.$set(_vm.userData, "email", $$v)},expression:"userData.email"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"调度信息：","prop":"dispatch"}},[_c('el-select',{model:{value:(_vm.userData.dispatch),callback:function ($$v) {_vm.$set(_vm.userData, "dispatch", $$v)},expression:"userData.dispatch"}},[_c('el-option',{attrs:{"label":"普通","value":1}}),_vm._v(" "),_c('el-option',{attrs:{"label":"司机","value":2}}),_vm._v(" "),_c('el-option',{attrs:{"label":"车长","value":3}}),_vm._v(" "),_c('el-option',{attrs:{"label":"值班调度","value":4}}),_vm._v(" "),_c('el-option',{attrs:{"label":"车站值班员","value":5}}),_vm._v(" "),_c('el-option',{attrs:{"label":"施工队长","value":6}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"手机号码："}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.phone),callback:function ($$v) {_vm.$set(_vm.userData, "phone", $$v)},expression:"userData.phone"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.userDialogVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.addUser}},[_vm._v("确 定")])],1)],1)],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var admin_userlist = (esExports);
// CONCATENATED MODULE: ./src/views/admin/userlist.vue
function injectStyle (ssrContext) {
  __webpack_require__("ufL+")
}
var normalizeComponent = __webpack_require__("VU/8")
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
  userlist,
  admin_userlist,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_admin_userlist = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "mClu":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("kM2E");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("+E39"), 'Object', { defineProperty: __webpack_require__("evD5").f });


/***/ }),

/***/ "ufL+":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("QHYt");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("319e18cd", content, true);

/***/ })

});