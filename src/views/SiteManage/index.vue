<template>
  <div class="app-pages">
    <div class="baidumap">
      <div class="baidumap-so">
        <!--
      <el-input v-model="address" placeholder="请输入地址  支持手动在地图标注位置"></el-input>
        -->
        <!-- <el-input
        placeholder="请输入位置关键字"
        v-model="searchAddress"
        @keyup.enter.native="searchEvent"
        class="map-so-input"   prefix-icon="el-icon-search"
        clearable
      >
        </el-input>-->
  <el-select
    v-model="value"
    multiple
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading" clearable>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.value"
      :value="item.id">
    </el-option>
  </el-select>

        <el-autocomplete
          v-model="chlidStationName"
          class="map-so-input"
          prefix-icon="el-icon-search"
          :fetch-suggestions="searchStationCallBack"
          placeholder="请输入处理站名"
          :trigger-on-focus="false"
          @select="searchStationEvent($event)"
          clearable
        ></el-autocomplete>
      </div>
      <baidu-map
        class="bm-view"
        :center="center"
        :zoom="zoom"
        @ready="readyHandler"
        :scroll-wheel-zoom="true"
        :mapClick="false"
        　ak="GsTerPPU46fUXlt09K8840K0HxTvKIIa"
      >
        <!--地图类型-->
        <bm-map-type
          :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        ></bm-map-type>
        <!--地图缩放-->
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <!--标注点  animation="BMAP_ANIMATION_BOUNCE"        :offset="{width:-65,height:-45}"-->
        <div v-for="marker in markers" :key="marker.lng">
          <bm-marker :position="{lng: marker.lng, lat: marker.lat}" @click="markerClick(marker)"></bm-marker>
          <bm-label
            :content="marker.name"
            :position="{lng: marker.lng, lat: marker.lat}"
            :labelStyle="{border:'1px solid #3498DB',background:'#3498DB', color:'#fff', padding:'2px 4px',fontWeight: '400',fontSize:'13px',cursor: 'pointer'}"
            :title="marker.name"
            @click="markerClick(marker)"
          />
        </div>
        <bm-local-search
          :keyword="address"
          :location="address"
          :auto-viewport="true"
          style="width:0px;height:0px;overflow: hidden;"
        ></bm-local-search>
      </baidu-map>
    </div>
  </div>
</template>
<script>
import {
  BaiduMap,
  BmNavigation,
  BmMapType,
  BmMarker,
  BmInfoWindow,
  BmOverlay,
  BmLocalSearch,
  BmLabel
} from "vue-baidu-map";
export default {
  data() {
    return {
       loading: false,
      options:[],
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
    BaiduMap,
    BmNavigation,
    BmMapType,
    BmMarker,
    BmInfoWindow,
    BmOverlay,
    BmLabel,
    BmLocalSearch
  },

  created() {},
  methods: {
    getChildStationList() {
      let name = this.searchVillageName;
      this.request({
        url: "/station/getChildStationLists",
        method: "get",
        params: { name }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.childStationList = data.data;
        }
      });
    },
    getMarkers() {
      this.markers = this.childStationList;
    },
    readyHandler({ BMap, map }) {
      let name = this.searchVillageName;
      this.request({
        url: "/station/getChildStationLists",
        method: "get",
        params: { name }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.markers = data.data;
          // 自动获取展示的比例
          var view = map.getViewport(eval(this.markers));
          this.zoom = view.zoom;
          this.center = view.center;
          console.log(this.markers);
        }
      });
    },
    markerClick(e) {
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
    searchEvent() {},
     remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
  this.request({
        url: "/station/getChildStationLists",
        method: "get",
        params: { name: query }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          let results = data.data;
          let list = [];
          if (results.length == 0) {
            this.options.push({
              id: 0,
              value: "未查询到站名"
            });
          }
          for (let item of results) {
            this.options.push({
              id: item.id,
              pid: item.pid,
              value: item.name,
              lng: item.lng,
              lat: item.lat
            });
          }
        }
      });
      console.log(this.options);
          // setTimeout(() => {
          //   this.loading = false;
          //   this.options = this.list.filter(item => {
          //     return item.label.toLowerCase()
          //       .indexOf(query.toLowerCase()) > -1;
          //   });
          // }, 200);
        } else {
          this.options = [];
        }
      },
    searchStationCallBack(queryString, cb) {
      this.request({
        url: "/station/getChildStationLists",
        method: "get",
        params: { name: queryString }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          let results = data.data;
          let list = [];
          if (results.length == 0) {
            list.push({
              id: 0,
              value: "未查询到站名"
            });
          }
          for (let item of results) {
            list.push({
              id: item.id,
              pid: item.pid,
              value: item.name,
              lng: item.lng,
              lat: item.lat
            });
          }
          cb(list);
        }
      });
    },
    searchStationEvent(item) {
      this.center.lng = item.lng;
      this.center.lat = item.lat;
    }
  }
};
</script>

<style>
.bm-view {
  width: 100%;
  height: calc(100vh - 100px);
}
.baidumap {
  position: relative;
  width: 100%;
}
.baidumap-so {
  position: fixed;
  top: 110px;
  left: 10px;
  z-index: 99999;
}
.baidumap-so .el-input__inner {
  border-color: #338ff6;
}
.map-so-input .el-button {
  background: #409eff;
  border: 1px #409eff solid;
  padding: 5px 5px 5px 10px;
  color: #fff;
}
.map-so-input .el-input-group__append {
  background: #409eff;
  border: 1px #409eff solid;
  color: #fff;
}
</style>