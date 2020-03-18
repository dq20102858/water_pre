webpackJsonp([14],{

/***/ "N9RD":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.security-title {\r\n  background: #3655a5;\r\n  color: #fff;\r\n  border-bottom: none !important;\r\n  font-size: 18px;\r\n  border-radius: 6px 6px 0 0;\r\n  padding: 12px 0;\r\n  text-align: center;\n}\n#security .formbox {\r\n  padding: 50px 100px 30px 100px;\n}\n#security .el-textarea {\r\n  width: 100%;\n}\n#security .el-textarea__inner {\r\n  height: 100px;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "dLiW":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("N9RD");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("4789bbae", content, true);

/***/ }),

/***/ "h5Rs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/security/index.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var security = ({
  data: function data() {
    return {
      formData: {},
      formRules: {
        depart_id: [{ required: true, message: "请选择公司", trigger: "change" }],
        admin_id: [{ required: true, message: "请选择公司", trigger: "change" }],
        title: [{
          required: true,
          message: "请输入安全事件标题2~60个字符",
          trigger: "blur"
        }, { min: 2, max: 60, message: "长度在2到60个字符", trigger: "blur" }],
        address: [{
          required: true,
          message: "请输入安全事件标题2~60个字符",
          trigger: "blur"
        }, { min: 2, max: 60, message: "长度在2到60个字符", trigger: "blur" }],
        description: [{
          required: true,
          message: "请输入安全事件描述2~60个字符",
          trigger: "blur"
        }, { min: 2, max: 60, message: "长度在2到60个字符", trigger: "blur" }]
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },

  methods: {
    handleRemove: function handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview: function handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    addEvent: function addEvent() {
      var _this = this;

      this.$refs["formRulesForm"].validate(function (valid) {
        if (valid) {
          var data = _this.formData;
          console.log(data);
        }
      });
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-d5da4382","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/security/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"security"}},[_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"security-title"},[_vm._v("安全事件添加")]),_vm._v(" "),_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"formbox"},[_c('el-form',{ref:"formRulesForm",staticClass:"el-form-custom",attrs:{"label-width":"120px","label-position":"right","model":_vm.formData,"rules":_vm.formRules}},[_c('el-form-item',{attrs:{"label":"添加事件公司：","prop":"depart_id"}},[_c('el-select',{attrs:{"placeholder":"请选择活动区域"},model:{value:(_vm.formData.depart_id),callback:function ($$v) {_vm.$set(_vm.formData, "depart_id", $$v)},expression:"formData.depart_id"}},[_c('el-option',{attrs:{"label":"区域一","value":"shanghai"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"区域二","value":"beijing"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"人员：","prop":"admin_id"}},[_c('el-select',{attrs:{"placeholder":"请选择活动区域"},model:{value:(_vm.formData.admin_id),callback:function ($$v) {_vm.$set(_vm.formData, "admin_id", $$v)},expression:"formData.admin_id"}},[_c('el-option',{attrs:{"label":"区域一","value":"shanghai"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"区域二","value":"beijing"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"安全事件标题：","prop":"title"}},[_c('el-input',{model:{value:(_vm.formData.title),callback:function ($$v) {_vm.$set(_vm.formData, "title", $$v)},expression:"formData.title"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"安全事件地址：","prop":"address"}},[_c('el-input',{model:{value:(_vm.formData.address),callback:function ($$v) {_vm.$set(_vm.formData, "address", $$v)},expression:"formData.address"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"安全事件描述：","prop":"description"}},[_c('el-input',{attrs:{"type":"textarea"},model:{value:(_vm.formData.description),callback:function ($$v) {_vm.$set(_vm.formData, "description", $$v)},expression:"formData.description"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"相关图片："}},[_c('el-upload',{attrs:{"limit":"2","action":"http://129.211.168.161/upload/uploadFile","list-type":"picture-card","on-preview":_vm.handlePictureCardPreview,"on-remove":_vm.handleRemove}},[_c('i',{staticClass:"el-icon-plus"})]),_vm._v(" "),_c('el-dialog',{attrs:{"visible":_vm.dialogVisible},on:{"update:visible":function($event){_vm.dialogVisible=$event}}},[_c('img',{attrs:{"width":"100%","src":_vm.dialogImageUrl,"alt":""}})])],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.addEvent}},[_vm._v("信息确认无误，点击上传")])],1)],1)],1)])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_security = (esExports);
// CONCATENATED MODULE: ./src/views/security/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("dLiW")
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
  security,
  views_security,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_security = __webpack_exports__["default"] = (Component.exports);


/***/ })

});