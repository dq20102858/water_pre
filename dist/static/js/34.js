webpackJsonp([34],{

/***/ "9xj4":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("W/2d");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("1e1a15aa", content, true);

/***/ }),

/***/ "AJau":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/project/detaillist.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var detaillist = ({
  data: function data() {
    return {
      detailListPages: [],
      detailPage: 1,
      detailTotal: 0,
      detailPageSize: 20,
      detailPage_total: 0,
      searchForm: {
        is_finish: "全部"
      },
      dialogAddHistoryVisible: false,
      historyData: {},
      historyDataType: 1,
      historyTitle: "",
      historyRules: {
        pro_id: [{ required: true, message: "请选择作业", trigger: "change" }],
        line_type: [{ required: true, message: "请选择线别", trigger: "change" }],
        start_flag: [{ required: true, message: "请输入计划里程", trigger: "blur" }],
        t_start_flag: [{ required: true, message: "请输入实际里程", trigger: "blur" }],
        plan_time: [{ required: true, message: "请选择日期", trigger: "change" }],
        plan_num: [{ required: true, message: "请输入计划数量", trigger: "blur" }, {
          pattern: /^\d{1,5}$/,
          message: "请输入1-5位正整数",
          trigger: "blur"
        }],
        true_num: [{
          pattern: /^\d{1,5}$/,
          message: "请输入1-5位正整数",
          trigger: "blur"
        }],
        is_finish: [{ required: true, message: "请选择是否完成", trigger: "change" }],
        remark: [{ min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }]
      },
      workLists: [],
      workLineTypeList: [],
      lineTypeListDes: [],
      lineTypeDes: "",
      lineTypeStartTotal: 0,
      lineTypeEndTotal: 0,
      addShow: true
    };
  },
  mounted: function mounted() {
    document.querySelector("#app-menu-items #menu_project").classList.add("is-active");
  },
  created: function created() {
    this.getWorkList();
    this.getDetailLists();
  },

  methods: {
    //获取分页列表数据
    getDetailLists: function getDetailLists() {
      var _this = this;

      var page = this.detailPage;
      var pro_id = this.searchForm.work;
      var time_range = this.searchForm.time_range;
      var is_finish = this.searchForm.is_finish;
      if (this.searchForm.is_finish == -1) {
        is_finish = null;
      }
      console.log(this.searchForm);
      this.request({
        url: "/project/getPlanPages",
        method: "get",
        params: { page: page, pro_id: pro_id, time_range: time_range, is_finish: is_finish }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this.detailListPages = data.data.data;
          _this.detailPage = parseInt(data.data.current_page);
          _this.detailTotal = parseInt(data.data.total);
          _this.detailPageSize = data.data.per_page;
          _this.detailPage_total = parseInt(data.data.last_page);
        }
      });
    },
    detailPageChange: function detailPageChange(value) {
      this.detailPage = value;
      this.getDetailLists();
    },
    detailPageFirst: function detailPageFirst() {
      this.detailPageChange(1);
    },
    detailPageLast: function detailPageLast() {
      this.detailPage = this.detailPage_total;
      this.detailPageChange(this.detailPage_total);
    },
    detailSearchPage: function detailSearchPage() {
      this.detailPage = 1;
      this.getDetailLists();
    },


    //获取二级分类
    getWorkList: function getWorkList() {
      var _this2 = this;

      this.request({
        url: "/project/getWorkTypeList",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this2.workLists = data.data;
        }
      });
    },
    changeWorkListItem: function changeWorkListItem(value) {
      var that = this;
      this.$set(this.historyData, "line_type", "");
      this.lineTypeDes = "";
      var selectedLineTypeLists = [];
      var selectedLineTypeDes = [];

      this.workLists.forEach(function (item) {
        if (item.id == value) {
          selectedLineTypeLists = item.line_type_lists;
          selectedLineTypeDes = item.des;
          that.historyDataType = item.type;
        }
      });
      this.workLineTypeList = selectedLineTypeLists;
      this.lineTypeListDes = selectedLineTypeDes;
    },
    changeWorkLineTypeList: function changeWorkLineTypeList(value) {
      var _this3 = this;

      this.lineTypeListDes.map(function (item, i) {
        if (item.line_type == value) {
          _this3.lineTypeDes = item.tip;
          _this3.lineTypeStartTotal = item.total_start_flag * 1000 + parseInt(item.total_start_length);
          _this3.lineTypeEndTotal = item.total_end_flag * 1000 + parseInt(item.total_end_length);
          console.log("lineTypeStartTotal：" + _this3.lineTypeStartTotal + " lineTypeEndTotal：" + _this3.lineTypeEndTotal);
          //console.log(item.tip);
        }
      });
    },

    //打开添加弹窗
    addHistory: function addHistory() {
      this.dialogAddHistoryVisible = true;
      this.historyTitle = "添加历史记录";
      this.addShow = true;
      this.lineTypeDes = "";
      this.historyData = {
        pro_id: "",
        line_type: "",
        plan_num: "",
        true_num: "",
        start_flag: "",
        start_length: ""
      };
    },
    addOrEditPlanDo: function addOrEditPlanDo() {
      var _this4 = this;

      this.$refs["detailForm"].validate(function (valid) {
        if (valid) {
          var data = _this4.historyData;

          var start = _this4.historyData.start_flag * 1000 + parseInt(_this4.historyData.start_length);
          var end = _this4.historyData.end_flag * 1000 + parseInt(_this4.historyData.end_length);
          var t_start = _this4.historyData.t_start_flag * 1000 + parseInt(_this4.historyData.t_start_length);
          var t_end = _this4.historyData.t_end_flag * 1000 + parseInt(_this4.historyData.t_end_length);
          if (_this4.addShow == true) {
            if (start < _this4.lineTypeStartTotal || end > _this4.lineTypeEndTotal) {
              _this4.$message.error("请输入" + _this4.lineTypeDes);
              return;
            }
          }
          if (end < start) {
            _this4.$message.error("输入的计划结束里程不能小于开始里程");
            return;
          }
          if (t_start < start) {
            _this4.$message.error("输入的实际开始里程不能小于计划开始里程");
            return;
          }
          if (t_end > end) {
            _this4.$message.error("输入的实际结束里程不能大于实话开始里程");
            return;
          }
          if (t_end < t_start) {
            _this4.$message.error("输入的实际结束里程不能小于开始里程");
            return;
          }
          _this4.request({
            url: "/project/addOrEditPlan",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            var msg = "";
            if (data.status == 1) {
              _this4.$message({
                showClose: true,
                message: "保存成功",
                type: "success"
              });
              _this4.getDetailLists();
              _this4.dialogAddHistoryVisible = false;
            } else {
              _this4.$message({
                showClose: true,
                message: "保存失败",
                type: "error"
              });
            }
          });
        }
      });
    },
    getPlanDetail: function getPlanDetail(id) {
      var _this5 = this;

      this.historyTitle = "修改历史记录 ";
      this.addShow = false;
      this.request({
        url: "/project/getPlanDetail",
        method: "get",
        params: { id: id }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this5.historyData = data.data;
          _this5.historyData.is_finish = _this5.historyData.is_finish.toString();
          if (data.data.plan_num > 0) {
            _this5.dialogAddHistoryVisible = true;
            _this5.historyDataType = 2;
          } else {
            _this5.dialogAddHistoryVisible = true;
            _this5.historyDataType = 1;
          }
        }
      });
    },
    deletePlan: function deletePlan(id) {
      var _this6 = this;

      this.$confirm("您确定删除作业?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        var data = {
          id: id
        };
        _this6.request({
          url: "/project/deletePlan",
          method: "post",
          data: data
        }).then(function (response) {
          var data = response.data;
          if (data.status == 1) {
            _this6.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            _this6.getDetailLists();
          } else {
            _this6.$message({
              showClose: true,
              message: "删除失败",
              type: "error"
            });
          }
        });
      }).catch(function () {});
    }

    //

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-22fa2734","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/project/detaillist.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"project"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"detaillist","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("MV+A")}}),_vm._v("工程进度\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"project"}},[_vm._v("添加作业")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"schedule"}},[_vm._v("计划日程")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"detaillist"}},[_vm._v("详情列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"chartdata"}},[_vm._v("图表数据")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{attrs:{"id":"detail"}},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"model":_vm.searchForm,"inline":true}},[_c('el-form-item',{staticClass:"form-add-item"},[_c('el-button',{attrs:{"size":"small","icon":"el-icon-plus","type":"primary"},on:{"click":_vm.addHistory}},[_vm._v("添加历史记录")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"作业"}},[_c('el-select',{staticClass:"search-input search-select",attrs:{"clearable":"","placeholder":"请选择作业"},model:{value:(_vm.searchForm.work),callback:function ($$v) {_vm.$set(_vm.searchForm, "work", $$v)},expression:"searchForm.work"}},_vm._l((_vm.workLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}},[_vm._v(_vm._s(item.name))])}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"时间"}},[_c('el-date-picker',{attrs:{"type":"daterange","align":"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},model:{value:(_vm.searchForm.time_range),callback:function ($$v) {_vm.$set(_vm.searchForm, "time_range", $$v)},expression:"searchForm.time_range"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"状态"}},[_c('el-select',{staticClass:"search-input search-select",staticStyle:{"width":"140px"},attrs:{"placeholder":"请选择状态"},model:{value:(_vm.searchForm.is_finish),callback:function ($$v) {_vm.$set(_vm.searchForm, "is_finish", $$v)},expression:"searchForm.is_finish"}},[_c('el-option',{attrs:{"label":"全部","value":"-1","selected":""}},[_vm._v("全部")]),_vm._v(" "),_c('el-option',{attrs:{"label":"已完成","value":"1"}},[_vm._v("已完成")]),_vm._v(" "),_c('el-option',{attrs:{"label":"未完成","value":"0"}},[_vm._v("未完成")])],1)],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"size":"small","icon":"el-icon-search","type":"primary"},on:{"click":_vm.detailSearchPage}},[_vm._v("查询")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{ref:"multipleTable",attrs:{"data":_vm.detailListPages}},[_c('el-table-column',{attrs:{"type":"index","label":"序号","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"pro_name","label":"作业名称","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"计划完成","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.plan_num>0)?_c('span',[_vm._v(_vm._s(scope.row.plan_num))]):_c('span',[_vm._v(_vm._s(scope.row.plan_tip))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"实际完成","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.plan_num>0)?_c('span',[_vm._v(_vm._s(scope.row.true_num))]):_c('span',[_vm._v(_vm._s(scope.row.true_tip))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"状态","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.is_finish == 1)?_c('span',[_vm._v("已完成")]):_c('span',[_vm._v("未完成")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"remark","label":"备注","align":"center","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"plan_date","label":"日期","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"120"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.getPlanDetail(scope.row.id)}}},[_vm._v("修改")]),_vm._v(" "),_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.deletePlan(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1)],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.detailListPages.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","current-page":this.detailPage,"total":this.detailTotal,"page-size":this.detailPageSize,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.detailPageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.detailPageFirst}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.detailPageLast}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-plan-detail",attrs:{"width":"700px","close-on-click-modal":false,"title":this.historyTitle,"visible":_vm.dialogAddHistoryVisible},on:{"update:visible":function($event){_vm.dialogAddHistoryVisible=$event}}},[_c('el-form',{ref:"detailForm",staticClass:"el-form-custom",attrs:{"model":_vm.historyData,"rules":_vm.historyRules}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.addShow),expression:"!addShow"}],staticClass:"ptxtbox"},[_c('el-form-item',{staticClass:"widhtss",attrs:{"label":"作业名称："}},[_c('el-input',{attrs:{"disabled":""},model:{value:(_vm.historyData.pro_name),callback:function ($$v) {_vm.$set(_vm.historyData, "pro_name", $$v)},expression:"historyData.pro_name"}})],1),_vm._v(" "),(_vm.historyDataType==1)?_c('el-form-item',{staticClass:"widhtss",attrs:{"label":"线别："}},[_c('el-input',{attrs:{"disabled":""},model:{value:(_vm.historyData.line_type_desc),callback:function ($$v) {_vm.$set(_vm.historyData, "line_type_desc", $$v)},expression:"historyData.line_type_desc"}})],1):_vm._e(),_vm._v(" "),_c('el-form-item',{staticClass:"widhtss",attrs:{"label":"完成日期：","prop":"plan_time"}},[_c('el-date-picker',{attrs:{"type":"date","placeholder":"选择日期"},model:{value:(_vm.historyData.plan_time),callback:function ($$v) {_vm.$set(_vm.historyData, "plan_time", $$v)},expression:"historyData.plan_time"}})],1)],1),_vm._v(" "),_c('el-form-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.addShow),expression:"addShow"}],attrs:{"label":"作业名称：","prop":"pro_id"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择作业"},on:{"change":_vm.changeWorkListItem},model:{value:(_vm.historyData.pro_id),callback:function ($$v) {_vm.$set(_vm.historyData, "pro_id", $$v)},expression:"historyData.pro_id"}},_vm._l((_vm.workLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),(_vm.historyDataType==2)?_c('el-form-item',{attrs:{"label":"计划数量：","prop":"plan_num"}},[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"请输入数字"},model:{value:(_vm.historyData.plan_num),callback:function ($$v) {_vm.$set(_vm.historyData, "plan_num", $$v)},expression:"historyData.plan_num"}})],1):_vm._e(),_vm._v(" "),(_vm.historyDataType==2)?_c('el-form-item',{attrs:{"label":"实际数量：","prop":"true_num"}},[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"请输入个，股，孔等"},model:{value:(_vm.historyData.true_num),callback:function ($$v) {_vm.$set(_vm.historyData, "true_num", $$v)},expression:"historyData.true_num"}})],1):_vm._e(),_vm._v(" "),(_vm.historyDataType==1)?_c('div',{staticStyle:{"padding-bottom":"25px"}},[_c('el-form-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.addShow),expression:"addShow"}],attrs:{"label":"线别：","prop":"line_type"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择线别"},on:{"change":_vm.changeWorkLineTypeList},model:{value:(_vm.historyData.line_type),callback:function ($$v) {_vm.$set(_vm.historyData, "line_type", $$v)},expression:"historyData.line_type"}},_vm._l((_vm.workLineTypeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})})),_vm._v(" "),_c('div',{staticClass:"el-form-item__error"},[_vm._v(_vm._s(_vm.lineTypeDes))])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"计划里程：","prop":"start_flag"}},[_c('b',[_vm._v("DK")]),_vm._v(" "),_c('el-input',{staticClass:"pinput",attrs:{"placeholder":"公里"},model:{value:(_vm.historyData.start_flag),callback:function ($$v) {_vm.$set(_vm.historyData, "start_flag", $$v)},expression:"historyData.start_flag"}}),_vm._v("+\n                "),_c('el-input',{staticClass:"pinput",attrs:{"placeholder":"米"},model:{value:(_vm.historyData.start_length),callback:function ($$v) {_vm.$set(_vm.historyData, "start_length", $$v)},expression:"historyData.start_length"}}),_vm._v(" "),_c('em',[_vm._v("~")]),_vm._v(" "),_c('b',[_vm._v("DK")]),_vm._v(" "),_c('el-input',{staticClass:"pinput",attrs:{"placeholder":"公里"},model:{value:(_vm.historyData.end_flag),callback:function ($$v) {_vm.$set(_vm.historyData, "end_flag", $$v)},expression:"historyData.end_flag"}}),_vm._v("+\n                "),_c('el-input',{staticClass:"pinput",attrs:{"placeholder":"米"},model:{value:(_vm.historyData.end_length),callback:function ($$v) {_vm.$set(_vm.historyData, "end_length", $$v)},expression:"historyData.end_length"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"实际里程：","prop":"t_start_flag"}},[_c('b',[_vm._v("DK")]),_vm._v(" "),_c('el-input',{staticClass:"pinput",attrs:{"placeholder":"公里"},model:{value:(_vm.historyData.t_start_flag),callback:function ($$v) {_vm.$set(_vm.historyData, "t_start_flag", $$v)},expression:"historyData.t_start_flag"}}),_vm._v("+\n                "),_c('el-input',{staticClass:"pinput",attrs:{"placeholder":"米"},model:{value:(_vm.historyData.t_start_length),callback:function ($$v) {_vm.$set(_vm.historyData, "t_start_length", $$v)},expression:"historyData.t_start_length"}}),_vm._v(" "),_c('em',[_vm._v("~")]),_vm._v(" "),_c('b',[_vm._v("DK")]),_vm._v(" "),_c('el-input',{staticClass:"pinput",attrs:{"placeholder":"公里"},model:{value:(_vm.historyData.t_end_flag),callback:function ($$v) {_vm.$set(_vm.historyData, "t_end_flag", $$v)},expression:"historyData.t_end_flag"}}),_vm._v("+\n                "),_c('el-input',{staticClass:"pinput",attrs:{"placeholder":"米"},model:{value:(_vm.historyData.t_end_length),callback:function ($$v) {_vm.$set(_vm.historyData, "t_end_length", $$v)},expression:"historyData.t_end_length"}})],1)],1):_vm._e(),_vm._v(" "),_c('el-form-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.addShow),expression:"addShow"}],attrs:{"label":"完成日期：","prop":"plan_time"}},[_c('el-date-picker',{attrs:{"type":"date","placeholder":"选择日期"},model:{value:(_vm.historyData.plan_time),callback:function ($$v) {_vm.$set(_vm.historyData, "plan_time", $$v)},expression:"historyData.plan_time"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否完成：","prop":"is_finish"}},[_c('el-radio',{attrs:{"label":"1","value":"1"},model:{value:(_vm.historyData.is_finish),callback:function ($$v) {_vm.$set(_vm.historyData, "is_finish", $$v)},expression:"historyData.is_finish"}},[_vm._v("是")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"0","value":"0"},model:{value:(_vm.historyData.is_finish),callback:function ($$v) {_vm.$set(_vm.historyData, "is_finish", $$v)},expression:"historyData.is_finish"}},[_vm._v("否")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"备注：","prop":"remark"}},[_c('el-input',{attrs:{"placeholder":"填写备注","type":"textarea","maxlength":"30","show-word-limit":""},model:{value:(_vm.historyData.remark),callback:function ($$v) {_vm.$set(_vm.historyData, "remark", $$v)},expression:"historyData.remark"}})],1)],1),_vm._v(" "),_c('div',{attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.dialogAddHistoryVisible = false}}},[_vm._v("关闭")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addOrEditPlanDo()}}},[_vm._v("确定")])],1)],1)],1)])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var project_detaillist = (esExports);
// CONCATENATED MODULE: ./src/views/project/detaillist.vue
function injectStyle (ssrContext) {
  __webpack_require__("9xj4")
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
  detaillist,
  project_detaillist,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_project_detaillist = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "W/2d":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.ptxtbox {\r\n  margin-bottom: 25px;\n}\n.dialog-plan-detail .el-form-item__label {\r\n  width: 110px;\n}\n.dialog-plan-detail .el-form-item__content {\r\n  margin-left: 110px;\n}\n.dialog-plan-detail .el-form-item {\r\n  margin-bottom: 25px;\n}\n.dialog-plan-detail .el-form-item em {\r\n  padding: 0 10px;\n}\n.dialog-plan-detail .el-form-item:last-child {\r\n  margin-bottom: 0;\n}\n.dialog-plan-detail .el-input__inner {\r\n  border: 1px #9db9fa solid;\r\n  color: #4b6eca;\r\n  width: 100%;\n}\n.dialog-plan-detail .el-form-item__error {\r\n  padding-top: 5px;\n}\n.dialog-plan-detail .el-select {\r\n  width: 100%;\n}\n.dialog-plan-detail .el-input {\r\n  width: auto;\n}\n.dialog-plan-detail .widhtss .el-input {\r\n  width: 100%;\n}\n.dialog-plan-detail .pinput input {\r\n  width: 55px;\r\n  margin: 0 3px;\r\n  padding: 0 5px;\r\n  height: 31px !important;\r\n  text-align: center;\n}\n.dialog-plan-detail .el-textarea {\r\n  width: 100%;\n}\n.dialog-plan-detail .el-textarea__inner {\r\n  width: 100%;\r\n  height: 60px;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\n}\r\n\r\n/* end detail */\n.app-page-container {\r\n  border-radius: 6px;\r\n  padding: 20px;\r\n  background: #fff;\n}\r\n", ""]);

// exports


/***/ })

});