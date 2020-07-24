<template>
    <div class="app-wrapper" :class="classObj">
        <div class="main-container">
            <page-navbar :msg="msg"></page-navbar>
            <page-main></page-main>
        </div>
    </div>
</template>
<script>
    import { PageNavbar, PageMain } from "./components";
    // import ResizeMixin from "./mixin/ResizeHandler";
    export default {
      data() {
        return {
          msg: 0,
        }
      },
      components: {
        PageNavbar,
        PageMain
      },
      // mixins: [ResizeMixin],
      computed: {
        sidebar() {
          console.log(this.$store.state.app);
          return this.$store.state.app.sidebar;
        },
        device() {
          return this.$store.state.app.device;
        },
        classObj() {
          return {
            withoutAnimation: this.sidebar.withoutAnimation,
            mobile: this.device === "mobile"
          };
        }
      },
      methods: {
      
      }
    };
</script>