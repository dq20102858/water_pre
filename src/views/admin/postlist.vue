<template>
  <div id="admins">
    <div class="el-menu-top">
      <el-menu router default-active="postlist" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-peple.png')" />人员管理
        </li>
        <el-menu-item index="admin">公司列表</el-menu-item>
        <el-menu-item index="departlist">部门列表</el-menu-item>
        <el-menu-item index="postlist">职位列表</el-menu-item>
        <el-menu-item index="userlist">人员列表</el-menu-item>
      </el-menu>
    </div>
    <!-- postShow -->
    <div id="post" v-show="postShow">
      <div class="app-page">
        <div class="app-page-container">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item>
                <el-button type="primary" icon="el-icon-plus" @click="openAddPost">添加职位</el-button>
              </el-form-item>

              <el-form-item label="公司">
                <el-select v-model="pid" @change="getDepartLists(pid)">
                  <el-option
                    v-for="item in this.companySelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门">
                <el-select v-model="post_search_pid" ref="departselectClear">
                  <el-option
                    v-for="item in this.departSelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="form-so">
                <label class="el-form-item__label"></label>
                <el-button
                  size="small"
                  icon="el-icon-search"
                  type="primary"
                  @click="postSearchPage"
                >查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="app-table">
            <el-table :data="postLists" ref="multipleTable">
              <el-table-column type="index" label="序号" align="center"></el-table-column>
              <el-table-column prop="company" label="公司名称" align="center"></el-table-column>
              <el-table-column prop="depart" label="部门名称" align="center"></el-table-column>
              <el-table-column prop="name" label="职位名称" align="center"></el-table-column>
              <el-table-column prop="description" label="职位详情" align="center"></el-table-column>
              <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
              <el-table-column prop="update_time" label="修改时间" align="center"></el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-blue" size="mini" @click="detailPost(scope.row.id)">修改</el-button>
                    <el-button class="btn-red" size="mini" @click="delPost(scope.row.id)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="app-pagination">
              <el-pagination
                class="pagination"
                v-if="postLists.length !== 0"
                layout="slot,prev, pager, next,slot,total"
                :page-size="postPage_size"
                :current-page="this.postPage_cur"
                :total="this.postPage_items"
                @current-change="postChangePage"
                prev-text="上一页"
                next-text="下一页"
              >
                <button @click="postFirstPage" type="button" class="btn-first">
                  <span>首页</span>
                </button>
                <button @click="postLastPage" type="button" class="btn-last">
                  <span>尾页</span>
                </button>
              </el-pagination>
            </div>
          </div>
          <el-dialog
            width="580px"
            class="dialog-company"
            title="添加职位信息"
            :close-on-click-modal="false"
            :visible.sync="postDialogVisible"
          >
            <el-form
              :model="postData"
              class="el-form-custom"
              :rules="postAddRules"
              ref="postRulesForm"
            >
              <el-form-item label="公司名称：" prop="pid" v-if="postDialogTitle=='添加职位信息'">
                <el-select v-model="postData.pid" @change="getDepartLists($event)">
                  <el-option
                    v-for="item in this.companySelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="部门名称："
                prop="sub_pid"
                ref="departselectClear"
                v-if="postDialogTitle=='添加职位信息'"
              >
                <el-select v-model="postData.sub_pid">
                  <el-option
                    v-for="item in this.departSelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位名称：" prop="name">
                <el-input v-model="postData.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="职位详情：" prop="description">
                <el-input v-model="postData.description" autocomplete="off" type="textarea"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="postDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addPost(3)">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <!-- end  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      postLists: [],
      post_search_pid: "",
      postPage_size: 20,
      postPage_cur: 1,
      postPage_items: 0,
      postPage_total: 0,
      postDialogVisible: false,
      postDialogTitle: "",
      postData: {},
      postAddRules: {
        pid: [
          {
            required: true,
            message: "请选择公司",
            trigger: "change"
          }
        ],
        sub_pid: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入职位名称2~30个字符",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ],
        description: [
          { min: 2, max: 500, message: "长度在2到500个字符", trigger: "blur" }
        ]
      },
      search_pid: "",
      pid: "",
      sub_pid: "",
      post_pid: "",
      companySelectLists: [],
      departSelectLists: [],
      postSelectLists: []
    };
  },
  created() {
    this.getPageLists(1);
  },
  methods: {
    getPageLists(type) {
      //type  1 公司  2 部门 3 职位
      let par = {};
      let page = 1;
      if (type == 1) {
        page = this.companyPage_cur;
        par = { page, type };
      } else if (type == 2) {
        page = this.departPage_cur;
        let pid = this.search_pid;
        par = { page, type, pid };
      } else {
        page = this.postPage_cur;
        let pid = this.post_search_pid;
        par = { page, type, pid };
      }
      this.request({
        url: "/company/getPageLists",
        method: "get",
        params: par
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          if (type == 1) {
            this.companyLists = data.data.data;
            this.companyPage_size = data.data.per_page;
            this.companyPage_cur = parseInt(data.data.current_page);
            this.companyPage_items = parseInt(data.data.total);
            this.companyPage_total = parseInt(data.data.last_page);
          } else if (type == 2) {
            this.departLists = data.data.data;
            this.departPage_size = data.data.per_page;
            this.departPage_cur = parseInt(data.data.current_page);
            this.departPage_items = parseInt(data.data.total);
            this.departPage_total = parseInt(data.data.last_page);
          } else {
            this.postLists = data.data.data;
            this.departPage_size = data.data.per_page;
            this.postPage_cur = parseInt(data.data.current_page);
            this.postPage_items = parseInt(data.data.total);
            this.postPage_total = parseInt(data.data.last_page);
          }
        }
      });
    },

    //职位
    postChangePage(value) {
      this.postPage_cur = value;
      this.getPageLists(3);
    },
    postFirstPage() {
      this.postPage_cur = 1;
      this.getPageLists(3);
    },
    postLastPage() {
      this.postPage_cur = this.departPage_total;
      this.getPageLists(3);
    },
    postSearchPage() {
      this.postPage_cur = 1;
      this.getPageLists(3);
    },
    openAddPost() {
      this.postDialogTitle = "添加职位信息";
      this.postDialogVisible = true;
      this.postData = {};
    },
    addPost(type) {
      this.$refs["postRulesForm"].validate(valid => {
        if (valid) {
          let data = this.postData;
          this.postData.type = 3;
          let url = "/company/addCompanyDo";
          let baseid = this.postData.id;
          if (typeof baseid != "undefined") {
            url = "/company/editCompany";
          }
          this.request({
            url: url,
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.postDialogVisible = false;
              this.$message({
                type: "success",
                message: "保存成功！"
              });
              this.getPageLists(3);
            }
          });
        }
      });
    },
    detailPost(id) {
      this.postDialogTitle = "修改职位信息";
      this.postDialogVisible = true;
      this.request({
        url: "/company/getDepartDetail",
        method: "get",
        params: { id: id }
      }).then(response => {
        var data = response.data;
        if (data.status == 1) {
          this.postData = data.data;
        }
      });
    },
    delPost(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
        ,customClass:"el-message-box-new"
      }).then(() => {
        this.request({
          url: "/company/deleteCompany",
          method: "post",
          data: { id: id }
        }).then(res => {
          let data = res.data;
          if (data.status == 1) {
            this.$message({
              type: "success",
              message: "删除成功！"
            });
            this.getPageLists(3);
          }
        });
      }).catch(()=>{});
    },
    //公司 部门 职位
    getCompanyLists() {
      let pid = 0;
      let type = 1;
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid, type }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.companySelectLists = data.data;
        }
      });
    },

    getDepartLists(val) {
      this.$set(this.postData, "sub_pid", "");
      this.$set(this.userData, "depart_id", "");
      this.$set(this.userData, "post_id", "");
      this.departSelectLists = [];
      console.log("this.companyData.sub_pid：" + this.companyData.sub_pid);
      let pid = val;
      let type = 2;
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid, type }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.departSelectLists = data.data;
        }
      });
    },
    getPostLists(pid) {
      this.$set(this.userData, "post_id", "");
      let type = 3;
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid, type }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.postSelectLists = data.data;
        }
      });
    },
    getDepartListSearch(val) {
      console.log("this.companyData.sub_pid：" + this.companyData.sub_pid);
      let pid = val;
      let type = 2;
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid, type }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.departSelectLists = data.data;
        }
      });
    },
    getPostListSearch(pid) {
      let type = 3;
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid, type }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.postSelectLists = data.data;
        }
      });
    }
  }
  //
};
</script>

<style>
.admins .el-dialog {
  width: 500px !important;
}
.dialog-company .el-textarea {
  width: 100% !important;
}
.dialog-company .el-textarea__inner {
  height: 80px;
}
.dialog-company .el-form-item__label {
  width: 110px;
}
.dialog-company .el-form-item__content {
  margin-left: 110px;
}
.dialog-company .el-input--medium {
  width: 100%;
}
.dialog-company .el-select {
  width: 100%;
}
</style>
