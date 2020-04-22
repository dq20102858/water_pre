webpackJsonp([23],{

/***/ "4nWN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/location/cardetector.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var cardetector = ({
  data: function data() {
    return {
      diaLogFormVisible: false,
      diaLogTitle: "添加信息",
      detectorData: {},
      detectorRules: {
        name: [{
          required: true,
          message: "请输入设备名称2~20个字符",
          trigger: "blur"
        }, { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }, { pattern: /(^\S+).*(\S+$)/, message: "开始和结尾不能有空格", trigger: "blur" }],
        number: [{
          required: true,
          message: "请输入设备编号2~20个字符",
          trigger: "blur"
        }, { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }],
        depart_id: [{ required: true, message: "请选择公司", trigger: "change" }],
        loco_id: [{ required: true, message: "请选择所属列车", trigger: "change" }]
      },
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      companyList: [],
      trainList: []
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
    selectGetCompanyList: function selectGetCompanyList(val) {
      this.$set(this.detectorData, "loco_id", "");
      this.getTrainList(val);
    },
    resetDetectorData: function resetDetectorData() {},
    getTrainList: function getTrainList(id) {
      var _this2 = this;

      this.request({
        url: "/common/getLocosByDepart",
        method: "get",
        params: { depart_id: id, type: 1 }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this2.trainList = data.data;
        }
      });
    },
    getDataList: function getDataList() {
      var _this3 = this;

      var page = this.page_cur;
      this.request({
        url: "/location/getCarDetectorPages",
        method: "get",
        params: {
          page: page
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this3.dataList = data.data.data;
          _this3.page_cur = parseInt(data.data.current_page);
          _this3.pageTotal = data.data.total;
          _this3.page_size = data.data.per_page;
          _this3.page_total = data.data.last_page;
        }
      });
    },
    pageChange: function pageChange(value) {
      this.page_cur = value;
      this.getDataList();
    },
    toFirstPage: function toFirstPage() {
      this.pageChange(1);
    },
    toLastPage: function toLastPage() {
      this.page_cur = this.page_total;
      this.pageChange(this.page_total);
    },
    searchEvent: function searchEvent() {
      this.page_cur = 1;
      this.getDataList();
    },
    addDialogInfo: function addDialogInfo() {
      this.detectorData = {};
      this.diaLogTitle = "添加车载探测器信息";
      this.diaLogFormVisible = true;
    },
    addOrEditDialog: function addOrEditDialog() {
      var _this4 = this;

      this.$refs["detectorRulesForm"].validate(function (valid) {
        if (valid) {
          var data = _this4.detectorData;
          _this4.request({
            url: "/location/addOrEditCarDetector",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this4.diaLogFormVisible = false;
              _this4.detectorData.name = "";
              _this4.detectorData.description = "";
              _this4.getDataList();
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
    goEdit: function goEdit(id) {
      var _this5 = this;

      this.diaLogTitle = "修改车载探测器信息";
      this.diaLogFormVisible = true;
      this.request({
        url: "/location/getCarDetector",
        method: "get",
        params: { id: id }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this5.detectorData = data.data;
        }
      });
    },
    goDel: function goDel(id) {
      var _this6 = this;

      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this6.request({
          url: "/location/deleteCarDetector",
          method: "post",
          data: { id: id }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            _this6.$message({
              type: "success",
              message: "删除成功！"
            });
            _this6.getDataList();
          }
        });
      }).catch(function () {});
    },
    changeTime: function changeTime(time) {
      if (time !== null && time !== undefined && time !== "") {
        return "<span style='display:block'>" + time.substring(0, 10) + "</span><span style='display:block'>" + time.substring(time.length - 8) + "</span>";
      } else {
        return "";
      }
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-aca25518","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/location/cardetector.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"location"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"cardetector","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("1xgB")}}),_vm._v("定位管理\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"location"}},[_vm._v("人员定位统计")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"walldetector"}},[_vm._v("墙壁探测器")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"cardetector"}},[_vm._v("车载探测器")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"locationbind"}},[_vm._v("定位从设备")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"device"}},[_vm._v("机具")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.addDialogInfo}},[_vm._v("添加设备")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"prop":"id","label":"序号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"number","label":"设备编号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"loco","label":"所属列车"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.loco=='')?_c('span',[_vm._v("暂无列车")]):_c('span',[_vm._v(_vm._s(scope.row.loco))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"创建时间"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('p',{domProps:{"innerHTML":_vm._s(_vm.changeTime(scope.row.create_time))}})]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"update_time","label":"修改时间"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('p',{domProps:{"innerHTML":_vm._s(_vm.changeTime(scope.row.update_time))}})]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"120"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.goEdit(scope.row.id)}}},[_vm._v("修改")]),_vm._v(" "),_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.goDel(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.pageTotal,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.toFirstPage}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.toLastPage}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1)])]),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-car",attrs:{"width":"700px","close-on-click-modal":false,"title":this.diaLogTitle,"visible":_vm.diaLogFormVisible},on:{"update:visible":function($event){_vm.diaLogFormVisible=$event}}},[_c('el-form',{ref:"detectorRulesForm",staticClass:"el-form-custom",attrs:{"model":_vm.detectorData,"rules":_vm.detectorRules}},[_c('el-form-item',{attrs:{"label":"设备名称：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20","show-word-limit":""},model:{value:(_vm.detectorData.name),callback:function ($$v) {_vm.$set(_vm.detectorData, "name", $$v)},expression:"detectorData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"设备编号：","prop":"number"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20","show-word-limit":""},model:{value:(_vm.detectorData.number),callback:function ($$v) {_vm.$set(_vm.detectorData, "number", $$v)},expression:"detectorData.number"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"公司名称：","prop":"depart_id"}},[_c('el-select',{attrs:{"placeholder":"请选择公司"},on:{"change":function($event){_vm.selectGetCompanyList($event)}},model:{value:(_vm.detectorData.depart_id),callback:function ($$v) {_vm.$set(_vm.detectorData, "depart_id", $$v)},expression:"detectorData.depart_id"}},_vm._l((_vm.companyList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"所属列车","prop":"loco_id"}},[_c('el-select',{attrs:{"placeholder":"请选择","no-data-text":"暂无列车"},model:{value:(_vm.detectorData.loco_id),callback:function ($$v) {_vm.$set(_vm.detectorData, "loco_id", $$v)},expression:"detectorData.loco_id"}},_vm._l((_vm.trainList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('div',{staticClass:"blank"})],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.diaLogFormVisible = false}}},[_vm._v("关闭")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addOrEditDialog()}}},[_vm._v("确定")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var location_cardetector = (esExports);
// CONCATENATED MODULE: ./src/views/location/cardetector.vue
function injectStyle (ssrContext) {
  __webpack_require__("dUBF")
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
  cardetector,
  location_cardetector,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_location_cardetector = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "ZsF5":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.dialog-car .el-textarea__inner {\r\n  border: 1px #9db9fa solid;\r\n  color: #4b6eca;\r\n  height: 100px;\n}\n.dialog-car .el-textarea {\r\n  width: 100% !important;\n}\n.dialog-car .el-form-item__label {\r\n  width: 110px;\n}\n.dialog-car .el-form-item__content {\r\n  margin-left: 110px;\n}\n.dialog-car .el-form-item-inline .el-input--medium {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.dialog-car .el-form-item-inline input {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.dialog-car .el-select {\r\n  width: 100%;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "dUBF":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("ZsF5");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("198652b9", content, true);

/***/ })

});