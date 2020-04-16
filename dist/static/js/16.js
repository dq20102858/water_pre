webpackJsonp([16],{

/***/ "LDeD":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("zLFK");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("e9e14a88", content, true);

/***/ }),

/***/ "lZYz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("bOdI");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/monitor/index.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var monitor = (defineProperty_default()({
  data: function data() {
    return {
      flag: false,
      startX: 0,
      endX: 0,
      slideStyle: {
        left: 0,
        transition: "none"
      },
      wdpx: 0,
      stationList: [],
      firstStation: "",
      lastStation: "",
      scrollwidth: 900,
      minKM: 0,
      minMileage: 0,
      totalMileage: 0,
      every: 0.5,
      bridgeCheckValue: true,
      bridgeList: [],
      tunnelCheckValue: true,
      tunnelList: [],
      speedCheckValue: true,
      speedList: [],
      alertCheckValue: true,
      alertList: [],
      slopeCheckValue: true,
      slopeList: [],
      progressList: [],
      progressListItem: [],
      progressCheckValue: 0
    };
  },
  created: function created() {
    this.getProjectProcessMap();
  },
  mounted: function mounted() {},

  methods: {
    getProjectProcessMap: function getProjectProcessMap() {
      var _this = this;

      this.request({
        url: "/monitor/getMointorDatas",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          //======站点
          _this.stationList = data.data.stations;
          var json = data.data.stations;
          //找到最大数与最小数公里数
          var first = json[0];
          var end = json[0];
          for (var i = 1; i < json.length; i++) {
            var tmp = json[i];
            if (first.start_flag > tmp.start_flag) first = tmp;
            if (end.start_flag < tmp.start_flag) end = tmp;
          }
          _this.scrollwidth = document.documentElement.clientWidth - 640;
          console.log(_this.scrollwidth);
          _this.firstStation = json[0].name; // 第一个站
          _this.lastStation = json[json.length - 1].name; // 最后一个站
          // 总里程
          _this.totalMileage = (end.start_flag - first.start_flag) * 1000 + end.start_length - first.start_length;
          _this.minMileage = first.start_flag * 1000 + first.start_length; //最小里程
          _this.minKM = first.start_flag; //最小公里
          console.log("总里程mileage：" + _this.totalMileage + " 最小里程minMileage：" + _this.minMileage + " minKM：" + _this.minKM);
          //桥 隧道等
          _this.bridgeList = data.data.bridge_lists; //桥
          _this.tunnelList = data.data.tunnel_lists; //隧道
          _this.speedList = data.data.speed_lists; //限速区
          _this.alertList = data.data.alert_lists; //防区
          _this.slopeList = data.data.slope_lists; //坡度
          //施工进度
          _this.progressList = data.data.project;
          _this.initCanvas();
          //  this.getLineType();
        }
      });
    },
    initCanvas: function initCanvas() {
      //坐标轴宽度高度
      var axis_Width = this.totalMileage / 2 + 600;
      var axis_Height = "680";
      //标尺起点
      var axis_Origin = {
        x: 100,
        y: axis_Height - 450
      };
      var axis_Origin_Two = {
        x: 100,
        y: axis_Height - 200
      };
      //刻度的间隔
      var tick_Spacing = 100;
      //标记数值
      var num_Horizontal_Ticks = axis_Width / tick_Spacing;
      //刻度线高度
      var tick_Height = 8;
      var everys = this.every; //每米长度等于px
      var minkm = this.minKM; //最小的公里数
      var offsetX = 100; //偏移100像素 找不到原因
      //初始化
      var canvas = this.$refs.mycanvas;
      canvas.width = axis_Width;
      var context = canvas.getContext("2d");
      //开始
      function drawAxes() {
        context.save();
        context.lineWidth = 10;
        context.strokeStyle = "#ffffff";
        context.beginPath();
        context.moveTo(axis_Origin.x, axis_Origin.y);
        context.lineTo(axis_Width, axis_Origin.y);
        context.moveTo(axis_Origin_Two.x, axis_Origin_Two.y);
        context.lineTo(axis_Width, axis_Origin_Two.y);
        context.stroke();
        //drawHorizontalAxis();
        drawHorizontalAxisTicks(axis_Origin.x, axis_Origin.y);
        drawHorizontalAxisTicks(axis_Origin_Two.x, axis_Origin_Two.y);
        context.restore();
      }
      //绘制水平的小标
      function drawHorizontalAxisTicks(axis_Origin_X, axis_Origin_y) {
        context.lineWidth = 2;
        context.strokeStyle = "white";
        var deltaY;
        for (var i = 1; i < num_Horizontal_Ticks; i++) {
          context.beginPath();
          //判断画的是大坐标还是短坐标
          if (i % 5 == 0) {
            deltaY = tick_Height;
            context.moveTo(axis_Origin_X + i * tick_Spacing, axis_Origin_y - deltaY + 13);
            context.lineTo(axis_Origin_X + i * tick_Spacing, axis_Origin_y + deltaY + 9);
          } else {
            deltaY = tick_Height / 2;
            context.moveTo(axis_Origin_X + i * tick_Spacing, axis_Origin_y - deltaY + 9);
            context.lineTo(axis_Origin_X + i * tick_Spacing, axis_Origin_y + deltaY + 9);
          }

          context.stroke();
        }
      }
      //绘制标注
      function drawAxisLabels(axis_Origin_X, axis_Origin_y) {
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "top";
        //  context.font = "bold 12px Microsoft Yahei";
        var s = parseInt(minkm) - 1;
        var num = 0;
        for (var i = 0; i <= num_Horizontal_Ticks; i++) {
          if (i % 5 === 0) {
            s++;
            context.fillText("ZDK" + s, axis_Origin_X + i * tick_Spacing, axis_Origin_y + 20);
            num = 0;
          } else {
            num++;
            context.fillText(200 * num, axis_Origin_X + i * tick_Spacing, axis_Origin_y + 20);
          }
        }
      }
      //绘制地铁站
      function drawStations(stationListJson) {
        var json = stationListJson;
        var img = new Image();
        img.src = __webpack_require__("mC5q");
        img.onload = function () {
          var start = 0;
          for (var i = 0; i < json.length; i++) {
            // 绘制站点图
            var total = parseInt(json[i].start_flag) * 1000 + parseInt(json[i].start_length);
            //console.log("total：" + total);
            // 计算当前站点的x轴坐标
            var startX = (total - parseInt(minkm * 1000)) * everys;
            context.drawImage(img, startX + 89.5, 105, 22, 120);
            //站名
            context.font = "bold 24px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.textAlign = "left";
            var origin = json[i].name;
            var lens = json[i].name.length;
            context.fillText(origin, startX + 90, 55);
            //DK
            var codes = "DK" + json[i].start_flag + " +" + json[i].start_length;
            context.fillStyle = "#0AE39A";
            context.font = "14px Microsoft Yahei";
            context.fillText(codes, startX + 90, 85);
          }
        };
      }
      //绘制桥
      function drawBridgeAxis(bridgeListJson) {
        var json = bridgeListJson;
        for (var i = 0; i < json.length; i++) {
          var start = parseInt(json[i].start_flag) * 1000 + parseInt(json[i].start_length);
          var end = parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);
          var betweenMeters = end - start; //两点之间距离米
          var startX = (start - parseInt(minkm * 1000)) * everys; //开始值
          var endX = (end - parseInt(minkm * 1000)) * everys; //结束值
          var centerX = (endX + startX) / 2; //开始结束平均值

          context.lineWidth = 2;
          context.fillStyle = "#ffa918";
          context.strokeStyle = "#ffa918";
          var desc = json[i].name + " 共" + betweenMeters + "米";
          var codes = "DK" + json[i].start_flag + " +" + json[i].start_length + " ~ " + "DK" + json[i].end_flag + " +" + json[i].end_length;
          if (json[i].line_type == 1) {
            //画垂直线
            context.fillRect(centerX + offsetX, axis_Origin.y + 5, 2, 105);
            //画矩形
            context.strokeRect(startX + offsetX, axis_Origin.y + 110, betweenMeters * everys, 45);
            // context.moveTo(startX + offsetX+30, axis_Origin.y + 55) //起点
            // context.lineTo(startX + offsetX, axis_Origin.y + 105) //终点
            // context.moveTo(endX + offsetX-30, axis_Origin.y + 55) //起点
            // context.lineTo(endX + offsetX, axis_Origin.y + 105) //终点
            // context.stroke();
            //文字
            context.font = "13px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_Origin.y + 120);
            context.font = "11px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.fillText(codes, centerX + offsetX, axis_Origin.y + 138);
          } else {
            //
            context.fillRect(centerX + offsetX, axis_Origin_Two.y + 5, 2, 105);
            context.strokeRect(startX + offsetX, axis_Origin_Two.y + 110, betweenMeters * everys, 45);
            //    context.moveTo(startX + offsetX+30, axis_Origin_Two.y + 60) //起点
            //   context.lineTo(startX + offsetX, axis_Origin_Two.y + 105) //终点
            //  context.moveTo(endX + offsetX-30, axis_Origin_Two.y + 60) //起点
            // context.lineTo(endX + offsetX, axis_Origin_Two.y + 105) //终点
            // context.stroke();
            //文字
            context.font = "13px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_Origin_Two.y + 120);
            context.font = "11px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.fillText(codes, centerX + offsetX, axis_Origin_Two.y + 138);
          }

          //
        }
      }
      //绘隧道
      function drawTunnelAxis(tunnelListJson) {
        var json = tunnelListJson;
        // let json1 = [
        //   {
        //     id: 7,
        //     name: "隧道名称一",
        //     line_type: 1,
        //     start_flag: 15,
        //     start_length: 200,
        //     end_flag: 15,
        //     end_length: 800
        //   },
        //   {
        //     id: 7,
        //     name: "隧道名称二",
        //     line_type: 2,
        //     start_flag: 14,
        //     start_length: 200,
        //     end_flag: 16,
        //     end_length: 100
        //   }
        // ];

        for (var i = 0; i < json.length; i++) {
          var start = parseInt(json[i].start_flag) * 1000 + parseInt(json[i].start_length);
          var end = parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);
          var betweenMeters = end - start; //两点之间距离米
          var startX = (start - parseInt(minkm * 1000)) * everys; //开始值
          var endX = (end - parseInt(minkm * 1000)) * everys; //结束值
          var centerX = (endX + startX) / 2; //开始结束平均值

          context.lineWidth = 2;
          context.strokeStyle = "#18DBFF";
          var desc = json[i].name + " 共" + betweenMeters + "米";
          var codes = "DK" + json[i].start_flag + " +" + json[i].start_length + " ~ " + "DK" + json[i].end_flag + " +" + json[i].end_length;
          if (json[i].line_type == 1) {
            //画垂直线
            context.fillStyle = "#18DBFF";
            context.fillRect(startX + offsetX - 1, axis_Origin.y - 45, 2, 40);
            context.fillRect(endX + offsetX - 1, axis_Origin.y - 45, 2, 40);
            //画矩形
            context.strokeRect(startX + offsetX, axis_Origin.y - 90, betweenMeters * everys, 45);
            //文字
            context.fillStyle = "#18DBFF";
            context.font = "13px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_Origin.y - 80);
            context.font = "11px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.fillText(codes, centerX + offsetX, axis_Origin.y - 62);
          } else {
            //画垂直线
            context.fillStyle = "#18DBFF";
            context.fillRect(startX + offsetX - 1, axis_Origin_Two.y - 45, 2, 40);
            context.fillRect(endX + offsetX - 1, axis_Origin_Two.y - 45, 2, 40);

            //画矩形
            context.strokeRect(startX + offsetX, axis_Origin_Two.y - 90, betweenMeters * everys, 45);
            //文字
            context.font = "13px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_Origin_Two.y - 80);
            context.font = "11px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.fillText(codes, centerX + offsetX, axis_Origin_Two.y - 62);
          }

          //
        }
      }
      //绘制限速区
      function drawSpeedAxis(speedListJson) {
        var json = speedListJson;
        for (var i = 0; i < json.length; i++) {
          var start = parseInt(json[i].start_flag) * 1000 + parseInt(json[i].start_length);
          var end = parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);
          console.log("start：" + start + " end：" + end);
          // 计算当前站点的x轴坐标
          var startX = (start - parseInt(minkm * 1000)) * everys;
          var endX = (end - parseInt(minkm * 1000)) * everys;
          //console.log("startX：" + startX + " endX：" + endX);
          context.strokeStyle = "#FF18D3";
          context.lineWidth = 10;
          context.fillStyle = "#FF18D3";
          context.font = "12px Microsoft Yahei";
          var desc = "限速" + json[i].speed + "公里/小时";
          context.beginPath();
          if (json[i].line_type == 1) {
            //画水平直线
            context.moveTo(startX + offsetX, axis_Origin.y);
            context.lineTo(endX + offsetX, axis_Origin.y);
            //文字
            context.fillText(desc, startX + 152, axis_Origin.y + 35);
          } else {
            context.moveTo(startX + offsetX, axis_Origin_Two.y);
            context.lineTo(endX + offsetX, axis_Origin_Two.y);
            context.fillText(desc, startX + 152, axis_Origin_Two.y + 35);
          }
          context.stroke();
          //
        }
      }
      //绘制防区
      function drawAlertAxis(alertListJson) {
        var json = alertListJson;
        for (var i = 0; i < json.length; i++) {
          var start = parseInt(json[i].start_flag) * 1000 + parseInt(json[i].start_length);
          var end = parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);
          console.log("start：" + start + " end：" + end);
          // 计算当前站点的x轴坐标
          var startX = (start - parseInt(minkm * 1000)) * everys;
          var endX = (end - parseInt(minkm * 1000)) * everys;
          //console.log("startX：" + startX + " endX：" + endX);
          context.strokeStyle = "#ff1833";
          context.lineWidth = 10;
          context.fillStyle = "#ff1833";
          context.font = "12px Microsoft Yahei";
          var desc = "防区 DK" + json[i].start_flag + "+" + json[i].start_length + "- DK" + json[i].end_flag + "+" + json[i].end_length;
          context.beginPath();
          if (json[i].line_type == 1) {
            //画水平直线
            context.moveTo(startX + offsetX, axis_Origin.y);
            context.lineTo(endX + offsetX, axis_Origin.y);
            //文字
            context.fillText(desc, startX + 178, axis_Origin.y + 35);
          } else {
            context.moveTo(startX + offsetX, axis_Origin_Two.y);
            context.lineTo(endX + offsetX, axis_Origin_Two.y);
            context.fillText(desc, startX + 178, axis_Origin_Two.y + 35);
          }
          context.stroke();
          //
        }
      }
      //绘制坡度
      function drawSlopeAxis(slopeListJson) {
        var json = slopeListJson;
        // let json1 = [
        //   {
        //     id: 7,
        //     name: "\u9650\u901f",
        //     line_type: 1,
        //     start_flag: 14,
        //     start_length: 200,
        //     end_flag: 14,
        //     end_length: 400,
        //     height: "2",
        //     length: "200",
        //     type: 1
        //   },
        //   {
        //     id: 7,
        //     name: "\u9650\u901f",
        //     line_type: 1,
        //     start_flag: 14,
        //     start_length: 400,
        //     end_flag: 14,
        //     end_length: 600,
        //     height: "3",
        //     length: "300",
        //     type: 1
        //   },
        //   {
        //     id: 7,
        //     name: "\u9650\u901f",
        //     line_type: 1,
        //     start_flag: 14,
        //     start_length: 600,
        //     end_flag: 15,
        //     end_length: 0,
        //     height: "4",
        //     length: "600",
        //     type: 3
        //   },
        //   {
        //     id: 7,
        //     name: "\u9650\u901f",
        //     line_type: 1,
        //     start_flag: 15,
        //     start_length: 0,
        //     end_flag: 15,
        //     end_length: 400,
        //     height: "4",
        //     length: "400",
        //     type: 3
        //   },
        //   {
        //     id: 7,
        //     name: "右线",
        //     line_type: 2,
        //     start_flag: 14,
        //     start_length: 200,
        //     end_flag: 14,
        //     end_length: 400,
        //     height: "3",
        //     length: "300",
        //     type: 1
        //   },
        //   {
        //     id: 7,
        //     name: "\u9650\u901f",
        //     line_type: 2,
        //     start_flag: 14,
        //     start_length: 400,
        //     end_flag: 14,
        //     end_length: 600,
        //     height: "3.00",
        //     length: "200",
        //     type: 1
        //   },
        //   {
        //     id: 7,
        //     name: "\u9650\u901f",
        //     line_type: 2,
        //     start_flag: 14,
        //     start_length: 600,
        //     end_flag: 15,
        //     end_length: 0,
        //     height: "3.00",
        //     length: "600",
        //     type: 3
        //   },
        //   {
        //     id: 7,
        //     name: "\u9650\u901f",
        //     line_type: 2,
        //     start_flag: 15,
        //     start_length: 0,
        //     end_flag: 15,
        //     end_length: 400,
        //     height: "3.00",
        //     length: "600",
        //     type: 3
        //   }
        // ];

        for (var i = 0; i < json.length; i++) {
          var start = parseInt(json[i].start_flag) * 1000 + parseInt(json[i].start_length);
          var end = parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);
          var betweenMeters = end - start; //两点之间距离米
          var startX = (start - parseInt(minkm * 1000)) * everys; //开始值
          var endX = (end - parseInt(minkm * 1000)) * everys; //结束值
          var centerX = (endX + startX) / 2; //开始结束平均值

          context.lineWidth = 1;
          context.strokeStyle = "#FF5F18";
          context.fillStyle = "#FF5F18";

          var slope_height = parseFloat(json[i].height);
          var slope_length = parseFloat(json[i].length);
          var slope_center = betweenMeters * everys / 2;
          //type  1 2 3 代表上坡 平坡 下坡
          if (json[i].line_type == 1) {
            //对角线
            if (json[i].type == 1) {
              context.moveTo(startX + offsetX, axis_Origin.y + 100); //起点
              context.lineTo(startX + offsetX + betweenMeters * everys, axis_Origin.y + 50); //终点
              context.stroke();
              context.fillText(slope_height, startX + offsetX + slope_center - 20, axis_Origin.y + 60);
              context.fillText(slope_length, startX + offsetX + slope_center + 20, axis_Origin.y + 80);
            }
            if (json[i].type == 2) {
              context.moveTo(startX + offsetX, axis_Origin.y + 50 + 25); //起点
              context.lineTo(startX + offsetX + betweenMeters * everys, axis_Origin.y + 50 + 25); //终点
              context.stroke();
              context.fillText(slope_height, startX + offsetX + slope_center, axis_Origin.y + 60);
              context.fillText(slope_length, startX + offsetX + slope_center, axis_Origin.y + 80);
            }
            if (json[i].type == 3) {
              context.moveTo(startX + offsetX, axis_Origin.y + 50); //起点
              context.lineTo(startX + offsetX + betweenMeters * everys, axis_Origin.y + 100); //终点
              context.stroke();
              context.fillText(slope_height, startX + offsetX + slope_center + 20, axis_Origin.y + 60);
              context.fillText(slope_length, startX + offsetX + slope_center - 20, axis_Origin.y + 80);
            }
            //画矩形
            context.strokeRect(startX + offsetX, axis_Origin.y + 50, betweenMeters * everys, 50);
          } else if (json[i].line_type == 2) {
            //对角线
            if (json[i].type == 1) {
              context.moveTo(startX + offsetX, axis_Origin_Two.y + 100); //起点
              context.lineTo(startX + offsetX + betweenMeters * everys, axis_Origin_Two.y + 50); //终点
              context.stroke();
              context.fillText(slope_height, startX + offsetX + slope_center - 20, axis_Origin_Two.y + 60);
              context.fillText(slope_length, startX + offsetX + slope_center + 20, axis_Origin_Two.y + 80);
            }
            if (json[i].type == 2) {
              context.moveTo(startX + offsetX, axis_Origin_Two.y + 50 + 25); //起点
              context.lineTo(startX + offsetX + betweenMeters * everys, axis_Origin_Two.y + 50 + 25); //终点
              context.stroke();
              context.fillText(slope_height, startX + offsetX + slope_center, axis_Origin_Two.y + 60);
              context.fillText(slope_length, startX + offsetX + slope_center, axis_Origin_Two.y + 80);
            }
            if (json[i].type == 3) {
              context.moveTo(startX + offsetX, axis_Origin_Two.y + 50); //起点
              context.lineTo(startX + offsetX + betweenMeters * everys, axis_Origin_Two.y + 100); //终点
              context.stroke();
              context.fillText(slope_height, startX + offsetX + slope_center + 20, axis_Origin_Two.y + 60);
              context.fillText(slope_length, startX + offsetX + slope_center - 20, axis_Origin_Two.y + 80);
            }
            //画矩形
            context.strokeRect(startX + offsetX, axis_Origin_Two.y + 50, betweenMeters * everys, 50);
          }
          //
        }
      }

      //绘制施工进度
      function drawProgressAxis(sprogressListJson) {
        var json = sprogressListJson;
        for (var i = 0; i < json.length; i++) {
          var start = parseInt(json[i].start_flag) * 1000 + parseInt(json[i].start_length);
          var end = parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);
          console.log("start：" + start + " end：" + end);
          // 计算当前站点的x轴坐标
          var startX = (start - parseInt(minkm * 1000)) * everys;
          var endX = (end - parseInt(minkm * 1000)) * everys;
          //console.log("startX：" + startX + " endX：" + endX);
          context.lineWidth = 10;
          context.strokeStyle = "#27DB07";
          context.beginPath();
          if (json[i].line_type == 1) {
            //画水平直线
            context.moveTo(startX + offsetX, axis_Origin.y);
            context.lineTo(endX + offsetX, axis_Origin.y);
          } else if (json[i].line_type == 2) {
            context.moveTo(startX + offsetX, axis_Origin_Two.y);
            context.lineTo(endX + offsetX, axis_Origin_Two.y);
          }
          context.stroke();
          //
        }
      }
      //基础
      drawAxes();
      drawAxisLabels(axis_Origin.x, axis_Origin.y);
      drawAxisLabels(axis_Origin_Two.x, axis_Origin_Two.y);
      //画地铁站
      drawStations(this.stationList);

      //桥
      if (this.bridgeCheckValue) {
        drawBridgeAxis(this.bridgeList);
      }
      //隧道
      if (this.tunnelCheckValue) {
        drawTunnelAxis(this.tunnelList);
      }
      //限速区
      if (this.speedCheckValue) {
        drawSpeedAxis(this.speedList);
      }
      //防区
      if (this.alertCheckValue) {
        drawAlertAxis(this.alertList);
      }
      //坡度
      if (this.slopeCheckValue) {
        drawSlopeAxis(this.slopeList);
      }
      //施工进度
      if (this.progressCheckValue) {
        drawProgressAxis(this.progressListItem);
      }
    },


    // =============桥 隧道 限速区 防区 道岔 坡度 施工进度
    //进度
    progressCheckSelect: function progressCheckSelect(val) {
      var _this2 = this;

      this.progressList.map(function (item) {
        if (item.name == val) {
          _this2.progressListItem = item.list;
        }
      });
      console.log("progressListItem" + stringify_default()(this.progressListItem));
      this.getProjectProcessMap();
    },

    //桥
    bridgeCheckSelect: function bridgeCheckSelect() {
      this.getProjectProcessMap();
    },

    //隧道
    tunnelCheckSelect: function tunnelCheckSelect() {
      this.getProjectProcessMap();
    },

    //限速区
    speedCheckSelect: function speedCheckSelect() {
      this.getProjectProcessMap();
    },

    //防区
    alertCheckSelect: function alertCheckSelect() {
      this.getProjectProcessMap();
    },

    //坡度
    slopeCheckSelect: function slopeCheckSelect() {
      this.getProjectProcessMap();
    },


    //top
    stationLeftMove: function stationLeftMove() {
      if (this.wdpx < 0) {
        this.wdpx += 1;
      }
    },
    stationRightMove: function stationRightMove() {
      if (this.wdpx > -(this.stationList.length + this.wdpx)) {
        this.wdpx -= 1;
      }
    },
    scrollPosition: function scrollPosition(start_flag, start_length) {
      var total = start_flag;
      var startX = (total - this.minKM) * 1000 * 0.5;
      console.log(startX);
      document.querySelector(".group-canvas").scrollTo(startX, 0);
    }
    //

  }
}, "mounted", function mounted() {
  var _this3 = this;

  window.addEventListener("resize", function () {
    _this3.scrollwidth = document.documentElement.clientWidth - 640;
  });
}));
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-28f9dcfc","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/monitor/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"progress"}},[_c('div',{staticClass:"station-top"},[_c('div',{staticClass:"startend"},[_c('div',{staticClass:"sleft"},[_vm._v("\n        "+_vm._s(_vm.firstStation)+"方向\n        "),_c('i',{staticClass:"line-a"})]),_vm._v(" "),_c('div',{staticClass:"scenter"},[_c('div',{staticClass:"stations"},[_c('i',{staticClass:"el-icon-arrow-left",on:{"click":_vm.stationLeftMove}}),_vm._v(" "),_c('div',{staticClass:"item",style:({width:_vm.scrollwidth  + 'px'})},[_c('ul',{style:({width: _vm.stationList.length * 100 + 'px','margin-left': _vm.wdpx * 100 + 'px'})},_vm._l((_vm.stationList),function(item){return _c('li',{key:item.id,on:{"click":function($event){_vm.scrollPosition(item.start_flag,item.start_length)}}},[_vm._v(_vm._s(item.name))])}))]),_vm._v(" "),_c('i',{staticClass:"el-icon-arrow-right",on:{"click":_vm.stationRightMove}})])]),_vm._v(" "),_c('div',{staticClass:"sright"},[_vm._v("\n        "+_vm._s(_vm.lastStation)+"方向\n        "),_c('i',{staticClass:"line-b"})])])]),_vm._v(" "),_c('div',{staticClass:"main-canvas"},[_c('div',{staticClass:"group-canvas scrollbar"},[_c('canvas',{ref:"mycanvas",attrs:{"id":"mycanvas","height":"680"}},[_c('p',[_vm._v("您的系统不支持此程序!")])])])]),_vm._v(" "),_c('div',{staticClass:"progresslist"},[_vm._v("\n    施工进度：\n    "),_c('el-radio-group',{on:{"change":_vm.progressCheckSelect},model:{value:(_vm.progressCheckValue),callback:function ($$v) {_vm.progressCheckValue=$$v},expression:"progressCheckValue"}},_vm._l((_vm.progressList),function(item){return _c('el-radio',{key:item.name,attrs:{"label":item.name}},[_vm._v(_vm._s(item.name))])}))],1),_vm._v(" "),_c('div',{staticClass:"stations-select"},[_c('el-checkbox',{staticClass:"bridgechk",attrs:{"label":"桥","border":""},on:{"change":_vm.bridgeCheckSelect},model:{value:(_vm.bridgeCheckValue),callback:function ($$v) {_vm.bridgeCheckValue=$$v},expression:"bridgeCheckValue"}}),_vm._v(" "),_c('el-checkbox',{staticClass:"tunnelchk",attrs:{"label":"隧道","border":""},on:{"change":_vm.tunnelCheckSelect},model:{value:(_vm.tunnelCheckValue),callback:function ($$v) {_vm.tunnelCheckValue=$$v},expression:"tunnelCheckValue"}}),_vm._v(" "),_c('el-checkbox',{staticClass:"speedchk",attrs:{"label":"限速区","border":""},on:{"change":_vm.speedCheckSelect},model:{value:(_vm.speedCheckValue),callback:function ($$v) {_vm.speedCheckValue=$$v},expression:"speedCheckValue"}}),_vm._v(" "),_c('el-checkbox',{staticClass:"alertchk",attrs:{"label":"防区","border":""},on:{"change":_vm.alertCheckSelect},model:{value:(_vm.alertCheckValue),callback:function ($$v) {_vm.alertCheckValue=$$v},expression:"alertCheckValue"}}),_vm._v(" "),_c('el-checkbox',{staticClass:"slopechk",attrs:{"label":"坡度","border":""},on:{"change":_vm.slopeCheckSelect},model:{value:(_vm.slopeCheckValue),callback:function ($$v) {_vm.slopeCheckValue=$$v},expression:"slopeCheckValue"}})],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_monitor = (esExports);
// CONCATENATED MODULE: ./src/views/monitor/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("LDeD")
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
  monitor,
  views_monitor,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_monitor = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "mC5q":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAB4CAYAAAD2SgIRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF7WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTAzLTA5VDEzOjM1OjU1KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wMy0wOVQxMzo0MTowNCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wMy0wOVQxMzo0MTowNCswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MmU0NDMyNi05MWZmLWIyNGYtYjBlNC1kMmQ4NDU1ZGM3ZjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzFDNDIyOTVGQzIxMTFFNzgyMTFDQzIwRTFCNkNBQjIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDMUM0MjI5NUZDMjExMUU3ODIxMUNDMjBFMUI2Q0FCMiIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkMxQzQyMjkyRkMyMTExRTc4MjExQ0MyMEUxQjZDQUIyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkMxQzQyMjkzRkMyMTExRTc4MjExQ0MyMEUxQjZDQUIyIi8+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjcyZTQ0MzI2LTkxZmYtYjI0Zi1iMGU0LWQyZDg0NTVkYzdmNiIgc3RFdnQ6d2hlbj0iMjAyMC0wMy0wOVQxMzo0MTowNCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrFLz64AAAJLSURBVGiB7dlPiIxxGAfwz7wrrfdg13vAYXv9aXMSSlJOnFBckHLjLMXFwdXBwWEPTpzJxa6EuDlsuTmwCiWZSRG740+7i02tw/sO7/7M2DFJqd+3pul95nk+M/POvM8cplafmtEhK3AEe7EJqzGHV3iOO7iaZ+n7dsO1NnA/TuE0Bjs9a5kPOI+RPEs//w5ei5vYuAgY5jH251n6slVIKg8OYbwHVDkz3mjODoVwP8ZKvJpJnFGc4/7ytqmsTQa9QxhrNGeXVeGT2BY0jmEY5zCBr+VtoqwNYzSY2VZaavWpmQwvMFBpuI6DmG/7xn+mhms4UKl9xPpE8ZWqopM42gWq7DmGd5XaAI4k2B00X8CnLlCQZ+knjATlPQm2BMUb3aKV3AqONydYFRSf9gA/C45XJYoPoJq+HuAlwfG3BG+C4oYe4HDmdYKHQXFfD3A48yRRbKlqjlt8+fxIozk7UM5UczfBFcWWamU1LuruXPfhUjnTygdcThRXSvg9PIyrFl44YZaXPYeD+kiepR9ba3Mp7mNr0PRWccHcVuwIik22DyewMuh/gB15ls5V9/Ea3MO6Dq/wS3nf3+Hxl9iZZ2mdhfu4jl141GGwtTbbZaKKhnAL346zmO6AVDNd9m6vorT/zWtlEIewR7FCqxnFXYz+yY9pu4Qr9McayLO07UB4Kv5aIhzhCEc4whGOcIQjHOEIRzjCEY5whCMc4QhHOMIR/qdwbX5+8T8aG83ZBU15lob/qP2S/+9URDjCEY5whCMc4QhH+P+BvwN7e4CFmUzVxQAAAABJRU5ErkJggg=="

/***/ }),

