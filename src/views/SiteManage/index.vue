<template>
  <div class="baiduMap">
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
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <!--地图缩放-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <!--标注点  animation="BMAP_ANIMATION_BOUNCE"-->
      <div v-for="marker in markers" :key="marker.lng">
        <bm-marker :position="{lng: marker.lng, lat: marker.lat}" @click="markerClick(marker)"></bm-marker>
        <bm-label
          :content="marker.name"
          :offset="{width:-55,height:-45}"
          :position="{lng: marker.lng, lat: marker.lat}"
          :labelStyle="{border:'1px solid #3498DB',background:'#3498DB', color:'#fff', padding:'2px',fontWeight: '600',fontSize:'14px',cursor: 'pointer'}"
          :title="marker.name"
          @click="markerClick(marker)"
        />
      </div>
    </baidu-map>
  </div>
</template>
<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmNavigation from "vue-baidu-map/components/controls/Navigation.vue";
import BmMapType from "vue-baidu-map/components/controls/MapType.vue";
import BmMarker from "vue-baidu-map/components/overlays/Marker.vue";
import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow.vue";
import BmOverlay from "vue-baidu-map/components/overlays/Overlay.vue";
import BmLabel from "vue-baidu-map/components/overlays/Label.vue";
export default {
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 15,
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
    BmLabel
  },
  mounted() {
    // this.getChildStationList();

    this.markers = [
      {
        id: 6,
        name: "\u4e2d\u5357\u65b0\u6751",
        lat: "31.541262",
        lng: "120.301947"
      },
      {
        id: 7,
        name: "\u5bfa\u5934\u5bb6\u56ed",
        lat: "31.648137",
        lng: "120.314564"
      },
      {
        id: 8,
        name: "\u5357\u5317\u6751",
        lat: "31.443715",
        lng: "120.007981"
      },
      {
        id: 9,
        name: "\u65e0\u9521\u4e1c\u7ad9",
        lat: "31.606212",
        lng: "120.465973"
      },
      {
        id: 12,
        name: "\u7ef4\u7eb3\u9633\u5149",
        lat: "31.675638",
        lng: "120.305802"
      },
      {
        id: 13,
        name: "\u6c5f\u5357\u5927\u5b66",
        lat: "32.00738",
        lng: "120.879806"
      },
      {
        id: 14,
        name: "\u738b\u53f8\u7548\u6751",
        lat: "29.630769",
        lng: "115.144735"
      },
      {
        id: 16,
        name:
          "\u6cd5\u56fd\u5927\u6982\u68b5\u8482\u5188@#\uffe5%\u2026\u2026\u2026\u2026",
        lat: "31.686742",
        lng: "120.304595"
      }
    ];
  },
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
          this.markers = data.data;
        }
      });
    },

    // draw({ el, BMap, map }) {
    //   //        let point = new BMap.Point(116.404, 39.915)
    //   //        map.addOverlay(point)
    //   const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915));
    //   el.style.left = pixel.x - 60 + "px";
    //   el.style.top = pixel.y - 20 + "px";
    // },

    readyHandler({ BMap, map }) {
      // 自动获取展示的比例
      var view = map.getViewport(eval(this.markers));
      this.zoom = view.zoom;
      this.center = view.center;
    },
    markerClick(e) {
      // debugger;
      console.log(e);
      this.$message(e.name);
      this.show = true;
    },
    infoWindowClose() {
      this.show = false;
    }
  },
  destroyed() {}
};
</script>

<style>
.bm-view {
  width: 100%;
  height: calc(100vh - 100px);
}

.sample {
  width: 160px;
  height: 60px;
  background: rgba(255, 255, 255, 0.5);
  overflow: auto;
  color: #000000;
  text-align: center;
  padding: 10px;
  position: relative;
}
</style>