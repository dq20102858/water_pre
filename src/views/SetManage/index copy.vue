<template>
  <div class="app-set-page">
    <div class="map">
      <el-input v-model="addressKeyword" placeholder="请输入地址来直接查找相关位置"></el-input>
      <baidu-map
        class="bmView"
        :scroll-wheel-zoom="true"
        :center="location"
        :zoom="zoom"
        @click="getLocationPoint"
        ak="GsTerPPU46fUXlt09K8840K0HxTvKIIa"
      >
        <bm-view style="width: 100%; height:600px; flex: 1"></bm-view>
        <bm-local-search :keyword="addressKeyword" :auto-viewport="true" style="display: none"></bm-local-search>
      </baidu-map>
    </div>
  </div>
</template>
<script>
import { BaiduMap, BmScale, BmGeolocation } from "vue-baidu-map";
export default {
  components: {
    BaiduMap,
    BmGeolocation,
    BmScale
  },
  data() {
    return {
      location: {
        lng: 116.404,
        lat: 39.915
      },
      zoom: 12.8,
      addressKeyword: ""
    };
  },
  mounted() {
    document
      .querySelector(".el-menu-top #setmanage")
      .classList.add("is-active");
  },
  methods: {
    getLocationPoint(e) {
      this.lng = e.point.lng;
      this.lat = e.point.lat;
      //console.log(this.lng);
      /* 创建地址解析器的实例 */
   let geoCoder = new BMap.geocoder();
      /* 获取位置对应的坐标 */
      geoCoder.getLocationPoint(this.addressKeyword, point => {
        this.selectedLng = point.lng;
        this.selectedLat = point.lat;
      });
      /* 利用坐标获取地址的详细信息 */
      geocoder.getLocation(e.point, res => {
        console.log(res);
      });
    }
  }

  //
};
</script>
<style>
.app-set-page {
  padding: 20px;
}
.map{
  width: 100%;
  height: 600px;
}

</style>