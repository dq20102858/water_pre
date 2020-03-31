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
          <el-form :inline="true">
            <el-form-item>
              <el-button type="primary" icon="el-icon-plus" @click="openAddUser">添加人员</el-button>
            </el-form-item>
            <el-form-item>
              <el-input v-model="userSearch.user_name" autocomplete="off" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item>
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
            <el-form-item>
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
            <el-form-item>
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
              <el-button size="small"   plain  @click="resetSerach">重置</el-button>
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
            <el-table-column prop="create_time" label="邮箱" align="center"></el-table-column>
            <el-table-column prop="update_time" label="电话" align="center"></el-table-column>
            <el-table-column prop="dispatch_desc" label="调度信息" align="center"></el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-blue" size="mini" @click="detailUser(scope.row.id)">修改</el-button>
                  <el-button class="btn-red" size="mini"  @click="delUser(scope.row.id)">删除</el-button>
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
          width="700px"
          class="dialog-user"
          :title="this.userDialogTitle"
          :close-on-click-modal="false"
          :visible.sync="userDialogVisible"
        >
          <el-form
            :model="userData"
            class="el-form-custom"
            :rules="userAddRules"
            ref="userRulesForm"
          >
            <el-form-item label="用户名：" prop="user_name" v-if="this.userDialogTitle=='添加人员信息'">
              <el-input v-model="userData.user_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password" v-if="this.userDialogTitle=='添加人员信息'">
              <el-input v-model="userData.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="passwordEdit" v-if="this.userDialogTitle=='修改人员信息'">
              <el-input v-model="userData.passwordEdit" autocomplete="off" placeholder="不修改密码请留空"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="userData.name" autocomplete="off"></el-input>
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
            <el-form-item label="邮箱：">
              <el-input v-model="userData.email" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="调度信息：" prop="dispatch">
              <el-select v-model="userData.dispatch">
                <el-option label="普通" :value="1"></el-option>
                <el-option label="司机" :value="2"></el-option>
                <el-option label="车长" :value="3"></el-option>
                <el-option label="值班调度" :value="4"></el-option>
                <el-option label="车站值班员" :value="5"></el-option>
                <el-option label="施工队长" :value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号码：">
              <el-input v-model="userData.phone" autocomplete="off"></el-input>
            </el-form-item>
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
      userData: {},
      userSearch: {},
      userAddRules: {
        name: [
          {
            required: true,
            message: "请输入姓名2~30个字符",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ],
        user_name: [
          {
            required: true,
            message: "请输入用户名2~30个字符",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
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
            message: "请输入密码2~30个字符",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ],
        passwordEdit: [
          {
            min: 2,
            max: 30,
            message: "请输入密码在2到30个字符",
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
        ]
      },
      passwordOrg: "",
      companySelectList: [],
      departSelectList: [],
      postSelectList: []
    };
  },
  created() {
    this.getCompanyLists();
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
          this.puserPage_total = data.data.last_page;
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
    this.userSearch.user_name="";
     this.userSearch.company_id="";
    this.userSearch.depart_id="";
      this.userSearch.post_id="";
      this.getUserLists();
    },
    openAddUser() {
      this.userData = {};
      this.userDialogVisible = true;
      this.userDialogTitle = "添加人员信息";
    },
    addUser() {
      this.$refs["userRulesForm"].validate(valid => {
        if (valid) {
          let data = this.userData;
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
    }
  }
  //
};
</script>

<style>
.dialog-user .el-textarea {
  width: 100% !important;
}
.dialog-user .el-textarea__inner {
  height: 80px;
}
.dialog-user .el-form-item__label {
  width: 110px;
}
.dialog-user .el-form-item__content {
  margin-left: 110px;
}
.dialog-user .el-input--medium {
  width: 100%;
}
.dialog-user .el-select {
  width: 100%;
}
</style>
