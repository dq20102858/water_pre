webpackJsonp([17],{

/***/ "DnRQ":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.dialog-jiju .el-textarea__inner {\r\n  border: 1px #9db9fa solid;\r\n  color: #4b6eca;\r\n  height: 100px;\n}\n.dialog-jiju .el-textarea {\r\n  width: 100% !important;\n}\n.dialog-jiju .el-select {\r\n  width: 100%;\n}\n.dialog-jiju .el-form-item__label {\r\n  width: 110px;\n}\n.dialog-jiju .el-form-item__content {\r\n  margin-left: 110px;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "ZFGK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/location/device.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var device = ({
  data: function data() {
    return {
      diaLogFormVisible: false,
      diaLogTitle: "添加信息",
      companyList: [],
      deviceData: {},
      deviceRules: {
        depart_id: [{ required: true, message: "请选择公司", trigger: "change" }],
        name: [{
          required: true,
          message: "请输入机具名称2~20个字符",
          trigger: "blur"
        }, { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }],
        description: [{ min: 0, max: 50, message: "长度在0到50个字符", trigger: "blur" }]
      },
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      dataList: []
    };
  },
  mounted: function mounted() {
    document.querySelector("#app-menu-items #menu_location").classList.add("is-active");
  },
  created: function created() {
    this.getCompanyList();
    this.getDataList();
  },

  methods: {
    getCompanyList: function getCompanyList() {
      var _this = this;

      this.request({
        url: "/apply/getCompanyLists",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this.companyList = data.data;
        }
      });
    },
    getDataList: function getDataList() {
      var _this2 = this;

      var page = this.page_cur;
      this.request({
        url: "/location/getDevicePages",
        method: "get",
        params: {
          page: page
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this2.dataList = data.data.data;
          _this2.page_cur = parseInt(data.data.current_page);
          _this2.pageTotal = data.data.total;
          _this2.page_size = data.data.per_page;
          _this2.page_total = data.data.last_page;
        }
      });
    },
    pageChange: function pageChange(value) {
      this.page_cur = value;
      this.getDataList();
    },
    pageToFirst: function pageToFirst() {
      this.pageChange(1);
    },
    pageToLast: function pageToLast() {
      this.page_cur = this.page_total;
      this.pageChange(this.page_total);
    },
    addDialogInfo: function addDialogInfo() {
      this.deviceData = {
        depart_id: "",
        name: "",
        description: ""
      };
      this.diaLogTitle = "添加信息";
      this.diaLogFormVisible = true;
    },
    addOrEditDialog: function addOrEditDialog() {
      var _this3 = this;

      this.$refs["deviceForm"].validate(function (valid) {
        if (valid) {
          if (_this3.deviceData.description == "") {
            _this3.deviceData.description = "暂无";
          }
          var data = _this3.deviceData;
          _this3.request({
            url: "/location/addOrEditDevice",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this3.diaLogFormVisible = false;
              _this3.$message({
                type: "success",
                message: "保存成功！"
              });
              _this3.getDataList();
            }
          });
        } else {
          _this3.$message.error("操作失败！");
          return false;
        }
      });
    },
    goEdit: function goEdit(id) {
      var _this4 = this;

      this.diaLogTitle = "修改信息";
      this.diaLogFormVisible = true;
      this.request({
        url: "/location/getDevice",
        method: "get",
        params: { id: id }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this4.deviceData = data.data;
          if (data.data.description == "暂无") {
            _this4.deviceData.description = "";
          }
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
          url: "/location/deleteDevice",
          method: "post",
          data: { id: id }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            _this5.$message({
              type: "success",
              message: "删除成功！"
            });
            _this5.getDataList();
          }
        });
      }).catch(function () {});
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-d2d07536","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/location/device.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"location"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"device","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("1xgB")}}),_vm._v("定位管理\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"location"}},[_vm._v("人员定位统计")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"walldetector"}},[_vm._v("墙壁探测器")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"cardetector"}},[_vm._v("车载探测器")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"locationbind"}},[_vm._v("定位从设备")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"device"}},[_vm._v("机具")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.addDialogInfo}},[_vm._v("添加机具")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"prop":"id","label":"序号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"description","label":"详情","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"120"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.goEdit(scope.row.id)}}},[_vm._v("修改")]),_vm._v(" "),_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.goDel(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.pageTotal,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.pageToFirst}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.pageToLast}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1)])]),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-jiju",attrs:{"width":"700px","close-on-click-modal":false,"title":this.diaLogTitle,"visible":_vm.diaLogFormVisible},on:{"update:visible":function($event){_vm.diaLogFormVisible=$event}}},[_c('el-form',{ref:"deviceForm",staticClass:"el-form-custom",attrs:{"model":_vm.deviceData,"rules":_vm.deviceRules}},[_c('el-form-item',{attrs:{"label":"公司名称：","prop":"depart_id"}},[_c('el-select',{attrs:{"placeholder":"请选择公司","clearable":""},model:{value:(_vm.deviceData.depart_id),callback:function ($$v) {_vm.$set(_vm.deviceData, "depart_id", $$v)},expression:"deviceData.depart_id"}},_vm._l((_vm.companyList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"机具名称：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20","show-word-limit":""},model:{value:(_vm.deviceData.name),callback:function ($$v) {_vm.$set(_vm.deviceData, "name", $$v)},expression:"deviceData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"详情：","prop":"description"}},[_c('el-input',{attrs:{"type":"textarea","maxlength":"50","show-word-limit":""},model:{value:(_vm.deviceData.description),callback:function ($$v) {_vm.$set(_vm.deviceData, "description", $$v)},expression:"deviceData.description"}})],1),_vm._v(" "),_c('div',{staticClass:"blank"})],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.diaLogFormVisible = false}}},[_vm._v("关闭")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addOrEditDialog()}}},[_vm._v("确定")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var location_device = (esExports);
// CONCATENATED MODULE: ./src/views/location/device.vue
function injectStyle (ssrContext) {
  __webpack_require__("lyWs")
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
  device,
  location_device,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_location_device = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "lyWs":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("DnRQ");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("21f6edea", content, true);

/***/ })

});