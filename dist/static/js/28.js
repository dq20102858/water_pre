webpackJsonp([28],{

/***/ "UD/b":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.sttitle {\r\n  color: #fff;\r\n  padding: 22px 0 0 25px;\r\n  font-size: 24px;\r\n  text-align: center;\n}\n#progress {\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 100%;\r\n  background: #081c33;\n}\n.progress {\r\n  background: #081c33;\r\n  padding-bottom: 30px;\n}\n@media (max-width: 1024px) {\n#progress {\r\n    width: 1024px;\n}\n}\n.station {\r\n  margin: 50px 0px 0px 230px;\r\n  position: relative;\r\n  z-index: 999;\n}\n.stationlineleft {\r\n  min-height: 188px;\r\n  width: 1px;\r\n  background: #fff;\r\n  position: absolute;\r\n  left: 8px;\r\n  top: 215px;\r\n  z-index: 1000;\n}\n.stationlineright {\r\n  min-height: 188px;\r\n  width: 1px;\r\n  background: #fff;\r\n  position: absolute;\r\n  right: 40px;\r\n  top: 215px;\r\n  z-index: 1000;\n}\n.linebox {\r\n  margin-left: 30px;\r\n  margin-right: 40px;\r\n  border-top: 0;\r\n  overflow: hidden;\r\n  clear: both;\n}\r\n/* lineTable */\n.lineTable {\r\n  width: 100%;\r\n  border: 1px #fff solid;\r\n  border-collapse: collapse;\n}\n.lineTable td {\r\n  color: #fff;\r\n  border: 1px solid #fff;\n}\n.lineTable .tdtitle {\r\n  text-align: center;\r\n  overflow: hidden;\r\n  height: 18px;\r\n  padding-left: 5px;\r\n  width: 125px;\r\n  font-size: 12px;\r\n  line-height: 18px;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\n}\n.tdbar .bar {\r\n  border-bottom: 1px solid #fff;\r\n  height: 18px;\r\n  overflow: hidden;\n}\n.tdbar .bar:last-child {\r\n  border-bottom: 0;\n}\n.tdbar .bar span {\r\n  font-size: 12px;\r\n  color: #fff;\r\n  width: 78px;\r\n  float: left;\r\n  line-height: 18px;\r\n  text-align: center;\r\n  border-right: 0px #fff solid;\n}\n.tdbar .bar em {\r\n  height: 20px;\r\n  display: inline-block;\r\n  position: relative;\r\n  overflow: hidden;\n}\n.tdbar .bar em i {\r\n  position: absolute;\r\n  top: 0;\r\n  background: #27db07;\r\n  height: 18px;\r\n  display: inline-block;\r\n  border-left: 1px #1da505 solid;\n}\n.tdbar .bar em i:first-child {\r\n  border-left: 0;\n}\n.tdbar .bar em i:last-child {\r\n  border-left: 0;\n}\n.clear {\r\n  clear: both;\n}\r\n/* //#27DB07 */\r\n", ""]);

// exports


/***/ }),

/***/ "naN1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/progress/index.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var progress = ({
  data: function data() {
    return {
      conheight: {
        height: ""
      },
      cwidth: 0,
      stationList: [],
      lineTypeList: [],
      listSchedule: [],
      stationlineHeight: 0,
      stationlineTwoHeight: 0,
      every: 0,
      everyLineType: 0,
      lineTypeMinMileage: 0,
      lineTypeMaxMileage: 0,
      lineTypeEnterMinMileage: 0,
      lineTypeOutMinMileage: 0
    };
  },
  updated: function updated() {
    this.getStationList();
    this.stationlineHeight = 188 + this.$refs.reflinebox.offsetHeight;
  },
  created: function created() {
    this.getProjectProcessMap();
  },

  methods: {
    getProjectProcessMap: function getProjectProcessMap() {
      var _this = this;

      this.request({
        url: "/project/projectProcessMap",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this.stationList = data.data.stations;
          var linetypeJson = data.data.line_types;
          _this.lineTypeList = linetypeJson;
          for (var i = 0; i < linetypeJson.length; i++) {
            if (linetypeJson[i].id == 1) {
              _this.lineTypeMinMileage = parseInt(linetypeJson[i].start_flag) * 1000 + parseInt(linetypeJson[i].start_length);
              _this.lineTypeMaxMileage = parseInt(linetypeJson[i].end_flag) * 1000 + parseInt(linetypeJson[i].end_length);
            } else if (linetypeJson[i].id == 3) {
              _this.lineTypeEnterMinMileage = parseInt(linetypeJson[i].start_flag) * 1000 + parseInt(linetypeJson[i].start_length);
            } else if (linetypeJson[i].id == 4) {
              _this.lineTypeOutMinMileage = parseInt(linetypeJson[i].start_flag) * 1000 + parseInt(linetypeJson[i].start_length);
            }
          }
          _this.listSchedule = data.data.datas;
        }
      });
    },
    getStationList: function getStationList() {
      var clientWidth = this.$refs.proWrapper.clientWidth;
      var canvasWidth = clientWidth - 270;
      this.cwidth = canvasWidth - 10;
      var lineTypeBetwentMileage = this.lineTypeMaxMileage - this.lineTypeMinMileage;
      var lineTypeTotalMileage = this.lineTypeMaxMileage + this.lineTypeMinMileage;
      this.everyLineType = (parseInt(this.cwidth) / lineTypeBetwentMileage).toFixed(5);
      this.every = (parseInt(canvasWidth) / lineTypeBetwentMileage).toFixed(5);
      // console.log("cwidth" + this.cwidth + "_" + this.everyLineType);

      var canvas = this.$refs.canvasStation;
      var cansText = canvas.getContext("2d");
      canvas.width = canvasWidth;

      cansText.moveTo(9, 220);
      cansText.lineTo(canvasWidth, 220);
      cansText.strokeStyle = "#fff";
      cansText.lineWidth = 10;
      cansText.stroke();
      cansText.moveTo(9, 270);
      cansText.lineTo(canvasWidth, 270);
      cansText.stroke();

      //Station=====================Station
      var json = this.stationList;
      var lineTypeMinMileage = this.lineTypeMinMileage;
      var lineTypeMaxMileage = this.lineTypeMaxMileage;
      var every = this.every; //每米长度等于px
      //console.log("every：" + every);
      //
      var img = new Image();
      img.src = __webpack_require__("JBQT");
      img.onload = function () {
        var start = 0;
        for (var i = 0; i < json.length; i++) {
          // 绘制站点图
          var total = parseInt(json[i].start_flag) * 1000 + parseInt(json[i].start_length);
          var startLineX = (total - lineTypeMinMileage) * every;
          // 计算当前站点的x轴
          cansText.drawImage(img, startLineX, 126, 18, 90);
          var endLineX = lineTypeMaxMileage - total;
          // //站名
          cansText.font = "18px Microsoft Yahei";
          cansText.fillStyle = "#fff";
          var origin = json[i].name.split("");
          for (var x = 0; x < origin.length; x++) {
            cansText.fillText(origin[x], startLineX, 138 - origin.length * 20 + 20 * x);
          }
          //DK
          var codes = "DK" + json[i].start_flag + " +" + json[i].start_length;
          cansText.fillStyle = "#5f88f9";
          cansText.font = "12px  Microsoft Yahei";
          if (endLineX < 400) {
            cansText.fillTextVertical(codes, startLineX - 1, 156);
          } else {
            cansText.fillTextVertical(codes, startLineX + 15, 156);
          }

          console.log(endLineX);
        }
      };
      //Line=====================
      var lineJson = this.lineTypeList;
      var lineData = [];
      for (var i = 0; i < lineJson.length; i++) {
        lineData.push(lineJson[i]);
        var tfrom = lineJson[i].name + "   " + "DK" + lineJson[i].start_flag + "+" + lineJson[i].start_length,
            tend = "DK" + lineJson[i].end_flag + "+" + lineJson[i].end_length;
        var startLength = cansText.measureText(tfrom).width,
            endLength = cansText.measureText(tend).width;

        cansText.font = "12px Microsoft Yahei";
        cansText.fillStyle = "#E8C640";
        var starttotal = parseInt(lineJson[i].start_flag) * 1000 + parseInt(lineJson[i].start_length);
        var endtotal = parseInt(lineJson[i].end_flag) * 1000 + parseInt(lineJson[i].end_length);
        if (lineJson[i].id == 1) {
          cansText.fillText(tfrom, 15, 240);
          cansText.fillText(tend, parseInt(endLength + canvasWidth - 115), 240);
        } else if (lineJson[i].id == 2) {
          cansText.fillText(tfrom, 15, 290);
          cansText.fillText(tend, parseInt(endLength + canvasWidth - 125), 290);
          //3
        } else if (lineJson[i].id == 3) {
          if (starttotal == 0) {
            starttotal = this.lineTypeMinMileage;
          }
          var startZB = (starttotal - this.lineTypeMinMileage) * every + 9;
          var endZB = parseFloat((endtotal - starttotal) * every) + parseFloat(startZB);
          cansText.moveTo(startZB, 320);
          cansText.lineTo(endZB, 320);
          cansText.stroke();
          //
          cansText.fillText(tfrom, startZB + 5, 340);
          cansText.fillText(tend, endZB - 60, 340);
          //4
        } else if (lineJson[i].id == 4) {
          var _startZB = (starttotal - this.lineTypeMinMileage) * every + 10;
          var _endZB = parseFloat((endtotal - starttotal) * every) + parseFloat(_startZB);
          cansText.moveTo(_startZB, 370);
          cansText.lineTo(_endZB, 370);
          cansText.stroke();
          //
          var beteew = _endZB - _startZB;
          if (beteew < 160) {
            cansText.fillText(tfrom, _startZB - 160, 390);
            cansText.fillText(tend, _endZB - 80, 390);
          } else {
            cansText.fillText(tfrom, _startZB, 390);
            cansText.fillText(tend, _endZB - 55, 390);
          }
        }
      }
      //
    },

    lineFill: function lineFill(paras, linename) {
      // paras = [
      //   {
      //     id: 69,
      //     pro_id: 65,
      //     pro_name:
      //       "\u91cc\u7a0b\u4f5c\u4e1a0424\u4f5c\u4e1a\u540d\u79f0\u4f5c\u4e1a\u540d\u79f0\u4f5c\u4e1a\u540d\u79f0",
      //     line_type: 3,
      //     start_flag: "12",
      //     start_length: "400",
      //     end_flag: "18",
      //     end_length: "600"
      //   }
      // ];
      var result = "";
      var start = 0;
      for (var i = 0; i < paras.length; i++) {
        var starMileage = parseInt(paras[i].start_flag) * 1000 + parseInt(paras[i].start_length);
        var endMileage = parseInt(paras[i].end_flag) * 1000 + parseInt(paras[i].end_length);
        var leftPosition = parseFloat(starMileage - this.lineTypeMinMileage) * this.everyLineType;
        var widthPosition = parseFloat(endMileage - starMileage) * this.everyLineType;

        // if (linename == "入场线") {
        //   let enterMinMileage = this.lineTypeEnterMinMileage;
        //   if (enterMinMileage == 0) {
        //      leftPosition =parseFloat(starMileage - this.lineTypeMinMileage) *this.everyLineType;
        //      widthPosition =parseFloat(endMileage - starMileage) * this.everyLineType;
        //   }
        //   else{
        //      leftPosition =parseFloat(starMileage - this.lineTypeEnterMinMileage) *this.everyLineType;
        //      widthPosition =parseFloat(endMileage - starMileage) * this.everyLineType;
        //   }
        if (starMileage == 0) {
          leftPosition = 0;
          widthPosition = parseFloat(endMileage - this.lineTypeMinMileage) * this.everyLineType;
        }
        var titles = "DK " + paras[i].start_flag + "+" + paras[i].start_length + "~" + paras[i].end_flag + "+" + paras[i].end_length;
        result += "<i title='" + titles + "' style='width:" + widthPosition + "px;left:" + leftPosition + "px'></i>";
      }
      return result;
    }
  },
  mounted: function mounted() {
    window.addEventListener("resize", this.getStationList);
  },
  destroyed: function destroyed() {
    window.removeEventListener("resize", this.getStationList);
  }
});

