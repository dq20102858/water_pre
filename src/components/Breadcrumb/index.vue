<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.meta.title'>
        <router-link v-if='index==levelList.length-1' :to="item.path">
       <span class="no-redirect">{{item.meta.title}}</span>
      </router-link>
        <!-- <span v-if='index==levelList.length-1' class="no-redirect">{{item.meta.title}}</span> -->
        <span v-else style="cursor:text;">{{item.meta.title}}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    linkUrl(paras){
      this.$router.push(paras)
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      // const first = matched[0];
      // if (first && first.name !== 'collect') {
      //   matched = [{ path: '/collect', meta: { title: 'collect' }}].concat(matched)
      // }
      this.levelList = matched;
      console.log(this.levelList);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
