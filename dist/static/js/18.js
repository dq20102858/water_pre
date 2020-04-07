webpackJsonp([18],{

/***/ "+S7K":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.app-page-chart {\r\n  min-width: 1170px;\n}\n.maintitle {\r\n  text-align: center;\r\n  font-size: 20px;\r\n  color: #fff;\n}\n.el-menu--collapse .el-menu .el-submenu,\r\n.el-menu--popup {\r\n  min-width: 124px;\r\n  text-align: center;\r\n  padding: 0;\n}\n.el-menu--horizontal .el-menu .el-menu-item.is-active,\r\n.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {\r\n  background: #4b6eca;\r\n  color: #fff;\n}\n.chartleft {\r\n  float: left;\r\n  width: 80%;\r\n  background: #fff;\r\n  padding: 30px;\r\n  border-radius: 6px;\n}\n.chartright {\r\n  float: left;\r\n  width: 19%;\r\n  margin-left: 1%;\n}\n.chartright .sidebox {\r\n  background: #fff;\r\n  padding: 20px;\r\n  margin-bottom: 20px;\n}\n.chartright .sidebox .btnitems {\r\n  margin-top: 15px;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: justify;\r\n      -ms-flex-pack: justify;\r\n          justify-content: space-between;\n}\n.chartright .sidebox .btnitems .is-plain {\r\n  width: 100% !important;\r\n  display: inline-block;\r\n  background: #fff;\n}\n.chartright .sidebox .btnitem {\r\n  margin-top: 15px;\n}\n.chartright .el-date-editor.el-input,\r\n.chartright .el-date-editor.el-input__inner {\r\n  width: 100%;\n}\n.chartright .sidebox .btnitem .is-plain {\r\n  width: 100% !important;\r\n  background: #fff;\n}\n.chartright .sidebox .is-plain:hover {\r\n  background: #4b6eca;\r\n  border-color: #4b6eca;\r\n  color: #fff;\n}\n.chartright .sidebox .is-plain:focus {\r\n  background: #4b6eca;\r\n  border-color: #4b6eca;\r\n  color: #fff;\n}\n.chartright .sidebox h3 {\r\n  font-size: 14px;\n}\n.chartright .chklist {\r\n  margin-top: 15px;\n}\n.chartright .chklist .el-checkbox {\r\n  margin-bottom: 10px;\n}\n@media (max-width: 960px) {\n.chartleft {\r\n    width: 100%;\n}\n.chartright {\r\n    width: 100%;\r\n    margin-top: 20px;\n}\n}\r\n", ""]);

// exports


/***/ }),

/***/ "Ptfd":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("+S7K");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("2e4e8274", content, true);

/***/ }),

