<template>
  <div id="app-weekplan">
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
    <div class="app-page">
      <div class="app-page-container">
        <div v-if="isParent">
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
                  <el-button
                    size="small"
                    icon="el-icon-search"
                    @click="getWeekList"
                    type="primary"
                  >查询</el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-row :gutter="20" v-if="weekList.length>0">
              <el-col :span="6" v-for="item in weekList" :key="item.id">
                <div class="grid-content">
                  <div class="grid-title">
                    {{getWeek(item.start_time)}}
                    <div class="tright">
                      <el-popover
                        popper-class="status-popover"
                        placement="bottom"
                        width="420"
                        trigger="click"
                        @show="getLogList(item.id)"
                      >
                        <div class="status-popovers">
                          <ul class="layui-timeline">
                            <li
                              class="layui-timeline-item"
                              v-for="item in logDataList"
                              :key="item.id"
                            >
                              <i class="el-icon-s-promotion"></i>
                              <div class="layui-timeline-content layui-text">
                                <h3
                                  class="layui-timeline-title"
                                >{{item.create_time+' '+ item.remark}}</h3>
                                <p>{{item.reason}}</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <!-- <el-steps direction="vertical" :active="1">
                            <el-step
                              style="flex-basis:auto"
                              v-for="item in logDataList"
                              :key="item.id"
                              :title="item.create_time+'              '+ item.remark"
                              :description="item.reason"
                              icon="el-icon-s-promotion"
                            ></el-step>
                        </el-steps>-->

                        <el-tag
                          class="statuse1"
                          slot="reference"
                          title="点击查看更多"
                          v-if="item.status==1"
                        >待审核</el-tag>
                        <el-tag
                          class="statuse2"
                          slot="reference"
                          title="点击查看更多"
                          v-if="item.status==2"
                        >审核通过</el-tag>
                        <el-tag
                          class="statuse3"
                          slot="reference"
                          title="点击查看更多"
                          v-if="item.status==3"
                        >拒绝</el-tag>
                        <el-tag
                          class="statuse5"
                          slot="reference"
                          title="点击查看更多"
                          v-if="item.status==5"
                        >审核中</el-tag>
                      </el-popover>
                    </div>
                  </div>
                  <div class="grid-box">
                    <p>申报人员：{{item.apply}}</p>
                    <p>申报单位：{{item.company}}</p>
                    <p>申报时间：{{item.start_time}} ~ {{item.end_time}}</p>
                    <p>
                      <b @click="goDetail(item.id)">查看周计划</b>
                    </p>
                  </div>
                </div>
              </el-col>
            </el-row>
            <div
              v-else
              style="font-size:14px;text-align:center;line-height:50px;color:#909399;"
            >暂无数据</div>
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
        <div v-if="!isParent" class="wdetail">
          <div class="wtop">
            <span class="item" :title="weekdailyList.company">
              <b>作业单位：</b>
              {{weekdailyList.company}}
            </span>
            <span class="item">
              <b>申报时间：</b>
              {{weekdailyList.create_time}}
            </span>
            <span class="item">
              <b>申报人：</b>
              {{weekdailyList.apply}}
            </span>
            <span class="item">
              <b>电话：</b>
              {{weekdailyList.phone}}
            </span>
            <span class="itembtn">
              <el-button size="small" type="primary" @click="goBack">返回</el-button>
              <el-button
                size="small"
                type="primary"
                @click="applyInfo()"
                v-if="weekdailyList.flag==1"
              >审核</el-button>
              <el-button size="small" class="redbtn" v-print="printObj">打印</el-button>
            </span>
          </div>
          <div class="wmain">
            <div class="app-table">
              <el-table :data="weekdailyList.lists">
                <el-table-column prop="work_time" label="日期">
                  <template slot-scope="scope">
                    <span>{{scope.row.work_time | formatDate}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="作业类别"></el-table-column>
                <el-table-column prop="detail_time" min-width="60" label="作业时间"></el-table-column>
                <el-table-column prop="description" label="作业内容"></el-table-column>
                <el-table-column prop="area" label="作业区域"></el-table-column>
                <el-table-column prop="up_part" label="编组上行端"></el-table-column>
                <el-table-column prop="location" label="装车地"></el-table-column>
                <el-table-column prop="attention" label="防护措施及要求"></el-table-column>
                <el-table-column prop="remark" label="备注">
                  <template slot-scope="scope">
                    <span class="statused" v-if="scope.row.remark==''">暂无备注</span>
                    <span class="statused" else>{{scope.row.remark}}</span>
                  </template>
                </el-table-column>
                <!-- <el-table-column label="操作" width="140">
                  <template slot-scope="scope">
                    <div class="app-operation">
                      <el-button class="btn-blue" size="mini">已转换</el-button>
                      <el-button class="btn-blue" size="mini">报表</el-button>
                    </div>
                  </template>
                </el-table-column>-->
              </el-table>
            </div>
          </div>
          <div class="wfoot">
            <span>注：监理需对此项施工或运输的相关条件（如材料设备已到位，边界条件已满足等），进行确认。</span>
            <!-- <span class="fr">
              <span>
                <b>主管领导：</b>暂无
              </span>
              <span>
                <b>总监：</b>暂无
              </span>
            </span>-->
          </div>
        </div>
        <div id="printWeek">
          <div class="printtop">
            <h3>{{weekdailyList.company}}</h3>
            <span>申报时间： {{weekdailyList.create_time}}</span>
            <span>申报人： {{weekdailyList.apply}}</span>
            <span>电话：{{weekdailyList.phone}}</span>
          </div>
          <div class="printcenter">
            <div class="items" v-for="item in weekdailyList.lists" :key="item.id">
              <div class="infotitle">{{item.work_time | formatDate}}</div>
              <div class="info">
                <b>作业类别</b>
                {{item.type}}
              </div>
              <div class="info">
                <b>作业时间</b>
                {{item.detail_time}}
              </div>
              <div class="info">
                <b>作业内容</b>
                {{item.description}}
              </div>
              <div class="info">
                <b>作业区域</b>
                {{item.area}}
              </div>
              <div class="info">
                <b>编组上行端</b>
                {{item.up_part}}
              </div>
              <div class="info">
                <b>装车地</b>
                {{item.location}}
              </div>
              <div class="info">
                <b>防护措施及要求</b>
                {{item.attention}}
              </div>
              <div class="info">
                <b>备注</b>
                {{item.remark}}
              </div>
            </div>
          </div>
          <div class="printbom">
            <p>注：监理需对此项施工或运输的相关条件（如材料设备已到位，边界条件已满足等），进行确认。</p>
            <!-- <p>
              <span>主管领导：暂无</span>
              <span>总监：暂无</span>



            </p>-->
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      width="600px"
      :close-on-click-modal="false"
      class="dialog-weekplan"
      title="审核信息"
      :visible.sync="dialogVisible"
    >
      <el-form class="el-form-custom">
        <el-form-item label="审核状态：">
          <el-radio v-model="dialogStatus" :label="1">审核通过</el-radio>
          <el-radio v-model="dialogStatus" :label="2">审核不通过</el-radio>
        </el-form-item>
        <el-form-item label="审批建议：">
          <el-input
            v-model="dialogRemak"
            autocomplete="off"
            type="textarea"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <div class="blank"></div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="applyEvent">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "weekplan",
  data() {
    return {
      printObj: {
        id: "#printWeek",
        popTitle: " ",
        extraCss: "",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      projectName: "",
      isParent: true,
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      companyList: [],
      weekid: 0,
      weekList: [],
      weekdailyList: [],
      searchForm: {
        depart_id: "",
        time_range: []
      },
      logDataList: [],
      workId: 0,
      dialogVisible: false,
      dialogRemak: "",
      dialogStatus: 1
    };
  },
  mounted() {
    document
      .querySelector("#app-menu-items #menu_apply")
      .classList.add("is-active");
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
          this.weekid = id;
        }
      });
    },
    goBack() {
      this.isParent = true;
    },
    dateFormat(cellValue) {
      return ""; // this.formatDate(cellValue)
    },
    applyInfo() {
      this.dialogVisible = true;
      this.dialogRemak = "";
    },
    applyEvent() {
      let wid = this.weekid;
      let status = this.dialogStatus;
      let reason = this.dialogRemak;
      this.request({
        url: "/apply/checkStatus",
        method: "post",
        data: { wid: wid, status: status, reason: reason }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.$message({
            type: "success",
            message: "审核成功！"
          });
          this.dialogVisible = false;
          this.goDetail(wid);
          this.getWeekList();
        }
      });
    },
    getWeek(t) {
      t = new Date(t);
      if (t == undefined) {
        t = new Date();
      } else if (t instanceof Date) {
        var _t = new Date();
        _t.setYear(t.getFullYear());
        _t.setMonth(t.getMonth());
        _t.setDate(t.getDate());
        var date1 = _t.getDate(); //给定的日期是几号
        _t.setDate(1);
        var d = _t.getDay(); //1. 得到当前的1号是星期几。
        var fisrtWeekend = d;
        if (d == 0) {
          fisrtWeekend = 1;
          //1号就是星期天
        } else {
          fisrtWeekend = 7 - d + 1; //第一周的周未是几号
        }
        if (date1 <= fisrtWeekend) {
          return t.getMonth() + 1 + "月第 1周";
        } else {
          let weeks = 1 + Math.ceil((date1 - fisrtWeekend) / 7);
          return t.getMonth() + 1 + "月第" + weeks + "周";
        }
      } else {
        throw "getFormatDate - error : 你的参数不是日期类型，也不是为空";
      }
    },
    getLogList(id) {
      this.logDataList = [];
      this.request({
        url: "/apply/getWeeekLogs",
        method: "get",
        params: { wid: id }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.logDataList = data.data;
          //this.logDataList = data.data.toString();
        }
      });
    }
    //end
  }
};
</script>
<style>
#app-weekplan .el-row {
  margin-bottom: 20px;
}
#app-weekplan .el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background: #fff;
  margin-bottom: 20px;
}
.grid-content .grid-title {
  color: #fff;
  background: #3655a5;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  border-radius: 6px 6px 0 0;
  padding-left: 20px;
  text-align: left;
  font-weight: 700;
}
.grid-content .grid-title .tright {
  float: right;
  padding-right: 10px;
}
.grid-content .grid-title .tright .el-tag {
  background: none !important;
  padding: 0 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}
