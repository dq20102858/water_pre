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
            <el-table-column prop="number1" label="作业编号"></el-table-column>
            <el-table-column prop="company2" label="公司名称"></el-table-column>
            <el-table-column prop="number2" label="作业编号"></el-table-column>
            <el-table-column prop="txt" label="操作" width="140">
              <!-- <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-blue" size="mini" @click="goApply(scope.row.id)">同意</el-button>
                  <el-button class="btn-red" size="mini" @click="goRefuse(scope.row.id)">拒绝</el-button>
                </div>
              </template> -->
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog class="dialogVisible" title="同意" :visible.sync="dialogVisible" width="300px" center>
      <span>您确定同意此任务？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ApplyClick(dialogId,2)">确定</el-button>
        <el-button @click="dialogVisible=false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog class="dialogVisible" title="拒绝" :visible.sync="dialogRefuseVisible" width="300px" center>
      <span>您确定拒绝此任务？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ApplyClick(dialogId,3)">确定</el-button>
        <el-button @click="dialogRefuseVisible=false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "conflictcheck",
  data() {
    return {
      projectName: "",
      dialogId: 0,
      dialogVisible: false,
      dialogRefuseVisible: false,
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
    goApply(id) {
      this.dialogVisible = true;
      this.dialogId = id;
         console.log( this.dialogId)
    },
    goRefuse(id) {
      this.dialogRefuseVisible = true;
      this.dialogId = id;
      console.log( this.dialogId)
    },
    ApplyClick(id, status) {
      this.request({
        url: "/apply/changeStatus",
        method: "POST",
        data: { id:  this.dialogId, status: status }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.$message({
            type: "success",
            message: "恭喜您，操作成功"
          });
          this.dialogVisible = false;
          this.dialogRefuseVisible = false;
          this.getconflictCheck();
        } else {
          // this.$message({
          //   type: "success",
          //   message: "审批失败"
          // });
        }
      });
    }
    //
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
</style>


