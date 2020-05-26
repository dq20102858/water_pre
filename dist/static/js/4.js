webpackJsonp([4],{

/***/ "CPoJ":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.admins .el-dialog {\r\n  width: 500px !important;\n}\n.dialog-company .el-textarea {\r\n  width: 100% !important;\n}\n.dialog-company .el-textarea__inner {\r\n  height: 80px;\n}\n.dialog-company .el-form-item__label {\r\n  width: 110px;\n}\n.dialog-company .el-form-item__content {\r\n  margin-left: 110px;\n}\n.dialog-company .el-input--medium {\r\n  width: 100%;\n}\n.dialog-company .el-select {\r\n  width: 100%;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "tnEN":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("CPoJ");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("5fa5a3ab", content, true);

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

/* harmony default export */ var admin = ({
  data: function data() {
    return {
      companyLists: [],
      companyPage_size: 20,
      companyPage_cur: 1,
      companyPage_items: 0,
      companyPage_total: 0,
      companyDialogVisible: false,
      companyDialogTitle: "",
      companyData: {
        color: "默认"
      },
      companyAddRules: {
        name: [{
          required: true,
          message: "请输入公司名称2~20个字符",
          trigger: "blur"
        }, { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }, {
          pattern: /^[\u4e00-\u9fa5\(\)（）\da-zA-Z&]{2,50}$/,
          message: "输入公司名称只能包含汉字、括号、&、数字或英文字符",
          trigger: "blur"
        }],
        description: [{ min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }]
      }
    };
  },
  created: function created() {
    this.getPageLists();
  },

  methods: {
    getPageLists: function getPageLists() {
      var _this = this;

      //type  1 公司  2 部门 3 职位
      var type = 1;
      var page = this.companyPage_cur;
      this.request({
        url: "/company/getPageLists",
        method: "get",
        params: { page: page, type: type }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this.companyLists = data.data.data;
          _this.companyPage_size = data.data.per_page;
          _this.companyPage_cur = parseInt(data.data.current_page);
          _this.companyPage_items = parseInt(data.data.total);
          _this.companyPage_total = parseInt(data.data.last_page);
        }
      });
    },

    //公司
    companyChangePage: function companyChangePage(value) {
      this.companyPage_cur = value;
      this.getPageLists();
    },
    companyFirstPage: function companyFirstPage() {
      this.companyPage_cur = 1;
      this.getPageLists();
    },
    companyLastPage: function companyLastPage() {
      this.companyPage_cur = this.companyPage_total;
      this.getPageLists();
    },
    openAddCompany: function openAddCompany() {
      var _this2 = this;

      this.companyDialogVisible = true;
      this.$nextTick(function () {
        _this2.$refs["companyRulesForm"].clearValidate();
      });
      this.companyDialogTitle = "添加公司信息";
      this.companyData = {
        color: "默认"
      };
    },
    addCompany: function addCompany() {
      var _this3 = this;

      this.$refs["companyRulesForm"].validate(function (valid) {
        if (valid) {
          var data = _this3.companyData;
          _this3.companyData.type = 1;
          if (_this3.companyData.color == "默认") {
            _this3.companyData.color = 0;
          }
          var url = "/company/addCompanyDo";
          var baseid = _this3.companyData.id;
          if (typeof baseid != "undefined") {
            url = "/company/editCompany";
          }
          _this3.request({
            url: url,
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this3.companyDialogVisible = false;
              _this3.$message({
                type: "success",
                message: "保存成功！"
              });
              _this3.getPageLists();
            }
          });
        }
      });
    },
    detailCompany: function detailCompany(id) {
      var _this4 = this;

      this.companyDialogVisible = true;
      this.companyDialogTitle = "修改公司信息";
      this.$nextTick(function () {
        _this4.$refs["companyRulesForm"].clearValidate();
      });
      this.request({
        url: "/company/getDepartDetail",
        method: "get",
        params: { id: id }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this4.companyData = data.data;
        }
      });
    },
    delCompany: function delCompany(id) {
      var _this5 = this;

      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this5.request({
          url: "/company/deleteCompany",
          method: "post",
          data: { id: id }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            _this5.$message({
              type: "success",
              message: "删除成功！"
            });
            _this5.getPageLists();
          }
        });
      }).catch(function () {});
    }
  }
  //
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6dad024e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/admin/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"admins"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"admin","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("xX+s")}}),_vm._v("人员管理\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"admin"},on:{"click":_vm.companyFirstPage}},[_vm._v("公司列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"departlist"}},[_vm._v("部门列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"postlist"}},[_vm._v("职位列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"userlist"}},[_vm._v("人员列表")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.openAddCompany}},[_vm._v("添加公司")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.companyLists}},[_c('el-table-column',{attrs:{"type":"index","label":"序号","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"公司名称","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"description","label":"公司详情","align":"center","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"color_tag","label":"标签颜色","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"创建时间","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"update_time","label":"修改时间","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"120"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.detailCompany(scope.row.id)}}},[_vm._v("修改")]),_vm._v(" "),_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.delCompany(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.companyLists.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":_vm.companyPage_size,"current-page":this.companyPage_cur,"total":this.companyPage_items,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.companyChangePage}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.companyFirstPage}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.companyLastPage}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-company",attrs:{"width":"580px","title":_vm.companyDialogTitle,"visible":_vm.companyDialogVisible,"close-on-click-modal":false},on:{"update:visible":function($event){_vm.companyDialogVisible=$event}}},[_c('el-form',{ref:"companyRulesForm",staticClass:"el-form-custom",attrs:{"model":_vm.companyData,"rules":_vm.companyAddRules}},[_c('el-form-item',{attrs:{"label":"公司名称：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20","show-word-limit":""},model:{value:(_vm.companyData.name),callback:function ($$v) {_vm.$set(_vm.companyData, "name", $$v)},expression:"companyData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"标签颜色："}},[_c('el-select',{model:{value:(_vm.companyData.color),callback:function ($$v) {_vm.$set(_vm.companyData, "color", $$v)},expression:"companyData.color"}},[_c('el-option',{attrs:{"label":"默认","value":0}}),_vm._v(" "),_c('el-option',{attrs:{"label":"红色","value":1}}),_vm._v(" "),_c('el-option',{attrs:{"label":"橙色","value":2}}),_vm._v(" "),_c('el-option',{attrs:{"label":"黄色","value":3}}),_vm._v(" "),_c('el-option',{attrs:{"label":"绿色","value":4}}),_vm._v(" "),_c('el-option',{attrs:{"label":"青色","value":5}}),_vm._v(" "),_c('el-option',{attrs:{"label":"蓝色","value":6}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"公司简介：","prop":"description"}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea","maxlength":"30","show-word-limit":""},model:{value:(_vm.companyData.description),callback:function ($$v) {_vm.$set(_vm.companyData, "description", $$v)},expression:"companyData.description"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.companyDialogVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addCompany()}}},[_vm._v("确 定")])],1)],1)],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_admin = (esExports);
// CONCATENATED MODULE: ./src/views/admin/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("tnEN")
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


/***/ })

});