<template>
  <div class="login-container">运维</div>
</template>
<script>
export default {
  data() {
    return {
      showDialog: false
    };
  },
    mounted() {
    localStorage.setItem("activeMenu", "operationmanage");
  },
  created() {},
  methods: {}
};
</script>
<style>
</style>