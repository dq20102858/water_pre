webpackJsonp([1],{

/***/ "9Ucv":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("ldCT");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("7234c9dc", content, true);

/***/ }),

/***/ "T+/8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/api/login/login.js + 1 modules
var login = __webpack_require__("owW+");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/login/index.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import { isvalidUsername } from '@/utils/validate'

/* harmony default export */ var views_login = ({
  name: "Login",
  data: function data() {
    var validatePassword = function validatePassword(rule, value, callback) {
      if (value.length < 6) {
        callback(new Error("密码长度大于6个字符"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        //username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: "blur", validator: validatePassword }]
      },
      passwordType: "password",
      loading: false,
      showDialog: false
    };
  },

  methods: {
    showPwd: function showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    handleLogin: function handleLogin() {
      var _this = this;

      this.$refs.loginForm.validate(function (valid) {
        if (valid) {
          _this.loading = true;
          _this.$store.dispatch("LoginByUsername", _this.loginForm).then(function () {
            _this.loading = false;
            _this.$router.push({ path: "/" });
          }).catch(function () {
            _this.loading = false;
            return false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created: function created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed: function destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-39298f16","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/login/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"login-container"},[_c('el-form',{ref:"loginForm",staticClass:"login-form",attrs:{"autoComplete":"on","model":_vm.loginForm,"rules":_vm.loginRules,"label-position":"left"}},[_c('div',{staticClass:"title-container"},[_c('h3',{staticClass:"title"},[_vm._v("系统登录")])]),_vm._v(" "),_c('el-form-item',{attrs:{"prop":"username"}},[_c('span',{staticClass:"svg-container svg-container_login"},[_c('i',{staticClass:"iconfont icon-zhanghu"})]),_vm._v(" "),_c('el-input',{attrs:{"name":"username","type":"text","autoComplete":"on","placeholder":"username"},model:{value:(_vm.loginForm.username),callback:function ($$v) {_vm.$set(_vm.loginForm, "username", $$v)},expression:"loginForm.username"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"prop":"password"}},[_c('span',{staticClass:"svg-container"},[_c('i',{staticClass:"iconfont icon-mima password"})]),_vm._v(" "),_c('el-input',{attrs:{"name":"password","type":_vm.passwordType,"autoComplete":"on","placeholder":"password"},nativeOn:{"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }_vm.handleLogin($event)}},model:{value:(_vm.loginForm.password),callback:function ($$v) {_vm.$set(_vm.loginForm, "password", $$v)},expression:"loginForm.password"}}),_vm._v(" "),_c('span',{staticClass:"show-pwd",on:{"click":_vm.showPwd}},[_c('i',{staticClass:"iconfont icon-yincangmima"})])],1),_vm._v(" "),_c('el-button',{staticStyle:{"width":"100%","margin-bottom":"30px"},attrs:{"type":"primary","loading":_vm.loading},nativeOn:{"click":function($event){$event.preventDefault();_vm.handleLogin($event)}}},[_vm._v("登录")])],1),_vm._v(" "),_c('el-dialog',{attrs:{"title":"第三方登录","visible":_vm.showDialog,"append-to-body":""},on:{"update:visible":function($event){_vm.showDialog=$event}}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_src_views_login = (esExports);
// CONCATENATED MODULE: ./src/views/login/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("9Ucv")
  __webpack_require__("hCth")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-39298f16"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  views_login,
  selectortype_template_index_0_src_views_login,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_login = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "ayW+":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.login-container[data-v-39298f16] {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  background-color: #2d3a4b;\n}\n.login-container .login-form[data-v-39298f16] {\n    position: absolute;\n    left: 0;\n    right: 0;\n    width: 520px;\n    padding: 35px 35px 15px 35px;\n    margin: 120px auto;\n}\n.login-container .tips[data-v-39298f16] {\n    font-size: 14px;\n    color: #fff;\n    margin-bottom: 10px;\n}\n.login-container .tips span[data-v-39298f16]:first-of-type {\n      margin-right: 16px;\n}\n.login-container .svg-container[data-v-39298f16] {\n    padding: 5px 5px 6px 10px;\n    color: #889aa4;\n    vertical-align: middle;\n    width: 30px;\n    display: inline-block;\n}\n.login-container .svg-container_login[data-v-39298f16] {\n      font-size: 20px;\n}\n.login-container .title-container[data-v-39298f16] {\n    position: relative;\n}\n.login-container .title-container .title[data-v-39298f16] {\n      font-size: 26px;\n      font-weight: 400;\n      color: #eee;\n      margin: 0px auto 40px auto;\n      text-align: center;\n      font-weight: bold;\n}\n.login-container .title-container .set-language[data-v-39298f16] {\n      color: #fff;\n      position: absolute;\n      top: 5px;\n      right: 0px;\n}\n.login-container .show-pwd[data-v-39298f16] {\n    position: absolute;\n    right: 10px;\n    top: 7px;\n    font-size: 16px;\n    color: #889aa4;\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.login-container .thirdparty-button[data-v-39298f16] {\n    position: absolute;\n    right: 35px;\n    bottom: 28px;\n}\n", ""]);

// exports


/***/ }),

/***/ "hCth":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("ayW+");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("76ba12bc", content, true);

/***/ }),

/***/ "ldCT":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "/* reset element-ui css */\n.login-container .menu-icon {\n  display: inline-block;\n  width: 14px;\n  height: 14px;\n  background: url(" + __webpack_require__("Ctr9") + ") center no-repeat;\n  background-size: 100% 100%;\n}\n.login-container .el-input {\n  display: inline-block;\n  height: 53px;\n  width: 85%;\n}\n.login-container .el-input input {\n    background: transparent;\n    border: 0px;\n    -webkit-appearance: none;\n    border-radius: 0px;\n    padding: 12px 5px 12px 15px;\n    color: #eee;\n    height: 53px;\n}\n.login-container .el-input input:-webkit-autofill {\n      -webkit-box-shadow: 0 0 0px 1000px #2d3a4b inset !important;\n      -webkit-text-fill-color: #fff !important;\n}\n.login-container .el-form-item {\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  color: #454545;\n}\n", ""]);

// exports


/***/ })

});