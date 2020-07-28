webpackJsonp([2],{

/***/ "j983":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.dialog-msg .el-textarea__inner {\r\n  border: 1px #9db9fa solid;\r\n  color: #338ff6;\r\n  height: 200px;\n}\n.dialog-msg .el-textarea {\r\n  width: 100% !important;\n}\n.dialog-msg .el-form-item__label {\r\n  width: 110px;\n}\n.dialog-msg .el-form-item__content {\r\n  margin-left: 110px;\n}\n.dialog-msg .el-form-item-inline .el-input--medium {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.dialog-msg .el-form-item-inline input {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.dialog-msg .el-select {\r\n  width: 100%;\n}\n.m-tags {\r\n  border: 1px #a9b5d1 solid;\r\n  margin-right: 10px;\r\n  padding: 2px 5px;\r\n  border-radius: 3px;\r\n  font-style: normal;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "mh3i":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("j983");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("44d0350a", content, true);

/***/ }),

/***/ "vzEL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/SiteManage/index.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SiteManage = ({
  data: function data() {
    return {
      diaLogFormVisible: false,
      diaLogTitle: "发送消息",
      diaLogShowFormVisible: false,
      formDataShow: {},
      formData: {
        recept_type: []
      },
      formRules: {
        title: [{
          required: true,
          message: "请输入消息主题2~20个字符",
          trigger: "blur"
        }, { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }, {
          pattern: /(^\S+).*(\S+$)/,
          message: "开始和结尾不能有空格",
          trigger: "blur"
        }],
        recept_type: [{
          required: true,
          message: "请选择发送对象",
          trigger: "change"
        }],
        description: [{
          required: true,
          message: "请输入消息内容2~200个字符",
          trigger: "blur"
        }, { min: 2, max: 200, message: "长度在2到200个字符", trigger: "blur" }, {
          pattern: /\s\S+|S+\s|\S/,
          message: "内容不能全部是空格",
          trigger: "blur"
        }]
      },
      page_cur: 1,
      page_data_total: 0,
      page_size: 20,
      page_total: 0,
      dataList: []
    };
  },
  created: function created() {
    this.getDataList();
  },

  methods: {
    getDataList: function getDataList() {
      var _this = this;

      var page = this.page_cur;
      // let recept_type = "我们";
      this.request({
        url: "/message/getMessagePages",
        method: "get",
        params: {
          page: page
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
    goAdd: function goAdd() {
      var _this2 = this;

      this.diaLogTitle = "发送消息";
      this.diaLogFormVisible = true;
      this.$nextTick(function () {
        _this2.$refs["formRulesRef"].clearValidate();
      });
      this.formData = {
        title: "",
        description: "",
        recept_type: []
      };
    },
    addEventDialog: function addEventDialog() {
      var _this3 = this;

      var that = this;
      this.$refs["formRulesRef"].validate(function (valid) {
        if (valid) {
          //this.formData.recept_type=JSON.stringify(that.formData.recept_type);
          var data = that.formData;
          _this3.request({
            url: "/message/addMessage",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this3.diaLogFormVisible = false;
              _this3.getDataList();
              _this3.$message({
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
    goDetail: function goDetail(rows) {
      this.diaLogShowFormVisible = true;
      this.formDataShow.title = rows.title;
      this.formDataShow.create_time = rows.create_time;
      var arr = JSON.parse("[" + rows.recept_type + "]");
      this.formDataShow.recept_type = arr;
      this.formDataShow.description = rows.description;
      console.log(rows + "-" + arr);
    },
    goDel: function goDel(id) {
      var _this4 = this;

      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this4.request({
          url: "/search/deleteStation",
          method: "post",
          data: { id: id }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            _this4.$message({
              type: "success",
              message: "删除成功！"
            });
            _this4.getDataList();
          }
        });
      }).catch(function () {});
    },
    getArrText: function getArrText(arrs) {
      var results = "";
      var str = JSON.parse("[" + arrs + "]");
      var arr = str.sort(function (a, b) {
        return a - b;
      });
      arr.map(function (item) {
        if (item == 1) {
          results += "<em class='m-tags'>施工队长</em>";
        } else if (item == 2) {
          results += "<em class='m-tags'>施工人员</em>";
        } else if (item == 3) {
          results += "<em class='m-tags'>行车</em>";
        }
      });
      return results;
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-85c618d0","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/SiteManage/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"message"}},[_c('div',{staticClass:"el-menu-topc"},[_c('el-menu',{attrs:{"mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_c('img',{attrs:{"src":__webpack_require__("xX+s")}}),_vm._v("消息管理\n      ")])])],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.goAdd}},[_vm._v("添加消息")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"label":"序号","width":"80px"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v(_vm._s(scope.$index+(_vm.page_cur - 1) * _vm.page_size + 1))]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"title","label":"消息主题"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"send_user","label":"值班调度人"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"recept_type","label":"发送对象"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',{domProps:{"innerHTML":_vm._s(_vm.getArrText(scope.row.recept_type))}})]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"发布时间"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"65"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.goDetail(scope.row)}}},[_vm._v("详情")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.page_data_total,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.pageToFirst}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.pageToLast}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-msg",attrs:{"width":"700px","close-on-click-modal":false,"title":this.diaLogTitle,"visible":_vm.diaLogFormVisible},on:{"update:visible":function($event){_vm.diaLogFormVisible=$event}}},[_c('el-form',{ref:"formRulesRef",staticClass:"el-form-custom",attrs:{"model":_vm.formData,"rules":_vm.formRules}},[_c('el-form-item',{attrs:{"label":"消息主题：","prop":"title"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20","show-word-limit":""},model:{value:(_vm.formData.title),callback:function ($$v) {_vm.$set(_vm.formData, "title", $$v)},expression:"formData.title"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"发送对象：","prop":"recept_type"}},[_c('el-checkbox-group',{model:{value:(_vm.formData.recept_type),callback:function ($$v) {_vm.$set(_vm.formData, "recept_type", $$v)},expression:"formData.recept_type"}},[_c('el-checkbox',{attrs:{"label":1}},[_vm._v("施工队长")]),_vm._v(" "),_c('el-checkbox',{attrs:{"label":2}},[_vm._v("施工人员")]),_vm._v(" "),_c('el-checkbox',{attrs:{"label":3}},[_vm._v("行车")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"消息内容：","prop":"description"}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea","maxlength":"200","show-word-limit":""},model:{value:(_vm.formData.description),callback:function ($$v) {_vm.$set(_vm.formData, "description", $$v)},expression:"formData.description"}})],1),_vm._v(" "),_c('div',{staticClass:"blank"})],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.diaLogFormVisible = false}}},[_vm._v("关闭")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addEventDialog()}}},[_vm._v("确定")])],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-msg",attrs:{"width":"700px","close-on-click-modal":false,"title":"消息详情","visible":_vm.diaLogShowFormVisible},on:{"update:visible":function($event){_vm.diaLogShowFormVisible=$event}}},[_c('el-form',{staticClass:"el-form-custom",attrs:{"model":_vm.formDataShow}},[_c('el-form-item',{attrs:{"label":"消息主题："}},[_c('el-input',{attrs:{"autocomplete":"off","readonly":""},model:{value:(_vm.formDataShow.title),callback:function ($$v) {_vm.$set(_vm.formDataShow, "title", $$v)},expression:"formDataShow.title"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"发送对象：","prop":"recept_type"}},[_c('el-checkbox-group',{model:{value:(_vm.formDataShow.recept_type),callback:function ($$v) {_vm.$set(_vm.formDataShow, "recept_type", $$v)},expression:"formDataShow.recept_type"}},[_c('el-checkbox',{attrs:{"label":1}},[_vm._v("施工队长")]),_vm._v(" "),_c('el-checkbox',{attrs:{"label":2}},[_vm._v("施工人员")]),_vm._v(" "),_c('el-checkbox',{attrs:{"label":3}},[_vm._v("行车")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"消息内容："}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea","readonly":""},model:{value:(_vm.formDataShow.description),callback:function ($$v) {_vm.$set(_vm.formDataShow, "description", $$v)},expression:"formDataShow.description"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"发送时间："}},[_c('el-input',{attrs:{"autocomplete":"off","readonly":""},model:{value:(_vm.formDataShow.create_time),callback:function ($$v) {_vm.$set(_vm.formDataShow, "create_time", $$v)},expression:"formDataShow.create_time"}})],1),_vm._v(" "),_c('div',{staticClass:"blank"})],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.diaLogShowFormVisible = false}}},[_vm._v("关闭")])],1)],1)],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_SiteManage = (esExports);
// CONCATENATED MODULE: ./src/views/SiteManage/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("mh3i")
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
  SiteManage,
  views_SiteManage,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_SiteManage = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "xX+s":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAiCAYAAADYmxC7AAACSElEQVRYhe2XzXHbMBCFUYJKUAk6GAR8MjtIZoJFeAs7iDsIO4g7oGeEBW2e1AHVgdWB0gHVAXOQQIPgLyjamskEM3sTgA+7bx9XhEK+YVIfA8DqFkGFKniUrYm9bglkggncNaBuDRQAVhT0/j/Uvwl1J/QjIYRQyOIAsGJSHcI4XZGRRUE/fRiUDRAAVlxiMgZECCE82oZ9l3GJCY+2YR0SEwp6PxmKAab3kD8wwDQArKhQJfv+8uUe8oehoEIVjXME7lre03pItmYCd5+iKQpZPCW7ZlHI4g+F4tE2dMtKpfpNhSqoUAUDTPk3/cMFa+l2MSBLf2GcrtySNsor9ZFCvulN3xJATOAfG2jKp4sKVbqZXRTK1pHbWYOPkfrYaTntC/R+SjCpDmaPOZhCvvF9kPHGfij5+rW3zh2LCdwxqQ5WlrxNlEl9HIQa8xZ3GSO0oCaXzo5BqADwbYpZXgz2JxWq/AyoGSJ/hzIO7bn/tDiUrYk7oR+997tTpwtFQZ8CoZ65xKQr+jJhtBjG6YqCPvlAdXrV6A+c1dVhtpv7ZKszS22o8e7rutR2dEIICYR6Hi/7wKzmdl8gsl99cfm4lm2xNicDLjEZhQJMp0LN6L53IB5l6wDwzadJRjV1TedM/RC3HiVU2ZoY5mdIn+yu88lQF1hDz1dAPfloaAJYsQDUOeUXHV0FZKLW1ywtWZPBElmqzzUavbZ09ly1RMyGsgezJYFqWcwZN0zt50ya41BZXP8pnDoGn+Ms8jBOV/57h4NH2fovy8Bhn7QMGdYAAAAASUVORK5CYII="

/***/ })

});