<template>
  <div id="app-week-apply">
    <div class="el-menu-top">
      <el-menu router mode="horizontal">
         <li class="ptitle">
          <img :src="require('@/assets/image/m_apply_on.png')" />施工请点
        </li>
        <el-submenu index="1">
          <template slot="title">日班计划</template>
          <el-menu-item index="daychart">日班图表</el-menu-item>
          <el-menu-item class="is-active" index="apply">日班列表</el-menu-item>
          <el-menu-item index="conflictcheck">冲突检测</el-menu-item>
        </el-submenu>
        <el-menu-item index="weekplan">周计划</el-menu-item>
        <el-menu-item index="weekplanapply" class="is-active">权限审批</el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div class="app-page-container">
        <div class="app-table">
          <el-table :data="weekList">
            <el-table-column label="序号" width="100">
              <template slot-scope="scope">
                <span>{{scope.$index+(page_cur - 1) * page_size + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="company" label="申请单位"></el-table-column>
            <el-table-column prop="title" label="申请人"></el-table-column>
            <el-table-column prop="remark" label="审批建议" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status==1">待审核</span>
                <span v-if="scope.row.status==2">通过</span>
                <span v-if="scope.row.status==3">拒绝</span>
                <span v-if="scope.row.status==4">已过期</span>
                <span v-if="scope.row.status==5">审核中</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="申请时间"></el-table-column>
            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <div class="app-operation" v-if="scope.row.status==1">
                  <span v-if="sys_role==1">
                    <span v-show="getNextWeekOne(scope.row.create_time)==0">
                      <el-button class="btn-blue" size="mini" @click="applyInfo(scope.row.id)">审核</el-button>
                    </span>
                  </span>
                </div>
              </template>
            </el-table-column>
          </el-table>
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
    <el-dialog
      width="600px"
      :close-on-click-modal="false"
      class="dialog-weekplans"
      title="审核信息"
      :visible.sync="dialogVisible"
    >
      <el-form class="el-form-custom">
        <el-form-item label="审核状态：">
          <el-radio v-model="dialogStatus" :label="2">审核通过</el-radio>
          <el-radio v-model="dialogStatus" :label="3">审核不通过</el-radio>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      weekList: [],
      wid: 0,
      dialogVisible: false,
      dialogRemak: "",
      dialogStatus: 2
    };
  },
  computed: {
    ...mapGetters(["sys_role", "roles"])
  },
  created() {
    this.getPageList();
  },
  methods: {
    getPageList() {
      let page = this.page_cur;
      this.request({
        url: "apply/getApplyLogPages",
        method: "get",
        params: {
          page
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
      this.getPageList();
    },
    toFirstPage() {
      this.pageChange(1);
    },
    toLastPage() {
      this.page_cur = this.page_total;
      this.pageChange(this.page_total);
    },
    applyInfo(id) {
      this.dialogVisible = true;
      this.dialogRemak = "";
      this.wid = id;
    },
    applyEvent() {
      let id = this.wid;
      let status = this.dialogStatus;
      let remark = this.dialogRemak;
      this.request({
        url: "/apply/updateApplyLog",
        method: "post",
        data: { id: id, status: status, remark: remark }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.$message({
            type: "success",
            message: "审核成功！"
          });
          this.dialogVisible = false;
          this.getPageList();
        }
      });
    },
    getNextWeekOne(dates) {
      //获取当前日期的后七天
      var myDate = new Date(dates);
      myDate.setDate(
        myDate.getDay() == 0
          ? myDate.getDate() - 6
          : myDate.getDate() - (myDate.getDay() - 1)
      );
      var nextmon = myDate.setDate(myDate.getDate() + 7); //+7代表下一个周一
      let dateNow = new Date();
      let nextweek = new Date(nextmon);
      console.log("dateNow：" + dateNow);
      console.log("nextweek：" + nextweek);
      if (dateNow > nextweek) {
        return 1;
        console.log("guoqi");
      }
      return 0;
    }
    //end
  }
};
</script>
<style>
.dialog-weekplans .el-textarea {
  width: 100% !important;
}
.dialog-weekplans .el-textarea__inner {
  height: 120px;
}
.dialog-weekplans .el-form-item__label {
  width: 110px;
}
.dialog-weekplans .el-form-item__content {
  margin-left: 110px;
}
.dialog-weekplans .el-input--medium {
  width: 100%;
}
.dialog-weekplans .el-select {
  width: 100%;
}
</style>