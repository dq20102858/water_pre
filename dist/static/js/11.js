webpackJsonp([11],{

/***/ "st75":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

<<<<<<< HEAD
// EXTERNAL MODULE: ./node_modules/_vue-baidu-map@0.21.22@vue-baidu-map/index.js
var _vue_baidu_map_0_21_22_vue_baidu_map = __webpack_require__("Ginn");
var _vue_baidu_map_0_21_22_vue_baidu_map_default = /*#__PURE__*/__webpack_require__.n(_vue_baidu_map_0_21_22_vue_baidu_map);

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.2@babel-loader/lib!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=script&index=0!./src/views/setmanage/warning.vue
=======
// EXTERNAL MODULE: ./node_modules/vue-baidu-map/index.js
var vue_baidu_map = __webpack_require__("dAEq");
var vue_baidu_map_default = /*#__PURE__*/__webpack_require__.n(vue_baidu_map);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/setmanage/warning.vue
>>>>>>> 1ac6313ad3a73f5c578280eae6ce0510a53561ea
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//地图组件---按需引入


/* harmony default export */ var warning = ({
  components: {
<<<<<<< HEAD
    BaiduMap: _vue_baidu_map_0_21_22_vue_baidu_map["BaiduMap"],
    BmControl: _vue_baidu_map_0_21_22_vue_baidu_map["BmControl"],
    BmView: _vue_baidu_map_0_21_22_vue_baidu_map["BmView"],
    BmAutoComplete: _vue_baidu_map_0_21_22_vue_baidu_map["BmAutoComplete"],
    BmLocalSearch: _vue_baidu_map_0_21_22_vue_baidu_map["BmLocalSearch"],
    BmMarker: _vue_baidu_map_0_21_22_vue_baidu_map["BmMarker"]
=======
    BaiduMap: vue_baidu_map["BaiduMap"],
    BmControl: vue_baidu_map["BmControl"],
    BmView: vue_baidu_map["BmView"],
    BmAutoComplete: vue_baidu_map["BmAutoComplete"],
    BmLocalSearch: vue_baidu_map["BmLocalSearch"],
    BmMarker: vue_baidu_map["BmMarker"]
>>>>>>> 1ac6313ad3a73f5c578280eae6ce0510a53561ea
  },
  data: function data() {
    return {
      keyword: "",
      mapStyle: {
        width: "100%",
        height: this.mapHeight + "px"
      },
      centerStr: {
        lng: "",
        lat: ""
      }
    };
  },

  methods: {
    getClickInfo: function getClickInfo(e) {
      this.centerStr.lng = e.point.lng;
      this.centerStr.lat = e.point.lat;
    },
    syncCenterAndZoom: function syncCenterAndZoom(e) {
      var _e$target$getCenter = e.target.getCenter(),
          lng = _e$target$getCenter.lng,
          lat = _e$target$getCenter.lat;

      this.centerStr.lng = lng;
      this.centerStr.lat = lat;
      this.zoom = e.target.getZoom();
    }
  }
});
<<<<<<< HEAD
// CONCATENATED MODULE: ./node_modules/_vue-loader@13.5.0@vue-loader/lib/template-compiler?{"id":"data-v-1fea703e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=template&index=0!./src/views/setmanage/warning.vue
=======
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1fea703e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/setmanage/warning.vue
>>>>>>> 1ac6313ad3a73f5c578280eae6ce0510a53561ea
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"padding":"30px"}},[_c('div',{staticClass:"baiduMap"},[_c('el-form',{attrs:{"label-width":100}},[_c('el-form-item',{attrs:{"label":"经度"}},[_c('el-input',{model:{value:(_vm.keyword),callback:function ($$v) {_vm.keyword=$$v},expression:"keyword"}})],1)],1),_vm._v(" "),_c('baidu-map',{staticClass:"bm-view",attrs:{"ak":"GsTerPPU46fUXlt09K8840K0HxTvKIIa","center":"江苏省","zoom":12,"scroll-wheel-zoom":true},on:{"click":_vm.getClickInfo,"moving":_vm.syncCenterAndZoom,"moveend":_vm.syncCenterAndZoom,"zoomend":_vm.syncCenterAndZoom}},[_c('bm-view',{staticStyle:{"width":"100%","height":"500px"}}),_vm._v(" "),_c('bm-marker',{attrs:{"position":{ lng: _vm.centerStr.lng, lat: _vm.centerStr.lat },"dragging":true,"animation":"BMAP_ANIMATION_BOUNCE"}}),_vm._v(" "),_c('bm-local-search',{staticStyle:{"width":"0px","height":"0px","overflow":"hidden"},attrs:{"keyword":_vm.keyword,"auto-viewport":true}})],1),_vm._v(" "),_c('el-form',{attrs:{"model":_vm.centerStr,"label-width":100}},[_c('el-form-item',{attrs:{"label":"经度"}},[_c('el-input',{attrs:{"value":_vm.centerStr.lng},on:{"update:value":function($event){_vm.$set(_vm.centerStr, "lng", $event)}}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"纬度"}},[_c('el-input',{attrs:{"value":_vm.centerStr.lat},on:{"update:value":function($event){_vm.$set(_vm.centerStr, "lat", $event)}}})],1)],1)],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var setmanage_warning = (esExports);
// CONCATENATED MODULE: ./src/views/setmanage/warning.vue
<<<<<<< HEAD
var normalizeComponent = __webpack_require__("/Xao")
=======
var normalizeComponent = __webpack_require__("VU/8")
>>>>>>> 1ac6313ad3a73f5c578280eae6ce0510a53561ea
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  warning,
  setmanage_warning,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_setmanage_warning = __webpack_exports__["default"] = (Component.exports);


/***/ })

});