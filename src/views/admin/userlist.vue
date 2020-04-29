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
        <el-menu-item index="userlist">人员列表</el-menu-item>
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
              ></el-input>
            </el-form-item>
            <el-form-item label="公司">
              <el-select
                v-model="userSearch.company_id"
                @change="getDepartLists($event)"
                placeholder="请选择公司"
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
                placeholder="请选择部门"
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
              <el-select v-model="userSearch.post_id" placeholder="请选择职位">
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
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="user_name" label="用户名" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="company" label="公司" align="center"></el-table-column>
            <el-table-column prop="depart" label="部门" align="center"></el-table-column>
            <el-table-column prop="post" label="职位" align="center"></el-table-column>
            <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
            <el-table-column prop="phone" label="电话" align="center"></el-table-column>
            <el-table-column prop="dispatch_desc" label="调度信息" align="center"></el-table-column>
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
          width="680px"
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
              <el-form-item label="用户名：" prop="user_name" v-if="this.userDialogTitle=='添加人员信息'">
                <el-input
                  v-model="userData.user_name"
                  autocomplete="off"
                  maxlength="20"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item label="姓名：" prop="name">
                <el-input v-model="userData.name" autocomplete="off" maxlength="20" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="公司名称：" prop="company_id">
                <el-select v-model="userData.company_id" @change="getDepartLists($event)">
                  <el-option
                    v-for="item in this.companySelectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="密码：" prop="password" v-if="this.userDialogTitle=='添加人员信息'">
                <el-input
                  v-model="userData.password"
                  autocomplete="off"
                  maxlength="20"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="passwordEdit" v-if="this.userDialogTitle=='修改人员信息'">
                <el-input v-model="userData.passwordEdit" autocomplete="off" placeholder="不修改密码请留空"></el-input>
              </el-form-item>

              <el-form-item label="部门名称：" prop="depart_id">
                <el-select v-model="userData.depart_id" @change="getPostLists($event)">
                  <el-option
                    v-for="item in this.departSelectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model="userData.email" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="职位名称：" prop="post_id">
                <el-select v-model="userData.post_id">
                  <el-option
                    v-for="item in this.postSelectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="手机号码：" prop="phone">
                <el-input v-model="userData.phone" autocomplete="off"></el-input>
              </el-form-item>
              <!-- <el-form-item label="调度信息：" prop="dispatch" style="">
                <el-select v-model="userData.dispatch">
                  <el-option label="普通" :value="1"></el-option>
                  <el-option label="司机" :value="2"></el-option>
                  <el-option label="车长" :value="3"></el-option>
                  <el-option label="值班调度" :value="4"></el-option>
                  <el-option label="车站值班员" :value="5"></el-option>
                  <el-option label="施工队长" :value="6"></el-option>
                </el-select>
              </el-form-item>-->
                <el-form-item label="权限设置：" class="checkbox-group">
                <el-checkbox-group v-model="userData.menus">
                  <el-checkbox
                    v-for="item in userMenuList"
                    :key="item.id"
                    :label="item.id+''"
                  >{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="头像上传：">
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
        menus: []
      },
      uploadAction: this.hostURL + "/upload/uploadFile",
      UserimageUrl: "",
      userSearch: {},
      userAddRules: {
        user_name: [
          {
            required: true,
            message: "请输入用户名2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" },
          {
            pattern: /^[^\s]*$/,
            message: "输入用户名不能含有空格",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入姓名2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" },
          {
            pattern: /^[^\s]*$/,
            message: "输入姓名不能含有空格",
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
        password: [
          {
            required: true,
            message: "请输入密码2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" },
          {
            pattern: /^[^\s]*$/,
            message: "输入密码不能含有空格",
            trigger: "blur"
          }
        ],
        passwordEdit: [
          {
            min: 2,
            max: 20,
            message: "请输入密码在2到20个字符",
            trigger: "blur"
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
        menus: []
      };
      this.userDialogVisible = true;
      this.userDialogTitle = "添加人员信息";
    },
    addUser() {
      this.$refs["userRulesForm"].validate(valid => {
        if (valid) {
          let data = this.userData;
          if( this.userData.avatar ==null){
              this.userData.avatar="/static/avatar.jpg";
          }
          let url = "/user/addUser";
          let baseid = this.userData.id;
          console.log("this.userData.id：" + this.userData.id);
          if (typeof baseid != "undefined") {
            url = "/user/editUser";
            let pwdEdit = this.userData.passwordEdit;
            if (pwdEdit != "" && typeof pwdEdit != "undefined") {
              this.userData.password = pwdEdit;
            } else {
              this.userData.password = this.passwordOrg;
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
    },
    getPostLists(val) {
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
    //上传图片
    uploadExceed() {
      this.$message({
        type: "warning",
        message: `最多可以上传5张图片`
      });
    },
    uploadSuccess(res, file) {
      // let result= URL.createObjectURL(file.raw);
      console.log("图上传成功", res);
      this.userData.avatar= res.data.url;
      // let upload_list_li = document.getElementsByClassName("el-upload-list")[0]
      //   .children;
      // if (res.data.url != "") {
      //   for (let i = 0; i < upload_list_li.length; i++) {
      //     let li_a = upload_list_li[i];
      //     let imgElement = document.createElement("img");
      //     imgElement.setAttribute("src", res.data.url);
      //     imgElement.setAttribute("class", "upimgitem");
      //     if (li_a.lastElementChild.nodeName !== "IMG") {
      //       li_a.appendChild(imgElement);
      //     }
      //   }
      // }
    },
    uploadBefore(file) {
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPEG && !isJPG && !isPNG && !isGIF) {
        this.$message.error("上传图片只能是 jpg  png  gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPEG || isJPG || isPNG || (isGIF && isLt2M);
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

.dialog-users .el-input--medium {
  width: 100%;
}
.dialog-users .el-select {
  width: 185px;
}

.dialog-users .el-form-item-block {
  display: block;
}
.dialog-users  .el-form-item-inliness {
  display: inline-block;
}
.dialog-users .el-form-item-inliness .el-form-item {
  display: inline-block;
}
.dialog-users  .el-form-item-block {
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
.dialog-users .checkbox-group .el-checkbox-group{margin-left: 110px;}
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
