webpackJsonp([13],{

/***/ "T+TZ":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("UCHT");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("313399e2", content, true);

/***/ }),

/***/ "UCHT":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.el-menu--collapse .el-menu .el-submenu,\r\n.el-menu--popup {\r\n  min-width: 124px;\r\n  text-align: center;\r\n  padding: 0;\n}\n.el-menu--horizontal .el-menu .el-menu-item.is-active,\r\n.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {\r\n  background: #4b6eca;\r\n  color: #fff;\n}\n.app-page-chart {\r\n  font-size: 16px !important;\r\n  background-color: #030a2e;\r\n  padding: 30px;\n}\n.canvas_main {\r\n  /*width: 100%;*/\n}\n.head_btn {\r\n  /*width: 100%;*/\r\n\r\n  padding-top: 20px;\n}\n.list_btn {\r\n  position: absolute;\r\n  top: 84px;\r\n  right: 250px;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "wpBv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/apply/daychart.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var daychart = ({
  name: "daychart",
  data: function data() {
    return {
      projectName: '',
      mark_line: [],
      project_kind_name: [],
      kcolor: ["red", "green", "yellow", "#467aff", "#44ddb5", "#c245d3"]
    };
  },
  mounted: function mounted() {
    this.getChart();
  },
  created: function created() {
    this.projectName = localStorage.getItem('projectName');
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
          //根据项目具体类别配置创建出对应格式
          _this.mark_line = JSON.parse(stringify_default()(resdata.data.y).replace(/value/g, "yAxis"));
          var minLineNum = Math.min.apply(Math, _this.mark_line.map(function (item) {
            return parseInt(item.yAxis + 2);
          }));
          var maxLineNum = Math.max.apply(Math, _this.mark_line.map(function (item) {
            return parseInt(item.yAxis + 2);
          }));
          //
          var t = resdata.data.data;
          for (var k in t) {
            _this.project_kind_name.push({
              value: t[k].type,
              label: t[k].type,
              color: _this.kcolor[k]
            });
          }

          //时间
          var dayArr = [];
          var tday = resdata.data.x;
          for (var i in tday) {
            dayArr.push(i);
          }
          console.log("dayAry:" + dayArr);
          var dataMin = dayArr.shift(); //new Date(Math.min.apply(null, dayArr)).toLocaleDateString();
          var dataMax = dayArr.pop(); //new Date(Math.max.apply(null, dayArr)).toLocaleDateString();

          // let dataMin = Math.min.apply(
          //   Math,
          //   dayAry.map(function(item,i) {
          //     return i;
          //   })
          // );
          // let dataMax = Math.max.apply(
          //   Math,
          //   dayAry.map(function(item) {
          //     return item;
          //   })
          // );
          console.log("day:" + dataMin + "_" + dataMax);
          //option
          var option = {
            textStyle: {
              color: "#fff"
            },
            tooltip: {},
            grid: {
              left: "15%",
              right: "5%"
            },
            xAxis: {
              type: "time",
              min: dataMin,
              max: dataMax,
              minInterval: 3600 * 12 * 1000,
              maxInterval: 3600 * 1 * 1000,
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#2B2B2B",
                  type: "dotted",
                  width: 1
                }
              }
            },
            yAxis: {
              show: false,
              type: "value",
              min: minLineNum,
              max: maxLineNum,
              scale: true,
              minInterval: 0.5,
              maxInterval: 5,

              splitLine: {
                show: false,
                lineStyle: {
                  color: "#2B2B2B",
                  type: "dotted",
                  width: 1
                }
              },
              axisLabel: {
                show: false,
                showMinLabel: false,
                showMaxLabel: false,
                formatter: function formatter(value, index) {
                  return value;
                }
              }
            },
            dataZoom: [{
              type: "slider",
              filterMode: "weakFilter", //weakFilter参数配合echarts.graphic.clipRectByRect效果最佳
              show: true,
              zoomLock: true,
              xAxisIndex: [0],
              top: 24,
              start: 0,
              end: 17,
              minValueSpan: 4 * 3600 * 1000,
              textStyle: {
                color: "#fff"
              },
              borderColor: "#2B2B2B",
              handleSize: "75%",
              fillerColor: "#202f40"
              // handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
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
            series: [{
              name: "车站",
              type: "line",
              markLine: {
                silent: true,
                data: _this.mark_line,
                label: {
                  normal: {
                    position: "left",
                    formatter: "{b}"
                  }
                },
                lineStyle: {
                  color: "#7a7a7a"
                },
                animation: false
              }
            }],
            visualMap: {
              pieces: _this.project_kind_name,
              dimension: 7,
              left: "center",
              bottom: -5,
              orient: "horizontal",
              textStyle: {
                color: "#fff"
              },
              outOfRange: {
                symbolSize: [0, 0, 0, 0]
              },
              controller: {
                outOfRange: {
                  color: "#7A7A7A"
                }
              }
            },
            color: ["#fff"],
            animation: false
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          //视觉映射开关事件
          var global_v_selected = "";
          myChart.on("datarangeselected", function (params) {
            // var filter_data = [];
            // for (var k in project_line_name) {
            //   filter_data[project_line_name[k].name] = [];
            // }
            // //循环遍历视觉开关，根据状态过滤相应数据
            // for (var k in params.selected) {
            //   //如果开关状态为开启（true）则将此类数据全部添加到对应下别下
            //   if (params.selected[k]) {
            //     for (var j in data) {
            //       if (data[j].length) {
            //         for (var i in data[j]) {
            //           if (data[j][i][7] == project_kind_name[k].name) {
            //             filter_data[j].push(data[j][i]);
            //           }
            //         }
            //       }
            //     }
            //   }
            // }
            // // console.log(data)
            // // console.log(filter_data)
            // var change_series = [];
            // for (var k in project_line_name) {
            //   var obj = { data: "" };
            //   obj.data = filter_data[project_line_name[k].name];
            //   change_series[k] = obj;
            // }
            // //根据对应的开关重新加载对应的数据
            // myChart.setOption({
            //   series: change_series
            // });
            // myChart.setOption({
            //   visualMap: {
            //     selected: params.selected
            //   }
            // });
            // global_v_selected = params.selected;
            // var myLegend = myChart.getOption().legend[0].selected;
            // // var myVisualMap = myChart.getOption().visualMap[0].selected;
            // localStorage.myL = JSON.stringify(myLegend);
            // // localStorage.myV = JSON.stringify(myVisualMap);
          });
          myChart.resize();
          window.addEventListener("resize", function () {
            myChart.resize();
          });

          //==========
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-686b7a0b","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/apply/daychart.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app-apply"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"daychart","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_vm._v(_vm._s(_vm.projectName))]),_vm._v(" "),_c('el-submenu',{attrs:{"index":"1"}},[_c('template',{slot:"title"},[_vm._v("日班计划")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"daychart"}},[_vm._v("日班图表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"apply"}},[_vm._v("已班列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"conflictcheck"}},[_vm._v("冲突检测")])],2),_vm._v(" "),_c('el-menu-item',[_c('router-link',{attrs:{"to":{name:'weekplan'}}},[_vm._v("周计划")])],1)],1)],1),_vm._v(" "),_vm._m(0)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-page-chart"},[_c('div',{staticStyle:{"height":"500px","width":"100%"},attrs:{"id":"main"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var apply_daychart = (esExports);
// CONCATENATED MODULE: ./src/views/apply/daychart.vue
function injectStyle (ssrContext) {
  __webpack_require__("T+TZ")
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
  daychart,
  apply_daychart,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_apply_daychart = __webpack_exports__["default"] = (Component.exports);


/***/ })

});