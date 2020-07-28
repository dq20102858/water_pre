webpackJsonp([12],{

/***/ "+abo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/login/authredirect.vue

/* harmony default export */ var authredirect = ({
  name: "authredirect",
  created: function created() {
    var hash = window.location.search.slice(1);
    window.opener.location.href = window.location.origin + "/login#" + hash;
    window.close();
  }
});
// CONCATENATED MODULE: ./src/views/login/authredirect.vue
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
  authredirect,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var login_authredirect = __webpack_exports__["default"] = (Component.exports);


/***/ })

});