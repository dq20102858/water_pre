<template>
  <div class="app-device-page-detail">
    <div class="device-top">
      <div class="deleft">
        <b>设备详情</b>
        <el-button
          type="primary"
          style="background: #00ADFF;border: none;"
          size="mini"
          round
          @click="editEvent"
        >修改</el-button>
        <el-button
          type="primary"
          style="background: #00ADFF;border: none;"
          size="mini"
          round
          @click="deleteEvent"
        >删除</el-button>
        <el-button
          type="primary"
          style="background: #00ADFF;border: none;"
          size="mini"
          round
          @click="back"
        >返回</el-button>
      </div>
      <div class="deright">
        运行天数：{{useDay}} 天
        <span>{{dataInfoList.create_time|formatDateTamp('date')}}</span>
      </div>
    </div>
    <div class="devicedetail">
      <div class="grid-content">
        <div class="grid-img">
          <img :src="dataInfoList.img" />
        </div>
        <div class="grid-info">
          <p>
            设备名称：
            <em>{{dataInfoList.name}}</em>
          </p>
          <p>
            设备品牌：
            <em>{{dataInfoList.brand}}</em>
          </p>
          <p>
            今天能耗：
            <em>度</em>
          </p>
          <p>
            运行时长：
            <em>{{dataInfoList.days}}天</em>
          </p>
          <p>
            设备编号：
            <em>{{dataInfoList.number}}</em>
          </p>
          <p>
            设备状态：
            <em>{{dataInfoList.work_status==1?"正常":"异常"}}</em>
          </p>
          <p>
            累积能耗：
            <em>度</em>
          </p>
          <p>
            最近维保时间：
            <em>{{dataInfoList.latest_time|formatGetDate}}</em>
          </p>
          <p>
            设备型号：
            <em>{{dataInfoList.model}}</em>
          </p>
          <p>
            采购人：
            <em>{{dataInfoList.purchaser}}</em>
          </p>
          <p>
            投入时间：
            <em>{{dataInfoList.use_time|formatGetDate}}</em>
          </p>
          <p>
            保质期：
            <em>{{dataInfoList.warranty_time|formatGetDate}}</em>
          </p>
        </div>
      </div>

      <div class="grid-content-chart">
        <div class="chart-title">
          <div class="titleleft">
            <b>电流统计</b>
            <em>单位：安培</em>
          </div>
          <div class="titleright"></div>
        </div>
        <div class="chart-main"></div>
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
          <el-form-item label="投入时间：" prop="use_time">
            <el-date-picker v-model="formData.use_time" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="质保期：" prop="warranty_time">
            <el-date-picker v-model="formData.warranty_time" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="最新维护时间：" prop="latest_time">
            <el-date-picker v-model="formData.latest_time" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="采购人：" prop="purchaser">
            <el-input v-model="formData.purchaser" autocomplete="off"></el-input>
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
        purchaser: [
          {
            required: true,
            message: "请输入采购人",
            trigger: "blur"
          },
          {
            min: 2,
            max: 10,
            message: "请输入长度在2到10个字符",
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
        use_time: [
          {
            required: true,
            message: "请选择投入时间",
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
      dataInfoList: [],
      stationOptions: [],
      stationOptionsProps: {
        value: "id",
        label: "name",
        children: "child"
      },
      useDay: ""
    };
  },

  created() {
    this.getStationList();
    this.getDeviceDetail();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getDeviceDetail() {
      this.request({
        url: "/device/getDeviceDetail",
        method: "get",
        params: { id: this.$route.query.id }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataInfoList = data.data;
          this.useDay = this.$options.filters["dateDifference"](
            data.data.use_time,
            new Date()
          );
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
          this.stationOptions = data.data;
        }
      });
    },
    getStationParentsById(childid) {
      var fartherId;
      var list = this.stationOptions;
      this.stationOptions.forEach(element => {
        element.child.forEach(e => {
          if (e.id == childid) {
            fartherId = element.id;
          }
        });
      });
      return [fartherId, childid];
    },

    addEvent() {
      const that = this;
      this.$refs["formRulesRef"].validate(valid => {
        if (valid) {
          let data = that.formData;
          data.sid = that.formData.sid[1];
          this.request({
            url: "/device/editDevice",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.diaLogFormVisible = false;
              this.getDeviceDetail();
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
    editEvent() {
      this.diaLogFormVisible = true;
      this.diaLogTitle = "修改信息";
      this.formData = this.dataInfoList;
      this.formData.sid = this.getStationParentsById(this.dataInfoList.sid);
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
            url: "/device/deleteDevice",
            method: "post",
            data: { id: this.$route.query.id }
          }).then(res => {
            let data = res.data;
            if (data.status == 1) {
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.back();
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
.app-device-page-detail {
  padding: 20px;
}
.device-top {
  overflow: hidden;
  margin-bottom: 30px;
}
.device-top .deleft {
  float: left;
}
.device-top .deleft b {
  font-weight: 400;
  font-size: 18px;
  margin-right: 20px;
}
.device-top .deright {
  float: right;
  color: #666;
  font-size: 14px;
}
.device-top .deright span {
  padding-left: 20px;
}
.el-search-item .el-select .el-input {
  width: 100px;
  background: #2b8cf9;
  color: #fff;
}
.el-search-item .el-select .el-input .el-select__caret {
  color: #fff;
}
.devicedetail .el-row {
  margin-bottom: 20px;
}
.devicedetail .el-col {
  border-radius: 4px;
  min-width: 200px;
}
.devicedetail .grid-content {
  padding: 40px 0px 30px 50px;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 5px 1px 15px rgba(222, 222, 222, 0.9);
}
.devicedetail .grid-img {
  float: left;
  width: 100px;
  height: 150px;
  margin-right: 40px;
  border-radius: 100%;
}
.devicedetail .grid-img img {
  margin-top: 15px;
  float: left;
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
.devicedetail .grid-info p {
  color: #333;
  display: inline-block;
  width: 21%;
  padding-top: 20px;
  font-size: 16px;
}
.devicedetail .grid-info p em {
  color: #666;
}
.grid-content-chart {
  border-radius: 6px;
  margin-top: 30px;
  background: #fff;

  box-shadow: 5px 1px 15px rgba(222, 222, 222, 0.9);
}
.chart-title {
  background: #4093ed;
  border-radius: 6px 6px 0 0;
  padding: 12px 15px;
  color: #fff;
  overflow: hidden;
}
.chart-title .titleleft {
  float: left;
}
.chart-title .titleright {
  float: right;
}
.chart-title b {
  font-size: 16px;
  margin-right: 20px;
  font-weight: 400;
}
.chart-main {
  min-height: 400px;
}
/**/
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