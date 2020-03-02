<template>
  <div id="dispatch-edit" class="app-page-layer">
    <div class="app-dialog-form">
      <el-form label-position="top" :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm">
        <el-form-item label="命令号" prop="number">
          <el-input v-model="ruleForm.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="受令机车" prop="lid">
          <el-select placeholder="请选择" v-model="ruleForm.lid" clearable>
            <el-option
              v-for="item in locomotiveList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select placeholder="请选择" v-model="ruleForm.type" clearable>
            <el-option label="行车调度" value="1"></el-option>
            <el-option label="施工调度" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="受令车长" prop="master_id">
          <el-select placeholder="请选择" v-model="ruleForm.master_id" clearable>
            <el-option
              v-for="item in masterList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="受令处所" prop="location">
          <el-input v-model="ruleForm.location" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="受令司机" prop="driver_id">
          <el-select placeholder="请选择" v-model="ruleForm.driver_id" clearable>
            <el-option
              v-for="item in driverList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值班调度" prop="dispatch_id">
          <el-select placeholder="请选择调度员" v-model="ruleForm.dispatch_id" clearable>
            <el-option
              v-for="item in dispatchList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="受令车站">
          <el-input autocomplete="off" v-model="ruleForm.station"></el-input>
        </el-form-item>
        <el-form-item label="车站值班员">
          <el-select placeholder="请选择" v-model="ruleForm.station_worker_id" clearable>
            <el-option label="暂无值班员" value="0"></el-option>
            <el-option
              v-for="item in stationWorkerList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <div class="blank"></div>
        <div class="contents-select">
          <el-select
            @change="templateChange"
            popper-class="el-select-height"
            v-model="ruleForm.template_id"
          >
            <el-option
              v-for="item in templateList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-button type="primary" class="bluebtn" @click="templateDel">删除选中模板</el-button>
          <el-button type="primary" class="redbtn" @click="templateShowDialog">
            新建调度内容模板
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
        </div>
        <div class="blank"></div>
        <div class="contents-area">
          <p>调度命令内容</p>
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </div>
      </el-form>
      <div slot="footer" class="app-dialog-footer">
        <span class="tips">备注：*为必填项</span>
        <el-button type="primary" @click="submitForm('ruleForm')">确定保存</el-button>
        <el-button @click="isCancel">关闭</el-button>
      </div>
    </div>
    <!-- add dialog-->
    <el-dialog
      class="app-dialog app-dialog-temp"
      width="580px"
      title="新增调度内容模板"
      :visible.sync="isVisible"
      center
      :append-to-body="true"
    >
      <el-form
        :model="tempForm"
        :rules="temprules"
        ref="tempForm"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="新增名称" prop="name">
          <el-input v-model="tempForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新增内容" prop="description">
          <el-input type="textarea" v-model="tempForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isVisible = false">取 消</el-button>
        <el-button type="primary" @click="templateSubmitTempForm('tempForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import editFrom from "../dashboard/index.vue";
