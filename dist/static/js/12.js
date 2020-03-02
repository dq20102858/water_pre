webpackJsonp([12],{

<<<<<<< HEAD
/***/ "h5Rs":
=======
/***/ "v86N":
>>>>>>> a9f62a19db2bb48f558a31ab942bf539ab05d700
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

<<<<<<< HEAD
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/security/index.vue
//
//
//
//
//

/* harmony default export */ var security = ({
    data: function data() {
        return {};
    },

    methods: {}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0ec1b852","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/security/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"monitor"}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_security = (esExports);
// CONCATENATED MODULE: ./src/views/security/index.vue
=======
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/redirect/index.vue

/* harmony default export */ var redirect = ({
  beforeCreate: function beforeCreate() {
    var _$route = this.$route,
        params = _$route.params,
        query = _$route.query;
    var path = params.path;

    this.$router.replace({ path: '/' + path, query: query });
  },

  render: function render(h) {
    return h(); // avoid warning message
  }
});
// CONCATENATED MODULE: ./src/views/redirect/index.vue
>>>>>>> a9f62a19db2bb48f558a31ab942bf539ab05d700
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */
<<<<<<< HEAD

=======
var __vue_template__ = null
>>>>>>> a9f62a19db2bb48f558a31ab942bf539ab05d700
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
<<<<<<< HEAD
  security,
  views_security,
=======
  redirect,
  __vue_template__,
>>>>>>> a9f62a19db2bb48f558a31ab942bf539ab05d700
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

<<<<<<< HEAD
/* harmony default export */ var src_views_security = __webpack_exports__["default"] = (Component.exports);
=======
/* harmony default export */ var views_redirect = __webpack_exports__["default"] = (Component.exports);
>>>>>>> a9f62a19db2bb48f558a31ab942bf539ab05d700


/***/ })

});