.grid-content .grid-box {
  padding: 20px;
  border: 1px #3655a5 solid;
  border-radius: 0 0 6px 6px;
  overflow: hidden;
}
.grid-content .grid-box p {
  color: #4b6eca;
  line-height: 28px;
  font-size: 16px;
}
.grid-content .grid-box b {
  text-align: center;
  display: block;
  border: 1px #4b6eca solid;
  color: #4b6eca;
  border-radius: 24px;
  font-size: 15px;
  width: 120px;
  margin: 10px auto 0 auto;
}
.grid-content .grid-box:hover {
  background: #fafafa;
  box-shadow: 1px 2px 10px 0 rgba(54, 85, 222, 0.3);
  cursor: pointer;
}
.wmain .el-table {
  background: #fff;
}
.wtop {
  margin-bottom: 15px;
  overflow: hidden;
}
.wtop .item {
  color: #4b6eca;
  display: inline-block;
  margin-right: 30px;
  font-size: 16px;
  padding-top: 5px;
}
.wtop .item b {
  color: #1d397a;
  font-weight: 500;
}
.wtop .itembtn {
  float: right;
}
.wfoot {
  margin-top: 20px;
  overflow: hidden;
  font-size: 14px;
}
.wfoot span {
  color: #4b6eca;
  display: inline-block;
}
.wfoot .fr {
  float: right;
}
.wfoot .fr b {
  color: #1d397a;
  font-weight: 500;
}

