<template>
  <div class="app-page-layer">
    <div class="app-dialog-form">
      <el-form label-position="top" :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm">
        <el-form-item label="命令号码" prop="number">
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
        <el-form-item label="受令机长" prop="master_id">
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
            <el-option
              v-for="item in stationWorkerList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <div class="blank"></div>
        <el-form-item label="调度命令内容">
          <el-select placeholder="请选择" clearable>
              <el-option
              v-for="item in stationWorkerList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-button type="primary" class="bluebtn">删除选中模板</el-button>
          <el-button type="primary" class="redbtn">
            新建调度内容模板
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
        </el-form-item>
        <div class="blank"></div>
        <div class="contents">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </div>
      </el-form>
      <div slot="footer" class="app-dialog-footer">
        <span class="tips">备注：*为必填项</span>
        <el-button type="primary" @click="submitForm('ruleForm')">确认保存</el-button>
        <el-button @click="isCancel">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import editFrom from "../dashboard/index.vue";
export default {
  data() {
    return {
      locomotiveList: [],
      masterList: [],
      driverList: [],
      dispatchList: [],
      stationWorkerList: [],
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
        template_id: 0
      },
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
  },
  props: {
    layerid: {
      type: String,
      default: ""
    }
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
                message: "恭喜你，保存成功",
                type: "success"
              });

              this.$layer.close(this.layerid);
            }
          });
        } else {
          console.log("error submit!!");
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
    }
  }
};
</script>

<style>
.app-dialog-form {
  padding: 10px 0px 30px 30px;
  display: block;
}
.app-dialog-form .el-form-item__label {
  width: 100px;
}
.app-dialog-form .el-input input {
  width: 240px;
}
.app-dialog-form .el-form--label-top .el-form-item__label {
  padding-bottom: 5px;
}

.app-dialog-form .bluebtn {
  margin-left: 10px;
}
.app-dialog-form .redbtn {
  background: #ff5c75;
  border-color: #ff5c75;
}
.app-dialog-form .contents {
  display: block;
}
.app-dialog-form .contents .el-textarea {
  width: 96.6%;
}
.app-dialog-form .contents .el-textarea__inner {
  width: 100%;
  height: 100px;
}
.app-dialog-form .el-form-item__error {
  padding-top: 5px;
}

.app-dialog-footer {
  margin-top: 20px;
  margin-right: 20px;
}
.app-dialog-footer .tips {
  color: #ff5c75;
  font-size: 14px;
}
.app-dialog-footer .el-button {
  float: right;
  margin-right: 10px;
}
</style>
