webpackJsonp([18],{

/***/ "6QbA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/location/locationbind.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var locationbind = ({
  data: function data() {
    return {
      activeIndex: 1,
      diaLogFormVisible: false,
      diaLogTitle: "添加信息",
      locationData: {},
      detectorRules: {
        depart_id: [{ required: true, message: "请选择公司", trigger: "change" }],
        name: [{
          required: true,
          message: "请输入设备名称2~30个字符",
          trigger: "blur"
        }, { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }],
        number: [{
          required: true,
          message: "请输入设备编号2~30个字符",
          trigger: "blur"
        }, { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }],
        loco_id: [{ required: true, message: "请选择所属列车", trigger: "change" }]
      },
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      companyList: [],
      linTypeList: [],
      searchForm: []
    };
  },
  created: function created() {
    this.getCompanyList();
    this.getLiTypeList();
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
    getLiTypeList: function getLiTypeList() {
      var _this2 = this;

      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this2.linTypeList = data.data;
        }
      });
    },
    searchEvent: function searchEvent() {
      this.page_cur = 1;
      this.getDataList();
    },
    getDataList: function getDataList() {
      var _this3 = this;

      var page = this.page_cur;
      var depart_id = this.searchForm.depart_id;
      var type = this.searchForm.type;
      var keyword = this.searchForm.keyword;
      this.request({
        url: "/location/getLocationBindPages",
        method: "get",
        params: {
          page: page,
          depart_id: depart_id,
          type: type,
          keyword: keyword
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
    addDialogInfo: function addDialogInfo() {
      this.locationData = [];
      this.diaLogTitle = "添加设备信息";
      this.diaLogFormVisible = true;
    },
    addOrEditDialog: function addOrEditDialog() {
      var _this4 = this;

      this.$refs["carDetectorForm"].validate(function (valid) {
        if (valid) {
          var data = _this4.locationData;
          _this4.request({
            url: "/location/addOrEditBind",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this4.diaLogFormVisible = false;
              _this4.locationData.name = "";
              _this4.locationData.description = "";
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

      this.title = "修改设备信息";
      this.diaLogFormVisible = true;
      this.request({
        url: "/location/localBindDetail",
        method: "get",
        params: { id: id }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this5.locationData = data.data;
        }
      });
    },
    goDel: function goDel(id) {
      var _this6 = this;

      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        _this6.request({
          url: "/location/deleteBind",
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
      });
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-245b4028","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/location/locationbind.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"location"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("1xgB")}}),_vm._v("定位管理\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"locationstatisticForm"}},[_vm._v("人员定位统计")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"2"}},[_vm._v("墙壁探测器")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"3"}},[_vm._v("车载探测器")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"4"}},[_vm._v("定位从设备")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"5"}},[_vm._v("机具")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"model":_vm.searchForm,"inline":true}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.addDialogInfo}},[_vm._v("添加设备")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"公司：","prop":"depart_id"}},[_c('el-select',{attrs:{"placeholder":"请选择公司","clearable":""},model:{value:(_vm.searchForm.depart_id),callback:function ($$v) {_vm.$set(_vm.searchForm, "depart_id", $$v)},expression:"searchForm.depart_id"}},_vm._l((_vm.linTypeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"类型","prop":"depart_id"}},[_c('el-select',{attrs:{"placeholder":"请选择公司","clearable":""},model:{value:(_vm.searchForm.depart_id),callback:function ($$v) {_vm.$set(_vm.searchForm, "depart_id", $$v)},expression:"searchForm.depart_id"}},_vm._l((_vm.linTypeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"编号或名称：","prop":"number"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.searchForm.number),callback:function ($$v) {_vm.$set(_vm.searchForm, "number", $$v)},expression:"searchForm.number"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-so"},[_c('label',{staticClass:"el-form-item__label"}),_vm._v(" "),_c('el-button',{attrs:{"size":"small","icon":"el-icon-search","type":"primary"},on:{"click":_vm.getDataList}},[_vm._v("查询")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"prop":"id","label":"序号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"number","label":"设备编号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"type","label":"类型"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"bind_obj","label":"被绑定对象"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"创建时间"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('p',{domProps:{"innerHTML":_vm._s(_vm.changeTime(scope.row.create_time))}})]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"update_time","label":"修改时间"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('p',{domProps:{"innerHTML":_vm._s(_vm.changeTime(scope.row.update_time))}})]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"140"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.goEdit(scope.row.id)}}},[_vm._v("修改")]),_vm._v(" "),_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.goDel(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.pageTotal,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.toFirstPage}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.toLastPage}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1)])]),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-car",attrs:{"width":"700px","close-on-click-modal":false,"title":this.diaLogTitle,"visible":_vm.diaLogFormVisible},on:{"update:visible":function($event){_vm.diaLogFormVisible=$event}}},[_c('el-form',{ref:"carDetectorForm",staticClass:"el-form-custom",attrs:{"model":_vm.locationData,"rules":_vm.detectorRules}},[_c('el-form-item',{attrs:{"label":"设备编号：","prop":"number"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.locationData.number),callback:function ($$v) {_vm.$set(_vm.locationData, "number", $$v)},expression:"locationData.number"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"设备类型：","prop":"type"}},[_c('el-select',{attrs:{"placeholder":"请选择","clearable":""},model:{value:(_vm.locationData.type),callback:function ($$v) {_vm.$set(_vm.locationData, "type", $$v)},expression:"locationData.type"}},[_c('el-option',{attrs:{"label":"人","value":"1"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"车","value":"2"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"机具","value":"3"}})],1)],1),_vm._v(" "),(_vm.locationData.type==1)?_c('div',[_c('el-form-item',{attrs:{"label":"所属部门：","prop":"type"}},[_c('el-select',{attrs:{"placeholder":"请选择","clearable":""},model:{value:(_vm.locationData.bumen),callback:function ($$v) {_vm.$set(_vm.locationData, "bumen", $$v)},expression:"locationData.bumen"}},[_c('el-option',{attrs:{"label":"人","value":"1"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"车","value":"2"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"机具","value":"3"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"所属职位：","prop":"type"}},[_c('el-select',{attrs:{"placeholder":"请选择","clearable":""},model:{value:(_vm.locationData.zhiwei),callback:function ($$v) {_vm.$set(_vm.locationData, "zhiwei", $$v)},expression:"locationData.zhiwei"}},[_c('el-option',{attrs:{"label":"人","value":"1"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"车","value":"2"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"机具","value":"3"}})],1)],1)],1):_vm._e(),_vm._v(" "),_c('el-form-item',{attrs:{"label":"所属公司：","prop":"depart_id"}},[_c('el-select',{attrs:{"placeholder":"请选择公司","clearable":""},model:{value:(_vm.locationData.depart_id),callback:function ($$v) {_vm.$set(_vm.locationData, "depart_id", $$v)},expression:"locationData.depart_id"}},_vm._l((_vm.companyList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"绑定对象：","prop":"bind_obj"}},[_c('el-select',{attrs:{"placeholder":"请选择","clearable":""},model:{value:(_vm.locationData.bind_obj),callback:function ($$v) {_vm.$set(_vm.locationData, "bind_obj", $$v)},expression:"locationData.bind_obj"}},[_c('el-option',{attrs:{"label":"人","value":"1"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"车","value":"2"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"机具","value":"3"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"blank"})],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.diaLogFormVisible = false}}},[_vm._v("关闭")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addOrEditDialog()}}},[_vm._v("确定")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var location_locationbind = (esExports);
// CONCATENATED MODULE: ./src/views/location/locationbind.vue
function injectStyle (ssrContext) {
  __webpack_require__("WUw+")
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
  locationbind,
  location_locationbind,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_location_locationbind = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "AU0N":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.dialog-car .el-textarea__inner {\r\n  border: 1px #9db9fa solid;\r\n  color: #4b6eca;\r\n  height: 100px;\n}\n.dialog-car .el-textarea {\r\n  width: 100% !important;\n}\n.dialog-car .el-form-item__label {\r\n  width: 170px;\n}\n.dialog-car .el-form-item__content {\r\n  margin-left: 170px;\n}\n.dialog-car .el-form-item-inline .el-input--medium {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.dialog-car .el-form-item-inline input {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.dialog-car .el-select {\r\n  width: 100%;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "WUw+":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("AU0N");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("b71a53d0", content, true);

/***/ })

});