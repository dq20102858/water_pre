<template>
  <div class="app-device-page">
    <el-row :gutter="20" class="grid-menu">
      <el-col :xs="8" :sm="3" :md="3" :lg="3" :xl="3">
        <div class="left-menu-area">
          <div class="input-so">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
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
        <div class="app-page-container" style="padding:20px">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item class="el-form-item">
                <el-input
                  placeholder="请输入处理站名称"
                  @input="searchKeywordEvent"
                  v-model="searchKeyword"
                  class="input-with-select"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item class="el-form-item el-search-items">
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
                  <span v-else>未完成</span>
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
                  <span>{{scope.row.assign_time|formatGetDate}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="190">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-apply" size="mini" @click="printEvent(scope.row.id)">审批</el-button>
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
      class="dialog-device"
      :model="formData"
      :rules="formRules"
      ref="formRulesRef"
      :title="this.diaLogTitle"
      :close-on-click-modal="false"
      :visible.sync="diaLogFormVisible"
    >
      <el-form :model="formData" class="el-form-custom" label-width="120px">
        <div class="el-form-item-inline">
          <el-form-item label="站点名：" prop="sid">
            <el-cascader
              v-model="formData.sid"
              :options="stationOptions"
              :props="stationOptionsProps"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="指派人：" prop="assigner_id">
            <el-select v-model="formData.assigner_id" placeholder="请选择设备类型">
              <el-option label="风机" :value="1"></el-option>
              <el-option label="水泵" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位：" prop="role">
            <el-input v-model="formData.role" autocomplete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="mobile">
            <el-input v-model="formData.mobile" autocomplete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="派单事项：" prop="type">
            <el-select v-model="formData.type" placeholder="请选择设备类型">
              <el-option label="设备维修" :value="1"></el-option>
              <el-option label="例行维保" :value="2"></el-option>
              <el-option label="运行检查" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指派时间：" prop="assign_time">
            <el-date-picker v-model="formData.assign_time" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
        <el-form-item label="维修内容：" prop="content">
          <el-input type="textarea" v-model="formData.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaLogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
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
      uploadAction: this.hostURL + "/upload/uploadFile",
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
        assign_time: [
          {
            required: true,
            message: "请选择指派时间",
            trigger: "change"
          }
        ],
        content: [
          { min: 2, max: 20, message: "长度在2到200个字符", trigger: "blur" }
        ]
      },
      page_cur: 1,
      page_data_total: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
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
    handleChange(value) {
      console.log(value);
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
    printEvent(id) {
      this.request({
        url: "record/getRecordDetail",
        method: "get",
        params: { id: id, type: parseInt(this.searchType) }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.formData = data.data;
          document.getElementById("printBtn").click();

          //  this.printRecord = true;
        }
      });
    },
    detailEvent(id) {
      this.diaLogTitle = "查看信息";
      this.diaLogFormVisible = true;
      this.request({
        url: "record/getRecordDetail",
        method: "get",
        params: { id: id, type: parseInt(this.searchType) }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.formData = data.data;
        }
      });
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
            url: "/record/delRecord",
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
    },
    //上传图片
    uploadExceed() {
      this.$message({
        type: "warning",
        message: `最多可以上传1张图片`
      });
    },
    uploadSuccess(res, file) {
      console.log("图上传成功", res);
      this.$set(this.formData, "img", res.data.url);
    },
    uploadBefore(file) {
      var filename = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        filename === "GIF" ||
        filename === "gif" ||
        filename === "jpeg" ||
        filename === "jpg" ||
        filename === "JPG" ||
        filename === "png" ||
        filename === "PNG";
      const isLtM = file.size / 1024 / 1024 < 2;
      if (!extension) {
        this.$message({
          message: "上传图片只能是 jpg  png  gif 格式",
          type: "error"
        });
        return false;
      }
      if (!isLtM) {
        this.$message({
          message: "上传图片大小不能超过 2MB",
          type: "error"
        });
        return false;
      }
      return extension || isLtM;
    }
    //
  }
};
</script>
<style>
.app-device-page {
  overflow: hidden;
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

.dialog-device .el-select {
  width: 100%;
}
.dialog-device .el-form-item-inline {
  display: inline-block;
}
.dialog-device .el-form-item-inline .el-form-item {
  display: inline-block;
}
.dialog-device .el-form-item-block {
  display: block;
}
.dialog-device .el-form-item-inline .el-checkbox-group {
  margin-left: 110px;
}
.dialog-device .el-form-item-inline .el-input__inner {
  width: 220px;
}
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
/*print*/
#printBtn {
  display: none;
}
#printRecord {
  display: none;
}
@media print {
  #printRecord {
    display: block;
  }
  #printRecord table {
    border-collapse: collapse;
    width: 100%;
  }
  #printRecord table td {
    border: 1px solid #9db9fa;
    line-height: 30px;
    padding: 10px;
  }
  undefined {
    display: none;
  }
  #printRecord .info {
    width: 90px;
  }
}
</style>