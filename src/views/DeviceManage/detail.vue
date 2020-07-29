<template>
  <div class="app-device-page">
    <div class="device-top">
<div class="deleft">
设备详情
</div>
<div class="deleft">
设备详情
</div>
    </div>
          <div class="devicelist">
                <div class="grid-title">
                  {{item.name}}
                  <span>{{item.model}}</span>
                </div>
                <div class="grid-content">
                  <div class="grid-img">
                    <img
                      src="https://ipengtai.huanqiu.com/2020/0522/892e0f0f-7e47-49c6-a48c-69fad2096900.jpg"
                    />
                  </div>
                  <div class="grid-info">
                    <p>
                      设备编号：
                      <em>{{item.number}}</em>
                    </p>
                    <p>
                      设备状态：
                      <em>{{item.work_status}}</em>
                    </p>
                    <p>
                      运行时长：
                      <em>{{item.days}}天</em>
                    </p>
                    <p>
                      最近维保时间：
                      <em>{{item.latest_time|formatDate}}</em>
                    </p>
                    <p>
                      设备位置：
                      <em>{{item.address}}</em>
                    </p>
                    <p>
                      设备品牌：
                      <em>{{item.brand}}</em>
                    </p>
                  </div>
                </div>
            </div>
      
       
    <el-dialog
      width="734px"
      class="dialog-device"
      :title="this.diaLogTitle"
      :close-on-click-modal="false"
      :visible.sync="diaLogFormVisible"
    >
      <el-form
        :model="formData"
        class="el-form-custom"
        :rules="formRules"
        ref="formRulesRef"
        label-width="120px"
      >
        <el-form-item label="设备名称：" prop="name">
          <el-input v-model="formData.name" autocomplete="off"></el-input>
        </el-form-item>
        <div class="el-form-item-inline">
          <el-form-item label="所属站点：" prop="sid">
            <el-cascader
              v-model="formData.sid"
              :options="stationOptions"
              :props="stationOptionsProps"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="设备类型：" prop="type">
            <el-select v-model="formData.type" placeholder="请选择设备类型">
              <el-option label="风机" :value="1"></el-option>
              <el-option label="水泵" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备编号：" prop="number">
            <el-input v-model="formData.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备型号：" prop="model">
            <el-input v-model="formData.model" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备品牌：" prop="brand">
            <el-input v-model="formData.brand" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="运行时长：" prop="days">
            <el-input v-model="formData.days" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="最新维护时间：" prop="latest_time">
            <el-date-picker v-model="formData.latest_time" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="质保期：" prop="warranty_time">
            <el-date-picker v-model="formData.warranty_time" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>

          <el-form-item label="运行状态：" prop="work_status">
            <el-select v-model="formData.work_status" placeholder="请选择运行状态">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="异常" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="封面图片：" style="width:100%;">
          <el-upload
            ref="uploadfive"
            class="avatar-uploader"
            :action="uploadAction"
            :auto-upload="true"
            :on-exceed="uploadExceed"
            :before-upload="uploadBefore"
            :on-success="uploadSuccess"
            :show-file-list="false"
          >
            <img v-if="formData.img" :src="formData.img" class="avatar" title="选择图片" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaLogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEvent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      diaLogFormVisible: false,
      diaLogTitle: "添加人员信息",
      uploadAction: this.hostURL + "/upload/uploadFile",
      formData: {},
      passwordOrg: "",
      formRules: {
        name: [
          {
            required: true,
            message: "请输入设备名称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "请输入长度在2到20个字符",
            trigger: "blur"
          },
          {
            pattern: /(^\S+).*(\S+$)/,
            message: "开始和结尾不能有空格",
            trigger: "blur"
          }
        ],
        number: [
          {
            required: true,
            message: "请输入设备编号",
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "请输入长度在2到20个字符",
            trigger: "blur"
          },
          {
            pattern: /(^\S+).*(\S+$)/,
            message: "开始和结尾不能有空格",
            trigger: "blur"
          }
        ],
        model: [
          {
            required: true,
            message: "请输入设备型号",
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "请输入长度在2到20个字符",
            trigger: "blur"
          },
          {
            pattern: /(^\S+).*(\S+$)/,
            message: "开始和结尾不能有空格",
            trigger: "blur"
          }
        ],
        brand: [
          {
            required: true,
            message: "请输入设备品牌",
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "请输入长度在2到20个字符",
            trigger: "blur"
          },
          {
            pattern: /(^\S+).*(\S+$)/,
            message: "开始和结尾不能有空格",
            trigger: "blur"
          }
        ],
        days: [
          {
            required: true,
            message: "请输入运行时长",
            trigger: "blur"
          },
          {
            pattern: /^\d{1,5}$/,
            message: "请输入1-5位正整数",
            trigger: "blur"
          }
        ],
        sid: [
          {
            required: true,
            message: "请选择站点",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择设备类型",
            trigger: "change"
          }
        ],
        latest_time: [
          {
            required: true,
            message: "请选择维护时间",
            trigger: "change"
          }
        ],
        warranty_time: [
          {
            required: true,
            message: "请选择质保期",
            trigger: "change"
          }
        ],
        work_status: [
          {
            required: true,
            message: "请选择运行状态",
            trigger: "change"
          }
        ]
      },
      id:this.$route.params.id,
      stationList: [],
      stationOptions: [],
      stationOptionsProps: {
        value: "id",
        label: "name",
        children: "child"
      },
      searchType: "0",
      searchKeyword: ""
    };
  },

  created() {
    this.getDeviceDetail();
  },
  methods: {
    getDeviceDetail() {
      let id = this.id;
      this.request({
        url: "/device/getDeviceDetail",
        method: "get",
        params: {
          id
        }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataList = data.data.data;
          this.page_cur = parseInt(data.data.current_page);
          this.page_total = data.data.last_page;
          this.page_data_total = data.data.total;
          this.page_size = data.data.per_page;
        }
      });
    },
 
    getStationList() {
      this.request({
        url: "/station/getStationLists",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.stationList = data.data;
          this.stationOptions = data.data;
        }
      });
    },
    handleChange(value) {
      console.log(value);
    },
    showDialog() {
      this.getStationList();
      this.diaLogTitle = "添加信息";
      this.diaLogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["formRulesRef"].clearValidate();
      });
      this.formData = {
        // title: "",
        // description: "",
        // recept_type: []
      };
    },
    addEvent() {
      const that = this;
      this.$refs["formRulesRef"].validate(valid => {
        if (valid) {
          let data = that.formData;
          let url = "/device/addDevice";
          let baseid = this.formData.id;
          if (typeof baseid != "undefined") {
            url = "/device/editDevice";
          }
          this.request({
            url: url,
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.diaLogFormVisible = false;
              this.getDataList();
              this.$message({
                type: "success",
                message: "保存成功！"
              });
            }
          });
        } else {
          console.log("操作失败！");
          return false;
        }
      });
    },
    editEvent(id) {
      this.diaLogFormVisible = true;
      this.diaLogTitle = "修改人员信息";
      this.$nextTick(() => {
        this.$refs["formRulesRef"].clearValidate();
      });
      this.request({
        url: "/user/getUserDetail",
        method: "get",
        params: { id: id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.formData = data.data;
          //console.log(this.userData.menus);
          this.passwordOrg = data.data.password;
        }
      });
    },
    deleteEvent(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      })
        .then(() => {
          this.request({
            url: "/user/delUser",
            method: "post",
            data: { id: id }
          }).then(res => {
            let data = res.data;
            if (data.status == 1) {
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.getDataList();
            }
          });
        })
        .catch(() => {});
    },
    //上传图片
    uploadExceed() {
      this.$message({
        type: "warning",
        message: `最多可以上传1张图片`
      });
    },
    uploadSuccess(res, file) {
      console.log("图上传成功", res);
      this.$set(this.formData, "img", res.data.url);
    },
    uploadBefore(file) {
      var filename = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        filename === "GIF" ||
        filename === "gif" ||
        filename === "jpeg" ||
        filename === "jpg" ||
        filename === "JPG" ||
        filename === "png" ||
        filename === "PNG";
      const isLtM = file.size / 1024 / 1024 < 2;
      if (!extension) {
        this.$message({
          message: "上传图片只能是 jpg  png  gif 格式",
          type: "error"
        });
        return false;
      }
      if (!isLtM) {
        this.$message({
          message: "上传图片大小不能超过 2MB",
          type: "error"
        });
        return false;
      }
      return extension || isLtM;
    }
    //
  }
};
</script>
<style>
.app-device-page {
  padding: 20px;
}
.el-search-item .el-select .el-input {
  width: 100px;
  background: #2b8cf9;
  color: #fff;
}
.el-search-item .el-select .el-input .el-select__caret {
  color: #fff;
}
.devicelist .el-row {
  margin-bottom: 20px;
}
.devicelist .el-col {
  border-radius: 4px;
  min-width: 200px;
}
.devicelist .grid-content {
  padding: 20px;
  background: #fff;
  margin-bottom: 20px;
  min-width: 200px;
  background: #eef3ff;
  overflow: hidden;
}
.devicelist .grid-title {
  color: #fff;
  background: #3a91f1;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  border-radius: 3px 3px 0 0;
  padding-left: 20px;
  text-align: left;
  font-weight: 700;
}
.devicelist .grid-img {
  float: left;
  width: 100px;
  height: 150px;
  margin-right: 20px;
  border-radius: 100%;
}
.devicelist .grid-img img {
  margin-top: 25px;
  float: left;
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
.devicelist .grid-info p {
  display: block;
  padding-bottom: 10px;
  color: #666;
}
.devicelist .gcompany {
  max-height: 55px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dialog-device .el-select {
  width: 100%;
}
.dialog-device .el-form-item-inline {
  display: inline-block;
}
.dialog-device .el-form-item-inline .el-form-item {
  display: inline-block;
}
.dialog-device .el-form-item-block {
  display: block;
}
.dialog-device .el-form-item-inline .el-checkbox-group {
  margin-left: 110px;
}
.dialog-device .el-form-item-inline .el-input__inner {
  width: 220px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>