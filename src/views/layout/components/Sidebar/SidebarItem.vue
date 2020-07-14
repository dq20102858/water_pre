<template>
  <div id="app-menu-items" class="app-menu-item menu-wrapper">
    <template v-for="item in routes">
      <router-link
        @click.native="activeSel($event,item.path+'/'+item.children[0].path)"
        v-if="item.redirect=='dashboard'"
        :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name"
      >
        <el-menu-item
          :index="item.path+'/'+item.children[0].path"
          :id="'menu_'+item.children[0].path"
          :class="{'is_active':isActive}"
        >
          <em v-if="item.children[0].path !=''">
            <img :src="require('@/assets/image/m_'+item.children[0].path+'.png')" />
          </em>
           <em v-else>
            <img :src="require('@/assets/image/m_detault.png')" />
          </em>
          <span
            v-if="item.children[0].meta&&item.children[0].meta.title"
            slot="title"
          >{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>
<script>
export default {
  name: "SidebarItem",
  data() {
    return {
      isActive: false
    };
  },
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    activeSel(event, url) {
      this.isActive = !this.isActive;
    },
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden;
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style>

.app-menu-item .el-menu-item em img {
  width: 24px;
  vertical-align: middle;
}
.app-menu-item .el-menu-item span {
  color: #fff;
  font-weight: 700;
  padding-left: 10px;
  font-size: 15px;
}
.app-menu-item .el-menu-item.is-active {
  background-image: linear-gradient(to right, #7391e3, #5478dd);
  border-left: 4px #fff solid;
  padding-left: 16px !important;
}
.app-menu-item .el-menu-item.is-active:hover {
  background-image: linear-gradient(to right, #7391e3, #5478dd) !important;
  border-left: 4px #fff solid;
  padding-left: 16px !important;
}
.app-menu-item .el-menu-item:hover {
  background: none;
}
</style>
