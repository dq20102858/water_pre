<template>
  <div class="app-set-page">
<el-row :gutter="20">
  <el-col :xs="8" :sm="8" :md="8" :lg="3" :xl="3" class="grid-menu">
     <h5>设置</h5>
    <el-menu router  class="el-menu-vertical-demo">
      <el-menu-item>
      <router-link  to="/setmanage">用户设置</router-link>
      </el-menu-item>
      <el-menu-item>
          <router-link  to="/setmanage/users">人员设置</router-link>
      </el-menu-item>
      <el-menu-item>
          <router-link  to="/setmanage/site">站点设置</router-link>
      </el-menu-item>
       <el-menu-item>
          <router-link to="/setmanage/warning">告警设置</router-link>
      </el-menu-item>
    </el-menu>
    </el-col>
  <el-col :xs="16" :sm="16" :md="16" :lg="21" :xl="21"><div class="grid-content bg-purple">site</div></el-col>
</el-row>


  </div>
</template>
<script>
export default {
  data() {
    return {
      showDialog: false
    };
  },
  created() {},
  methods: {}
};
</script>
<style>
.app-set-page{padding: 20px;}
.grid-menu h5{background: #71A7F4;color:#fff;
margin: 0;padding: 15px;
}
</style>