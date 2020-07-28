webpackJsonp([6],{

/***/ "1RuJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/setmanage/users.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var users = ({
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
  mounted: function mounted() {
    document.querySelector(".el-menu-top #setmanage").classList.add("is-active");
  },
  created: function created() {
    this.getDataList();
  },

  methods: {
    getDataList: function getDataList() {
      var _this = this;

      var page = this.page_cur;
      this.request({
        url: "/user/getUserPages",
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-63c2886e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/setmanage/users.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-set-page"},[_c('el-row',{staticClass:"grid-menu",attrs:{"gutter":20}},[_c('el-col',{attrs:{"xs":8,"sm":8,"md":8,"lg":3,"xl":3}},[_c('div',{staticClass:"left-menu"},[_c('h5',[_vm._v("设置")]),_vm._v(" "),_c('el-menu',{staticClass:"el-menu-vertical-demo",attrs:{"router":""}},[_c('el-menu-item',{staticClass:"is-active"},[_c('router-link',{attrs:{"to":"/setmanage"}},[_vm._v("用户设置")])],1),_vm._v(" "),_c('el-menu-item',[_c('router-link',{attrs:{"to":"/setmanage/users"}},[_vm._v("人员设置")])],1),_vm._v(" "),_c('el-menu-item',[_c('router-link',{attrs:{"to":"/setmanage/site"}},[_vm._v("站点设置")])],1),_vm._v(" "),_c('el-menu-item',[_c('router-link',{attrs:{"to":"/setmanage/warning"}},[_vm._v("告警设置")])],1)],1)],1)]),_vm._v(" "),_c('el-col',{attrs:{"xs":16,"sm":16,"md":16,"lg":21,"xl":21}},[_c('div',{staticClass:"app-page-container ptopz"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"inline":true}},[_c('el-form-item',[_c('h3',{staticClass:"ttitles"},[_vm._v("人员列表")])]),_vm._v(" "),_c('div',{staticClass:"el-serach noborder"},[_c('el-button',{on:{"click":_vm.goAdd}},[_vm._v("添加")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"label":"序号","width":"80px"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v(_vm._s(scope.$index+(_vm.page_cur - 1) * _vm.page_size + 1))]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"用户名"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"姓名"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"role","label":"职位"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"phone","label":"手机号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"phone","label":"发布时间"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"130"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[_c('el-button',{staticClass:"btn-edit",attrs:{"size":"mini"},on:{"click":function($event){_vm.goDetail(scope.row)}}},[_vm._v("编辑")]),_vm._v(" "),_c('el-button',{staticClass:"btn-del",attrs:{"size":"mini"},on:{"click":function($event){_vm.goDetail(scope.row)}}},[_vm._v("删除")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.page_data_total,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.pageToFirst}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.pageToLast}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-users",attrs:{"width":"780px","title":this.diaLogTitle,"close-on-click-modal":false,"visible":_vm.diaLogFormVisible},on:{"update:visible":function($event){_vm.diaLogFormVisible=$event}}},[_c('el-form',{ref:"userRulesForm",staticClass:"el-form-custom",attrs:{"inline":true,"model":_vm.userData,"rules":_vm.userAddRules}},[_c('div',{staticClass:"el-form-item-inlinessddd"},[(this.userDialogTitle=='添加人员信息')?_c('el-form-item',{staticClass:"newitem",attrs:{"label":"用户名：","prop":"user_name"}},[_c('el-input',{attrs:{"show-word-limit":""},model:{value:(_vm.userData.user_name),callback:function ($$v) {_vm.$set(_vm.userData, "user_name", $$v)},expression:"userData.user_name"}})],1):_vm._e(),_vm._v(" "),_c('el-form-item',{staticClass:"newitem",attrs:{"label":"姓名：","prop":"name"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.name),callback:function ($$v) {_vm.$set(_vm.userData, "name", $$v)},expression:"userData.name"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"newitem",attrs:{"label":"公司名称：","prop":"company_id"}},[_c('el-select',{on:{"change":function($event){_vm.getDepartLists($event)}},model:{value:(_vm.userData.company_id),callback:function ($$v) {_vm.$set(_vm.userData, "company_id", $$v)},expression:"userData.company_id"}},_vm._l((this.companySelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),(this.userDialogTitle=='添加人员信息')?_c('el-form-item',{staticClass:"newitem",attrs:{"label":"密码：","prop":"password"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.password),callback:function ($$v) {_vm.$set(_vm.userData, "password", $$v)},expression:"userData.password"}})],1):_vm._e(),_vm._v(" "),(this.userDialogTitle=='修改人员信息')?_c('el-form-item',{staticClass:"newitem",attrs:{"label":"密码：","prop":"passwordEdit"}},[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"不修改密码请留空"},model:{value:(_vm.userData.passwordEdit),callback:function ($$v) {_vm.$set(_vm.userData, "passwordEdit", $$v)},expression:"userData.passwordEdit"}})],1):_vm._e(),_vm._v(" "),_c('el-form-item',{staticClass:"newitem",attrs:{"label":"部门名称：","prop":"depart_id"}},[_c('el-select',{on:{"change":function($event){_vm.getPostLists($event)}},model:{value:(_vm.userData.depart_id),callback:function ($$v) {_vm.$set(_vm.userData, "depart_id", $$v)},expression:"userData.depart_id"}},_vm._l((this.departSelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"newitem",attrs:{"label":"邮箱：","prop":"email"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.email),callback:function ($$v) {_vm.$set(_vm.userData, "email", $$v)},expression:"userData.email"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"newitem",attrs:{"label":"职位名称：","prop":"post_id"}},[_c('el-select',{model:{value:(_vm.userData.post_id),callback:function ($$v) {_vm.$set(_vm.userData, "post_id", $$v)},expression:"userData.post_id"}},_vm._l((this.postSelectList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"newitem",attrs:{"label":"手机号码：","prop":"phone"}},[_c('el-input',{attrs:{"autocomplete":"off"},model:{value:(_vm.userData.phone),callback:function ($$v) {_vm.$set(_vm.userData, "phone", $$v)},expression:"userData.phone"}})],1),_vm._v(" "),_c('el-form-item',{staticStyle:{"width":"100%"},attrs:{"label":"头像上传："}},[_c('el-upload',{ref:"uploadfive",staticClass:"avatar-uploader",attrs:{"action":_vm.uploadAction,"auto-upload":true,"on-exceed":_vm.uploadExceed,"before-upload":_vm.uploadBefore,"on-success":_vm.uploadSuccess,"show-file-list":false}},[(_vm.userData.avatar)?_c('img',{staticClass:"avatar",attrs:{"src":_vm.userData.avatar}}):_c('i',{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"用户角色：","prop":"sys_role"}},[_c('el-radio-group',{on:{"change":function($event){_vm.changeSysrole($event)}},model:{value:(_vm.userData.sys_role),callback:function ($$v) {_vm.$set(_vm.userData, "sys_role", $$v)},expression:"userData.sys_role"}},[_c('el-radio',{attrs:{"label":3}},[_vm._v("普通用户")]),_vm._v(" "),_c('el-radio',{attrs:{"label":1}},[_vm._v("管理员")]),_vm._v(" "),_c('el-radio',{attrs:{"label":2}},[_vm._v("业主方")])],1)],1),_vm._v(" "),_c('el-form-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.userData.sys_role==3),expression:"userData.sys_role==3"}],staticClass:"checkbox-group",attrs:{"label":"用户职责："}},[_c('el-checkbox-group',{on:{"change":_vm.selectUuserMenu},model:{value:(_vm.userData.menus),callback:function ($$v) {_vm.$set(_vm.userData, "menus", $$v)},expression:"userData.menus"}},_vm._l((_vm.userMenuList),function(item){return _c('el-checkbox',{key:item.id,attrs:{"label":item.id+''}},[_vm._v(_vm._s(item.name))])}))],1)],1)]),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.userDialogVisible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.addUser}},[_vm._v("确 定")])],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-msg",attrs:{"width":"700px","close-on-click-modal":false,"title":"消息详情","visible":_vm.diaLogShowFormVisible},on:{"update:visible":function($event){_vm.diaLogShowFormVisible=$event}}},[_c('el-form',{staticClass:"el-form-custom",attrs:{"model":_vm.formDataShow}},[_c('el-form-item',{attrs:{"label":"消息主题："}},[_c('el-input',{attrs:{"autocomplete":"off","readonly":""},model:{value:(_vm.formDataShow.title),callback:function ($$v) {_vm.$set(_vm.formDataShow, "title", $$v)},expression:"formDataShow.title"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"发送对象：","prop":"recept_type"}},[_c('el-checkbox-group',{model:{value:(_vm.formDataShow.recept_type),callback:function ($$v) {_vm.$set(_vm.formDataShow, "recept_type", $$v)},expression:"formDataShow.recept_type"}},[_c('el-checkbox',{attrs:{"label":1}},[_vm._v("施工队长")]),_vm._v(" "),_c('el-checkbox',{attrs:{"label":2}},[_vm._v("施工人员")]),_vm._v(" "),_c('el-checkbox',{attrs:{"label":3}},[_vm._v("行车")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"消息内容："}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea","readonly":""},model:{value:(_vm.formDataShow.description),callback:function ($$v) {_vm.$set(_vm.formDataShow, "description", $$v)},expression:"formDataShow.description"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"发送时间："}},[_c('el-input',{attrs:{"autocomplete":"off","readonly":""},model:{value:(_vm.formDataShow.create_time),callback:function ($$v) {_vm.$set(_vm.formDataShow, "create_time", $$v)},expression:"formDataShow.create_time"}})],1),_vm._v(" "),_c('div',{staticClass:"blank"})],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.diaLogShowFormVisible = false}}},[_vm._v("关闭")])],1)],1)],1)])],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var setmanage_users = (esExports);
// CONCATENATED MODULE: ./src/views/setmanage/users.vue
function injectStyle (ssrContext) {
  __webpack_require__("qTxI")
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
  users,
  setmanage_users,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_setmanage_users = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "B4M0":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.app-set-page {\r\n  padding: 20px;\n}\r\n\r\n", ""]);

// exports


/***/ }),

/***/ "qTxI":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("B4M0");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("4b93c6e8", content, true);

/***/ })

});