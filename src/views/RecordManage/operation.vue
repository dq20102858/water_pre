<template>
  <div class="app-page-device">
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
              <el-form-item class="el-form-item el-search-items">
                <el-select v-model="searchType" @change="searchTypeEvent">
                  <el-option label="维护记录" value="1"></el-option>
                  <el-option label="运行记录" value="2"></el-option>
                  <el-option label="采样化验单" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="el-form-item el-select-dorps" style="width:150px">
                <el-select
                  v-model="searchAssignerId"
                  filterable
                  placeholder="请选择巡查人员"
                  @change="searchAssignerEvent($event)"
                >
                  <el-option key="0" label="请选择巡查人员" value="0"></el-option>
                  <el-option
                    v-for="item in userList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
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
              <el-form-item class="el-form-item">
                <el-button type="primary" @click="expectExcel">导入</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="app-table">
            <el-table :data="dataList">
             <el-table-column  label="序号" width="80px">
                <template slot-scope="scope">{{scope.$index+(page_cur - 1) * page_size + 1}}</template>
              </el-table-column>
              <el-table-column label="记录日期" width="100">
                <template slot-scope="scope">{{scope.row.create_time|formatGetDate}}</template>
              </el-table-column>
              <el-table-column prop="station_name" label="记录站点"></el-table-column>
              <el-table-column prop="electricity" label="电表读数（KWH）"></el-table-column>
              <el-table-column prop="electricity_sum" label="累计读数">
              </el-table-column>
              <el-table-column prop="exception" label="异常情况"></el-table-column>
              <el-table-column prop="user" label="巡查人员"></el-table-column>
              <el-table-column prop="phone" label="联系电话"></el-table-column>
              <el-table-column label="操作" width="190">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-print" size="mini" @click="printEvent(scope.row.id)">打印</el-button>
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
      width="780px"
      :title="this.diaLogTitle"
      :close-on-click-modal="false"
      :visible.sync="diaLogFormVisible"
    >
      <el-form class="dialog-form-opera" :model="formData" label-width="100px">
        <div class="el-form-item-inline">
          <el-form-item label="地址：">
            <div class="sampinfo">{{formData.station_name}}</div>
          </el-form-item>
          <el-form-item label="记录日期：">
            <div class="sampinfo">{{formData.create_time|formatGetDate}} &nbsp;</div>
          </el-form-item>
          <el-form-item label="巡查人：">
            <div class="sampinfo">{{formData.user}}</div>
          </el-form-item>
        </div>
        <div class="samptitle">设备运行状况</div>
        <div class="el-form-item-inline">
          <el-form-item label="风机：">
            <el-checkbox v-model="formData.fan==1?true:false" label="正常" disabled></el-checkbox>
            <el-checkbox v-model="formData.fan==2?true:false" label="异常" disabled></el-checkbox>
          </el-form-item>
          <el-form-item label="各水泵：" class="el-form-item-mar">
            <el-checkbox v-model="formData.water_pump==1?true:false" label="正常" disabled></el-checkbox>
            <el-checkbox v-model="formData.water_pump==2?true:false" label="异常" disabled></el-checkbox>
          </el-form-item>
          <el-form-item label="紫外消毒机：">
            <el-checkbox v-model="formData.disinfect==1?true:false" label="正常" disabled></el-checkbox>
            <el-checkbox v-model="formData.disinfect==2?true:false" label="异常" disabled></el-checkbox>
          </el-form-item>
          <el-form-item label="电控柜：" class="el-form-item-mar">
            <el-checkbox v-model="formData.cabinet==1?true:false" label="正常" disabled></el-checkbox>
            <el-checkbox v-model="formData.cabinet==2?true:false" label="异常" disabled></el-checkbox>
          </el-form-item>
          <el-form-item label="湿地情况：">
            <el-checkbox v-model="formData.wetland==1?true:false" label="正常" disabled></el-checkbox>
            <el-checkbox v-model="formData.wetland==2?true:false" label="异常" disabled></el-checkbox>
          </el-form-item>
        </div>
        <div class="samptitle">主要处理单元</div>
        <div class="el-form-item-inline">
          <el-form-item label="预处理：">
            <el-checkbox v-model="formData.pretreatment==1?true:false" label="正常" disabled></el-checkbox>
            <el-checkbox v-model="formData.pretreatment==2?true:false" label="异常" disabled></el-checkbox>
          </el-form-item>
          <el-form-item label="生化处理：" class="el-form-item-mar">
            <el-checkbox v-model="formData.biochemistry==1?true:false" label="正常" disabled></el-checkbox>
            <el-checkbox v-model="formData.biochemistry==2?true:false" label="异常" disabled></el-checkbox>
          </el-form-item>
          <el-form-item label="沉淀情况：">
            <el-checkbox v-model="formData.precipitate==1?true:false" label="正常" disabled></el-checkbox>
            <el-checkbox v-model="formData.precipitate==2?true:false" label="异常" disabled></el-checkbox>
          </el-form-item>
          <el-form-item label="出水情况：" class="el-form-item-mar">
            <el-checkbox v-model="formData.out_water==1?true:false" label="正常" disabled></el-checkbox>
            <el-checkbox v-model="formData.out_water==2?true:false" label="异常" disabled></el-checkbox>
          </el-form-item>
        </div>
        <el-form-item label="异常情况：">
          <div class="sampinfos" style="width:100%;">{{formData.exception}}</div>
        </el-form-item>
        <div class="el-form-item-inline">
          <el-form-item label="电表读数：">
            <div class="sampinfo">{{formData.electricity}} &nbsp;</div>
          </el-form-item>
          <el-form-item label="累积读数：">
            <div class="sampinfo">{{formData.electricity_sum}}</div>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="diaLogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      width="380px"
      class="dialog-form-opera"
      title="导入数据"
      :close-on-click-modal="false"
      :visible.sync="diaLogFormExcelVisible"
    >
      <el-form>
        <el-form-item style="text-align: center;padding-top:20px">
          <el-upload
            class="upload-demo"
            :action="uploadAction"
            :before-upload="uploadBefore"
            :on-success="uploadSuccess"
            :show-file-list="false"
            :data="uploadData"
            accept=".xls"
          >
            <el-button type="primary" plain>选择模板文件</el-button>
           <div slot="tip" class="el-upload__tip" style="line-height:20px;padding-top:20px">
              <p>请按照下载的模板格式填写信息</p>
              <p>否则上传可能会出现数据格式不正确的问题</p>
              <a
                style="text-decoration: none;color:#4093ED"
                target="_blank"
                :href="uploadTemp"
              >下载模板</a>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
    <button v-print="printObj" id="printBtn"></button>
    <el-form class="dialog-form-opera" id="printRecord" :model="formData" label-width="100px">
      <h3 class="printTitles">污水处理站运行记录表</h3>
      <div class="el-form-item-inline">
        <el-form-item label="地址：">
          <div class="sampinfo">{{formData.station_name}}</div>
        </el-form-item>
        <el-form-item label="记录日期：">
          <div class="sampinfo">{{formData.create_time|formatGetDate}} &nbsp;</div>
        </el-form-item>
        <el-form-item label="巡查人：">
          <div class="sampinfo">{{formData.user}}</div>
        </el-form-item>
      </div>
      <div class="samptitle">设备运行状况</div>
      <div class="el-form-item-inline">
        <el-form-item label="风机：">
          <el-checkbox v-model="formData.fan==1?true:false" label="正常" disabled></el-checkbox>
          <el-checkbox v-model="formData.fan==2?true:false" label="异常" disabled></el-checkbox>
        </el-form-item>
        <el-form-item label="各水泵：" class="el-form-item-mar">
          <el-checkbox v-model="formData.water_pump==1?true:false" label="正常" disabled></el-checkbox>
          <el-checkbox v-model="formData.water_pump==2?true:false" label="异常" disabled></el-checkbox>
        </el-form-item>
        <el-form-item label="紫外消毒机：">
          <el-checkbox v-model="formData.disinfect==1?true:false" label="正常" disabled></el-checkbox>
          <el-checkbox v-model="formData.disinfect==2?true:false" label="异常" disabled></el-checkbox>
        </el-form-item>
        <el-form-item label="电控柜：" class="el-form-item-mar">
          <el-checkbox v-model="formData.cabinet==1?true:false" label="正常" disabled></el-checkbox>
          <el-checkbox v-model="formData.cabinet==2?true:false" label="异常" disabled></el-checkbox>
        </el-form-item>
        <el-form-item label="湿地情况：">
          <el-checkbox v-model="formData.wetland==1?true:false" label="正常" disabled></el-checkbox>
          <el-checkbox v-model="formData.wetland==2?true:false" label="异常" disabled></el-checkbox>
        </el-form-item>
      </div>
      <div class="samptitle">主要处理单元</div>
      <div class="el-form-item-inline">
        <el-form-item label="预处理：">
          <el-checkbox v-model="formData.pretreatment==1?true:false" label="正常" disabled></el-checkbox>
          <el-checkbox v-model="formData.pretreatment==2?true:false" label="异常" disabled></el-checkbox>
        </el-form-item>
        <el-form-item label="生化处理：" class="el-form-item-mar">
          <el-checkbox v-model="formData.biochemistry==1?true:false" label="正常" disabled></el-checkbox>
          <el-checkbox v-model="formData.biochemistry==2?true:false" label="异常" disabled></el-checkbox>
        </el-form-item>
        <el-form-item label="沉淀情况：">
          <el-checkbox v-model="formData.precipitate==1?true:false" label="正常" disabled></el-checkbox>
          <el-checkbox v-model="formData.precipitate==2?true:false" label="异常" disabled></el-checkbox>
        </el-form-item>
        <el-form-item label="出水情况：" class="el-form-item-mar">
          <el-checkbox v-model="formData.out_water==1?true:false" label="正常" disabled></el-checkbox>
          <el-checkbox v-model="formData.out_water==2?true:false" label="异常" disabled></el-checkbox>
        </el-form-item>
      </div>
      <el-form-item label="异常情况：">
        <div class="sampinfos" style="width:100%;">{{formData.exception}}</div>
      </el-form-item>
      <div class="el-form-item-inline">
        <el-form-item label="电表读数：">
          <div class="sampinfo">{{formData.electricity}} &nbsp;</div>
        </el-form-item>
        <el-form-item label="累积读数：">
          <div class="sampinfo">{{formData.electricity_sum}}</div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      printRecord: false,
      printObj: {
        id: "#printRecord",
        popTitle: " ",
        extraCss: "",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      diaLogFormExcelVisible: false,
      diaLogFormVisible: false,
      diaLogTitle: "添加信息",
      uploadAction: this.hostURL + "/record/importRecord",
      uploadTemp: this.hostURL + "/downloads/yunxing.xls",
      uploadData: { type: 2 },
      formData: {},
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
      searchAssignerId: "0",
      searchType: "2",
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
    this.getUsersList();
    this.getDataList();
  },
  methods: {
    getDataList() {
      let page = this.page_cur;
      let type = this.searchType;
      let sid = this.chlidStationId;
      let user_id = this.searchAssignerId;
      let start_time = this.searchStartTime;
      let end_time = this.searchEndTime;
      this.request({
        url: "/record/getRecordRepairPages",
        method: "get",
        params: { page, sid, user_id, type, start_time, end_time }
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
    searchTypeEvent(val) {
      if (val == 2) {
        this.$router.push("/recordmanage/operation");
      } else if (val == 3) {
        this.$router.push("/recordmanage/samplinglist");
      } else {
        this.$router.push("/recordmanage");
      }
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
      this.chlidStationId = 0;
      this.searchAssignerId = "0";
      this.searchStartTime = "";
      this.searchEndTime = "";
      this.getDataList();
    },
    searchAssignerEvent(item) {
      this.searchAssignerId = item;
      this.getDataList();
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

    printEvent(id) {
      this.request({
        url: "/record/getRecordDetail",
        method: "get",
        params: { id: id, type: 2 }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          // this.diaLogFormVisible = true;
          this.formData = data.data;
          document.getElementById("printBtn").click();
          //    this.diaLogFormVisible = false;
        }
      });
    },
    detailEvent(id) {
      this.diaLogTitle = "污水处理站运行记录表";
      this.diaLogFormVisible = true;
      this.request({
        url: "/record/getRecordDetail",
        method: "get",
        params: { id: id, type: 2 }
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
            data: { id: id, type: 2 }
          }).then(res => {
            let data = res.data;
            if (data.status == 1) {
              //
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
              //
            }
          });
        })
        .catch(() => {});
    },
    //上传
    expectExcel() {
      this.diaLogFormExcelVisible = true;
    },
    uploadSuccess(res, file) {
      console.log("图上传成功", res);
      if (res.status == 1) {
        this.getDataList();
        this.$message({
          type: "success",
          message: "导入成功！"
        });
        this.diaLogFormExcelVisible = false;
      } else {
        this.$message({
          message: "导入失败！",
          type: "error"
        });
      }
    },
    uploadBefore(file) {
      var filename = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = filename === "xls";
      const isLtM = file.size / 1024 / 1024 < 2;
      if (!extension) {
        this.$message({
          message: "上传文件只能是xls格式",
          type: "error"
        });
        return false;
      }
      if (!isLtM) {
        this.$message({
          message: "上传文件不能超过 2MB",
          type: "error"
        });
        return false;
      }
      return extension || isLtM;
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

.dialog-form-opera .el-select {
  width: 100%;
}
.dialog-form-opera .el-form-item-inline {
  display: inline-block;
}
.dialog-form-opera .el-form-item-inline .el-form-item {
  display: inline-block;
  margin-bottom: 0px;
}
.dialog-form-opera .el-form-item-inline .el-form-item-mar {
  margin-left: 100px;
}
.dialog-form-opera .el-form-item-block {
  display: block;
}
.dialog-form-opera .el-form-item-inline .el-input__inner {
  width: 220px;
}

.sampde .el-form-item__label {
  padding: 0;
}
.dialog-form-opera .samptitle {
  font-size: 16px;
  text-align: center;
  color: #338ff6;
  margin-bottom: 30px;
  margin-top: 20px;
}
.dialog-form-opera .sampinfo {
  display: inline-block;
  min-width: 100px;
  margin-right: 20px;
  color: #338ff6;
  overflow: hidden;
  height: 30px;
}
.dialog-form-opera .sampinfos {
  overflow: hidden;
  display: inline-block;
  min-width: 58px;
  line-height: 28px;
  min-height: 28px;
  border-bottom: 1px #ddd solid;
}
.dialog-form-opera
  .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner::after {
  border-color: #338ff6;
}
.dialog-form-opera
  .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner {
  background-color: #f2f6fc;
  border-color: #338ff6;
}
.dialog-form-opera .el-checkbox__input.is-disabled .el-checkbox__inner {
  background-color: #edf2fc;
  border-color: #338ff6;
  cursor: not-allowed;
}
.dialog-form-opera .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #333;
  cursor: not-allowed;
}
</style>