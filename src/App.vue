<template>
    <div id="app" v-loading.fullscreen="showLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.01)">
        <router-view v-if="reload"></router-view>
    </div>
</template>
<script>
    export default {
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

</style>