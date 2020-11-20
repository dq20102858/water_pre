webpackJsonp([19],{

/***/ "A9df":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/get-iterator.js
var get_iterator = __webpack_require__("HzJ8");
var get_iterator_default = /*#__PURE__*/__webpack_require__.n(get_iterator);

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.2@babel-loader/lib!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=script&index=0!./src/views/AttendanceManage/index.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var AttendanceManage = ({
  data: function data() {
    var _this = this;

    return {
      page_cur: 1,
      page_data_total: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      fatherStationList: [],
      childStationList: [],
      fatherStationId: 0,
      chlidStationId: 0,
      chlidStationName: "",
      pickerStartTime: {
        disabledDate: function disabledDate(time) {
          if (_this.searchEndTime) {
            return time.getTime() > new Date(_this.searchEndTime).getTime();
          }
        }
      },
      pickerEndTime: {
        disabledDate: function disabledDate(time) {
          if (_this.searchStartTime) {
            return time.getTime() < new Date(_this.searchStartTime).getTime();
          }
        }
      },
      searchStartTime: "",
      searchEndTime: "",
      oneType: 1
    };
  },
  created: function created() {
    this.getFatherStationList();
    this.getDataList();
  },

  methods: {
    //station
    getFatherStationList: function getFatherStationList() {
      var _this2 = this;

      var name = this.chlidName;
      this.request({
        url: "/station/getStationLists",
        method: "get",
        params: { name: name }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this2.fatherStationList = data.data;
          if (_this2.fatherStationId == 0) {
            _this2.getChildStationList();
          }
        }
      });
    },
    getChildStationList: function getChildStationList() {
      var _this3 = this;

      var name = "";
      this.request({
        url: "/station/getChildStationLists",
        method: "get",
        params: { name: name }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          var results = data.data;
          _this3.childStationList = results;
        }
      });
    },
    fatherStationEvent: function fatherStationEvent(val) {
      var _this4 = this;

      if (val == 0) {
        this.getChildStationList();
        this.page_cur = 1;
        this.chlidStationId = 0;
        this.getDataList();
      }
      this.fatherStationId = val;
      this.fatherStationList.map(function (ele) {
        if (ele.id == val) {
          _this4.childStationList = ele.child;
        }
      });
    },
    chlidStationEvent: function chlidStationEvent(val) {
      this.page_cur = 1;
      this.chlidStationId = val;
      this.getDataList();
    },
    searchStationCallBack: function searchStationCallBack(queryString, cb) {
      this.request({
        url: "/station/getChildStationLists",
        method: "get",
        params: { name: queryString }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          var results = data.data;
          var list = [];
          if (results.length == 0) {
            list.push({
              id: 0,
              value: "未查询到站名"
            });
          }
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = get_iterator_default()(results), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var item = _step.value;

              list.push({
                id: item.id,
                pid: item.pid,
                value: item.name
              });
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          console.log(list);
          cb(list);
        }
      });
    },
    searchStationEvent: function searchStationEvent(item) {
      this.page_cur = 1;
      this.fatherStationEvent(item.pid);
      this.fatherStationId = item.pid;
      this.chlidStationId = item.id;
      this.chlidStationName = "";
      this.getDataList();
    },

    //end station

    getDataList: function getDataList() {
      var _this5 = this;

      var page = this.page_cur;
      var sid = this.chlidStationId;
      var start_time = this.searchStartTime;
      var end_time = this.searchEndTime;
      //console.log("start_time：" + start_time + "\n_end_time：" + end_time);
      this.request({
        url: "clock/getClockPages",
        method: "get",
        params: { page: page, sid: sid, start_time: start_time, end_time: end_time }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this5.dataList = data.data.data;
          _this5.page_cur = parseInt(data.data.current_page);
          _this5.page_total = data.data.last_page;
          _this5.page_data_total = data.data.total;
          _this5.page_size = data.data.per_page;
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
    searchStartTimeEvent: function searchStartTimeEvent() {
      console.log(this.searchEndTime);
      if (this.searchEndTime != "") {
        this.page_cur = 1;
        this.getDataList();
      }
    },
    searchEndTimeEvent: function searchEndTimeEvent() {
      if (this.searchStartTime != "") {
        this.page_cur = 1;
        this.getDataList();
      }
    },
    searchAllEvent: function searchAllEvent() {
      this.page_cur = 1;
      this.searchStartTime = "";
      this.searchEndTime = "";
      this.getDataList();
    },
    searchDateEvent: function searchDateEvent(type) {
      this.page_cur = 1;
      this.oneType = type;
      if (type == 1) {
        this.searchStartTime = "";
        this.searchEndTime = "";
        this.fatherStationEvent(0);
      } else if (type == 2) {
        var end = new Date();
        var start = new Date(new Date(new Date().toLocaleDateString()).getTime());
        this.searchStartTime = start;
        this.searchEndTime = end;
        this.getDataList();
      } else {
        var _end = new Date();
        var _start = new Date();
        _start.setTime(_start.getTime() - 3600 * 1000 * 24 * 7);
        this.searchStartTime = _start;
        this.searchEndTime = _end;
        this.getDataList();
      }
    },
    repairEvent: function repairEvent(flag, id) {
      var _this6 = this;

      this.request({
        url: "/alert/isRepair",
        method: "post",
        data: { id: id, type: this.searchType, is_repair: flag }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this6.getDataList();
          //let msginfo = flag == 1 ? "设置已修复" : "取消已修复";
          _this6.$message({
            type: "success",
            message: "设置成功！"
          });
        }
      });
    },
    updateRead: function updateRead(id) {
      var _this7 = this;

      this.request({
        url: "/alert/updateRead",
        method: "post",
        data: { id: id, type: this.searchType }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this7.getDataList();
          //let msginfo = flag == 1 ? "设置已修复" : "取消已修复";
          _this7.$message({
            type: "success",
            message: "设置成功！"
          });
        }
      });
    },
    deleteEvent: function deleteEvent(id) {
      var _this8 = this;

      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this8.request({
          url: "/alert/deleteAlert",
          method: "post",
          data: { id: id, type: _this8.searchType }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            if (_this8.dataList.length == 1) {
              _this8.page_cur = _this8.page_cur - 1;
              _this8.getDataList();
            } else {
              _this8.getDataList();
            }
            _this8.$message({
              type: "success",
              message: "删除成功！"
            });
          }
        });
      }).catch(function () {});
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/_vue-loader@13.5.0@vue-loader/lib/template-compiler?{"id":"data-v-3252c9f7","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=template&index=0!./src/views/AttendanceManage/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-device-page"},[_c('div',{staticClass:"app-page-rows"},[_c('div',{staticClass:"app-page-rows-lefts"},[_c('div',{staticClass:"left-menu-area"},[_c('div',{staticClass:"input-so"},[_c('el-autocomplete',{staticClass:"inline-input",attrs:{"prefix-icon":"el-icon-search","fetch-suggestions":_vm.searchStationCallBack,"placeholder":"请输入处理站名","trigger-on-focus":false,"clearable":""},on:{"select":function($event){_vm.searchStationEvent($event)}},model:{value:(_vm.chlidStationName),callback:function ($$v) {_vm.chlidStationName=$$v},expression:"chlidStationName"}})],1),_vm._v(" "),_c('el-menu',{attrs:{"router":""}},[_c('el-menu-item',{class:_vm.fatherStationId === 0 ? 'active' : '',on:{"click":function($event){_vm.fatherStationEvent(0)}}},[_c('span',[_vm._v("全部")])]),_vm._v(" "),_vm._l((_vm.fatherStationList),function(item){return _c('el-menu-item',{key:item.id,class:_vm.fatherStationId === item.id ? 'active' : '',on:{"click":function($event){_vm.fatherStationEvent(item.id)}}},[_c('span',{attrs:{"title":item.name}},[_vm._v(_vm._s(item.name))])])})],2)],1),_vm._v(" "),_c('div',{staticClass:"left-menu-chlid"},[_c('el-menu',{attrs:{"router":""}},_vm._l((_vm.childStationList),function(item){return _c('el-menu-item',{key:item.id,class:_vm.chlidStationId === item.id ? 'active' : '',on:{"click":function($event){_vm.chlidStationEvent(item.id)}}},[_c('span',{attrs:{"title":item.name}},[_vm._v(_vm._s(item.name))])])}))],1)]),_vm._v(" "),_c('div',{staticClass:"app-page-rows-rights"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',{staticClass:"el-form-item"},[_c('el-date-picker',{staticStyle:{"width":"150px"},attrs:{"type":"date","placeholder":"选择开始日期","picker-options":_vm.pickerStartTime},on:{"change":_vm.searchStartTimeEvent},model:{value:(_vm.searchStartTime),callback:function ($$v) {_vm.searchStartTime=$$v},expression:"searchStartTime"}})],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-line"},[_vm._v("-")]),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item"},[_c('el-date-picker',{staticStyle:{"width":"150px"},attrs:{"type":"date","placeholder":"选择结束日期","picker-options":_vm.pickerEndTime},on:{"change":_vm.searchEndTimeEvent},model:{value:(_vm.searchEndTime),callback:function ($$v) {_vm.searchEndTime=$$v},expression:"searchEndTime"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.searchAllEvent}},[_vm._v("重置")])],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item",staticStyle:{"margin-left":"30px"}},[_c('span',{class:_vm.oneType == 1 ? 'sobtns active':'sobtns',on:{"click":function($event){_vm.searchDateEvent(1)}}},[_vm._v("全部")]),_vm._v(" "),_c('span',{class:_vm.oneType == 2 ? 'sobtns active':'sobtns',on:{"click":function($event){_vm.searchDateEvent(2)}}},[_vm._v("今日")]),_vm._v(" "),_c('span',{class:_vm.oneType == 3 ? 'sobtns active':'sobtns',on:{"click":function($event){_vm.searchDateEvent(3)}}},[_vm._v("本周")])])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"label":"序号","width":"80px"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v(_vm._s(scope.$index+(_vm.page_cur - 1) * _vm.page_size + 1))]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"user","label":"考勤人"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"start_time","label":"打卡开始时间"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"end_time","label":"打卡结束时间"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"address","label":"打卡地点"}})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.page_data_total,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.pageToFirst}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.pageToLast}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1)])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_AttendanceManage = (esExports);
// CONCATENATED MODULE: ./src/views/AttendanceManage/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("BRj/")
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
  AttendanceManage,
  views_AttendanceManage,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_AttendanceManage = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "BRj/":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("LjvE");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("8bSs")("094c631d", content, true);

/***/ }),

/***/ "LjvE":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("BkJT")(false);
// imports


// module
exports.push([module.i, "\n.samplinglist .el-table tr th {\r\n  text-align: center;\n}\n.nums {\r\n  padding: 3px 5px;\n}\n.cirshow {\r\n  background: #f45e23;\r\n  color: #fff;\r\n  padding: 3px 5px;\r\n  border-radius: 3px;\n}\n.sobtns {\r\n  cursor: pointer;\r\n  border-radius: 3px;\r\n  margin-left: 10px;\r\n  padding: 8px 20px;\r\n  font-size: 14px;\r\n  background: #f4f4f5;\r\n  color: #909399;\r\n  border: 1px #d3d4d6 solid;\n}\n.sobtns.active {\r\n  background: #338ff6;\r\n  color: #fff;\r\n  border: 1px #338ff6 solid;\n}\r\n", ""]);

// exports


/***/ })

});