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
body{background: #E7EEFF; height: 100%; width: 100%; font-size: 14px;margin: 0;padding: 0; }

/* public css */
p,div,h1,h2,h3,h4,ul,li,span{margin: 0;padding: 0;}
.app-pages{margin: 15px;}
.app-nowarp{white-space: nowrap;text-overflow: initial}
.app-nowarp .cell{white-space: nowrap;text-overflow: initial;}
.el-button--primary{background: #4b6eca;border-color:#4b6eca}
.pull-left{float: left;}
.pull-right{float: right;}
.text-right{text-align: right}
.blank{height:5px;clear: both;}
/* hideSidebar */
#app .sidebar-container{z-index: 500;}
#app .hideSidebar .submenu-title-noDropdown .el-tooltip{padding:0 5px!important;}
/* layer */
.vl-notify-mask { background-color: #000;opacity: .5;}
.vl-notify.vl-notify-alert h2.vl-notice-title{height: 52px;line-height: 53px;border-radius:6px 6px 0 0; background: #3655a5;text-align: center;}
.vl-notice-title span{color: #fff;font-size: 18px;}
.vl-notify.vl-notify-main{border: none;border-radius:6px;}
.vl-notify.vl-notify-alert h2.vl-notice-title .icon-remove {position: absolute;right: 13px;font-size: 14px;text-shadow: 0 1px 0 hsla(0,0%,100%,.5);top: 13px; font-weight: 700;cursor: pointer;color: #fff;font-style: normal;background: #1d397a;border-radius: 100%; height: 22px;width: 22px; line-height: 22px;}
/* bg */
.app-body-black{background: #000; }
.app-page{padding: 20px;}
.app-page-container{border-radius: 6px;padding: 20px; background: #fff;}
.app-page-select{display: block;}
.app-page-select .select-from-inline{display: inline-block;white-space: nowrap;width: 100%;}

/* table css */
.app-table .el-table-column--selection .cell{padding-left: 17px;}
.app-table .el-table__header-wrapper{background: #3655a5;border-radius: 6px 6px 0 0;padding: 0 0;}
.app-table .el-table__header-wrapper tr th{background: #3655a5;color:#fff;border-bottom: none!important;font-size: 14px;}
.app-table .el-table__header-wrapper .is-leaf{border-bottom: none;}
.app-table .el-table__body-wrapper {border:1px #e7eeff solid}
.app-table .el-table__body-wrapper tr:nth-child(odd){background:#e7eeff;}
.app-table .el-table__body-wrapper tr td{color: #1D397A;}
.app-operation{display: inline;white-space: nowrap}
.app-operation .btn-blue{ border: 1px #4b6eca solid;color: #1d397a}
.app-operation .btn-red{border: 1px #ff5c75 solid;color: #ff5c75}
.app-operation .btn-green{border: 1px #27db07 solid;color: #243f7e}
.app-operation .el-button{margin-left: 0!important;margin-right: 5px;padding: 7px 10px;background: none}
.app-operation .el-button:hover{opacity: 0.5;}
/*pagination */
.app-pagination{text-align: right;margin-top: 20px;}
.app-pagination .el-pagination {border-radius: 4px;overflow: hidden; display: inline-block;padding: 0; margin: 20px 0;border: 1px solid #9db9fa;}
.app-pagination .el-pagination .el-pager li{background-color: #fff ;color: #1d397a; border-left: 1px solid #9db9fa;color: #337ab7;float: left;padding: 0 12px; position: relative; text-decoration: none;}
.app-pagination .el-pagination .el-pager li.active{background: #3655a5;color: #fff;}
.app-pagination .el-pagination .el-pager li:hover{background: #fafafa;color: #3655a5;}
.app-pagination .el-pagination .more::before{line-height: 0!important}
.app-pagination .el-pagination .btn-prev{margin: 0;padding: 0;}
.app-pagination .el-pagination .btn-prev span{color: #1d397a; margin-left: 0;padding: 0 6px;border-top-right-radius: 4px; border-bottom-left-radius: 4px;  }
.app-pagination .el-pagination .btn-next{margin: 0;padding: 0;}
.app-pagination .el-pagination .btn-next span{color: #1d397a; margin-left: 0;padding: 0 6px; border-left: 1px solid #9db9fa;border-right: 1px solid #9db9fa; }
.app-pagination .el-pagination .el-pagination__total{color: #1d397a; padding-left: 6px;}
/* dialog */
.app-dialog .el-dialog{border-radius: 6px;}
.app-dialog .el-dialog__header{border-radius:6px 6px 0 0; background: #3655a5;text-align: center;padding:12px;}
.app-dialog .el-dialog__title{color: #fff;font-size: 18px;}
.app-dialog .el-dialog__headerbtn{top:16px; background: #1d397a;border-radius: 100%;height: 22px;width: 22px;padding: 2px;color:#fff;}
.app-dialog .el-dialog__headerbtn:hover{background: #fff;color:#1d397a }

.app-dialog-form .el-form-item__label {color: #1d397a;}
.app-dialog-form .el-input input {border: 1px #9db9fa solid;color: #4b6eca}
.app-dialog-form .el-textarea__inner {border: 1px #9db9fa solid;color: #4b6eca;}
</style>