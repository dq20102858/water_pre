webpackJsonp([17],{

/***/ "70iE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/get-iterator.js
var get_iterator = __webpack_require__("HzJ8");
var get_iterator_default = /*#__PURE__*/__webpack_require__.n(get_iterator);

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.2@babel-loader/lib!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=script&index=0!./src/views/DispatchManage/index.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var DispatchManage = ({
  data: function data() {
    var _this = this;

    return {
      diaLogFormVisible: false,
      diaLogTitle: "添加信息",
      diaLogFormDetailVisible: false,
      formData: {},
      formRules: {
        sid: [{
          required: true,
          message: "请选择站点名",
          trigger: "change"
        }],
        assigner_id: [{
          required: true,
          message: "请选择指派人",
          trigger: "change"
        }],
        type: [{
          required: true,
          message: "请选择派单事项",
          trigger: "change"
        }],
        content: [{ min: 2, max: 200, message: "长度在2到200个字符", trigger: "blur" }, {
          pattern: /(^\S+).*(\S+$)/,
          message: "开始和结尾不能有空格",
          trigger: "blur"
        }]
      },
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
      searchKeyword: "",
      searchAssignerId: "0",
      searchType: "0",
      searchStatus: "0",
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
      searchEndTime: ""
    };
  },
  created: function created() {
    this.getFatherStationList();
    this.getDataList();
    this.getUsersList();
  },

  methods: {
    getDataList: function getDataList() {
      var _this2 = this;

      var page = this.page_cur;
      var type = this.searchType;
      var status = this.searchStatus;
      var sid = this.chlidStationId;
      var assigner_id = this.searchAssignerId;
      var start_time = this.searchStartTime;
      var end_time = this.searchEndTime;
      this.request({
        url: "/assign/getAssignPages",
        method: "get",
        params: { page: page, sid: sid, assigner_id: assigner_id, type: type, status: status, start_time: start_time, end_time: end_time }
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
    searchAssignerEvent: function searchAssignerEvent(item) {
      this.searchAssignerId = item;
      this.getDataList();
    },
    searchStatusEvent: function searchStatusEvent(val) {
      this.searchStatus = val;
      this.getDataList();
    },
    searchTypeEvent: function searchTypeEvent(val) {
      this.searchType = val;
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
      this.searchStatus = "0";
      this.searchType = "0";
      this.searchAssignerId = "0";
      this.chlidStationId = 0;
      this.searchStartTime = "";
      this.searchEndTime = "";
      this.getDataList();
    },
    getStationList: function getStationList() {
      var _this3 = this;

      this.request({
        url: "/station/getStationLists",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this3.stationOptions = data.data;
        }
      });
    },
    getUsersList: function getUsersList() {
      var _this4 = this;

      this.request({
        url: "/assign/getUsersLists",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this4.userList = data.data;
        }
      });
    },
    userChange: function userChange(e) {
      var _this5 = this;

      this.userList.forEach(function (ele) {
        if (ele.id == e) {
          // if (ele.role_id == 1) {
          //   this.formData.role = "管理员";
          // } else if (ele.role_id == 2) {
          //   this.formData.role = "维修人员";
          // } else if (ele.role_id == 3) {
          //   this.formData.role = "巡检人员";
          // } else if (ele.role_id == 4) {
          //   this.formData.role = "分析人员";
          // }
          _this5.formData.phone = ele.phone;
        }
      });
    },

    //添加编辑
    addShowDialog: function addShowDialog() {
      var _this6 = this;

      this.getStationList();

      this.diaLogFormVisible = true;
      this.diaLogTitle = "发起派单";
      this.$nextTick(function () {
        _this6.$refs["formRulesRef"].clearValidate();
      });
      this.formData = {
        // title: "",
        // description: "",
        // recept_type: []
      };
    },
    addEvent: function addEvent() {
      var _this7 = this;

      var that = this;
      this.$refs["formRulesRef"].validate(function (valid) {
        if (valid) {
          var data = that.formData;
          data.sid = that.formData.sid[1];
          _this7.request({
            url: "/assign/addAssign",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this7.diaLogFormVisible = false;
              _this7.searchType = "0";
              _this7.getDataList();
              _this7.$message({
                type: "success",
                message: "保存成功！"
              });
            }
          });
        } else {
          console.log("操作失败！");
          return false;
        }
      });
    },
    detailEvent: function detailEvent(id) {
      var _this8 = this;

      this.diaLogFormDetailVisible = true;
      this.request({
        url: "/assign/getAssignDetail",
        method: "get",
        params: { id: id }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this8.formData = data.data;
        }
      });
    },
    applyEvent: function applyEvent(id) {
      var _this9 = this;

      this.$confirm("请确认派单是否完成？", "提示", {
        confirmButtonText: "已完成",
        cancelButtonText: "未完成",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this9.request({
          url: "/assign/checkAssign",
          method: "post",
          data: { id: id, status: 2 }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            _this9.getDataList();
          }
        });
      }).catch(function () {});
    },
    deleteEvent: function deleteEvent(id) {
      var _this10 = this;

      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this10.request({
          url: "/assign/deleteAssign",
          method: "post",
          data: { id: id, type: parseInt(_this10.searchType) }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            if (_this10.dataList.length == 1) {
              _this10.page_cur = _this10.page_cur - 1;
              _this10.getDataList();
            } else {
              _this10.getDataList();
            }
            _this10.$message({
              type: "success",
              message: "删除成功！"
            });
          }
        });
      }).catch(function () {});
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
// CONCATENATED MODULE: ./node_modules/_vue-loader@13.5.0@vue-loader/lib/template-compiler?{"id":"data-v-37b26b62","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=template&index=0!./src/views/DispatchManage/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-device-page"},[_c('div',{staticClass:"app-page-rows"},[_c('div',{staticClass:"app-page-rows-lefts"},[_c('div',{staticClass:"left-menu-area"},[_c('div',{staticClass:"input-so"},[_c('el-autocomplete',{staticClass:"inline-input",attrs:{"prefix-icon":"el-icon-search","fetch-suggestions":_vm.searchStationCallBack,"placeholder":"请输入处理站名","trigger-on-focus":false,"clearable":""},on:{"select":function($event){_vm.searchStationEvent($event)}},model:{value:(_vm.chlidStationName),callback:function ($$v) {_vm.chlidStationName=$$v},expression:"chlidStationName"}})],1),_vm._v(" "),_c('el-menu',{attrs:{"router":""}},[_c('el-menu-item',{class:_vm.fatherStationId === 0 ? 'active' : '',on:{"click":function($event){_vm.fatherStationEvent(0)}}},[_c('span',[_vm._v("全部")])]),_vm._v(" "),_vm._l((_vm.fatherStationList),function(item){return _c('el-menu-item',{key:item.id,class:_vm.fatherStationId === item.id ? 'active' : '',on:{"click":function($event){_vm.fatherStationEvent(item.id)}}},[_c('span',{attrs:{"title":item.name}},[_vm._v(_vm._s(item.name))])])})],2)],1),_vm._v(" "),_c('div',{staticClass:"left-menu-chlid"},[_c('el-menu',{attrs:{"router":""}},_vm._l((_vm.childStationList),function(item){return _c('el-menu-item',{key:item.id,class:_vm.chlidStationId === item.id ? 'active' : '',on:{"click":function($event){_vm.chlidStationEvent(item.id)}}},[_c('span',{attrs:{"title":item.name}},[_vm._v(_vm._s(item.name))])])}))],1)]),_vm._v(" "),_c('div',{staticClass:"app-page-rows-rights"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',{staticClass:"el-form-item el-select-dorps"},[_c('el-select',{staticStyle:{"width":"150px"},on:{"change":_vm.searchStatusEvent},model:{value:(_vm.searchStatus),callback:function ($$v) {_vm.searchStatus=$$v},expression:"searchStatus"}},[_c('el-option',{attrs:{"label":"请选择派单状态","value":"0"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"已完成","value":"2"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"未完成","value":"1"}})],1)],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item el-select-dorps",staticStyle:{"width":"150px"}},[_c('el-select',{attrs:{"filterable":"","placeholder":"请选择运维人员"},on:{"change":function($event){_vm.searchAssignerEvent($event)}},model:{value:(_vm.searchAssignerId),callback:function ($$v) {_vm.searchAssignerId=$$v},expression:"searchAssignerId"}},[_c('el-option',{key:"0",attrs:{"label":"请选择运维人员","value":"0"}}),_vm._v(" "),_vm._l((_vm.userList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})})],2)],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item el-select-dorps"},[_c('el-select',{staticStyle:{"width":"150px"},on:{"change":_vm.searchTypeEvent},model:{value:(_vm.searchType),callback:function ($$v) {_vm.searchType=$$v},expression:"searchType"}},[_c('el-option',{attrs:{"label":"请选择运维项目","value":"0"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"设备维修","value":"1"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"例行维保","value":"2"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"运行检查","value":"3"}})],1)],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item"},[_c('el-date-picker',{staticStyle:{"width":"150px"},attrs:{"type":"date","placeholder":"选择开始日期","picker-options":_vm.pickerStartTime},on:{"change":_vm.searchStartTimeEvent},model:{value:(_vm.searchStartTime),callback:function ($$v) {_vm.searchStartTime=$$v},expression:"searchStartTime"}})],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-line"},[_vm._v("-")]),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item"},[_c('el-date-picker',{staticStyle:{"width":"150px"},attrs:{"type":"date","placeholder":"选择结束日期","picker-options":_vm.pickerEndTime},on:{"change":_vm.searchEndTimeEvent},model:{value:(_vm.searchEndTime),callback:function ($$v) {_vm.searchEndTime=$$v},expression:"searchEndTime"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.searchAllEvent}},[_vm._v("重置")])],1),_vm._v(" "),_c('div',{staticClass:"el-serach noborder"},[_c('el-button',{on:{"click":_vm.addShowDialog}},[_vm._v("发起派单")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"label":"序号","width":"80px"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v(_vm._s(scope.$index+(_vm.page_cur - 1) * _vm.page_size + 1))]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"station_name","label":"站点名"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"assigner","label":"指派人"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"phone","label":"手机"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"type","label":"维保事项"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.type==1)?_c('span',[_vm._v("设备维修")]):(scope.row.type==2)?_c('span',[_vm._v("例行维保")]):_c('span',[_vm._v("运行检查")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"status","label":"状态"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.status==2)?_c('span',{staticStyle:{"color":"#1ba163"}},[_vm._v("已完成")]):_c('span',{staticStyle:{"color":"#999"}},[_vm._v("未完成")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"assign_time","label":"指派时间","width":"100"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"190"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[(scope.row.status==1)?_c('el-button',{staticClass:"btn-apply",attrs:{"size":"mini"},on:{"click":function($event){_vm.applyEvent(scope.row.id)}}},[_vm._v("审批")]):_vm._e(),_vm._v(" "),(scope.row.status==2)?_c('el-button',{staticClass:"btn-apply",attrs:{"size":"mini","disabled":""}},[_vm._v("审批")]):_vm._e(),_vm._v(" "),_c('el-button',{staticClass:"btn-edit",attrs:{"size":"mini"},on:{"click":function($event){_vm.detailEvent(scope.row.id)}}},[_vm._v("详情")]),_vm._v(" "),_c('el-button',{staticClass:"btn-del",attrs:{"size":"mini"},on:{"click":function($event){_vm.deleteEvent(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.page_data_total,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.pageToFirst}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.pageToLast}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1)])])]),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-dispatch",attrs:{"width":"734px","title":this.diaLogTitle,"close-on-click-modal":false,"visible":_vm.diaLogFormVisible},on:{"update:visible":function($event){_vm.diaLogFormVisible=$event}}},[_c('el-form',{ref:"formRulesRef",staticClass:"el-form-custom",attrs:{"model":_vm.formData,"rules":_vm.formRules,"label-width":"120px"}},[_c('div',{staticClass:"el-form-item-inlines"},[_c('el-form-item',{attrs:{"label":"站点名：","prop":"sid"}},[_c('el-cascader',{attrs:{"options":_vm.stationOptions,"props":_vm.stationOptionsProps},model:{value:(_vm.formData.sid),callback:function ($$v) {_vm.$set(_vm.formData, "sid", $$v)},expression:"formData.sid"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"派单事项：","prop":"type"}},[_c('el-select',{attrs:{"placeholder":"请选择派单事项"},model:{value:(_vm.formData.type),callback:function ($$v) {_vm.$set(_vm.formData, "type", $$v)},expression:"formData.type"}},[_c('el-option',{attrs:{"label":"设备维修","value":1}}),_vm._v(" "),_c('el-option',{attrs:{"label":"例行维保","value":2}}),_vm._v(" "),_c('el-option',{attrs:{"label":"运行检查","value":3}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"指派人员：","prop":"assigner_id"}},[_c('el-select',{attrs:{"filterable":"","placeholder":"请选择 或搜索"},on:{"change":function($event){_vm.userChange($event)}},model:{value:(_vm.formData.assigner_id),callback:function ($$v) {_vm.$set(_vm.formData, "assigner_id", $$v)},expression:"formData.assigner_id"}},_vm._l((_vm.userList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"手机号码："}},[_c('el-input',{attrs:{"autocomplete":"off","disabled":""},model:{value:(_vm.formData.phone),callback:function ($$v) {_vm.$set(_vm.formData, "phone", $$v)},expression:"formData.phone"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"维修内容：","prop":"content"}},[_c('el-input',{attrs:{"type":"textarea","rows":"5"},model:{value:(_vm.formData.content),callback:function ($$v) {_vm.$set(_vm.formData, "content", $$v)},expression:"formData.content"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.diaLogFormVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.addEvent}},[_vm._v("确 定")])],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-dispatch",attrs:{"width":"600px","title":"派单详情","close-on-click-modal":false,"visible":_vm.diaLogFormDetailVisible},on:{"update:visible":function($event){_vm.diaLogFormDetailVisible=$event}}},[_c('el-form',{staticClass:"el-form-custom",attrs:{"model":_vm.formData,"label-width":"120px"}},[_c('div',{staticClass:"el-form-item-detail"},[_c('el-form-item',{attrs:{"label":"站点名："}},[_c('div',{staticClass:"disp-info"},[_vm._v(_vm._s(_vm.formData.station_name))])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"派单事项："}},[(_vm.formData.type==1)?_c('div',{staticClass:"disp-info"},[_vm._v("设备维修")]):_vm._e(),_vm._v(" "),(_vm.formData.type==2)?_c('div',{staticClass:"disp-info"},[_vm._v("例行维保")]):_vm._e(),_vm._v(" "),(_vm.formData.type==3)?_c('div',{staticClass:"disp-info"},[_vm._v("运行检查")]):_vm._e()]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"指派人员："}},[_c('div',{staticClass:"disp-info"},[_vm._v(_vm._s(_vm.formData.assigner))])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"手机号码："}},[_c('div',{staticClass:"disp-info"},[_vm._v(_vm._s(_vm.formData.phone))])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"指派时间："}},[_c('div',{staticClass:"disp-info"},[_vm._v(_vm._s(_vm.formData.assign_time))])])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"维修内容："}},[_c('div',{staticClass:"disp-info"},[_vm._v(_vm._s(_vm.formData.content==""?"暂无内容":_vm.formData.content))])])],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.diaLogFormDetailVisible=false}}},[_vm._v("确 定")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_DispatchManage = (esExports);
// CONCATENATED MODULE: ./src/views/DispatchManage/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("IXK5")
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
  DispatchManage,
  views_DispatchManage,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_DispatchManage = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "IXK5":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("iyj5");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("8bSs")("55be5238", content, true);

/***/ }),

/***/ "iyj5":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("BkJT")(false);
// imports


// module
exports.push([module.i, "\n.dialog-dispatch .el-select {\r\n  width: 100%;\n}\n.dialog-dispatch .el-form-item-inline {\r\n  display: inline-block;\n}\n.dialog-dispatch .el-form-item-inline .el-form-item {\r\n  display: inline-block;\n}\n.dialog-dispatch .el-form-item-block {\r\n  display: block;\n}\n.dialog-dispatch .el-form-item-inline .el-checkbox-group {\r\n  margin-left: 110px;\n}\n.dialog-dispatch .el-form-item-inline .el-input__inner {\r\n  width: 220px;\n}\n.el-form-item-detail .el-form-item {\r\n  margin-bottom: 5px;\n}\n.el-form-item-detail .disp-info {\r\n  line-height: 28px;\r\n  margin-top: 5px;\n}\n.dd {\r\n  display: inline-block;\r\n  overflow-y: auto;\n}\r\n", ""]);

// exports


/***/ })

});