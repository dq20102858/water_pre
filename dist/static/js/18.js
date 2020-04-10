webpackJsonp([18],{

/***/ "JXxd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/apply/conflictcheck.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var conflictcheck = ({
  name: "conflictcheck",
  data: function data() {
    return {
      projectName: "",
      dialogId: 0,
      dialogVisible: false,
      dialogRefuseVisible: false,
      checkList: []
    };
  },
  mounted: function mounted() {
    document.querySelector("#app-menu-items #menu_apply").classList.add("is-active");
  },
  created: function created() {
    this.projectName = localStorage.getItem("projectName");
    this.getconflictCheck();
  },

  methods: {
    getconflictCheck: function getconflictCheck() {
      var _this = this;

      var wid = wid;
      this.request({
        url: "/apply/conflictCheck",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this.checkList = data.data;
        }
      });
    },
    goApply: function goApply(id) {
      this.dialogVisible = true;
      this.dialogId = id;
      console.log(this.dialogId);
    },
    goRefuse: function goRefuse(id) {
      this.dialogRefuseVisible = true;
      this.dialogId = id;
      console.log(this.dialogId);
    },
    ApplyClick: function ApplyClick(id, status) {
      var _this2 = this;

      this.request({
        url: "/apply/changeStatus",
        method: "POST",
        data: { id: this.dialogId, status: status }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this2.$message({
            type: "success",
            message: "恭喜您，操作成功"
          });
          _this2.dialogVisible = false;
          _this2.dialogRefuseVisible = false;
          _this2.getconflictCheck();
        } else {
          // this.$message({
          //   type: "success",
          //   message: "审批失败"
          // });
        }
      });
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-a5709564","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/apply/conflictcheck.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app-apply"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","mode":"horizontal","default-active":"conflictcheck"}},[_c('li',{staticClass:"ptitle"},[_vm._v(_vm._s(_vm.projectName))]),_vm._v(" "),_c('el-submenu',{staticClass:"is-active",attrs:{"index":"1"}},[_c('template',{slot:"title"},[_vm._v("日班计划")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"daychart"}},[_vm._v("日班图表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"apply"}},[_vm._v("日班列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"conflictcheck"}},[_vm._v("冲突检测")])],2),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"weekplan"}},[_vm._v("周计划")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.checkList}},[_c('el-table-column',{attrs:{"prop":"company1","label":"公司名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"number1","label":"作业编号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company2","label":"公司名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"number2","label":"作业编号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"txt","label":"操作","width":"140"}})],1)],1)])]),_vm._v(" "),_c('el-dialog',{staticClass:"dialogVisible",attrs:{"title":"同意","visible":_vm.dialogVisible,"width":"300px","center":""},on:{"update:visible":function($event){_vm.dialogVisible=$event}}},[_c('span',[_vm._v("您确定同意此任务？")]),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.ApplyClick(_vm.dialogId,2)}}},[_vm._v("确定")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.dialogVisible=false}}},[_vm._v("关闭")])],1)]),_vm._v(" "),_c('el-dialog',{staticClass:"dialogVisible",attrs:{"title":"拒绝","visible":_vm.dialogRefuseVisible,"width":"300px","center":""},on:{"update:visible":function($event){_vm.dialogRefuseVisible=$event}}},[_c('span',[_vm._v("您确定拒绝此任务？")]),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.ApplyClick(_vm.dialogId,3)}}},[_vm._v("确定")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.dialogRefuseVisible=false}}},[_vm._v("关闭")])],1)])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"conftop"},[_c('h3',[_vm._v("冲突检测")]),_vm._v(" "),_c('span',[_c('em'),_vm._v("已批准\n        ")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var apply_conflictcheck = (esExports);
// CONCATENATED MODULE: ./src/views/apply/conflictcheck.vue
function injectStyle (ssrContext) {
  __webpack_require__("Ve2b")
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
  conflictcheck,
  apply_conflictcheck,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_apply_conflictcheck = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "Ve2b":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("tQIR");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("48647b6a", content, true);

/***/ }),

/***/ "tQIR":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.el-menu--collapse .el-menu .el-submenu,\r\n.el-menu--popup {\r\n  min-width: 124px;\r\n  text-align: center;\r\n  padding: 0;\n}\n.el-menu--horizontal .el-menu .el-menu-item.is-active,\r\n.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {\r\n  background: #4b6eca;\r\n  color: #fff;\n}\n.conftop {\r\n  padding-bottom: 15px;\n}\n.conftop h3 {\r\n  display: inline-block;\r\n  color: #4b6eca;\r\n  margin-right: 30px;\r\n  font-size: 16px;\n}\n.conftop span {\r\n  display: inline-block;\r\n  color: #999;\n}\n.conftop em {\r\n  background: #57cf27;\r\n  height: 16px;\r\n  width: 40px;\r\n  border-radius: 3px;\r\n  display: inline-block;\r\n  margin-right: 5px;\r\n  vertical-align: text-top;\n}\r\n", ""]);

// exports


/***/ })

});