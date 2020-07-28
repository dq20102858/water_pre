<template>
  <div class="net-navbar" mode="horizontal">
    <div class="el-menu-top">
      <el-menu router default-active="SiteManage" mode="horizontal">
        <li class="logos">
          <img class="logo" :src="require('@/assets/image/logo.png')" />
          <div class="gname">
            <h3>某公司智能污水系统</h3>
            <h4>欢迎您，{{name}}  <span title="退出系统"  @click="logout"><i class="el-icon-switch-button"></i>退出系统</span></h4>
          </div>
        </li>
        <el-menu-item index="/sitemanage">
          <img class="iconss" :src="require('@/assets/image/m_zhandian.png')" />站点分布
        </el-menu-item>
        <el-menu-item index="/devicemanage">
          <img class="iconss" :src="require('@/assets/image/m_shebeizhuangtai.png')" />设备状态
        </el-menu-item>
        <el-menu-item index="/operationmanage">
          <img class="iconss" :src="require('@/assets/image/m_jilu.png')" />运维记录
        </el-menu-item>
        <el-menu-item index="/dispatchmanage">
          <img class="iconss" :src="require('@/assets/image/m_jilu.png')" />运维派单
        </el-menu-item>
        <el-menu-item index="/warningmanage">
          <img class="iconss" :src="require('@/assets/image/m_jilu.png')" />告警列表
        </el-menu-item>
        <el-menu-item index="/warningmanage">
          <img class="iconss" :src="require('@/assets/image/m_kaopin.png')" />打卡记录
        </el-menu-item>
        <el-menu-item id="setmanage" index="/setmanage">
          <img class="iconss" :src="require('@/assets/image/m_kaopin.png')" />设置
        </el-menu-item>
        <!-- <el-menu-item @click="logout">
          <img class="iconss" :src="require('@/assets/image/m_kaopin.png')" />退出
        </el-menu-item> -->
      </el-menu>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "PageNavbar",
  data() {
    return {
      activeIndex: "1",
      levelList: null,
      isShow: false
    };
  },
  components: {},
  computed: {
    ...mapGetters(["sidebar", "name", "avatar", "roles", "sys_role", "system"])
  },
  // watch: {
  //   $route() {
  //     this.getBreadcrumb();
  //   }
  // },
  // created() {
  //  // this.getBreadcrumb();
  // },
  methods: {
    // getBreadcrumb() {
    //   let matched = this.$route.matched;
    //   this.levelList = matched;

    //   this.request({
    //     url: "/apply/getApplyLogs",
    //     method: "get"
    //   }).then(response => {
    //     let data = response.data;
    //     if (data.status == 1) {
    //       if (data.data.length > 0) {
    //         this.isShow = true;
    //       }
    //     }
    //   });
    // },
    // toggleSideBar() {
    //   this.$store.dispatch("toggleSideBar");
    // },
    logout() {
      this.$confirm("您确定要退出当前系统？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
          });
        })
        .catch(() => {});
    },
    handleCommand(system) {
      this.$store.dispatch("ChangeSystem", system).then(() => {
        location.href = "/";
      });
    }
  }
};
</script>
<style>
</style>
