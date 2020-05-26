webpackJsonp([8],{

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

/***/ "DlCK":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("wOA8");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("451b0f82", content, true);

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
    }, defineProperty_default()(_ref, "userPage_size", 20), defineProperty_default()(_ref, "userPage_cur", 1), defineProperty_default()(_ref, "userPage_items", 0), defineProperty_default()(_ref, "userPage_total", 0), defineProperty_default()(_ref, "userDialogVisible", false), defineProperty_default()(_ref, "userDialogTitle", ""), defineProperty_default()(_ref, "userData", {
      menus: [],
      sys_role: 3
    }), defineProperty_default()(_ref, "uploadAction", this.hostURL + "/upload/uploadFile"), defineProperty_default()(_ref, "UserimageUrl", ""), defineProperty_default()(_ref, "userSearch", {}), defineProperty_default()(_ref, "userAddRules", {
      user_name: [{
        required: true,
        message: "请输入用户名",
        trigger: "blur"
      }, {
        min: 2,
        max: 14,
        message: "请输入用户名长度在2到14个字符",
        trigger: "blur"
      }, {
        pattern: /^[\u4e00-\u9fa5A-Za-z0-9\_]*$/,
        message: "用户名只能是汉字、字母、数字及下划线",
        trigger: "blur"
      }],
      name: [{
        required: true,
        message: "请输入姓名",
        trigger: "blur"
      }, {
        min: 2,
        max: 14,
        message: "请输入姓名长度在2到14个字符",
        trigger: "blur"
      }, {
        pattern: /^[\u4e00-\u9fa5A-Za-z0-9\_]*$/,
        message: "姓名只能是汉字、字母、数字及下划线",
        trigger: "blur"
      }],
      password: [{
        required: true,
        message: "请输入密码",
        trigger: "blur"
      }, {
        min: 6,
        max: 14,
        message: "请输入密码长度6到14个字符",
        trigger: "blur"
      }, {
        pattern: /^[0-9a-zA-Z_]{1,}$/,
        message: "密码只能是数字、字母、下划线",
        trigger: "blur"
      }],
      passwordEdit: [{
        min: 6,
        max: 14,
        message: "请输入密码长度6到14个字符",
        trigger: "blur"
      }, {
        pattern: /^[0-9a-zA-Z_]{1,}$/,
        message: "密码只能是数字、字母、下划线",
        trigger: "blur"
      }],
      company_id: [{
        required: true,
        message: "请选择公司",
        trigger: "change"
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
      }],
      email: [{
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: ["blur", "change"]
      }],
      phone: [{
        pattern: /^1[34578]\d{9}$/,
        message: "请输入正确的手机号码",
        trigger: "blur"
      }],
      sys_role: [{
        required: true,
        message: "请选择用户角色",
        trigger: "change"
      }]
    }), defineProperty_default()(_ref, "passwordOrg", ""), defineProperty_default()(_ref, "companySelectList", []), defineProperty_default()(_ref, "departSelectList", []), defineProperty_default()(_ref, "postSelectList", []), defineProperty_default()(_ref, "userMenuList", []), _ref;
  },
  mounted: function mounted() {
    document.querySelector("#app-menu-items #menu_admin").classList.add("is-active");
  },
  created: function created() {
    this.getCompanyLists();
    this.getLineTypes();
    this.getMenuLists();
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
          _this.userPage_total = data.data.last_page;
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
      this.userSearch = {
        user_name: "",
        company_id: "",
        depart_id: "",
        post_id: ""
      };
      this.departSelectList = [];
      this.postSelectList = [];
      this.userPage_cur = 1;
      this.getUserLists();
    },
    openAddUser: function openAddUser() {
      var _this2 = this;

      this.userData = {
        menus: [],
        sys_role: 3
      };
      this.userDialogVisible = true;
      this.userDialogTitle = "添加人员信息";
      this.$nextTick(function () {
        _this2.$refs["userRulesForm"].clearValidate();
      });
    },
    addUser: function addUser() {
      var _this3 = this;

      this.$refs["userRulesForm"].validate(function (valid) {
        if (valid) {
          var data = _this3.userData;
          // if (this.userData.avatar == null) {
          //   this.userData.avatar = "/static/avatar.jpg";
          // }
          var url = "/user/addUser";
          var baseid = _this3.userData.id;
          console.log("this.userData.id：" + _this3.userData.id);
          if (typeof baseid != "undefined") {
            url = "/user/editUser";

            var pwdEdit = _this3.userData.passwordEdit;
            if (pwdEdit != "" && typeof pwdEdit != "undefined") {
              _this3.userData.password = pwdEdit;
            } else {
              _this3.userData.password = "";
            }
          }
          _this3.request({
            url: url,
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this3.userDialogVisible = false;
              _this3.userData.passwordEdit = "";
              _this3.$message({
                type: "success",
                message: "保存成功！"
              });
              _this3.getUserLists();
            }
          });
        }
      });
    },
    detailUser: function detailUser(id) {
      var _this4 = this;

      this.userDialogTitle = "修改人员信息";
      this.userDialogVisible = true;
      this.$nextTick(function () {
        _this4.$refs["userRulesForm"].clearValidate();
      });
      this.request({
        url: "/user/getUserDetial",
        method: "get",
        params: { id: id }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this4.userData = data.data;
          if (data.data.menus != "") {
            _this4.userData.menus = data.data.menus.split(",");
          } else {
            _this4.userData.menus = [];
          }

          console.log(_this4.userData.menus);
          _this4.passwordOrg = data.data.password;
          _this4.getDepartListEdit(data.data.company_id); //部门
          _this4.getPostListEdit(data.data.depart_id); //职位
        }
      });
    },
    delUser: function delUser(id) {
      var _this5 = this;

      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this5.request({
          url: "/user/deleteUser",
          method: "post",
          data: { id: id }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            _this5.$message({
              type: "success",
              message: "删除成功！"
            });
            _this5.getUserLists();
          }
        });
      }).catch(function () {});
    },

    //公司 部门 职位
    getCompanyLists: function getCompanyLists() {
      var _this6 = this;

      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: 0, type: 1 }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this6.companySelectList = data.data;
        }
      });
    },
    getDepartLists: function getDepartLists(val) {
      var _this7 = this;

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
          _this7.departSelectList = data.data;
        }
      });
    },
    getPostLists: function getPostLists(val) {
      var _this8 = this;

      this.$set(this.userData, "post_id", "");
      this.$set(this.userSearch, "post_id", "");
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: val, type: 3 }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this8.postSelectList = data.data;
        }
      });
    },
    getDepartListEdit: function getDepartListEdit(val) {
      var _this9 = this;

      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: val, type: 2 }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this9.departSelectList = data.data;
        }
      });
    },
    getPostListEdit: function getPostListEdit(val) {
      var _this10 = this;

      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: val, type: 3 }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this10.postSelectList = data.data;
        }
      });
    },
    getLineTypes: function getLineTypes() {
      var _this11 = this;

      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this11.userMenuList1 = data.data;
        }
      });
    },
    getMenuLists: function getMenuLists() {
      var _this12 = this;

      this.request({
        url: "/user/getMenuLists",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this12.userMenuList = data.data;
        }
      });
    },

    //上传图片
    uploadExceed: function uploadExceed() {
      this.$message({
        type: "warning",
        message: "\u6700\u591A\u53EF\u4EE5\u4E0A\u4F205\u5F20\u56FE\u7247"
      });
    },
    uploadSuccess: function uploadSuccess(res, file) {
      console.log("图上传成功", res);
      // this.$set(this.userData, "avatar", "http://129.211.168.161/uploads/home/20200518/df6578d3a9da5e8d5431b22ea04aa37e.png");
      this.$set(this.userData, "avatar", res.data.url);
    },
    uploadBefore: function uploadBefore(file) {
      var filename = file.name.substring(file.name.lastIndexOf(".") + 1);
      var extension = filename === "GIF" || filename === "gif" || filename === "jpeg" || filename === "jpg" || filename === "JPG" || filename === "png" || filename === "PNG";
      var isLtM = file.size / 1024 / 1024 < 2;
      if (!extension) {
        this.$message({
          message: "上传图片只能是 jpg  png  gif 格式",
          type: "error"
        });
        return false; //必须加上return false; 才能阻止
      }
      if (!isLtM) {
        this.$message({
          message: "上传图片大小不能超过 2MB",
          type: "error"
        });
        return false;
      }
      return extension || isLtM;
    }
    //

  }
  //
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-88989d8a","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/admin/userlist.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"admins"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"userlist","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("xX+s")}}),_vm._v("人员管理\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"admin"}},[_vm._v("公司列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"departlist"}},[_vm._v("部门列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"postlist"}},[_vm._v("职位列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"userlist"},on:{"click":_vm.userFirstPage}},[_vm._v("人员列表")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{ref:"userSearch",attrs:{"inline":true}},[_c('el-form-item',{staticClass:"form-add-item"},[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.openAddUser}},[_vm._v("添加人员")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"姓名"}},[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"请输入姓名","maxlength":"30"},model:{value:(_vm.userSearch.user_name),callback:function ($$v) {_vm.$set(_vm.userSearch, "user_name", $$v)},expression:"userSearch.user_name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"公司"}},[_c('el-select',{attrs:{"placeholder":"请选择公司","clearable":""},on:{"change":function($event){_vm.getDepartLists($event)}},model:{value:(_vm.userSearch.company_id),callback:function ($$v) {_vm.$set(_vm.userSearch, "company_id", $$v)},expression:"userSearch.company_id"}},_vm._l((this.companySelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门"}},[_c('el-select',{attrs:{"placeholder":"请选择部门","clearable":""},on:{"change":function($event){_vm.getPostLists($event)}},model:{value:(_vm.userSearch.depart_id),callback:function ($$v) {_vm.$set(_vm.userSearch, "depart_id", $$v)},expression:"userSearch.depart_id"}},_vm._l((this.departSelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"职位"}},[_c('el-select',{attrs:{"placeholder":"请选择职位","clearable":""},model:{value:(_vm.userSearch.post_id),callback:function ($$v) {_vm.$set(_vm.userSearch, "post_id", $$v)},expression:"userSearch.post_id"}},_vm._l((this.postSelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-so"},[_c('label',{staticClass:"el-form-item__label"}),_vm._v(" "),_c('el-button',{attrs:{"size":"small","icon":"el-icon-search","type":"primary"},on:{"click":_vm.getUserLists}},[_vm._v("查询")]),_vm._v(" "),_c('el-button',{attrs:{"size":"small","plain":""},on:{"click":_vm.resetSerach}},[_vm._v("重置")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.userList}},[_c('el-table-column',{attrs:{"type":"index","label":"序号","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"user_name","label":"用户名","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"姓名","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"depart","label":"部门","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"post","label":"职位","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"email","label":"邮箱","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"phone","label":"电话","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"120"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.detailUser(scope.row.id)}}},[_vm._v("修改")]),_vm._v(" "),_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.delUser(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.userList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":_vm.userPage_size,"current-page":this.userPage_cur,"total":this.userPage_items,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.userChangePage}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.userFirstPage}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.userLastPage}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-users",attrs:{"width":"780px","title":this.userDialogTitle,"close-on-click-modal":false,"visible":_vm.userDialogVisible},on:{"update:visible":function($event){_vm.userDialogVisible=$event}}},[_c('el-form',{ref:"userRulesForm",staticClass:"el-form-custom",attrs:{"inline":true,"model":_vm.userData,"rules":_vm.userAddRules}},[_c('div',{staticClass:"el-form-item-inlinessddd"},[(this.userDialogTitle=='添加人员信息')?_c('el-form-item',{staticClass:"newitem",attrs:{"label":"用户名：","prop":"user_name"}},[_c('el-input',{attrs:{"show-word-limit":""},model:{value:(_vm.userData.user_name),callback:function ($$v) {_vm.$set(_vm.userData, "user_name", $$v)},expression:"userData.user_name"}})],1):_vm._e(),_vm._v(" "),_c('el-form-item',{staticClass:"newitem",attrs:{"label":"姓名：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.name),callback:function ($$v) {_vm.$set(_vm.userData, "name", $$v)},expression:"userData.name"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"newitem",attrs:{"label":"公司名称：","prop":"company_id"}},[_c('el-select',{on:{"change":function($event){_vm.getDepartLists($event)}},model:{value:(_vm.userData.company_id),callback:function ($$v) {_vm.$set(_vm.userData, "company_id", $$v)},expression:"userData.company_id"}},_vm._l((this.companySelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),(this.userDialogTitle=='添加人员信息')?_c('el-form-item',{staticClass:"newitem",attrs:{"label":"密码：","prop":"password"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.password),callback:function ($$v) {_vm.$set(_vm.userData, "password", $$v)},expression:"userData.password"}})],1):_vm._e(),_vm._v(" "),(this.userDialogTitle=='修改人员信息')?_c('el-form-item',{staticClass:"newitem",attrs:{"label":"密码：","prop":"passwordEdit"}},[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"不修改密码请留空"},model:{value:(_vm.userData.passwordEdit),callback:function ($$v) {_vm.$set(_vm.userData, "passwordEdit", $$v)},expression:"userData.passwordEdit"}})],1):_vm._e(),_vm._v(" "),_c('el-form-item',{staticClass:"newitem",attrs:{"label":"部门名称：","prop":"depart_id"}},[_c('el-select',{on:{"change":function($event){_vm.getPostLists($event)}},model:{value:(_vm.userData.depart_id),callback:function ($$v) {_vm.$set(_vm.userData, "depart_id", $$v)},expression:"userData.depart_id"}},_vm._l((this.departSelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"newitem",attrs:{"label":"邮箱：","prop":"email"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.email),callback:function ($$v) {_vm.$set(_vm.userData, "email", $$v)},expression:"userData.email"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"newitem",attrs:{"label":"职位名称：","prop":"post_id"}},[_c('el-select',{model:{value:(_vm.userData.post_id),callback:function ($$v) {_vm.$set(_vm.userData, "post_id", $$v)},expression:"userData.post_id"}},_vm._l((this.postSelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"newitem",attrs:{"label":"手机号码：","prop":"phone"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.phone),callback:function ($$v) {_vm.$set(_vm.userData, "phone", $$v)},expression:"userData.phone"}})],1),_vm._v(" "),_c('el-form-item',{staticStyle:{"width":"100%"},attrs:{"label":"头像上传："}},[_c('el-upload',{ref:"uploadfive",staticClass:"avatar-uploader",attrs:{"action":_vm.uploadAction,"auto-upload":true,"on-exceed":_vm.uploadExceed,"before-upload":_vm.uploadBefore,"on-success":_vm.uploadSuccess,"show-file-list":false}},[(_vm.userData.avatar)?_c('img',{staticClass:"avatar",attrs:{"src":_vm.userData.avatar}}):_c('i',{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"用户角色：","prop":"sys_role"}},[_c('el-radio-group',{model:{value:(_vm.userData.sys_role),callback:function ($$v) {_vm.$set(_vm.userData, "sys_role", $$v)},expression:"userData.sys_role"}},[_c('el-radio',{attrs:{"label":3}},[_vm._v("普通用户")]),_vm._v(" "),_c('el-radio',{attrs:{"label":1}},[_vm._v("管理员")]),_vm._v(" "),_c('el-radio',{attrs:{"label":2}},[_vm._v("业主方")])],1)],1),_vm._v(" "),_c('el-form-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.userData.sys_role==3),expression:"userData.sys_role==3"}],staticClass:"checkbox-group",attrs:{"label":"用户职责："}},[_c('el-checkbox-group',{model:{value:(_vm.userData.menus),callback:function ($$v) {_vm.$set(_vm.userData, "menus", $$v)},expression:"userData.menus"}},_vm._l((_vm.userMenuList),function(item){return _c('el-checkbox',{key:item.id,attrs:{"label":item.id+''}},[_vm._v(_vm._s(item.name))])}))],1)],1)]),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.userDialogVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.addUser}},[_vm._v("确 定")])],1)],1)],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var admin_userlist = (esExports);
// CONCATENATED MODULE: ./src/views/admin/userlist.vue
function injectStyle (ssrContext) {
  __webpack_require__("DlCK")
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

/***/ "wOA8":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.dialog-users .el-textarea {\r\n  width: 100% !important;\n}\n.dialog-users .el-form-item__label {\r\n  width: 110px;\n}\n.dialog-users .newitem {\r\n  width: 350px;\n}\n.dialog-users .newitem .el-input--medium {\r\n  width: 240px;\n}\n.dialog-users .el-input--medium {\r\n  width: 100%;\n}\n.dialog-users .el-select {\r\n  width: 185px;\n}\n.dialog-users .el-form-item-block {\r\n  display: block;\n}\n.dialog-users .el-form-item-inliness {\r\n  display: inline-block;\n}\n.dialog-users .el-form-item-inliness .el-form-item {\r\n  display: inline-block;\n}\n.dialog-users .el-form-item-block {\r\n  display: block;\n}\n.dialog-users .el-form-item-inliness .el-checkbox-group {\r\n  margin-left: 110px;\n}\n.dialog-users .checkbox-group .el-form-item__label {\r\n  float: left;\n}\n.dialog-users .checkbox-group .el-form-item__content {\r\n  display: initial !important;\n}\n.dialog-users .checkbox-group .el-checkbox-group {\r\n  margin-left: 110px;\n}\n.avatar-uploader .el-upload {\r\n  border: 1px dashed #d9d9d9;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  position: relative;\r\n  overflow: hidden;\n}\n.avatar-uploader .el-upload:hover {\r\n  border-color: #409eff;\n}\n.avatar-uploader-icon {\r\n  font-size: 28px;\r\n  color: #8c939d;\r\n  width: 178px;\r\n  height: 178px;\r\n  line-height: 178px;\r\n  text-align: center;\n}\n.avatar {\r\n  width: 178px;\r\n  height: 178px;\r\n  display: block;\n}\r\n", ""]);

// exports


/***/ })

});