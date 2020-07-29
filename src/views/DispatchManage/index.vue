<template>
  <div class="login-container">派单</div>
</template>
<script>
export default {
  data() {
    return {
      showDialog: false
    };
  },
      mounted() {
    localStorage.setItem("activeMenu", "dispatchmanage");
  },
  created() {},
  methods: {}
};
</script>
<style>
</style>