webpackJsonp([2],{

/***/ "9bBU":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("mClu");
var $Object = __webpack_require__("FeBl").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "C4MV":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("9bBU"), __esModule: true };

/***/ }),

/***/ "Mwn6":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n#progress {\r\n  background: #081c33;\r\n  height: 100vh;\n}\n.group-canvas {\r\n  overflow-x: scroll;\r\n  overflow-y: hidden;\r\n  height: 580px;\r\n  padding-right: 100px;\n}\n.station-top {\r\n  margin: 0 40px;\n}\n.startend {\r\n  padding-top: 40px;\r\n  overflow: hidden;\n}\n.startend div {\r\n  background: #4b6eca;\r\n  color: #fff;\r\n  padding: 15px 15px;\r\n  display: block;\r\n  font-size: 18px;\n}\n.startend .sleft {\r\n  float: left;\n}\n.startend .sright {\r\n  float: right;\r\n  margin-right: 10px;\n}\n.startend .line-a {\r\n  position: relative;\r\n  background: #fff;\r\n  height: 1px;\r\n  display: block;\r\n  margin-top: 10px;\n}\n.startend .line-a::before {\r\n  content: \"\";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 2px;\r\n  width: 10px;\r\n  height: 3px;\r\n  border-bottom: 1px solid #fff;\r\n  -webkit-transform: rotateZ(45deg);\r\n          transform: rotateZ(45deg);\n}\n.startend .line-b {\r\n  position: relative;\r\n  background: #fff;\r\n  height: 1px;\r\n  display: block;\r\n  margin-top: 10px;\n}\n.startend .line-b::before {\r\n  content: \"\";\r\n  position: absolute;\r\n  right: -1px;\r\n  top: 4px;\r\n  width: 10px;\r\n  height: 3px;\r\n  border-bottom: 1px solid #fff;\r\n  -webkit-transform: rotateZ(135deg);\r\n          transform: rotateZ(135deg);\n}\n.stations {\r\n  padding-top: 30px;\r\n  margin-bottom: 50px;\n}\n.stations .item {\r\n  width: 900px;\r\n  overflow: hidden;\r\n  display: inline-block;\r\n  white-space: nowrap;\n}\n.stations ul li {\r\n  display: inline-block;\r\n  background: #4b6eca;\r\n  color: #fff;\r\n  padding: 10px 15px;\r\n  margin-left: 15px;\r\n  cursor: pointer;\n}\n.stations ul li:hover {\r\n  background: #2359e2;\n}\n.stations i {\r\n  display: inline-block;\r\n  background: #3062e2;\r\n  color: #fff;\r\n  padding: 8px 15px;\r\n  font-size: 20px;\r\n  vertical-align: top;\r\n  cursor: pointer;\n}\n.stations i:hover {\r\n  background: #2359e2;\n}\r\n\r\n/* //#27DB07 */\r\n", ""]);

// exports


/***/ }),

/***/ "bG04":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("Mwn6");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("6af99c28", content, true);

/***/ }),

/***/ "bOdI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__("C4MV");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),

