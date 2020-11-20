webpackJsonp([10],{

/***/ "BpXX":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("BkJT")(false);
// imports


// module
exports.push([module.i, "\n.add-from {\r\n  width: 600px;\r\n  overflow: hidden;\n}\n.add-from .el-form-custom .el-form-item {\r\n  margin-bottom: 15px;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "st75":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.2@babel-loader/lib!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=script&index=0!./src/views/setmanage/warning.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var warning = ({
  data: function data() {
    return {
      formData: {},
      formRules: {
        ph: [{
          required: true,
          message: "请输入1-3位正数字并可保留两位小数点",
          trigger: "blur"
        }, {
          pattern: /^(|[1-9]\d{0,2})(\.\d{1,2})?$/,
          message: "请输入1-3位正数字并可保留两位小数点",
          trigger: "blur"
        }],
        max_ph: [{
          required: true,
          message: "请输入1-3位正数字并可保留两位小数点",
          trigger: "blur"
        }, {
          pattern: /^(|[1-9]\d{0,2})(\.\d{1,2})?$/,
          message: "请输入1-3位正数字并可保留两位小数点",
          trigger: "blur"
        }],
        do: [{
          required: true,
          message: "请输入1-3位正数字并可保留两位小数点",
          trigger: "blur"
        }, {
          pattern: /^(|[1-9]\d{0,2})(\.\d{1,2})?$/,
          message: "请输入1-3位正数字并可保留两位小数点",
          trigger: "blur"
        }],
        max_do: [{
          required: true,
          message: "请输入1-3位正数字并可保留两位小数点",
          trigger: "blur"
        }, {
          pattern: /^(|[1-9]\d{0,2})(\.\d{1,2})?$/,
          message: "请输入1-3位正数字并可保留两位小数点",
          trigger: "blur"
        }],
        conductivity: [{
          required: true,
          message: "请输入1-3位正数字并可保留两位小数点",
          trigger: "blur"
        }, {
          pattern: /^(|[1-9]\d{0,2})(\.\d{1,2})?$/,
          message: "请输入1-3位正数字并可保留两位小数点",
          trigger: "blur"
        }],
        max_conductivity: [{
          required: true,
          message: "请输入1-3位正数字并可保留两位小数点",
          trigger: "blur"
        }, {
          pattern: /^(|[1-9]\d{0,2})(\.\d{1,2})?$/,
          message: "请输入1-3位正数字并可保留两位小数点",
          trigger: "blur"
        }],
        level: [{
          required: true,
          message: "请输入液位",
          trigger: "blur"
        }, {
          pattern: /^(|[1-9]\d{0,2})(\.\d{1,2})?$/,
          message: "请输入1-3位正数字并可保留两位小数点",
          trigger: "blur"
        }]
      }
    };
  },
  created: function created() {
    this.getSetDetail();
  },

  methods: {
    addEventDialog: function addEventDialog() {
      var _this = this;

      var that = this;
      this.$refs["formRulesRef"].validate(function (valid) {
        if (valid) {
          var data = that.formData;

          if (parseFloat(that.formData.max_ph) < parseFloat(that.formData.ph)) {
            _this.$message({
              type: "error",
              message: "PH值：最小值不能大于最大值"
            });
            return false;
          }
          if (parseFloat(that.formData.max_do) < parseFloat(that.formData.do)) {
            _this.$message({
              type: "error",
              message: "DO值：最小值不能大于最大值"
            });
            return false;
          }
          if (parseFloat(that.formData.max_conductivity) < parseFloat(that.formData.conductivity)) {
            _this.$message({
              type: "error",
              message: "电导率值：最小值不能大于最大值"
            });
            return false;
          }
          _this.request({
            url: "/set/addOrUpdateSet",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this.getSetDetail();
              _this.$message({
                type: "success",
                message: "保存成功！"
              });
            }
          });
        } else {
          console.log("操作失败！");
          return false;
        }
      });
    },
    getSetDetail: function getSetDetail() {
      var _this2 = this;

      this.request({
        url: "/set/getSetDetail",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this2.formData = data.data;
        }
      });
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/_vue-loader@13.5.0@vue-loader/lib/template-compiler?{"id":"data-v-f33de756","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=template&index=0!./src/views/setmanage/warning.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-page-set-warm"},[_c('div',{staticClass:"app-page-rows"},[_c('div',{staticClass:"app-page-rows-left"},[_c('div',{staticClass:"left-menu-area"},[_c('h5',{staticClass:"atitle"},[_vm._v("系统设置")]),_vm._v(" "),_c('el-menu',{attrs:{"router":""}},[_c('el-menu-item',[_c('router-link',{attrs:{"to":"/setmanage"}},[_vm._v("人员管理")])],1),_vm._v(" "),_c('el-menu-item',[_c('router-link',{attrs:{"to":"/setmanage/site"}},[_vm._v("站点设置")])],1),_vm._v(" "),_c('el-menu-item',{staticClass:"active"},[_c('router-link',{attrs:{"to":"/setmanage/warning"}},[_vm._v("告警设置")])],1)],1)],1)]),_vm._v(" "),_c('div',{staticClass:"app-page-rows-right"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('h3',{staticClass:"ttitles"},[_vm._v("告警设置：设定一个最小值、一个最大值，当各项数值超过此范围时，系统发起告警")])])],1)],1),_vm._v(" "),_c('div',{staticClass:"add-from"},[_c('el-form',{ref:"formRulesRef",staticClass:"el-form-custom",attrs:{"model":_vm.formData,"rules":_vm.formRules,"label-width":"110px"}},[_c('el-form-item',{attrs:{"label":"PH：","required":""}},[_c('el-col',{attrs:{"span":11}},[_c('el-form-item',{attrs:{"prop":"ph"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.formData.ph),callback:function ($$v) {_vm.$set(_vm.formData, "ph", $$v)},expression:"formData.ph"}})],1)],1),_vm._v(" "),_c('el-col',{staticClass:"line",attrs:{"span":2}},[_vm._v("-")]),_vm._v(" "),_c('el-col',{attrs:{"span":11}},[_c('el-form-item',{attrs:{"prop":"max_ph"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.formData.max_ph),callback:function ($$v) {_vm.$set(_vm.formData, "max_ph", $$v)},expression:"formData.max_ph"}})],1)],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"DO：","required":""}},[_c('el-col',{attrs:{"span":11}},[_c('el-form-item',{attrs:{"prop":"do"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.formData.do),callback:function ($$v) {_vm.$set(_vm.formData, "do", $$v)},expression:"formData.do"}})],1)],1),_vm._v(" "),_c('el-col',{staticClass:"line",attrs:{"span":2}},[_vm._v("-")]),_vm._v(" "),_c('el-col',{attrs:{"span":11}},[_c('el-form-item',{attrs:{"prop":"max_do"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.formData.max_do),callback:function ($$v) {_vm.$set(_vm.formData, "max_do", $$v)},expression:"formData.max_do"}})],1)],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"电导率：","required":""}},[_c('el-col',{attrs:{"span":11}},[_c('el-form-item',{attrs:{"prop":"conductivity"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.formData.conductivity),callback:function ($$v) {_vm.$set(_vm.formData, "conductivity", $$v)},expression:"formData.conductivity"}})],1)],1),_vm._v(" "),_c('el-col',{staticClass:"line",attrs:{"span":2}},[_vm._v("-")]),_vm._v(" "),_c('el-col',{attrs:{"span":11}},[_c('el-form-item',{attrs:{"prop":"max_conductivity"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.formData.max_conductivity),callback:function ($$v) {_vm.$set(_vm.formData, "max_conductivity", $$v)},expression:"formData.max_conductivity"}})],1)],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"液位：","prop":"level"}},[_c('el-input',{model:{value:(_vm.formData.level),callback:function ($$v) {_vm.$set(_vm.formData, "level", $$v)},expression:"formData.level"}},[_c('template',{slot:"append"},[_vm._v("厘米")])],2)],1),_vm._v(" "),_c('el-form-item',[_c('br'),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.addEventDialog}},[_vm._v("确定")])],1)],1)],1)])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var setmanage_warning = (esExports);
// CONCATENATED MODULE: ./src/views/setmanage/warning.vue
function injectStyle (ssrContext) {
  __webpack_require__("tpZ0")
}
var normalizeComponent = __webpack_require__("/Xao")
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
  warning,
  setmanage_warning,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_setmanage_warning = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "tpZ0":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("BpXX");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("8bSs")("76810925", content, true);

/***/ })

});