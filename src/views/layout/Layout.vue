<template>
  <div class="app-wrapper">
    <page-navbar></page-navbar>
    <router-view></router-view>
    <!-- <page-main></page-main> -->
  </div>
</template>
<script>
import { PageNavbar } from "./components";
export default {
  data() {
    return {
      msg: 0
    };
  },
  components: {
    PageNavbar
  },
  methods: {}
};
</script>