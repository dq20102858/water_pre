webpackJsonp([13],{

/***/ "Cxi6":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.errPage-container[data-v-6841afea] {\n  width: 800px;\n  margin: 100px auto;\n}\n.errPage-container .pan-back-btn[data-v-6841afea] {\n    background: #008489;\n    color: #fff;\n}\n.errPage-container .pan-gif[data-v-6841afea] {\n    margin: 0 auto;\n    display: block;\n}\n.errPage-container .pan-img[data-v-6841afea] {\n    display: block;\n    margin: 0 auto;\n    width: 100%;\n}\n.errPage-container .text-jumbo[data-v-6841afea] {\n    font-size: 60px;\n    font-weight: 700;\n    color: #484848;\n}\n.errPage-container .list-unstyled[data-v-6841afea] {\n    font-size: 14px;\n}\n.errPage-container .list-unstyled li[data-v-6841afea] {\n      padding-bottom: 5px;\n}\n.errPage-container .list-unstyled a[data-v-6841afea] {\n      color: #008489;\n      text-decoration: none;\n}\n.errPage-container .list-unstyled a[data-v-6841afea]:hover {\n        text-decoration: underline;\n}\n", ""]);

// exports


/***/ }),

/***/ "eRLo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/assets/image/401.gif
var _01 = __webpack_require__("f8eB");
var _01_default = /*#__PURE__*/__webpack_require__.n(_01);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/errorPage/401.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var errorPage_401 = ({
  name: "page401",
  data: function data() {
    return {
      errGif: _01_default.a + "?" + +new Date(),
      ewizardClap: "https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646",
      dialogVisible: false
    };
  },

  methods: {
    back: function back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/collect" });
      } else {
        this.$router.go(-1);
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6841afea","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/errorPage/401.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"errPage-container"},[_c('el-button',{staticClass:"pan-back-btn",attrs:{"icon":"arrow-left"},on:{"click":_vm.back}},[_vm._v("返回")]),_vm._v(" "),_c('el-row',[_c('el-col',{attrs:{"span":12}},[_c('h1',{staticClass:"text-jumbo text-ginormous"},[_vm._v("Oops!")]),_vm._v("\n            gif来源\n            "),_c('a',{attrs:{"href":"/","target":"_blank"}},[_vm._v("airbnb")]),_vm._v(" 页面\n            "),_c('h2',[_vm._v("你没有权限去该页面")]),_vm._v(" "),_c('h6',[_vm._v("如有疑问请联系管理员")]),_vm._v(" "),_c('ul',{staticClass:"list-unstyled"},[_c('li',[_vm._v("或者你可以去:")]),_vm._v(" "),_c('li',{staticClass:"link-type"},[_c('router-link',{attrs:{"to":"/"}},[_vm._v("回首页")])],1),_vm._v(" "),_c('li',{staticClass:"link-type"},[_c('a',{attrs:{"href":"/"}},[_vm._v("随便看看")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.dialogVisible=true}}},[_vm._v("点我看图")])])])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('img',{attrs:{"src":_vm.errGif,"width":"313","height":"428","alt":"Girl has dropped her ice cream."}})])],1),_vm._v(" "),_c('el-dialog',{attrs:{"title":"随便看","visible":_vm.dialogVisible},on:{"update:visible":function($event){_vm.dialogVisible=$event}}},[_c('img',{staticClass:"pan-img",attrs:{"src":_vm.ewizardClap}})])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_errorPage_401 = (esExports);
// CONCATENATED MODULE: ./src/views/errorPage/401.vue
function injectStyle (ssrContext) {
  __webpack_require__("y7ah")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6841afea"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  errorPage_401,
  views_errorPage_401,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_errorPage_401 = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "f8eB":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/401.089007e.gif";

/***/ }),

/***/ "y7ah":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("Cxi6");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("54c0bccc", content, true);

/***/ })

});