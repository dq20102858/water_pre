webpackJsonp([7],{

/***/ "L/cI":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("VV29");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("8bSs")("7782cada", content, true);

/***/ }),

/***/ "VV29":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("BkJT")(false);
// imports


// module
exports.push([module.i, "\n.samplinglist .el-table tr th {\r\n  text-align: center;\n}\n.nums {\r\n  padding: 3px 5px;\n}\n.cirshow {\r\n  background: #ff3856;\r\n  color: #fff;\r\n  padding: 3px 5px;\r\n  border-radius: 3px;\n}\n.videolist {\r\n  overflow: hidden;\r\n  border-radius: 3px;\n}\n.videolist .vitems {\r\n  width: 400px;\r\n  float: left;\r\n  margin: 0 15px 20px 15px;\n}\n.videolist .vitems img {\r\n  width: 100%;\n}\n.videolist .gtitle {\r\n  background: #4093ed;\r\n  color: #fff;\r\n  font-size: 16px;\r\n  height: 40px;\r\n  line-height: 40px;\r\n  border-radius: 3px 3px 0 0;\r\n  padding-left: 20px;\r\n  text-align: left;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "XiKT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/get-iterator.js
var get_iterator = __webpack_require__("HzJ8");
var get_iterator_default = /*#__PURE__*/__webpack_require__.n(get_iterator);

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.2@babel-loader/lib!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=script&index=0!./src/views/WarningManage/index.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var WarningManage = ({
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
      searchType: "2",
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
      diaLogFormVisible: false
    };
  },
  mounted: function mounted() {},
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
      var type = this.searchType;
      var sid = this.chlidStationId;
      var start_time = this.searchStartTime;
      var end_time = this.searchEndTime;
      this.request({
        url: "/alert/getAlertPages",
        method: "get",
        params: { page: page, type: type, sid: sid, start_time: start_time, end_time: end_time }
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
    searchTypeEvent: function searchTypeEvent(val) {
      this.type = this.searchType;
      this.getDataList();
    },
    searchAllEvent: function searchAllEvent() {
      this.page_cur = 1;
      this.searchStartTime = "";
      this.searchEndTime = "";
      this.getDataList();
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

      var mscount = document.querySelectorAll(".msgcount")[0].innerText;
      this.request({
        url: "/alert/updateRead",
        method: "post",
        data: { id: id, type: this.searchType }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this7.getDataList();
          document.querySelectorAll(".msgcount")[0].innerText = parseInt(mscount) - 1;
          _this7.$message({
            type: "success",
            message: "设置成功！"
          });
        }
      });
    },
    videoEvent: function videoEvent(id, is_read) {
      var _this8 = this;

      var mscount = document.querySelectorAll(".msgcount")[0].innerText;
      if (is_read == 0) {
        this.request({
          url: "/alert/updateRead",
          method: "post",
          data: { id: id, type: this.searchType }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            _this8.getDataList();
            document.querySelectorAll(".msgcount")[0].innerText = parseInt(mscount) - 1;
          }
        });
      }
      this.diaLogFormVisible = true;
    },
    deleteEvent: function deleteEvent(id, is_read) {
      var _this9 = this;

      var mscount = document.querySelectorAll(".msgcount")[0].innerText;
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this9.request({
          url: "/alert/deleteAlert",
          method: "post",
          data: { id: id, type: _this9.searchType }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            if (_this9.dataList.length == 1) {
              _this9.page_cur = _this9.page_cur - 1;
              _this9.getDataList();
            } else {
              _this9.getDataList();
            }
            if (parseInt(is_read) != 1) {
              document.querySelectorAll(".msgcount")[0].innerText = parseInt(mscount) - 1;
            }
            _this9.$message({
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
// CONCATENATED MODULE: ./node_modules/_vue-loader@13.5.0@vue-loader/lib/template-compiler?{"id":"data-v-117b092d","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=template&index=0!./src/views/WarningManage/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-device-page"},[_c('div',{staticClass:"app-page-rows"},[_c('div',{staticClass:"app-page-rows-lefts"},[_c('div',{staticClass:"left-menu-area"},[_c('div',{staticClass:"input-so"},[_c('el-autocomplete',{staticClass:"inline-input",attrs:{"prefix-icon":"el-icon-search","fetch-suggestions":_vm.searchStationCallBack,"placeholder":"请输入处理站名","trigger-on-focus":false,"clearable":""},on:{"select":function($event){_vm.searchStationEvent($event)}},model:{value:(_vm.chlidStationName),callback:function ($$v) {_vm.chlidStationName=$$v},expression:"chlidStationName"}})],1),_vm._v(" "),_c('el-menu',{attrs:{"router":""}},[_c('el-menu-item',{class:_vm.fatherStationId === 0 ? 'active' : '',on:{"click":function($event){_vm.fatherStationEvent(0)}}},[_c('span',[_vm._v("全部")])]),_vm._v(" "),_vm._l((_vm.fatherStationList),function(item){return _c('el-menu-item',{key:item.id,class:_vm.fatherStationId === item.id ? 'active' : '',on:{"click":function($event){_vm.fatherStationEvent(item.id)}}},[_c('span',{attrs:{"title":item.name}},[_vm._v(_vm._s(item.name))])])})],2)],1),_vm._v(" "),_c('div',{staticClass:"left-menu-chlid"},[_c('el-menu',{attrs:{"router":""}},_vm._l((_vm.childStationList),function(item){return _c('el-menu-item',{key:item.id,class:_vm.chlidStationId === item.id ? 'active' : '',on:{"click":function($event){_vm.chlidStationEvent(item.id)}}},[_c('span',{attrs:{"title":item.name}},[_vm._v(_vm._s(item.name))])])}))],1)]),_vm._v(" "),_c('div',{ref:"apprights",staticClass:"app-page-rows-rights"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',{staticClass:"el-form-item el-select-dorps"},[_c('el-select',{staticStyle:{"width":"120px"},on:{"change":_vm.searchTypeEvent},model:{value:(_vm.searchType),callback:function ($$v) {_vm.searchType=$$v},expression:"searchType"}},[_c('el-option',{attrs:{"label":"设备告警","value":"2"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"水质告警","value":"1"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"入侵告警","value":"3"}})],1)],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item"},[_c('el-date-picker',{staticStyle:{"width":"150px"},attrs:{"type":"date","placeholder":"选择开始日期","picker-options":_vm.pickerStartTime},on:{"change":_vm.searchStartTimeEvent},model:{value:(_vm.searchStartTime),callback:function ($$v) {_vm.searchStartTime=$$v},expression:"searchStartTime"}})],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-line"},[_vm._v("-")]),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item"},[_c('el-date-picker',{staticStyle:{"width":"150px"},attrs:{"type":"date","placeholder":"选择结束日期","picker-options":_vm.pickerEndTime},on:{"change":_vm.searchEndTimeEvent},model:{value:(_vm.searchEndTime),callback:function ($$v) {_vm.searchEndTime=$$v},expression:"searchEndTime"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.searchAllEvent}},[_vm._v("重置")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"label":"序号","width":"80px"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',{class:[scope.row.is_read!=1? 'cirshow' : 'nums']},[_vm._v(_vm._s(scope.$index+(_vm.page_cur - 1) * _vm.page_size + 1))])]}}])}),_vm._v(" "),(this.searchType==2)?_c('el-table-column',{attrs:{"prop":"type","label":"告警设备"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.type==1)?_c('span',[_vm._v("风机")]):_vm._e(),_vm._v(" "),(scope.row.type==2)?_c('span',[_vm._v("水泵")]):_vm._e(),_vm._v(" "),(scope.row.type==3)?_c('span',[_vm._v("紫外灯")]):_vm._e(),_vm._v(" "),(scope.row.type==4)?_c('span',[_vm._v("PLC")]):_vm._e()]}}])}):_vm._e(),_vm._v(" "),(this.searchType==1)?_c('el-table-column',{attrs:{"prop":"type","label":"水质类型"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.type==1)?_c('span',[_vm._v("PH")]):(scope.row.type==2)?_c('span',[_vm._v("DO")]):_c('span',[_vm._v("液位")])]}}])}):_vm._e(),_vm._v(" "),(this.searchType!=3)?_c('el-table-column',{attrs:{"prop":"reason","label":"告警原因","show-overflow-tooltip":""}}):_vm._e(),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"告警时间"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"address","label":"发生位置"}}),_vm._v(" "),(this.searchType!=3)?_c('el-table-column',{attrs:{"prop":"is_repair","label":"是否修复"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.is_repair==1)?_c('span',[_vm._v("是")]):_vm._e(),_vm._v(" "),(scope.row.is_repair==0)?_c('span',[_vm._v("否")]):_vm._e(),_vm._v(" "),_c('el-switch',{attrs:{"title":"设置状态","active-value":1,"inactive-value":0,"active-text":"","inactive-text":"","active-color":"#383C57"},on:{"change":function($event){_vm.repairEvent($event,scope.row.id)}},model:{value:(scope.row.is_repair),callback:function ($$v) {_vm.$set(scope.row, "is_repair", $$v)},expression:"scope.row.is_repair"}})]}}])}):_vm._e(),_vm._v(" "),(this.searchType==3)?_c('el-table-column',{attrs:{"label":"操作","width":"220"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[(scope.row.is_read==1)?_c('el-button',{staticClass:"btn-gray",attrs:{"size":"mini","disabled":""}},[_vm._v("已读")]):_vm._e(),_vm._v(" "),(scope.row.is_read!=1)?_c('el-button',{staticClass:"btn-print",attrs:{"size":"mini"},on:{"click":function($event){_vm.updateRead(scope.row.id)}}},[_vm._v("未读")]):_vm._e(),_vm._v(" "),_c('el-button',{staticClass:"btn-edit",on:{"click":function($event){_vm.videoEvent(scope.row.id,scope.row.is_read)}}},[_vm._v("查看视频")]),_vm._v(" "),_c('el-button',{staticClass:"btn-del",attrs:{"size":"mini"},on:{"click":function($event){_vm.deleteEvent(scope.row.id,scope.row.is_read)}}},[_vm._v("删除")])],1)]}}])}):_vm._e(),_vm._v(" "),(this.searchType !=3)?_c('el-table-column',{attrs:{"label":"操作","width":"125"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[(scope.row.is_read==1)?_c('el-button',{staticClass:"btn-gray",attrs:{"size":"mini","disabled":""}},[_vm._v("已读")]):_vm._e(),_vm._v(" "),(scope.row.is_read!=1)?_c('el-button',{staticClass:"btn-print",attrs:{"size":"mini"},on:{"click":function($event){_vm.updateRead(scope.row.id)}}},[_vm._v("未读")]):_vm._e(),_vm._v(" "),_c('el-button',{staticClass:"btn-del",attrs:{"size":"mini"},on:{"click":function($event){_vm.deleteEvent(scope.row.id,scope.row.is_read)}}},[_vm._v("删除")])],1)]}}])}):_vm._e()],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.page_data_total,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.pageToFirst}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.pageToLast}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1)])]),_vm._v(" "),_c('el-dialog',{attrs:{"width":"920px","title":"监控画面","close-on-click-modal":false,"visible":_vm.diaLogFormVisible},on:{"update:visible":function($event){_vm.diaLogFormVisible=$event}}},[_c('div',{staticClass:"videolist"},[_c('div',{staticClass:"vitems"},[_c('div',{staticClass:"gtitle"},[_vm._v("视屏1")]),_vm._v(" "),_c('img',{attrs:{"src":__webpack_require__("wwnV")}})]),_vm._v(" "),_c('div',{staticClass:"vitems"},[_c('div',{staticClass:"gtitle"},[_vm._v("视屏1")]),_vm._v(" "),_c('img',{attrs:{"src":__webpack_require__("wwnV")}})])])])],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_WarningManage = (esExports);
// CONCATENATED MODULE: ./src/views/WarningManage/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("L/cI")
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
  WarningManage,
  views_WarningManage,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_WarningManage = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "wwnV":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/videos.4dc836f.png";

/***/ })

});