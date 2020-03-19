<template>
  <div id="app-apply">
    <div class="el-menu-top">
      <el-menu router default-active="weekplan" mode="horizontal">
        <li class="ptitle">{{projectName}}</li>
        <el-submenu index="1">
          <template slot="title" style="font-size:16px;">日班计划</template>
          <el-menu-item index="daychart">日班图表</el-menu-item>
          <el-menu-item index="apply">日班列表</el-menu-item>
          <el-menu-item index="conflictcheck">冲突检测</el-menu-item>
        </el-submenu>
        <el-menu-item class="is-active" @click="refpage">周计划</el-menu-item>
      </el-menu>
    </div>
    <div v-if="isParent">
      <div class="app-page">
        <div class="app-page-container-other">
          <div class="app-page-select" style="margin:10px 0">
            <el-form :model="searchForm" :inline="true">
              <el-form-item label="选择时间">
                <el-date-picker
                  v-model="searchForm.time_range"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="选择公司">
                <el-select v-model="searchForm.depart_id" placeholder="请选择公司" clearable>
                  <el-option
                    v-for="item in companyList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="form-so">
                <label class="el-form-item__label"></label>
                <el-button size="small" icon="el-icon-search" @click="getWeekList" type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-row :gutter="20">
            <el-col :span="6" v-for="item in weekList" :key="item.id">
              <div class="grid-content" @click="goDetail(item.id)">
                <div class="grid-title">{{item.description}}</div>
                <div class="grid-box">
                  <p>{{item.start_time}}-{{item.end_time}}</p>
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
              layout="slot,prev, pager, next,slot,total"
              :page-size="this.page_size"
              :current-page="this.page_cur"
              :total="this.pageTotal"
              @current-change="pageChange"
              prev-text="上一页"
              next-text="下一页"
            >
              <button @click="toFirstPage" type="button" class="btn-first">
                <span>首页</span>
              </button>
              <button @click="toLastPage" type="button" class="btn-last">
                <span>尾页</span>
              </button>
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isParent" class="wdetail">
      <div class="app-page-container">
      <div class="wtop">
        <span class="item">作业单位： {{weekdailyList.company}}</span>
        <span class="item">申报时间： {{weekdailyList.create_time}}</span>
        <span class="item">申报人： {{weekdailyList.apply}}</span>
        <span class="item">电话：{{weekdailyList.phone}}</span>
        <span class="itembtn">
          <el-button size="small" @click="goBack" type="primary">返回</el-button>
        </span>
      </div>
      <div class="wmain">
        <div class="app-table">
          <el-table :data="weekdailyList.lists">
            <el-table-column prop="work_time" label="日期" :formatter="dateFormat"></el-table-column>
            <el-table-column prop="type" label="作业类别"></el-table-column>
            <el-table-column prop="work_time" min-width="60" label="作业时间"></el-table-column>
            <el-table-column prop="description" label="作业内容"></el-table-column>
            <el-table-column prop="area" label="作业区域"></el-table-column>
            <el-table-column prop="up_part" label="编组上行端"></el-table-column>
            <el-table-column prop="attention" label="防护措施及要求"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-blue" size="mini">已转换</el-button>
                  <el-button class="btn-blue" size="mini">报表</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="wfoot">
        <span>注：监理需对此项施工或运输的相关条件（如材料设备已到位，边界条件已满足等），进行确认。</span>
        <span class="fr">主管领导：暂无</span>
        <span class="fr">总监：暂无</span>
      </div>
    </div>
  </div> 
  </div>
</template>

<script>
import * as fecha from "element-ui/lib/utils/date";
export default {
  name: "weekplan",

  data() {
    return {
      projectName: "",
      isParent: true,
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      companyList: [],
      weekList: [],
      weekdailyList: [],
      searchForm: {
        depart_id: "",
        time_range: []
      }
    };
  },
  created() {
    this.projectName = localStorage.getItem("projectName");
    this.getCompanyList();
    this.getWeekList();
  },
  methods: {
    refpage() {
      this.isParent = true;
      this.getWeekList();
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
    getWeekList() {
      let page = this.page_cur;
      let depart_id = this.searchForm.depart_id;
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
          this.page_cur = parseInt(data.data.current_page);
          this.pageTotal = data.data.total;
          this.page_size = data.data.per_page;
          this.page_total = data.data.last_page;
        }
      });
    },
    pageChange(value) {
      this.page_cur = value;
      this.getWeekList();
    },
    toFirstPage() {
      this.pageChange(1);
    },
    toLastPage() {
      this.page_cur = this.page_total;
      this.pageChange(this.page_total);
    },
    goDetail(id) {
      this.isParent = false;
      let wid = id;
      this.request({
        url: "/apply/getWeekDailyLists",
        method: "get",
        params: { wid }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.weekdailyList = data.data;
        }
      });
    },
    goBack() {
      this.isParent = true;
    },
    dateFormat(row, column, cellValue) {
      return cellValue
        ? fecha.format(new Date(cellValue), "yyyy年MM月dd日")
        : "";
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
  text-align: center;
}
.grid-content .grid-box {
  padding: 30px 0;
}
.grid-content .grid-box p {
  color: #4b6eca;
  line-height: 28px;
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
.wdetail {
  padding: 20px;
}
.wmain .el-table {
  background: #fff;
}
.wtop {
  margin-bottom: 15px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
.wtop .item {
  color: #4b6eca;
  display: inline-block;
  margin-right: 24px;
  font-size: 18px;
  padding-top: 5px;
}
.wfoot .itembtn {
  vertical-align: -3px;
}
.wfoot {
  margin-top: 20px;
  overflow: hidden;
  display: flex;
  justify-content:flex-start;
}
.wfoot span {
  color: #4b6eca;
  float: left;
  margin-right: 24px;
  font-size: 18px;
  display: block;min-width: 160px;
}
.wfoot .fr {
  float: right;
}
</style>


