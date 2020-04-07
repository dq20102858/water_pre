webpackJsonp([8],{

/***/ "43N1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/apply/applydetail.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var applydetail = ({
  data: function data() {
    return {
      isShow: false,
      dataInfo: [],
      carUse: []
    };
  },

  props: {
    iframeData: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    layerid: {
      type: String,
      default: ""
    }
  },
  created: function created() {
    this.getDetail();
  },

  methods: {
    getDetail: function getDetail() {
      var _this = this;

      this.$layer.title = "dsfds";
      this.request({
        url: "/apply/getApplyDetail",
        method: "get",
        params: { id: this.iframeData.id }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this.dataInfo = data.data;
          // let car=data.data.area_or_car;
          _this.carUse = data.data.area_or_car[0].car_use;
          // console.log(JSON.stringify(this.carUse));
        }
      });
    },
    isCancel: function isCancel() {
      this.$layer.close(this.layerid);
    },
    funIsEmpty: function funIsEmpty(item) {
      if (item == "") {
        return "暂无";
      } else {
        return item;
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7bf3c0c1","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/apply/applydetail.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app-apply"}},[_c('div',{staticClass:"app-page"},[(_vm.dataInfo.type=='A1' || _vm.dataInfo.type=='A2')?_c('div',{staticClass:"app-apply-tempone"},[_c('div',{staticClass:"vtable"},[_c('table',[_c('tbody',[_c('tr',[_vm._m(0),_vm._v(" "),_c('td',{staticClass:"auto-style2 clblue",attrs:{"rowspan":"2"}},[_vm._v(_vm._s(_vm.dataInfo.number))]),_vm._v(" "),_c('td',{staticClass:"clblue",attrs:{"rowspan":"2"}},[_vm._v("施工单位:"+_vm._s(_vm.dataInfo.company))]),_vm._v(" "),_c('td',[_vm._v("\n                是否需要动车：\n                "),(_vm.dataInfo.is_need_car==0)?_c('b',[_vm._v("否")]):_vm._e(),_vm._v(" "),(_vm.dataInfo.is_need_car==1)?_c('b',[_vm._v("是")]):_vm._e()]),_vm._v(" "),_c('td',[_vm._v("\n                是否需要动火：\n                "),(_vm.dataInfo.is_need_fire==0)?_c('b',[_vm._v("否")]):_vm._e(),_vm._v(" "),(_vm.dataInfo.is_need_fire==1)?_c('b',[_vm._v("是")]):_vm._e()])]),_vm._v(" "),_c('tr',[_c('td',[_vm._v("\n                是否需要帮助：\n                "),(_vm.dataInfo.is_need_help==0)?_c('b',[_vm._v("否")]):_vm._e(),_vm._v(" "),(_vm.dataInfo.is_need_help==1)?_c('b',[_vm._v("是")]):_vm._e()]),_vm._v(" "),_c('td',[_vm._v("\n                是否需要断电：\n                "),(_vm.dataInfo.is_need_break_ele==0)?_c('b',[_vm._v("否")]):_vm._e(),_vm._v(" "),(_vm.dataInfo.is_need_break_ele==1)?_c('b',[_vm._v("是")]):_vm._e()])]),_vm._v(" "),_c('tr',[_vm._m(1),_vm._v(" "),_c('td',{staticClass:"clblue"},[_vm._v(_vm._s(_vm.dataInfo.command_num))]),_vm._v(" "),_c('td',{attrs:{"colspan":"2"}},[_c('div',[_vm._v("\n                  联系人：\n                  "),_c('span',{staticClass:"clblue",staticStyle:{"width":"40%","display":"inline-block"}},[_vm._v(_vm._s(_vm.dataInfo.contact))]),_vm._v("\n                  联系电话：\n                  "),_c('span',{staticClass:"clblue"},[_vm._v(_vm._s(_vm.dataInfo.phone))])]),_vm._v(" "),_vm._l((_vm.dataInfo.holder),function(item){return _c('div',{key:item.id},[_vm._v("\n                  持证人：\n                  "),_c('span',{staticClass:"clblue",staticStyle:{"width":"40%","display":"inline-block"}},[_vm._v(_vm._s(item.name))]),_vm._v("\n                  联系电话：\n                  "),_c('span',{staticClass:"clblue"},[_vm._v(_vm._s(item.phone))])])}),_vm._v(" "),_c('div',[_vm._v("\n                  负责人：\n                  "),_c('span',{staticClass:"clblue",staticStyle:{"width":"40%","display":"inline-block","overflow":"hidden","white-space":"nowrap","vertical-align":"middle"}},[_vm._v(_vm._s(_vm.dataInfo.p_in_charge))]),_vm._v("\n                  联系电话：\n                  "),_c('span',{staticClass:"clblue"},[_vm._v(_vm._s(_vm.dataInfo.p_in_charge_phone))])])],2),_vm._v(" "),_c('td',[_vm._v("\n                人数：\n                "),_c('span',{staticClass:"clblue"},[_vm._v(_vm._s(_vm.dataInfo.worker_num)+"人")])])]),_vm._v(" "),_c('tr',[_vm._m(2),_vm._v(" "),_c('td',{staticStyle:{"padding":"0"},attrs:{"colspan":"4"}},[_c('table',{staticClass:"innertable"},[_vm._m(3),_vm._v(" "),_vm._l((_vm.dataInfo.area_or_car),function(areas){return _c('tr',{key:areas.id},[_c('td',[_vm._v(_vm._s(areas.start_station_name)+" DK"+_vm._s(areas.start_flag)+" + "+_vm._s(areas.start_length))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(areas.end_station_name)+" DK"+_vm._s(areas.end_flag)+" + "+_vm._s(areas.end_length))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(areas.line_type_name))]),_vm._v(" "),_c('td',_vm._l((areas.car_use),function(item){return _c('span',{key:item.id,staticStyle:{"margin-right":"10px"}},[_vm._v(_vm._s(item.car_type))])})),_vm._v(" "),_c('td',[_vm._v(_vm._s(areas.start_time)+" ~ "+_vm._s(areas.end_time))])])}),_vm._v(" "),_vm._m(4),_vm._v(" "),_vm._m(5),_vm._v(" "),_vm._m(6)],2)])]),_vm._v(" "),_c('tr',[_vm._m(7),_vm._v(" "),_c('td',{attrs:{"colspan":"4"}},[_c('div',{staticClass:"textoverflow clblue"},[_vm._v(_vm._s(_vm.dataInfo.plan_route))])])]),_vm._v(" "),_c('tr',[_vm._m(8),_vm._v(" "),_c('td',{attrs:{"colspan":"4"}},[_c('div',{staticClass:"textoverflow clblue"},[_vm._v(_vm._s(_vm.dataInfo.description))])])]),_vm._v(" "),_c('tr',[_vm._m(9),_vm._v(" "),_c('td',{staticStyle:{"padding":"0"},attrs:{"colspan":"4"}},[_c('table',{staticClass:"innertable"},[_vm._m(10),_vm._v(" "),_vm._l((_vm.dataInfo.area_or_car),function(areas){return _c('tbody',{key:areas.id},_vm._l((areas.car_use),function(item){return _c('tr',{key:item.id},[_c('td',[_vm._v(_vm._s(item.car_type))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(item.car_number))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(item.car_weight))])])}))}),_vm._v(" "),_vm._m(11),_vm._v(" "),_vm._m(12),_vm._v(" "),_vm._m(13)],2)])]),_vm._v(" "),_c('tr',[_vm._m(14),_vm._v(" "),_c('td',{attrs:{"colspan":"4"}},[_c('div',{staticClass:"textoverflow clblue"},[_vm._v(_vm._s(_vm.funIsEmpty(_vm.dataInfo.attention)))])])]),_vm._v(" "),_c('tr',[_vm._m(15),_vm._v(" "),_c('td',{attrs:{"colspan":"2"}},[_c('div',{staticClass:"textoverflow clblue"},[_vm._v(_vm._s(_vm.funIsEmpty(_vm.dataInfo.other)))])]),_vm._v(" "),_c('td',{attrs:{"colspan":"2"}},[_vm._v("监理确认并签字："+_vm._s(_vm.funIsEmpty(_vm.dataInfo.supervisor)))])]),_vm._v(" "),_c('tr',[_vm._m(16),_vm._v(" "),_c('td',{staticStyle:{"width":"200px"}},[_vm._v("审批人："+_vm._s(_vm.dataInfo.approver))]),_vm._v(" "),_c('td',{staticStyle:{"width":"200px"}},[_vm._v("销点人:"+_vm._s(_vm.dataInfo.logout))]),_vm._v(" "),_c('td',{staticStyle:{"width":"200px"}},[_vm._v("注销人："+_vm._s(_vm.dataInfo.logoff))])]),_vm._v(" "),_c('tr',[_c('td',[_vm._v("审批时间："+_vm._s(_vm.dataInfo.approve_time))]),_vm._v(" "),_c('td',[_vm._v("销点时间："+_vm._s(_vm.dataInfo.logout_time))]),_vm._v(" "),_c('td',[_vm._v("注销时间："+_vm._s(_vm.dataInfo.logoff_time))])])])])])]):_c('div',{staticClass:"app-apply-detail"},[_c('el-form',{staticStyle:{"margin-left":"95px"},attrs:{"inline":true}},[_c('el-form-item',{attrs:{"label":"作业编号"}},[_c('span',{staticClass:"input"},[_vm._v(_vm._s(_vm.dataInfo.number))])]),_vm._v(" "),_c('el-form-item',{attrs:{"label":"作业令号"}},[_c('span',{staticClass:"input"},[_vm._v(_vm._s(_vm.dataInfo.command_num))])])],1),_vm._v(" "),_c('el-timeline',[_c('el-timeline-item',{attrs:{"timestamp":"申请","placement":"top","type":"warning ","color":"#ff5c75","size":"large"}},[_c('div',{staticClass:"onebox"},[_c('div',{staticClass:"item"},[_c('label',{staticClass:"labels"},[_vm._v("兹申请允许持证人（主站）")]),_vm._v(" "),_c('span',{staticClass:"input"},[_vm._v(_vm._s(_vm.dataInfo.main_apply_user))]),_vm._v(" "),_c('label',{staticClass:"labels"},[_vm._v("辅站及负责人")]),_vm._v(" "),_c('span',{staticClass:"input"},[_vm._v(_vm._s(_vm.dataInfo.sub_apply_user))])]),_vm._v(" "),_c('div',{staticClass:"item"},[_c('label',{staticClass:"labels"},[_vm._v("单位：")]),_vm._v(" "),_c('span',{staticClass:"input",staticStyle:{"width":"550px"}},[_vm._v(_vm._s(_vm.dataInfo.company))])]),_vm._v(" "),_c('div',{staticClass:"item"},[_c('label',{staticClass:"labels"},[_vm._v("联系电话：")]),_vm._v(" "),_c('span',{staticClass:"input",staticStyle:{"width":"250px"}},[_vm._v(_vm._s(_vm.dataInfo.phone))]),_vm._v(" "),_c('label',{staticClass:"labels"},[_vm._v("带领 ( "+_vm._s(_vm.dataInfo.worker_num)+" ) 人进行以下工作：")])]),_vm._v(" "),_c('div',{staticClass:"item"},[_c('label',{staticClass:"labels"},[_vm._v("A区域/车辆：")]),_vm._v(" "),_c('div',{staticClass:"conn"},_vm._l((_vm.dataInfo.area_or_car),function(areas){return _c('div',{key:areas.id},[_c('p',[_c('em',[_vm._v(_vm._s(areas.start_station_name)+" - "+_vm._s(areas.end_station_name)+" 区间 "+_vm._s(areas.line_type_name)+" ( DK"+_vm._s(areas.start_flag)+" + "+_vm._s(areas.start_length)+" - DK"+_vm._s(areas.end_flag)+" + "+_vm._s(areas.end_length)+" )")])]),_vm._v(" "),_c('p',[_c('i',[_vm._v("开始时间："+_vm._s(areas.start_time))]),_vm._v(" "),_c('i',[_vm._v("结束时间："+_vm._s(areas.end_time))])])])}))]),_vm._v(" "),_c('div',{staticClass:"item"},[_c('label',{staticClass:"labels"},[_vm._v("B工作内容：")]),_vm._v(" "),_c('div',{staticClass:"conn"},[_c('em',[_vm._v(_vm._s(_vm.funIsEmpty(_vm.dataInfo.description)))])])]),_vm._v(" "),_c('div',{staticClass:"item"},[_c('label',{staticClass:"labels"},[_vm._v("C安全措施及注意事项：")]),_vm._v(" "),_c('div',{staticClass:"conn"},[_c('em',[_vm._v(" "+_vm._s(_vm.funIsEmpty(_vm.dataInfo.attention)))])])]),_vm._v(" "),_c('div',{staticClass:"item"},[_c('ul',{staticClass:"scheck"},[_c('li',[_vm._v("\n                  是否需要动车：\n                  "),(_vm.dataInfo.is_need_car==0)?_c('b',[_vm._v("否")]):_vm._e(),_vm._v(" "),(_vm.dataInfo.is_need_car==1)?_c('b',[_vm._v("是")]):_vm._e()]),_vm._v(" "),_c('li',[_vm._v("\n                  是否需要动火：\n                  "),(_vm.dataInfo.is_need_fire==0)?_c('b',[_vm._v("否")]):_vm._e(),_vm._v(" "),(_vm.dataInfo.is_need_fire==1)?_c('b',[_vm._v("是")]):_vm._e()]),_vm._v(" "),_c('li',[_vm._v("\n                  是否需要帮助：\n                  "),(_vm.dataInfo.is_need_help==0)?_c('b',[_vm._v("否")]):_vm._e(),_vm._v(" "),(_vm.dataInfo.is_need_help==1)?_c('b',[_vm._v("是")]):_vm._e()]),_vm._v(" "),_c('li',[_vm._v("\n                  是否需要断电：\n                  "),(_vm.dataInfo.is_need_break_ele==0)?_c('b',[_vm._v("否")]):_vm._e(),_vm._v(" "),(_vm.dataInfo.is_need_break_ele==1)?_c('b',[_vm._v("是")]):_vm._e()])])]),_vm._v(" "),_c('div',{staticClass:"itemconn",staticStyle:{"margin-bottom":"30px"}},[_vm._v("本单位及本人谨此声明：愿意在规定时间内完成上述工作，并确保本人属下员工遵守上述安全措施，同时本人或本人属 下员工不会试图损坏其它单位的设备，在其它区域或车辆上工作。")]),_vm._v(" "),_c('div',{staticClass:"singn"},[_c('span',{staticClass:"pull-left"},[_vm._v("工点负责人（签名）"),_c('b',[_vm._v(_vm._s(_vm.dataInfo.p_in_charge))])]),_vm._v(" "),_c('span',{staticClass:"pull-right"},[_vm._v(_vm._s(_vm.dataInfo.create_time))])])])]),_vm._v(" "),_c('el-timeline-item',{attrs:{"timestamp":"审批","placement":"top","type":"warning ","color":"#ff5c75","size":"large"}},[_c('div',{staticClass:"onebox"},[_c('div',{staticClass:"itemconn"},[_vm._v("兹审批此许可证生效，或按红笔修改的执行。")]),_vm._v(" "),_c('div',{staticClass:"singn lines"},[_c('span',{staticClass:"pull-left"},[_vm._v("审批负责人（签名）"),_c('b',[_vm._v(_vm._s(_vm.dataInfo.approver))])]),_vm._v(" "),_c('span',{staticClass:"pull-right"},[_vm._v(_vm._s(_vm.dataInfo.approve_time))])])])]),_vm._v(" "),_c('el-timeline-item',{attrs:{"timestamp":"销点","placement":"top","type":"warning ","color":"#ff5c75","size":"large"}},[_c('div',{staticClass:"onebox"},[_c('div',{staticClass:"itemconn"},[_vm._v("本人谨此声明：⑴ 此进场作业许可证所述工作现已完成，本人及属下员工已经撤离，安全措施已经撤除，并已被告之在轨道区域/车辆上工作已不再安全。⑵ 完成情况及所有故障/损坏已经书面呈报。")]),_vm._v(" "),_c('div',{staticClass:"singn lines"},[_c('span',{staticClass:"pull-left"},[_vm._v("销点负责人（签名）"),_c('b',[_vm._v(_vm._s(_vm.dataInfo.logout))])]),_vm._v(" "),_c('span',{staticClass:"pull-right"},[_vm._v(_vm._s(_vm.dataInfo.logout_time))])])])]),_vm._v(" "),_c('el-timeline-item',{attrs:{"timestamp":"注销","placement":"top","type":"warning ","color":"#ff5c75","size":"large"}},[_c('div',{staticClass:"onebox"},[_c('div',{staticClass:"itemconn"},[_vm._v("此许可证已经原批准人或联合办公室经理同意注销。")]),_vm._v(" "),_c('div',{staticClass:"singn lines"},[_c('span',{staticClass:"pull-left"},[_vm._v("\n                注销负责人（签名）\n                "),_c('b',[_vm._v(_vm._s(_vm.dataInfo.logoff))])]),_vm._v(" "),_c('span',{staticClass:"pull-right"},[_vm._v(_vm._s(_vm.dataInfo.logoff_time))])])])])],1)],1)])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('td',{staticClass:"auto-style",attrs:{"rowspan":"2"}},[_c('b',[_vm._v("作业编号：")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('td',{staticClass:"auto-style"},[_c('b',[_vm._v("作业令号：")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('td',{staticClass:"auto-style"},[_c('b',[_vm._v("工作地点 （上/下行线）：")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th',[_vm._v("由")]),_vm._v(" "),_c('th',[_vm._v("至")]),_vm._v(" "),_c('th',{staticStyle:{"width":"120px"}},[_vm._v("线别")]),_vm._v(" "),_c('th',[_vm._v("列车编组")]),_vm._v(" "),_c('th',[_vm._v("工作时间")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('td'),_vm._v(" "),_c('td'),_vm._v(" "),_c('td'),_vm._v(" "),_c('td'),_vm._v(" "),_c('td')])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('td'),_vm._v(" "),_c('td'),_vm._v(" "),_c('td'),_vm._v(" "),_c('td'),_vm._v(" "),_c('td')])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('td'),_vm._v(" "),_c('td'),_vm._v(" "),_c('td'),_vm._v(" "),_c('td'),_vm._v(" "),_c('td')])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('td',{staticClass:"auto-style"},[_c('b',[_vm._v("计划运行路径：")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('td',{staticClass:"auto-style"},[_c('b',[_vm._v("工作内容：")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('td',{staticClass:"auto-style"},[_c('b',[_vm._v("车辆：")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th',[_vm._v("车辆类型")]),_vm._v(" "),_c('th',[_vm._v("车号")]),_vm._v(" "),_c('th',[_vm._v("装载重量")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('td'),_vm._v(" "),_c('td'),_vm._v(" "),_c('td')])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('td'),_vm._v(" "),_c('td'),_vm._v(" "),_c('td')])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('td'),_vm._v(" "),_c('td'),_vm._v(" "),_c('td')])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('td',{staticClass:"auto-style"},[_c('b',[_vm._v("保护措施：")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('td',{staticClass:"auto-style"},[_c('b',[_vm._v("其他信息")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('td',{attrs:{"colspan":"2","rowspan":"2"}},[_c('b',[_vm._v("承运人签名（章）：")]),_vm._v("暂无\n              ")])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var apply_applydetail = (esExports);
// CONCATENATED MODULE: ./src/views/apply/applydetail.vue
function injectStyle (ssrContext) {
  __webpack_require__("bZPg")
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
  applydetail,
  apply_applydetail,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_apply_applydetail = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/apply/index.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var apply = ({
  data: function data() {
    return {
      projectName: "",
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      companyList: [],
      lineList: [],
      typeList: [{ id: "A1", name: "A1" }, { id: "A2", name: "A2" }, { id: "A3", name: "A3" }, { id: "A4", name: "A4" }],
      stationList: [],
      statusList: [{ id: 1, name: "未批复" }, { id: 2, name: "同意" }, { id: 3, name: "拒绝" }, { id: 4, name: "完成" }, { id: 5, name: "已销点" }, { id: 6, name: "注销" }],
      dataList: [],
      searchForm: {
        depart_id: "",
        line_type: "",
        type: "",
        start_station: "",
        end_station: "",
        time_range: [],
        status: ""
      },
      dialogVisible: false,
      dialogVisibleOk: false,
      dialogVisibleNo: false,
      dialogId: 0,
      dialogContent: ""
    };
  },
  created: function created() {
    this.getProjectName();
    this.getDataList();
    this.getCompanyList();
    this.getLineType(); //线别
    this.getStationList(); //车站
  },

  methods: {
    getProjectName: function getProjectName() {
      var _this = this;

      this.request({
        url: "/common/getItemDetail",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this.projectName = data.data.name;
          localStorage.setItem("projectName", data.data.name);
        }
      });
    },
    getDataList: function getDataList() {
      var _this2 = this;

      var page = this.page_cur;
      var depart_id = this.searchForm.depart_id;
      var line_type = this.searchForm.line_type;
      var type = this.searchForm.type;
      var start_station = this.searchForm.start_station;
      var end_station = this.searchForm.end_station;
      var time_range = this.searchForm.time_range;
      var status = this.searchForm.status;
      this.request({
        url: "/apply/getApplyPages",
        method: "get",
        params: {
          page: page,
          depart_id: depart_id,
          line_type: line_type,
          type: type,
          start_station: start_station,
          end_station: end_station,
          time_range: time_range,
          status: status
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this2.dataList = data.data.data;
          _this2.page_cur = parseInt(data.data.current_page);
          _this2.pageTotal = data.data.total;
          _this2.page_size = data.data.per_page;
          _this2.page_total = data.data.last_page;
        }
      });
    },
    pageChange: function pageChange(value) {
      this.page_cur = value;
      this.getDataList();
    },
    pageToFirst: function pageToFirst() {
      this.pageChange(1);
    },
    pageToLast: function pageToLast() {
      this.page_cur = this.page_total;
      this.pageChange(this.page_total);
    },
    pageSearchEvent: function pageSearchEvent() {
      this.page_cur = 1;
      this.getDataList();
    },
    getCompanyList: function getCompanyList() {
      var _this3 = this;

      this.request({
        url: "/apply/getCompanyLists",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this3.companyList = data.data;
        }
      });
    },
    getLineType: function getLineType() {
      var _this4 = this;

      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this4.lineList = data.data;
        }
      });
    },
    getStationList: function getStationList() {
      var _this5 = this;

      this.request({
        url: "/apply/getStationLists",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this5.stationList = data.data;
        }
      });
    },
    goDetail: function goDetail(id, type) {
      var laytitle = "";
      if (type == "A1" || type == "A2") {
        laytitle = "轨行区及施工作业许可证";
      } else {
        laytitle = this.projectName + "进场作业许可证";
      }
      this.$layer.iframe({
        area: ["85%", "90%"],
        title: laytitle,
        shadeClose: false,
        scrollbar: false,
        content: {
          content: views_apply_applydetail,
          parent: this,
          data: { iframeData: { id: id } }
        }
      });
    },
    goApply: function goApply(id, company) {
      this.dialogVisible = true;
      this.dialogId = id;
      this.dialogContent = company;
    },
    goApplyOk: function goApplyOk(id, company) {
      this.dialogVisibleOk = true;
      this.dialogId = id;
      this.dialogContent = company;
    },
    goApplyNo: function goApplyNo(id, company) {
      this.dialogVisibleNo = true;
      this.dialogId = id;
      this.dialogContent = company;
    },
    ApplyClick: function ApplyClick(id, status) {
      var _this6 = this;

      this.request({
        url: "/apply/changeStatus",
        method: "POST",
        data: { id: id, status: status }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this6.$message({
            type: "success",
            message: "恭喜您，操作成功"
          });
          _this6.dialogVisible = false;
          _this6.dialogVisibleOk = false;
          _this6.dialogVisibleNo = false;
          _this6.getDataList();
        } else {
          _this6.$message({
            type: "success",
            message: "审批失败"
          });
          _this6.dialogVisible = false;
          _this6.dialogVisibleOk = false;
          _this6.dialogVisibleNo = false;
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-68b5d11d","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/apply/index.vue
var apply_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app-apply"}},[_c('div',{staticClass:"el-menu-top"},[_c('el-menu',{attrs:{"router":"","mode":"horizontal"}},[_c('li',{staticClass:"ptitle"},[_vm._v(_vm._s(_vm.projectName))]),_vm._v(" "),_c('el-submenu',{staticClass:"is-active",attrs:{"index":"1"}},[_c('template',{slot:"title"},[_vm._v("日班计划")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"daychart"}},[_vm._v("日班图表")]),_vm._v(" "),_c('el-menu-item',{staticClass:"is-active",attrs:{"index":"apply"}},[_vm._v("日班列表")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"conflictcheck"}},[_vm._v("冲突检测")])],2),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"weekplan"}},[_vm._v("周计划")])],1)],1),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-select"},[_c('el-form',{attrs:{"model":_vm.searchForm,"inline":true}},[_c('el-form-item',[_c('el-select',{attrs:{"placeholder":"请选择公司","clearable":""},model:{value:(_vm.searchForm.depart_id),callback:function ($$v) {_vm.$set(_vm.searchForm, "depart_id", $$v)},expression:"searchForm.depart_id"}},_vm._l((_vm.companyList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',[_c('el-select',{attrs:{"placeholder":"请选择线别","clearable":""},model:{value:(_vm.searchForm.line_type),callback:function ($$v) {_vm.$set(_vm.searchForm, "line_type", $$v)},expression:"searchForm.line_type"}},_vm._l((_vm.lineList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',[_c('el-select',{attrs:{"placeholder":"请选择类型","clearable":""},model:{value:(_vm.searchForm.type),callback:function ($$v) {_vm.$set(_vm.searchForm, "type", $$v)},expression:"searchForm.type"}},_vm._l((_vm.typeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',[_c('el-select',{attrs:{"placeholder":"请选择起始车站","clearable":""},model:{value:(_vm.searchForm.start_station),callback:function ($$v) {_vm.$set(_vm.searchForm, "start_station", $$v)},expression:"searchForm.start_station"}},_vm._l((_vm.stationList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',[_c('el-select',{attrs:{"placeholder":"请选择结束车站","clearable":""},model:{value:(_vm.searchForm.end_station),callback:function ($$v) {_vm.$set(_vm.searchForm, "end_station", $$v)},expression:"searchForm.end_station"}},_vm._l((_vm.stationList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',[_c('el-date-picker',{attrs:{"type":"daterange","range-separator":"至","start-placeholder":"选择开始日期","end-placeholder":"选择结束日期","default-time":['00:00:00', '23:59:59']},model:{value:(_vm.searchForm.time_range),callback:function ($$v) {_vm.$set(_vm.searchForm, "time_range", $$v)},expression:"searchForm.time_range"}})],1),_vm._v(" "),_c('el-form-item',[_c('el-select',{attrs:{"placeholder":"请选择状态","clearable":""},model:{value:(_vm.searchForm.status),callback:function ($$v) {_vm.$set(_vm.searchForm, "status", $$v)},expression:"searchForm.status"}},_vm._l((_vm.statusList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"form-so"},[_c('label',{staticClass:"el-form-item__label"}),_vm._v(" "),_c('el-button',{attrs:{"size":"small","icon":"el-icon-search","type":"primary"},on:{"click":_vm.pageSearchEvent}},[_vm._v("查询")])],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"page-count"},[_vm._v("找到"+_vm._s(_vm.pageTotal)+"条相关作业令")]),_vm._v(" "),_c('div',{staticClass:"app-table"},[_c('el-table',{attrs:{"data":_vm.dataList}},[_c('el-table-column',{attrs:{"prop":"number","label":"作业编号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"command_num","label":"作业令号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"description","label":"作业内容","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"status","label":"当前状态"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.status=='未批复')?_c('span',{staticClass:"statuse1"},[_vm._v("未批复")]):_vm._e(),_vm._v(" "),(scope.row.status=='同意')?_c('span',{staticClass:"statuse2"},[_vm._v("同意")]):_vm._e(),_vm._v(" "),(scope.row.status=='拒绝')?_c('span',{staticClass:"statuse3"},[_vm._v("拒绝")]):_vm._e(),_vm._v(" "),(scope.row.status=='完成')?_c('span',{staticClass:"statuse4"},[_vm._v("完成")]):_vm._e(),_vm._v(" "),(scope.row.status=='已销点')?_c('span',{staticClass:"statuse6"},[_vm._v("已销点")]):_vm._e(),_vm._v(" "),(scope.row.status=='注销')?_c('span',{staticClass:"statuse1"},[_vm._v("注销")]):_vm._e()]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"next_status","label":"下一步状态"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"company","label":"公司简称","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","width":"120"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticClass:"app-operation"},[(scope.row.status=='未批复')?_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.goApply(scope.row.id,scope.row.company)}}},[_vm._v("审批")]):_vm._e(),_vm._v(" "),(scope.row.status=='已销点')?_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.goApplyOk(scope.row.id,scope.row.company)}}},[_vm._v("完成")]):_vm._e(),_vm._v(" "),(scope.row.status=='已完成')?_c('el-button',{staticClass:"btn-red",attrs:{"size":"mini"},on:{"click":function($event){_vm.goApplyNo(scope.row.id,scope.row.company)}}},[_vm._v("注销")]):_vm._e(),_vm._v(" "),_c('el-button',{staticClass:"btn-blue",attrs:{"size":"mini"},on:{"click":function($event){_vm.goDetail(scope.row.id,scope.row.type)}}},[_vm._v("详情")])],1)]}}])})],1),_vm._v(" "),_c('div',{staticClass:"app-pagination"},[(_vm.dataList.length !== 0)?_c('el-pagination',{staticClass:"pagination",attrs:{"layout":"slot,prev, pager, next,slot,total","page-size":this.page_size,"current-page":this.page_cur,"total":this.pageTotal,"prev-text":"上一页","next-text":"下一页"},on:{"current-change":_vm.pageChange}},[_c('button',{staticClass:"btn-first",attrs:{"type":"button"},on:{"click":_vm.pageToFirst}},[_c('span',[_vm._v("首页")])]),_vm._v(" "),_c('button',{staticClass:"btn-last",attrs:{"type":"button"},on:{"click":_vm.pageToLast}},[_c('span',[_vm._v("尾页")])])]):_vm._e()],1)],1)])]),_vm._v(" "),_c('el-dialog',{staticClass:"dialogStyle",attrs:{"title":"审批","visible":_vm.dialogVisible,"width":"300px","center":""},on:{"update:visible":function($event){_vm.dialogVisible=$event}}},[_c('span',[_vm._v("请选择审批状态？")]),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.ApplyClick(_vm.dialogId,2)}}},[_vm._v("同意")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.ApplyClick(_vm.dialogId,3)}}},[_vm._v("拒绝")])],1)]),_vm._v(" "),_c('el-dialog',{staticClass:"dialogStyle",attrs:{"title":"完成审批","visible":_vm.dialogVisibleOk,"width":"300px","center":""},on:{"update:visible":function($event){_vm.dialogVisibleOk=$event}}},[_c('span',[_vm._v("您确定任务已完成？")]),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.ApplyClick(_vm.dialogId,4)}}},[_vm._v("确定")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.dialogVisibleOk=false}}},[_vm._v("取消")])],1)]),_vm._v(" "),_c('el-dialog',{staticClass:"dialogStyle",attrs:{"title":"注销审批","visible":_vm.dialogVisibleNo,"width":"300px","center":""},on:{"update:visible":function($event){_vm.dialogVisibleNo=$event}}},[_c('span',[_vm._v("您确定注销此任务？")]),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.ApplyClick(_vm.dialogId,6)}}},[_vm._v("确定")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.dialogVisibleNo=false}}},[_vm._v("取消")])],1)])],1)}
var apply_staticRenderFns = []
var apply_esExports = { render: apply_render, staticRenderFns: apply_staticRenderFns }
/* harmony default export */ var views_apply = (apply_esExports);
// CONCATENATED MODULE: ./src/views/apply/index.vue
function apply_injectStyle (ssrContext) {
  __webpack_require__("YwWt")
}
var apply_normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var apply___vue_template_functional__ = false
/* styles */
var apply___vue_styles__ = apply_injectStyle
/* scopeId */
var apply___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var apply___vue_module_identifier__ = null
var apply_Component = apply_normalizeComponent(
  apply,
  views_apply,
  apply___vue_template_functional__,
  apply___vue_styles__,
  apply___vue_scopeId__,
  apply___vue_module_identifier__
)

/* harmony default export */ var src_views_apply = __webpack_exports__["default"] = (apply_Component.exports);


/***/ }),

/***/ "C0re":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.el-menu--collapse .el-menu .el-submenu,\r\n.el-menu--popup {\r\n  min-width: 124px;\r\n  text-align: center;\r\n  padding: 0;\n}\n.el-menu--horizontal .el-menu .el-menu-item.is-active,\r\n.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {\r\n  background: #4b6eca;\r\n  color: #fff;\n}\n.page-count {\r\n  text-align: right;\r\n  color: #1d397a;\r\n  padding-bottom: 20px;\n}\n#app-apply .el-dialog__footer {\r\n  text-align: center;\n}\n.confirmButtonClass {\r\n  font-size: 14px;\r\n  padding: 8px 15px;\r\n  background: #ff5c75 !important;\r\n  border-color: #ff5c75 !important;\r\n  margin-left: 15px !important;\n}\n.cancelButtonClass {\r\n  padding: 8px 15px;\r\n  font-size: 14px;\r\n  background: #1d397a;\r\n  border-color: #1d397a;\r\n  color: #fff;\n}\n.cancelButtonClass:hover {\r\n  background: #1d397a;\r\n  border-color: #1d397a;\r\n  color: #fff;\n}\n.dialogStyle .el-button--medium {\r\n  padding: 7px 20px;\n}\n.statuse2 {\r\n  color: #029b02;\n}\n.statuse3 {\r\n  color: #ff5c75;\n}\n.statuse4 {\r\n  color: #0a0693;\n}\n.statuse6 {\r\n  color: #4072d1;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "YwWt":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("C0re");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("90cce8c8", content, true);

/***/ }),

/***/ "bZPg":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("eBA8");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("1a7356e6", content, true);

/***/ }),

/***/ "eBA8":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.vl-notify-content {\r\n  height: 91.5% !important;\n}\n.app-apply-detail {\r\n  width: 100%;\n}\n.app-apply-detail .app-page {\r\n  overflow: hidden;\r\n  padding-bottom: 200px;\n}\n.app-apply-detail .el-form-item {\r\n  margin-bottom: 25px;\n}\n.app-apply-detail .el-form-item__label {\r\n  color: #1d397a;\n}\n.app-apply-detail .el-form-item .input {\r\n  width: 280px;\r\n  text-align: left;\n}\n.app-apply-detail .input {\r\n  height: 36px;\r\n  border: 1px #9db9fa solid;\r\n  color: #4b6eca;\r\n  border-radius: 4px;\r\n  line-height: 36px;\r\n  display: inline-block;\r\n  padding: 0 12px;\n}\n.app-apply-detail .onebox {\r\n  padding: 0 50px;\r\n  margin-bottom: 60px;\r\n  font-size: 15px;\n}\n.app-apply-detail .el-timeline-item__timestamp {\r\n  color: #1d397a;\r\n  font-size: 16px;\r\n  font-weight: 700;\n}\n.app-apply-detail .item {\r\n  margin-bottom: 20px;\r\n  overflow: hidden;\n}\n.app-apply-detail .item .labels {\r\n  color: #1d397a;\r\n  margin: 0 15px 0 15px;\r\n  min-width: 75px;\r\n  display: inline-block;\n}\n.app-apply-detail .item em {\r\n  display: block;\r\n  color: #4b6eca;\r\n  font-style: normal;\n}\n.app-apply-detail .item i {\r\n  display: inline-block;\r\n  color: #1d397a;\r\n  font-size: 13px;\r\n  margin-right: 10px;\r\n  font-style: normal;\n}\n.app-apply-detail .conn {\r\n  display: block;\r\n  padding-left: 110px;\r\n  line-height: 24px;  word-wrap: break-word;\r\n  word-break: break-all;\n}\n.app-apply-detail .scheck {\r\n  margin-left: 15px;\n}\n.app-apply-detail .scheck li {\r\n  display: inline-block;\r\n  color: #1d397a;\r\n  margin-right: 40px;\n}\n.app-apply-detail .scheck b {\r\n  font-size: 16px;\n}\n.app-apply-detail .itemconn {\r\n  color: #1d397a;\r\n  margin-left: 15px;\r\n  line-height: 24px;\n}\n.app-apply-detail .singn {\r\n  color: #1d397a;\r\n  margin: 20px 0 20px 15px;\r\n  line-height: 24px;\n}\n.app-apply-detail .lines {\r\n  border-top: 1px #ededed solid;\r\n  margin-top: 35px;\r\n  padding-top: 10px;\n}\n.vtable {\r\n  margin: 0px;\n}\n.vtable table {\r\n  border-collapse: collapse;\r\n  width: 100%;\n}\n.vtable table td {\r\n  border: 1px solid #9db9fa;\r\n  line-height: 30px;\r\n  padding: 10px;\n}\n.vtable .auto-style {\r\n  width: 190px;\r\n  word-wrap: break-word;\r\n  word-break: break-all;\r\n  white-space: nowrap;\n}\n.vtable .auto-style2 {\r\n  width: 19.2%;\n}\n.clblue {\r\n  color: #4b6eca;\n}\n.clcenter {\r\n  text-align: center;\n}\n.textoverflow {\r\n  word-wrap: break-word;\r\n  word-break: break-all;\n}\n.innertable {\r\n  width: 100%;\n}\n.innertable {\r\n  border-collapse: collapse;\r\n  width: 100%;\r\n  margin-bottom: -1px;\r\n  margin-left: -1px;\n}\n.innertable th {\r\n  color: #111;\r\n  border-left: 1px #9db9fa solid;\r\n  border-bottom: 1px #9db9fa solid;\n}\n.innertable td {\r\n  border-top: 0 !important;\r\n  border-right: 0 !important;\r\n  padding: 0 10px !important;\r\n  height: 40px;\r\n  text-align: center;\r\n  color: #444;\n}\r\n", ""]);

// exports


/***/ })

});