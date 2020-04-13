webpackJsonp([24],{

/***/ "0qre":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/admin/postlist.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var postlist = ({
  data: function data() {
    return {
      postLists: [],
      post_search_pid: "",
      postPage_size: 20,
      postPage_cur: 1,
      postPage_items: 0,
      postPage_total: 0,
      postDialogVisible: false,
      postDialogTitle: "",
      postData: {},
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
          message: "请输入职位名称2~20个字符",
          trigger: "blur"
        }, { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }],
        description: [{ min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }]
      },
      search_pid: "",
      search_departid: "",
      companySelectList: [],
      departSelectList: [],
      postSelectList: []
    };
  },
  mounted: function mounted() {
    document.querySelector("#app-menu-items #menu_admin").classList.add("is-active");
  },
  created: function created() {
    this.getCompanyLists();
    this.getPageLists();
  },

  methods: {
    getPageLists: function getPageLists() {
      var _this = this;

      //type  1 公司  2 部门 3 职位
      var type = 3;
      var page = this.postPage_cur;
      console.log(this.search_departid);
      var pid = 0;
      if (this.search_departid == "" && this.search_pid != "") {
        pid = this.search_pid;
        //type=2;
      } else {
        pid = this.search_departid;
      }
      this.request({
        url: "/company/getPageLists",
        method: "get",
        params: { page: page, type: type, pid: pid }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this.postLists = data.data.data;
          _this.departPage_size = data.data.per_page;
          _this.postPage_cur = parseInt(data.data.current_page);
          _this.postPage_items = parseInt(data.data.total);
          _this.postPage_total = parseInt(data.data.last_page);
        }
      });
    },


    //职位
    postChangePage: function postChangePage(value) {
      this.postPage_cur = value;
      this.getPageLists();
    },
    postFirstPage: function postFirstPage() {
      this.postPage_cur = 1;
      this.getPageLists();
    },
    postLastPage: function postLastPage() {
      this.postPage_cur = this.departPage_total;
      this.getPageLists();
    },
    postSearchPage: function postSearchPage() {
      this.postPage_cur = 1;
      this.getPageLists();
    },
    resetSerach: function resetSerach() {
      this.search_pid = "";
      this.search_departid = "";
      this.departSelectList = [];
      this.getPageLists();
    },
    openAddPost: function openAddPost() {
      this.postDialogTitle = "添加职位信息";
      this.postDialogVisible = true;
      this.postData = {};
    },
    addPost: function addPost(type) {
      var _this2 = this;

      this.$refs["postRulesForm"].validate(function (valid) {
        if (valid) {
          var data = _this2.postData;
          _this2.postData.type = 3;
          var url = "/company/addCompanyDo";
          var baseid = _this2.postData.id;
          if (typeof baseid != "undefined") {
            url = "/company/editCompany";
          }
          _this2.request({
            url: url,
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this2.postDialogVisible = false;
              _this2.$message({
                type: "success",
                message: "保存成功！"
              });
              _this2.getPageLists();
            }
          });
        }
      });
    },
    detailPost: function detailPost(id) {
      var _this3 = this;

      this.postDialogTitle = "修改职位信息";
      this.postDialogVisible = true;
      this.request({
        url: "/company/getDepartDetail",
        method: "get",
        params: { id: id }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this3.postData = data.data;
        }
      });
    },
    delPost: function delPost(id) {
      var _this4 = this;

      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this4.request({
          url: "/company/deleteCompany",
          method: "post",
          data: { id: id }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            _this4.$message({
              type: "success",
              message: "删除成功！"
            });
            _this4.getPageLists();
          }
        });
      }).catch(function () {});
    },

    //公司 部门
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

      this.search_departid = "";
      this.$set(this.postData, "sub_pid", "");
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
    }
  }
  //
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5a75b447","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/admin/postlist.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"admins"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"postlist","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("xX+s")}}),_vm._v("人员管理\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"admin"}},[_vm._v("公司列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"departlist"}},[_vm._v("部门列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"postlist"}},[_vm._v("职位列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"userlist"}},[_vm._v("人员列表")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',{staticClass:"form-add-item"},[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.openAddPost}},[_vm._v("添加职位")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"公司"}},[_c('el-select',{attrs:{"placeholder":"请选择公司"},on:{"change":function($event){_vm.getDepartLists($event)}},model:{value:(_vm.search_pid),callback:function ($$v) {_vm.search_pid=$$v},expression:"search_pid"}},_vm._l((this.companySelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门"}},[_c('el-select',{ref:"departselectClear",attrs:{"placeholder":"请选择部门","clearable":""},model:{value:(_vm.search_departid),callback:function ($$v) {_vm.search_departid=$$v},expression:"search_departid"}},_vm._l((this.departSelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-so"},[_c('label',{staticClass:"el-form-item__label"}),_vm._v(" "),_c('el-button',{attrs:{"size":"small","icon":"el-icon-search","type":"primary"},on:{"click":_vm.postSearchPage}},[_vm._v("查询")]),_vm._v(" "),_c('el-button',{attrs:{"size":"small","plain":""},on:{"click":_vm.resetSerach}},[_vm._v("重置")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{ref:"multipleTable",attrs:{"data":_vm.postLists}},[_c('el-table-column',{attrs:{"type":"index","label":"序号","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司名称","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"depart","label":"部门名称","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"职位名称","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"description","label":"职位详情","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"创建时间","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"update_time","label":"修改时间","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"120"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.detailPost(scope.row.id)}}},[_vm._v("修改")]),_vm._v(" "),_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.delPost(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.postLists.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":_vm.postPage_size,"current-page":this.postPage_cur,"total":this.postPage_items,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.postChangePage}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.postFirstPage}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.postLastPage}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-company",attrs:{"width":"580px","title":"添加职位信息","close-on-click-modal":false,"visible":_vm.postDialogVisible},on:{"update:visible":function($event){_vm.postDialogVisible=$event}}},[_c('el-form',{ref:"postRulesForm",staticClass:"el-form-custom",attrs:{"model":_vm.postData,"rules":_vm.postAddRules}},[(_vm.postDialogTitle=='添加职位信息')?_c('el-form-item',{attrs:{"label":"公司名称：","prop":"pid"}},[_c('el-select',{on:{"change":function($event){_vm.getDepartLists($event)}},model:{value:(_vm.postData.pid),callback:function ($$v) {_vm.$set(_vm.postData, "pid", $$v)},expression:"postData.pid"}},_vm._l((this.companySelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1):_vm._e(),_vm._v(" "),(_vm.postDialogTitle=='添加职位信息')?_c('el-form-item',{ref:"departselectClear",attrs:{"label":"部门名称：","prop":"sub_pid"}},[_c('el-select',{model:{value:(_vm.postData.sub_pid),callback:function ($$v) {_vm.$set(_vm.postData, "sub_pid", $$v)},expression:"postData.sub_pid"}},_vm._l((this.departSelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1):_vm._e(),_vm._v(" "),_c('el-form-item',{attrs:{"label":"职位名称：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20","show-word-limit":""},model:{value:(_vm.postData.name),callback:function ($$v) {_vm.$set(_vm.postData, "name", (typeof $$v === 'string'? $$v.trim(): $$v))},expression:"postData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"职位简介：","prop":"description"}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea","maxlength":"30","show-word-limit":""},model:{value:(_vm.postData.description),callback:function ($$v) {_vm.$set(_vm.postData, "description", $$v)},expression:"postData.description"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.postDialogVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addPost(3)}}},[_vm._v("确 定")])],1)],1)],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var admin_postlist = (esExports);
// CONCATENATED MODULE: ./src/views/admin/postlist.vue
function injectStyle (ssrContext) {
  __webpack_require__("LExx")
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
  postlist,
  admin_postlist,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_admin_postlist = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "LExx":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("R5zx");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("0a00361e", content, true);

/***/ }),

/***/ "R5zx":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.admins .el-dialog {\r\n  width: 500px !important;\n}\n.dialog-company .el-textarea {\r\n  width: 100% !important;\n}\n.dialog-company .el-textarea__inner {\r\n  height: 80px;\n}\n.dialog-company .el-form-item__label {\r\n  width: 110px;\n}\n.dialog-company .el-form-item__content {\r\n  margin-left: 110px;\n}\n.dialog-company .el-input--medium {\r\n  width: 100%;\n}\n.dialog-company .el-select {\r\n  width: 100%;\n}\r\n", ""]);

// exports


/***/ })

});