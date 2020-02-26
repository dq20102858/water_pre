<template>
  <div id="app-apply">
    <div class="el-menu-top">
      <el-menu router default-active="weekplan" mode="horizontal">
        <li class="ptitle">无锡地铁三号线</li>
        <el-submenu inex="1">
          <template slot="title" style="font-size:16px;">日班计划</template>
          <el-menu-item index="daychart">日班图表</el-menu-item>
          <el-menu-item index="apply">已班列表</el-menu-item>
          <el-menu-item index="conflictcheck">冲突检测</el-menu-item>
        </el-submenu>
        <el-menu-item index="weekplan">周计划</el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div class="app-page-container-other">
        <div class="app-page-select">
          <el-form :model="searchForm" :inline="true">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="searchForm.time_range"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2"
                value-format="yyyy-MM-dd HH:mm"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="选择公司">
              <el-select v-model="searchForm.depart_id" placeholder="请选择" clearable>
                <el-option
                  v-for="item in companyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <el-row :gutter="20">

          <el-col :span="6" v-for="item in weekList" :key="item.id">
            <div class="grid-content">
              <div class="grid-title">{{item.description}}</div>
              <div class="grid-box">
                <p>{{start_time}}-{{end_time}}</p>
                <p>查看周计划</p>
                <img :src="require('@/assets/image/icon-drop.png')" />
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="app-pagination">
          <el-pagination
            class="pagination"
            v-if="weekList.length !== 0"
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
    </div>
  </div>
</template>

<script>
import { publicData } from "@/utils/common";
export default {
  name: "weekplan",
  data() {
    return {
      pageCur: 1,
      pageTotal: 0,
      per_page: 20,
      lidList: [],
      companyList: [],
      weekList: [],
      weekdailyList: [],
      searchForm: {
        depart_id: "",
        time_range: []
      },
      pickerOptions2: publicData.pickerOptions2
    };
  },
  created() {
    this.getWeekList();
    this.getCompanyLists();
  },
  methods: {
    getWeekList() {
      let page = this.pageCur;
      let lid = this.searchForm.depart_id;
      let time_range = this.searchForm.time_range;
      this.request({
        url: "apply/getWeekLists",
        method: "get",
        params: {
          page,
          depart_id,
          time_range
        }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.weekList = data.data.data;
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

    getWeekDailyLists() {
      this.request({
        url: "/apply/getWeekDailyLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.weekdailyList = data.data;
        }
      });
    },
    getCompanyLists() {
      this.request({
        url: "/apply/getCompanyLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.companyList = data.data;
        }
      });
    }
    //end
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

.app-page-container-other {
  padding: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
  background: #fff;
}
.grid-content .grid-title {
  color: #fff;
  background: #3655a5;
  font-size: 16px;
  padding: 12px 0;
  border-radius: 6px 6px 0 0;
}
.grid-content .grid-box {
  padding: 20px 0;
}
.grid-content .grid-box p {
  color: #4b6eca;
  line-height: 24px;
  font-size: 16px;
}
.grid-content .grid-box img {
  display: block;
  margin: 0 auto;
  width: 12px;
  margin-top: 10px;
}
.grid-content .grid-box:hover {
  background: #fafafa;
  box-shadow: 1px 2px 10px 0 rgba(54, 85, 222, 0.3);
  cursor: pointer;
}
.grid-content .grid-box:hover p {
  font-weight: 700;
}
</style>


