<template>
        <transition name="fade" mode="out-in">
            <keep-alive v-if="isRouterAlive" :include="cachedViews">
                <router-view :key="key"></router-view>
            </keep-alive>
        </transition>
</template>
<script>
    export default {
      provide() {
         return {
             reload: this.reload
         }
      },
      data () {
          return {
              isRouterAlive: true,
          }
      },
      computed: {
        cachedViews() {
            return this.$store.state.tagsView.cachedViews
        },
        key() {
            return this.$route.fullPath
        }
    },
      methods: {
        reload() {
              this.isRouterAlive = false;
              this.$nextTick(() => {
                  this.isRouterAlive = true;
              });
          }
      }
    };
</script>
