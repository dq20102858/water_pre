<template>
  <div id="app-apply">
    <div class="el-menu-top">
      <el-menu router mode="horizontal" default-active="conflictcheck">
        <li class="ptitle">{{projectName}}</li>
        <el-submenu index="1" class="is-active">
          <template slot="title">日班计划</template>
          <el-menu-item index="daychart">日班图表</el-menu-item>
          <el-menu-item index="apply">日班列表</el-menu-item>
          <el-menu-item index="conflictcheck">冲突检测</el-menu-item>
        </el-submenu>
        <el-menu-item index="weekplan">周计划</el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div class="app-page-container">
        <div class="conftop">
          <h3>冲突检测</h3>
          <span>
            <em></em>已批准
          </span>
        </div>
        <div class="app-table">
          <el-table :data="checkList">
            <el-table-column prop="company1" label="公司名称"></el-table-column>
            <el-table-column prop="number1" label="作业编号">
              <template slot-scope="scope">
                <span
                  style="cursor: pointer;"
                  title="点击查看详情"
                  @click="goDetail(scope.row.id1,scope.row.type1)"
                >{{scope.row.number1}}</span>
                <span style="color:#029b02;font-size:12px;" v-if="scope.row.status1 ==2">已同意</span>
                <span style="color:#ff5c75;font-size:12px;" v-if="scope.row.status1 ==3">已拒绝</span>
              </template>
            </el-table-column>
            <el-table-column prop="company2" label="公司名称"></el-table-column>
            <el-table-column prop="number2" label="作业编号">
              <template slot-scope="scope">
                <span
                  style="cursor: pointer;"
                  title="点击查看详情"
                  @click="goDetail(scope.row.id2,scope.row.type2)"
                >{{scope.row.number2}}</span>

                <span style="color:#029b02;font-size:12px;" v-if="scope.row.status2 ==2">已同意</span>
                <span style="color:#ff5c75;font-size:12px;" v-if="scope.row.status2 ==3">已拒绝</span>
              </template>
            </el-table-column>
            <el-table-column prop="txt" label="操作" width="88">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button
                    class="btn-red"
                    size="mini"
                    @click="goApply(scope.row.id1,scope.row.id2,scope.row.number1,scope.row.number2,scope.row.type1,scope.row.type2,scope.row.status1,scope.row.status2)"
                  >冲突处理</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog
      class="dialogVisible"
      title="冲突操作"
      :visible.sync="dialogVisible"
      width="480px"
      :modal-append-to-body="false"
      center
    >
      <div class="dialogoper">
        <div class="operation" style="  border-bottom: 1px #ddd solid;
  padding-bottom: 20px;">
          <strong>
            作业编号：{{checkNumber1}}
            <span style="color:#029b02;font-size:12px;" v-if="status1 ==2">已同意</span>
            <span style="color:#ff5c75;font-size:12px;" v-if="status1 ==3">已拒绝</span>
          </strong>
          <el-button class="btn-defult" size="mini" @click="goDetail(checkId1,checktype1)">查看</el-button>
          <span v-if="status1 !=2 && status1!=3">
            <el-button class="btn-red" size="mini" @click="ApplyClick(checkId1,3)">拒绝</el-button>
            <el-button class="btn-blue" size="mini" @click="ApplyClick(checkId1,2)"  v-if="status2 !=2">同意</el-button>
          </span>
        </div>
        <div class="operation">
          <strong>
            作业编号：{{checkNumber2}}
            <span style="color:#029b02;font-size:12px;" v-if="status2 ==2">已同意</span>
            <span style="color:#ff5c75;font-size:12px;" v-if="status2 ==3">已拒绝</span>
          </strong>
          <el-button class="btn-defult" size="mini" @click="goDetail(checkId2,checktype2)">查看</el-button>
          <span v-if="status2 !=2 && status2!=3">
            <el-button class="btn-red" size="mini" @click="ApplyClick(checkId2,3)">拒绝</el-button>
            <el-button class="btn-blue" size="mini" @click="ApplyClick(checkId2,2)"   v-if="status1 !=2">同意</el-button>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import detailForm from "./applydetail.vue";
export default {
  name: "conflictcheck",
  data() {
    return {
      projectName: "",
      checkId1: 0,
      checkId2: 0,
      checkNumber1: 0,
      checkNumber2: 0,
      checktype1: "",
      checktype2: "",
      status2: "",
      status2: "",
      dialogVisible: false,
      checkList: []
    };
  },
  mounted() {
    document
      .querySelector("#app-menu-items #menu_apply")
      .classList.add("is-active");
  },
  created() {
    this.projectName = localStorage.getItem("projectName");
    this.getconflictCheck();
  },
  methods: {
    getconflictCheck() {
      let wid = wid;
      this.request({
        url: "/apply/conflictCheck",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.checkList = data.data;
        }
      });
    },
    goApply(id1, id2, num1, num2, type1, type2, status1, status2) {
      this.dialogVisible = true;
      this.checkId1 = id1;
      this.checkId2 = id2;
      this.checkNumber1 = num1;
      this.checkNumber2 = num2;
      this.checktype1 = type1;
      this.checktype2 = type2;
      this.status1 = status1;
      this.status2 = status2;
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
          this.getconflictCheck();
        } else {
          // this.$message({
          //   type: "success",
          //   message: "审批失败"
          // });
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
    }
    //
  }
};
</script>

<style>
.vl-notify {
  z-index: 9999 !important;
}
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
.conftop {
  padding-bottom: 15px;
}
.conftop h3 {
  display: inline-block;
  color: #4b6eca;
  margin-right: 30px;
  font-size: 16px;
}
.conftop span {
  display: inline-block;
  color: #999;
}
.conftop em {
  background: #57cf27;
  height: 16px;
  width: 40px;
  border-radius: 3px;
  display: inline-block;
  margin-right: 5px;
  vertical-align: text-top;
}
/**/
.dialogoper .operation {
  margin-bottom: 15px;
  text-align: left;
  overflow: hidden;
}
.dialogoper .operation strong {
  display: inline-block;
  color: #4b6eca;
  font-size: 15px;
  padding-top: 5px;
}
.dialogoper .operation button {
  float: right;
  margin-left: 10px;
  padding: 6px 8px;
}
.dialogoper .operation .btn-blue {
  border: 1px #4b6eca solid;
  color: #1d397a;
}
.dialogoper .operation .btn-defult {
  border: 1px #999 solid;
  color: #999;
}
.dialogoper .operation .btn-red {
  border: 1px #ff5c75 solid;
  color: #ff5c75;
}

.checkitemstyle .el-checkbox {
  display: block;
  margin-right: 0;
  margin-bottom: 15px;
}
.checkitemstyle .el-checkbox__input {
  float: right;
}
.checkitemstyle .el-checkbox__label {
  color: #4b6eca;
  font-size: 16px;
}
.checkitemstyle .el-checkbox__inner {
  border: 1px #9db9fa solid;
  width: 20px;
  height: 20px;
}
.checkitemstyle .el-checkbox__inner::after {
  width: 5px;
  height: 11px;
  left: 7px;
}
</style>


