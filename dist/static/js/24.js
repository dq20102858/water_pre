webpackJsonp([24],{

/***/ "5Vzn":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("MT2b");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("78f4e106", content, true);

/***/ }),

/***/ "BQKP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/admin/departlist.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var departlist = ({
  data: function data() {
    return {
      departLists: [],
      departPage_cur: 1,
      departPage_size: 20,
      departPage_items: 0,
      departPage_total: 0,
      departDialogVisible: false,
      departDialogTitle: "",
      departData: {},
      departAddRules: {
        pid: [{
          required: true,
          message: "请选择公司",
          trigger: "change"
        }],
        name: [{
          required: true,
          message: "请输入部门名称2~20个字符",
          trigger: "blur"
        }, { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }],
        is_work_team: [{
          required: true,
          message: "请选择施工队",
          trigger: "change"
        }],
        description: [{ min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }]
      },
      search_pid: '',
      companySelectList: [],
      departSelectLists: [],
      postSelectLists: []
    };
  },
  created: function created() {
    this.getCompanyLists();
    this.getPageLists();
  },

  methods: {
    getPageLists: function getPageLists() {
      var _this = this;

      //type  1 公司  2 部门 3 职位
      var page = this.departPage_cur;
      var type = 2;
      var pid = this.search_pid;
      this.request({
        url: "/company/getPageLists",
        method: "get",
        params: { page: page, type: type, pid: pid }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this.departLists = data.data.data;
          _this.departPage_size = data.data.per_page;
          _this.departPage_cur = parseInt(data.data.current_page);
          _this.departPage_items = parseInt(data.data.total);
          _this.departPage_total = parseInt(data.data.last_page);
        }
      });
    },


    //部门
    departChangePage: function departChangePage(value) {
      this.departPage_cur = value;
      this.getPageLists();
    },
    departFirstPage: function departFirstPage() {
      this.departPage_cur = 1;
      this.getPageLists();
    },
    departLastPage: function departLastPage() {
      this.departPage_cur = this.departPage_total;
      this.getPageLists();
    },
    departSearchPage: function departSearchPage() {
      this.departPage_cur = 1;
      this.getPageLists();
    },
    resetSerach: function resetSerach() {
      this.search_pid = "";
      this.getPageLists();
    },
    openAddDepart: function openAddDepart() {
      this.departDialogVisible = true;
      this.departDialogTitle = "添加部门信息";
      this.departData = {};
    },
    addDepart: function addDepart() {
      var _this2 = this;

      this.$refs["departRulesForm"].validate(function (valid) {
        if (valid) {
          var data = _this2.departData;
          _this2.departData.type = 2;
          var url = "/company/addCompanyDo";
          var baseid = _this2.departData.id;
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
              _this2.departDialogVisible = false;
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
    detailDepart: function detailDepart(id) {
      var _this3 = this;

      this.departDialogTitle = "修改部门信息";
      this.departDialogVisible = true;
      this.request({
        url: "/company/getDepartDetail",
        method: "get",
        params: { id: id }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this3.departData = data.data;
        }
      });
    },
    delDepart: function delDepart(id) {
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

    //公司 部门 职位
    getCompanyLists: function getCompanyLists() {
      var _this5 = this;

      var pid = 0;
      var type = 1;
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: pid, type: type }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this5.companySelectList = data.data;
        }
      });
    }
  }
  //
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-882186a0","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/admin/departlist.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"admins"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"departlist","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("xX+s")}}),_vm._v("人员管理\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"admin"}},[_vm._v("公司列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"departlist"}},[_vm._v("部门列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"postlist"}},[_vm._v("职位列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"userlist"}},[_vm._v("人员列表")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.openAddDepart}},[_vm._v("添加部门")])],1),_vm._v(" "),_c('el-form-item',[_c('el-select',{attrs:{"placeholder":"请选择公司","clearable":""},model:{value:(_vm.search_pid),callback:function ($$v) {_vm.search_pid=$$v},expression:"search_pid"}},_vm._l((this.companySelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-so"},[_c('label',{staticClass:"el-form-item__label"}),_vm._v(" "),_c('el-button',{attrs:{"size":"small","icon":"el-icon-search","type":"primary"},on:{"click":_vm.departSearchPage}},[_vm._v("查询")]),_vm._v(" "),_c('el-button',{attrs:{"size":"small","plain":""},on:{"click":_vm.resetSerach}},[_vm._v("重置")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{ref:"multipleTable",attrs:{"data":_vm.departLists}},[_c('el-table-column',{attrs:{"type":"index","label":"序号","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司名称","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"部门名称","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"是否属于施工队","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.is_work_team === 0)?_c('el-tag',[_vm._v("否")]):_c('el-tag',{attrs:{"type":"success"}},[_vm._v("是")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"description","label":"部门详情","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"创建时间","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"update_time","label":"修改时间","width":"200","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"120"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.detailDepart(scope.row.id)}}},[_vm._v("修改")]),_vm._v(" "),_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.delDepart(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.departLists.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":_vm.departPage_size,"current-page":this.departPage_cur,"total":this.departPage_items,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.departChangePage}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.departFirstPage}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.departLastPage}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-depart",attrs:{"width":"580px","title":_vm.departDialogTitle,"visible":_vm.departDialogVisible,"close-on-click-modal":false},on:{"update:visible":function($event){_vm.departDialogVisible=$event}}},[_c('el-form',{ref:"departRulesForm",staticClass:"el-form-custom",attrs:{"model":_vm.departData,"rules":_vm.departAddRules}},[(_vm.departDialogTitle=='添加部门信息')?_c('el-form-item',{attrs:{"label":"公司名称：","prop":"pid"}},[_c('el-select',{model:{value:(_vm.departData.pid),callback:function ($$v) {_vm.$set(_vm.departData, "pid", $$v)},expression:"departData.pid"}},_vm._l((this.companySelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1):_vm._e(),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门名称：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20","show-word-limit":""},model:{value:(_vm.departData.name),callback:function ($$v) {_vm.$set(_vm.departData, "name", $$v)},expression:"departData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否属于施工队：","prop":"is_work_team"}},[_c('el-radio-group',{model:{value:(_vm.departData.is_work_team),callback:function ($$v) {_vm.$set(_vm.departData, "is_work_team", $$v)},expression:"departData.is_work_team"}},[_c('el-radio',{attrs:{"label":1}},[_vm._v("是")]),_vm._v(" "),_c('el-radio',{attrs:{"label":0}},[_vm._v("否")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"部门简介：","prop":"description"}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea","maxlength":"30","show-word-limit":""},model:{value:(_vm.departData.description),callback:function ($$v) {_vm.$set(_vm.departData, "description", $$v)},expression:"departData.description"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.departDialogVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addDepart()}}},[_vm._v("确 定")])],1)],1)],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var admin_departlist = (esExports);
// CONCATENATED MODULE: ./src/views/admin/departlist.vue
function injectStyle (ssrContext) {
  __webpack_require__("5Vzn")
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
  departlist,
  admin_departlist,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_admin_departlist = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "MT2b":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.admins .el-dialog {\r\n  width: 500px !important;\n}\n.dialog-depart .el-textarea {\r\n  width: 100% !important;\n}\n.dialog-depart .el-textarea__inner {\r\n  height: 80px;\n}\n.dialog-depart .el-form-item__label {\r\n  width: 140px;\n}\n.dialog-depart .el-form-item__content {\r\n  margin-left: 140px;\n}\n.dialog-depart .el-input--medium {\r\n  width: 100%;\n}\n.dialog-depart .el-select {\r\n  width: 100%;\n}\r\n", ""]);

// exports


/***/ })

});