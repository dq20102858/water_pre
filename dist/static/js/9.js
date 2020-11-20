webpackJsonp([9],{

/***/ "6kKm":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/get-iterator.js
var get_iterator = __webpack_require__("HzJ8");
var get_iterator_default = /*#__PURE__*/__webpack_require__.n(get_iterator);

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.2@babel-loader/lib!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=script&index=0!./src/views/RecordManage/index.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var RecordManage = ({
  data: function data() {
    var _this = this;

    return {
      printObj: {
        id: "#printRecord",
        popTitle: " ",
        extraCss: "",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      printRecordShow: false,
      diaLogFormExcelVisible: false,
      diaLogFormVisible: false,
      diaLogTitle: "",
      uploadTemp: this.hostURL + "/downloads/weihu.xls",
      uploadAction: this.hostURL + "/record/importRecord",
      uploadData: { type: 1 },
      formData: {},
      page_cur: 1,
      page_data_total: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      userList: [],
      stationOptions: [],
      stationOptionsProps: {
        value: "id",
        label: "name",
        children: "child"
      },
      fatherStationList: [],
      childStationList: [],
      fatherStationId: 0,
      chlidStationId: 0,
      chlidStationName: "",
      searchAssignerId: "0",
      searchType: "1",
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
      prepareList: [],
      sysCheckList: [],
      deviceCheckkList: [],
      periodCheck: []
    };
  },
  created: function created() {
    this.getFatherStationList();
    this.getUsersList();
    this.getConfig();
    this.getDataList();
  },

  methods: {
    getDataList: function getDataList() {
      var _this2 = this;

      var page = this.page_cur;
      var type = this.searchType;
      var sid = this.chlidStationId;
      var start_time = this.searchStartTime;
      var end_time = this.searchEndTime;
      var user_id = this.searchAssignerId;
      this.request({
        url: "/record/getRecordRepairPages",
        method: "get",
        params: { page: page, sid: sid, user_id: user_id, type: type, start_time: start_time, end_time: end_time }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this2.dataList = data.data.data;
          _this2.page_cur = parseInt(data.data.current_page);
          _this2.page_total = data.data.last_page;
          _this2.page_data_total = data.data.total;
          _this2.page_size = data.data.per_page;
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
    searchAllEvent: function searchAllEvent() {
      this.page_cur = 1;
      this.chlidStationId = 0;
      this.searchAssignerId = "0";
      this.searchStartTime = "";
      this.searchEndTime = "";
      this.getDataList();
    },
    searchTypeEvent: function searchTypeEvent(val) {
      if (val == 2) {
        this.$router.push("/recordmanage/operation");
      } else if (val == 3) {
        this.$router.push("/recordmanage/samplinglist");
      } else {
        this.$router.push("/recordmanage");
      }
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
    searchAssignerEvent: function searchAssignerEvent(item) {
      this.searchAssignerId = item;
      this.getDataList();
    },
    getUsersList: function getUsersList() {
      var _this3 = this;

      this.request({
        url: "/assign/getUsersLists",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this3.userList = data.data;
        }
      });
    },
    getStationList: function getStationList() {
      var _this4 = this;

      this.request({
        url: "/station/getStationLists",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this4.stationOptions = data.data;
        }
      });
    },
    getConfig: function getConfig() {
      var _this5 = this;

      this.request({
        url: "/record/getConfig",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this5.prepareList = data.data.prepare; //维护预备
          _this5.sysCheckList = data.data.sys_check; //系统检查
          _this5.deviceCheckkList = data.data.device_check; //仪器检查
          _this5.periodCheck = data.data.period_check; //周期维护
        }
      });
    },
    printEvent: function printEvent(id) {
      var _this6 = this;

      this.request({
        url: "/record/getRecordDetail",
        method: "get",
        params: { id: id, type: 1 }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this6.formData = data.data;
          document.getElementById("printBtn").click();
        }
      });
    },
    detailEvent: function detailEvent(id) {
      var _this7 = this;

      this.diaLogTitle = "污水处理站维护记录表";
      this.diaLogFormVisible = true;
      this.request({
        url: "/record/getRecordDetail",
        method: "get",
        params: { id: id, type: 1 }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this7.formData = data.data;
          // this.formData.period_check=data.data.period_check).replace (/"/g,'');
          // console.log( this.formData.period_check);
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
          url: "/record/delRecord",
          method: "post",
          data: { id: id, type: 1 }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            //
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
            //
          }
        });
      }).catch(function () {});
    },
    problemEvent: function problemEvent(flag, id) {
      var _this9 = this;

      this.request({
        url: "/record/changeProblem",
        method: "post",
        data: { id: id, is_problem: flag }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this9.getDataList();
          _this9.$message({
            type: "success",
            message: "设置成功！"
          });
        }
      });
    },
    handleEvent: function handleEvent(flag, id) {
      var _this10 = this;

      this.request({
        url: "/record/changehandle",
        method: "post",
        data: { id: id, is_handle: flag }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this10.getDataList();
          _this10.$message({
            type: "success",
            message: "设置成功！"
          });
        }
      });
    },

    //上传
    expectExcel: function expectExcel() {
      this.diaLogFormExcelVisible = true;
    },
    uploadSuccess: function uploadSuccess(res, file) {
      console.log("图上传成功", res);
      if (res.status == 1) {
        this.getDataList();
        this.$message({
          type: "success",
          message: "导入成功！"
        });
        this.diaLogFormExcelVisible = false;
      } else {
        this.$message({
          message: "导入失败！",
          type: "error"
        });
      }
    },
    uploadBefore: function uploadBefore(file) {
      var filename = file.name.substring(file.name.lastIndexOf(".") + 1);
      var extension = filename === "xls";
      var isLtM = file.size / 1024 / 1024 < 2;
      if (!extension) {
        this.$message({
          message: "上传文件只能是xls格式",
          type: "error"
        });
        return false;
      }
      if (!isLtM) {
        this.$message({
          message: "上传文件不能超过 2MB",
          type: "error"
        });
        return false;
      }
      return extension || isLtM;
    },
    expectExcelOut: function expectExcelOut() {
      var type = this.searchType;
      var sid = this.chlidStationId;
      var start_time = this.$options.filters["formatAllDate"](this.searchStartTime);
      var end_time = this.$options.filters["formatAllDate"](this.searchEndTime);
      var user_id = this.searchAssignerId;

      window.location.href = this.hostURL + "/record/exportExcel?type=" + type + "&sid=" + sid + "&start_time=" + start_time + "&end_time=" + end_time + "&user_id=" + user_id;
    },

    //station
    getFatherStationList: function getFatherStationList() {
      var _this11 = this;

      var name = this.chlidName;
      this.request({
        url: "/station/getStationLists",
        method: "get",
        params: { name: name }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this11.fatherStationList = data.data;
          if (_this11.fatherStationId == 0) {
            _this11.getChildStationList();
          }
        }
      });
    },
    getChildStationList: function getChildStationList() {
      var _this12 = this;

      var name = "";
      this.request({
        url: "/station/getChildStationLists",
        method: "get",
        params: { name: name }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          var results = data.data;
          _this12.childStationList = results;
        }
      });
    },
    fatherStationEvent: function fatherStationEvent(val) {
      var _this13 = this;

      if (val == 0) {
        this.getChildStationList();
        this.page_cur = 1;
        this.chlidStationId = 0;
        this.getDataList();
      }
      this.fatherStationId = val;
      this.fatherStationList.map(function (ele) {
        if (ele.id == val) {
          _this13.childStationList = ele.child;
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
    }
    //end station

  }
});
// CONCATENATED MODULE: ./node_modules/_vue-loader@13.5.0@vue-loader/lib/template-compiler?{"id":"data-v-f45bfd56","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=template&index=0!./src/views/RecordManage/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-page-device"},[_c('div',{staticClass:"app-page-rows"},[_c('div',{staticClass:"app-page-rows-lefts"},[_c('div',{staticClass:"left-menu-area"},[_c('div',{staticClass:"input-so"},[_c('el-autocomplete',{staticClass:"inline-input",attrs:{"prefix-icon":"el-icon-search","fetch-suggestions":_vm.searchStationCallBack,"placeholder":"请输入处理站名","trigger-on-focus":false,"clearable":""},on:{"select":function($event){_vm.searchStationEvent($event)}},model:{value:(_vm.chlidStationName),callback:function ($$v) {_vm.chlidStationName=$$v},expression:"chlidStationName"}})],1),_vm._v(" "),_c('el-menu',{attrs:{"router":""}},[_c('el-menu-item',{class:_vm.fatherStationId === 0 ? 'active' : '',on:{"click":function($event){_vm.fatherStationEvent(0)}}},[_c('span',[_vm._v("全部")])]),_vm._v(" "),_vm._l((_vm.fatherStationList),function(item){return _c('el-menu-item',{key:item.id,class:_vm.fatherStationId === item.id ? 'active' : '',on:{"click":function($event){_vm.fatherStationEvent(item.id)}}},[_c('span',{attrs:{"title":item.name}},[_vm._v(_vm._s(item.name))])])})],2)],1),_vm._v(" "),_c('div',{staticClass:"left-menu-chlid"},[_c('el-menu',{attrs:{"router":""}},_vm._l((_vm.childStationList),function(item){return _c('el-menu-item',{key:item.id,class:_vm.chlidStationId === item.id ? 'active' : '',on:{"click":function($event){_vm.chlidStationEvent(item.id)}}},[_c('span',{attrs:{"title":item.name}},[_vm._v(_vm._s(item.name))])])}))],1)]),_vm._v(" "),_c('div',{staticClass:"app-page-rows-rights"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',{staticClass:"el-form-item el-search-items"},[_c('el-select',{on:{"change":_vm.searchTypeEvent},model:{value:(_vm.searchType),callback:function ($$v) {_vm.searchType=$$v},expression:"searchType"}},[_c('el-option',{attrs:{"label":"维护记录","value":"1"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"运行记录","value":"2"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"采样化验单","value":"3"}})],1)],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item el-select-dorps",staticStyle:{"width":"150px"}},[_c('el-select',{attrs:{"filterable":"","placeholder":"请选择运维人员"},on:{"change":function($event){_vm.searchAssignerEvent($event)}},model:{value:(_vm.searchAssignerId),callback:function ($$v) {_vm.searchAssignerId=$$v},expression:"searchAssignerId"}},[_c('el-option',{key:"0",attrs:{"label":"请选择运维人员","value":"0"}}),_vm._v(" "),_vm._l((_vm.userList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})})],2)],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item"},[_c('el-date-picker',{staticStyle:{"width":"150px"},attrs:{"type":"date","placeholder":"选择开始日期","picker-options":_vm.pickerStartTime},on:{"change":_vm.searchStartTimeEvent},model:{value:(_vm.searchStartTime),callback:function ($$v) {_vm.searchStartTime=$$v},expression:"searchStartTime"}})],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-line"},[_vm._v("-")]),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item"},[_c('el-date-picker',{staticStyle:{"width":"150px"},attrs:{"type":"date","placeholder":"选择结束日期","picker-options":_vm.pickerEndTime},on:{"change":_vm.searchEndTimeEvent},model:{value:(_vm.searchEndTime),callback:function ($$v) {_vm.searchEndTime=$$v},expression:"searchEndTime"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.searchAllEvent}},[_vm._v("重置")])],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.expectExcel}},[_vm._v("导入")])],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.expectExcelOut}},[_vm._v("导出")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"label":"序号","width":"80px"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v(_vm._s(scope.$index+(_vm.page_cur - 1) * _vm.page_size + 1))]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"维保日期","width":"100"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v(_vm._s(_vm._f("formatGetDate")(scope.row.create_time)))]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"station_name","label":"站点名"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"is_problem","label":"是否有问题"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.is_problem==1)?_c('span',[_vm._v("是")]):_vm._e(),_vm._v(" "),(scope.row.is_problem==0)?_c('span',[_vm._v("否")]):_vm._e(),_vm._v(" "),_c('el-switch',{attrs:{"title":"设置状态","active-value":1,"inactive-value":0,"active-text":"","inactive-text":"","active-color":"#383C57"},on:{"change":function($event){_vm.problemEvent($event,scope.row.id)}},model:{value:(scope.row.is_problem),callback:function ($$v) {_vm.$set(scope.row, "is_problem", $$v)},expression:"scope.row.is_problem"}})]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"is_handle","label":"是否已处理"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.is_handle==1)?_c('span',[_vm._v("是")]):_vm._e(),_vm._v(" "),(scope.row.is_handle==0)?_c('span',[_vm._v("否")]):_vm._e(),_vm._v(" "),_c('el-switch',{attrs:{"title":"设置状态","active-value":1,"inactive-value":0,"active-text":"","inactive-text":"","active-color":"#383C57"},on:{"change":function($event){_vm.handleEvent($event,scope.row.id)}},model:{value:(scope.row.is_handle),callback:function ($$v) {_vm.$set(scope.row, "is_handle", $$v)},expression:"scope.row.is_handle"}})]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"user","label":"运维人员"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"phone","label":"联系电话"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"190"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-print",attrs:{"size":"mini"},on:{"click":function($event){_vm.printEvent(scope.row.id)}}},[_vm._v("打印")]),_vm._v(" "),_c('el-button',{staticClass:"btn-edit",attrs:{"size":"mini"},on:{"click":function($event){_vm.detailEvent(scope.row.id)}}},[_vm._v("详情")]),_vm._v(" "),_c('el-button',{staticClass:"btn-del",attrs:{"size":"mini"},on:{"click":function($event){_vm.deleteEvent(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.page_data_total,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.pageToFirst}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.pageToLast}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1)])])]),_vm._v(" "),_c('el-dialog',{attrs:{"width":"780px","title":this.diaLogTitle,"close-on-click-modal":false,"visible":_vm.diaLogFormVisible},on:{"update:visible":function($event){_vm.diaLogFormVisible=$event}}},[_c('el-form',{staticClass:"dialog-form-records",attrs:{"model":_vm.formData,"label-width":"100px"}},[_c('div',{staticClass:"el-form-item-inline"},[_c('el-form-item',{attrs:{"label":"站点名："}},[_c('div',{staticClass:"sampinfo"},[_vm._v(_vm._s(_vm.formData.station_name))])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"维护日期："}},[_c('div',{staticClass:"sampinfo"},[_vm._v(_vm._s(_vm._f("formatGetDate")(_vm.formData.create_time))+"  ")])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"维护人："}},[_c('div',{staticClass:"sampinfo"},[_vm._v(_vm._s(_vm.formData.user))])])],1),_vm._v(" "),_c('div',{staticClass:"samptitle"},[_vm._v("设备巡检内容、情况、及处理情况说明")]),_vm._v(" "),_c('div',{staticClass:"el-form-item-inline"},[_c('el-form-item',{attrs:{"label":"1.维护预备："}},[_c('el-checkbox-group',{staticClass:"checkGroup",model:{value:(_vm.formData.prepare),callback:function ($$v) {_vm.$set(_vm.formData, "prepare", $$v)},expression:"formData.prepare"}},_vm._l((_vm.prepareList),function(item){return _c('el-checkbox',{key:item.id,attrs:{"label":item.id+'',"disabled":""}},[_vm._v(_vm._s(item.value))])}))],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-inline"},[_c('el-form-item',{staticClass:"el-form-item-mar",attrs:{"label":"2.系统检查："}},[_c('el-checkbox-group',{staticClass:"checkGroup",model:{value:(_vm.formData.sys_check),callback:function ($$v) {_vm.$set(_vm.formData, "sys_check", $$v)},expression:"formData.sys_check"}},_vm._l((_vm.sysCheckList),function(item){return _c('el-checkbox',{key:item.id,attrs:{"label":item.id+'',"disabled":""}},[_vm._v(_vm._s(item.value))])}))],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-inline"},[_c('el-form-item',{attrs:{"label":"3.仪器检查："}},[_c('el-checkbox-group',{staticClass:"checkGroup",model:{value:(_vm.formData.device_check),callback:function ($$v) {_vm.$set(_vm.formData, "device_check", $$v)},expression:"formData.device_check"}},_vm._l((_vm.deviceCheckkList),function(item){return _c('el-checkbox',{key:item.id,attrs:{"label":item.id+'',"disabled":""}},[_vm._v(_vm._s(item.value))])}))],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-inline"},[_c('el-form-item',{staticClass:"el-form-item-mar",attrs:{"label":"4.周期维护："}},[_c('el-checkbox-group',{staticClass:"checkGroup",model:{value:(_vm.formData.period_check),callback:function ($$v) {_vm.$set(_vm.formData, "period_check", $$v)},expression:"formData.period_check"}},_vm._l((_vm.periodCheck),function(item){return _c('el-checkbox',{key:item.id,attrs:{"label":item.id+'',"disabled":""}},[_vm._v(_vm._s(item.value))])}))],1)],1),_vm._v(" "),_c('div',{staticClass:"samptitles"},[_vm._v("5.其他情况")]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"异常情况："}},[_c('div',{staticClass:"sampinfos",staticStyle:{"width":"100%"}},[_vm._v(_vm._s(_vm.formData.exception))])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"更换耗材："}},[_c('div',{staticClass:"sampinfos",staticStyle:{"width":"100%"}},[_vm._v(_vm._s(_vm.formData.replace_material))])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"备注："}},[_c('div',{staticClass:"sampinfos",staticStyle:{"width":"100%"}},[_vm._v(_vm._s(_vm.formData.remark))])]),_vm._v(" "),_c('div',{staticClass:"el-form-item-inline"},[_c('el-form-item',{attrs:{"label":"离站时间："}},[_c('div',{staticClass:"sampinfo"},[_vm._v(_vm._s(_vm.formData.leave_time)+"  ")])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"服务耗时："}},[_c('div',{staticClass:"sampinfo"},[_vm._v(_vm._s(_vm.formData.keep_time)+"小时")])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"维护人员："}},[_c('div',{staticClass:"sampinfo"},[_vm._v(_vm._s(_vm.formData.user))])])],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.diaLogFormVisible = false}}},[_vm._v("确 定")])],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-excel",attrs:{"width":"380px","title":"导入数据","close-on-click-modal":false,"visible":_vm.diaLogFormExcelVisible},on:{"update:visible":function($event){_vm.diaLogFormExcelVisible=$event}}},[_c('el-form',[_c('el-form-item',{staticStyle:{"text-align":"center","padding-top":"20px"}},[_c('el-upload',{staticClass:"upload-demo",attrs:{"action":_vm.uploadAction,"before-upload":_vm.uploadBefore,"on-success":_vm.uploadSuccess,"show-file-list":false,"data":_vm.uploadData,"accept":".xls"}},[_c('el-button',{attrs:{"type":"primary","plain":""}},[_vm._v("选择模板文件")]),_vm._v(" "),_c('div',{staticClass:"el-upload__tip",staticStyle:{"line-height":"20px","padding-top":"20px"},attrs:{"slot":"tip"},slot:"tip"},[_c('p',[_vm._v("请按照下载的模板格式填写信息")]),_vm._v(" "),_c('p',[_vm._v("否则上传可能会出现数据格式不正确的问题")]),_vm._v(" "),_c('a',{staticStyle:{"text-decoration":"none","color":"#4093ED"},attrs:{"target":"_blank","href":_vm.uploadTemp}},[_vm._v("下载模板")])])],1)],1)],1)],1),_vm._v(" "),_c('button',{directives:[{name:"print",rawName:"v-print",value:(_vm.printObj),expression:"printObj"}],attrs:{"id":"printBtn"}}),_vm._v(" "),_c('el-form',{staticClass:"dialog-form-records",attrs:{"id":"printRecord","model":_vm.formData,"label-width":"100px"}},[_c('h3',{staticClass:"printTitles"},[_vm._v("污水处理站维护记录表")]),_vm._v(" "),_c('div',{staticClass:"el-form-item-inline"},[_c('el-form-item',{attrs:{"label":"站点名："}},[_c('div',{staticClass:"sampinfo"},[_vm._v(_vm._s(_vm.formData.station_name))])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"维护日期："}},[_c('div',{staticClass:"sampinfo"},[_vm._v(_vm._s(_vm._f("formatGetDate")(_vm.formData.create_time))+"  ")])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"维护人："}},[_c('div',{staticClass:"sampinfo"},[_vm._v(_vm._s(_vm.formData.user))])])],1),_vm._v(" "),_c('div',{staticClass:"samptitle"},[_vm._v("设备巡检内容、情况、及处理情况说明")]),_vm._v(" "),_c('div',{staticClass:"el-form-item-inline"},[_c('el-form-item',{attrs:{"label":"1.维护预备："}},[_c('el-checkbox-group',{staticClass:"checkGroup",model:{value:(_vm.formData.prepare),callback:function ($$v) {_vm.$set(_vm.formData, "prepare", $$v)},expression:"formData.prepare"}},_vm._l((_vm.prepareList),function(item){return _c('el-checkbox',{key:item.id,attrs:{"label":item.id+'',"disabled":""}},[_vm._v(_vm._s(item.value))])}))],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-inline"},[_c('el-form-item',{staticClass:"el-form-item-mar",attrs:{"label":"2.系统检查："}},[_c('el-checkbox-group',{staticClass:"checkGroup",model:{value:(_vm.formData.sys_check),callback:function ($$v) {_vm.$set(_vm.formData, "sys_check", $$v)},expression:"formData.sys_check"}},_vm._l((_vm.sysCheckList),function(item){return _c('el-checkbox',{key:item.id,attrs:{"label":item.id+'',"disabled":""}},[_vm._v(_vm._s(item.value))])}))],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-inline"},[_c('el-form-item',{attrs:{"label":"3.仪器检查："}},[_c('el-checkbox-group',{staticClass:"checkGroup",model:{value:(_vm.formData.device_check),callback:function ($$v) {_vm.$set(_vm.formData, "device_check", $$v)},expression:"formData.device_check"}},_vm._l((_vm.deviceCheckkList),function(item){return _c('el-checkbox',{key:item.id,attrs:{"label":item.id+'',"disabled":""}},[_vm._v(_vm._s(item.value))])}))],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-inline"},[_c('el-form-item',{staticClass:"el-form-item-mar",attrs:{"label":"4.周期维护："}},[_c('el-checkbox-group',{staticClass:"checkGroup",model:{value:(_vm.formData.period_check),callback:function ($$v) {_vm.$set(_vm.formData, "period_check", $$v)},expression:"formData.period_check"}},_vm._l((_vm.periodCheck),function(item){return _c('el-checkbox',{key:item.id,attrs:{"label":item.id+'',"disabled":""}},[_vm._v(_vm._s(item.value))])}))],1)],1),_vm._v(" "),_c('div',{staticClass:"samptitles"},[_vm._v("5.其他情况")]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"异常情况："}},[_c('div',{staticClass:"sampinfos",staticStyle:{"width":"100%"}},[_vm._v(_vm._s(_vm.formData.exception))])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"更换耗材："}},[_c('div',{staticClass:"sampinfos",staticStyle:{"width":"100%"}},[_vm._v(_vm._s(_vm.formData.replace_material))])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"备注"}},[_c('div',{staticClass:"sampinfos",staticStyle:{"width":"100%"}},[_vm._v(_vm._s(_vm.formData.remark))])]),_vm._v(" "),_c('div',{staticClass:"el-form-item-inline"},[_c('el-form-item',{attrs:{"label":"离站时间："}},[_c('div',{staticClass:"sampinfo"},[_vm._v(_vm._s(_vm.formData.leave_time)+"  ")])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"服务耗时："}},[_c('div',{staticClass:"sampinfo"},[_vm._v(_vm._s(_vm.formData.keep_time)+"小时")])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"维护人员："}},[_c('div',{staticClass:"sampinfo"},[_vm._v(_vm._s(_vm.formData.user))])])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_RecordManage = (esExports);
// CONCATENATED MODULE: ./src/views/RecordManage/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("fZcy")
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
  RecordManage,
  views_RecordManage,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_RecordManage = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "fZcy":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("xFHn");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("8bSs")("2ffaea06", content, true);

