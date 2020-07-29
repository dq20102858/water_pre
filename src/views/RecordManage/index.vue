<template>
  <div class="login-container">打卡</div>
</template>
<script>
export default {
  data() {
    return {
      showDialog: false
    };
  },
   mounted() {
    localStorage.setItem("activeMenu", "recordmanage");
  },
  created() {},
  methods: {}
};
</script>
<style>
</style>