.wfoot .fr span {
  margin-left: 24px;
}

#printWeek {
  display: none;
}
.printtop {
  padding-bottom: 20px;
  overflow: hidden;
  text-align: center;
}
.printtop h3 {
  font-size: 22px;
  font-weight: 700;
  color: #1d397a;
}
.printtop span {
  color: #4b6eca;
  font-size: 16px;
  line-height: 31px;
  margin: 0 10px;
}
.printcenter {
  line-height: 31px;
}
.printcenter .items {
  margin-bottom: 40px;
  color: #1d397a;
}
.printcenter .items b {
  width: 115px;
  display: inline-block;
  color: #1d397a;
}
.printcenter .items .infotitle {
  font-size: 19px;
  font-weight: 700;
  color: #1d397a;
}
.printbom {
  overflow: hidden;
}
.printbom p {
  color: #4b6eca;
  font-size: 16px;
  display: block;
  line-height: 31px;
}
.printbom span {
  float: right;
  color: #4b6eca;
  font-size: 16px;
  margin-left: 30px;
  margin-top: 15px;
}
@media print {
  #printWeek {
    display: block;
  }
  #printWeek table {
    border-collapse: collapse;
    width: 100%;
  }
  #printWeek table td {
    border: 1px solid #9db9fa;
    line-height: 30px;
    padding: 10px;
  }
  undefined {
    display: none;
  }
}
.wtop .redbtn {
  background: #ff5c75;
  border-color: #ff5c75;
  color: #fff;
}

