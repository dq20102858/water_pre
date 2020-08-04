<template>
  <div class="app-set-page">
    <div class="app-page-rows">
      <div class="app-page-rows-left">
        <div class="left-menu-area">
          <h5 class="atitle">系统设置</h5>
          <el-menu router class="el-menu-vertical-demo">
            <el-menu-item class="active">
              <router-link to="/setmanage">人员管理</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/setmanage/site">站点设置</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/setmanage/warning">告警设置</router-link>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="app-page-rows-right">
        <div class="app-page-container">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item class="el-form-item">
                <el-input
                  prefix-icon="el-icon-search"
                  placeholder="请输入人员姓名"
                  @input="searchKeywordEvent"
                  v-model="searchKeyword"
                  class="input-with-select"
                  clearable
                ></el-input>
              </el-form-item>
              <div class="el-serach noborder">
                <!-- <el-input v-model="searchName" autocomplete="off" placeholder="请输入名称查询" clearable></el-input> -->
                <el-button @click="addShowDialog">添加</el-button>
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
                    <el-button class="btn-edit" size="mini" @click="userEditEvent(scope.row.id)">编辑</el-button>
                    <el-button class="btn-del" size="mini" @click="userDeleteEvent(scope.row.id)">删除</el-button>
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
      </div>
    </div>

    <el-dialog
      width="680px"
      class="dialog-users"
      :title="this.diaLogTitle"
      :close-on-click-modal="false"
      :visible.sync="diaLogFormVisible"
    >
      <el-form
        :model="formData"
        class="el-form-custom"
        :rules="formRules"
        ref="formRulesRef"
        label-width="110px"
      >
        <div>
          <el-form-item label="用户名：" prop="username">
            <el-input v-model="formData.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="formData.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password" v-if="this.diaLogTitle=='添加人员信息'">
            <el-input v-model="formData.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="passwordEdit" v-if="this.diaLogTitle=='修改人员信息'">
            <el-input v-model="formData.passwordEdit" autocomplete="off" placeholder="不修改密码请留空"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="phone">
            <el-input v-model="formData.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位：" prop="role_id">
            <el-select v-model="formData.role_id" placeholder="请选择职位">
              <el-option label="管理员" :value="1"></el-option>
              <el-option label="维保人员" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="头像上传：" style="width:100%;">
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
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaLogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="userAddEventDialog">确 定</el-button>
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
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 14,
            message: "请输入用户名长度在2到14个字符",
            trigger: "blur"
          },
          {
            pattern: /^[A-Za-z0-9\_]*$/,
            message: "用户名只能是字母、数字及下划线",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 10,
            message: "请输入姓名长度在2到10个字符",
            trigger: "blur"
          },
          {
            pattern: /^[\u4e00-\u9fa5A-Za-z0-9\_]*$/,
            message: "姓名只能是汉字、字母、数字及下划线",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 14,
            message: "请输入密码长度6到14个字符",
            trigger: "blur"
          },
          {
            pattern: /^[0-9a-zA-Z_]{1,}$/,
            message: "密码只能是数字、字母、下划线",
            trigger: "blur"
          }
        ],
        passwordEdit: [
          {
            min: 6,
            max: 14,
            message: "请输入密码长度6到14个字符",
            trigger: "blur"
          },
          {
            pattern: /^[0-9a-zA-Z_]{1,}$/,
            message: "密码只能是数字、字母、下划线",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        role_id: [
          {
            required: true,
            message: "请选择职位",
            trigger: "change"
          }
        ]
      },
      page_cur: 1,
      page_data_total: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      searchKeyword: ""
    };
  },
  mounted() {
    //document.querySelector("#setmanage").classList.add("is_active");
  },
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      let page = this.page_cur;
      let name = this.searchKeyword;
      this.request({
        url: "/user/getUserPages",
        method: "get",
        params: {
          page,
          name
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
    searchKeywordEvent() {
      this.page_cur = 1;
      this.getDataList();
    },
    addShowDialog() {
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
    userAddEventDialog() {
      const that = this;
      this.$refs["formRulesRef"].validate(valid => {
        if (valid) {
          let data = that.formData;
          let url = "/user/addUser";
          let baseid = this.formData.id;
          if (typeof baseid != "undefined") {
            url = "/user/editUser";
            let pwdEdit = this.formData.passwordEdit;
            if (pwdEdit != "" && typeof pwdEdit != "undefined") {
              this.formData.password = pwdEdit;
            } else {
              this.formData.password = "";
            }
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
    userEditEvent(id) {
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
    userDeleteEvent(id) {
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
.app-set-page {
  overflow: hidden;
}
.dialog-users .el-select {
  width: 100%;
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