/***/ "WfHw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/run_monitor/index.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var run_monitor = ({
  name: "daychart",
  data: function data() {
    return {
      projectName: "",
      mark_line: [],
      project_kind_name: [],
      kcolor: ["red", "green", "yellow", "#467aff", "#44ddb5", "#c245d3"],
      todayValue: new Date(),
      diaLogFormVisible: false,
      diaLogTitle: "添加信息"
    };
  },
  mounted: function mounted() {
    this.getChart();
  },
  created: function created() {
    this.projectName = localStorage.getItem("projectName");
  },

  methods: {
    getChart: function getChart() {
      var _this = this;

      this.request({
        url: "/apply/getDailyChart",
        method: "get"
      }).then(function (res) {
        var resdata = res.data;
        if (resdata.status == 1) {
          //myChart
          var myChart = _this.$echarts.init(document.getElementById("main"));
          myChart.getDom().style.height = document.body.clientHeight - 280 + "px";
          //站点
          _this.mark_line = JSON.parse(stringify_default()(resdata.data.y).replace(/value/g, "yAxis"));
          var minLineNum = Math.min.apply(Math, _this.mark_line.map(function (item) {
            return parseInt(item.yAxis + 2);
          }));
          var maxLineNum = Math.max.apply(Math, _this.mark_line.map(function (item) {
            return parseInt(item.yAxis + 2);
          }));
          //A1 A2 A3 A4
          var typeData = [];
          var dataTypeArr = resdata.data.data;
          dataTypeArr.forEach(function (item) {
            var jlist = [];
            item.lists.forEach(function (item) {
              jlist.push([item.name, item.value]);
            });
            typeData.push({ name: item.type, lists: jlist });
          });
          console.log("typeData：" + stringify_default()(typeData));
          var seriesData = [];
          seriesData.push({
            name: "车站",
            type: "line",
            markLine: {
              silent: true,
              data: _this.mark_line,
              symbol: ["none"],
              label: {
                show: false,
                normal: {
                  position: "left",
                  formatter: function formatter(value, index) {
                    return value.name.replace(/.00/, "").replace(/.00/, "") + "   ";
                  }
                }
              },
              lineStyle: {
                normal: {
                  type: "solid",
                  color: "#1D397A"
                }
              },
              animation: false
            }
          });
          // let projectData = [];
          // for (let k in typeData) {
          //   seriesData.push({
          //     name: typeData[k].name,
          //     type: "scatter",
          //     symbolSize: 10,
          //     itemStyle: { normal: { color: this.kcolor[k] } },
          //     data: typeData[k].lists
          //   });
          // }
          // console.log("projectData：" + JSON.stringify(seriesData));
          //时间
          var dayArr = [];
          var tday = resdata.data.x;
          for (var i in tday) {
            dayArr.push(i);
          }
          var dataMin = new Date(new Date(_this.todayValue.getTime() - 24 * 60 * 60 * 1000).setHours(17, 0, 0, 0));
          var dataMax = new Date(new Date(_this.todayValue.getTime() + 24 * 60 * 60 * 1000).setHours(19, 0, 0, 0));
          //option
          var option = {
            textStyle: {
              color: "#1D397A"
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#376df4"
                },
                lineStyle: {
                  color: "#376df4",
                  width: 1
                }
              }
            },
            grid: {
              left: "15%",
              right: "5%"
            },
            xAxis: {
              type: "time",
              position: "top",
              min: dataMin,
              max: dataMax,
              maxInterval: 3600 * 0.1 * 1000,
              axisLabel: {
                formatter: function formatter(val, index) {
                  var date = new Date(val);
                  var months = date.getMonth() + 1 + "/" + date.getDate();
                  var hours = date.getHours() + ":00";
                  if (index % 6 == 0) {
                    return months + "\r\n" + hours;
                  }
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: ["#c0c0c0"],
                  type: "solid",
                  width: 1
                }
              }
            },
            yAxis: {
              show: false,
              type: "value",
              min: minLineNum,
              max: maxLineNum,
              animation: false
            },
            dataZoom: [{
              type: "slider",
              filterMode: "weakFilter", //weakFilter参数配合echarts.graphic.clipRectByRect效果最佳
              show: false,
              zoomLock: true,
              xAxisIndex: [0],
              bottom: 10,
              start: 0,
              end: 25,
              minValueSpan: 3600 * 12 * 1000,
              textStyle: {
                color: "#fff"
              },
              borderColor: "#2B2B2B",
              handleSize: "75%",
              fillerColor: "#202f40"
            }, {
              type: "slider",
              filterMode: "weakFilter",
              show: true,
              yAxisIndex: [0],
              left: "96%",
              start: 0,
              end: 100,
              minValueSpan: 5,
              textStyle: {
                color: "#fff"
              },
              borderColor: "#2B2B2B",
              handleSize: "75%",
              fillerColor: "#202f40"
            }, {
              type: "inside",
              xAxisIndex: [0],
              start: 0,
              end: 100
            }, {
              type: "inside",
              yAxisIndex: [0],
              zoomOnMouseWheel: false,
              start: 0,
              end: 100
            }],
            series: seriesData
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          myChart.resize();
          window.addEventListener("resize", function () {
            myChart.resize();
          });
        }
      });
    },
    preDate: function preDate() {
      //前一天
      this.todayValue = new Date(this.todayValue.getTime() - 24 * 60 * 60 * 1000);
      this.getChart();
    },
    nextDate: function nextDate() {
      //后一天
      this.todayValue = new Date(this.todayValue.getTime() + 24 * 60 * 60 * 1000);
      this.getChart();
    },
    planAdd: function planAdd() {
      this.formData = {};
      this.diaLogTitle = "添加信息";
      this.diaLogFormVisible = true;
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-b51de9a4","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/run_monitor/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app-monitor-chart"}},[_c('div',{staticClass:"app-page-chart"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"chartright"},[_c('div',{staticClass:"sidebox"},[_c('div',{staticClass:"btnitem"},[_c('el-date-picker',{attrs:{"type":"date","placeholder":"选择日期"},model:{value:(_vm.todayValue),callback:function ($$v) {_vm.todayValue=$$v},expression:"todayValue"}})],1),_vm._v(" "),_c('div',{staticClass:"btnitems"},[_c('el-button',{attrs:{"type":"primary","plain":""},on:{"click":_vm.preDate}},[_vm._v("前一天")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary","plain":""},on:{"click":_vm.nextDate}},[_vm._v("后一天")])],1),_vm._v(" "),_c('div',{staticClass:"btnitem"},[_c('el-button',{attrs:{"type":"primary","plain":""},on:{"click":_vm.planAdd}},[_vm._v("编制日班计划图")])],1),_vm._v(" "),_c('div',{staticClass:"btnitem"},[_c('el-button',{attrs:{"type":"primary","plain":""},on:{"click":_vm.planEdit}},[_vm._v("编制日班实际图")])],1),_vm._v(" "),_c('div',{staticClass:"btnitem"},[_c('el-button',{attrs:{"type":"primary","plain":""}},[_vm._v("区间封锁")])],1),_vm._v(" "),_c('div',{staticClass:"btnitem"},[_c('el-button',{attrs:{"type":"primary","plain":""}},[_vm._v("批注")])],1),_vm._v(" "),_c('div',{staticClass:"btnitem"},[_c('el-button',{attrs:{"type":"primary","plain":""}},[_vm._v("刷新")])],1),_vm._v(" "),_c('div',{staticClass:"btnitem"},[_c('el-button',{attrs:{"type":"primary","plain":""}},[_vm._v("提交")])],1)]),_vm._v(" "),_c('div',{staticClass:"sidebox"},[_c('h3',[_vm._v("显示控制")]),_vm._v(" "),_c('div',{staticClass:"chklist"},[_c('el-checkbox',{attrs:{"label":"左线"}}),_vm._v(" "),_c('el-checkbox',{attrs:{"label":"右线"}}),_vm._v(" "),_c('el-checkbox',{attrs:{"label":"入场线"}}),_vm._v(" "),_c('el-checkbox',{attrs:{"label":"出场线"}})],1),_vm._v(" "),_c('div',{staticClass:"chklist"},[_c('el-checkbox',{attrs:{"label":"计划图"}}),_vm._v(" "),_c('el-checkbox',{attrs:{"label":"实际图"}}),_vm._v(" "),_c('el-checkbox',{attrs:{"label":"轨迹图"}}),_vm._v(" "),_c('el-checkbox',{attrs:{"label":"批注"}}),_vm._v(" "),_c('el-checkbox',{attrs:{"label":"区间封锁"}}),_vm._v(" "),_c('el-checkbox',{attrs:{"label":"清点"}})],1),_vm._v(" "),_c('div',{staticClass:"chklist"},[_c('el-checkbox',{attrs:{"label":"ZY01"}}),_vm._v(" "),_c('el-checkbox',{attrs:{"label":"ZY02"}}),_vm._v(" "),_c('el-checkbox',{attrs:{"label":"ZY03"}}),_vm._v(" "),_c('el-checkbox',{attrs:{"label":"ZY04"}})],1)])])]),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-station",attrs:{"width":"700px","close-on-click-modal":false,"title":this.diaLogTitle,"visible":_vm.diaLogFormVisible},on:{"update:visible":function($event){_vm.diaLogFormVisible=$event}}},[_c('el-form',{ref:"formRules",staticClass:"el-form-custom",attrs:{"model":_vm.formData,"rules":_vm.formRules}},[_c('el-form-item',{attrs:{"label":"名称：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20","show-word-limit":""},model:{value:(_vm.formData.name),callback:function ($$v) {_vm.$set(_vm.formData, "name", $$v)},expression:"formData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"线别：","prop":"line_type"}},[_c('el-select',{attrs:{"placeholder":"请选择"},on:{"change":function($event){_vm.selectLineType($event)}},model:{value:(_vm.formData.line_type),callback:function ($$v) {_vm.$set(_vm.formData, "line_type", $$v)},expression:"formData.line_type"}},_vm._l((_vm.lineTypeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})})),_vm._v(" "),_c('div',{staticClass:"el-form-item__error"},[_vm._v(_vm._s(_vm.lineTypeDes))])],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-inlines is-required",attrs:{"label":"开始里程："}},[_c('el-form-item',{attrs:{"prop":"start_flag"}},[_c('b',[_vm._v("DK")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"公里","maxlength":"3"},model:{value:(_vm.formData.start_flag),callback:function ($$v) {_vm.$set(_vm.formData, "start_flag", $$v)},expression:"formData.start_flag"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"prop":"start_length"}},[_c('b',[_vm._v("+")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"米","maxlength":"3"},model:{value:(_vm.formData.start_length),callback:function ($$v) {_vm.$set(_vm.formData, "start_length", $$v)},expression:"formData.start_length"}})],1)],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-inlines is-required",attrs:{"label":"结束里程："}},[_c('el-form-item',{attrs:{"prop":"end_flag"}},[_c('b',[_vm._v("DK")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"公里","maxlength":"3"},model:{value:(_vm.formData.end_flag),callback:function ($$v) {_vm.$set(_vm.formData, "end_flag", $$v)},expression:"formData.end_flag"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"prop":"end_length"}},[_c('b',[_vm._v("+")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"米","maxlength":"3"},model:{value:(_vm.formData.end_length),callback:function ($$v) {_vm.$set(_vm.formData, "end_length", $$v)},expression:"formData.end_length"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"开始时间","prop":"start_time"}},[_c('el-date-picker',{attrs:{"type":"datetime","placeholder":"选择时间"},on:{"change":_vm.changeStarttime},model:{value:(_vm.formData.start_time),callback:function ($$v) {_vm.$set(_vm.formData, "start_time", $$v)},expression:"formData.start_time"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"结束时间","prop":"end_time"}},[_c('el-date-picker',{attrs:{"type":"datetime","placeholder":"选择时间"},on:{"change":_vm.changeEndtime},model:{value:(_vm.formData.end_time),callback:function ($$v) {_vm.$set(_vm.formData, "end_time", $$v)},expression:"formData.end_time"}})],1),_vm._v(" "),_c('div',{staticClass:"blank"})],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.diaLogFormVisible = false}}},[_vm._v("关闭")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addOrEditDialog()}}},[_vm._v("确定")])],1)],1)],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"chartleft"},[_c('div',{staticClass:"maintitle"},[_vm._v("2020年04月02日 16时 -— 2020年04月04日 16时轨行区作业分布图")]),_vm._v(" "),_c('div',{staticStyle:{"height":"500px","width":"100%"},attrs:{"id":"main"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_run_monitor = (esExports);
// CONCATENATED MODULE: ./src/views/run_monitor/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("Ptfd")
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
  run_monitor,
  views_run_monitor,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_run_monitor = __webpack_exports__["default"] = (Component.exports);


/***/ })

});