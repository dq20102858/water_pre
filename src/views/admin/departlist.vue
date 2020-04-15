<template>
  <div id="admins">
    <div class="el-menu-top">
      <el-menu router default-active="departlist" mode="horizontal">
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
            <el-form-item   class="form-add-item">
              <el-button type="primary" icon="el-icon-plus" @click="openAddDepart">添加部门</el-button>
            </el-form-item>
            <el-form-item label="公司">
              <el-select v-model="search_pid" placeholder="请选择公司">
                <el-option
                  v-for="item in this.companySelectList"
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
                @click="departSearchPage"
                type="primary"
              >查询</el-button>
                <el-button size="small"   plain  @click="resetSerach">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="app-table">
          <el-table :data="departLists" ref="multipleTable">
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="company" label="公司名称" align="center"></el-table-column>
            <el-table-column prop="name" label="部门名称" align="center"></el-table-column>
            <el-table-column label="是否属于施工队" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.is_work_team === 0">否</el-tag>
                <el-tag v-else type="success">是</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="description" label="部门详情" width="200" align="center"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="200" align="center"></el-table-column>
            <el-table-column prop="update_time" label="修改时间" width="200" align="center"></el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-blue" size="mini" @click="detailDepart(scope.row.id)">修改</el-button>
                  <el-button class="btn-red" size="mini" @click="delDepart(scope.row.id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="app-pagination">
            <el-pagination
              class="pagination"
              v-if="departLists.length !== 0"
              layout="slot,prev, pager, next,slot,total"
              :page-size="departPage_size"
              :current-page="this.departPage_cur"
              :total="this.departPage_items"
              @current-change="departChangePage"
              prev-text="上一页"
              next-text="下一页"
            >
              <button @click="departFirstPage" type="button" class="btn-first">
                <span>首页</span>
              </button>
              <button @click="departLastPage" type="button" class="btn-last">
                <span>尾页</span>
              </button>
            </el-pagination>
          </div>
        </div>
        <el-dialog
          width="580px"
          class="dialog-depart"
          :title="departDialogTitle"
          :visible.sync="departDialogVisible"
          :close-on-click-modal="false"
        >
          <el-form
            :model="departData"
            class="el-form-custom"
            :rules="departAddRules"
            ref="departRulesForm"
          >
            <el-form-item label="公司名称：" prop="pid" v-if="departDialogTitle=='添加部门信息'">
              <el-select v-model="departData.pid">
                <el-option
                  v-for="item in this.companySelectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门名称：" prop="name">
              <el-input v-model="departData.name" autocomplete="off" maxlength="20" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="是否属于施工队：" prop="is_work_team">
              <el-radio-group v-model="departData.is_work_team">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="部门简介：" prop="description">
              <el-input v-model="departData.description" autocomplete="off" type="textarea" maxlength="30" show-word-limit></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="departDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addDepart()">确 定</el-button>
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
      departLists: [],
      departPage_cur: 1,
      departPage_size: 20,
      departPage_items: 0,
      departPage_total: 0,
      departDialogVisible: false,
      departDialogTitle: "",
      departData: {},
      departAddRules: {
        pid: [
          {
            required: true,
            message: "请选择公司",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入部门名称2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" },
           { pattern: /(^\S+).*(\S+$)/, message: "开始和结尾不能有空格", trigger: "blur" }
        ],
        is_work_team: [
          {
            required: true,
            message: "请选择施工队",
            trigger: "change"
          }
        ],
        description: [
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ]
      },
      search_pid: '',
      companySelectList: [],
      departSelectLists: [],
      postSelectLists: []
    };
  },
      mounted() {
    document
      .querySelector("#app-menu-items #menu_admin")
      .classList.add("is-active");
  },
  created() {
    this.getCompanyLists();
    this.getPageLists();
  },
  methods: {
    getPageLists() {
      //type  1 公司  2 部门 3 职位
      let page = this.departPage_cur;
      let type = 2;
      let pid = this.search_pid;
      this.request({
        url: "/company/getPageLists",
        method: "get",
        params: { page, type, pid }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.departLists = data.data.data;
          this.departPage_size = data.data.per_page;
          this.departPage_cur = parseInt(data.data.current_page);
          this.departPage_items = parseInt(data.data.total);
          this.departPage_total = parseInt(data.data.last_page);
        }
      });
    },

    //部门
    departChangePage(value) {
      this.departPage_cur = value;
      this.getPageLists();
    },
    departFirstPage() {
      this.departPage_cur = 1;
      this.getPageLists();
    },
    departLastPage() {
      this.departPage_cur = this.departPage_total;
      this.getPageLists();
    },
    departSearchPage() {
      this.departPage_cur = 1;
      this.getPageLists();
    },
     resetSerach() {
      this.search_pid = "";
      this.getPageLists();
    },
    openAddDepart() {
      this.departDialogVisible = true;
      this.departDialogTitle = "添加部门信息";
      this.departData = {};
    },
    addDepart() {
      this.$refs["departRulesForm"].validate(valid => {
        if (valid) {
          let data = this.departData;
          this.departData.type = 2;
          let url = "/company/addCompanyDo";
          let baseid = this.departData.id;
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
              this.departDialogVisible = false;
              this.$message({
                type: "success",
                message: "保存成功！"
              });
              this.getPageLists();
            }
          });
        }
      });
    },
    detailDepart(id) {
      this.departDialogTitle = "修改部门信息";
      this.departDialogVisible = true;
      this.request({
        url: "/company/getDepartDetail",
        method: "get",
        params: { id: id }
      }).then(response => {
        var data = response.data;
        if (data.status == 1) {
          this.departData = data.data;
        }
      });
    },
    delDepart(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass:"el-message-box-new"
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
            this.getPageLists();
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
          this.companySelectList = data.data;
        }
      });
    },
   
  }
  //
};
</script>

<style>
.admins .el-dialog {
  width: 500px !important;
}
.dialog-depart .el-textarea {
  width: 100% !important;
}
.dialog-depart .el-textarea__inner {
  height: 80px;
}
.dialog-depart .el-form-item__label {
  width: 140px;
}
.dialog-depart .el-form-item__content {
  margin-left: 140px;
}
.dialog-depart .el-input--medium {
  width: 100%;
}
.dialog-depart .el-select {
  width: 100%;
}
</style>
