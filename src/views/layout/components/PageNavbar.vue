<template>
  <div class="net-navbar" mode="horizontal">
    <div class="el-menu-top">
      <el-menu router default-active="SiteManage" mode="horizontal">
        <li class="logos">
          <img :src="require('@/assets/image/logo.png')" />某某某公司智能污水处理站监控系统
        </li>
        <el-menu-item index="SiteManage"><img class="iconss" :src="require('@/assets/image/m_device.png')" />站点分布</el-menu-item>
        <el-menu-item index="DeviceManage"><img class="iconss" :src="require('@/assets/image/m_device.png')" />设备状态</el-menu-item>
        <el-menu-item index="OperationManage"><img class="iconss" :src="require('@/assets/image/m_device.png')" />运维记录</el-menu-item>
        <el-menu-item index="DispatchManage"><img class="iconss" :src="require('@/assets/image/m_device.png')" />运维派单</el-menu-item>
        <el-menu-item index="WarningManage"> <img class="iconss" :src="require('@/assets/image/m_device.png')" />告警列表</el-menu-item>
        <el-menu-item index="SetManage"> <img class="iconss" :src="require('@/assets/image/m_set.png')" />设置</el-menu-item>
      </el-menu>
    </div>
    <div class="right-menu">
      <span v-if="sys_role==1">
        <router-link v-show="isShow" class="applylink" to="weekplanapply">
          <i class="el-icon-message"></i>
        </router-link>
      </span>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img class="user-avatar" :src="avatar" /> -->
          <span style="font-size:12px;">欢迎您，{{name}}</span>

          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="logout" style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched;
      this.levelList = matched;

      this.request({
        url: "/apply/getApplyLogs",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          if (data.data.length > 0) {
            this.isShow = true;
          }
        }
      });
    },
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
    handleCommand(system) {
      this.$store.dispatch("ChangeSystem", system).then(() => {
        location.href = "/";
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">

  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      margin-right: 30px;
      float: right;
      margin-top: -2px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 10px;
          display: inline-block;
          vertical-align: middle;
        }
        span {
          display: inline-block;
          max-width: 120px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          vertical-align: middle;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -10px;
          top: 18px;
          font-size: 12px;
        }
      }
    }
    .select-system {
      margin-right: 20px;
      .el-button {
        width: 200px;
        text-align: left;
      }
      .el-icon--right {
        float: right;
      }
    }
    .el-button--primary {
      background-color: rgba(64, 158, 255, 0.05);
      color: #333;
    }
    .el-button-group .el-button--primary:first-child {
      border-right-color: #409eff;
      width: 180px;
      text-align: left;
    }
    .el-button-group .el-button:not(:last-child) {
      margin: auto;
    }
  }
  .msg-num {
    position: absolute;
    left: 15px;
    top: 7px;
    display: inline-block;
    padding: 0 4px;
    font-size: 11px;
    color: #fff;
    line-height: initial;
    background-color: #f1403c;
    border: 2px solid #fff;
    border-radius: 20px;
    font-weight: bold;
  }
</style>
