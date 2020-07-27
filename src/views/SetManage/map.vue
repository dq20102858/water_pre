<template>
  <div>
    <div class="baiduMap">
      <el-form :model="centerStr" :label-width="100">
        <el-form-item label="经度">
          <el-input :value.sync="centerStr.lng"></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input :value.sync="centerStr.lat"></el-input>
        </el-form-item>
        <el-button type="primary">提交</el-button>
      </el-form>
      <baidu-map
        　　　　　　　　　　　　class="bm-view"
        　　　　　　　　　　　　ak="GsTerPPU46fUXlt09K8840K0HxTvKIIa"
        　　　　　　　　　　　　center="江苏省"
        　　　　　　　　　　　　:zoom="12"
        　　　　　　　　　　　　:scroll-wheel-zoom="true"
        　　　　　　　　　　　　@click="getClickInfo"
        　　　　　　　　　　　　@moving="syncCenterAndZoom"
        　　　　　　　　　　　　@moveend="syncCenterAndZoom"
        　　　　　　　　　　　　@zoomend="syncCenterAndZoom"
      >
        <bm-view style="width: 100%; height:500px;"></bm-view>
        <bm-marker
          　　　　　　　　　　　　　　　　:position="{ lng: centerStr.lng, lat: centerStr.lat }"
          　　　　　　　　　　　　　　　　:dragging="true"
          　　　　　　　　　　　　　　　　animation="BMAP_ANIMATION_BOUNCE"
        ></bm-marker>
        <bm-control :offset="{ width: '10px', height: '10px' }">
          <bm-auto-complete v-model="keyword" :sugStyle="{ zIndex: 999999 }">
            <input
              　　　　　　　　　　　　　　　　　　　　type="text"
              　　　　　　　　　　　　　　　　　　　　placeholder="请输入搜索关键字"
              　　　　　　　　　　　　　　　　　　　　class="serachinput"
            />
          </bm-auto-complete>
        </bm-control>
        <bm-local-search
          　　　　　　　　　　　　　　　:keyword="keyword"
          　　　　　　　　　　　　　　　:auto-viewport="true"
          　　　　　　　　　　　　　　　style="width:0px;height:0px;overflow: hidden;"
          　　　　　　　　　　　　　　
        ></bm-local-search>
      </baidu-map>
    </div>
  </div>
</template>
 
　　　　
<script>
//地图组件---按需引入
import {
  BaiduMap,
  BmControl,
  BmView,
  BmAutoComplete,
  BmLocalSearch,
  BmMarker
} from "vue-baidu-map";

export default {
  components: {
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker
  },
  data() {
    return {
      showMapComponent: this.value,
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
  watch: {
    value: function(currentValue) {
      this.showMapComponent = currentValue;
      if (currentValue) {
        this.keyword = "";
      }
    }
  },
  methods: {
    getClickInfo(e) {
      this.centerStr.lng = e.point.lng;
      this.centerStr.lat = e.point.lat;
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.centerStr.lng = lng;
      this.centerStr.lat = lat;
      this.zoom = e.target.getZoom();
    }
  }
};
</script>
　