/***/ "lZYz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("bOdI");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

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
      every: 1
    };
  },
  created: function created() {
    this.getProjectProcessMap();
  },
  mounted: function mounted() {},

  methods: {
    touchStart: function touchStart(e) {
      var x = e.clientX;
      console.log("start:" + x);
    },
    touchMove: function touchMove(e) {
      var x = e.clientX;
      console.log("move：" + x);
    },
    touchEnd: function touchEnd(e) {
      console.log("end");
    },
    getProjectProcessMap: function getProjectProcessMap() {
      var _this = this;

      this.request({
        url: "/monitor/getMointorDatas",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
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
          _this.scrollwidth = document.documentElement.clientWidth - 380;
          console.log(_this.scrollwidth);
          _this.firstStation = json[0].name; // 第一个站
          _this.lastStation = json[json.length - 1].name; // 最后一个站

          // 总里程
          _this.totalMileage = (end.start_flag - first.start_flag) * 1000 + end.start_length - first.start_length;
          _this.minMileage = first.start_flag * 1000 + first.start_length; //最小里程
          _this.minKM = first.start_flag; //最小公里
          console.log("总里程mileage：" + _this.totalMileage + " 最小里程minMileage：" + _this.minMileage + " minKM：" + _this.minKM);
          _this.initCanvas();
          //  this.getLineType();
        }
      });
    },
    initCanvas: function initCanvas() {
      //坐标轴宽度高度
      var axis_Width = this.totalMileage / 2 + 600;
      var axis_Height = "480";
      //标尺起点
      var axis_Origin = {
        x: 100,
        y: axis_Height - 250
      };
      var axis_Origin_two = {
        x: 100,
        y: axis_Height - 50
      };
      //刻度的间隔
      var tick_Spacing = 100;
      //标记数值
      var num_Horizontal_Ticks = axis_Width / tick_Spacing;
      //刻度线高度
      var tick_Height = 8;

      //初始化
      var canvas = this.$refs.mycanvas;
      canvas.width = axis_Width;
      var context = canvas.getContext("2d");

      //开始
      function drawAxes() {
        context.save();
        context.lineWidth = 10;
        context.strokeStyle = "#27DB07";
        context.beginPath();
        context.moveTo(axis_Origin.x, axis_Origin.y);
        context.lineTo(axis_Width, axis_Origin.y);

        context.moveTo(axis_Origin_two.x, axis_Origin_two.y);
        context.lineTo(axis_Width, axis_Origin_two.y);
        context.stroke();

        //drawHorizontalAxis();

        drawHorizontalAxisTicks(axis_Origin.x, axis_Origin.y);
        drawHorizontalAxisTicks(axis_Origin_two.x, axis_Origin_two.y);
        context.restore();
      }
      // //画线
      // function drawHorizontalAxis() {
      //   context.strokeStyle = "#000";
      //   context.beginPath();
      //   context.moveTo(750, axis_Origin.y);
      //   context.lineTo(1000, axis_Origin.y);
      //   context.stroke();
      // }
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
      function drawAxisLabels(minkm, axis_Origin_X, axis_Origin_y) {
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "top";
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
      //画地铁站
      var json1 = this.stationList;
      var json = [{ id: 1, name: "苏庙站", start_flag: 14, start_length: 100 }, { id: 2, name: "钱桥站", start_flag: 15, start_length: 300 }, { id: 3, name: "龙山梢站", start_flag: 16, start_length: 400 }, { id: 4, name: "石门路", start_flag: 18, start_length: 450 }, { id: 5, name: "盛岸站", start_flag: 19, start_length: 760 }, { id: 6, name: "吴桥站", start_flag: 21, start_length: 370 }, { id: 7, name: "北栅口三院站", start_flag: 22, start_length: 520 }, { id: 8, name: "无锡火车站", start_flag: 23, start_length: 550 }, { id: 9, name: "广瑞站", start_flag: 24, start_length: 870 }, { id: 10, name: "靖海站", start_flag: 26, start_length: 110 }, { id: 11, name: "东风站", start_flag: 27, start_length: 320 }, { id: 12, name: "叙丰站", start_flag: 28, start_length: 320 }, { id: 13, name: "太湖花园站", start_flag: 29, start_length: 370 }, { id: 14, name: "新光路站", start_flag: 30, start_length: 720 }, { id: 15, name: "旺庄路站", start_flag: 31, start_length: 650 }, { id: 16, name: "黄山路站", start_flag: 33, start_length: 450 }, { id: 17, name: "高浪东路站", start_flag: 34, start_length: 390 }, { id: 18, name: "周泾巷站", start_flag: 35, start_length: 770 }, { id: 19, name: "无锡新区站", start_flag: 37, start_length: 650 }, { id: 20, name: "长江南路站", start_flag: 38, start_length: 940 }, { id: 21, name: "硕放机场站", start_flag: 41, start_length: 200 }, { id: 22, name: "车辆段", start_flag: 42, start_length: 410 }];
      var every = 0.5; //每米长度等于px
      var minKm = this.minKM; //最小公里
      var img = new Image();
      img.src = __webpack_require__("mC5q");
      img.onload = function () {
        var start = 0;
        for (var i = 0; i < json.length; i++) {
          // 绘制站点图
          var total = parseInt(json[i].start_flag) * 1000 + parseInt(json[i].start_length);
          console.log("total：" + total);
          // 计算当前站点的x轴坐标
          var startX = (total - parseInt(minKm * 1000)) * every;
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

      //
      drawAxes();
      drawAxisLabels(this.minKM, axis_Origin.x, axis_Origin.y);
      drawAxisLabels(this.minKM, axis_Origin_two.x, axis_Origin_two.y);
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
  var _this2 = this;

  window.addEventListener("resize", function () {
    _this2.scrollwidth = document.documentElement.clientWidth - 380;
  });
}));
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2cad86a0","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/monitor/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"progress"}},[_c('div',{staticClass:"station-top"},[_c('div',{staticClass:"startend"},[_c('div',{staticClass:"sleft"},[_vm._v("\n        "+_vm._s(_vm.firstStation)+"方向\n        "),_c('i',{staticClass:"line-a"})]),_vm._v(" "),_c('div',{staticClass:"sright"},[_vm._v("\n        "+_vm._s(_vm.lastStation)+"方向\n        "),_c('i',{staticClass:"line-b"})])]),_vm._v(" "),_c('div',{staticClass:"stations"},[_c('i',{staticClass:"el-icon-arrow-left",on:{"click":_vm.stationLeftMove}}),_vm._v(" "),_c('div',{staticClass:"item",style:({width:_vm.scrollwidth  + 'px'})},[_c('ul',{style:({width: _vm.stationList.length * 100 + 'px','margin-left': _vm.wdpx * 100 + 'px'})},_vm._l((_vm.stationList),function(item){return _c('li',{key:item.id,on:{"click":function($event){_vm.scrollPosition(item.start_flag,item.start_length)}}},[_vm._v(_vm._s(item.name))])}))]),_vm._v(" "),_c('i',{staticClass:"el-icon-arrow-right",on:{"click":_vm.stationRightMove}})])]),_vm._v(" "),_c('div',{staticClass:"main-canvas"},[_c('div',{staticClass:"group-canvas",on:{"mousedown":[function($event){_vm.touchStart($event)},function($event){_vm.touchMove($event)}]}},[_c('canvas',{ref:"mycanvas",attrs:{"id":"mycanvas","height":"480"}},[_c('p',[_vm._v("您的系统不支持此程序!")])])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_monitor = (esExports);
// CONCATENATED MODULE: ./src/views/monitor/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("bG04")
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

/***/ "mClu":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("kM2E");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("+E39"), 'Object', { defineProperty: __webpack_require__("evD5").f });


/***/ })

});