export default {
  data() {
    return {
      tempForm: {
        name: "",
        description: ""
      },
      ruleForm: {
        number: "",
        lid: "",
        type: "",
        master_id: "",
        location: "司机车长及施工负责人",
        driver_id: "",
        dispatch_id: "",
        station_worker_id: "",
        station: "",
        description: "",
        template_id: 1
      },
      locomotiveList: [],
      masterList: [],
      driverList: [],
      dispatchList: [],
      stationWorkerList: [],
      templateList: [],
      isVisible: false,
      rules: {
        number: [
          { required: true, message: "请输入命令号码", trigger: "blur" }
        ],
        lid: [{ required: true, message: "请选择受令机车", trigger: "change" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        master_id: [
          { required: true, message: "请选择受令机长", trigger: "change" }
        ],
        location: [
          { required: true, message: "请选择令处所", trigger: "blur" }
        ],
        driver_id: [
          { required: true, message: "请选择受令机车", trigger: "change" }
        ],
        dispatch_id: [
          { required: true, message: "请选择调度员", trigger: "change" }
        ]
      },
      temprules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getCreateNumber();
    this.getLocomotiveLists(); //机车
    this.getUsersListMaster(); //车长
    this.getUsersListDriver(); //司机
    this.getUsersListDispatch(); //调度员
    this.getUsersListStationWorker(); //车站值班人
    this.getTemplateLists(); //模板
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.ruleForm;
          console.log(JSON.stringify(data));
          this.request({
            url: "/dispatch/addDispatch",
            method: "post",
            data
          }).then(res => {
            var data = res.data;
            if (data.status == 1) {
              this.$message({
                message: "恭喜您，新增成功",
                type: "success"
              });
              this.$layer.close(this.layerid);
              this.$parent.getDataLists();
            }
          });
        } else {
          console.log("保存命令失败");
          return false;
        }
      });
    },
    isCancel() {
      this.$layer.close(this.layerid);
    },
    getCreateNumber() {
      this.request({
        url: "/dispatch/createNumber",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.ruleForm.number = data.data;
          console.log(this.ruleForm.number);
        }
      });
    },
    //5:车长,6:司机,7:调度值班员，8：车站值班员 /dispatch/getUsersLists
    getUsersListMaster() {
      this.request({
        url: "/dispatch/getUsersLists?role_id=5",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.masterList = data.data;
        }
      });
    },
    getUsersListDriver() {
      this.request({
        url: "/dispatch/getUsersLists?role_id=6",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.driverList = data.data;
        }
      });
    },
    getUsersListDispatch() {
      this.request({
        url: "/dispatch/getUsersLists?role_id=7",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dispatchList = data.data;
        }
      });
    },
    getUsersListStationWorker() {
      this.request({
        url: "/dispatch/getUsersLists?role_id=8",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.stationWorkerList = data.data;
        }
      });
    },
    getLocomotiveLists() {
      this.request({
        url: "/dispatch/getLocomotiveLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.locomotiveList = data.data;
        }
      });
    },
    //模板
    getTemplateLists() {
      this.request({
        url: "/dispatch/getTemplateLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.templateList = data.data;
          this.templateChange(1);
        }
      });
    },
    templateChange(params) {
      let value = params;
      this.request({
        url: "/dispatch/getTemplateDetail?id=" + value,
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.ruleForm.description = res.data.data.description;
        }
      });
    },
    templateShowDialog() {
      this.isVisible = true;
      this.tempForm.name = "";
      this.tempForm.description = "";
    },
    templateDel() {
      this.$confirm("您确定要删除此模板?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.request({
          url: "/dispatch/deleteTemplate",
          method: "post",
          data: { id: this.ruleForm.template_id }
        }).then(res => {
          let data = res.data;
          if (data.status == 1) {
            this.ruleForm.template_id = 1;
            this.getTemplateLists();
            this.$message({
              message: "恭喜您，删除成功",
              type: "success"
            });
          } else {
            this.$message.error("删除失败");
          }
        });
      });
    },
    templateSubmitTempForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.tempForm;
          console.log("tempForm：" + JSON.stringify(data));
          this.request({
            url: "/dispatch/addTemplate",
            method: "post",
            data
          }).then(res => {
            var data = res.data;
            if (data.status == 1) {
              this.isVisible = false;
              this.$message({
                message: "恭喜您，新增成功",
                type: "success"
              });
              this.ruleForm.template_id = 1;
              this.getTemplateLists();
            }
          });
        } else {
          console.log("保存模板失败");
          return false;
        }
      });
    }
  },
  props: {
    layerid: {
      type: String,
      default: ""
    }
  }
};
</script>

<style>
#dispatch-edit .app-dialog-form {
  padding: 10px 0px 30px 30px;
  display: block;
}
#dispatch-edit .app-dialog-form .el-form-item__label {
  width: 100px;
}
#dispatch-edit .app-dialog-form .el-input input {
  width: 240px;
}
#dispatch-edit .app-dialog-form .el-form--label-top .el-form-item__label {
  padding-bottom: 5px;
}
#dispatch-edit .app-dialog-form .bluebtn {
  margin-left: 10px;
}
#dispatch-edit .app-dialog-form .redbtn {
  background: #ff5c75;
  border-color: #ff5c75;
}

#dispatch-edit .app-dialog-form .contents-select {
  text-align: right;
  margin-right: 20px;
}

#dispatch-edit .app-dialog-form .contents-select .el-input input {
  width: auto;
}
#dispatch-edit .app-dialog-form .contents-area {
  display: block;
  margin-right: 20px;
}
#dispatch-edit .app-dialog-form .contents-area .el-textarea {
  width: 100%;
}
#dispatch-edit .app-dialog-form .contents-area .el-textarea__inner {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
#dispatch-edit .app-dialog-form .contents-area p {
  color: #1d397a;
  padding-bottom: 10px;
}
#dispatch-edit .app-dialog-form .el-form-item__error {
  padding-top: 5px;
}
#dispatch-edit .app-dialog-footer {
  margin-top: 20px;
  margin-right: 20px;
}
#dispatch-edit .app-dialog-footer .tips {
  color: #ff5c75;
  font-size: 14px;
}
#dispatch-edit .app-dialog-footer .el-button {
  float: right;
  margin-right: 10px;
}
.app-dialog-temp .el-textarea__inner {
  height: 120px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.app-dialog-temp .el-textarea {
  width: 100%;
}
.app-dialog-temp .el-form-item__error {
  padding-top: 5px;
}
.app-dialog-temp .el-form-item {
  margin-bottom: 25px;
}
.el-select-height .el-select-dropdown__wrap {
  max-height: 200px;
}
</style>