/***/ }),

/***/ "xFHn":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("BkJT")(false);
// imports


// module
exports.push([module.i, "\n.el-search-items .el-select .el-input {\r\n  width: 120px;\r\n  border-radius: 4px;\n}\n.el-search-items .el-select .el-input__inner {\r\n  background: #2b8cf9;\r\n  color: #fff;\r\n  text-align: center;\r\n  border: 0;\n}\n.el-search-items .el-select .el-input .el-select__caret {\r\n  color: #fff;\n}\n.dialog-form-records .el-select {\r\n  width: 100%;\n}\n.dialog-form-records .el-form-item-inline {\r\n  display: inline-block;\n}\n.dialog-form-records .el-form-item-inline .el-form-item {\r\n  display: inline-block;\r\n  margin-bottom: 0px;\n}\n.dialog-form-records .el-form-item-block {\r\n  display: block;\n}\n.dialog-form-records .el-form-item-inline .el-input__inner {\r\n  width: 220px;\n}\n.dialog-form-records .samptitle {\r\n  font-size: 16px;\r\n  text-align: center;\r\n  color: #338ff6;\r\n  margin-bottom: 30px;\r\n  margin-top: 20px;\n}\n.dialog-form-records .samptitles {\r\n  font-size: 14px;\r\n  padding-left: 8px;\r\n  margin-bottom: 30px;\n}\n.dialog-form-records .sampinfo {\r\n  display: inline-block;\r\n  min-width: 100px;\r\n  margin-right: 20px;\r\n  color: #338ff6;\r\n  overflow: hidden;\r\n  height: 30px;\n}\n.dialog-form-records .sampinfos {\r\n  overflow: hidden;\r\n  display: inline-block;\r\n  min-width: 58px;\r\n  min-height: 28px;\r\n  line-height: 28px;\r\n  border-bottom: 1px #ddd solid;\n}\n.dialog-form-records\r\n  .el-checkbox__input.is-disabled.is-checked\r\n  .el-checkbox__inner::after {\r\n  border-color: #338ff6;\n}\n.dialog-opera .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {\r\n  background-color: #f2f6fc;\r\n  border-color: #338ff6;\n}\n.dialog-form-records .el-checkbox__input.is-disabled .el-checkbox__inner {\r\n  background-color: #edf2fc;\r\n  border-color: #338ff6;\r\n  cursor: not-allowed;\n}\n.dialog-form-records .el-checkbox__input.is-disabled + span.el-checkbox__label {\r\n  color: #333;\r\n  cursor: not-allowed;\n}\n.isok-popover {\r\n  min-width: 70px;\r\n  padding: 5px;\n}\n.isok-popover span {\r\n  cursor: pointer;\n}\r\n", ""]);

// exports


/***/ })

});