/***/ "zLFK":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n#progress {\r\n  background: #081c33;\r\n  height: 100vh;\n}\n.main-canvas {\r\n  background: #081c33;\n}\n.group-canvas {\r\n  overflow-x: scroll;\r\n  overflow-y: hidden;\r\n  height: 680px;\r\n  padding-right: 100px;\n}\n.station-top {\r\n  margin: 0 30px;\n}\n.startend {\r\n  padding-top: 30px;\r\n  overflow: hidden;\n}\n.startend .sleft,\r\n.startend .sright {\r\n  background: #4b6eca;\r\n  color: #fff;\r\n  padding: 10px 15px 15px 15px;\r\n  display: block;\r\n  font-size: 16px;\r\n  font-weight: 700;\n}\n.startend .sleft {\r\n  float: left;\r\n  margin-right: 20px;\n}\n.startend .scenter {\n}\n.startend .sright {\r\n  float: right;\n}\n.startend .line-a {\r\n  position: relative;\r\n  background: #fff;\r\n  height: 1px;\r\n  display: block;\r\n  margin-top: 6px;\n}\n.startend .line-a::before {\r\n  content: \"\";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 2px;\r\n  width: 10px;\r\n  height: 3px;\r\n  border-bottom: 1px solid #fff;\r\n  -webkit-transform: rotateZ(45deg);\r\n          transform: rotateZ(45deg);\n}\n.startend .line-b {\r\n  position: relative;\r\n  background: #fff;\r\n  height: 1px;\r\n  display: block;\r\n  margin-top: 6px;\n}\n.startend .line-b::before {\r\n  content: \"\";\r\n  position: absolute;\r\n  right: -1px;\r\n  top: 4px;\r\n  width: 10px;\r\n  height: 3px;\r\n  border-bottom: 1px solid #fff;\r\n  -webkit-transform: rotateZ(135deg);\r\n          transform: rotateZ(135deg);\n}\n.stations {\r\n  float: left;\n}\n.stations .item {\r\n  width: 500px;\r\n  overflow: hidden;\r\n  display: inline-block;\r\n  white-space: nowrap;\n}\n.stations ul li {\r\n  display: inline-block;\r\n  background: #4b6eca;\r\n  color: #fff;\r\n  padding: 17px 15px;\r\n  margin-left: 10px;\r\n  cursor: pointer;\n}\n.stations ul li:hover {\r\n  background: #2359e2;\n}\n.stations i {\r\n  display: inline-block;\r\n  background: #3062e2;\r\n  color: #fff;\r\n  padding: 15px 15px;\r\n  font-size: 20px;\r\n  vertical-align: top;\r\n  cursor: pointer;\n}\n.stations i:hover {\r\n  background: #2359e2;\n}\n.stations-select {\r\n  margin-top: 30px;\r\n  padding-bottom: 30px;\r\n  text-align: center;\n}\n.stations-select .el-checkbox__label {\r\n  color: #fff;\n}\n.bridgechk.is-checked {\r\n  border-color: #ffa918 !important;\n}\n.bridgechk .el-checkbox__input.is-checked .el-checkbox__inner {\r\n  background-color: #ffa918;\r\n  border-color: #ffa918;\n}\n.bridgechk.is-checked .el-checkbox__label {\r\n  color: #ffa918;\n}\n.tunnelchk.is-checked {\r\n  border-color: #18dbff !important;\n}\n.tunnelchk .el-checkbox__input.is-checked .el-checkbox__inner {\r\n  background-color: #18dbff;\r\n  border-color: #18dbff;\n}\n.tunnelchk.is-checked .el-checkbox__label {\r\n  color: #18dbff;\n}\n.speedchk.is-checked {\r\n  border-color: #ff18d3 !important;\n}\n.speedchk .el-checkbox__input.is-checked .el-checkbox__inner {\r\n  background-color: #ff18d3;\r\n  border-color: #ff18d3;\n}\n.speedchk.is-checked .el-checkbox__label {\r\n  color: #ff18d3;\n}\n.slopechk.is-checked {\r\n  border-color: #ff5f18 !important;\n}\n.slopechk .el-checkbox__input.is-checked .el-checkbox__inner {\r\n  background-color: #ff5f18;\r\n  border-color: #ff5f18;\n}\n.slopechk.is-checked .el-checkbox__label {\r\n  color: #ff5f18;\n}\n.alertchk.is-checked {\r\n  border-color: #ff1833 !important;\n}\n.alertchk .el-checkbox__input.is-checked .el-checkbox__inner {\r\n  background-color: #ff1833;\r\n  border-color: #ff1833;\n}\n.alertchk.is-checked .el-checkbox__label {\r\n  color: #ff1833;\n}\n.progresslist {\r\n  padding-top: 20px;\r\n  padding-left: 30px;\r\n  color: #fff;\n}\n.progresslist .el-radio__label {\r\n  color: #fff;\n}\r\n", ""]);

// exports


/***/ })

});