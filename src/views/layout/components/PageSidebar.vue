<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      class="app-menu"
      mode="vertical"
      :show-timeout="200"
      >
      <!-- :default-active="$route.path"
      :collapse="isCollapse"
    > -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="dashboard">我的消息</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>

      <!-- <sidebar-item :routes="permission_routers"></sidebar-item> -->
      <!-- <li>
             <router-link  to="dashboard">
我的链接
 </router-link> 
      </li>-->
    </el-menu>
  </el-scrollbar>
</template>
<script>
import { mapGetters } from "vuex";
// import SidebarItem from "./SidebarItem";
export default {
  components: {},
  computed: {
    // ...mapGetters(["permission_routers", "sidebar"]),
    // isCollapse() {
    //   return !this.sidebar.opened;
    // }
  }
};
</script>
<style>
.sidebar-container .el-scrollbar__wrap {
  background-image: linear-gradient(#6289f2, #4b6eca, #3b5cae, #1d397a);
  height: 100%;
}
.sidebar-container .app-menu {
  padding: 10px 0;
}
.sidebar-container .app-menu.el-menu {
  background: none;
}

.app-menu-item .el-menu-item em img {
  width: 24px;
  vertical-align: middle;
}
.app-menu-item .el-menu-item span {
  color: #fff;
  font-weight: 700;
  padding-left: 10px;
  font-size: 15px;
}
.app-menu-item .el-menu-item.is-active {
  background-image: linear-gradient(to right, #7391e3, #5478dd);
  border-left: 4px #fff solid;
  padding-left: 16px !important;
}
.app-menu-item .el-menu-item.is-active:hover {
  background-image: linear-gradient(to right, #7391e3, #5478dd) !important;
  border-left: 4px #fff solid;
  padding-left: 16px !important;
}
.app-menu-item .el-menu-item:hover {
  background: none;
}
</style>