//prototype
CanvasRenderingContext2D.prototype.fillTextVertical = function (text, x, y) {
  var context = this;
  var canvas = context.canvas;

  var arrText = text.split("");
  var arrWidth = arrText.map(function (letter) {
    return context.measureText(letter).width;
  });

  var align = context.textAlign;
  var baseline = context.textBaseline;

  if (align == "left") {
    x = x + Math.max.apply(null, arrWidth) / 2;
  } else if (align == "right") {
    x = x - Math.max.apply(null, arrWidth) / 2;
  }
  if (baseline == "bottom" || baseline == "alphabetic" || baseline == "ideographic") {
    y = y - arrWidth[0] / 2;
  } else if (baseline == "top" || baseline == "hanging") {
    y = y + arrWidth[0] / 2;
  }

  context.textAlign = "center";
  context.textBaseline = "middle";

  // 开始逐字绘制
  arrText.forEach(function (letter, index) {
    // 确定下一个字符的纵坐标位置
    var letterWidth = arrWidth[index];
    // 是否需要旋转判断
    var code = letter.charCodeAt(0);
    if (code <= 256) {
      context.translate(x, y);
      // 英文字符，旋转90°
      context.rotate(90 * Math.PI / 180);
      context.translate(-x, -y);
    } else if (index > 0 && text.charCodeAt(index - 1) < 256) {
      // y修正
      y = y + arrWidth[index - 1] / 2;
    }
    context.fillText(letter, x, y);
    // 旋转坐标系还原成初始态
    context.setTransform(1, 0, 0, 1, 0, 0);
    // 确定下一个字符的纵坐标位置
    var letterWidth = arrWidth[index];
    y = y + letterWidth;
  });
  // 水平垂直对齐方式还原
  context.textAlign = align;
  context.textBaseline = baseline;
};
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-49bd9032","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/progress/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"proWrapper",style:(_vm.conheight),attrs:{"id":"progress"}},[_c('div',{staticClass:"progress"},[_c('div',{staticClass:"sttitle"},[_vm._v("施工形象进度图")]),_vm._v(" "),_c('div',{staticClass:"station"},[_c('div',{staticClass:"stationlineleft",style:({height:_vm.stationlineHeight  + 'px'})}),_vm._v(" "),_c('div',{staticClass:"stationlineright",style:({height:_vm.stationlineHeight  + 'px'})}),_vm._v(" "),_c('canvas',{ref:"canvasStation",attrs:{"id":"canvasStation","height":"400"}},[_c('p',[_vm._v("您的系统不支持此程序!")])])]),_vm._v(" "),_c('div',{ref:"reflinebox",staticClass:"linebox"},[_c('table',{staticClass:"lineTable"},_vm._l((_vm.listSchedule),function(item){return _c('tr',{key:item.id,staticClass:"linebar"},[_c('td',[_c('div',{staticClass:"tdtitle",attrs:{"title":item.name}},[_vm._v(_vm._s(item.name))])]),_vm._v(" "),_c('td',{staticClass:"tdbar"},_vm._l((item.lines),function(lines){return _c('div',{key:lines.id,staticClass:"bar"},[_c('span',[_vm._v(_vm._s(lines.name))]),_vm._v(" "),_c('em',{style:({width: _vm.cwidth + 'px' }),domProps:{"innerHTML":_vm._s(_vm.lineFill(lines.lists,lines.name))}})])}))])})),_vm._v(" "),_c('div',{staticClass:"clear"})])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_progress = (esExports);
// CONCATENATED MODULE: ./src/views/progress/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("yPsO")
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
  progress,
  views_progress,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_progress = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "yPsO":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("UD/b");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("dee0a3b8", content, true);

/***/ })

});