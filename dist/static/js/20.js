webpackJsonp([20],{

/***/ "f3wc":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("pjBO");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("65238163", content, true);

/***/ }),

/***/ "mz+a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/apply/weekplan.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var weekplan = ({
  name: "weekplan",
  data: function data() {
    return {
      printObj: {
        id: "#printWeek",
        popTitle: " ",
        extraCss: "",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      projectName: "",
      isParent: true,
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      companyList: [],
      weekid: 0,
      weekList: [],
      weekdailyList: [],
      searchForm: {
        depart_id: "",
        time_range: []
      },
      logDataList: [],
      workId: 0,
      dialogVisible: false,
      dialogRemak: "",
      dialogStatus: 1
    };
  },
  mounted: function mounted() {
    document.querySelector("#app-menu-items #menu_apply").classList.add("is-active");
  },
  created: function created() {
    this.projectName = localStorage.getItem("projectName");
    this.getCompanyList();
    this.getWeekList();
  },

  methods: {
    refpage: function refpage() {
      this.isParent = true;
      this.getWeekList();
    },
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
    getWeekList: function getWeekList() {
      var _this2 = this;

      var page = this.page_cur;
      var depart_id = this.searchForm.depart_id;
      var time_range = this.searchForm.time_range;
      this.request({
        url: "apply/getWeekLists",
        method: "get",
        params: {
          page: page,
          depart_id: depart_id,
          time_range: time_range
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this2.weekList = data.data.data;
          _this2.page_cur = parseInt(data.data.current_page);
          _this2.pageTotal = data.data.total;
          _this2.page_size = data.data.per_page;
          _this2.page_total = data.data.last_page;
        }
      });
    },
    pageChange: function pageChange(value) {
      this.page_cur = value;
      this.getWeekList();
    },
    toFirstPage: function toFirstPage() {
      this.pageChange(1);
    },
    toLastPage: function toLastPage() {
      this.page_cur = this.page_total;
      this.pageChange(this.page_total);
    },
    goDetail: function goDetail(id) {
      var _this3 = this;

      this.isParent = false;
      var wid = id;
      this.request({
        url: "/apply/getWeekDailyLists",
        method: "get",
        params: { wid: wid }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this3.weekdailyList = data.data;
          _this3.weekid = id;
        }
      });
    },
    goBack: function goBack() {
      this.isParent = true;
    },
    dateFormat: function dateFormat(cellValue) {
      return ""; // this.formatDate(cellValue)
    },
    applyInfo: function applyInfo() {
      this.dialogVisible = true;
      this.dialogRemak = "";
    },
    applyEvent: function applyEvent() {
      var _this4 = this;

      var wid = this.weekid;
      var status = this.dialogStatus;
      var reason = this.dialogRemak;
      this.request({
        url: "/apply/checkStatus",
        method: "post",
        data: { wid: wid, status: status, reason: reason }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this4.$message({
            type: "success",
            message: "审核成功！"
          });
          _this4.dialogVisible = false;
          _this4.goDetail(wid);
          _this4.getWeekList();
        }
      });
    },
    getWeek: function getWeek(t) {
      t = new Date(t);
      if (t == undefined) {
        t = new Date();
      } else if (t instanceof Date) {
        var _t = new Date();
        _t.setYear(t.getFullYear());
        _t.setMonth(t.getMonth());
        _t.setDate(t.getDate());
        var date1 = _t.getDate(); //给定的日期是几号
        _t.setDate(1);
        var d = _t.getDay(); //1. 得到当前的1号是星期几。
        var fisrtWeekend = d;
        if (d == 0) {
          fisrtWeekend = 1;
          //1号就是星期天
        } else {
          fisrtWeekend = 7 - d + 1; //第一周的周未是几号
        }
        if (date1 <= fisrtWeekend) {
          return t.getMonth() + 1 + "月第 1周";
        } else {
          var weeks = 1 + Math.ceil((date1 - fisrtWeekend) / 7);
          return t.getMonth() + 1 + "月第" + weeks + "周";
        }
      } else {
        throw "getFormatDate - error : 你的参数不是日期类型，也不是为空";
      }
    },
    getLogList: function getLogList(id) {
      var _this5 = this;

      this.logDataList = [];
      this.request({
        url: "/apply/getWeeekLogs",
        method: "get",
        params: { wid: id }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this5.logDataList = data.data;
          //this.logDataList = data.data.toString();
        }
      });
    }
    //end

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-709fd702","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/apply/weekplan.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app-weekplan"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"weekplan","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_vm._v(_vm._s(_vm.projectName))]),_vm._v(" "),_c('el-submenu',{attrs:{"index":"1"}},[_c('template',{staticStyle:{"font-size":"16px"},slot:"title"},[_vm._v("日班计划")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"daychart"}},[_vm._v("日班图表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"apply"}},[_vm._v("日班列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"conflictcheck"}},[_vm._v("冲突检测")])],2),_vm._v(" "),_c('el-menu-item',{staticClass:"is-active",on:{"click":_vm.refpage}},[_vm._v("周计划")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[(_vm.isParent)?_c('div',[_c('div',{staticClass:"app-page-container-other"},[_c('div',{staticClass:"app-page-select",staticStyle:{"margin":"10px 0"}},[_c('el-form',{attrs:{"model":_vm.searchForm,"inline":true}},[_c('el-form-item',{attrs:{"label":"选择时间"}},[_c('el-date-picker',{attrs:{"type":"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","default-time":['00:00:00', '23:59:59']},model:{value:(_vm.searchForm.time_range),callback:function ($$v) {_vm.$set(_vm.searchForm, "time_range", $$v)},expression:"searchForm.time_range"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"选择公司"}},[_c('el-select',{attrs:{"placeholder":"请选择公司","clearable":""},model:{value:(_vm.searchForm.depart_id),callback:function ($$v) {_vm.$set(_vm.searchForm, "depart_id", $$v)},expression:"searchForm.depart_id"}},_vm._l((_vm.companyList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-so"},[_c('label',{staticClass:"el-form-item__label"}),_vm._v(" "),_c('el-button',{attrs:{"size":"small","icon":"el-icon-search","type":"primary"},on:{"click":_vm.getWeekList}},[_vm._v("查询")])],1)],1)],1),_vm._v(" "),(_vm.weekList.length>0)?_c('el-row',{attrs:{"gutter":20}},_vm._l((_vm.weekList),function(item){return _c('el-col',{key:item.id,attrs:{"span":6}},[_c('div',{staticClass:"grid-content"},[_c('div',{staticClass:"grid-title"},[_vm._v("\n                  "+_vm._s(_vm.getWeek(item.start_time))+"\n                  "),_c('div',{staticClass:"tright"},[_c('el-popover',{attrs:{"popper-class":"status-popover","placement":"bottom","width":"420","trigger":"click"},on:{"show":function($event){_vm.getLogList(item.id)}}},[_c('div',{staticClass:"status-popovers"},[_c('ul',{staticClass:"layui-timeline"},_vm._l((_vm.logDataList),function(item){return _c('li',{key:item.id,staticClass:"layui-timeline-item"},[_c('i',{staticClass:"el-icon-s-promotion"}),_vm._v(" "),_c('div',{staticClass:"layui-timeline-content layui-text"},[_c('h3',{staticClass:"layui-timeline-title"},[_vm._v(_vm._s(item.create_time+' '+ item.remark))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(item.reason))])])])}))]),_vm._v(" "),(item.status==1)?_c('el-tag',{staticClass:"statuse1",attrs:{"slot":"reference","title":"点击查看更多"},slot:"reference"},[_vm._v("待审核")]):_vm._e(),_vm._v(" "),(item.status==2)?_c('el-tag',{staticClass:"statuse2",attrs:{"slot":"reference","title":"点击查看更多"},slot:"reference"},[_vm._v("审核通过")]):_vm._e(),_vm._v(" "),(item.status==3)?_c('el-tag',{staticClass:"statuse3",attrs:{"slot":"reference","title":"点击查看更多"},slot:"reference"},[_vm._v("拒绝")]):_vm._e(),_vm._v(" "),(item.status==5)?_c('el-tag',{staticClass:"statuse5",attrs:{"slot":"reference","title":"点击查看更多"},slot:"reference"},[_vm._v("审核中")]):_vm._e()],1)],1)]),_vm._v(" "),_c('div',{staticClass:"grid-box"},[_c('p',[_vm._v("申报人员："+_vm._s(item.apply))]),_vm._v(" "),_c('p',[_vm._v("申报单位："+_vm._s(item.company))]),_vm._v(" "),_c('p',[_vm._v("申报时间："+_vm._s(item.start_time)+" ~ "+_vm._s(item.end_time))]),_vm._v(" "),_c('p',[_c('b',{on:{"click":function($event){_vm.goDetail(item.id)}}},[_vm._v("查看周计划")])])])])])})):_c('div',{staticStyle:{"font-size":"14px","text-align":"center","line-height":"50px","color":"#909399"}},[_vm._v("暂无数据")]),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.weekList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.pageTotal,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.toFirstPage}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.toLastPage}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1)]):_vm._e(),_vm._v(" "),(!_vm.isParent)?_c('div',{staticClass:"wdetail"},[_c('div',{staticClass:"wtop"},[_c('span',{staticClass:"item",attrs:{"title":_vm.weekdailyList.company}},[_c('b',[_vm._v("作业单位：")]),_vm._v("\n            "+_vm._s(_vm.weekdailyList.company)+"\n          ")]),_vm._v(" "),_c('span',{staticClass:"item"},[_c('b',[_vm._v("申报时间：")]),_vm._v("\n            "+_vm._s(_vm.weekdailyList.create_time)+"\n          ")]),_vm._v(" "),_c('span',{staticClass:"item"},[_c('b',[_vm._v("申报人：")]),_vm._v("\n            "+_vm._s(_vm.weekdailyList.apply)+"\n          ")]),_vm._v(" "),_c('span',{staticClass:"item"},[_c('b',[_vm._v("电话：")]),_vm._v("\n            "+_vm._s(_vm.weekdailyList.phone)+"\n          ")]),_vm._v(" "),_c('span',{staticClass:"itembtn"},[_c('el-button',{attrs:{"size":"small","type":"primary"},on:{"click":_vm.goBack}},[_vm._v("返回")]),_vm._v(" "),(_vm.weekdailyList.flag==1)?_c('el-button',{attrs:{"size":"small","type":"primary"},on:{"click":function($event){_vm.applyInfo()}}},[_vm._v("审核")]):_vm._e(),_vm._v(" "),_c('el-button',{directives:[{name:"print",rawName:"v-print",value:(_vm.printObj),expression:"printObj"}],staticClass:"redbtn",attrs:{"size":"small"}},[_vm._v("打印")])],1)]),_vm._v(" "),_c('div',{staticClass:"wmain"},[_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.weekdailyList.lists}},[_c('el-table-column',{attrs:{"prop":"work_time","label":"日期"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',[_vm._v(_vm._s(_vm._f("formatDate")(scope.row.work_time)))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"type","label":"作业类别"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"detail_time","min-width":"60","label":"作业时间"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"description","label":"作业内容"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"area","label":"作业区域"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"up_part","label":"编组上行端"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"location","label":"装车地"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"attention","label":"防护措施及要求"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"remark","label":"备注"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.remark=='')?_c('span',{staticClass:"statused"},[_vm._v("暂无备注")]):_vm._e(),_vm._v(" "),_c('span',{staticClass:"statused",attrs:{"else":""}},[_vm._v(_vm._s(scope.row.remark))])]}}])})],1)],1)]),_vm._v(" "),_vm._m(0)]):_vm._e(),_vm._v(" "),_c('div',{attrs:{"id":"printWeek"}},[_c('div',{staticClass:"printtop"},[_c('h3',[_vm._v(_vm._s(_vm.weekdailyList.company))]),_vm._v(" "),_c('span',[_vm._v("申报时间： "+_vm._s(_vm.weekdailyList.create_time))]),_vm._v(" "),_c('span',[_vm._v("申报人： "+_vm._s(_vm.weekdailyList.apply))]),_vm._v(" "),_c('span',[_vm._v("电话："+_vm._s(_vm.weekdailyList.phone))])]),_vm._v(" "),_c('div',{staticClass:"printcenter"},_vm._l((_vm.weekdailyList.lists),function(item){return _c('div',{key:item.id,staticClass:"items"},[_c('div',{staticClass:"infotitle"},[_vm._v(_vm._s(_vm._f("formatDate")(item.work_time)))]),_vm._v(" "),_c('div',{staticClass:"info"},[_c('b',[_vm._v("作业类别")]),_vm._v("\n              "+_vm._s(item.type)+"\n            ")]),_vm._v(" "),_c('div',{staticClass:"info"},[_c('b',[_vm._v("作业时间")]),_vm._v("\n              "+_vm._s(item.detail_time)+"\n            ")]),_vm._v(" "),_c('div',{staticClass:"info"},[_c('b',[_vm._v("作业内容")]),_vm._v("\n              "+_vm._s(item.description)+"\n            ")]),_vm._v(" "),_c('div',{staticClass:"info"},[_c('b',[_vm._v("作业区域")]),_vm._v("\n              "+_vm._s(item.area)+"\n            ")]),_vm._v(" "),_c('div',{staticClass:"info"},[_c('b',[_vm._v("编组上行端")]),_vm._v("\n              "+_vm._s(item.up_part)+"\n            ")]),_vm._v(" "),_c('div',{staticClass:"info"},[_c('b',[_vm._v("装车地")]),_vm._v("\n              "+_vm._s(item.location)+"\n            ")]),_vm._v(" "),_c('div',{staticClass:"info"},[_c('b',[_vm._v("防护措施及要求")]),_vm._v("\n              "+_vm._s(item.attention)+"\n            ")]),_vm._v(" "),_c('div',{staticClass:"info"},[_c('b',[_vm._v("备注")]),_vm._v("\n              "+_vm._s(item.remark)+"\n            ")])])})),_vm._v(" "),_vm._m(1)])])]),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-weekplan",attrs:{"width":"600px","close-on-click-modal":false,"title":"审核信息","visible":_vm.dialogVisible},on:{"update:visible":function($event){_vm.dialogVisible=$event}}},[_c('el-form',{staticClass:"el-form-custom"},[_c('el-form-item',{attrs:{"label":"审核状态："}},[_c('el-radio',{attrs:{"label":1},model:{value:(_vm.dialogStatus),callback:function ($$v) {_vm.dialogStatus=$$v},expression:"dialogStatus"}},[_vm._v("审核通过")]),_vm._v(" "),_c('el-radio',{attrs:{"label":2},model:{value:(_vm.dialogStatus),callback:function ($$v) {_vm.dialogStatus=$$v},expression:"dialogStatus"}},[_vm._v("审核不通过")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"审批建议："}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea","maxlength":"100","show-word-limit":""},model:{value:(_vm.dialogRemak),callback:function ($$v) {_vm.dialogRemak=$$v},expression:"dialogRemak"}})],1),_vm._v(" "),_c('div',{staticClass:"blank"})],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.dialogVisible = false}}},[_vm._v("关闭")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.applyEvent}},[_vm._v("确定")])],1)],1)],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wfoot"},[_c('span',[_vm._v("注：监理需对此项施工或运输的相关条件（如材料设备已到位，边界条件已满足等），进行确认。")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"printbom"},[_c('p',[_vm._v("注：监理需对此项施工或运输的相关条件（如材料设备已到位，边界条件已满足等），进行确认。")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var apply_weekplan = (esExports);
// CONCATENATED MODULE: ./src/views/apply/weekplan.vue
function injectStyle (ssrContext) {
  __webpack_require__("f3wc")
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
  weekplan,
  apply_weekplan,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_apply_weekplan = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "pjBO":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n#app-weekplan .el-row {\r\n  margin-bottom: 20px;\n}\n#app-weekplan .el-col {\r\n  border-radius: 4px;\n}\n.grid-content {\r\n  border-radius: 4px;\r\n  min-height: 36px;\r\n  background: #fff;\r\n  margin-bottom: 20px;\n}\n.grid-content .grid-title {\r\n  color: #fff;\r\n  background: #3655a5;\r\n  font-size: 16px;\r\n  height: 40px;\r\n  line-height: 40px;\r\n  border-radius: 6px 6px 0 0;\r\n  padding-left: 20px;\r\n  text-align: left;\r\n  font-weight: 700;\n}\n.grid-content .grid-title .tright {\r\n  float: right;\r\n  padding-right: 10px;\n}\n.grid-content .grid-title .tright .el-tag {\r\n  background: none !important;\r\n  padding: 0 10px;\r\n  cursor: pointer;\r\n  font-size: 14px;\r\n  font-weight: 500;\n}\n.grid-content .grid-box {\r\n  padding: 20px;\r\n  border: 1px #3655a5 solid;\r\n  border-radius: 0 0 6px 6px;\r\n  overflow: hidden;\n}\n.grid-content .grid-box p {\r\n  color: #4b6eca;\r\n  line-height: 28px;\r\n  font-size: 16px;\n}\n.grid-content .grid-box b {\r\n  text-align: center;\r\n  display: block;\r\n  border: 1px #4b6eca solid;\r\n  color: #4b6eca;\r\n  border-radius: 24px;\r\n  font-size: 15px;\r\n  width: 120px;\r\n  margin: 10px auto 0 auto;\n}\n.grid-content .grid-box:hover {\r\n  background: #fafafa;\r\n  -webkit-box-shadow: 1px 2px 10px 0 rgba(54, 85, 222, 0.3);\r\n          box-shadow: 1px 2px 10px 0 rgba(54, 85, 222, 0.3);\r\n  cursor: pointer;\n}\n.wmain .el-table {\r\n  background: #fff;\n}\n.wtop {\r\n  margin-bottom: 15px;\r\n  overflow: hidden;\n}\n.wtop .item {\r\n  color: #4b6eca;\r\n  display: inline-block;\r\n  margin-right: 30px;\r\n  font-size: 16px;\r\n  padding-top: 5px;\n}\n.wtop .item b {\r\n  color: #1d397a;\r\n  font-weight: 500;\n}\n.wtop .itembtn {\r\n  float: right;\n}\n.wfoot {\r\n  margin-top: 20px;\r\n  overflow: hidden;\r\n  font-size: 14px;\n}\n.wfoot span {\r\n  color: #4b6eca;\r\n  display: inline-block;\n}\n.wfoot .fr {\r\n  float: right;\n}\n.wfoot .fr b {\r\n  color: #1d397a;\r\n  font-weight: 500;\n}\n.wfoot .fr span {\r\n  margin-left: 24px;\n}\n#printWeek {\r\n  display: none;\n}\n.printtop {\r\n  padding-bottom: 20px;\r\n  overflow: hidden;\r\n  text-align: center;\n}\n.printtop h3 {\r\n  font-size: 22px;\r\n  font-weight: 700;\r\n  color: #1d397a;\n}\n.printtop span {\r\n  color: #4b6eca;\r\n  font-size: 16px;\r\n  line-height: 31px;\r\n  margin: 0 10px;\n}\n.printcenter {\r\n  line-height: 31px;\n}\n.printcenter .items {\r\n  margin-bottom: 40px;\r\n  color: #1d397a;\n}\n.printcenter .items b {\r\n  width: 115px;\r\n  display: inline-block;\r\n  color: #1d397a;\n}\n.printcenter .items .infotitle {\r\n  font-size: 19px;\r\n  font-weight: 700;\r\n  color: #1d397a;\n}\n.printbom {\r\n  overflow: hidden;\n}\n.printbom p {\r\n  color: #4b6eca;\r\n  font-size: 16px;\r\n  display: block;\r\n  line-height: 31px;\n}\n.printbom span {\r\n  float: right;\r\n  color: #4b6eca;\r\n  font-size: 16px;\r\n  margin-left: 30px;\r\n  margin-top: 15px;\n}\n@media print {\n#printWeek {\r\n    display: block;\n}\n#printWeek table {\r\n    border-collapse: collapse;\r\n    width: 100%;\n}\n#printWeek table td {\r\n    border: 1px solid #9db9fa;\r\n    line-height: 30px;\r\n    padding: 10px;\n}\nundefined {\r\n    display: none;\n}\n}\n.wtop .redbtn {\r\n  background: #ff5c75;\r\n  border-color: #ff5c75;\r\n  color: #fff;\n}\n#app-weekplan .statuse2 {\r\n  color: #10cc39;\r\n  border: none;\n}\n#app-weekplan .statuse3 {\r\n  color: #ff5c75;\r\n  border: none;\r\n  border: 0;\n}\n#app-weekplan .statuse1 {\r\n  color: #ff0;\r\n  border: none;\n}\n#app-weekplan .statuse5 {\r\n  color: #9db9fa;\r\n  border: none;\n}\n.dialog-weekplan .el-textarea {\r\n  width: 100% !important;\n}\n.dialog-weekplan .el-textarea__inner {\r\n  height: 120px;\n}\n.dialog-weekplan .el-form-item__label {\r\n  width: 110px;\n}\n.dialog-weekplan .el-form-item__content {\r\n  margin-left: 110px;\n}\n.dialog-weekplan .el-input--medium {\r\n  width: 100%;\n}\n.dialog-weekplan .el-select {\r\n  width: 100%;\n}\r\n/* */\n.status-popovers {\r\n  height: 300px;\r\n  overflow-y: auto;\n}\n.status-popover.el-popover {\r\n  border: 1px solid #9db9fa;\r\n  -webkit-box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.3);\r\n          box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.3);\r\n  word-break: break-all;\n}\n.status-popover .popper__arrow::after {\r\n  top: -0.2px !important;\r\n  margin-left: -6px;\r\n  border-bottom-color: #9db9fa !important;\n}\r\n/** */\n.layui-timeline {\r\n  padding-left: 5px;\n}\n.layui-timeline-item {\r\n  position: relative;\r\n  padding-bottom: 10px;\n}\n.layui-timeline-item i {\r\n  position: absolute;\r\n  left: -5px;\r\n  top: 2px;\r\n  z-index: 10;\r\n  width: 20px;\r\n  height: 20px;\r\n  line-height: 20px;\r\n  background-color: #fff;\r\n  color: #c0c0c0;\r\n  border-radius: 50%;\r\n  text-align: center;\r\n  cursor: pointer;\r\n  font-size: 22px;\n}\n.layui-timeline-axis:hover {\r\n  color: #ff5722;\n}\n.layui-timeline-item:last-child:before {\r\n  display: none;\n}\n.layui-timeline-item:first-child:before {\r\n  display: block;\n}\n.layui-timeline-content {\r\n  padding-left: 25px;\r\n  padding-right: 15px;\n}\n.layui-timeline-content p {\r\n  color: #777;\n}\n.layui-timeline-title {\r\n  position: relative;\r\n  margin-bottom: 5px;\r\n  font-size: 15px;\n}\n.layui-timeline-item::before {\r\n  content: \"\";\r\n  position: absolute;\r\n  left: 5px;\r\n  top: 0;\r\n  z-index: 0;\r\n  width: 1px;\r\n  height: 100%;\r\n  background-color: #e6e6e6;\n}\r\n", ""]);

// exports


/***/ })

});