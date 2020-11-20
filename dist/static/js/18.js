webpackJsonp([18],{

/***/ "F13q":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("BkJT")(false);
// imports


// module
exports.push([module.i, "\n.app-device-page-detail {\r\n  padding: 20px;\n}\n.statistics-top {\r\n  overflow: hidden;\r\n  margin-bottom: 30px;\n}\n.statistics-top .deleft {\r\n  float: left;\n}\n.statistics-top .deleft b {\r\n  font-weight: 400;\r\n  font-size: 18px;\r\n  margin-right: 20px;\n}\n.statistics-top .deright {\r\n  float: right;\r\n  color: #666;\r\n  font-size: 14px;\n}\n.statistics-top .deright span {\r\n  padding-left: 20px;\n}\n.statistics .el-row {\r\n  margin-bottom: 20px;\n}\n.statistics .grid-content {\r\n  padding: 40px 0px 30px 50px;\r\n  background: #fff;\r\n  border-radius: 6px;\r\n  overflow: hidden;\r\n  -webkit-box-shadow: 5px 1px 15px rgba(222, 222, 222, 0.9);\r\n          box-shadow: 5px 1px 15px rgba(222, 222, 222, 0.9);\n}\n.statistics .grid-img {\r\n  float: left;\r\n  width: 100px;\r\n  height: 150px;\r\n  margin-right: 40px;\r\n  border-radius: 100%;\n}\n.statistics .grid-img img {\r\n  margin-top: 15px;\r\n  float: left;\r\n  width: 100px;\r\n  height: 100px;\r\n  border-radius: 100%;\n}\n.statistics .grid-info p {\r\n  color: #333;\r\n  display: inline-block;\r\n  width: 21%;\r\n  padding-top: 20px;\r\n  font-size: 16px;\n}\n.statistics .grid-info p em {\r\n  color: #666;\n}\n.grid-content-chart {\r\n  border-radius: 6px;\r\n  margin-top: 30px;\r\n  background: #fff;\r\n\r\n  -webkit-box-shadow: 5px 1px 15px rgba(222, 222, 222, 0.9);\r\n\r\n          box-shadow: 5px 1px 15px rgba(222, 222, 222, 0.9);\n}\r\n/**/\n.echarts-main {\r\n  padding: 20px;\r\n  overflow: hidden;\n}\n.echarts {\r\n  height: 400px;\r\n  width: 100%;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "HL42":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("F13q");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("8bSs")("56dcbcf1", content, true);

/***/ }),

/***/ "Rz0p":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.2@babel-loader/lib!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=script&index=0!./src/views/SiteManage/statisticsEnergy.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var statisticsEnergy = ({
  data: function data() {
    return {
      oneType: 1,
      oneStartTime: "",
      twoType: 1,
      twoStartTime: "",
      threeType: 1,
      threeStartTime: "",
      fourType: 1,
      fourStartTime: ""
    };
  },
  created: function created() {
    this.getOneChart(this.oneType);
    this.getTwoChart(this.twoType);
    this.getThreeChart(this.threeType);
    this.getFourChart(this.fourType);
  },

  methods: {
    backURL: function backURL() {
      this.$router.go(-1);
    },

    //=======1
    oneStartTimeSelect: function oneStartTimeSelect() {
      this.getOneChart(this.oneType);
    },
    oneSelect: function oneSelect(type) {
      this.oneType = type;
      this.getOneChart(type);
    },
    getOneChart: function getOneChart(type) {
      var _this = this;

      this.request({
        url: "/log/getRealtimeEnergy",
        method: "get",
        params: {
          sid: this.$route.query.id,
          type: type,
          start_time: this.oneStartTime
        }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          var dataxAxis = data.data.x;
          var dataSeries = data.data.data;
          // dataxAxis = [12, 13, 14, 15];
          // dataSeries = [120, 130, 140, 150];

          //
          var myChart = _this.$echarts.init(document.getElementById("oneChart"));
          if (data.data.x.length == 0) {
            myChart.showLoading({
              text: "暂无数据",
              color: "#fff",
              textColor: "#8a8e91",
              maskColor: "rgba(255, 255, 255, 0.8)"
            });
          }
          var option = {
            backgroundColor: "#fff",
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: "1%",
              right: "2%",
              bottom: "2%",
              top: "10%",
              containLabel: true
            },
            // legend: {
            //   data: ["总能耗"],
            //   textStyle: {
            //     color: ["#00D98B"],
            //     fontSize: 15
            //   },
            //   itemWidth: 32,
            //   itemHeight: 15
            // },
            xAxis: {
              type: "category",
              data: dataxAxis,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#869ec6"
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#eff4f6"
                }
              },
              axisLabel: {
                textStyle: {
                  fontFamily: "Microsoft YaHei"
                }
              }
            },

            yAxis: {
              type: "value",
              // max: "1200",
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#869ec6"
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#eff4f6"
                }
              },
              axisLabel: {}
            },
            series: [{
              name: "总能耗",
              type: "line",
              barWidth: "12",
              label: {
                normal: {
                  show: true,
                  fontSize: 12,
                  color: "#00D98B",
                  position: "top"
                }
              },
              itemStyle: {
                normal: {
                  color: "#00D98B"
                }
              },
              data: dataSeries
            }]
          };
          myChart.setOption(option);
          myChart.resize();
          window.addEventListener("resize", function () {
            myChart.resize();
          });

          //end
        }
      });
    },

    //=======2
    twoStartTimeSelect: function twoStartTimeSelect() {
      this.getTwoChart(this.twoType);
    },
    twoSelect: function twoSelect(type) {
      this.twoType = type;
      this.getTwoChart(type);
    },
    getTwoChart: function getTwoChart(type) {
      var _this2 = this;

      this.request({
        url: "/log/getRealtimeEnergy",
        method: "get",
        params: {
          sid: this.$route.query.id,
          device_type: 1,
          type: type,
          start_time: this.twoStartTime
        }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          var dataxAxis = data.data.x;
          var dataSeries = data.data.result;
          //dataxAxis = [12, 13, 14, 15];
          //dataSeries = [120, 30, 10, 150];

          //
          var myChart = _this2.$echarts.init(document.getElementById("twoChart"));
          if (data.data.x.length == 0) {
            myChart.showLoading({
              text: "暂无数据",
              color: "#fff",
              textColor: "#8a8e91",
              maskColor: "rgba(255, 255, 255, 0.8)"
            });
          }
          var option = {
            backgroundColor: "#fff",
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: "1%",
              right: "2%",
              bottom: "2%",
              top: "10%",
              containLabel: true
            },
            // legend: {
            //   data: ["风机能耗"],
            //   textStyle: {
            //     color: ["#00D98B"],
            //     fontSize: 15
            //   },
            //   itemWidth: 32,
            //   itemHeight: 15
            // },
            xAxis: {
              type: "category",
              data: dataxAxis,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#869ec6"
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#eff4f6"
                }
              },
              axisLabel: {
                textStyle: {
                  fontFamily: "Microsoft YaHei"
                }
              }
            },

            yAxis: {
              type: "value",
              // max: "1200",
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#869ec6"
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#eff4f6"
                }
              },
              axisLabel: {}
            },
            series: [{
              name: "风机能耗",
              type: "line",
              barWidth: "12",
              label: {
                normal: {
                  show: true,
                  fontSize: 12,
                  color: "#00D98B",
                  position: "top"
                }
              },
              itemStyle: {
                normal: {
                  color: "#00D98B"
                }
              },
              data: dataSeries
            }]
          };
          myChart.setOption(option);
          myChart.resize();
          window.addEventListener("resize", function () {
            myChart.resize();
          });

          //end
        }
      });
    },

    //=======3
    threeStartTimeSelect: function threeStartTimeSelect() {
      this.getThreeChart(this.threeType);
    },
    threeSelect: function threeSelect(type) {
      this.threeType = type;
      this.getThreeChart(type);
    },
    getThreeChart: function getThreeChart(type) {
      var _this3 = this;

      this.request({
        url: "/log/getRealtimeEnergy",
        method: "get",
        params: {
          sid: this.$route.query.id,
          device_type: 2,
          type: type,
          start_time: this.threeStartTime
        }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          var dataxAxis = data.data.x;
          var dataSeries = data.data.result;
          //dataxAxis = [12, 13, 14, 15];
          //dataSeries = [120, 130, 140, 150];

          //
          var myChart = _this3.$echarts.init(document.getElementById("threeChart"));
          if (data.data.x.length == 0) {
            myChart.showLoading({
              text: "暂无数据",
              color: "#fff",
              textColor: "#8a8e91",
              maskColor: "rgba(255, 255, 255, 0.8)"
            });
          }
          var option = {
            backgroundColor: "#fff",
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: "1%",
              right: "2%",
              bottom: "2%",
              top: "10%",
              containLabel: true
            },
            // legend: {
            //   data: ["水泵能耗"],
            //   textStyle: {
            //     color: ["#228FFE"],
            //     fontSize: 15
            //   },
            //   itemWidth: 32,
            //   itemHeight: 15
            // },
            xAxis: {
              type: "category",
              data: dataxAxis,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#869ec6"
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#eff4f6"
                }
              },
              axisLabel: {
                textStyle: {
                  fontFamily: "Microsoft YaHei"
                }
              }
            },

            yAxis: {
              type: "value",
              // max: "1200",
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#869ec6"
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#eff4f6"
                }
              },
              axisLabel: {}
            },
            series: [{
              name: "水泵能耗",
              type: "line",
              barWidth: "12",
              label: {
                normal: {
                  show: true,
                  fontSize: 12,
                  color: "#228FFE",
                  position: "top"
                }
              },
              itemStyle: {
                normal: {
                  color: "#228FFE"
                }
              },
              data: dataSeries
            }]
          };
          myChart.setOption(option);
          myChart.resize();
          window.addEventListener("resize", function () {
            myChart.resize();
          });

          //end
        }
      });
    },

    //4
    //=======3
    fourStartTimeSelect: function fourStartTimeSelect() {
      this.getThreeChart(this.fourType);
    },
    fourSelect: function fourSelect(type) {
      this.fourType = type;
      this.getFourChart(type);
    },
    getFourChart: function getFourChart(type) {
      var _this4 = this;

      this.request({
        url: "/log/getRealtimeEnergy",
        method: "get",
        params: {
          sid: this.$route.query.id,
          device_type: 4,
          type: type,
          start_time: this.fourStartTime
        }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          var dataxAxis = data.data.x;
          var dataSeries = data.data.result;
          //dataxAxis = [12, 13, 14, 15];
          //dataSeries = [120, 130, 140, 150];

          //
          var myChart = _this4.$echarts.init(document.getElementById("fourChart"));
          if (data.data.x.length == 0) {
            myChart.showLoading({
              text: "暂无数据",
              color: "#fff",
              textColor: "#8a8e91",
              maskColor: "rgba(255, 255, 255, 0.8)"
            });
          }
          var option = {
            backgroundColor: "#fff",
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: "1%",
              right: "2%",
              bottom: "2%",
              top: "10%",
              containLabel: true
            },
            // legend: {
            //   data: ["水泵能耗"],
            //   textStyle: {
            //     color: ["#228FFE"],
            //     fontSize: 15
            //   },
            //   itemWidth: 32,
            //   itemHeight: 15
            // },
            xAxis: {
              type: "category",
              data: dataxAxis,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#869ec6"
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#eff4f6"
                }
              },
              axisLabel: {
                textStyle: {
                  fontFamily: "Microsoft YaHei"
                }
              }
            },

            yAxis: {
              type: "value",
              // max: "1200",
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#869ec6"
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#eff4f6"
                }
              },
              axisLabel: {}
            },
            series: [{
              name: "水泵能耗",
              type: "line",
              barWidth: "12",
              label: {
                normal: {
                  show: true,
                  fontSize: 12,
                  color: "#228FFE",
                  position: "top"
                }
              },
              itemStyle: {
                normal: {
                  color: "#228FFE"
                }
              },
              data: dataSeries
            }]
          };
          myChart.setOption(option);
          myChart.resize();
          window.addEventListener("resize", function () {
            myChart.resize();
          });

          //end
        }
      });
    },

    //=======end
    getStationList: function getStationList() {
      var _this5 = this;

      this.request({
        url: "/station/getStationLists",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this5.stationOptions = data.data;
        }
      });
    }

    //

  }
});
// CONCATENATED MODULE: ./node_modules/_vue-loader@13.5.0@vue-loader/lib/template-compiler?{"id":"data-v-35eaedfc","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=template&index=0!./src/views/SiteManage/statisticsEnergy.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-pages"},[_c('div',{staticClass:"app-page-statistics"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"statistics-top"},[_c('div',{staticClass:"deleft"},[_c('b',[_vm._v("能耗分析")]),_vm._v(" "),_c('el-button',{staticStyle:{"background":"#00ADFF","border":"none"},attrs:{"type":"primary","size":"mini","round":""},on:{"click":_vm.backURL}},[_vm._v("返回")])],1),_vm._v(" "),_c('div',{staticClass:"deright"},[_c('span',[_vm._v(_vm._s(_vm._f("formatGetDate")(new Date())))])])]),_vm._v(" "),_c('div',{staticClass:"statistics"},[_c('div',{staticClass:"grid-content-chart"},[_c('div',{staticClass:"chart-title"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"titleright"},[_c('el-date-picker',{staticClass:"seldate",attrs:{"type":"date","placeholder":"选择日期"},on:{"change":_vm.oneStartTimeSelect},model:{value:(_vm.oneStartTime),callback:function ($$v) {_vm.oneStartTime=$$v},expression:"oneStartTime"}}),_vm._v(" "),_c('span',{staticClass:"selspan",class:_vm.oneType == 1 ? 'active':'',on:{"click":function($event){_vm.oneSelect(1)}}},[_vm._v("按日")]),_vm._v(" "),_c('span',{staticClass:"selspan",class:_vm.oneType == 2 ? 'active':'',on:{"click":function($event){_vm.oneSelect(2)}}},[_vm._v("按月")]),_vm._v(" "),_c('span',{staticClass:"selspan",class:_vm.oneType == 3 ? 'active':'',on:{"click":function($event){_vm.oneSelect(3)}}},[_vm._v("按年")])],1)]),_vm._v(" "),_vm._m(1)]),_vm._v(" "),_c('div',{staticClass:"grid-content-chart"},[_c('div',{staticClass:"chart-title"},[_vm._m(2),_vm._v(" "),_c('div',{staticClass:"titleright"},[_c('el-date-picker',{staticClass:"seldate",attrs:{"type":"date","placeholder":"选择日期"},on:{"change":_vm.twoStartTimeSelect},model:{value:(_vm.twoStartTime),callback:function ($$v) {_vm.twoStartTime=$$v},expression:"twoStartTime"}}),_vm._v(" "),_c('span',{staticClass:"selspan",class:_vm.twoType == 1 ? 'active':'',on:{"click":function($event){_vm.twoSelect(1)}}},[_vm._v("按日")]),_vm._v(" "),_c('span',{staticClass:"selspan",class:_vm.twoType == 2 ? 'active':'',on:{"click":function($event){_vm.twoSelect(2)}}},[_vm._v("按月")]),_vm._v(" "),_c('span',{staticClass:"selspan",class:_vm.twoType == 3 ? 'active':'',on:{"click":function($event){_vm.twoSelect(3)}}},[_vm._v("按年")])],1)]),_vm._v(" "),_vm._m(3)]),_vm._v(" "),_c('div',{staticClass:"grid-content-chart"},[_c('div',{staticClass:"chart-title"},[_vm._m(4),_vm._v(" "),_c('div',{staticClass:"titleright"},[_c('el-date-picker',{staticClass:"seldate",attrs:{"type":"date","placeholder":"选择日期"},on:{"change":_vm.threeStartTimeSelect},model:{value:(_vm.threeStartTime),callback:function ($$v) {_vm.threeStartTime=$$v},expression:"threeStartTime"}}),_vm._v(" "),_c('span',{staticClass:"selspan",class:_vm.threeType == 1 ? 'active':'',on:{"click":function($event){_vm.threeSelect(1)}}},[_vm._v("按日")]),_vm._v(" "),_c('span',{staticClass:"selspan",class:_vm.threeType == 2 ? 'active':'',on:{"click":function($event){_vm.threeSelect(2)}}},[_vm._v("按月")]),_vm._v(" "),_c('span',{staticClass:"selspan",class:_vm.threeType == 3 ? 'active':'',on:{"click":function($event){_vm.threeSelect(3)}}},[_vm._v("按年")])],1)]),_vm._v(" "),_vm._m(5)]),_vm._v(" "),_c('div',{staticClass:"grid-content-chart"},[_c('div',{staticClass:"chart-title"},[_vm._m(6),_vm._v(" "),_c('div',{staticClass:"titleright"},[_c('el-date-picker',{staticClass:"seldate",attrs:{"type":"date","placeholder":"选择日期"},on:{"change":_vm.fourStartTimeSelect},model:{value:(_vm.fourStartTime),callback:function ($$v) {_vm.fourStartTime=$$v},expression:"fourStartTime"}}),_vm._v(" "),_c('span',{staticClass:"selspan",class:_vm.fourType == 1 ? 'active':'',on:{"click":function($event){_vm.fourSelect(1)}}},[_vm._v("按日")]),_vm._v(" "),_c('span',{staticClass:"selspan",class:_vm.fourType == 2 ? 'active':'',on:{"click":function($event){_vm.fourSelect(2)}}},[_vm._v("按月")]),_vm._v(" "),_c('span',{staticClass:"selspan",class:_vm.fourType == 3 ? 'active':'',on:{"click":function($event){_vm.fourSelect(3)}}},[_vm._v("按年")])],1)]),_vm._v(" "),_vm._m(7)])])])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"titleleft"},[_c('b',[_vm._v("总能耗")]),_vm._v(" "),_c('em',[_vm._v("单位：度")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"echarts-main"},[_c('div',{staticClass:"echarts",attrs:{"id":"oneChart"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"titleleft"},[_c('b',[_vm._v("风机能耗")]),_vm._v(" "),_c('em',[_vm._v("单位：度")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"echarts-main"},[_c('div',{staticClass:"echarts",attrs:{"id":"twoChart"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"titleleft"},[_c('b',[_vm._v("水泵能耗")]),_vm._v(" "),_c('em',[_vm._v("单位：度")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"echarts-main"},[_c('div',{staticClass:"echarts",attrs:{"id":"threeChart"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"titleleft"},[_c('b',[_vm._v("PCL能耗")]),_vm._v(" "),_c('em',[_vm._v("单位：度")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"echarts-main"},[_c('div',{staticClass:"echarts",attrs:{"id":"fourChart"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var SiteManage_statisticsEnergy = (esExports);
// CONCATENATED MODULE: ./src/views/SiteManage/statisticsEnergy.vue
function injectStyle (ssrContext) {
  __webpack_require__("HL42")
}
var normalizeComponent = __webpack_require__("/Xao")
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
  statisticsEnergy,
  SiteManage_statisticsEnergy,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_SiteManage_statisticsEnergy = __webpack_exports__["default"] = (Component.exports);


/***/ })

});