#app-weekplan .statuse2 {
  color: #10cc39;
  border: none;
}
#app-weekplan .statuse3 {
  color: #ff5c75;
  border: none;
  border: 0;
}
#app-weekplan .statuse1 {
  color: #ff0;
  border: none;
}
#app-weekplan .statuse5 {
  color: #9db9fa;
  border: none;
}

.dialog-weekplan .el-textarea {
  width: 100% !important;
}
.dialog-weekplan .el-textarea__inner {
  height: 120px;
}
.dialog-weekplan .el-form-item__label {
  width: 110px;
}
.dialog-weekplan .el-form-item__content {
  margin-left: 110px;
}
.dialog-weekplan .el-input--medium {
  width: 100%;
}
.dialog-weekplan .el-select {
  width: 100%;
}
/* */
.status-popovers {
  height: 300px;
  overflow-y: auto;
}
.status-popover.el-popover {
  border: 1px solid #9db9fa;
  box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.3);
  word-break: break-all;
}
.status-popover .popper__arrow::after {
  top: -0.2px !important;
  margin-left: -6px;
  border-bottom-color: #9db9fa !important;
}
/** */
.layui-timeline {
  padding-left: 5px;
}
.layui-timeline-item {
  position: relative;
  padding-bottom: 10px;
}
.layui-timeline-item i {
  position: absolute;
  left: -5px;
  top: 2px;
  z-index: 10;
  width: 20px;
  height: 20px;
  line-height: 20px;
  background-color: #fff;
  color: #c0c0c0;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  font-size: 22px;
}
.layui-timeline-axis:hover {
  color: #ff5722;
}

.layui-timeline-item:last-child:before {
  display: none;
}
.layui-timeline-item:first-child:before {
  display: block;
}
.layui-timeline-content {
  padding-left: 25px;
  padding-right: 15px;
}
.layui-timeline-content p {
  color: #777;
}
.layui-timeline-title {
  position: relative;
  margin-bottom: 5px;
  font-size: 15px;
}
.layui-timeline-item::before {
  content: "";
  position: absolute;
  left: 5px;
  top: 0;
  z-index: 0;
  width: 1px;
  height: 100%;
  background-color: #e6e6e6;
}
</style>
