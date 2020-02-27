<template>
  <div id="app-apply">
    <div class="el-menu-top">
      <el-menu router mode="horizontal">
        <li class="ptitle">无锡地铁三号线</li>
        <el-submenu index="1" class="is-active">
          <template slot="title">日班计划</template>
          <el-menu-item index="daychart">日班图表</el-menu-item>
          <el-menu-item class="is-active" index="apply">已班列表</el-menu-item>
          <el-menu-item index="conflictcheck">冲突检测</el-menu-item>
        </el-submenu>
        <el-menu-item index="weekplan">周计划</el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div class="app-page-container">
        <div class="app-page-select">
          <el-form :model="searchForm" :inline="true">
            <el-form-item>
              <el-select v-model="searchForm.depart_id" placeholder="请选择公司" clearable>
                <el-option
                  v-for="item in companyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.line_type" placeholder="请选择线别" clearable>
                <el-option
                  v-for="item in lineList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.type" placeholder="请选择类型" clearable>
                <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.start_station" placeholder="请选择起始车站" clearable>
                <el-option
                  v-for="item in stationList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.end_station" placeholder="请选择结束车站" clearable>
                <el-option
                  v-for="item in stationList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="searchForm.time_range"
                type="daterange"
                range-separator="至"
                start-placeholder="选择开始日期"
                end-placeholder="选择结束日期"
                :default-time="['00:00:00', '23:59:59']"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
                <el-option
                  v-for="item in statusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="form-so">
              <label class="el-form-item__label"></label>
              <el-button size="small" icon="el-icon-search" @click="getDataList" type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- end search -->
        <div class="app-table">
          <el-table :data="dataList">
            <el-table-column prop="number" label="作业编号"></el-table-column>
            <el-table-column prop="command_num" label="作业令号"></el-table-column>
            <el-table-column prop="description" label="作业内容"></el-table-column>
            <el-table-column prop="status" label="当前状态"></el-table-column>
            <el-table-column prop="next_status" label="下一步状态"></el-table-column>
            <el-table-column prop="company" label="公司简称"></el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-blue" size="mini" @click="goDetail(scope.row.id)">详情</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="app-pagination">
            <el-pagination
              class="pagination"
              v-if="dataList.length !== 0"
              layout="prev, pager, next,total"
              :page-size="this.per_page"
              :current-page="this.pageCur"
              :total="this.pageTotal"
              @current-change="pageChange"
              prev-text="上一页"
              next-text="下一页"
            ></el-pagination>
          </div>
        </div>
        <!-- end table -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageCur: 1,
      pageTotal: 0,
      per_page: 20,
      companyList: [],
      lineList: [],
      typeList: [
        { id: 1, name: "A1" },
        { id: 2, name: "A2" },
        { id: 3, name: "A3" },
        { id: 4, name: "A4" }
      ],
      stationList: [],
      statusList: [
        { id: 1, name: "未批复" },
        { id: 2, name: "同意" },
        { id: 3, name: "拒绝" },
        { id: 4, name: "完成" },
        { id: 5, name: "已消点" }
      ],
      dataList: [],
      searchForm: {
        depart_id: "",
        line_type: "",
        type: "",
        start_station: "",
        end_station: "",
        time_range: [],
        status: ""
      }
    };
  },
  created() {
    this.getDataList();
    this.getCompanyList();
    this.getLineType(); //线别
    this.getStationList(); //车站
  },
  methods: {
    getDataList() {
      let page = this.pageCur;
      let depart_id = this.searchForm.depart_id;
      let line_type = this.searchForm.line_type;
      let type = this.searchForm.type;
      let start_station = this.searchForm.start_station;
      let end_station = this.searchForm.end_station;
      let time_range = this.searchForm.time_range;
      let status = this.searchForm.status;
      this.request({
        url: "/apply/getApplyPages",
        method: "get",
        params: {
          page,
          depart_id,
          line_type,
          type,
          start_station,
          end_station,
          time_range,
          status
        }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataList = data.data.data;
          this.pageCur = parseInt(data.data.current_page);
          this.pageTotal = data.data.total;
          this.per_page = data.data.per_page;
        }
      });
    },
    pageChange(value) {
      this.pageCur = value;
      this.getDataLists();
    },
    getCompanyList() {
      this.request({
        url: "/apply/getCompanyLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.companyList = data.data;
        }
      });
    },
    getLineType() {
      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.lineList = data.data;
        }
      });
    },
    getStationList() {
      this.request({
        url: "/apply/getStationLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.stationList = data.data;
        }
      });
    },
    goDetail: function(id) {}
  }
};
</script>
<style>
.el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
  min-width: 124px;
  text-align: center;
  padding: 0;
}
.el-menu--horizontal .el-menu .el-menu-item.is-active,
.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {
  background: #4b6eca;
  color: #fff;
}
</style>
