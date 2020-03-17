webpackJsonp([23],{

/***/ "v86N":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

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
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  redirect,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_redirect = __webpack_exports__["default"] = (Component.exports);


/***/ })

});