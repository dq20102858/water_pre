<template>
  <div id="admins">
    <div class="el-menu-top">
      <el-menu router default-active="admin" mode="horizontal">
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
              <el-button type="primary" icon="el-icon-plus" @click="openAddCompany">添加公司</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="app-table">
          <el-table :data="companyLists">
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="公司名称" align="center"></el-table-column>
            <el-table-column prop="description" label="公司详情" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="color_tag" label="标签颜色" align="center"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="update_time" label="修改时间" align="center"></el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-blue" size="mini" @click="detailCompany(scope.row.id)">修改</el-button>
                  <el-button class="btn-red" size="mini" @click="delCompany(scope.row.id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="app-pagination">
            <el-pagination
              class="pagination"
              v-if="companyLists.length !== 0"
              layout="slot,prev, pager, next,slot,total"
              :page-size="companyPage_size"
              :current-page="this.companyPage_cur"
              :total="this.companyPage_items"
              @current-change="companyChangePage"
              prev-text="上一页"
              next-text="下一页"
            >
              <button @click="companyFirstPage" type="button" class="btn-first">
                <span>首页</span>
              </button>
              <button @click="companyLastPage" type="button" class="btn-last">
                <span>尾页</span>
              </button>
            </el-pagination>
          </div>
        </div>

        <el-dialog
          width="580px"
          class="dialog-company"
          :title="companyDialogTitle"
          :visible.sync="companyDialogVisible"
          :close-on-click-modal="false"
        >
          <el-form
            :model="companyData"
            class="el-form-custom"
            :rules="companyAddRules"
            ref="companyRulesForm"
          >
            <el-form-item label="公司名称：" prop="name">
              <el-input
                v-model="companyData.name"
                autocomplete="off"
                maxlength="20"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="标签颜色：">
              <el-select v-model="companyData.color">
                <el-option label="默认" :value="0"></el-option>
                <el-option label="红色" :value="1"></el-option>
                <el-option label="橙色" :value="2"></el-option>
                <el-option label="黄色" :value="3"></el-option>
                <el-option label="绿色" :value="4"></el-option>
                <el-option label="青色" :value="5"></el-option>
                <el-option label="蓝色" :value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公司简介：" prop="description">
              <el-input
                v-model="companyData.description"
                autocomplete="off"
                type="textarea"
                maxlength="30"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="companyDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCompany()">确 定</el-button>
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
      companyLists: [],
      companyPage_size: 20,
      companyPage_cur: 1,
      companyPage_items: 0,
      companyPage_total: 0,
      companyDialogVisible: false,
      companyDialogTitle: "",
      companyData: {
        color: "默认"
      },
      companyAddRules: {
        name: [
          {
            required: true,
            message: "请输入公司名称2~30个字符",
            trigger: "blur"
          },
          { pattern: /^\s+/, message: "首位不能有空格", trigger: "blur" }
          //   /(^\s*)|(\s*$)/g
        ],
        description: [
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getPageLists();
  },
  methods: {
    getPageLists() {
      //type  1 公司  2 部门 3 职位
      let type = 1;
      let page = this.companyPage_cur;
      this.request({
        url: "/company/getPageLists",
        method: "get",
        params: { page, type }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.companyLists = data.data.data;
          this.companyPage_size = data.data.per_page;
          this.companyPage_cur = parseInt(data.data.current_page);
          this.companyPage_items = parseInt(data.data.total);
          this.companyPage_total = parseInt(data.data.last_page);
        }
      });
    },
    //公司
    companyChangePage(value) {
      this.companyPage_cur = value;
      this.getPageLists();
    },
    companyFirstPage() {
      this.companyPage_cur = 1;
      this.getPageLists();
    },
    companyLastPage() {
      this.companyPage_cur = this.companyPage_total;
      this.getPageLists();
    },
    openAddCompany() {
      this.companyDialogVisible = true;
      this.companyDialogTitle = "添加公司信息";
      this.companyData = {
        color: "默认"
      };
    },

    addCompany() {
      console.log("this.companyData.id：" + this.companyData.id);
      this.$refs["companyRulesForm"].validate(valid => {
        if (valid) {
          let data = this.companyData;
          this.companyData.type = 1;
          if (this.companyData.color == "默认") {
            this.companyData.color = 0;
          }
          let url = "/company/addCompanyDo";
          let baseid = this.companyData.id;
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
              this.companyDialogVisible = false;
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
    detailCompany(id) {
      this.companyDialogVisible = true;
      this.companyDialogTitle = "修改公司信息";
      this.request({
        url: "/company/getDepartDetail",
        method: "get",
        params: { id: id }
      }).then(response => {
        var data = response.data;
        if (data.status == 1) {
          this.companyData = data.data;
        }
      });
    },
    delCompany(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      })
        .then(() => {
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
        })
        .catch(() => {});
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
