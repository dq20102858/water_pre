<template>
    <div id="app" v-loading.fullscreen="showLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.01)">
        <router-view v-if="reload"></router-view>
    </div>
</template>
<script>
    export default {
      name: "App",
      data() {
        return {
          showLoading: false,
          reload: true 
        };
      },
      mounted() {
        this.globalEvBus.$on("showLoading", () => {
          this.showLoading = true;
        });
        this.globalEvBus.$on("hideLoading", () => {
          this.showLoading = false;
        });
        this.globalEvBus.$on("reload", () => {
          this.reload = false;
          this.$nextTick(() => {
            this.reload = true;
          });
        });
      }
    };
</script>
<style>
/* public css */
p,div,h1,h2,h3,h4,ul,li,span{margin: 0;padding: 0;}
.app-pages{margin: 15px;}
.app-nowarp{white-space: nowrap;text-overflow: initial}
.app-nowarp .cell{white-space: nowrap;text-overflow: initial;}
/* table css */
.app-table .el-table-column--selection .cell{padding-left: 17px;}
.app-table .el-table__header-wrapper{background: #157bb7;border-radius: 6px 6px 0 0;padding: 0 0;}
.app-table .el-table__header-wrapper tr th{background: #157bb7;color:#fff;border-bottom: none!important;font-size: 14px;}
.app-table .el-table__header-wrapper .is-leaf{border-bottom: none;}
.app-table .el-table__body-wrapper {border:1px #e7eeff solid}
.app-table .el-table__body-wrapper tr:nth-child(odd){background:#e7eeff;}
.app-table .el-table__body-wrapper tr td{color: #1D397A;}
</style>