<template>
  <div id="monitor">
    <div class="el-menu-top">
      <el-menu router default-active="index" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-set.png')" />设置
        </li>
        <el-menu-item index="index">
          <router-link :to="{path: '/set'}">站点设置</router-link>
        </el-menu-item>
        <el-menu-item index="speed">
          <router-link :to="{path: '/set/speed'}">限速设置</router-link>
        </el-menu-item>
        <el-menu-item index="walldetector">防区设置</el-menu-item>
        <el-menu-item index="bridge">桥设置</el-menu-item>
        <el-menu-item index="locationbind">隧道设置</el-menu-item>
        <el-menu-item index="locationbind">坡度设置</el-menu-item>
      </el-menu>
      <!-- <div @click="goDetail()">to apple</div> -->
    </div>
    <div class="app-page">
      <div class="app-page-container">
        <div class="app-table">
          <el-table :data="dataList">
            <el-table-column prop="id" label="序号"></el-table-column>
            <el-table-column prop="id" label="姓名"></el-table-column>
            <el-table-column prop="id" label="公司名称"></el-table-column>
            <el-table-column prop="id" label="在线时长"></el-table-column>
            <el-table-column prop="id" label="出入场次数查询"></el-table-column>
            <!-- <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-blue" size="mini" @click="goEdit(scope.row.id)">修改</el-button>
                  <el-button class="btn-red" size="mini" @click="goDel(scope.row.id)">删除</el-button>
                </div>
              </template>
            </el-table-column>-->
          </el-table>
          <div class="app-pagination">
            <el-pagination
              class="pagination"
              v-if="dataList.length !== 0"
              layout="slot,prev, pager, next,slot,total"
              :page-size="this.page_size"
              :current-page="this.page_cur"
              :total="this.pageTotal"
              @current-change="pageChange"
              prev-text="上一页"
              next-text="下一页"
            >
              <button @click="pageToFirst" type="button" class="btn-first">
                <span>首页</span>
              </button>
              <button @click="pageToLast" type="button" class="btn-last">
                <span>尾页</span>
              </button>
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      dataList: []
    };
  },
  methods: {
    getDataList() {
      this.request({
        url: "/search/getStationPages",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataList = data.data.data;
          this.page_cur = parseInt(data.data.current_page);
          this.pageTotal = data.data.total;
          this.page_size = data.data.per_page;
          this.page_total = data.data.last_page;
        }
      });
    },
    pageChange(value) {
      this.page_cur = value;
      this.getDataList();
    },
    pageToFirst() {
      this.pageChange(1);
    },
    pageToLast() {
      this.page_cur = this.page_total;
      this.pageChange(this.page_total);
    }
    //
  }
};
</script>