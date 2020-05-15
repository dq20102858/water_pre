<template>
  <div id="project">
    <div class="el-menu-top">
      <el-menu router default-active="project" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-project.png')" />工程进度
        </li>
        <el-menu-item index="project" @click="workPageFirst">作业列表</el-menu-item>
        <el-menu-item index="schedule">计划日程</el-menu-item>
        <el-menu-item index="detaillist">详情列表</el-menu-item>
        <el-menu-item index="chartdata">图表数据</el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div id="work" class="app-table">
        <div class="app-page-container">
          <div class="addbtn">
            <el-button type="primary" icon="el-icon-plus" @click="openAddWork">添加作业</el-button>
          </div>
          <el-table :data="workLists" ref="multipleTable">
            <el-table-column prop="sort" label="作业顺序" align="center"></el-table-column>
            <el-table-column prop="name" label="作业名称" align="center"></el-table-column>
            <!-- <el-table-column prop="type" label="类型" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.type==1">里程</span>
              <span v-else>计数</span>
            </template>
            </el-table-column>-->
            <el-table-column prop="start_time" label="计划开始时间" align="center"></el-table-column>
            <el-table-column prop="end_time" label="计划结束时间" align="center"></el-table-column>
            <el-table-column prop="total" label="设计总量" align="center">
              <template slot-scope="scope">{{scope.row.total}}({{scope.row.unit}})</template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button
                    v-if="scope.row.type==1"
                    class="btn-blue"
                    size="mini"
                    @click="detailWork(scope.row.id)"
                  >查看</el-button>
                  <el-button class="btn-blue" size="mini" @click="editWork(scope.row.id)">修改</el-button>
                  <el-button class="btn-red" size="mini" @click="deleteWork(scope.row.id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="app-pagination">
            <el-pagination
              class="pagination"
              v-if="workLists.length !== 0"
              layout="slot,prev, pager, next,slot,total"
              :current-page="this.workPage"
              :total="this.workTotal"
              :page-size="this.workPageSize"
              @current-change="workPageChange"
              prev-text="上一页"
              next-text="下一页"
            >
              <button @click="workPageFirst" type="button" class="btn-first">
                <span>首页</span>
              </button>
              <button @click="workPageLast" type="button" class="btn-last">
                <span>尾页</span>
              </button>
            </el-pagination>
          </div>
        </div>
        <el-dialog
          width="700px"
          :close-on-click-modal="false"
          class="dialog-work"
          :title="this.title"
          :visible.sync="workVisible"
        >
          <el-form class="el-form-custom" :model="workData" :rules="workRules" ref="workForm">
            <el-form-item label="名称：" prop="name">
              <el-input
                v-model="workData.name"
                autocomplete="off"
                placeholder="请输入作业名称"
                maxlength="20"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="顺序：">
              <el-input
                v-model="workData.sort"
                autocomplete="off"
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                placeholder="请输入数字，数字越大越靠后"
                maxlength="4"
              ></el-input>
            </el-form-item>
            <div v-if="this.title=='添加作业信息'">
              <el-form-item label="类别：" prop="type">
                <el-radio v-model="workData.type" :label="1">里程</el-radio>
                <el-radio v-model="workData.type" :label="2">计数（个，股，孔）</el-radio>
              </el-form-item>
              <el-form-item label="线别：" prop="line_type" v-if="workData.type == 1">
                <el-checkbox-group v-model="workData.line_type">
                  <el-checkbox
                    v-for="item in lineTypeList"
                    :key="item.id"
                    :label="item.id"
                  >{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <div class="el-form-item-inline" v-if="workData.type==2">
                <el-form-item label="设计总量：" prop="total">
                  <el-input
                    v-model="workData.total"
                    autocomplete="off"
                    placeholder="请输入数字"
                    maxlength="5"
                  ></el-input>
                </el-form-item>
                <el-form-item label="单位：" prop="unit" v-if="workData.type==2">
                  <el-input v-model="workData.unit" autocomplete="off" placeholder="请输入个，股，孔等"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="blank"></div>
            <el-form-item label="计划开始时间" prop="start_time">
              <el-date-picker
                :picker-options="pickerOptionsStart"
                v-model="workData.start_time"
                type="date"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="计划结束时间" prop="end_time">
              <el-date-picker
                :picker-options="pickerOptionsEnd"
                v-model="workData.end_time"
                type="date"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>

            <div class="blank"></div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="workVisible = false">关闭</el-button>
            <el-button type="primary" @click="addOrEditDo()">确定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="里程线别设置" :visible.sync="lineVisible" width="700px">
          <el-table :data="lineData">
            <el-table-column label="线别">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.line_type == item.id"
                  v-for="item in lineTypeList"
                  :key="item.id"
                >{{item.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="开始里程">
              <template slot-scope="scope">
                <div>
                  <span>DK</span>
                  <input v-model="scope.row.start_flag" class="diinput" type="number" disabled />
                  <span>+</span>
                  <input v-model="scope.row.start_length" class="diinput" type="number" disabled />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="结束里程">
              <template slot-scope="scope">
                <div>
                  <span>DK</span>
                  <input v-model="scope.row.end_flag" class="diinput" type="number" disabled />
                  <span>+</span>
                  <input v-model="scope.row.end_length" class="diinput" type="number" disabled />
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="lineVisible = false">关闭</el-button>
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
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.workData.end_time) {
            return time.getTime() > new Date(this.workData.end_time).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.workData.start_time) {
            return (
              time.getTime() < new Date(this.workData.start_time).getTime()
            );
          }
        }
      },
      workLists: [],
      workPage: 1,
      workTotal: 0,
      workPageSize: 20,
      workPage_total: 0,
      workVisible: false,
      lineTypeList: [],
      workData: {
        type: 1,
        line_type: []
      },
      title: "添加作业信息",
      workRules: {
        name: [
          { required: true, message: "请输入名称2~20个字符", trigger: "blur" },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" },
          {
            pattern: /(^\S+).*(\S+$)/,
            message: "开始和结尾不能有空格",
            trigger: "blur"
          }
        ],
        type: [{ required: true, message: "请选择类别", trigger: "change" }],
        line_type: [
          { required: true, message: "请选择线别", trigger: "change" }
        ],
        start_time: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        end_time: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        total: [
          {
            required: true,
            min: 2,
            max: 5,
            message: "请输入1-5位正整数",
            trigger: "blur"
          },
          {
            pattern: /^(0|[1-9][0-9]*)$/,
            message: "请输入1-5位正整数",
            trigger: "blur"
          }
        ],
        unit: [
          {
            required: true,
            message: "请输入单位公里，个，股，孔等",
            trigger: "blur"
          },
          {
            pattern: /\s\S+|S+\s|\S/,
            message: "输入不能全是空格",
            trigger: "blur"
          },
          {
            pattern: /^[^\s]*$/,
            message: "输入不能含有空格",
            trigger: "blur"
          },
          { min: 1, max: 5, message: "长度在1到5个字符", trigger: "blur" }
        ]
      },
      lineVisible: false, //查看线别
      lineData: []
    };
  },
  created() {
    this.getWorkLists();
    this.getLineTypes();
  },
  methods: {
    getWorkLists() {
      let page = this.workPage;
      this.request({
        url: "/project/getWorkLists",
        method: "get",
        params: { page }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.workLists = data.data.data;

          this.workPage = parseInt(data.data.current_page);
          this.workTotal = parseInt(data.data.total);
          this.workPageSize = data.data.per_page;
          this.workPage_total = parseInt(data.data.last_page);
          // this.workPage = parseInt(data.data.current_page);
          // this.workTotal =data.data.total;
          // this.workPage_total =data.data.last_page;
        }
      });
    },
    workPageChange(value) {
      this.workPage = value;
      this.getWorkLists();
    },
    workPageFirst() {
      this.workPage = 1;
      this.getWorkLists();
    },
    workPageLast() {
      this.workPage = this.workPage_total;
      this.getWorkLists();
    },
    openAddWork() {
      this.title = "添加作业信息";
      this.workVisible = true;
      this.$nextTick(() => {
        this.$refs["workForm"].clearValidate();
      });
      this.workData = {
        name: "",
        sort: "",
        type: "1",
        line_type: [],
        type: 1,
        start_time: "",
        end_time: ""
      };
    },
    addOrEditDo() {
      this.$refs["workForm"].validate(valid => {
        if (valid) {
          let data = this.workData;
          console.log(JSON.stringify(data));
          this.request({
            url: "/project/addOrEditWork",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.workVisible = false;
              this.getWorkLists();
              this.$message({
                type: "success",
                message: "保存成功！"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editWork(id) {
      this.title = "修改作业信息";
      this.workVisible = true;
      this.$nextTick(() => {
        this.$refs["workForm"].clearValidate();
      });
      this.request({
        url: "/project/getWorkDetail",
        method: "get",
        params: { id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.workData = data.data;
          //console.log(data.data.line_type);
        }
      });
    },
    deleteWork(id) {
      this.$confirm("请确认要删除，删除后不可恢复", "提示", {
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
            url: "/project/deleteWork",
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
              this.getWorkLists();
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
    },
    getLineTypes() {
      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.lineTypeList = data.data;
        }
      });
    },
    detailWork(id) {
      this.lineVisible = true;
      this.request({
        url: "/project/getLine",
        method: "get",
        params: { id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.lineData = data.data;
        }
      });
    }
    //
  }
};
</script>
<style>
/* work */

.dialog-work .el-form-item__label {
  width: 110px;
}
.dialog-work .el-form-item__content {
  margin-left: 110px;
}
.addbtn {
  margin-bottom: 15px;
}
.diinput {
  width: 60px;
  height: 28px;
  border: 1px #9db9fa solid;
  text-align: center;
}
</style>
