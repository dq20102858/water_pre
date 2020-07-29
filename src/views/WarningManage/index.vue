<template>
  <div class="login-container">告警</div>
</template>
<script>
export default {
  data() {
    return {
      showDialog: false
    };
  },
  mounted() {
    localStorage.setItem("activeMenu", "warningmanage");
  },
  created() {},
  methods: {}
};
</script>
<style>
</style>