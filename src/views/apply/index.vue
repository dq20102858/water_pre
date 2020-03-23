<template>
  <div id="app-apply">
    <div class="el-menu-top">
      <el-menu router mode="horizontal">
        <li class="ptitle">{{projectName}}</li>
        <el-submenu index="1" class="is-active">
          <template slot="title">日班计划</template>
          <el-menu-item index="daychart">日班图表</el-menu-item>
          <el-menu-item class="is-active" index="apply">日班列表</el-menu-item>
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
              <el-button size="small" icon="el-icon-search" @click="pageSearchEvent" type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="page-count">找到{{pageTotal}}条相关作业令</div>
        <!-- end search -->
        <div class="app-table">
          <el-table :data="dataList">
            
            <el-table-column prop="number" label="作业编号"></el-table-column>
            <el-table-column prop="command_num" label="作业令号"></el-table-column>
            <el-table-column prop="description" label="作业内容" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="当前状态">
              <template slot-scope="scope">
                <span class="statuse1" v-if="scope.row.status=='未批复'">未批复</span>
                <span class="statuse2" v-if="scope.row.status=='同意'">同意</span>
                <span class="statuse3" v-if="scope.row.status=='拒绝'">拒绝</span>
                <span class="statuse4" v-if="scope.row.status=='完成'">完成</span>
                <span class="statuse6" v-if="scope.row.status=='已销点'">已销点</span>
                <span class="statuse1" v-if="scope.row.status=='注销'">注销</span>
              </template>
            </el-table-column>
            <el-table-column prop="next_status" label="下一步状态"></el-table-column>
            <el-table-column prop="company" label="公司简称"  show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <div class="app-operation">
             
                        <el-button
                    v-if="scope.row.status=='未批复'"
                    class="btn-red"
                    size="mini"
                    @click="goApply(scope.row.id,scope.row.company)"
                  >审批</el-button>
                  <!-- <el-button v-if="scope.row.status!='未批复'" class="btn-blue" size="mini" disabled>审批</el-button> -->
                  <el-button
                    v-if="scope.row.status=='已销点'"
                    class="btn-red"
                    size="mini"
                    @click="goApplyOk(scope.row.id,scope.row.company)"
                  >完成</el-button>
                  <el-button
                    v-if="scope.row.status=='已完成'"
                    class="btn-red"
                    size="mini"
                    @click="goApplyNo(scope.row.id,scope.row.company)"
                  >注销</el-button>
                 <el-button
                    class="btn-blue"
                    size="mini"
                    @click="goDetail(scope.row.id,scope.row.type)"
                  >详情</el-button>
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
        <!-- end table -->
      </div>
    </div>
    <el-dialog class="dialogStyle" title="审批" :visible.sync="dialogVisible" width="300px" center>
      <span>请选择审批状态？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ApplyClick(dialogId,2)">同意</el-button>
        <el-button @click="ApplyClick(dialogId,3)">拒绝</el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="dialogStyle"
      title="完成审批"
      :visible.sync="dialogVisibleOk"
      width="300px"
      center
    >
      <span>您确定任务已完成？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ApplyClick(dialogId,4)">确定</el-button>
        <el-button @click="dialogVisibleOk=false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="dialogStyle"
      title="注销审批"
      :visible.sync="dialogVisibleNo"
      width="300px"
      center
    >
      <span>您确定注销此任务？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ApplyClick(dialogId,6)">确定</el-button>
        <el-button @click="dialogVisibleNo=false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import detailForm from "./applydetail.vue";
export default {
  data() {
    return {
      projectName: "",
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      companyList: [],
      lineList: [],
      typeList: [
        { id: "A1", name: "A1" },
        { id: "A2", name: "A2" },
        { id: "A3", name: "A3" },
        { id: "A4", name: "A4" }
      ],
      stationList: [],
      statusList: [
        { id: 1, name: "未批复" },
        { id: 2, name: "同意" },
        { id: 3, name: "拒绝" },
        { id: 4, name: "完成" },
        { id: 5, name: "已销点" },
        { id: 6, name: "注销" }
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
      },
      dialogVisible: false,
      dialogVisibleOk: false,
      dialogVisibleNo: false,
      dialogId: 0,
      dialogContent: ""
    };
  },
  created() {
    this.getProjectName();
    this.getDataList();
    this.getCompanyList();
    this.getLineType(); //线别
    this.getStationList(); //车站
  },
  methods: {
    getProjectName() {
      this.request({
        url: "/common/getItemDetail",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.projectName = data.data.name;
          localStorage.setItem("projectName", data.data.name);
        }
      });
    },

    getDataList() {
      let page = this.page_cur;
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
    },
    pageSearchEvent() {
      this.page_cur = 1;
      this.getDataList();
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
    goDetail(id, type) {
      let laytitle = "";
      if (type == "A1" || type == "A2") {
        laytitle = "轨行区及施工作业许可证";
      } else {
        laytitle = this.projectName + "进场作业许可证";
      }
      this.$layer.iframe({
        area: ["85%", "90%"],
        title: laytitle,
        shadeClose: false,
        scrollbar: false,
        content: {
          content: detailForm,
          parent: this,
          data: { iframeData: { id: id } }
        }
      });
    },
    goApply(id, company) {
      this.dialogVisible = true;
      this.dialogId = id;
      this.dialogContent = company;
    },
    goApplyOk(id, company) {
      this.dialogVisibleOk = true;
      this.dialogId = id;
      this.dialogContent = company;
    },
    goApplyNo(id, company) {
      this.dialogVisibleNo = true;
      this.dialogId = id;
      this.dialogContent = company;
    },
    ApplyClick(id, status) {
      this.request({
        url: "/apply/changeStatus",
        method: "POST",
        data: { id: id, status: status }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.$message({
            type: "success",
            message: "恭喜您，操作成功"
          });
          this.dialogVisible = false;
          this.dialogVisibleOk = false;
          this.dialogVisibleNo = false;
          this.getDataList();
        } else {
          this.$message({
            type: "success",
            message: "审批失败"
          });
          this.dialogVisible = false;
          this.dialogVisibleOk = false;
          this.dialogVisibleNo = false;
        }
      });
    }
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
.page-count {
  text-align: right;
  color: #1d397a;
  padding-bottom: 20px;
}
#app-apply .el-dialog__footer {
  text-align: center;
}
.confirmButtonClass {
  font-size: 14px;
  padding: 8px 15px;
  background: #ff5c75 !important;
  border-color: #ff5c75 !important;
  margin-left: 15px !important;
}
.cancelButtonClass {
  padding: 8px 15px;
  font-size: 14px;
  background: #1d397a;
  border-color: #1d397a;
  color: #fff;
}
.cancelButtonClass:hover {
  background: #1d397a;
  border-color: #1d397a;
  color: #fff;
}
.dialogStyle .el-button--medium {
  padding: 7px 20px;
}
.statuse2 {
  color: #029b02;
}
.statuse3 {
  color: #ff5c75;
}
.statuse4 {
  color: #0a0693;
}
.statuse6 {
  color: #4072d1;
}
</style>
