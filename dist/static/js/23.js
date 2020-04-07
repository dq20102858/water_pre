webpackJsonp([23],{

/***/ "7xwm":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/admin/demo.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var demo = ({
  data: function data() {
    return {
      dialogVisible: false,
      uploadAction: "/upload/uploadFile",
      uploadFiveFlies: [],
      formData: []
    };
  },
  created: function created() {},

  methods: {
    handleRemove: function handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview: function handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;

      //
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-66f7c750","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/admin/demo.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"demo"}},[_c('el-upload',{staticClass:"uploader el-upload-list--picture-card",attrs:{"action":"#","list-type":"picture-card","auto-upload":false},scopedSlots:_vm._u([{key:"file",fn:function(ref){
var file = ref.file;
return _c('div',{},[_c('img',{staticClass:"el-upload-list__item-thumbnail",attrs:{"src":file.url,"alt":""}}),_vm._v(" "),_c('span',{staticClass:"el-upload-list__item-actions"},[_c('span',{staticClass:"el-upload-list__item-preview",on:{"click":function($event){_vm.handlePictureCardPreview(file)}}},[_c('i',{staticClass:"el-icon-zoom-in"})]),_vm._v(" "),(!_vm.disabled)?_c('span',{staticClass:"el-upload-list__item-delete",on:{"click":function($event){_vm.handleRemove(file)}}},[_c('i',{staticClass:"el-icon-delete"})]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"el-upload-list__item-input"},[_c('input',{staticClass:"ddd",attrs:{"placeholder":"dsfsdf"}})])])}}])},[_c('i',{staticClass:"el-icon-plus",attrs:{"slot":"default"},slot:"default"})]),_vm._v(" "),_c('el-dialog',{attrs:{"visible":_vm.dialogVisible},on:{"update:visible":function($event){_vm.dialogVisible=$event}}},[_c('img',{attrs:{"width":"100%","src":_vm.dialogImageUrl,"alt":""}})])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var admin_demo = (esExports);
// CONCATENATED MODULE: ./src/views/admin/demo.vue
function injectStyle (ssrContext) {
  __webpack_require__("uCpZ")
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
  demo,
  admin_demo,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_admin_demo = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "sOoj":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.el-upload-list__item-input {\r\n  position: absolute;\r\n  bottom: 0;\r\n  z-index: 999999;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "uCpZ":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("sOoj");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("cc7c26d0", content, true);

/***/ })

});