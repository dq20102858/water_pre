<template>
  <div id="location">
    <div class="el-menu-top">
      <el-menu router :default-active="activeIndex" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-location.png')" />定位管理
        </li>
        <el-menu-item index="locationstatisticForm">人员定位统计</el-menu-item>
        <el-menu-item index="2">墙壁探测器</el-menu-item>
        <el-menu-item index="3">车载探测器</el-menu-item>
        <el-menu-item index="4">定位从设备</el-menu-item>
        <el-menu-item index="5">机具</el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div class="app-page-container">
        <div class="app-page-select">
          <el-form :inline="true">
            <el-form-item>
              <el-button
                type="primary"
                class="redbtn"
                style="width:145px;"
                icon="el-icon-plus"
                @click="addDialogInfo"
              >新建机具</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      class="dialog-jiju"
      :title="this.diaLogTitle"
      :visible.sync="diaLogFormVisible"
    >
      <el-form class="el-form-custom" :model="deviceData" :rules="deviceRules" ref="deviceForm">
        <el-form-item label="公司名称：" prop="depart_id">
          <el-select v-model="deviceData.depart_id" placeholder="请选择公司" clearable>
            <el-option
              v-for="item in companyList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机具名称：" prop="name">
          <el-input v-model="deviceData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="description">
          <el-input type="textarea" v-model="deviceData.description"></el-input>
        </el-form-item>
        <div class="blank"></div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaLogFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="addOrEditDialog()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: 1,
      diaLogFormVisible: false,
      diaLogTitle: "添加信息",
      companyList: [],
      deviceData: {},
      deviceRules: {
        depart_id: [
          { required: true, message: "请选择公司", trigger: "change" }
        ],
        name: [
          {
            required: true,
            message: "请输入机具名称2~60个字符",
            trigger: "blur"
          },
          { min: 2, max: 60, message: "长度在2到60个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getCompanyList();
  },
  methods: {
    addDialogInfo() {
      this.diaLogTitle = "添加机具";
      this.diaLogFormVisible = true;
    },
    addOrEditDialog() {
      this.$refs["deviceForm"].validate(valid => {
        if (valid) {
          let data = this.deviceData;
          console.log(JSON.stringify(data));
          this.request({
            url: "/location/addOrEditDevice",
            method: "post",
            data:data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.diaLogFormVisible = false;
              //this.getWorkLists();
            }
          });
        } else {
          console.log("操作失败!");
          return false;
        }
      });
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
    }
  }
};
</script>
<style >
.dialog-jiju .el-textarea__inner {
  border: 1px #9db9fa solid;
  color: #4b6eca;
  height: 100px;
}
.dialog-jiju .el-textarea {
  width: 100% !important;
}
.dialog-jiju .el-form-item__label {
  width: 110px;
}
.dialog-jiju .el-form-item__content {
  margin-left: 110px;
}
</style>