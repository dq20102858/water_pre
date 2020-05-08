<template>
  <div id="monitor">
    <div class="el-menu-top">
      <el-menu router default-active="set" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-peple.png')" />消息
        </li>
      </el-menu>
      <!-- <div @click="goDetail()">to apple</div> -->
    </div>
    <div class="app-page">
      <div class="app-page-container">
        <div class="app-page-select">
          <el-form :inline="true">
            <el-form-item>
              <el-button type="primary" icon="el-icon-plus" @click="goAdd">添加消息</el-button>
            </el-form-item>
            <!-- <div class="el-serach">
              <el-input v-model="searchName" autocomplete="off" placeholder="请输入名称查询" clearable></el-input>
              <el-button @click="searchEvent">查询</el-button>
            </div>-->
          </el-form>
        </div>
        <div class="app-table">
          <el-table :data="dataList">
            <el-table-column label="序号">
              <template scope="scope">
                <span>{{scope.$index+(page_cur - 1) * page_size + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="消息主题"></el-table-column>
            <el-table-column prop="send_user" label="值班调度人"></el-table-column>
            <el-table-column prop="recept_type" label="发送对象">
              <template slot-scope="scope">
                <span class="statused" v-if="scope.row.recept_type=='1'">施工负责人</span>
                <span class="statused" v-if="scope.row.recept_type=='2'">施工人员</span>
                <span class="statused" v-if="scope.row.recept_type=='3'">行车</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="发布时间"></el-table-column>
            <el-table-column label="操作" width="65">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-blue" size="mini" @click="goDetail(scope.row)">详情</el-button>
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
        <el-dialog
          width="700px"
          :close-on-click-modal="false"
          class="dialog-msg"
          :title="this.diaLogTitle"
          :visible.sync="diaLogFormVisible"
        >
          <el-form class="el-form-custom" :model="formData" :rules="formRules" ref="formRulesRef">
            <el-form-item label="消息主题：" prop="title">
              <el-input v-model="formData.title" autocomplete="off" maxlength="20" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="发送对象：" prop="recept_type">
              <el-checkbox-group v-model="formData.recept_type">
                <el-checkbox :label="1">施工负责人</el-checkbox>
                <el-checkbox :label="2">施工人员</el-checkbox>
                <el-checkbox :label="3">行车</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="消息内容：" prop="description">
              <el-input
                v-model="formData.description"
                autocomplete="off"
                type="textarea"
                maxlength="200"
                show-word-limit
              ></el-input>
            </el-form-item>
            <div class="blank"></div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="diaLogFormVisible = false">关闭</el-button>
            <el-button type="primary" @click="addEventDialog()">确定</el-button>
          </div>
        </el-dialog>
        <el-dialog
          width="700px"
          :close-on-click-modal="false"
          class="dialog-msg"
          title="消息详情"
          :visible.sync="diaLogShowFormVisible"
        >
          <el-form class="el-form-custom" :model="formDataShow">
            <el-form-item label="消息主题：">
              <el-input v-model="formDataShow.title" autocomplete="off" readonly></el-input>
            </el-form-item>
            <!-- <el-form-item label="发送对象：" prop="recept_type">
              <el-checkbox-group v-model="formData.recept_type">
                <el-checkbox :label="1">施工负责人</el-checkbox>
                <el-checkbox :label="2">施工人员</el-checkbox>
                <el-checkbox :label="3">行车</el-checkbox>
              </el-checkbox-group>
            </el-form-item>-->
            <el-form-item label="消息内容：">
              <el-input
                v-model="formDataShow.description"
                autocomplete="off"
                type="textarea"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="发送时间：">
              <el-input v-model="formDataShow.create_time" autocomplete="off" readonly></el-input>
            </el-form-item>
            <div class="blank"></div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="diaLogShowFormVisible = false">关闭</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      diaLogFormVisible: false,
      diaLogTitle: "发送消息",
      diaLogShowFormVisible: false,
      formDataShow: {},
      formData: {
        recept_type: []
      },
      formRules: {
        title: [
          {
            required: true,
            message: "请输入消息主题2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" },
          {
            pattern: /(^\S+).*(\S+$)/,
            message: "开始和结尾不能有空格",
            trigger: "blur"
          }
        ],
        recept_type: [
          {
            required: true,
            message: "请选择发送对象",
            trigger: "change"
          }
        ],
        description: [
          {
            required: true,
            message: "请输入消息内容2~200个字符",
            trigger: "blur"
          },
          { min: 2, max: 200, message: "长度在2到200个字符", trigger: "blur" },
          {
            pattern: /(^\S+).*(\S+$)/,
            message: "开始和结尾不能有空格",
            trigger: "blur"
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
      // let recept_type = "我们";
      this.request({
        url: "/message/getMessagePages",
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
    searchEvent() {
      this.page_cur = 1;
      this.getDataList();
    },

    goAdd() {
      this.diaLogTitle = "发送消息";
      this.diaLogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["formRulesRef"].clearValidate();
      });
      this.formData = {
        title: "",
        description: "",
        recept_type: []
      };
    },
    addEventDialog() {
      const that = this;
      this.$refs["formRulesRef"].validate(valid => {
        if (valid) {
          //this.formData.recept_type=JSON.stringify(that.formData.recept_type);
          let data = that.formData;
          this.request({
            url: "/message/addMessage",
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
    goDetail(rows) {
      this.diaLogShowFormVisible = true;
      this.formDataShow.title = rows.title;
      this.formDataShow.create_time = rows.create_time;
      this.formDataShow.description = rows.description;
      console.log(rows);
    },
    goDel(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      })
        .then(() => {
          this.request({
            url: "/search/deleteStation",
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
    }
    //
  }
};
</script>
<style>
.dialog-msg .el-textarea__inner {
  border: 1px #9db9fa solid;
  color: #4b6eca;
  height: 160px;
}
.dialog-msg .el-textarea {
  width: 100% !important;
}
.dialog-msg .el-form-item__label {
  width: 110px;
}
.dialog-msg .el-form-item__content {
  margin-left: 110px;
}
.dialog-msg .el-form-item-inline .el-input--medium {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.dialog-msg .el-form-item-inline input {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.dialog-msg .el-select {
  width: 100%;
}
</style>