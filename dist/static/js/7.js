webpackJsonp([7],{

<<<<<<< HEAD
/***/ "OTGo":
=======
/***/ "Ilko":
>>>>>>> a9f62a19db2bb48f558a31ab942bf539ab05d700
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
<<<<<<< HEAD
var content = __webpack_require__("YAYH");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("42e9514c", content, true);

/***/ }),

/***/ "WfHw":
=======
var content = __webpack_require__("P4zB");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("c441ea16", content, true);

/***/ }),

/***/ "P4zB":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n#admins .el-input{\n  width: 300px !important;\n}\n#admins .el-dialog{\n  width: 500px !important;\n}\n#admins .search{\n  float: right;\n}\n#admins .search .el-form .el-form-item{\n  float: left;\n  /* width: 250px; */\n  margin-right: 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ "x0vE":
>>>>>>> a9f62a19db2bb48f558a31ab942bf539ab05d700
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

<<<<<<< HEAD
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/run_monitor/index.vue
=======
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
>>>>>>> a9f62a19db2bb48f558a31ab942bf539ab05d700
//
//
//
//

<<<<<<< HEAD
/* harmony default export */ var run_monitor = ({
  name: '',
  data: function data() {
    return {};
  },

  computed: {},
  watch: {},
  methods: {}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-fb963776","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/run_monitor/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._v("welcoem vue page")])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_run_monitor = (esExports);
