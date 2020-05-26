webpackJsonp([5],{

/***/ "Rv23":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/search/index.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var search = ({
  data: function data() {
    return {
      searchForm: {},
      page_cur: 1,
      page_items: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      getLocomotiveList: []
    };
  },
  created: function created() {
    this.getLocomotiveLists();
    this.getDataList();
  },

  methods: {
    //选择机车
    getLocomotiveLists: function getLocomotiveLists() {
      var _this = this;

      this.request({
        url: "dispatch/getLocomotiveLists",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this.getLocomotiveList = data.data;
        }
      });
    },
    getDataList: function getDataList() {
      var _this2 = this;

      var page = this.page_cur;
      var loco_id = this.searchForm.loco_id;
      var alert_type = this.searchForm.alert_type;
      var start_time = this.searchForm.start_time;
      var end_time = this.searchForm.end_time;
      this.request({
        url: "/search/getAlertPages",
        method: "get",
        params: {
          page: page,
          loco_id: loco_id,
          alert_type: alert_type,
          start_time: start_time,
          end_time: end_time
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this2.dataList = data.data.data;
          _this2.page_cur = parseInt(data.data.current_page);
          _this2.page_items = data.data.total;
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
      this.page_cur = 1;
      this.getDataList();
    },
    pageToLast: function pageToLast() {
      this.page_cur = this.page_total;
      this.getDataList();
    },
    pageSearch: function pageSearch() {
      if (+this.searchForm.end_time < +this.searchForm.start_time) {
        this.$message.error('结束时间不能小于开始时间');
        return false;
      }
      this.page_cur = 1;
      this.getDataList();
    },
    resetSerach: function resetSerach() {
      this.searchForm = {};
      this.page_cur = 1;
      this.getDataList();
    },
    goDel: function goDel(id) {
      var _this3 = this;

      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this3.request({
          url: "/search/deleteAlert",
          method: "post",
          data: { id: id }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            _this3.$message({
              type: "success",
              message: "删除成功！"
            });
            _this3.getDataList();
          }
        });
      }).catch(function () {});
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-ce690da6","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/search/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"search"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"search","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("ZsIH")}}),_vm._v("查询统计\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"search"},on:{"click":_vm.resetSerach}},[_vm._v("报警查询")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"overspeed"}},[_vm._v("车辆超速处理")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"model":_vm.searchForm,"inline":true}},[_c('el-form-item',{attrs:{"label":"列车"}},[_c('el-select',{attrs:{"placeholder":"请选择列车","clearable":""},model:{value:(_vm.searchForm.loco_id),callback:function ($$v) {_vm.$set(_vm.searchForm, "loco_id", $$v)},expression:"searchForm.loco_id"}},_vm._l((_vm.getLocomotiveList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"类型"}},[_c('el-select',{attrs:{"placeholder":"请选择类型","clearable":""},model:{value:(_vm.searchForm.alert_type),callback:function ($$v) {_vm.$set(_vm.searchForm, "alert_type", $$v)},expression:"searchForm.alert_type"}},[_c('el-option',{attrs:{"label":"超速报警","value":"1"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"临近报警","value":"2"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"防区报警","value":"3"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"防护牌报警","value":"4"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"开始时间"}},[_c('el-date-picker',{attrs:{"type":"datetime","format":"yyyy-MM-dd HH:mm"},model:{value:(_vm.searchForm.start_time),callback:function ($$v) {_vm.$set(_vm.searchForm, "start_time", $$v)},expression:"searchForm.start_time"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"结束时间"}},[_c('el-date-picker',{attrs:{"type":"datetime","format":"yyyy-MM-dd HH:mm"},model:{value:(_vm.searchForm.end_time),callback:function ($$v) {_vm.$set(_vm.searchForm, "end_time", $$v)},expression:"searchForm.end_time"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-so"},[_c('label',{staticClass:"el-form-item__label"}),_vm._v(" "),_c('el-button',{attrs:{"size":"small","icon":"el-icon-search","type":"primary"},on:{"click":_vm.pageSearch}},[_vm._v("查询")]),_vm._v(" "),_c('el-button',{attrs:{"size":"small","plain":""},on:{"click":_vm.resetSerach}},[_vm._v("重置")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"label":"编号"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',[_vm._v(_vm._s(scope.$index+(_vm.page_cur - 1) * _vm.page_size + 1))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"loco","label":"机车名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"speed","label":"速度"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"位置"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('b',[_vm._v("DK")]),_vm._v("\n              "+_vm._s(scope.row.start_flag)+" + "+_vm._s(scope.row.start_length)+"\n            ")]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"line","label":"线别"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"报警类型"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.alert_type==1)?_c('span',[_vm._v("超速报警")]):_vm._e(),_vm._v(" "),(scope.row.alert_type==2)?_c('span',[_vm._v("临近报警")]):_vm._e(),_vm._v(" "),(scope.row.alert_type==3)?_c('span',[_vm._v("防区报警")]):_vm._e(),_vm._v(" "),(scope.row.alert_type==4)?_c('span',[_vm._v("防护牌报警")]):_vm._e()]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"报警时间","class-name":"time-warp-lens"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"description","label":"报警内容","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"70"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.goDel(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.page_items,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.pageToFirst}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.pageToLast}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1)])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_search = (esExports);
// CONCATENATED MODULE: ./src/views/search/index.vue
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  search,
  views_search,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_search = __webpack_exports__["default"] = (Component.exports);


/***/ })

});