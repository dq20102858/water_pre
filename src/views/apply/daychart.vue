<template>
  <div id="app-apply">
   <div class="el-menu-top">
      <el-menu router default-active="daychart" mode="horizontal">
        <li class="ptitle">无锡地铁三号线</li>
        <el-submenu  index="1">
          <template slot="title">日班计划</template>
          <el-menu-item index="daychart">日班图表</el-menu-item>
          <el-menu-item index="apply">已班列表</el-menu-item>
          <el-menu-item index="conflictcheck">冲突检测</el-menu-item>
        </el-submenu>
        <el-menu-item><router-link :to="{name:'weekplan'}">周计划</router-link></el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div class="app-page-container">
        <div>welcoem vue daychart</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "daychart",
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {
  }
};
</script>
<style>
.el-menu--collapse .el-menu .el-submenu, .el-menu--popup {min-width: 124px;text-align: center; padding: 0;}
.el-menu--horizontal .el-menu .el-menu-item.is-active, .el-menu--horizontal .el-menu .el-submenu.is-active>.el-submenu__title{ background: #4b6eca;color: #fff}
</style>