// CONCATENATED MODULE: ./src/views/run_monitor/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("OTGo")
=======
/* harmony default export */ var admin = ({
  data: function data() {
    return {
      activeIndex: '1',
      companyLists: [],
      companyPage: 1,
      companyTotal: 0,
      departLists: [],
      departPage: 1,
      departTotal: 0,
      postLists: [],
      postPage: 1,
      postTotal: 0,
      adminLists: [],
      adminPage: 1,
      adminTotal: 0,
      companyShow: true,
      companyVisible: false,
      companyData: {
        color: '默认'
      },
      departShow: false,
      departVisible: false,
      postShow: false,
      postVisible: false,
      usersShow: false,
      usersVisible: false,
      pid: '',
      sub_pid: "",
      post_pid: "",
      companySelectLists: [],
      departSelectLists: [],
      postSelectLists: [],
      userData: {}

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
    companyPageChange: function companyPageChange(value) {
      this.getPageLists(1);
      this.companyPage = value;
    },
    departPageChange: function departPageChange(value) {
      this.getPageLists(2);
      this.departPage = value;
    },
    postPageChange: function postPageChange(value) {
      this.getPageLists(3);
      this.postPage = value;
    },
    adminPageChange: function adminPageChange(value) {
      this.adminPage = value;
      this.getAdminListsPage();
    },
    openAddCompany: function openAddCompany() {
      this.companyVisible = true;
    },
    openAddDepart: function openAddDepart() {
      this.departVisible = true;
    },
    openAddPost: function openAddPost() {
      this.postVisible = true;
    },
    openAddUser: function openAddUser() {
      this.usersVisible = true;
    },
    addDo: function addDo(type) {
      var _this = this;

      this.companyData.type = type;
      var data = this.companyData;
      this.request({
        url: '/company/addCompanyDo',
        method: 'post',
        data: data
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this.companyVisible = false;
          _this.departVisible = false;
          _this.postVisible = false;
          _this.getPageLists(type);
          _this.companyData = {
            color: "默认"
          };
        }
      });
    },
    getPageLists: function getPageLists(type) {
      var _this2 = this;

      var page = 1;
      if (type == 1) {
        page = this.companyPage;
      } else if (type == 2) {
        page = this.departPage;
      } else {
        page = this.postPage;
      }
      this.request({
        url: '/company/getPageLists',
        method: 'get',
        params: { page: page, type: type }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          if (type == 1) {
            _this2.companyLists = data.data.data;
            _this2.companyPage = parseInt(data.data.current_page);
            _this2.companyTotal = parseInt(data.data.total);
          } else if (type == 2) {
            _this2.departLists = data.data.data;
            _this2.departPage = parseInt(data.data.current_page);
            _this2.departTotal = parseInt(data.data.total);
          } else {
            _this2.postLists = data.data.data;
            _this2.postPage = parseInt(data.data.current_page);
            _this2.postTotal = parseInt(data.data.total);
          }
        }
      });
    },
    getCompanyLists: function getCompanyLists() {
      var _this3 = this;

      var pid = 0;
      var type = 1;
      this.request({
        url: '/company/getDepartLists',
        method: 'get',
        params: { pid: pid, type: type }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this3.companySelectLists = data.data;
        }
      });
    },
    getDepartLists: function getDepartLists() {
      var _this4 = this;

      var pid = this.pid;
      if (pid == 0 || pid == "") {
        pid = this.companyData['pid'];
      }
      if (pid == 0 || pid == "" || typeof pid == "undefined") {
        pid = this.userData['company_id'];
      }
      var type = 2;
      this.request({
        url: '/company/getDepartLists',
        method: 'get',
        params: { pid: pid, type: type }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this4.departSelectLists = data.data;
        }
        _this4.pid = "";
      });
    },
    getPostLists: function getPostLists() {
      var _this5 = this;

      var pid = this.sub_pid;
      if (pid == 0 || pid == "") {
        pid = this.companyData['sub_pid'];
      }
      if (pid == 0 || pid == "" || typeof pid == "undefined") {
        pid = this.userData['depart_id'];
      }
      var type = 3;
      this.request({
        url: '/company/getDepartLists',
        method: 'get',
        params: { pid: pid, type: type }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this5.postSelectLists = data.data;
        }
        _this5.sub_pid = "";
      });
    },
    addUserDo: function addUserDo() {
      var _this6 = this;

      var data = this.userData;
      this.request({
        url: '/user/addUser',
        method: 'post',
        data: data
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this6.usersVisible = false;
        }
      });
    },
    getAdminListsPage: function getAdminListsPage() {
      var _this7 = this;

      var page = this.adminPage;
      this.request({
        url: '/user/getUserPage',
        method: 'get',
        params: { page: page }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this7.adminLists = data.data.data;
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-17e5fb62","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/admin/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"admins"}},[_c('el-menu',{staticClass:"el-menu-demo",attrs:{"default-active":_vm.activeIndex,"mode":"horizontal"},on:{"select":_vm.handleSelect}},[_c('el-menu-item',{attrs:{"index":"1"}},[_vm._v("公司列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"2"}},[_vm._v("部门列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"3"}},[_vm._v("职位列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"4"}},[_vm._v("人员列表")])],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.companyShow),expression:"companyShow"}],attrs:{"id":"company"}},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.openAddCompany}},[_vm._v("添加公司")]),_vm._v(" "),_c('el-table',{ref:"multipleTable",attrs:{"data":_vm.companyLists}},[_c('el-table-column',{attrs:{"type":"index","label":"序号","width":"100","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"公司名称","width":"300","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"description","label":"公司详情","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"color_tag","label":"标签颜色","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"创建时间","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"update_time","label":"修改时间","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.goDetail(scope.row.id)}}},[_vm._v("编辑")]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.delProd(scope.row.id)}}},[_vm._v("删除")])]}}])})],1),_vm._v(" "),_c('div',{staticClass:"pagination"},[(_vm.companyLists.length !== 0)?_c('el-pagination',{attrs:{"background":"","layout":"prev, pager, next","current-page":this.companyPage,"total":this.companyTotal},on:{"current-change":_vm.companyPageChange}}):_vm._e()],1),_vm._v(" "),_c('el-dialog',{attrs:{"title":"添加公司信息","visible":_vm.companyVisible},on:{"update:visible":function($event){_vm.companyVisible=$event}}},[_c('el-form',{attrs:{"model":_vm.companyData}},[_c('el-form-item',{attrs:{"label":"公司名称","label-width":"80px"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.companyData.name),callback:function ($$v) {_vm.$set(_vm.companyData, "name", $$v)},expression:"companyData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"标签颜色","label-width":"80px"}},[_c('el-select',{model:{value:(_vm.companyData.color),callback:function ($$v) {_vm.$set(_vm.companyData, "color", $$v)},expression:"companyData.color"}},[_c('el-option',{attrs:{"label":"默认","value":"0"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"红色","value":"1"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"橙色","value":"2"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"黄色","value":"3"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"绿色","value":"4"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"青色","value":"5"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"蓝色","value":"6"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"公司详情","label-width":"80px"}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea"},model:{value:(_vm.companyData.description),callback:function ($$v) {_vm.$set(_vm.companyData, "description", $$v)},expression:"companyData.description"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.dialogFormVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addDo(1)}}},[_vm._v("确 定")])],1)],1)],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.departShow),expression:"departShow"}],attrs:{"id":"department"}},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.openAddDepart}},[_vm._v("添加部门")]),_vm._v(" "),_c('div',{staticClass:"search"},[_c('el-form',[_c('el-form-item',{attrs:{"label":"公司","label-width":"80px"}},[_c('el-select',{on:{"change":_vm.getDepartLists},model:{value:(_vm.pid),callback:function ($$v) {_vm.pid=$$v},expression:"pid"}},_vm._l((this.companySelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1)],1)],1),_vm._v(" "),_c('el-table',{ref:"multipleTable",attrs:{"data":_vm.departLists}},[_c('el-table-column',{attrs:{"type":"index","label":"序号","width":"100","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司名称","width":"150","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"部门名称","width":"150","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"是否属于施工队","width":"200","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.is_work_team === 0)?_c('el-tag',[_vm._v("否")]):_c('el-tag',{attrs:{"type":"success"}},[_vm._v("是")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"description","label":"部门详情","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"创建时间","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"update_time","label":"修改时间","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.goDetail(scope.row.id)}}},[_vm._v("编辑")]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.delProd(scope.row.id)}}},[_vm._v("删除")])]}}])})],1),_vm._v(" "),_c('div',{staticClass:"pagination"},[(_vm.departLists.length !== 0)?_c('el-pagination',{attrs:{"background":"","layout":"prev, pager, next","current-page":this.departPage,"total":this.departTotal},on:{"current-change":_vm.departPageChange}}):_vm._e()],1),_vm._v(" "),_c('el-dialog',{attrs:{"title":"添加部门信息","visible":_vm.departVisible},on:{"update:visible":function($event){_vm.departVisible=$event}}},[_c('el-form',{attrs:{"model":_vm.companyData}},[_c('el-form-item',{attrs:{"label":"公司名称","label-width":"120px"}},[_c('el-select',{model:{value:(_vm.companyData.pid),callback:function ($$v) {_vm.$set(_vm.companyData, "pid", $$v)},expression:"companyData.pid"}},_vm._l((this.companySelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门名称","label-width":"120px"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.companyData.name),callback:function ($$v) {_vm.$set(_vm.companyData, "name", $$v)},expression:"companyData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否属于施工队","label-width":"120px"}},[_c('el-radio',{attrs:{"label":"1"},model:{value:(_vm.companyData.is_work_team),callback:function ($$v) {_vm.$set(_vm.companyData, "is_work_team", $$v)},expression:"companyData.is_work_team"}},[_vm._v("是")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"0"},model:{value:(_vm.companyData.is_work_team),callback:function ($$v) {_vm.$set(_vm.companyData, "is_work_team", $$v)},expression:"companyData.is_work_team"}},[_vm._v("否")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门详情","label-width":"120px"}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea"},model:{value:(_vm.companyData.description),callback:function ($$v) {_vm.$set(_vm.companyData, "description", $$v)},expression:"companyData.description"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.dialogFormVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addDo(2)}}},[_vm._v("确 定")])],1)],1)],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.postShow),expression:"postShow"}],attrs:{"id":"post"}},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.openAddPost}},[_vm._v("添加职位")]),_vm._v(" "),_c('div',{staticClass:"search"},[_c('el-form',[_c('el-form-item',{attrs:{"label":"公司","label-width":"80px"}},[_c('el-select',{on:{"change":_vm.getDepartLists},model:{value:(_vm.pid),callback:function ($$v) {_vm.pid=$$v},expression:"pid"}},_vm._l((this.companySelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门","label-width":"80px"},on:{"change":_vm.getPostLists}},[_c('el-select',{model:{value:(_vm.sub_pid),callback:function ($$v) {_vm.sub_pid=$$v},expression:"sub_pid"}},_vm._l((this.departSelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1)],1)],1),_vm._v(" "),_c('el-table',{ref:"multipleTable",attrs:{"data":_vm.postLists}},[_c('el-table-column',{attrs:{"type":"index","label":"序号","width":"100","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司名称","width":"150","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"depart","label":"部门名称","width":"150","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"职位名称","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"description","label":"职位详情","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"创建时间","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"update_time","label":"修改时间","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.goDetail(scope.row.id)}}},[_vm._v("编辑")]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.delProd(scope.row.id)}}},[_vm._v("删除")])]}}])})],1),_vm._v(" "),_c('div',{staticClass:"pagination"},[(_vm.postLists.length !== 0)?_c('el-pagination',{attrs:{"background":"","layout":"prev, pager, next","current-page":this.postPage,"total":this.postTotal},on:{"current-change":_vm.postPageChange}}):_vm._e()],1),_vm._v(" "),_c('el-dialog',{attrs:{"title":"添加职位信息","visible":_vm.postVisible},on:{"update:visible":function($event){_vm.postVisible=$event}}},[_c('el-form',{attrs:{"model":_vm.companyData}},[_c('el-form-item',{attrs:{"label":"公司名称","label-width":"120px"}},[_c('el-select',{on:{"change":_vm.getDepartLists},model:{value:(_vm.companyData.pid),callback:function ($$v) {_vm.$set(_vm.companyData, "pid", $$v)},expression:"companyData.pid"}},_vm._l((this.companySelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门名称","label-width":"120px"}},[_c('el-select',{model:{value:(_vm.companyData.sub_pid),callback:function ($$v) {_vm.$set(_vm.companyData, "sub_pid", $$v)},expression:"companyData.sub_pid"}},_vm._l((this.departSelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"职位名称","label-width":"120px"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.companyData.name),callback:function ($$v) {_vm.$set(_vm.companyData, "name", $$v)},expression:"companyData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"职位详情","label-width":"120px"}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea"},model:{value:(_vm.companyData.description),callback:function ($$v) {_vm.$set(_vm.companyData, "description", $$v)},expression:"companyData.description"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.dialogFormVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addDo(3)}}},[_vm._v("确 定")])],1)],1)],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.usersShow),expression:"usersShow"}],attrs:{"id":"users"}},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.openAddUser}},[_vm._v("添加人员")]),_vm._v(" "),_c('div',{staticClass:"search"},[_c('el-form',[_c('el-form-item',{attrs:{"label":"姓名","label-width":"80px"}},[_c('el-input')],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"公司","label-width":"80px"}},[_c('el-select',{on:{"change":_vm.getDepartLists},model:{value:(_vm.pid),callback:function ($$v) {_vm.pid=$$v},expression:"pid"}},_vm._l((this.companySelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门","label-width":"80px"}},[_c('el-select',{on:{"change":_vm.getPostLists},model:{value:(_vm.sub_pid),callback:function ($$v) {_vm.sub_pid=$$v},expression:"sub_pid"}},_vm._l((this.departSelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"职位","label-width":"80px"}},[_c('el-select',{model:{value:(_vm.post_pid),callback:function ($$v) {_vm.post_pid=$$v},expression:"post_pid"}},_vm._l((this.postSelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1)],1)],1),_vm._v(" "),_c('el-table',{ref:"multipleTable",attrs:{"data":_vm.adminLists}},[_c('el-table-column',{attrs:{"type":"index","label":"序号","width":"100","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"user_name","label":"用户名","width":"150","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"姓名","width":"150","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"depart","label":"部门","width":"100","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"post","label":"职位","width":"100","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"邮箱","width":"100","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"update_time","label":"电话","width":"100","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"dispatch_desc","label":"调度信息","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.goDetail(scope.row.id)}}},[_vm._v("编辑")]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.delProd(scope.row.id)}}},[_vm._v("删除")])]}}])})],1),_vm._v(" "),_c('div',{staticClass:"pagination"},[(_vm.adminLists.length !== 0)?_c('el-pagination',{attrs:{"background":"","layout":"prev, pager, next","current-page":this.adminPage,"total":this.adminTotal},on:{"current-change":_vm.adminPageChange}}):_vm._e()],1),_vm._v(" "),_c('el-dialog',{attrs:{"title":"添加人员","visible":_vm.usersVisible},on:{"update:visible":function($event){_vm.usersVisible=$event}}},[_c('el-form',{attrs:{"model":_vm.userData}},[_c('el-form-item',{attrs:{"label":"姓名","label-width":"120px"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.name),callback:function ($$v) {_vm.$set(_vm.userData, "name", $$v)},expression:"userData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"用户名","label-width":"120px"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.user_name),callback:function ($$v) {_vm.$set(_vm.userData, "user_name", $$v)},expression:"userData.user_name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"公司名称","label-width":"120px"}},[_c('el-select',{on:{"change":_vm.getDepartLists},model:{value:(_vm.userData.company_id),callback:function ($$v) {_vm.$set(_vm.userData, "company_id", $$v)},expression:"userData.company_id"}},_vm._l((this.companySelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"密码","label-width":"120px"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.password),callback:function ($$v) {_vm.$set(_vm.userData, "password", $$v)},expression:"userData.password"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门名称","label-width":"120px"}},[_c('el-select',{on:{"change":_vm.getPostLists},model:{value:(_vm.userData.depart_id),callback:function ($$v) {_vm.$set(_vm.userData, "depart_id", $$v)},expression:"userData.depart_id"}},_vm._l((this.departSelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"邮箱","label-width":"120px"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.email),callback:function ($$v) {_vm.$set(_vm.userData, "email", $$v)},expression:"userData.email"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"职位名称","label-width":"120px"}},[_c('el-select',{model:{value:(_vm.userData.post_id),callback:function ($$v) {_vm.$set(_vm.userData, "post_id", $$v)},expression:"userData.post_id"}},_vm._l((this.postSelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"调度信息","label-width":"120px"}},[_c('el-select',{model:{value:(_vm.userData.dispatch),callback:function ($$v) {_vm.$set(_vm.userData, "dispatch", $$v)},expression:"userData.dispatch"}},[_c('el-option',{attrs:{"label":"普通","value":"1"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"司机","value":"2"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"车长","value":"3"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"值班调度","value":"4"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"车站值班员","value":"5"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"施工队长","value":"6"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"手机号码","label-width":"120px"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.companyData.description),callback:function ($$v) {_vm.$set(_vm.companyData, "description", $$v)},expression:"companyData.description"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.dialogFormVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.addUserDo}},[_vm._v("确 定")])],1)],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_admin = (esExports);
// CONCATENATED MODULE: ./src/views/admin/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("Ilko")
>>>>>>> a9f62a19db2bb48f558a31ab942bf539ab05d700
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-fb963776"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
<<<<<<< HEAD
  run_monitor,
  views_run_monitor,
=======
  admin,
  views_admin,
>>>>>>> a9f62a19db2bb48f558a31ab942bf539ab05d700
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

<<<<<<< HEAD
/* harmony default export */ var src_views_run_monitor = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "YAYH":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports
=======
/* harmony default export */ var src_views_admin = __webpack_exports__["default"] = (Component.exports);
>>>>>>> a9f62a19db2bb48f558a31ab942bf539ab05d700


/***/ })

});