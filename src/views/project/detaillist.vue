<template>
  <div id="project">
    <div class="el-menu-top">
      <el-menu router default-active="detaillist" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-project.png')" />工程进度
        </li>
        <el-menu-item index="project">添加作业</el-menu-item>
        <el-menu-item index="schedule">计划日程</el-menu-item>
        <el-menu-item index="detaillist">详情列表</el-menu-item>
        <el-menu-item index="chartdata">图表数据</el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div id="detail">
        <div class="app-page-container">
          <el-form :model="searchForm" :inline="true">
            <el-form-item>
              <el-button size="small" icon="el-icon-plus" type="primary" @click="addHistory">添加历史记录</el-button>
            </el-form-item>
            <el-form-item label="作业">
              <el-select
                v-model="searchForm.work"
                clearable
                placeholder="请选择作业"
                class="search-input search-select"
              >
                <el-option
                  v-for="item in workLists"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >{{item.name}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择时间">
              <el-date-picker
                v-model="searchForm.time_range"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="完成状态">
              <el-select
                v-model="searchForm.is_finish"
                placeholder="请选择状态"
                class="search-input search-select"
                style="width:140px;"
              >
                <el-option label="全部" value="-1" selected>全部</el-option>
                <el-option label="已完成" value="1">已完成</el-option>
                <el-option label="未完成" value="0">未完成</el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                size="small"
                icon="el-icon-search"
                type="primary"
                @click="detailSearchPage"
              >查询</el-button>
            </el-form-item>
          </el-form>

          <div class="app-table">
            <el-table :data="detailListPages" ref="multipleTable">
              <el-table-column type="index" label="序号" align="center"></el-table-column>
              <el-table-column prop="pro_name" label="作业名称" align="center"></el-table-column>
              <el-table-column label="计划完成" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.plan_num>0">{{scope.row.plan_num}}</span>
                  <span v-else>{{scope.row.plan_tip}}</span>
                </template>
              </el-table-column>
              <el-table-column label="实际完成" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.plan_num>0">{{scope.row.true_num}}</span>
                  <span v-else>{{scope.row.true_tip}}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_finish == 1">已完成</span>
                  <span v-else>未完成</span>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="plan_date" label="日期" align="center"></el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-blue" size="mini" @click="getPlanDetail(scope.row.id)">修改</el-button>
                    <el-button class="btn-red" size="mini" @click="deletePlan(scope.row.id)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="app-pagination">
            <el-pagination
              class="pagination"
              v-if="detailListPages.length !== 0"
              layout="slot,prev, pager, next,slot,total"
              :current-page="this.detailPage"
              :total="this.detailTotal"
              :page-size="this.detailPageSize"
              @current-change="detailPageChange"
              prev-text="上一页"
              next-text="下一页"
            >
              <button @click="detailPageFirst" type="button" class="btn-first">
                <span>首页</span>
              </button>
              <button @click="detailPageLast" type="button" class="btn-last">
                <span>尾页</span>
              </button>
            </el-pagination>
          </div>
          <el-dialog
            width="700px"
            :close-on-click-modal="false"
            class="dialog-plan-detail"
            :title="this.historyTitle"
            :visible.sync="dialogAddHistoryVisible"
          >
            <el-form
              :model="historyData"
              :rules="historyRules"
              ref="detailForm"
              class="el-form-custom"
            >
              <div class="ptxtbox" v-show="!addShow">
                <el-form-item label="作业名称：" class="widhtss">
                  <el-input v-model="historyData.pro_name" disabled></el-input>
                </el-form-item>
                <el-form-item label="线别：" v-if="historyDataType==1" class="widhtss">
                  <el-input v-model="historyData.line_type_desc" disabled></el-input>
                </el-form-item>
                <el-form-item label="完成日期：" class="widhtss">
                  <el-input v-model="historyData.plan_time" disabled></el-input>
                </el-form-item>
              </div>
              <el-form-item label="作业名称：" prop="pro_id" v-show="addShow">
                <el-select
                  v-model="historyData.pro_id"
                  clearable
                  placeholder="请选择作业"
                  @change="changeWorkListItem"
                >
                  <el-option
                    v-for="item in workLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="计划数量：" prop="plan_num" v-if="historyDataType==2">
                <el-input v-model="historyData.plan_num" autocomplete="off" placeholder="请输入数字"></el-input>
              </el-form-item>
              <el-form-item label="实际数量：" prop="true_num" v-if="historyDataType==2">
                <el-input v-model="historyData.true_num" autocomplete="off" placeholder="请输入个，股，孔等"></el-input>
              </el-form-item>

              <div v-if="historyDataType==1" style="padding-bottom:25px;">
                <el-form-item label="线别：" prop="line_type" v-show="addShow">
                  <el-select
                    v-model="historyData.line_type"
                    @change="changeWorkLineTypeList"
                    clearable
                    placeholder="请选择线别"
                  >
                    <el-option
                      v-for="item in workLineTypeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                  <div class="el-form-item__error">{{lineTypeDes}}</div>
                </el-form-item>
                <el-form-item label="计划里程：" prop="start_flag">
                  <b>DK</b>
                  <el-input class="pinput" v-model="historyData.start_flag" placeholder="公里"></el-input>+
                  <el-input class="pinput" v-model="historyData.start_length" placeholder="米"></el-input>
                  <em>~</em>
                  <b>DK</b>
                  <el-input class="pinput" v-model="historyData.end_flag" placeholder="公里"></el-input>+
                  <el-input class="pinput" v-model="historyData.end_length" placeholder="米"></el-input>
                </el-form-item>
                <el-form-item label="实际里程：" prop="t_start_flag">
                  <b>DK</b>
                  <el-input class="pinput" v-model="historyData.t_start_flag" placeholder="公里"></el-input>+
                  <el-input class="pinput" v-model="historyData.t_start_length" placeholder="米"></el-input>
                  <em>~</em>
                  <b>DK</b>
                  <el-input class="pinput" v-model="historyData.t_end_flag" placeholder="公里"></el-input>+
                  <el-input class="pinput" v-model="historyData.t_end_length" placeholder="米"></el-input>
                </el-form-item>
              </div>

              <el-form-item label="完成日期：" prop="plan_time" v-show="addShow">
                <el-date-picker v-model="historyData.plan_time" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="是否完成：" prop="is_finish">
                <el-radio v-model="historyData.is_finish" label="1" value="1">是</el-radio>
                <el-radio v-model="historyData.is_finish" label="0" value="0">否</el-radio>
              </el-form-item>
              <el-form-item label="备注：" prop="remark">
                <el-input
                  v-model="historyData.remark"
                  placeholder="填写备注"
                  type="textarea"
                  maxlength="30"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button @click="dialogAddHistoryVisible = false">关闭</el-button>
              <el-button type="primary" @click="addOrEditPlanDo()">确定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      detailListPages: [],
      detailPage: 1,
      detailTotal: 0,
      detailPageSize: 20,
      detailPage_total: 0,
      searchForm: {
        is_finish: "全部"
      },
      dialogAddHistoryVisible: false,
      historyData: {},
      historyDataType: 1,
      historyTitle: "",
      historyRules: {
        pro_id: [{ required: true, message: "请选择作业", trigger: "change" }],
        line_type: [
          { required: true, message: "请选择线别", trigger: "change" }
        ],
        start_flag: [
          { required: true, message: "请输入计划里程", trigger: "blur" }
        ],
        t_start_flag: [
          { required: true, message: "请输入实际里程", trigger: "blur" }
        ],
        plan_time: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        plan_num: [
          { required: true, message: "请输入计划数量", trigger: "blur" },
          {
            pattern: /^\d{1,5}$/,
            message: "请输入1-5位正整数",
            trigger: "blur"
          }
        ],
        true_num: [
          {
            pattern: /^\d{1,5}$/,
            message: "请输入1-5位正整数",
            trigger: "blur"
          }
        ],
        is_finish: [
          { required: true, message: "请选择是否完成", trigger: "change" }
        ],
        remark: [
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ]
      },
      workLists: [],
      workLineTypeList: [],
      lineTypeListDes: [],
      lineTypeDes: "",
      lineTypeStartTotal: 0,
      lineTypeEndTotal: 0,
      addShow: true
    };
  },
  created() {
    this.getWorkList();
    this.getDetailLists();
  },
  methods: {
    //获取分页列表数据
    getDetailLists() {
      let page = this.detailPage;
      let pro_id = this.searchForm.work;
      let time_range = this.searchForm.time_range;
      let is_finish = this.searchForm.is_finish;
      if (this.searchForm.is_finish == -1) {
        is_finish = null;
      }
      console.log(this.searchForm);
      this.request({
        url: "/project/getPlanPages",
        method: "get",
        params: { page, pro_id, time_range, is_finish }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.detailListPages = data.data.data;
          this.detailPage = parseInt(data.data.current_page);
          this.detailTotal = parseInt(data.data.total);
          this.detailPageSize = data.data.per_page;
          this.detailPage_total = parseInt(data.data.last_page);
        }
      });
    },
    detailPageChange(value) {
      this.detailPage = value;
      this.getDetailLists();
    },
    detailPageFirst() {
      this.detailPageChange(1);
    },
    detailPageLast() {
      this.detailPage = this.detailPage_total;
      this.detailPageChange(this.detailPage_total);
    },
    detailSearchPage() {
      this.detailPage = 1;
      this.getDetailLists();
    },

    //获取二级分类
    getWorkList() {
      this.request({
        url: "/project/getWorkTypeList",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.workLists = data.data;
        }
      });
    },
    changeWorkListItem(value) {
      const that = this;
      this.$set(this.historyData, "line_type", "");
      this.lineTypeDes = "";
      let selectedLineTypeLists = [];
      let selectedLineTypeDes = [];

      this.workLists.forEach(function(item) {
        if (item.id == value) {
          selectedLineTypeLists = item.line_type_lists;
          selectedLineTypeDes = item.des;
          that.historyDataType = item.type;
        }
      });
      this.workLineTypeList = selectedLineTypeLists;
      this.lineTypeListDes = selectedLineTypeDes;
    },

    changeWorkLineTypeList(value) {
      this.lineTypeListDes.map((item, i) => {
        if (item.line_type == value) {
          this.lineTypeDes = item.tip;
          this.lineTypeStartTotal =
            item.total_start_flag * 1000 + parseInt(item.total_start_length);
          this.lineTypeEndTotal =
            item.total_end_flag * 1000 + parseInt(item.total_end_length);
          console.log(
            "lineTypeStartTotal：" +
              this.lineTypeStartTotal +
              " lineTypeEndTotal：" +
              this.lineTypeEndTotal
          );
          //console.log(item.tip);
        }
      });
    },
    //打开添加弹窗
    addHistory() {
      this.dialogAddHistoryVisible = true;
      this.historyTitle = "添加历史记录";
      this.addShow = true;
      this.lineTypeDes = "";
      this.historyData = {
        pro_id: "",
        line_type: "",
        plan_num: "",
        true_num: "",
        start_flag: "",
        start_length: ""
      };
    },
    addOrEditPlanDo() {
      this.$refs["detailForm"].validate(valid => {
        if (valid) {
          let data = this.historyData;

          let start =
            this.historyData.start_flag * 1000 +
            parseInt(this.historyData.start_length);
          let end =
            this.historyData.end_flag * 1000 +
            parseInt(this.historyData.end_length);
          let t_start =
            this.historyData.t_start_flag * 1000 +
            parseInt(this.historyData.t_start_length);
          let t_end =
            this.historyData.t_end_flag * 1000 +
            parseInt(this.historyData.t_end_length);
          if (this.addShow == true) {
            if (
              start < this.lineTypeStartTotal ||
              end > this.lineTypeEndTotal
            ) {
              this.$message.error("请输入" + this.lineTypeDes);
              return;
            }
          }
          if (end < start) {
            this.$message.error("输入的计划结束里程不能小于开始里程");
            return;
          }
          if (t_start < start) {
            this.$message.error("输入的实际开始里程不能小于计划开始里程");
            return;
          }
          if (t_end > end) {
            this.$message.error("输入的实际结束里程不能大于实话开始里程");
            return;
          }
          if (t_end < t_start) {
            this.$message.error("输入的实际结束里程不能小于开始里程");
            return;
          }
          this.request({
            url: "/project/addOrEditPlan",
            method: "post",
            data
          }).then(response => {
            let data = response.data;
            let msg = "";
            if (data.status == 1) {
              this.$message({
                showClose: true,
                message: "保存成功",
                type: "success"
              });
              this.getDetailLists();
              this.dialogAddHistoryVisible = false;
            } else {
              this.$message({
                showClose: true,
                message: "保存失败",
                type: "error"
              });
            }
          });
        }
      });
    },
    getPlanDetail(id) {
      this.historyTitle = "修改历史记录 ";
      this.addShow = false;
      this.request({
        url: "/project/getPlanDetail",
        method: "get",
        params: { id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.historyData = data.data;
          this.historyData.is_finish = this.historyData.is_finish.toString();
          if (data.data.plan_num > 0) {
            this.dialogAddHistoryVisible = true;
            this.historyDataType = 2;
          } else {
            this.dialogAddHistoryVisible = true;
            this.historyDataType = 1;
          }
        }
      });
    },
    deletePlan(id) {
      this.$confirm("您确定删除作业?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      })
        .then(() => {
          let data = {
            id: id
          };
          this.request({
            url: "/project/deletePlan",
            method: "post",
            data
          }).then(response => {
            let data = response.data;
            if (data.status == 1) {
              this.$message({
                showClose: true,
                message: "删除成功",
                type: "success"
              });
              this.getDetailLists();
            } else {
              this.$message({
                showClose: true,
                message: "删除失败",
                type: "error"
              });
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
.ptxtbox {
  margin-bottom: 25px;
}

.dialog-plan-detail .el-form-item__label {
  width: 110px;
}
.dialog-plan-detail .el-form-item__content {
  margin-left: 110px;
}

.dialog-plan-detail .el-form-item {
  margin-bottom: 25px;
}
.dialog-plan-detail .el-form-item em {
  padding: 0 10px;
}
.dialog-plan-detail .el-form-item:last-child {
  margin-bottom: 0;
}
.dialog-plan-detail .el-input__inner {
  border: 1px #9db9fa solid;
  color: #4b6eca;
  width: 100%;
}
.dialog-plan-detail .el-form-item__error {
  padding-top: 5px;
}
.dialog-plan-detail .el-select {
  width: 100%;
}
.dialog-plan-detail .el-input {
  width: auto;
}
.dialog-plan-detail .widhtss .el-input {
  width: 100%;
}
.dialog-plan-detail .pinput input {
  width: 55px;
  margin: 0 3px;
  padding: 0 5px;
  height: 31px !important;
  text-align: center;
}
.dialog-plan-detail .el-textarea {
  width: 100%;
}
.dialog-plan-detail .el-textarea__inner {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
}
/* end detail */

.app-page-container {
  border-radius: 6px;
  padding: 20px;
  background: #fff;
}
</style>
