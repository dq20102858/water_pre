<template>
  <div id="search">
    <div class="el-menu-top">
      <el-menu router default-active="search" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-search.png')" />查询统计
        </li>
        <el-menu-item index="search">报警查询</el-menu-item>
        <el-menu-item index="overspeed">车辆超速处理</el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div class="app-page-container">
        <div class="app-page-select">
          <el-form :model="searchForm" :inline="true">
            <el-form-item label="列车">
              <el-select v-model="searchForm.loco_id" placeholder="请选择列车" clearable>
                <el-option
                  v-for="item in getLocomotiveList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="searchForm.alert_type" placeholder="请选择类型" clearable>
                <el-option label="超速报警" value="1"></el-option>
                <el-option label="临近报警" value="2"></el-option>
                <el-option label="防区报警" value="3"></el-option>
                <el-option label="防护牌报警" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker v-model="searchForm.start_time" type="date"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker v-model="searchForm.end_time" type="date"></el-date-picker>
            </el-form-item>
            <el-form-item class="form-so">
              <label class="el-form-item__label"></label>
              <el-button size="small" icon="el-icon-search" type="primary" @click="pageSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="app-table">
          <el-table :data="dataList">
            <el-table-column label="编号">
              <template scope="scope">
                <span>{{scope.$index+(page_cur - 1) * page_size + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="loco" label="机车名称"></el-table-column>
            <el-table-column prop="speed" label="速度"></el-table-column>
            <el-table-column label="位置">
              <template slot-scope="scope">
                <b>DK</b>
                {{scope.row.start_flag}} + {{scope.row.start_length}}
              </template>
            </el-table-column>
            <el-table-column prop="line_type" label="线别"></el-table-column>
            <el-table-column label="报警类型">
              <template scope="scope">
                <span v-if="scope.row.alert_type==1">超速报警</span>
                <span v-if="scope.row.alert_type==2">临近报警</span>
                <span v-if="scope.row.alert_type==3">防区报警</span>
                <span v-if="scope.row.alert_type==4">防护牌报警</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="报警时间"></el-table-column>
            <el-table-column prop="description" label="报警内容" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-red" size="mini" @click="goDel(scope.row.id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="app-pagination">
            <el-pagination
              class="pagination"
              v-if="dataList.length !== 0"
              layout="slot,prev, pager, next,slot,total"
              :page-size="this.page_size"
              :current-page="this.page_cur"
              :total="this.page_items"
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
      searchForm: {},
      page_cur: 1,
      page_items: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      getLocomotiveList: []
    };
  },
  created() {
    this.getLocomotiveLists();
    this.getDataList();
  },
  methods: {
    //选择机车
    getLocomotiveLists() {
      this.request({
        url: "dispatch/getLocomotiveLists",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.getLocomotiveList = data.data;
        }
      });
    },
    getDataList() {
      let page = this.page_cur;
      let loco_id = this.searchForm.loco_id;
      let alert_type = this.searchForm.alert_type;
      let start_time = this.searchForm.start_time;
      let end_time = this.searchForm.end_time;
      this.request({
        url: "/search/getAlertPages",
        method: "get",
        params: {
          page,
          loco_id,
          alert_type,
          start_time,
          end_time
        }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataList = data.data.data;
          this.page_cur = parseInt(data.data.current_page);
          this.page_items = data.data.total;
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
      this.page_cur = 1;
      this.getDataList();
    },
    pageToLast() {
      this.page_cur = this.page_total;
      this.getDataList();
    },
    pageSearch() {
      this.page_cur = 1;
      this.getDataList();
    },
    goDel(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
        ,customClass:"el-message-box-new"
      }).then(() => {
        this.request({
          url: "/search/deleteAlert",
          method: "post",
          data: { id: id }
        }).then(res => {
          let data = res.data;
          if (data.status == 1) {
            this.$message({
              type: "success",
              message: "删除成功！"
            });
            this.getDataList();
          }
        });
      }).catch(()=>{});
    }
    //
  }
};
</script>