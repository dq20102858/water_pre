<template>
  <div id="message">
    <div class="baiduMap">
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
        <bm-view :style="{'height': offHeight + 'px'}"></bm-view>
        <bm-marker
          　　　:position="{ lng: centerStr.lng, lat: centerStr.lat }"
          　　　:dragging="true"
          　　　animation="BMAP_ANIMATION_BOUNCE"
        ></bm-marker>
        <bm-local-search
          :keyword="address"
          :auto-viewport="true"
          style="width:0px;height:0px;overflow: hidden;"
        ></bm-local-search>
      </baidu-map>
    </div>
  </div>
</template>
<script>
import { BaiduMap, BmView, BmLocalSearch, BmMarker } from "vue-baidu-map";
export default {
  components: {
    BaiduMap,
    BmView,
    BmLocalSearch,
    BmMarker
  },
  data() {
    return {
      offHeight: 0,
      address: "",
      centerStr: {
        lng: "",
        lat: ""
      }
    };
  },
  updated() {
    this.offHeight = document.documentElement.clientHeight - 100;
  },
  created() {},
  methods: {
    getClickInfo(e) {
      this.centerStr.lng = e.point.lng;
      this.centerStr.lat = e.point.lat;
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      if (this.diaLogEdit == true) {
        this.centerStr.lng = this.formData.lng;
        this.centerStr.lat = this.formData.lat;
      } else {
        this.centerStr.lng = lng;
        this.centerStr.lat = lat;
      }
      this.zoom = e.target.getZoom();
      // console.log(this.centerStr.lng + "__A__" + this.centerStr.lat);
    }
  }
};
</script>
<style>
</style>