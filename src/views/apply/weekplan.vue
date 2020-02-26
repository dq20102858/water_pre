<template>
  <div id="app-apply">
    <div class="el-menu-top">
      <el-menu router default-active="weekplan" mode="horizontal">
        <li class="ptitle">无锡地铁三号线</li>
        <el-submenu>
          <template slot="title" style="font-size:16px;">日班计划</template>
          <el-menu-item index="daychart">日班图表</el-menu-item>
          <el-menu-item index="apply">已班列表</el-menu-item>
          <el-menu-item index="conflictcheck">冲突检测</el-menu-item>
        </el-submenu>
        <el-menu-item index="weekplan">周计划</el-menu-item>
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
    <div v-if="!isParent" class="wdetail">
      <div class="wtop">
        <span class="item">作业单位： 中铁十七局土建06标</span>
        <span class="item">申报时间： 2019年12月03日</span>
        <span class="item">申报人： 葛健</span>
        <span class="item">电话：15705604642</span>
        <span class="itembtn">
          <el-button size="small" @click="goBack" type="primary">返回</el-button>
        </span>
      </div>
      <div class="wmain">
        <div class="app-table">
          <el-table :data="tableData">
            <el-table-column prop="datatimes" label="日期"></el-table-column>
            <el-table-column prop="txt" label="作业类别"></el-table-column>
            <el-table-column prop="txt" label="作业时间"></el-table-column>
            <el-table-column prop="txt" label="作业内容"></el-table-column>
            <el-table-column prop="txt" label="作业区域"></el-table-column>
            <el-table-column prop="txt" label="编组上行端"></el-table-column>
            <el-table-column prop="txt" label="防护措施及要求"></el-table-column>
            <el-table-column prop="txt" label="备注"></el-table-column>
            <el-table-column prop="txt" label="操作" width="140">
              <template slot-scope="scope">
                <div class="app-operation">
                  <!-- @click="goDetail(scope.row.id)" -->
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
        <span class="fr">主管领导：</span>
        <span class="fr">总监：</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "weekplan",

  data() {
    const item = {
      txt: "测试数据库",
      datatimes: "2019-02-16"
    };
    return {
      tableData: Array(10).fill(item),
      isParent: true,
      pageCur: 1,
      pageTotal: 0,
      per_page: 20,
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
    this.getCompanyList();
    this.getWeekList();
  },
  methods: {
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
      let page = this.pageCur;
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
          this.pageCur = parseInt(data.data.current_page);
          this.pageTotal = data.data.total;
          this.per_page = data.data.per_page;
        }
      });
    },
    pageChange(value) {
      this.pageCur = value;
      this.getWeekList();
    },

    goDetail(id) {
      this.isParent = false;
      let wid = wid;
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
  justify-content: space-between;
}
.wfoot span {
  color: #4b6eca;
  float: left;
  margin-right: 24px;
  font-size: 18px;
  display: block;
}
.wfoot .fr {
  float: right;
}
</style>


