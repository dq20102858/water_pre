webpackJsonp([20],{

/***/ "Ahqo":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("PopD");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("8bSs")("e214373a", content, true);

/***/ }),

/***/ "PopD":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("BkJT")(false);
// imports


// module
exports.push([module.i, "\n.dialog-users .el-select {\r\n  width: 100%;\n}\n.dialog-users .avatar-uploader .el-upload {\r\n  border: 1px dashed #d9d9d9;\r\n  border-radius: 6px;\r\n  cursor: pointer;\r\n  position: relative;\r\n  overflow: hidden;\n}\n.dialog-users .avatar-uploader .el-upload:hover {\r\n  border-color: #409eff;\n}\n.dialog-users .avatar-uploader-icon {\r\n  font-size: 28px;\r\n  color: #8c939d;\r\n  width: 178px;\r\n  height: 178px;\r\n  line-height: 178px;\r\n  text-align: center;\n}\n.dialog-users .avatar {\r\n  width: 178px;\r\n  height: 178px;\r\n  display: block;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "ZLKJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.2@babel-loader/lib!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=script&index=0!./src/views/setmanage/index.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var setmanage = ({
  data: function data() {
    return {
      diaLogFormVisible: false,
      diaLogTitle: "添加人员信息",
      uploadAction: this.hostURL + "/upload/uploadFile",
      formData: {},
      passwordOrg: "",
      formRules: {
        username: [{
          required: true,
          message: "请输入用户名",
          trigger: "blur"
        }, {
          min: 2,
          max: 14,
          message: "请输入用户名长度在2到14个字符",
          trigger: "blur"
        }, {
          pattern: /^[A-Za-z0-9\_]*$/,
          message: "用户名只能是字母、数字及下划线",
          trigger: "blur"
        }],
        name: [{
          required: true,
          message: "请输入姓名",
          trigger: "blur"
        }, {
          min: 2,
          max: 10,
          message: "请输入姓名长度在2到10个字符",
          trigger: "blur"
        }, {
          pattern: /^[\u4e00-\u9fa5A-Za-z0-9\_]*$/,
          message: "姓名只能是汉字、字母、数字及下划线",
          trigger: "blur"
        }],
        password: [{
          required: true,
          message: "请输入密码",
          trigger: "blur"
        }, {
          min: 6,
          max: 14,
          message: "请输入密码长度6到14个字符",
          trigger: "blur"
        }, {
          pattern: /^[0-9a-zA-Z_]{1,}$/,
          message: "密码只能是数字、字母、下划线",
          trigger: "blur"
        }],
        passwordEdit: [{
          min: 6,
          max: 14,
          message: "请输入密码长度6到14个字符",
          trigger: "blur"
        }, {
          pattern: /^[0-9a-zA-Z_]{1,}$/,
          message: "密码只能是数字、字母、下划线",
          trigger: "blur"
        }],
        phone: [{
          required: true,
          message: "请输入手机号码",
          trigger: "blur"
        }, {
          pattern: /^1[34578]\d{9}$/,
          message: "请输入正确的手机号码",
          trigger: "blur"
        }],
        role_id: [{
          required: true,
          message: "请选择职位",
          trigger: "change"
        }]
      },
      page_cur: 1,
      page_data_total: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      searchKeyword: "",
      searchRole: ""
    };
  },
  mounted: function mounted() {
    //document.querySelector("#setmanage").classList.add("is_active");
  },
  created: function created() {
    this.getDataList();
  },

  methods: {
    getDataList: function getDataList() {
      var _this = this;

      var page = this.page_cur;
      var name = this.searchKeyword;
      var role_id = this.searchRole;
      this.request({
        url: "/user/getUserPages",
        method: "get",
        params: {
          page: page,
          name: name,
          role_id: role_id
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
    searchKeywordEvent: function searchKeywordEvent() {
      this.page_cur = 1;
      this.getDataList();
    },
    searchRoleEvent: function searchRoleEvent(e) {
      this.page_cur = 1;
      this.getDataList();
    },
    addShowDialog: function addShowDialog() {
      var _this2 = this;

      this.diaLogTitle = "添加人员信息";
      this.diaLogFormVisible = true;
      this.$nextTick(function () {
        _this2.$refs["formRulesRef"].clearValidate();
      });
      this.formData = {
        // title: "",
        // description: "",
        // recept_type: []
      };
    },
    userAddEventDialog: function userAddEventDialog() {
      var _this3 = this;

      var that = this;
      this.$refs["formRulesRef"].validate(function (valid) {
        if (valid) {
          var data = that.formData;
          var url = "/user/addUser";
          var baseid = _this3.formData.id;
          if (typeof baseid != "undefined") {
            url = "/user/editUser";
            var pwdEdit = _this3.formData.passwordEdit;
            if (pwdEdit != "" && typeof pwdEdit != "undefined") {
              _this3.formData.password = pwdEdit;
            } else {
              _this3.formData.password = "";
            }
          }
          _this3.request({
            url: url,
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
    userEditEvent: function userEditEvent(id) {
      var _this4 = this;

      this.diaLogFormVisible = true;
      this.diaLogTitle = "修改人员信息";
      this.$nextTick(function () {
        _this4.$refs["formRulesRef"].clearValidate();
      });
      this.request({
        url: "/user/getUserDetail",
        method: "get",
        params: { id: id }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this4.formData = data.data;
          //console.log(this.userData.menus);
          _this4.passwordOrg = data.data.password;
        }
      });
    },
    userDeleteEvent: function userDeleteEvent(id) {
      var _this5 = this;

      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      }).then(function () {
        _this5.request({
          url: "/user/delUser",
          method: "post",
          data: { id: id }
        }).then(function (res) {
          var data = res.data;
          if (data.status == 1) {
            if (_this5.dataList.length == 1) {
              _this5.page_cur = _this5.page_cur < 1 ? 1 : _this5.page_cur - 1;
              _this5.getDataList();
            } else {
              _this5.getDataList();
            }
            _this5.$message({
              type: "success",
              message: "删除成功！"
            });
          }
        });
      }).catch(function () {});
    },

    //上传图片
    uploadExceed: function uploadExceed() {
      this.$message({
        type: "warning",
        message: "\u6700\u591A\u53EF\u4EE5\u4E0A\u4F201\u5F20\u56FE\u7247"
      });
    },
    uploadSuccess: function uploadSuccess(res, file) {
      console.log("图上传成功", res);
      this.$set(this.formData, "avatar", res.data.url);
    },
    uploadBefore: function uploadBefore(file) {
      var filename = file.name.substring(file.name.lastIndexOf(".") + 1);
      var extension = filename === "GIF" || filename === "gif" || filename === "jpeg" || filename === "jpg" || filename === "JPG" || filename === "png" || filename === "PNG";
      var isLtM = file.size / 1024 / 1024 < 2;
      if (!extension) {
        this.$message({
          message: "上传图片只能是 jpg  png  gif 格式",
          type: "error"
        });
        return false;
      }
      if (!isLtM) {
        this.$message({
          message: "上传图片大小不能超过 2MB",
          type: "error"
        });
        return false;
      }
      return extension || isLtM;
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/_vue-loader@13.5.0@vue-loader/lib/template-compiler?{"id":"data-v-1285e3c4","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=template&index=0!./src/views/setmanage/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-set-page"},[_c('div',{staticClass:"app-page-rows"},[_c('div',{staticClass:"app-page-rows-left"},[_c('div',{staticClass:"left-menu-area"},[_c('h5',{staticClass:"atitle"},[_vm._v("系统设置")]),_vm._v(" "),_c('el-menu',{attrs:{"router":""}},[_c('el-menu-item',{staticClass:"active"},[_c('router-link',{attrs:{"to":"/setmanage"}},[_vm._v("人员管理")])],1),_vm._v(" "),_c('el-menu-item',[_c('router-link',{attrs:{"to":"/setmanage/site"}},[_vm._v("站点设置")])],1),_vm._v(" "),_c('el-menu-item',[_c('router-link',{attrs:{"to":"/setmanage/warning"}},[_vm._v("告警设置")])],1)],1)],1)]),_vm._v(" "),_c('div',{staticClass:"app-page-rows-right"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',{staticClass:"el-form-item"},[_c('el-input',{staticClass:"input-with-select",attrs:{"prefix-icon":"el-icon-search","placeholder":"请输入人员姓名","clearable":""},on:{"input":_vm.searchKeywordEvent},model:{value:(_vm.searchKeyword),callback:function ($$v) {_vm.searchKeyword=$$v},expression:"searchKeyword"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item el-select-dorps"},[_c('el-select',{staticStyle:{"width":"120px"},attrs:{"placeholder":"全部职位"},on:{"change":function($event){_vm.searchRoleEvent($event)}},model:{value:(_vm.searchRole),callback:function ($$v) {_vm.searchRole=$$v},expression:"searchRole"}},[_c('el-option',{attrs:{"label":"全部职位","value":"0"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"管理员","value":"1"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"维修人员","value":"2"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"巡检人员","value":"3"}}),_vm._v(" "),_c('el-option',{attrs:{"label":"分析人员","value":"4"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"el-serach noborder"},[_c('el-button',{on:{"click":_vm.addShowDialog}},[_vm._v("添加")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"label":"序号","width":"80px"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v(_vm._s(scope.$index+(_vm.page_cur - 1) * _vm.page_size + 1))]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"username","label":"用户名"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"人员姓名"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"role","label":"人员职位"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"phone","label":"手机号码"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","label":"添加时间"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"125"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-edit",attrs:{"size":"mini"},on:{"click":function($event){_vm.userEditEvent(scope.row.id)}}},[_vm._v("编辑")]),_vm._v(" "),_c('el-button',{staticClass:"btn-del",attrs:{"size":"mini"},on:{"click":function($event){_vm.userDeleteEvent(scope.row.id)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.page_data_total,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.pageToFirst}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.pageToLast}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1)])])]),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-users",attrs:{"width":"680px","title":this.diaLogTitle,"close-on-click-modal":false,"visible":_vm.diaLogFormVisible},on:{"update:visible":function($event){_vm.diaLogFormVisible=$event}}},[_c('el-form',{ref:"formRulesRef",staticClass:"el-form-custom",attrs:{"model":_vm.formData,"rules":_vm.formRules,"label-width":"110px"}},[_c('el-form-item',{attrs:{"label":"人员姓名：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.formData.name),callback:function ($$v) {_vm.$set(_vm.formData, "name", $$v)},expression:"formData.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"人员职位：","prop":"role_id"}},[_c('el-select',{attrs:{"placeholder":"请选择职位"},model:{value:(_vm.formData.role_id),callback:function ($$v) {_vm.$set(_vm.formData, "role_id", $$v)},expression:"formData.role_id"}},[_c('el-option',{attrs:{"label":"管理员","value":1}}),_vm._v(" "),_c('el-option',{attrs:{"label":"维修人员","value":2}}),_vm._v(" "),_c('el-option',{attrs:{"label":"巡检人员","value":3}}),_vm._v(" "),_c('el-option',{attrs:{"label":"分析人员","value":4}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"手机号码：","prop":"phone"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.formData.phone),callback:function ($$v) {_vm.$set(_vm.formData, "phone", $$v)},expression:"formData.phone"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"用户名：","prop":"username"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.formData.username),callback:function ($$v) {_vm.$set(_vm.formData, "username", $$v)},expression:"formData.username"}})],1),_vm._v(" "),(this.diaLogTitle=='添加人员信息')?_c('el-form-item',{attrs:{"label":"密码：","prop":"password"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.formData.password),callback:function ($$v) {_vm.$set(_vm.formData, "password", $$v)},expression:"formData.password"}})],1):_vm._e(),_vm._v(" "),(this.diaLogTitle=='修改人员信息')?_c('el-form-item',{attrs:{"label":"密码：","prop":"passwordEdit"}},[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"不修改密码请留空"},model:{value:(_vm.formData.passwordEdit),callback:function ($$v) {_vm.$set(_vm.formData, "passwordEdit", $$v)},expression:"formData.passwordEdit"}})],1):_vm._e(),_vm._v(" "),_c('el-form-item',{staticStyle:{"width":"100%"},attrs:{"label":"头像上传："}},[_c('el-upload',{ref:"uploadfive",staticClass:"avatar-uploader",attrs:{"action":_vm.uploadAction,"auto-upload":true,"on-exceed":_vm.uploadExceed,"before-upload":_vm.uploadBefore,"on-success":_vm.uploadSuccess,"show-file-list":false}},[(_vm.formData.avatar)?_c('img',{staticClass:"avatar",attrs:{"src":_vm.formData.avatar,"title":"选择图片"}}):_c('i',{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.diaLogFormVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.userAddEventDialog}},[_vm._v("确 定")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_setmanage = (esExports);
// CONCATENATED MODULE: ./src/views/setmanage/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("Ahqo")
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
  setmanage,
  views_setmanage,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_setmanage = __webpack_exports__["default"] = (Component.exports);


/***/ })

});