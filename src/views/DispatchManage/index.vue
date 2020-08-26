<template>
  <div class="app-device-page">
    <div class="app-page-rows">
      <div class="app-page-rows-lefts">
        <div class="left-menu-area">
          <div class="input-so">
            <el-autocomplete
              v-model="chlidStationName"
              prefix-icon="el-icon-search"
              class="inline-input"
              :fetch-suggestions="searchStationCallBack"
              placeholder="请输入处理站名"
              :trigger-on-focus="false"
              @select="searchStationEvent($event)"
              clearable
            ></el-autocomplete>
          </div>
          <el-menu router>
            <el-menu-item
              :class="fatherStationId === 0 ? 'active' : ''"
              @click="fatherStationEvent(0)"
            >
              <span>全部</span>
            </el-menu-item>
            <el-menu-item
              v-for="item in fatherStationList"
              :key="item.id"
              :class="fatherStationId === item.id ? 'active' : ''"
              @click="fatherStationEvent(item.id)"
            >
              <span :title="item.name">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="left-menu-chlid">
          <el-menu router>
            <el-menu-item
              v-for="item in childStationList"
              :key="item.id"
              :class="chlidStationId === item.id ? 'active' : ''"
              @click="chlidStationEvent(item.id)"
            >
              <span :title="item.name">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="app-page-rows-rights">
        <div class="app-page-container">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item class="el-form-item el-select-dorps" style="width:120px">
                <el-select
                  v-model="searchAssignerId"
                  filterable
                  placeholder="全部运维人"
                  @change="searchAssignerEvent($event)"
                >
                  <el-option key="0" label="全部运维人" value="0"></el-option>
                  <el-option
                    v-for="item in userList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="el-form-item el-select-dorps">
                <el-select v-model="searchType" @change="searchTypeEvent" style="width:120px">
                  <el-option label="全部事项" value="0"></el-option>
                  <el-option label="设备维修" value="1"></el-option>
                  <el-option label="例行维保" value="2"></el-option>
                  <el-option label="运行检查" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="el-form-item el-select-dorps">
                <el-select v-model="searchStatus" @change="searchStatusEvent" style="width:120px">
                  <el-option label="全部状态" value="0"></el-option>
                  <el-option label="已完成" value="2"></el-option>
                  <el-option label="未完成" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="el-form-item">
                <el-date-picker
                  type="date"
                  placeholder="选择开始日期"
                  v-model="searchStartTime"
                  style="width:150px"
                  @change="searchStartTimeEvent"
                  :picker-options="pickerStartTime"
                ></el-date-picker>
              </el-form-item>
              <div class="el-form-item-line">-</div>
              <el-form-item class="el-form-item">
                <el-date-picker
                  type="date"
                  placeholder="选择结束日期"
                  v-model="searchEndTime"
                  style="width:150px"
                  @change="searchEndTimeEvent"
                  :picker-options="pickerEndTime"
                ></el-date-picker>
              </el-form-item>
              <el-form-item class="el-form-item">
                <el-button type="primary" @click="searchAllEvent">重置</el-button>
              </el-form-item>
              <div class="el-serach noborder">
                <el-button @click="addShowDialog">发起派单</el-button>
              </div>
            </el-form>
          </div>
          <div class="app-table">
            <el-table :data="dataList">
              <el-table-column label="序号" width="80px">
                <template slot-scope="scope">{{scope.$index+(page_cur - 1) * page_size + 1}}</template>
              </el-table-column>
              <el-table-column prop="station_name" label="维保站点"></el-table-column>
              <el-table-column prop="assigner" label="指派人"></el-table-column>
              <el-table-column prop="phone" label="手机"></el-table-column>
              <el-table-column prop="type" label="维保事项">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==1">设备维修</span>
                  <span v-else-if="scope.row.type==2">例行维保</span>
                  <span v-else>运行检查</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                  <span style="color:#1ba163" v-if="scope.row.status==2">已完成</span>
                  <span style="color:#999" v-else>未完成</span>
                </template>
              </el-table-column>
              <el-table-column label="指派时间">
                <template slot-scope="scope">
                  <span>{{scope.row.assign_time}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="190">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button
                      class="btn-apply"
                      size="mini"
                      @click="applyEvent(scope.row.id)"
                      v-if="scope.row.status==1"
                    >审批</el-button>
                    <el-button class="btn-apply" size="mini" v-if="scope.row.status==2" disabled>审批</el-button>
                    <el-button class="btn-edit" size="mini" @click="detailEvent(scope.row.id)">详情</el-button>
                    <el-button class="btn-del" size="mini" @click="deleteEvent(scope.row.id)">删除</el-button>
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
      width="734px"
      class="dialog-dispatch"
      :title="this.diaLogTitle"
      :close-on-click-modal="false"
      :visible.sync="diaLogFormVisible"
    >
      <el-form
        :model="formData"
        :rules="formRules"
        ref="formRulesRef"
        class="el-form-custom"
        label-width="120px"
      >
        <div class="el-form-item-inlines">
          <el-form-item label="维保站点：" prop="sid">
            <el-cascader
              v-model="formData.sid"
              :options="stationOptions"
              :props="stationOptionsProps"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="派单事项：" prop="type">
            <el-select v-model="formData.type" placeholder="请选择派单事项">
              <el-option label="设备维修" :value="1"></el-option>
              <el-option label="例行维保" :value="2"></el-option>
              <el-option label="运行检查" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指派人员：" prop="assigner_id">
            <el-select
              v-model="formData.assigner_id"
              filterable
              placeholder="请选择 或搜索"
              @change="userChange($event)"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="人员职位：">
            <el-input v-model="formData.role" autocomplete="off" disabled></el-input>
          </el-form-item>-->
          <el-form-item label="手机号码：">
            <el-input v-model="formData.phone" autocomplete="off" disabled></el-input>
          </el-form-item>
          <!-- <el-form-item label="指派时间：" prop="assign_time">
            <el-date-picker v-model="formData.assign_time" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>-->
        </div>
        <el-form-item label="维修内容：" prop="content">
          <el-input type="textarea" v-model="formData.content" rows="5"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaLogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEvent">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      width="600px"
      class="dialog-dispatch"
      title="派单详情"
      :close-on-click-modal="false"
      :visible.sync="diaLogFormDetailVisible"
    >
      <el-form :model="formData" class="el-form-custom" label-width="120px">
        <div class="el-form-item-detail">
          <el-form-item label="选择站点：">
            <div class="disp-info">{{formData.station_name}}</div>
          </el-form-item>
          <el-form-item label="指派人员：">
            <div class="disp-info">{{formData.assigner}}</div>
          </el-form-item>
          <!-- <el-form-item label="人员职位：">
            <div class="disp-info">{{formData.role}}</div>
          </el-form-item>-->
          <el-form-item label="手机号码：">
            <div class="disp-info">{{formData.phone}}</div>
          </el-form-item>
          <el-form-item label="派单事项：">
            <div class="disp-info" v-if="formData.type==1">设备维修</div>
            <div class="disp-info" v-if="formData.type==2">例行维保</div>
            <div class="disp-info" v-if="formData.type==3">运行检查</div>
          </el-form-item>
          <el-form-item label="指派时间：">
            <div class="disp-info">{{formData.assign_time}}</div>
          </el-form-item>
        </div>
        <el-form-item label="维修内容：">
          <div class="disp-info">{{formData.content==""?"暂无内容":formData.content}}</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="diaLogFormDetailVisible=false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      diaLogFormVisible: false,
      diaLogTitle: "添加信息",
      diaLogFormDetailVisible: false,
      formData: {},
      formRules: {
        sid: [
          {
            required: true,
            message: "请选择站点名",
            trigger: "change"
          }
        ],
        assigner_id: [
          {
            required: true,
            message: "请选择指派人",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择派单事项",
            trigger: "change"
          }
        ],
        content: [
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
      dataList: [],
      userList: [],
      stationOptions: [],
      stationOptionsProps: {
        value: "id",
        label: "name",
        children: "child"
      },
      fatherStationList: [],
      childStationList: [],
      fatherStationId: 0,
      chlidStationId: 0,
      chlidStationName: "",
      searchKeyword: "",
      searchAssignerId: "0",
      searchType: "0",
      searchStatus: "0",
      pickerStartTime: {
        disabledDate: time => {
          if (this.searchEndTime) {
            return time.getTime() > new Date(this.searchEndTime).getTime();
          }
        }
      },
      pickerEndTime: {
        disabledDate: time => {
          if (this.searchStartTime) {
            return time.getTime() < new Date(this.searchStartTime).getTime();
          }
        }
      },
      searchStartTime: "",
      searchEndTime: ""
    };
  },
  created() {
    this.getFatherStationList();
    this.getDataList();
    this.getUsersList();
  },
  methods: {
    getDataList() {
      let page = this.page_cur;
      let type = this.searchType;
      let status = this.searchStatus;
      let sid = this.chlidStationId;
      let assigner_id = this.searchAssignerId;
      let start_time = this.searchStartTime;
      let end_time = this.searchEndTime;
      this.request({
        url: "/assign/getAssignPages",
        method: "get",
        params: { page, sid, assigner_id, type, status, start_time, end_time }
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
    searchAssignerEvent(item) {
      this.searchAssignerId = item;
      this.getDataList();
    },
    searchStatusEvent(val) {
      this.searchStatus = val;
      this.getDataList();
    },
    searchTypeEvent(val) {
      this.searchType = val;
      this.getDataList();
    },
    searchStartTimeEvent() {
      console.log(this.searchEndTime);
      if (this.searchEndTime != "") {
        this.page_cur = 1;
        this.getDataList();
      }
    },
    searchEndTimeEvent() {
      if (this.searchStartTime != "") {
        this.page_cur = 1;
        this.getDataList();
      }
    },
    searchAllEvent() {
      this.page_cur = 1;
      this.searchStatus = "0";
      this.searchType = "0";
      this.searchAssignerId = "0";
      this.chlidStationId = 0;
      this.searchStartTime = "";
      this.searchEndTime = "";
      this.getDataList();
    },
    getStationList() {
      this.request({
        url: "/station/getStationLists",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.stationOptions = data.data;
        }
      });
    },
    getUsersList() {
      this.request({
        url: "/assign/getUsersLists",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.userList = data.data;
        }
      });
    },
    userChange(e) {
      this.userList.forEach(ele => {
        if (ele.id == e) {
          // if (ele.role_id == 1) {
          //   this.formData.role = "管理员";
          // } else if (ele.role_id == 2) {
          //   this.formData.role = "维修人员";
          // } else if (ele.role_id == 3) {
          //   this.formData.role = "巡检人员";
          // } else if (ele.role_id == 4) {
          //   this.formData.role = "分析人员";
          // }
          this.formData.phone = ele.phone;
        }
      });
    },
    //添加编辑
    addShowDialog() {
      this.getStationList();

      this.diaLogFormVisible = true;
      this.diaLogTitle = "发起派单";
      this.$nextTick(() => {
        this.$refs["formRulesRef"].clearValidate();
      });
      this.formData = {
        // title: "",
        // description: "",
        // recept_type: []
      };
    },
    addEvent() {
      const that = this;
      this.$refs["formRulesRef"].validate(valid => {
        if (valid) {
          let data = that.formData;
          data.sid = that.formData.sid[1];
          this.request({
            url: "/assign/addAssign",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.diaLogFormVisible = false;
              this.searchType = "0";
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
    detailEvent(id) {
      this.diaLogFormDetailVisible = true;
      this.request({
        url: "/assign/getAssignDetail",
        method: "get",
        params: { id: id }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.formData = data.data;
        }
      });
    },
    applyEvent(id) {
      this.$confirm("请确认派单是否完成？", "提示", {
        confirmButtonText: "已完成",
        cancelButtonText: "未完成",
        type: "warning",
        customClass: "el-message-box-new"
      })
        .then(() => {
          this.request({
            url: "/assign/checkAssign",
            method: "post",
            data: { id: id, status: 2 }
          }).then(res => {
            let data = res.data;
            if (data.status == 1) {
              this.getDataList();
            }
          });
        })
        .catch(() => {});
    },
    deleteEvent(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      })
        .then(() => {
          this.request({
            url: "/assign/deleteAssign",
            method: "post",
            data: { id: id, type: parseInt(this.searchType) }
          }).then(res => {
            let data = res.data;
            if (data.status == 1) {
              if (this.dataList.length == 1) {
                this.page_cur = this.page_cur - 1;
                this.getDataList();
              } else {
                this.getDataList();
              }
              this.$message({
                type: "success",
                message: "删除成功！"
              });
            }
          });
        })
        .catch(() => {});
    },
    //station
    getFatherStationList() {
      let name = this.chlidName;
      this.request({
        url: "/station/getStationLists",
        method: "get",
        params: { name }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.fatherStationList = data.data;
          if (this.fatherStationId == 0) {
            this.getChildStationList();
          }
        }
      });
    },
    getChildStationList() {
      let name = "";
      this.request({
        url: "/station/getChildStationLists",
        method: "get",
        params: { name }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          let results = data.data;
          this.childStationList = results;
        }
      });
    },
    fatherStationEvent(val) {
      if (val == 0) {
        this.getChildStationList();
        this.page_cur = 1;
        this.chlidStationId = 0;
        this.getDataList();
      }
      this.fatherStationId = val;
      this.fatherStationList.map(ele => {
        if (ele.id == val) {
          this.childStationList = ele.child;
        }
      });
    },
    chlidStationEvent(val) {
      this.page_cur = 1;
      this.chlidStationId = val;
      this.getDataList();
    },
    searchStationCallBack(queryString, cb) {
      this.request({
        url: "/station/getChildStationLists",
        method: "get",
        params: { name: queryString }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          let results = data.data;
          let list = [];
          if (results.length == 0) {
            list.push({
              id: 0,
              value: "未查询到站名"
            });
          }
          for (let item of results) {
            list.push({
              id: item.id,
              pid: item.pid,
              value: item.name
            });
          }
          console.log(list);
          cb(list);
        }
      });
    },
    searchStationEvent(item) {
      this.page_cur = 1;
      this.fatherStationEvent(item.pid);
      this.fatherStationId = item.pid;
      this.chlidStationId = item.id;
      this.chlidStationName = "";
      this.getDataList();
    }
    //end station
  }
};
</script>
<style>
.dialog-dispatch .el-select {
  width: 100%;
}
.dialog-dispatch .el-form-item-inline {
  display: inline-block;
}
.dialog-dispatch .el-form-item-inline .el-form-item {
  display: inline-block;
}
.dialog-dispatch .el-form-item-block {
  display: block;
}
.dialog-dispatch .el-form-item-inline .el-checkbox-group {
  margin-left: 110px;
}
.dialog-dispatch .el-form-item-inline .el-input__inner {
  width: 220px;
}

.el-form-item-detail .el-form-item {
  margin-bottom: 5px;
}
.el-form-item-detail .disp-info {
  line-height: 28px;
  margin-top: 5px;
}
.dd {
  display: inline-block;
  overflow-y: auto;
}
</style>