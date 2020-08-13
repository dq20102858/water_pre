<template>
  <div class="net-navbar" mode="horizontal">
    <div class="el-menu-top">
      <div class="logos">
        <img class="logo" :src="require('@/assets/image/logo.png')" />
        <div class="gname">
          <h3>某公司智能污水处理站监控系统</h3>
          <h4>
            欢迎您，{{name}}
            <span title="退出系统" @click="logout">
              <i class="el-icon-switch-button"></i>退出系统
            </span>
          </h4>
        </div>
      </div>
      <ul class="el-menu--horizontal el-menu">
        <li
          v-for="(item,index)  in menuList"
          @click="routerLink(index,item.path)"
          :key="item.id"
          :class="activeMenu === item.path ? 'el-menu-item is_active' : 'el-menu-item'"
          :id="item.path"
        >
          <img class="iconss" :src="item.img" />
          {{item.name}}
        </li>
        <!-- <li class="el-menu-item" @click="logout">
          <img class="iconss" :src="require('@/assets/image/m_logout.png')" />退出系统
        </li>-->
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "PageNavbar",
  data() {
    return {
      activeMenu: "",
      menuList: [
        {
          name: "站点概览",
          path: "/sitemanage",
          img: require("@/assets/image/m_home.png")
        },
        {
          name: "设备状态",
          path: "/devicemanage",
          img: require("@/assets/image/m_shebeizhuangtai.png")
        },
        {
          name: "运维记录",
          path: "/recordmanage",
          img: require("@/assets/image/m_jilu.png")
        },
        {
          name: "运维派单",
          path: "/dispatchmanage",
          img: require("@/assets/image/m_paidan.png")
        },
        {
          name: "告警列表",
          path: "/warningmanage",
          img: require("@/assets/image/m_alert.png")
        },
        {
          name: "考勤打卡",
          path: "/attendancemanage",
          img: require("@/assets/image/m_daka.png")
        },
        {
          name: "系统设置",
          path: "/setmanage",
          img: require("@/assets/image/m_set.png")
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles", "sys_role", "system"])
  },
  mounted() {
    this.activeMenu = sessionStorage.getItem("activeMenu");
    console.log(this.activeMenu);
  },
  methods: {
    routerLink(index, path) {
      this.activeMenu = path;
      console.log(path)
      this.$router.push(path);
      sessionStorage.setItem("activeMenu", this.activeMenu);
    },
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
    }
  }
};
</script>
<style>
</style>
