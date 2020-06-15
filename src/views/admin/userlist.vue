<template>
  <div id="admins">
    <div class="el-menu-top">
      <el-menu router default-active="userlist" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-peple.png')" />人员管理
        </li>
        <el-menu-item index="admin">公司列表</el-menu-item>
        <el-menu-item index="departlist">部门列表</el-menu-item>
        <el-menu-item index="postlist">职位列表</el-menu-item>
        <el-menu-item index="userlist" @click="userFirstPage">人员列表</el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div class="app-page-container">
        <div class="app-page-select">
          <el-form :inline="true" ref="userSearch">
            <el-form-item class="form-add-item">
              <el-button type="primary" icon="el-icon-plus" @click="openAddUser">添加人员</el-button>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input
                v-model="userSearch.user_name"
                autocomplete="off"
                placeholder="请输入姓名"
                maxlength="30"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="公司">
              <el-select
                v-model="userSearch.company_id"
                @change="getDepartLists($event)"
                @clear="getDepartListsClear"
                placeholder="请选择公司"
                clearable
              >
                <el-option
                  v-for="item in this.companySelectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门">
              <el-select
                v-model="userSearch.depart_id"
                @change="getPostLists($event)"
                @clear="getPostListsClear"
                placeholder="请选择部门"
                clearable
              >
                <el-option
                  v-for="item in this.departSelectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职位">
              <el-select v-model="userSearch.post_id" placeholder="请选择职位" clearable>
                <el-option
                  v-for="item in this.postSelectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="form-so">
              <label class="el-form-item__label"></label>
              <el-button size="small" icon="el-icon-search" type="primary" @click="getUserLists">查询</el-button>
              <el-button size="small" plain @click="resetSerach">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="app-table">
          <el-table :data="userList">
            <el-table-column label="序号" width="100">
              <template slot-scope="scope">
                <span>{{scope.$index+(userPage_cur - 1) * userPage_size + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="user_name" label="用户名"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="company" label="公司"></el-table-column>
            <el-table-column prop="depart" label="部门"></el-table-column>
            <el-table-column prop="post" label="职位"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <!-- <el-table-column prop="dispatch_desc" label="调度信息"></el-table-column> -->
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-blue" size="mini" @click="detailUser(scope.row.id)">修改</el-button>
                  <el-button class="btn-red" size="mini" @click="delUser(scope.row.id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="app-pagination">
            <el-pagination
              class="pagination"
              v-if="userList.length !== 0"
              layout="slot,prev, pager, next,slot,total"
              :page-size="userPage_size"
              :current-page="this.userPage_cur"
              :total="this.userPage_items"
              @current-change="userChangePage"
              prev-text="上一页"
              next-text="下一页"
            >
              <button @click="userFirstPage" type="button" class="btn-first">
                <span>首页</span>
              </button>
              <button @click="userLastPage" type="button" class="btn-last">
                <span>尾页</span>
              </button>
            </el-pagination>
          </div>
        </div>
        <el-dialog
          width="780px"
          class="dialog-users"
          :title="this.userDialogTitle"
          :close-on-click-modal="false"
          :visible.sync="userDialogVisible"
        >
          <el-form
            :inline="true"
            :model="userData"
            class="el-form-custom"
            :rules="userAddRules"
            ref="userRulesForm"
          >
            <div class="el-form-item-inlinessddd">
              <el-form-item
                class="newitem"
                label="用户名："
                prop="user_name"
                v-if="this.userDialogTitle=='添加人员信息'"
              >
                <el-input v-model="userData.user_name" show-word-limit></el-input>
              </el-form-item>
              <el-form-item class="newitem" label="姓名：" prop="name">
                <el-input v-model="userData.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item class="newitem" label="公司名称：" prop="company_id">
                <el-select v-model="userData.company_id" @change="getDepartLists($event)">
                  <el-option
                    v-for="item in this.companySelectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                class="newitem"
                label="密码："
                prop="password"
                v-if="this.userDialogTitle=='添加人员信息'"
              >
                <el-input v-model="userData.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                class="newitem"
                label="密码："
                prop="passwordEdit"
                v-if="this.userDialogTitle=='修改人员信息'"
              >
                <el-input v-model="userData.passwordEdit" autocomplete="off" placeholder="不修改密码请留空"></el-input>
              </el-form-item>

              <el-form-item class="newitem" label="部门名称：" prop="depart_id">
                <el-select v-model="userData.depart_id" @change="getPostLists($event)">
                  <el-option
                    v-for="item in this.departSelectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="newitem" label="邮箱：" prop="email">
                <el-input v-model="userData.email" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item class="newitem" label="职位名称：" prop="post_id">
                <el-select v-model="userData.post_id">
                  <el-option
                    v-for="item in this.postSelectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="newitem" label="手机号码：" prop="phone">
                <el-input v-model="userData.phone" autocomplete="off"></el-input>
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
                  <img v-if="userData.avatar" :src="userData.avatar" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="用户角色：" prop="sys_role">
                <el-radio-group v-model="userData.sys_role">
                  <el-radio :label="3">普通用户</el-radio>
                  <el-radio :label="1">管理员</el-radio>
                  <el-radio :label="2">业主方</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="用户职责：" class="checkbox-group" v-show="userData.sys_role==3">
                <el-checkbox-group v-model="userData.menus" @change="selectUuserMenu">
                  <el-checkbox
                    v-for="item in userMenuList"
                    :key="item.id"
                    :label="item.id+''"
                  >{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="userDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <!-- end  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      userPage_size: 20,
      userPage_cur: 1,
      userPage_items: 0,
      userPage_size: 20,
      userPage_cur: 1,
      userPage_items: 0,
      userPage_total: 0,
      userDialogVisible: false,
      userDialogTitle: "",
      userData: {
        menus: [],
        sys_role: 3
      },
      uploadAction: this.hostURL + "/upload/uploadFile",
      UserimageUrl: "",
      userSearch: {},
      userAddRules: {
        user_name: [
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
            pattern: /^[A-Za-z0-9]*$/,
            message: "用户名只能是字母、数字",
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
        company_id: [
          {
            required: true,
            message: "请选择公司",
            trigger: "change"
          }
        ],

        depart_id: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change"
          }
        ],
        post_id: [
          {
            required: true,
            message: "请选择职位",
            trigger: "change"
          }
        ],
        dispatch: [
          {
            required: true,
            message: "请选择调度信息",
            trigger: "change"
          }
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        sys_role: [
          {
            required: true,
            message: "请选择用户角色",
            trigger: "change"
          }
        ]
      },
      passwordOrg: "",
      companySelectList: [],
      departSelectList: [],
      postSelectList: [],
      userMenuList: []
    };
  },
  mounted() {
    document
      .querySelector("#app-menu-items #menu_admin")
      .classList.add("is-active");
  },
  created() {
    this.getCompanyLists();
    this.getLineTypes();
    this.getMenuLists();
    this.getUserLists();
  },
  methods: {
    getUserLists() {
      let page = this.userPage_cur;
      let user_name = this.userSearch.user_name;
      let company_id = this.userSearch.company_id;
      let depart_id = this.userSearch.depart_id;
      let post_id = this.userSearch.post_id;
      this.request({
        url: "/user/getUserPage",
        method: "get",
        params: { page, user_name, company_id, depart_id, post_id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.userList = data.data.data;
          this.userPage_cur = parseInt(data.data.current_page);
          this.userPage_items = data.data.total;
          this.userPage_size = data.data.per_page;
          this.userPage_total = data.data.last_page;
        }
      });
    },
    userChangePage(value) {
      this.userPage_cur = value;
      this.getUserLists();
    },
    userFirstPage() {
      this.userPage_cur = 1;
      this.getUserLists();
    },
    userLastPage() {
      this.userPage_cur = this.userPage_total;
      this.getUserLists();
    },
    userSearchPage() {
      this.userPage_cur = 1;
      this.getUserLists();
    },
    resetSerach() {
      this.userSearch = {
        user_name: "",
        company_id: "",
        depart_id: "",
        post_id: ""
      };
      this.departSelectList = [];
      this.postSelectList = [];
      this.userPage_cur = 1;
      this.getUserLists();
    },
    openAddUser() {
      this.userData = {
        menus: [],
        sys_role: 3
      };
      this.userDialogVisible = true;
      this.userDialogTitle = "添加人员信息";
      this.$nextTick(() => {
        this.$refs["userRulesForm"].clearValidate();
      });
    },
    addUser() {
      this.$refs["userRulesForm"].validate(valid => {
        if (valid) {
          let data = this.userData;

          let menuArr = data.menus;
          console.log(menuArr);
          let sg = menuArr.indexOf("9");
          let gcs = menuArr.indexOf("14");
          // if(data.menus)
          console.log("menuArr：" + sg + "_" + gcs);
          if (parseInt(sg) + parseInt(gcs) >= 1) {
            this.$message({
              type: "error",
              message: "施工队长和总工程师不能同时选择"
            });
            return false;
          }
          // if (this.userData.avatar == null) {
          //   this.userData.avatar = "/static/avatar.jpg";
          // }
          let url = "/user/addUser";
          let baseid = this.userData.id;

          if (typeof baseid != "undefined") {
            url = "/user/editUser";

            let pwdEdit = this.userData.passwordEdit;
            if (pwdEdit != "" && typeof pwdEdit != "undefined") {
              this.userData.password = pwdEdit;
            } else {
              this.userData.password = "";
            }
          }
          this.request({
            url: url,
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.userDialogVisible = false;
              this.userData.passwordEdit = "";
              this.$message({
                type: "success",
                message: "保存成功！"
              });
              this.getUserLists();
            }
          });
        }
      });
    },
    detailUser(id) {
      this.userDialogTitle = "修改人员信息";
      this.userDialogVisible = true;
      this.$nextTick(() => {
        this.$refs["userRulesForm"].clearValidate();
      });
      this.request({
        url: "/user/getUserDetial",
        method: "get",
        params: { id: id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.userData = data.data;
          if (data.data.menus != "") {
            this.userData.menus = data.data.menus.split(",");
          } else {
            this.userData.menus = [];
          }

          console.log(this.userData.menus);
          this.passwordOrg = data.data.password;
          this.getDepartListEdit(data.data.company_id); //部门
          this.getPostListEdit(data.data.depart_id); //职位
        }
      });
    },
    delUser(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      })
        .then(() => {
          this.request({
            url: "/user/deleteUser",
            method: "post",
            data: { id: id }
          }).then(res => {
            let data = res.data;
            if (data.status == 1) {
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.getUserLists();
            }
          });
        })
        .catch(() => {});
    },
    //公司 部门 职位
    getCompanyLists() {
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: 0, type: 1 }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.companySelectList = data.data;
        }
      });
    },
    getDepartLists(val) {
      // debugger;
      if (this.userSearch.company_id != "") {
        this.$set(this.userData, "depart_id", "");
        this.$set(this.userData, "post_id", "");
        this.$set(this.userSearch, "depart_id", "");
        this.$set(this.userSearch, "post_id", "");
        this.request({
          url: "/company/getDepartLists",
          method: "get",
          params: { pid: val, type: 2 }
        }).then(response => {
          let data = response.data;
          if (data.status == 1) {
            this.departSelectList = data.data;
          }
        });
      } else {
        this.userSearch.depart_id = "";
        this.departSelectList = [];
      }
    },
    getDepartListsClear() {
      this.getPostLists(-1);
    },
    getPostLists(val) {
      if (this.userSearch.depart_id != "") {
        this.$set(this.userData, "post_id", "");
        this.$set(this.userSearch, "post_id", "");
        this.request({
          url: "/company/getDepartLists",
          method: "get",
          params: { pid: val, type: 3 }
        }).then(response => {
          let data = response.data;
          if (data.status == 1) {
            this.postSelectList = data.data;
          }
        });
      } else {
        this.userSearch.post_id = "";
        this.postSelectList = [];
      }
    },
    getPostListsClear() {
      this.getPostLists(-1);
      this.postSelectList = [];
    },
    getDepartListEdit(val) {
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: val, type: 2 }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.departSelectList = data.data;
        }
      });
    },
    getPostListEdit(val) {
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid: val, type: 3 }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.postSelectList = data.data;
        }
      });
    },
    getLineTypes() {
      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.userMenuList1 = data.data;
        }
      });
    },
    getMenuLists() {
      this.request({
        url: "/user/getMenuLists",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.userMenuList = data.data;
        }
      });
    },
    selectUuserMenu(val) {
      //alert(val);
      if (val == 14) {
      }
    },
    //上传图片
    uploadExceed() {
      this.$message({
        type: "warning",
        message: `最多可以上传5张图片`
      });
    },
    uploadSuccess(res, file) {
      console.log("图上传成功", res);
      // this.$set(this.userData, "avatar", "http://129.211.168.161/uploads/home/20200518/df6578d3a9da5e8d5431b22ea04aa37e.png");
      this.$set(this.userData, "avatar", res.data.url);
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
        return false; //必须加上return false; 才能阻止
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
  //
};
</script>

<style>
.dialog-users .el-textarea {
  width: 100% !important;
}
.dialog-users .el-form-item__label {
  width: 110px;
}
.dialog-users .newitem {
  width: 350px;
}
.dialog-users .newitem .el-input--medium {
  width: 240px;
}
.dialog-users .el-input--medium {
  width: 100%;
}
.dialog-users .el-select {
  width: 185px;
}

.dialog-users .el-form-item-block {
  display: block;
}
.dialog-users .el-form-item-inliness {
  display: inline-block;
}
.dialog-users .el-form-item-inliness .el-form-item {
  display: inline-block;
}
.dialog-users .el-form-item-block {
  display: block;
}
.dialog-users .el-form-item-inliness .el-checkbox-group {
  margin-left: 110px;
}
.dialog-users .checkbox-group .el-form-item__label {
  float: left;
}
.dialog-users .checkbox-group .el-form-item__content {
  display: initial !important;
}
.dialog-users .checkbox-group .el-checkbox-group {
  margin-left: 110px;
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
