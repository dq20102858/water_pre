webpackJsonp([9],{

/***/ "NeEs":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.admins .el-dialog {\r\n  width: 500px !important;\n}\n.dialog-company .el-textarea {\r\n  width: 100% !important;\n}\n.dialog-company .el-textarea__inner {\r\n  height: 80px;\n}\n.dialog-company .el-form-item__label {\r\n  width: 110px;\n}\n.dialog-company .el-form-item__content {\r\n  margin-left: 110px;\n}\n.dialog-company .el-input--medium {\r\n  width: 100%;\n}\n.dialog-company .el-select {\r\n  width: 100%;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "iiPG":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("NeEs");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("735c7798", content, true);

/***/ }),

/***/ "x0vE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/admin/index.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var admin = ({
  data: function data() {
    return {
      activeIndex: "1",
      companyLists: [],
      companyPage: 1,
      companyTotal: 0,
      companyPageTotal: 0,
      departLists: [],
      departPage: 1,
      departTotal: 0,
      departPageTotal: 0,
      postLists: [],
      postPage: 1,
      postTotal: 0,
      postPageTotal: 0,
      adminLists: [],
      adminPage: 1,
      adminTotal: 0,
      companyShow: true,
      companyVisible: false,
      companyData: {
        color: "默认"
      },
      companyAddRules: {
        name: [{
          required: true,
          message: "请输入公司名称2~30个字符",
          trigger: "blur"
        }, { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }],
        description: [{ min: 2, max: 500, message: "长度在2到500个字符", trigger: "blur" }]
      },
      departAddRules: {
        pid: [{
          required: true,
          message: "请选择公司",
          trigger: "change"
        }],
        name: [{
          required: true,
          message: "请输入部门名称2~30个字符",
          trigger: "blur"
        }, { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }],
        is_work_team: [{
          required: true,
          message: "请选择施工队",
          trigger: "change"
        }],
        description: [{ min: 2, max: 500, message: "长度在2到500个字符", trigger: "blur" }]
      },
      postAddRules: {
        pid: [{
          required: true,
          message: "请选择公司",
          trigger: "change"
        }],
        sub_pid: [{
          required: true,
          message: "请选择部门",
          trigger: "change"
        }],
        name: [{
          required: true,
          message: "请输入职位名称2~30个字符",
          trigger: "blur"
        }, { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }],
        description: [{ min: 2, max: 500, message: "长度在2到500个字符", trigger: "blur" }]
      },
      userAddRules: {
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
      },
      departShow: false,
      departVisible: false,
      postShow: false,
      postVisible: false,
      usersShow: false,
      usersVisible: false,
      pid: "",
      sub_pid: "",
      post_pid: "",
      companySelectLists: [],
      departSelectLists: [],
      postSelectLists: [],
      userData: {},
      userSearch: {}
    };
  },
  created: function created() {
    this.getPageLists(1);
  },

  methods: {
    handleSelect: function handleSelect(key, keyPath) {
      this.pid = "";
      this.sub_pid = "";
      this.post_pid = "";
      if (key == 1) {
        this.companyShow = true;
        this.departShow = false;
        this.postShow = false;
        this.usersShow = false;
        this.getPageLists(1);
      } else if (key == 2) {
        this.companyShow = false;
        this.departShow = true;
        this.postShow = false;
        this.usersShow = false;
        this.getPageLists(2);
        this.getCompanyLists();
      } else if (key == 3) {
        this.companyShow = false;
        this.departShow = false;
        this.postShow = true;
        this.usersShow = false;
        this.getPageLists(3);
        this.getCompanyLists();
      } else {
        this.companyShow = false;
        this.departShow = false;
        this.postShow = false;
        this.usersShow = true;
        this.getCompanyLists();
        this.getAdminListsPage();
      }
    },
    getPageLists: function getPageLists(type) {
      var _this = this;

      var page = 1;
      if (type == 1) {
        page = this.companyPage;
      } else if (type == 2) {
        page = this.departPage;
      } else {
        page = this.postPage;
      }
      this.request({
        url: "/company/getPageLists",
        method: "get",
        params: { page: page, type: type }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          if (type == 1) {
            _this.companyLists = data.data.data;
            _this.companyPage = parseInt(data.data.current_page);
            _this.companyTotal = parseInt(data.data.total);
            _this.companyPageTotal = parseInt(data.data.last_page);
          } else if (type == 2) {
            _this.departLists = data.data.data;
            _this.departPage = parseInt(data.data.current_page);
            _this.departTotal = parseInt(data.data.total);
            _this.departPageTotal = parseInt(data.data.last_page);
          } else {
            _this.postLists = data.data.data;
            _this.postPage = parseInt(data.data.current_page);
            _this.postTotal = parseInt(data.data.total);
            _this.postPageTotal = parseInt(data.data.last_page);
          }
        }
      });
    },

    //公司
    companyPageChange: function companyPageChange(value) {
      this.getPageLists(1);
      this.companyPage = value;
    },
    companyFirstPage: function companyFirstPage() {
      this.companyPageChange(1);
    },
    companyLastPage: function companyLastPage() {
      this.companyPage = this.companyPageTotal;
      this.companyPageChange(this.companyPageTotal);
    },
    openAddCompany: function openAddCompany() {
      this.companyVisible = true;
    },
    addCompany: function addCompany(type) {
      var _this2 = this;

      this.$refs["companyRulesForm"].validate(function (valid) {
        if (valid) {
          _this2.companyData.type = type;
          var data = _this2.companyData;
          if (_this2.companyData.color == "默认") {
            _this2.companyData.color = 0;
          }
          _this2.request({
            url: "/company/addCompanyDo",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this2.companyVisible = false;
              _this2.departVisible = false;
              _this2.postVisible = false;
              _this2.getPageLists(type);
              _this2.companyData = {
                color: "默认"
              };
            }
          });
        }
      });
    },

    //部门
    departPageChange: function departPageChange(value) {
      this.getPageLists(2);
      this.departPage = value;
    },
    departFirstPage: function departFirstPage() {
      this.departPageChange(1);
    },
    departLastPage: function departLastPage() {
      this.departPage = this.departPageTotal;
      this.departPageChange(this.departPageTotal);
    },
    departSearchPage: function departSearchPage() {
      this.departPage = 1;
      this.getPageLists(2);
    },
    openAddDepart: function openAddDepart() {
      this.departVisible = true;
    },
    addDepart: function addDepart(type) {
      var _this3 = this;

      this.$refs["departRulesForm"].validate(function (valid) {
        if (valid) {
          _this3.companyData.type = type;
          var data = _this3.companyData;
          if (_this3.companyData.color == "默认") {
            _this3.companyData.color = 0;
          }
          _this3.request({
            url: "/company/addCompanyDo",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this3.companyVisible = false;
              _this3.departVisible = false;
              _this3.postVisible = false;
              _this3.getPageLists(type);
              _this3.companyData = {
                color: "默认"
              };
            }
          });
        }
      });
    },

    //职位
    postPageChange: function postPageChange(value) {
      this.getPageLists(3);
      this.postPage = value;
    },
    openAddPost: function openAddPost() {
      this.postVisible = true;
    },
    addPost: function addPost(type) {
      var _this4 = this;

      this.$refs["postRulesForm"].validate(function (valid) {
        if (valid) {
          _this4.companyData.type = type;
          var data = _this4.companyData;
          if (_this4.companyData.color == "默认") {
            _this4.companyData.color = 0;
          }
          _this4.request({
            url: "/company/addCompanyDo",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this4.companyVisible = false;
              _this4.departVisible = false;
              _this4.postVisible = false;
              _this4.getPageLists(type);
              _this4.companyData = {
                color: "默认"
              };
            }
          });
        }
      });
    },

    //人员 userRulesForm
    getAdminListsPage: function getAdminListsPage() {
      var _this5 = this;

      var page = this.adminPage;
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
          _this5.adminLists = data.data.data;
        }
      });
    },
    openAddUser: function openAddUser() {
      this.usersVisible = true;
    },
    addUserDo: function addUserDo() {
      var _this6 = this;

      this.$refs["userRulesForm"].validate(function (valid) {
        if (valid) {
          var data = _this6.userData;
          _this6.request({
            url: "/user/addUser",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this6.usersVisible = false;
            }
          });
        }
      });
    },
    adminPageChange: function adminPageChange(value) {
      this.adminPage = value;
      this.getAdminListsPage();
    },


    //公司 部门 职位
    getCompanyLists: function getCompanyLists() {
      var _this7 = this;

      var pid = 0;
      var type = 1;
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: pid, type: type }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this7.companySelectLists = data.data;
        }
      });
    },
    getDepartLists: function getDepartLists(val) {
      var _this8 = this;

      console.log("select_company_id：" + val);
      //this.companyData.sub_pid = null;
      //this.companyData.sub_pid= '';
      this.departSelectLists = [];
      console.log("this.companyData.sub_pid：" + this.companyData.sub_pid);
      var pid = val;
      var type = 2;
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: pid, type: type }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this8.departSelectLists = data.data;
        }
      });
    },
    getPostLists: function getPostLists(pid) {
      var _this9 = this;

      // let pid = this.sub_pid;
      // if (pid == 0 || pid == "") {
      //   pid = this.companyData["sub_pid"];
      // }
      // if (pid == 0 || pid == "" || typeof pid == "undefined") {
      //   pid = this.userData["depart_id"];
      // }
      console.log("select_depart_id：" + pid);
      var type = 3;
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: pid, type: type }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this9.postSelectLists = data.data;
        }
        // this.sub_pid = "";
      });
    }
  },
  watch: {}
  // companySelectLists: function(newValue) {
  //   this.companySelectLists = newValue;
  //   this.pid = null;
  //   this.sub_pid = null;
  //   this.companyData.pid=null;
  //   this.companyData.sub_pid=null;
  //     console.log('watch');
  // }

  //
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2fb066a0","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/admin/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"admins"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"default-active":_vm.activeIndex,"mode":"horizontal"},on:{"select":_vm.handleSelect}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("xX+s")}}),_vm._v("人员管理\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"1"}},[_vm._v("公司列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"2"}},[_vm._v("部门列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"3"}},[_vm._v("职位列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"4"}},[_vm._v("人员列表")])],1)],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.companyShow),expression:"companyShow"}],attrs:{"id":"company"}},[_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.openAddCompany}},[_vm._v("添加公司")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.companyLists}},[_c('el-table-column',{attrs:{"type":"index","label":"序号","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"公司名称","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"description","label":"公司详情","align":"center","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"color_tag","label":"标签颜色","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"创建时间","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"update_time","label":"修改时间","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"140"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.goDetail(scope.row.id)}}},[_vm._v("修改")]),_vm._v(" "),_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.delProd(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.companyLists.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","current-page":this.companyPage,"total":this.companyTotal,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.companyPageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.companyFirstPage}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.companyLastPage}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-company",attrs:{"width":"580px","title":"添加公司信息","visible":_vm.companyVisible,"close-on-click-modal":false},on:{"update:visible":function($event){_vm.companyVisible=$event}}},[_c('el-form',{ref:"companyRulesForm",staticClass:"el-form-custom",attrs:{"model":_vm.companyData,"rules":_vm.companyAddRules}},[_c('el-form-item',{attrs:{"label":"公司名称：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.companyData.name),callback:function ($$v) {_vm.$set(_vm.companyData, "name", $$v)},expression:"companyData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"标签颜色："}},[_c('el-select',{model:{value:(_vm.companyData.color),callback:function ($$v) {_vm.$set(_vm.companyData, "color", $$v)},expression:"companyData.color"}},[_c('el-option',{attrs:{"label":"默认","value":"0"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"红色","value":"1"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"橙色","value":"2"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"黄色","value":"3"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"绿色","value":"4"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"青色","value":"5"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"蓝色","value":"6"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"公司详情：","prop":"description"}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea"},model:{value:(_vm.companyData.description),callback:function ($$v) {_vm.$set(_vm.companyData, "description", $$v)},expression:"companyData.description"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.companyVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addCompany(1)}}},[_vm._v("确 定")])],1)],1)],1)])]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.departShow),expression:"departShow"}],attrs:{"id":"department"}},[_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.openAddDepart}},[_vm._v("添加部门")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"公司","label-width":"80px"}},[_c('el-select',{model:{value:(_vm.pid),callback:function ($$v) {_vm.pid=$$v},expression:"pid"}},_vm._l((this.companySelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-so"},[_c('label',{staticClass:"el-form-item__label"}),_vm._v(" "),_c('el-button',{attrs:{"size":"small","icon":"el-icon-search","type":"primary"},on:{"click":_vm.departSearchPage}},[_vm._v("查询")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{ref:"multipleTable",attrs:{"data":_vm.departLists}},[_c('el-table-column',{attrs:{"type":"index","label":"序号","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司名称","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"部门名称","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"是否属于施工队","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.is_work_team === 0)?_c('el-tag',[_vm._v("否")]):_c('el-tag',{attrs:{"type":"success"}},[_vm._v("是")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"description","label":"部门详情","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"创建时间","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"update_time","label":"修改时间","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"140"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.goDetail(scope.row.id)}}},[_vm._v("修改")]),_vm._v(" "),_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.delProd(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.departLists.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","current-page":this.departPage,"total":this.departTotal,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.departPageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.departFirstPage}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.departLastPage}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-company",attrs:{"width":"580px","title":"添加部门信息","visible":_vm.departVisible,"close-on-click-modal":false},on:{"update:visible":function($event){_vm.departVisible=$event}}},[_c('el-form',{ref:"departRulesForm",staticClass:"el-form-custom",attrs:{"model":_vm.companyData,"rules":_vm.departAddRules}},[_c('el-form-item',{attrs:{"label":"公司名称：","prop":"pid"}},[_c('el-select',{model:{value:(_vm.companyData.pid),callback:function ($$v) {_vm.$set(_vm.companyData, "pid", $$v)},expression:"companyData.pid"}},_vm._l((this.companySelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门名称：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.companyData.name),callback:function ($$v) {_vm.$set(_vm.companyData, "name", $$v)},expression:"companyData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否属于施工队：","prop":"is_work_team"}},[_c('el-radio',{attrs:{"label":"1"},model:{value:(_vm.companyData.is_work_team),callback:function ($$v) {_vm.$set(_vm.companyData, "is_work_team", $$v)},expression:"companyData.is_work_team"}},[_vm._v("是")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"0"},model:{value:(_vm.companyData.is_work_team),callback:function ($$v) {_vm.$set(_vm.companyData, "is_work_team", $$v)},expression:"companyData.is_work_team"}},[_vm._v("否")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门详情：","prop":"description"}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea"},model:{value:(_vm.companyData.description),callback:function ($$v) {_vm.$set(_vm.companyData, "description", $$v)},expression:"companyData.description"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.dialogFormVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addDepart(2)}}},[_vm._v("确 定")])],1)],1)],1)])]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.postShow),expression:"postShow"}],attrs:{"id":"post"}},[_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.openAddPost}},[_vm._v("添加职位")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"公司"}},[_c('el-select',{on:{"change":function($event){_vm.getDepartLists(_vm.pid)}},model:{value:(_vm.pid),callback:function ($$v) {_vm.pid=$$v},expression:"pid"}},_vm._l((this.companySelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门"}},[_c('el-select',{ref:"departselectClear",model:{value:(_vm.sub_pid),callback:function ($$v) {_vm.sub_pid=$$v},expression:"sub_pid"}},_vm._l((this.departSelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-so"},[_c('label',{staticClass:"el-form-item__label"}),_vm._v(" "),_c('el-button',{attrs:{"size":"small","icon":"el-icon-search","type":"primary"}},[_vm._v("查询")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{ref:"multipleTable",attrs:{"data":_vm.postLists}},[_c('el-table-column',{attrs:{"type":"index","label":"序号","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司名称","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"depart","label":"部门名称","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"职位名称","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"description","label":"职位详情","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"创建时间","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"update_time","label":"修改时间","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"140"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.goDetail(scope.row.id)}}},[_vm._v("修改")]),_vm._v(" "),_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.delProd(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"pagination"},[(_vm.postLists.length !== 0)?_c('el-pagination',{attrs:{"background":"","layout":"prev, pager, next","current-page":this.postPage,"total":this.postTotal},on:{"current-change":_vm.postPageChange}}):_vm._e()],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-company",attrs:{"width":"580px","title":"添加职位信息","close-on-click-modal":false,"visible":_vm.postVisible},on:{"update:visible":function($event){_vm.postVisible=$event}}},[_c('el-form',{ref:"postRulesForm",staticClass:"el-form-custom",attrs:{"model":_vm.companyData,"rules":_vm.postAddRules}},[_c('el-form-item',{attrs:{"label":"公司名称：","prop":"pid"}},[_c('el-select',{on:{"change":function($event){_vm.getDepartLists($event)}},model:{value:(_vm.companyData.pid),callback:function ($$v) {_vm.$set(_vm.companyData, "pid", $$v)},expression:"companyData.pid"}},_vm._l((this.companySelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{ref:"departselectClear",attrs:{"label":"部门名称：","prop":"sub_pid"}},[_c('el-select',{model:{value:(_vm.companyData.sub_pid),callback:function ($$v) {_vm.$set(_vm.companyData, "sub_pid", $$v)},expression:"companyData.sub_pid"}},_vm._l((this.departSelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"职位名称：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.companyData.name),callback:function ($$v) {_vm.$set(_vm.companyData, "name", $$v)},expression:"companyData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"职位详情：","prop":"description"}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea"},model:{value:(_vm.companyData.description),callback:function ($$v) {_vm.$set(_vm.companyData, "description", $$v)},expression:"companyData.description"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.dialogFormVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addPost(3)}}},[_vm._v("确 定")])],1)],1)],1)])]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.usersShow),expression:"usersShow"}],attrs:{"id":"users"}},[_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.openAddUser}},[_vm._v("添加人员")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"姓名"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userSearch.user_name),callback:function ($$v) {_vm.$set(_vm.userSearch, "user_name", $$v)},expression:"userSearch.user_name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"公司"}},[_c('el-select',{on:{"change":function($event){_vm.getDepartLists(_vm.pid)}},model:{value:(_vm.userSearch.company_id),callback:function ($$v) {_vm.$set(_vm.userSearch, "company_id", $$v)},expression:"userSearch.company_id"}},_vm._l((this.companySelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门"}},[_c('el-select',{on:{"change":function($event){_vm.getPostLists(_vm.sub_pid)}},model:{value:(_vm.userSearch.depart_id),callback:function ($$v) {_vm.$set(_vm.userSearch, "depart_id", $$v)},expression:"userSearch.depart_id"}},_vm._l((this.departSelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"职位"}},[_c('el-select',{model:{value:(_vm.userSearch.post_id),callback:function ($$v) {_vm.$set(_vm.userSearch, "post_id", $$v)},expression:"userSearch.post_id"}},_vm._l((this.postSelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-so"},[_c('label',{staticClass:"el-form-item__label"}),_vm._v(" "),_c('el-button',{attrs:{"size":"small","icon":"el-icon-search","type":"primary"},on:{"click":_vm.getAdminListsPage}},[_vm._v("查询")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.adminLists}},[_c('el-table-column',{attrs:{"type":"index","label":"序号","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"user_name","label":"用户名","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"姓名","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"depart","label":"部门","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"post","label":"职位","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"邮箱","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"update_time","label":"电话","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"dispatch_desc","label":"调度信息","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"140"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.goDetail(scope.row.id)}}},[_vm._v("修改")]),_vm._v(" "),_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.delProd(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"pagination"},[(_vm.adminLists.length !== 0)?_c('el-pagination',{attrs:{"background":"","layout":"prev, pager, next","current-page":this.adminPage,"total":this.adminTotal},on:{"current-change":_vm.adminPageChange}}):_vm._e()],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-company",attrs:{"width":"580px","title":"添加人员","close-on-click-modal":false,"visible":_vm.usersVisible},on:{"update:visible":function($event){_vm.usersVisible=$event}}},[_c('el-form',{ref:"userRulesForm",staticClass:"el-form-custom",attrs:{"model":_vm.userData,"rules":_vm.userAddRules}},[_c('el-form-item',{attrs:{"label":"姓名：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.name),callback:function ($$v) {_vm.$set(_vm.userData, "name", $$v)},expression:"userData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"用户名：","prop":"user_name"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.user_name),callback:function ($$v) {_vm.$set(_vm.userData, "user_name", $$v)},expression:"userData.user_name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"密码：","prop":"password"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.password),callback:function ($$v) {_vm.$set(_vm.userData, "password", $$v)},expression:"userData.password"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"公司名称：","prop":"company_id"}},[_c('el-select',{on:{"change":_vm.getDepartLists},model:{value:(_vm.userData.company_id),callback:function ($$v) {_vm.$set(_vm.userData, "company_id", $$v)},expression:"userData.company_id"}},_vm._l((this.companySelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门名称：","prop":"depart_id"}},[_c('el-select',{on:{"change":_vm.getPostLists},model:{value:(_vm.userData.depart_id),callback:function ($$v) {_vm.$set(_vm.userData, "depart_id", $$v)},expression:"userData.depart_id"}},_vm._l((this.departSelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"职位名称：","prop":"post_id"}},[_c('el-select',{model:{value:(_vm.userData.post_id),callback:function ($$v) {_vm.$set(_vm.userData, "post_id", $$v)},expression:"userData.post_id"}},_vm._l((this.postSelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"邮箱："}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.email),callback:function ($$v) {_vm.$set(_vm.userData, "email", $$v)},expression:"userData.email"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"调度信息：","prop":"dispatch"}},[_c('el-select',{model:{value:(_vm.userData.dispatch),callback:function ($$v) {_vm.$set(_vm.userData, "dispatch", $$v)},expression:"userData.dispatch"}},[_c('el-option',{attrs:{"label":"普通","value":"1"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"司机","value":"2"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"车长","value":"3"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"值班调度","value":"4"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"车站值班员","value":"5"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"施工队长","value":"6"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"手机号码："}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.companyData.phone),callback:function ($$v) {_vm.$set(_vm.companyData, "phone", $$v)},expression:"companyData.phone"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.dialogFormVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.addUserDo}},[_vm._v("确 定")])],1)],1)],1)])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_admin = (esExports);
// CONCATENATED MODULE: ./src/views/admin/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("iiPG")
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
  admin,
  views_admin,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_admin = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "xX+s":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAiCAYAAADYmxC7AAACSElEQVRYhe2XzXHbMBCFUYJKUAk6GAR8MjtIZoJFeAs7iDsIO4g7oGeEBW2e1AHVgdWB0gHVAXOQQIPgLyjamskEM3sTgA+7bx9XhEK+YVIfA8DqFkGFKniUrYm9bglkggncNaBuDRQAVhT0/j/Uvwl1J/QjIYRQyOIAsGJSHcI4XZGRRUE/fRiUDRAAVlxiMgZECCE82oZ9l3GJCY+2YR0SEwp6PxmKAab3kD8wwDQArKhQJfv+8uUe8oehoEIVjXME7lre03pItmYCd5+iKQpZPCW7ZlHI4g+F4tE2dMtKpfpNhSqoUAUDTPk3/cMFa+l2MSBLf2GcrtySNsor9ZFCvulN3xJATOAfG2jKp4sKVbqZXRTK1pHbWYOPkfrYaTntC/R+SjCpDmaPOZhCvvF9kPHGfij5+rW3zh2LCdwxqQ5WlrxNlEl9HIQa8xZ3GSO0oCaXzo5BqADwbYpZXgz2JxWq/AyoGSJ/hzIO7bn/tDiUrYk7oR+997tTpwtFQZ8CoZ65xKQr+jJhtBjG6YqCPvlAdXrV6A+c1dVhtpv7ZKszS22o8e7rutR2dEIICYR6Hi/7wKzmdl8gsl99cfm4lm2xNicDLjEZhQJMp0LN6L53IB5l6wDwzadJRjV1TedM/RC3HiVU2ZoY5mdIn+yu88lQF1hDz1dAPfloaAJYsQDUOeUXHV0FZKLW1ywtWZPBElmqzzUavbZ09ly1RMyGsgezJYFqWcwZN0zt50ya41BZXP8pnDoGn+Ms8jBOV/57h4NH2fovy8Bhn7QMGdYAAAAASUVORK5CYII="

/***/ })

});