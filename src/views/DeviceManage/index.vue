<template>
  <div class="app-device-page">
    <el-row :gutter="20" class="grid-menu">
      <el-col :xs="8" :sm="4" :md="3" :lg="3" :xl="3">
        <div class="left-menu">
          <h5>设置</h5>
          <el-menu router class="el-menu-vertical-demo">
            <el-menu-item class="is-active">
              <router-link to="/setmanage">人员设置</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/setmanage/site">站点设置</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/setmanage/warning">告警设置</router-link>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :xs="16" :sm="20" :md="21" :lg="21" :xl="21">
        <div class="app-page-container ptopz">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item>
                <h3 class="ttitles">人员列表</h3>
              </el-form-item>
              <div class="el-serach noborder">
                <!-- <el-input v-model="searchName" autocomplete="off" placeholder="请输入名称查询" clearable></el-input> -->
                <el-button @click="showDialog">添加</el-button>
              </div>
            </el-form>
          </div>
          <div class="app-table">
            <el-table :data="dataList">
              <el-table-column label="序号" width="80px">
                <template slot-scope="scope">{{scope.$index+(page_cur - 1) * page_size + 1}}</template>
              </el-table-column>
              <el-table-column prop="username" label="用户名"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="role" label="职位"></el-table-column>
              <el-table-column prop="phone" label="手机号"></el-table-column>
              <el-table-column prop="create_time" label="发布时间"></el-table-column>
              <el-table-column label="操作" width="125">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-edit" size="mini" @click="editEvent(scope.row.id)">编辑</el-button>
                    <el-button class="btn-del" size="mini" @click="deleteEvent(scope.row.id)">删除</el-button>
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
                :total="this.page_data_total"
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
        </div>
      </el-col>
    </el-row>

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
        <div class="el-form-item-inliness">
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
            <img v-if="formData.avatar" :src="formData.avatar" class="avatar" title="选择图片" />
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
        latest_time: [
          {
            required: true,
            message: "请选择最新维护时间",
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
      page_cur: 1,
      page_data_total: 0,
      page_size: 20,
      page_total: 0,
      dataList: []
    };
  },
 
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      let page = this.page_cur;
      this.request({
        url: "/user/getUserPages",
        method: "get",
        params: {
          page
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
    pageChange(value) {
      this.page_cur = value;
      this.getDataList();
    },
    pageToFirst() {
      this.page_cur = 1;
      this.getDataList();
    },
    pageToLast() {
      this.page_cur = this.page_total;
      this.getDataList();
    },
    showDialog() {
      this.diaLogTitle = "添加人员信息";
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
      this.$set(this.formData, "avatar", res.data.url);
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
.dialog-device .el-select {
  width: 100%;
}
.dialog-device .el-form-item-inliness {
  display: inline-block;
}
.dialog-device .el-form-item-inliness .el-form-item {
  display: inline-block;
}
.dialog-device .el-form-item-block {
  display: block;
}
.dialog-device .el-form-item-inliness .el-checkbox-group {
  margin-left: 110px;
}
.dialog-device .el-form-item-inliness .el-input__inner {
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