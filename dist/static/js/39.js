webpackJsonp([39],{

/***/ "FIn9":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("TDUo");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("c23b51fa", content, true);

/***/ }),

/***/ "TDUo":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.dialog-station .el-textarea__inner {\r\n  border: 1px #9db9fa solid;\r\n  color: #4b6eca;\r\n  height: 100px;\n}\n.dialog-station .el-textarea {\r\n  width: 100% !important;\n}\n.dialog-station .el-form-item__label {\r\n  width: 110px;\n}\n.dialog-station .el-form-item__content {\r\n  margin-left: 110px;\n}\n.dialog-station .el-form-item-inline .el-input--medium {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.dialog-station .el-form-item-inline input {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.dialog-station .el-select {\r\n  width: 100%;\n}\n.el-form-item-inline input {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "Yz66":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/set/tunnel.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var tunnel = ({
  data: function data() {
    return {
      diaLogFormVisible: false,
      diaLogTitle: "添加信息",
      formData: { type: 1 },
      formRules: {
        name: [{
          required: true,
          message: "请输入名称2~20个字符",
          trigger: "blur"
        }, { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }, { pattern: /(^\S+).*(\S+$)/, message: "开始和结尾不能有空格", trigger: "blur" }],
        line_type: [{ required: true, message: "请选择线别", trigger: "change" }],
        start_flag: [{
          required: true,
          message: "请输入开始公里",
          trigger: "blur"
        }, {
          pattern: /^\d{1,3}$/,
          message: "请输入1-3位正整数",
          trigger: "blur"
        }],
        start_length: [{
          required: true,
          message: "请输入开始米",
          trigger: "blur"
        }, {
          pattern: /^\d{1,3}$/,
          message: "请输入1-3位正整数",
          trigger: "blur"
        }],
        end_flag: [{
          required: true,
          message: "请输入结束公里",
          trigger: "blur"
        }, {
          pattern: /^\d{1,3}$/,
          message: "请输入1-3位正整数",
          trigger: "blur"
        }],
        end_length: [{
          required: true,
          message: "请输入结束米",
          trigger: "blur"
        }, {
          pattern: /^\d{1,3}$/,
          message: "请输入1-3位正整数",
          trigger: "blur"
        }]
      },
      page_cur: 1,
      page_data_total: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      searchName: "",
      lineTypeStart: "",
      lineTypeEnd: "",
      lineTypeDes: "",
      lineTypeList: []
    };
  },
  mounted: function mounted() {
    document.querySelector("#app-menu-items #menu_set").classList.add("is-active");
  },
  created: function created() {
    this.getLineTypeLists();
    this.getDataList();
  },

  methods: {
    getDataList: function getDataList() {
      var _this = this;

      var page = this.page_cur;
      var name = this.searchName;
      var road_type = 2; //1桥，2隧道，3坡度，4防区，5限速
      this.request({
        url: "/search/getRoadDevicePages",
        method: "get",
        params: {
          page: page,
          name: name,
          road_type: road_type
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this.dataList = data.data.data;
          _this.page_cur = parseInt(data.data.current_page);
          _this.page_total = data.data.last_page;
          _this.page_data_total = data.data.total;
          _this.page_size = data.data.per_page;
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
    searchEvent: function searchEvent() {
      this.page_cur = 1;
      this.getDataList();
    },
    getLineTypeLists: function getLineTypeLists() {
      var _this2 = this;

      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          var lineJson = data.data;
          var newArr = new Array();
          for (var i = 0; i < lineJson.length; i++) {
            var j = lineJson[i];
            if (j.id != 3 && j.id != 4) {
              newArr.push(j);
            }
          }
          _this2.lineTypeList = newArr;
        }
      });
    },
    selectLineType: function selectLineType(value) {
      var that = this;
      this.lineTypeList.map(function (item, index) {
        if (item.id == value) {
          that.lineTypeDes = "里程范围：" + item.tip;
          that.lineTypeStart = item.start;
          that.lineTypeEnd = item.end;
        }
      });
      console.log(this.lineTypeDes);
    },
    goAdd: function goAdd() {
      var _this3 = this;

      this.formData = { type: 1 };
      this.diaLogTitle = "添加信息";
      this.diaLogFormVisible = true;
      this.$nextTick(function () {
        _this3.$refs["formRules"].clearValidate();
      });
      this.lineTypeDes = "";
    },
    addOrEditDialog: function addOrEditDialog() {
      var _this4 = this;

      var that = this;
      this.$refs["formRules"].validate(function (valid) {
        if (valid) {
          var data = that.formData;
          _this4.formData.road_type = 2; //1桥，2隧道，3坡度，4防区，5限速
          // //里程判断
          var startTotal = parseInt(data.start_flag * 1000) + parseInt(data.start_length);
          var endTotal = parseInt(data.end_flag * 1000) + parseInt(data.end_length);
          var lineStartTotal = that.lineTypeStart * 1000;
          var lineEndTotal = that.lineTypeEnd * 1000;
          if (parseInt(startTotal) < parseInt(lineStartTotal)) {
            _this4.$message.error("输入的开始里程不在里程范围内");
            return false;
          }
          if (parseInt(endTotal) > parseInt(lineEndTotal)) {
            _this4.$message.error("输入的结束里程不在里程范围内");
            return false;
          }
          if (parseInt(endTotal) < parseInt(startTotal)) {
            _this4.$message.error("输入的结束里程不能小于结束里程");
            return false;
          }
          _this4.request({
            url: "/search/addOrEditRoadDevice",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this4.diaLogFormVisible = false;
              _this4.formData.name = "";
              _this4.getDataList();
              _this4.$message({
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
    goEdit: function goEdit(id) {
      var _this5 = this;

      this.diaLogTitle = "修改信息";
      this.diaLogFormVisible = true;
      this.$nextTick(function () {
        _this5.$refs["formRules"].clearValidate();
      });
      this.request({
        url: "/search/getRoadDeviceDetail",
        method: "get",
        params: { id: id }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this5.formData = data.data;
          _this5.lineTypeList.map(function (item, index) {
            if (item.id == data.data.line_type) {
              _this5.lineTypeDes = "里程范围：" + item.tip;
              _this5.lineTypeStart = item.start;
              _this5.lineTypeEnd = item.end;
            }
          });
        }
      });
    },
    goDel: function goDel(id) {
      var _this6 = this;

      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this6.request({
          url: "/search/deleteRoadDevice",
          method: "post",
          data: { id: id }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            _this6.$message({
              type: "success",
              message: "删除成功！"
            });
            _this6.getDataList();
          }
        });
      }).catch(function () {});
    },
    changeStarttime: function changeStarttime() {
      if (this.workData.start_time >= this.workData.end_time) {
        this.$message.error("开始日期不能大于结束日期");
        this.workData.start_time = "";
      }
    },
    changeEndtime: function changeEndtime() {
      var start_time = new Date(this.workData.start_time);
      var end_time = new Date(this.workData.end_time);
      //alert(start_time);
      //alert(end_time);
      if (end_time <= start_time) {
        this.$message.error("结束日期不能小于开始日期");
        this.workData.end_time = "";
      }
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-085a5bc2","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/set/tunnel.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"monitor"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","default-active":"tunnel","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("qyEk")}}),_vm._v("设置\n      ")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"set"}},[_vm._v("站点设置")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"speed"}},[_vm._v("限速设置")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"alerts"}},[_vm._v("防区设置")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"bridge"}},[_vm._v("桥设置")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"tunnel"},on:{"click":_vm.pageToFirst}},[_vm._v("隧道设置")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"slope"}},[_vm._v("坡度设置")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"process"}},[_vm._v("项目工序")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.goAdd}},[_vm._v("添加隧道")])],1),_vm._v(" "),_c('div',{staticClass:"el-serach"},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"30","placeholder":"请输入名称查询","clearable":""},model:{value:(_vm.searchName),callback:function ($$v) {_vm.searchName=$$v},expression:"searchName"}}),_vm._v(" "),_c('el-button',{on:{"click":_vm.searchEvent}},[_vm._v("查询")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"label":"序号"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',[_vm._v(_vm._s(scope.$index+(_vm.page_cur - 1) * _vm.page_size + 1))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"line","label":"线别"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"type","label":"类型"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v(_vm._s(scope.row.type==1?"无道砟":"有道砟"))]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"起始里程"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('b',[_vm._v("DK")]),_vm._v("\n              "+_vm._s(scope.row.start_flag)+" + "+_vm._s(scope.row.start_length)+"\n            ")]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"结束里程"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('b',[_vm._v("DK")]),_vm._v("\n              "+_vm._s(scope.row.end_flag)+" + "+_vm._s(scope.row.end_length)+"\n            ")]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"创建时间"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"120"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.goEdit(scope.row.id)}}},[_vm._v("修改")]),_vm._v(" "),_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.goDel(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.page_data_total,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.pageToFirst}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.pageToLast}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-station",attrs:{"width":"700px","close-on-click-modal":false,"title":this.diaLogTitle,"visible":_vm.diaLogFormVisible},on:{"update:visible":function($event){_vm.diaLogFormVisible=$event}}},[_c('el-form',{ref:"formRules",staticClass:"el-form-custom",attrs:{"model":_vm.formData,"rules":_vm.formRules}},[_c('el-form-item',{attrs:{"label":"名称：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20","show-word-limit":""},model:{value:(_vm.formData.name),callback:function ($$v) {_vm.$set(_vm.formData, "name", $$v)},expression:"formData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"线别：","prop":"line_type"}},[_c('el-select',{attrs:{"placeholder":"请选择"},on:{"change":function($event){_vm.selectLineType($event)}},model:{value:(_vm.formData.line_type),callback:function ($$v) {_vm.$set(_vm.formData, "line_type", $$v)},expression:"formData.line_type"}},_vm._l((_vm.lineTypeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})})),_vm._v(" "),_c('div',{staticClass:"el-form-item__error"},[_vm._v(_vm._s(_vm.lineTypeDes))])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"类型："}},[_c('el-select',{model:{value:(_vm.formData.type),callback:function ($$v) {_vm.$set(_vm.formData, "type", $$v)},expression:"formData.type"}},[_c('el-option',{attrs:{"label":"无道砟","value":1}}),_vm._v(" "),_c('el-option',{attrs:{"label":"有道砟","value":2}})],1)],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-dk is-required",attrs:{"label":"开始里程："}},[_c('el-form-item',{attrs:{"prop":"start_flag"}},[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"公里","maxlength":"3"},model:{value:(_vm.formData.start_flag),callback:function ($$v) {_vm.$set(_vm.formData, "start_flag", $$v)},expression:"formData.start_flag"}},[_c('template',{slot:"prepend"},[_vm._v("DK")])],2)],1),_vm._v(" "),_c('el-form-item',{staticClass:"errorss",attrs:{"prop":"start_length"}},[_c('b',[_vm._v("+")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"米","maxlength":"3"},model:{value:(_vm.formData.start_length),callback:function ($$v) {_vm.$set(_vm.formData, "start_length", $$v)},expression:"formData.start_length"}})],1)],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-dk is-required",attrs:{"label":"结束里程："}},[_c('el-form-item',{attrs:{"prop":"end_flag"}},[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"公里","maxlength":"3"},model:{value:(_vm.formData.end_flag),callback:function ($$v) {_vm.$set(_vm.formData, "end_flag", $$v)},expression:"formData.end_flag"}},[_c('template',{slot:"prepend"},[_vm._v("DK")])],2)],1),_vm._v(" "),_c('el-form-item',{staticClass:"errorss",attrs:{"prop":"end_length"}},[_c('b',[_vm._v("+")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"米","maxlength":"3"},model:{value:(_vm.formData.end_length),callback:function ($$v) {_vm.$set(_vm.formData, "end_length", $$v)},expression:"formData.end_length"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"blank"})],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.diaLogFormVisible = false}}},[_vm._v("关闭")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addOrEditDialog()}}},[_vm._v("确定")])],1)],1)],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var set_tunnel = (esExports);
// CONCATENATED MODULE: ./src/views/set/tunnel.vue
function injectStyle (ssrContext) {
  __webpack_require__("FIn9")
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
  tunnel,
  set_tunnel,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_set_tunnel = __webpack_exports__["default"] = (Component.exports);


/***/ })

});