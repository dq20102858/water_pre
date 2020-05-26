webpackJsonp([27],{

/***/ "9ky/":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("jklr");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("9ac52674", content, true);

/***/ }),

/***/ "Bx4V":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/set/process.vue
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

/* harmony default export */ var process = ({
  data: function data() {
    return {
      diaLogFormVisible: false,
      diaLogTitle: "添加信息",
      formData: {},
      formRules: {
        name: [{
          required: true,
          message: "请输入名称2~20个字符",
          trigger: "blur"
        }, { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }, {
          pattern: /(^\S+).*(\S+$)/,
          message: "开始和结尾不能有空格",
          trigger: "blur"
        }]
      },
      itemType: 4,
      dataItemList: [],
      dataWorkSortList: []
    };
  },
  created: function created() {
    this.getItemList();
    this.getWorkSortLists();
  },

  methods: {
    getItemList: function getItemList() {
      var _this = this;

      this.request({
        url: "/set/getItemLists",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this.dataItemList = data.data.data;
        }
      });
    },
    getWorkSortLists: function getWorkSortLists() {
      var _this2 = this;

      this.request({
        url: "/set/getWorkSortLists",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this2.dataWorkSortList = data.data.data;
        }
      });
    },
    goAdd: function goAdd(addtype) {
      var _this3 = this;

      this.formData = {
        name: ""
      };
      if (addtype == 4) {
        this.diaLogTitle = "添加项目信息";
      } else {
        this.diaLogTitle = "添加工序信息";
      }
      this.itemType = addtype;
      this.diaLogFormVisible = true;
      this.$nextTick(function () {
        _this3.$refs["formRules"].clearValidate();
      });
    },
    addOrEditDialog: function addOrEditDialog() {
      var _this4 = this;

      var that = this;
      this.$refs["formRules"].validate(function (valid) {
        if (valid) {
          var data = that.formData;
          that.formData.type = _this4.itemType;
          _this4.request({
            url: "/set/addItem",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this4.diaLogFormVisible = false;
              _this4.formData.name = "";
              _this4.getItemList();
              _this4.getWorkSortLists();
              _this4.$message({
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
    goDel: function goDel(id) {
      var _this5 = this;

      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this5.request({
          url: "/set/deleteItem",
          method: "post",
          data: { id: id }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            _this5.getItemList();
            _this5.getWorkSortLists();
            _this5.$message({
              type: "success",
              message: "删除成功！"
            });
          }
        });
      }).catch(function () {});
    }

    //

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4c49618e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/set/process.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"process"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"process","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("qyEk")}}),_vm._v("设置\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"set"}},[_vm._v("站点设置")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"speed"}},[_vm._v("限速设置")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"alerts"}},[_vm._v("防区设置")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"bridge"}},[_vm._v("桥设置")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"tunnel"}},[_vm._v("隧道设置")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"slope"}},[_vm._v("坡度设置")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"process"}},[_vm._v("项目工序")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('el-row',{attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":12}},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":function($event){_vm.goAdd(4)}}},[_vm._v("添加项目")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataItemList}},[_c('el-table-column',{attrs:{"label":"编号","prop":"id"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"68"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.goDel(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1)],1)])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":function($event){_vm.goAdd(5)}}},[_vm._v("添加工序")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataWorkSortList}},[_c('el-table-column',{attrs:{"label":"编号","prop":"id"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"68"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.goDel(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1)],1)])])],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-station",attrs:{"width":"400px","close-on-click-modal":false,"title":this.diaLogTitle,"visible":_vm.diaLogFormVisible},on:{"update:visible":function($event){_vm.diaLogFormVisible=$event}}},[_c('el-form',{ref:"formRules",staticClass:"el-form-custom",attrs:{"model":_vm.formData,"rules":_vm.formRules}},[_c('el-form-item',{attrs:{"label":"名称：","prop":"name","label-width":"70px"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20","show-word-limit":""},model:{value:(_vm.formData.name),callback:function ($$v) {_vm.$set(_vm.formData, "name", $$v)},expression:"formData.name"}})],1),_vm._v(" "),_c('div',{staticClass:"blank"})],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.diaLogFormVisible = false}}},[_vm._v("关闭")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addOrEditDialog()}}},[_vm._v("确定")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var set_process = (esExports);
// CONCATENATED MODULE: ./src/views/set/process.vue
function injectStyle (ssrContext) {
  __webpack_require__("9ky/")
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
  process,
  set_process,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_set_process = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "jklr":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n#process .app-page-container {\r\n  min-height: 680px;\n}\n.dialog-station .el-textarea__inner {\r\n  border: 1px #9db9fa solid;\r\n  color: #4b6eca;\r\n  height: 100px;\n}\n.dialog-station .el-textarea {\r\n  width: 100% !important;\n}\n.dialog-station .el-form-item__label {\r\n  width: 110px;\n}\n.dialog-station .el-form-item__content {\r\n  margin-left: 110px;\n}\n.dialog-station .el-form-item-inline .el-input--medium {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.dialog-station .el-form-item-inline input {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.dialog-station .el-select {\r\n  width: 100%;\n}\r\n", ""]);

// exports


/***/ })

});