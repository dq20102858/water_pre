webpackJsonp([8],{

/***/ "8Weu":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("iUO5");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("8bSs")("85216408", content, true);

/***/ }),

/***/ "iUO5":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("BkJT")(false);
// imports


// module
exports.push([module.i, "\n.bm-view {\r\n  width: 100%;\r\n  height: calc(100vh - 100px);\n}\n.baidumap {\r\n  position: relative;\r\n  width: 100%;\n}\n.baidumap-so {\r\n  position: fixed;\r\n  top: 110px;\r\n  left: 10px;\r\n  z-index: 99999;\n}\n.baidumap-so .el-input__inner {\r\n  border-color: #338ff6;\n}\n.map-so-input .el-button {\r\n  background: #409eff;\r\n  border: 1px #409eff solid;\r\n  padding: 5px 5px 5px 10px;\r\n  color: #fff;\n}\n.map-so-input .el-input-group__append {\r\n  background: #409eff;\r\n  border: 1px #409eff solid;\r\n  color: #fff;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "vzEL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/_babel-loader@7.1.2@babel-loader/lib!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=script&index=0!./src/views/SiteManage/index.vue
var SiteManage = __webpack_require__("yEkq");

// CONCATENATED MODULE: ./node_modules/_vue-loader@13.5.0@vue-loader/lib/template-compiler?{"id":"data-v-5efea468","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=template&index=0!./src/views/SiteManage/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-pages"},[_c('div',{staticClass:"baidumap"},[_c('div',{staticClass:"baidumap-so"},[_c('el-autocomplete',{staticClass:"map-so-input",attrs:{"prefix-icon":"el-icon-search","fetch-suggestions":_vm.searchStationCallBack,"placeholder":"请输入处理站名","trigger-on-focus":false},on:{"select":function($event){_vm.searchStationEvent($event)}},model:{value:(_vm.chlidStationName),callback:function ($$v) {_vm.chlidStationName=$$v},expression:"chlidStationName"}})],1),_vm._v(" "),_c('baidu-map',{staticClass:"bm-view",attrs:{"center":_vm.center,"zoom":_vm.zoom,"scroll-wheel-zoom":true,"mapClick":false,"ak":"GsTerPPU46fUXlt09K8840K0HxTvKIIa"},on:{"ready":_vm.readyHandler}},[_c('bm-map-type',{attrs:{"map-types":['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP'],"anchor":"BMAP_ANCHOR_BOTTOM_RIGHT"}}),_vm._v(" "),_c('bm-navigation',{attrs:{"anchor":"BMAP_ANCHOR_TOP_RIGHT"}}),_vm._v(" "),_vm._l((_vm.markers),function(marker){return _c('div',{key:marker.lng},[_c('bm-marker',{attrs:{"position":{lng: marker.lng, lat: marker.lat}},on:{"click":function($event){_vm.markerClick(marker)}}}),_vm._v(" "),_c('bm-label',{attrs:{"content":marker.name,"position":{lng: marker.lng, lat: marker.lat},"labelStyle":{border:'1px solid #3498DB',background:'#3498DB', color:'#fff', padding:'2px 4px',fontWeight: '400',fontSize:'13px',cursor: 'pointer'},"title":marker.name},on:{"click":function($event){_vm.markerClick(marker)}}})],1)}),_vm._v(" "),_c('bm-local-search',{staticStyle:{"width":"0px","height":"0px","overflow":"hidden"},attrs:{"keyword":_vm.address,"location":_vm.address,"auto-viewport":true}})],2)],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_SiteManage = (esExports);
// CONCATENATED MODULE: ./src/views/SiteManage/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("8Weu")
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
  SiteManage["a" /* default */],
  views_SiteManage,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_SiteManage = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "yEkq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__("HzJ8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_baidu_map__ = __webpack_require__("Ginn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_baidu_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_baidu_map__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      loading: false,
      value: [],
      options: [],
      searchAddress: "",
      address: "",
      center: { lng: 0, lat: 0 },
      zoom: 5,
      chlidStationName: "",
      childStationList: [],
      markers: []
    };
  },

  components: {
    BaiduMap: __WEBPACK_IMPORTED_MODULE_1_vue_baidu_map__["BaiduMap"],
    BmNavigation: __WEBPACK_IMPORTED_MODULE_1_vue_baidu_map__["BmNavigation"],
    BmMapType: __WEBPACK_IMPORTED_MODULE_1_vue_baidu_map__["BmMapType"],
    BmMarker: __WEBPACK_IMPORTED_MODULE_1_vue_baidu_map__["BmMarker"],
    BmInfoWindow: __WEBPACK_IMPORTED_MODULE_1_vue_baidu_map__["BmInfoWindow"],
    BmOverlay: __WEBPACK_IMPORTED_MODULE_1_vue_baidu_map__["BmOverlay"],
    BmLabel: __WEBPACK_IMPORTED_MODULE_1_vue_baidu_map__["BmLabel"],
    BmLocalSearch: __WEBPACK_IMPORTED_MODULE_1_vue_baidu_map__["BmLocalSearch"]
  },

  created: function created() {},

  methods: {
    getChildStationList: function getChildStationList() {
      var _this = this;

      var name = this.searchVillageName;
      this.request({
        url: "/station/getChildStationLists",
        method: "get",
        params: { name: name }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this.childStationList = data.data;
        }
      });
    },
    getMarkers: function getMarkers() {
      this.markers = this.childStationList;
    },
    readyHandler: function readyHandler(_ref) {
      var _this2 = this;

      var BMap = _ref.BMap,
          map = _ref.map;

      var name = this.searchVillageName;
      this.request({
        url: "/station/getChildStationLists",
        method: "get",
        params: { name: name }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this2.markers = data.data;
          // 自动获取展示的比例
          var view = map.getViewport(eval(_this2.markers));
          _this2.zoom = view.zoom;
          _this2.center = view.center;
          console.log(_this2.markers);
        }
      });
    },
    markerClick: function markerClick(e) {
      console.log(e);
      this.show = true;
      this.$router.push({
        path: "/sitemanage/main",
        query: { pid: e.pid, sid: e.id }
      });
    },

    // syncCenterAndZoom(e) {
    //   const { lng, lat } = e.target.getCenter();
    //   if (this.diaLogEdit == true) {
    //     this.centerStr.lng = this.formData.lng;
    //     this.centerStr.lat = this.formData.lat;
    //   } else {
    //     this.centerStr.lng = lng;
    //     this.centerStr.lat = lat;
    //   }
    //   this.zoom = e.target.getZoom();
    //   // console.log(this.centerStr.lng + "__A__" + this.centerStr.lat);
    // },
    searchRemoteMethod: function searchRemoteMethod(query) {
      var _this3 = this;

      if (query !== "") {
        this.loading = true;
        setTimeout(function () {
          _this3.loading = false;
          _this3.request({
            url: "/station/getChildStationLists",
            method: "get",
            params: { name: query }
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              var results = data.data;
              var jlist = [];
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(results), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var item = _step.value;

                  jlist.push({
                    id: item.id,
                    pid: item.pid,
                    value: item.name,
                    lng: item.lng,
                    lat: item.lat
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

              _this3.options = data.data;
            }
          });
        }, 200);
      } else {
        this.options = [];
      }
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
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(results), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var item = _step2.value;

              list.push({
                id: item.id,
                pid: item.pid,
                value: item.name,
                lng: item.lng,
                lat: item.lat
              });
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          cb(list);
        }
      });
    },
    searchStationEvent: function searchStationEvent(item) {
      this.center.lng = item.lng;
      this.center.lat = item.lat;
    }
  }
});

/***/ })

});