<template>
    <div class="app-wrapper" :class="classObj">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <navbar :msg="msg"></navbar>
            <!-- <tags-view></tags-view> -->
            <app-main></app-main>
        </div>
    </div>
</template>
<script>
    import { Navbar, Sidebar, AppMain } from "./components";
    // import ResizeMixin from "./mixin/ResizeHandler";
    export default {
      name: "layout",
      data() {
        return {
          msg: 0,
        }
      },
      components: {
        Navbar,
        Sidebar,
        AppMain
      },
      // mixins: [ResizeMixin],
      computed: {
        sidebar() {
          return this.$store.state.app.sidebar;
        },
        device() {
          return this.$store.state.app.device;
        },
        classObj() {
          return {
            hideSidebar: !this.sidebar.opened,
            withoutAnimation: this.sidebar.withoutAnimation,
            mobile: this.device === "mobile"
          };
        }
      },
      methods: {
        handleClickOutside() {
          this.$store.dispatch("closeSideBar", { withoutAnimation: false });
        }
      }
    };
</script>