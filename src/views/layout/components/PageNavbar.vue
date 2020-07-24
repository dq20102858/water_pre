<template>
  <el-menu class="navbar" mode="horizontal">
    <page-hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></page-hamburger>
    <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    </el-breadcrumb>
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
  </el-menu>
</template>
<script>
import { mapGetters } from "vuex";
import PageHamburger from "./PageHamburger";
export default {
  name: "PageNavbar",
  data() {
    return {
      levelList: null,
      isShow: false
    };
  },
  components: {
    PageHamburger
  },
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
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
    position: relative;
    .el-icon-bell {
      margin-top: 12px;
      margin-right: 20px;
    }
  }
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
}
.applylink {
  color: #f1403c;
  margin-right: 20px;
  font-size: 14px;
}
.applylink i {
  font-size: 16px;
}
.applylink:visited {
  color: #f1403c;
}
.applylink:hover {
  color: #f00;
}
</style>
