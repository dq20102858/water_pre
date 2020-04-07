webpackJsonp([32],{

/***/ "Ofm3":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.el-form-item-inline .el-form-item {\r\n  float: left;\r\n  white-space: nowrap;\n}\n.el-form-item-inline .el-input__inner {\r\n  width: 220px;\n}\n.chart-ontainer {\r\n  margin: 20px 0;\n}\n.second-content {\r\n  height: 340px;\r\n  background: #fff;\r\n  padding: 20px;\r\n  border-radius: 6px;\n}\n.second-content h2 {\r\n  color: #1d397a;\r\n  font-size: 18px;\r\n  margin-bottom: 50px;\r\n  font-weight: 400;\n}\n.second-content .oneitem {\r\n  text-align: center;\r\n  margin: 70px 40px;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: justify;\r\n      -ms-flex-pack: justify;\r\n          justify-content: space-between;\n}\n.second-content .oneitem p {\r\n  color: #1d397a;\r\n  font-size: 15px;\r\n  line-height: 41px;\n}\n.second-content .oneitem .p1 {\r\n  color: #ff5c75;\r\n  font-size: 20px;\n}\n.second-content .oneitem .p2 {\r\n  color: #27db07;\r\n  font-size: 20px;\n}\n.second-content .twoitem {\r\n  padding: 0 -15px;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: justify;\r\n      -ms-flex-pack: justify;\r\n          justify-content: space-between;\n}\n.second-content .twoitem li {\r\n  border-right: 1px #b8ccfb solid;\r\n  padding: 0 15px;\n}\n.second-content .twoitem li:last-child {\r\n  border: 0;\n}\n.second-content .twoitem p {\r\n  color: #4b6eca;\r\n  font-size: 14px;\r\n  line-height: 31px;\n}\n.second-content .twoitem h3 {\r\n  color: #1d397a;\r\n  font-size: 16px;\r\n  text-align: center;\n}\n.chartbox {\r\n  width: 100%;\r\n  height: 100%;\n}\n#oneChart {\r\n  width: 100%;\r\n  height: 400px;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\n}\n#thirdChart {\r\n  width: 100%;\r\n  height: 300px;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\n}\n.echart-top {\r\n  overflow: hidden;\r\n  margin-bottom: 20px;\n}\n.el-menu-cus {\r\n  float: left;\r\n  background: none;\r\n  border: 0;\n}\n.el-menu-cus .el-menu-item {\r\n  display: inline-block;\r\n  margin-right: 10px;\r\n  color: #1d397a;\r\n  height: 35px;\r\n  line-height: 36px;\r\n  font-size: 16px;\r\n  padding: 0 12px;\n}\n.el-menu-cus .el-menu-item.is-active {\r\n  background: #4b6eca;\r\n  color: #fff;\r\n  border-radius: 3px;\n}\n.el-serach {\r\n  float: right;\r\n  border: 2px #4b6eca solid;\r\n  border-radius: 3px;\n}\n.el-serach .el-date-editor {\r\n  width: 178px;\n}\n.el-serach .el-input__inner {\r\n  background: none;\r\n  border: none;\r\n  color: #4b6eca;\r\n  width: 178px;\n}\n.el-serach .el-input__inner:placeholder {\r\n  color: #4b6eca;\n}\n.el-serach .el-input__inner:-webkit-input-placeholder {\r\n  color: #4b6eca;\n}\n.el-serach .el-input__inner:-moz-placeholder {\r\n  color: #4b6eca;\n}\n.el-serach .el-input__inner:-ms-input-placeholder {\r\n  color: #4b6eca;\n}\n.el-serach .el-button {\r\n  background: #4b6eca;\r\n  color: #fff;\n}\n.app-page-container {\r\n  border-radius: 6px;\r\n  padding: 20px;\r\n  background: #fff;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "QXaF":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("Ofm3");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("2d7ace44", content, true);

/***/ }),

/***/ "V81q":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/project/chartdata.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var chartdata = ({
  data: function data() {
    return {
      workSelectId: "0",
      workSelectName: "",
      workTypeList: [],
      echartDate: "",
      curMonth: "",
      echartDataList: [],
      echartDataNames: ""
    };
  },
  created: function created() {
    this.getWorkTypeList();
    var nowDate = new Date();
    var date = {
      y: nowDate.getFullYear(),
      m: nowDate.getMonth() < 9 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1
    };
    this.curMonth = date.y + "-" + date.m;
  },

  methods: {
    //作业列表
    getWorkTypeList: function getWorkTypeList() {
      var _this = this;

      this.workSelectId = 0;
      this.request({
        url: "/project/getWorkTypeList",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1 && data.data.length > 0) {
          _this.workTypeList = data.data;
          _this.workSelectId = _this.workTypeList[0]["id"].toString();
          _this.workSelectName = _this.workTypeList[0]["name"];
          _this.echartDate = "";
          _this.getCharData(_this.workSelectId, _this.curMonth, _this.workSelectName);
        }
      });
    },

    //选择作业
    changeWorkTypeList: function changeWorkTypeList(key) {
      var _this2 = this;

      var date = this.curMonth;
      if (this.echartDate != "" && this.echartDate != null) {
        date = this.echartDate;
      }
      this.workTypeList.map(function (item, i) {
        if (item.id == key) {
          _this2.workSelectId = item.id;
          _this2.workSelectName = item.name;
        }
      });
      this.getCharData(key, date, this.workSelectName);
    },

    //查询
    searchChartByDate: function searchChartByDate() {
      var date = this.curMonth;
      if (this.echartDate != "" && this.echartDate != null) {
        date = this.echartDate;
      }

      // this.workTypeList.map((item, i) => {
      //   if (item.id == key) {
      //      this.workSelectId= item.id;
      //     this.workSelectName = item.name;
      //   }
      // });
      this.getCharData(this.workSelectId, date, this.workSelectName);
    },

    //图表一
    getCharData: function getCharData(proId, date, proName) {
      this.getOneChart(proId, date, proName);
      this.getSecondChart(proId, date, proName);
      this.getThirdChart(proId, date, proName);
    },
    getOneChart: function getOneChart(proId, date, proName) {
      var _this3 = this;

      this.request({
        url: "/project/getData",
        method: "get",
        params: { proId: proId, date: date }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          var myChart = _this3.$echarts.init(document.getElementById("oneChart"));
          myChart.setOption({
            title: {
              text: proName + "  " + date + "  单位：公里",
              textStyle: {
                color: "#1D397A",
                fontWeight: "400",
                fontSize: 14
              }
            },
            tooltip: {
              trigger: "axis"
            },
            color: ["#4b6eca", "#ff5c75"],
            legend: {
              data: ["计划", "实际"],
              icon: "rectangle",
              textStyle: {
                fontSize: 14,
                color: "#1d397a"
              }
            },
            grid: {
              left: "1%",
              right: "1%",
              bottom: "1%",
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: data.data.x
            },
            yAxis: {
              type: "value"
            },
            series: [{
              name: "计划",
              type: "line",
              data: data.data.list[0].data
            }, {
              name: "实际",
              type: "line",
              data: data.data.list[1].data
            }]
          });
          myChart.resize();
          window.addEventListener("resize", function () {
            myChart.resize();
          });
          //end
        }
      });
    },
    getSecondChart: function getSecondChart(proId, date, proName) {
      var _this4 = this;

      this.request({
        url: "/project/getSecond",
        method: "get",
        params: { proId: proId, date: date }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this4.echartDataList = data.data;
          _this4.echartDataNames = proName;
          console.log("echartDataList：" + _this4.echartDataList);
        }
      });
    },
    getThirdChart: function getThirdChart(proId, date, proName) {
      var _this5 = this;

      this.request({
        url: "/project/getThird",
        method: "get",
        params: { proId: proId, date: date }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          var myChart = _this5.$echarts.init(document.getElementById("thirdChart"));
          myChart.setOption({
            title: {
              text: ""
            },
            tooltip: {
              trigger: "axis"
            },
            color: ["#4b6eca", "#ff5c75"],
            legend: {
              data: ["计划", "实际"],
              icon: "rectangle",
              textStyle: {
                fontSize: 14,
                color: "#1d397a"
              }
            },
            grid: {
              left: "1%",
              right: "1%",
              bottom: "1%",
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: [{
              type: "category",
              boundaryGap: false,
              data: data.data.x
            }],
            yAxis: [{
              type: "value"
            }],
            series: [{
              name: "计划",
              type: "bar",
              data: data.data.list[0].data
            }, {
              name: "实际",
              type: "bar",
              data: data.data.list[1].data
            }]
          });
          myChart.resize();
          window.addEventListener("resize", function () {
            myChart.resize();
          });
          //end
        }
      });
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1dd3288c","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/project/chartdata.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"project"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"chartdata","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("MV+A")}}),_vm._v("工程进度\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"project"}},[_vm._v("添加作业")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"schedule"}},[_vm._v("计划日程")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"detaillist"}},[_vm._v("详情列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"chartdata"}},[_vm._v("图表数据")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{attrs:{"id":"echart"}},[_c('div',{staticClass:"echart-top"},[_c('el-menu',{staticClass:"el-menu-cus",attrs:{"default-active":_vm.workSelectId.toString()},on:{"select":_vm.changeWorkTypeList}},_vm._l((_vm.workTypeList),function(item){return _c('el-menu-item',{key:item.id,attrs:{"index":item.id.toString()}},[_vm._v(_vm._s(item.name))])})),_vm._v(" "),_c('div',{staticClass:"el-serach"},[_c('el-date-picker',{attrs:{"type":"month","placeholder":"在此选择年月查询","format":"yyyy-MM","value-format":"yyyy-MM"},model:{value:(_vm.echartDate),callback:function ($$v) {_vm.echartDate=$$v},expression:"echartDate"}}),_vm._v(" "),_c('el-button',{on:{"click":_vm.searchChartByDate}},[_vm._v("查询")])],1)],1),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{staticClass:"chart-ontainer"},[_c('el-row',{attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":10}},[_c('div',{staticClass:"second-content"},[_c('h2',[_vm._v(_vm._s(_vm.echartDataNames)+" 总体完成情况")]),_vm._v(" "),_c('ul',{staticClass:"oneitem"},[_c('li',[_c('p',[_vm._v("设计工程量：")]),_vm._v(" "),_c('h3',{staticClass:"p1"},[_vm._v(_vm._s(_vm.echartDataList.designTotal)+"公里")])]),_vm._v(" "),_c('li',[_c('p',[_vm._v("完成百分比：")]),_vm._v(" "),_c('h3',{staticClass:"p2"},[_vm._v(_vm._s(_vm.echartDataList.percent)+"公里")])])]),_vm._v(" "),_c('ul',{staticClass:"twoitem"},[_c('li',[_c('p',[_vm._v("月累完成：")]),_vm._v(" "),_c('h3',[_vm._v(_vm._s(_vm.echartDataList.monthTotal))])]),_vm._v(" "),_c('li',[_c('p',[_vm._v("年累完成：")]),_vm._v(" "),_c('h3',[_vm._v(_vm._s(_vm.echartDataList.yearTotal))])]),_vm._v(" "),_c('li',[_c('p',[_vm._v("开累完成：")]),_vm._v(" "),_c('h3',[_vm._v(_vm._s(_vm.echartDataList.workTotal))])]),_vm._v(" "),_c('li',[_c('p',[_vm._v("剩余工程量：")]),_vm._v(" "),_c('h3',[_vm._v(_vm._s(_vm.echartDataList.leftTotal))])])])])]),_vm._v(" "),_c('el-col',{attrs:{"span":14}},[_c('div',{staticClass:"second-content"},[_c('div',{attrs:{"id":"thirdChart"}})])])],1)],1)])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"chartbox"},[_c('div',{attrs:{"id":"oneChart"}})])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var project_chartdata = (esExports);
// CONCATENATED MODULE: ./src/views/project/chartdata.vue
function injectStyle (ssrContext) {
  __webpack_require__("QXaF")
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
  chartdata,
  project_chartdata,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_project_chartdata = __webpack_exports__["default"] = (Component.exports);


/***/ })

});