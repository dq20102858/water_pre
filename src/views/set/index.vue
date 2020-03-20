<template>
  <div id="monitor">
    <div class="el-menu-top">
      <el-menu router default-active="location" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-location.png')" />设置
        </li>
        <el-menu-item index="device">站点设置</el-menu-item>
        <el-menu-item index="location">限速设置</el-menu-item>
        <el-menu-item index="walldetector">防区设置</el-menu-item>
        <el-menu-item index="cardetector">桥设置</el-menu-item>
        <el-menu-item index="locationbind">隧道设置</el-menu-item>
        <el-menu-item index="locationbind">坡度设置</el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div class="app-page-container"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>