<template>
  <div class="app-device-page">
    <el-row :gutter="20" class="grid-menu">
      <el-col :xs="8" :sm="3" :md="3" :lg="3" :xl="3">
        <div class="left-menu-area">
          <div class="input-so">
            <el-input prefix-icon="el-icon-search"
              placeholder="请输入内容"
              v-model="searchVillageName"
              @input="searchVillageNameEvent"
              clearable
            ></el-input>
          </div>
          <el-menu router class="el-menu-vertical-demo">
            <el-menu-item
              :class="searchVillageId === 0 ? 'active' : ''"
              @click="searchVillageEvent(0)"
            >
              <span>全部</span>
            </el-menu-item>
            <el-menu-item
              v-for="item in childStation"
              :key="item.id"
              :class="searchVillageId === item.id ? 'active' : ''"
              @click="searchVillageEvent(item.id)"
            >
              <span>{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :xs="16" :sm="21" :md="21" :lg="21" :xl="21">
        <div class="app-page-container">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item class="el-form-item">
                <el-input  prefix-icon="el-icon-search"
                  placeholder="请输入处理站名称"
                  @input="searchKeywordEvent"
                  v-model="searchKeyword"
                  class="input-with-select"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item class="el-form-item el-search-item-org">
                <el-select v-model="searchStatus" @change="searchStatusEvent">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="已完成" value="2"></el-option>
                  <el-option label="未完成" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="el-form-item el-search-items">
                <el-select v-model="searchType" @change="searchTypeEvent">
                  <el-option label="设备维修" value="1"></el-option>
                  <el-option label="例行维保" value="2"></el-option>
                  <el-option label="运行检查" value="3"></el-option>
                </el-select>
              </el-form-item>
              <div class="el-serach noborder">
                <!-- <el-input v-model="searchName" autocomplete="off" placeholder="请输入名称查询" clearable></el-input> -->
                <el-button @click="addShowDialog">发起派单</el-button>
              </div>
            </el-form>
          </div>
          <div class="app-table">
            <el-table :data="dataList">
              <el-table-column label="序号" width="80px">
                <template slot-scope="scope">{{scope.$index+(page_cur - 1) * page_size + 1}}</template>
              </el-table-column>
              <el-table-column prop="create_time" label="维保日期">
                <template slot-scope="scope">
                  <span>{{scope.row.create_time|formatDateTamp}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="assigner" label="指派人"></el-table-column>
              <el-table-column prop="role" label="职位"></el-table-column>
              <el-table-column prop="phone" label="联系电话"></el-table-column>
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status==2">已完成</span>
                  <span style="color:#999" v-else>未完成</span>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="维保事项">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==1">设备维修</span>
                  <span v-else-if="scope.row.type==2">例行维保</span>
                  <span v-else>运行检查</span>
                </template>
              </el-table-column>
              <el-table-column label="指派时间">
                <template slot-scope="scope">
                  <span>{{scope.row.create_time|formatDateTamp}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="190">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-apply" size="mini" @click="applyEvent(scope.row.id)">审批</el-button>
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
      </el-col>
    </el-row>

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
          <el-form-item label="站点名：" prop="sid">
            <el-cascader
              v-model="formData.sid"
              :options="stationOptions"
              :props="stationOptionsProps"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="指派人：" prop="assigner_id">
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
          <el-form-item label="职位：">
            <el-input v-model="formData.role" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="formData.phone" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="派单事项：" prop="type">
            <el-select v-model="formData.type" placeholder="请选择设备类型">
              <el-option label="设备维修" :value="1"></el-option>
              <el-option label="例行维保" :value="2"></el-option>
              <el-option label="运行检查" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="指派时间：" prop="assign_time">
            <el-date-picker v-model="formData.assign_time" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item> -->
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
      width="734px"
      class="dialog-dispatch"
      title="派单详情"
      :close-on-click-modal="false"
      :visible.sync="diaLogFormDetailVisible"
    >
      <el-form :model="formData" class="el-form-custom" label-width="120px">
        <div class="el-form-item-detail">
          <el-form-item label="站点名：">
            <div class="disp-info">{{formData.station_name}}</div>
          </el-form-item>
          <el-form-item label="指派人：">
            <div class="disp-info">{{formData.assigner}}</div>
          </el-form-item>
          <el-form-item label="职位：">
            <div class="disp-info">{{formData.role}}</div>
          </el-form-item>
          <el-form-item label="手机号：">
            <div class="disp-info">{{formData.phone}}</div>
          </el-form-item>
          <el-form-item label="派单事项：">
            <div class="disp-info" v-if="formData.type==1">设备维修</div>
            <div class="disp-info" v-if="formData.type==2">例行维保</div>
            <div class="disp-info" v-if="formData.type==3">运行检查</div>
          </el-form-item>
          <el-form-item label="指派时间：">
            <div class="disp-info">{{formData.create_time|formatDateTamp}}</div>
          </el-form-item>
        </div>
        <el-form-item label="维修内容：">
          <div class="disp-info">{{formData.content}}</div>
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
          { min: 2, max: 200, message: "长度在2到200个字符", trigger: "blur" }
        ]
      },
      page_cur: 1,
      page_data_total: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      userList: [],
      childStation: [],
      stationOptions: [],
      stationOptionsProps: {
        value: "id",
        label: "name",
        children: "child"
      },
      searchVillageName: "",
      searchVillageId: 0,
      searchKeyword: "",
      searchType: "1",
      searchStatus: "0"
    };
  },
  created() {
    this.getChildStationList();
    this.getDataList();
  },
  methods: {
    getDataList() {
      let page = this.page_cur;
      let station_name = this.searchKeyword;
      let type = this.searchType;
      let status = this.searchStatus;
      let sid = this.searchVillageId;
      this.request({
        url: "/assign/getAssignPages",
        method: "get",
        params: { page, station_name, type, status, sid }
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
    searchVillageEvent(val) {
      this.page_cur = 1;
      this.searchVillageId = val;
      this.getDataList();
    },
    searchKeywordEvent() {
      this.page_cur = 1;
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
    searchVillageNameEvent() {
      this.getChildStationList();
    },
    getChildStationList() {
      let name = this.searchVillageName;
      this.request({
        url: "/station/getChildStationLists",
        method: "get",
        params: { name }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.childStation = data.data;
        }
      });
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
          this.formData.role = ele.role_id==1?"管理员":"维保人员";
          this.formData.phone = ele.phone;
        }
      });
    },
    //添加编辑
    addShowDialog() {
      this.getStationList();
      this.getUsersList();
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
              this.searchType = this.formData.type.toString();
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
              // this.$message({
              //   type: "success",
              //   message: "删除成功！"
              // });
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
.app-device-page {
  overflow: hidden;
}
.el-search-item-org .el-select .el-input {
  width: 90px;
  border-radius: 4px;
}
.el-search-item-org .el-select .el-input__inner {
  background: #f45e23;
  color: #fff;
  text-align: center;
  border: 0;
}
.el-search-item-org .el-select .el-input .el-select__caret {
  color: #fff;
}

.el-search-items .el-select .el-input {
  width: 120px;
  border-radius: 4px;
}
.el-search-items .el-select .el-input__inner {
  background: #2b8cf9;
  color: #fff;
  text-align: center;
  border: 0;
}
.el-search-items .el-select .el-input .el-select__caret {
  color: #fff;
}

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
.dd{display: inline-block;overflow-y: auto;}
</style>