webpackJsonp([22],{

/***/ "Sp6l":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/location/index.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var views_location = ({
  data: function data() {
    var _this = this;

    return {
      pickerOptionsStart: {
        disabledDate: function disabledDate(time) {
          if (_this.searchForm.end_time) {
            return time.getTime() > new Date(_this.searchForm.end_time).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: function disabledDate(time) {
          if (_this.searchForm.start_time) {
            return time.getTime() < new Date(_this.searchForm.start_time).getTime();
          }
        }
      },
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      companyList: [],
      objSelectLists: [],
      linTypeList: [],
      searchForm: {}
    };
  },
  created: function created() {
    this.getCompanyList();
    this.getLiTypeList();
    this.getDataList();
  },

  methods: {
    getCompanyList: function getCompanyList() {
      var _this2 = this;

      this.request({
        url: "/apply/getCompanyLists",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this2.companyList = data.data;
        }
      });
    },
    selectCompanyList: function selectCompanyList(val) {
      var _this3 = this;

      this.$set(this.searchForm, "name", "");
      this.request({
        url: "/user/getUserByDepart",
        method: "get",
        params: { id: val, type: 1 }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this3.objSelectLists = data.data;
        }
      });
    },
    getLiTypeList: function getLiTypeList() {
      var _this4 = this;

      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this4.linTypeList = data.data;
        }
      });
    },
    getDataList: function getDataList() {
      var _this5 = this;

      var page = this.page_cur;
      var depart_id = this.searchForm.depart_id;
      var name = this.searchForm.name;
      var line_type = this.searchForm.line_type;
      var start_time = this.searchForm.start_time;
      var end_time = this.searchForm.end_time;
      var start_flag = this.searchForm.start_flag;
      var start_length = this.searchForm.start_length;
      var end_flag = this.searchForm.end_flag;
      var end_length = this.searchForm.end_length;
      this.request({
        url: "/location/getLocationStatisticPages",
        method: "get",
        params: {
          page: page,
          depart_id: depart_id,
          name: name,
          line_type: line_type,
          start_time: start_time,
          end_time: end_time,
          start_flag: start_flag,
          start_length: start_length,
          end_flag: end_flag,
          end_length: end_length
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this5.dataList = data.data.data;
          _this5.page_cur = parseInt(data.data.current_page);
          _this5.pageTotal = data.data.total;
          _this5.page_size = data.data.per_page;
          _this5.page_total = data.data.last_page;
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
    searchEvent: function searchEvent() {
      this.page_cur = 1;
      this.getDataList();
    },
    resetSerach: function resetSerach() {
      this.searchForm = {
        depart_id: "",
        name: "",
        line_type: "",
        start_flag: "",
        start_length: "",
        end_flag: "",
        end_length: "",
        start_time: "",
        end_time: ""
      };
      this.getDataList();
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-78cd69b8","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/location/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"location"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"location","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("1xgB")}}),_vm._v("定位管理\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"location"}},[_vm._v("人员定位统计")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"walldetector"}},[_vm._v("墙壁探测器")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"cardetector"}},[_vm._v("车载探测器")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"locationbind"}},[_vm._v("定位从设备")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"device"}},[_vm._v("机具")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"model":_vm.searchForm,"inline":true}},[_c('el-form-item',{attrs:{"label":"公司名称"}},[_c('el-select',{attrs:{"placeholder":"请选择公司"},on:{"change":function($event){_vm.selectCompanyList($event)}},model:{value:(_vm.searchForm.depart_id),callback:function ($$v) {_vm.$set(_vm.searchForm, "depart_id", $$v)},expression:"searchForm.depart_id"}},_vm._l((_vm.companyList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"人员姓名"}},[_c('el-select',{attrs:{"placeholder":"请选择人员姓名","clearable":""},model:{value:(_vm.searchForm.name),callback:function ($$v) {_vm.$set(_vm.searchForm, "name", $$v)},expression:"searchForm.name"}},_vm._l((_vm.objSelectLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"线别"}},[_c('el-select',{attrs:{"placeholder":"请选择线别","clearable":""},model:{value:(_vm.searchForm.line_type),callback:function ($$v) {_vm.$set(_vm.searchForm, "line_type", $$v)},expression:"searchForm.line_type"}},_vm._l((_vm.linTypeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-inline",attrs:{"label":"开始位置"}},[_c('b',[_vm._v("DK")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"公里","title":"请输入数字","oninput":"value=value.replace(/[^\\d]/g,'')"},model:{value:(_vm.searchForm.start_flag),callback:function ($$v) {_vm.$set(_vm.searchForm, "start_flag", $$v)},expression:"searchForm.start_flag"}}),_vm._v(" "),_c('b',[_vm._v("+")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"米","title":"请输入数字","oninput":"value=value.replace(/[^\\d]/g,'')"},model:{value:(_vm.searchForm.start_length),callback:function ($$v) {_vm.$set(_vm.searchForm, "start_length", $$v)},expression:"searchForm.start_length"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-inline",attrs:{"label":"结束位置"}},[_c('b',[_vm._v("DK")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"公里","title":"请输入数字","oninput":"value=value.replace(/[^\\d]/g,'')"},model:{value:(_vm.searchForm.end_flag),callback:function ($$v) {_vm.$set(_vm.searchForm, "end_flag", $$v)},expression:"searchForm.end_flag"}}),_vm._v(" "),_c('b',[_vm._v("+")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"米","title":"请输入数字","oninput":"value=value.replace(/[^\\d]/g,'')"},model:{value:(_vm.searchForm.end_length),callback:function ($$v) {_vm.$set(_vm.searchForm, "end_length", $$v)},expression:"searchForm.end_length"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"开始时间"}},[_c('el-date-picker',{attrs:{"picker-options":_vm.pickerOptionsStart,"type":"date","clearable":""},model:{value:(_vm.searchForm.start_time),callback:function ($$v) {_vm.$set(_vm.searchForm, "start_time", $$v)},expression:"searchForm.start_time"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"结束时间"}},[_c('el-date-picker',{attrs:{"picker-options":_vm.pickerOptionsEnd,"type":"date","clearable":""},model:{value:(_vm.searchForm.end_time),callback:function ($$v) {_vm.$set(_vm.searchForm, "end_time", $$v)},expression:"searchForm.end_time"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-so"},[_c('label',{staticClass:"el-form-item__label"}),_vm._v(" "),_c('el-button',{attrs:{"size":"small","icon":"el-icon-search","type":"primary"},on:{"click":_vm.searchEvent}},[_vm._v("查询")]),_vm._v(" "),_c('el-button',{attrs:{"size":"small","plain":""},on:{"click":_vm.resetSerach}},[_vm._v("重置")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"prop":"id","label":"序号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"姓名"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"num","label":"在线时长"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"id","label":"出入场次数查询"}})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.pageTotal,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.pageToFirst}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.pageToLast}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1)])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_src_views_location = (esExports);
// CONCATENATED MODULE: ./src/views/location/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("nuvd")
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
  views_location,
  selectortype_template_index_0_src_views_location,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_location = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "ZzO/":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.app-page-select .el-form-item-inline .el-input--medium {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.app-page-select .el-form-item-inline input {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.app-page-select b{color: #999;\n}\n.dialog-loction .el-textarea__inner {\r\n  border: 1px #9db9fa solid;\r\n  color: #4b6eca;\r\n  height: 100px;\n}\n.dialog-loction .el-textarea {\r\n  width: 100% !important;\n}\n.dialog-loction .el-form-item__label {\r\n  width: 170px;\n}\n.dialog-loction .el-form-item__content {\r\n  margin-left: 170px;\n}\n.dialog-loction .el-select {\r\n  width: 100%;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "nuvd":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("ZzO/");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("8f8686fc", content, true);

/***/ })

});