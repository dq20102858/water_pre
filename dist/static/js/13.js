webpackJsonp([13],{

/***/ "/7rA":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("4Grd");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("356a9350", content, true);

/***/ }),

/***/ "4Grd":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n#descrip .descpcover img {\r\n  width: 100%;\r\n  height: auto;\r\n  border-radius: 6px;\n}\n#descrip .desctitle {\r\n  border-bottom: 1px #ddd solid;\r\n  font-size: 24px;\r\n  font-weight: 700;\r\n  text-align: center;\r\n  padding: 20px;\n}\n#descrip .content {\r\n  padding: 30px 0 100px 0;\r\n  font-size: 16px;\r\n  line-height: 31px;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "DAwy":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/introbg.1ac19ec.jpg";

/***/ }),

/***/ "ap+h":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/description/index.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var description = ({
  data: function data() {
    return {
      descData: ""
    };
  },
  created: function created() {
    this.getDescp();
  },

  methods: {
    getDescp: function getDescp() {
      var _this = this;

      this.request({
        url: "/common/getItemDetailV2",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this.descData = data.data;
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-69412a68","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/description/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"descrip"}},[_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"descpcover"},[_c('img',{attrs:{"src":__webpack_require__("DAwy")}})]),_vm._v(" "),_c('div',{staticClass:"descpconn"},[_c('div',{staticClass:"desctitle"},[_vm._v(_vm._s(_vm.descData.name))]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.descData.description))])])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_description = (esExports);
// CONCATENATED MODULE: ./src/views/description/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("/7rA")
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
  description,
  views_description,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_description = __webpack_exports__["default"] = (Component.exports);


/***/ })

});