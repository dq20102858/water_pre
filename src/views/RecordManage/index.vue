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
              placeholder="请输入内容"
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
              <el-form-item class="el-form-item el-search-items">
                <el-select v-model="searchType" @change="searchTypeEvent">
                  <el-option label="维护记录" value="1"></el-option>
                  <el-option label="运行记录" value="2"></el-option>
                  <el-option label="采样化验单" value="3"></el-option>
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
              <el-table-column label="序号" width="80px">
                <template slot-scope="scope">{{scope.$index+(page_cur - 1) * page_size + 1}}</template>
              </el-table-column>
              <el-table-column prop="create_time" label="维保日期"></el-table-column>
              <el-table-column prop="station_name" label="维保站点"></el-table-column>
              <el-table-column prop="is_problem" label="是否有问题">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_problem==1">是</span>
                  <span v-if="scope.row.is_problem==0">否</span>
                  <el-switch
                    title="设置状态"
                    v-model="scope.row.is_problem"
                    :active-value="1"
                    :inactive-value="0"
                    active-text
                    inactive-text
                    active-color="#383C57"
                    @change="problemEvent($event,scope.row.id)"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="is_handle" label="是否已处理">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_handle==1">是</span>
                  <span v-if="scope.row.is_handle==0">否</span>
                  <el-switch
                    title="设置状态"
                    v-model="scope.row.is_handle"
                    :active-value="1"
                    :inactive-value="0"
                    active-text
                    inactive-text
                    active-color="#383C57"
                    @change="handleEvent($event,scope.row.id)"
                  ></el-switch>

                  <!-- <el-popover placement="right" trigger="hover" popper-class="isok-popover">
                    <span class="btn-sele" @click="handleEvent(scope.row.id,1)">是</span>
                    <span class="btn-sele" @click="handleEvent(scope.row.id,0)">否</span>
                    <span class="btn-sele-no" v-if="scope.row.is_handle==1" slot="reference">是</span>
                    <span class="btn-sele-no" v-if="scope.row.is_handle==0" slot="reference">否</span>
                  </el-popover>-->
                </template>
              </el-table-column>
              <el-table-column prop="user" label="运维人员"></el-table-column>
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
      <el-form class="dialog-form-records" :model="formData" label-width="100px">
        <div class="el-form-item-inline">
          <el-form-item label="地址：">
            <div class="sampinfo">{{formData.station_name}}</div>
          </el-form-item>
          <el-form-item label="维护日期：">
            <div class="sampinfo">{{formData.create_time}} &nbsp;</div>
          </el-form-item>
          <el-form-item label="维护人：">
            <div class="sampinfo">{{formData.user}}</div>
          </el-form-item>
        </div>
        <div class="samptitle">设备巡检内容、情况、及处理情况说明</div>
        <div class="el-form-item-inline">
          <el-form-item label="1.维护预备：">
            <el-checkbox-group v-model="formData.prepare" class="checkGroup">
              <el-checkbox
                v-for="item in prepareList"
                :label="item.id+''"
                :key="item.id"
                disabled
              >{{item.value}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div class="el-form-item-inline">
          <el-form-item label="2.系统检查：" class="el-form-item-mar">
            <el-checkbox-group v-model="formData.sys_check" class="checkGroup">
              <el-checkbox
                v-for="item in sysCheckList"
                :label="item.id+''"
                :key="item.id"
                disabled
              >{{item.value}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div class="el-form-item-inline">
          <el-form-item label="3.仪器检查：">
            <el-checkbox-group v-model="formData.device_check" class="checkGroup">
              <el-checkbox
                v-for="item in deviceCheckkList"
                :label="item.id+''"
                :key="item.id"
                disabled
              >{{item.value}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div class="el-form-item-inline">
          <el-form-item label="4.周期维护：" class="el-form-item-mar">
            <el-checkbox-group v-model="formData.period_check" class="checkGroup">
              <el-checkbox
                v-for="item in periodCheck"
                :label="item.id+''"
                :key="item.id"
                disabled
              >{{item.value}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div class="samptitles">5.其他情况</div>
        <el-form-item label="异常情况：">
          <div class="sampinfos" style="width:100%;">{{formData.exception}}</div>
        </el-form-item>
        <el-form-item label="更换耗材：">
          <div class="sampinfos" style="width:100%;">{{formData.replace_material}}</div>
        </el-form-item>
        <el-form-item label="备注：">
          <div class="sampinfos" style="width:100%;">{{formData.remark}}</div>
        </el-form-item>
        <div class="el-form-item-inline">
          <el-form-item label="离站时间：">
            <div class="sampinfo">{{formData.leave_time}} &nbsp;</div>
          </el-form-item>
          <el-form-item label="服务耗时：">
            <div class="sampinfo">{{formData.keep_time}}</div>
          </el-form-item>
          <el-form-item label="维护人员：">
            <div class="sampinfo">{{formData.user}}</div>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="diaLogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="380px"
      class="dialog-excel"
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
            <div slot="tip" class="el-upload__tip">
              请上传模板格式文件，且不超过2MB
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
    <el-form class="dialog-form-records" id="printRecord" :model="formData" label-width="100px">
      <h3 class="printTitles">污水处理站维护记录表</h3>
      <div class="el-form-item-inline">
        <el-form-item label="地址：">
          <div class="sampinfo">{{formData.station_name}}</div>
        </el-form-item>
        <el-form-item label="维护日期：">
          <div class="sampinfo">{{formData.create_time}} &nbsp;</div>
        </el-form-item>
        <el-form-item label="维护人：">
          <div class="sampinfo">{{formData.user}}</div>
        </el-form-item>
      </div>
      <div class="samptitle">设备巡检内容、情况、及处理情况说明</div>
      <div class="el-form-item-inline">
        <el-form-item label="1.维护预备：">
          <el-checkbox-group v-model="formData.prepare" class="checkGroup">
            <el-checkbox
              v-for="item in prepareList"
              :label="item.id+''"
              :key="item.id"
              disabled
            >{{item.value}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="el-form-item-inline">
        <el-form-item label="2.系统检查：" class="el-form-item-mar">
          <el-checkbox-group v-model="formData.sys_check" class="checkGroup">
            <el-checkbox
              v-for="item in sysCheckList"
              :label="item.id+''"
              :key="item.id"
              disabled
            >{{item.value}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="el-form-item-inline">
        <el-form-item label="3.仪器检查：">
          <el-checkbox-group v-model="formData.device_check" class="checkGroup">
            <el-checkbox
              v-for="item in deviceCheckkList"
              :label="item.id+''"
              :key="item.id"
              disabled
            >{{item.value}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="el-form-item-inline">
        <el-form-item label="4.周期维护：" class="el-form-item-mar">
          <el-checkbox-group v-model="formData.period_check" class="checkGroup">
            <el-checkbox
              v-for="item in periodCheck"
              :label="item.id+''"
              :key="item.id"
              disabled
            >{{item.value}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <div class="samptitles">5.其他情况</div>
      <el-form-item label="异常情况：">
        <div class="sampinfos" style="width:100%;">{{formData.exception}}</div>
      </el-form-item>
      <el-form-item label="更换耗材：">
        <div class="sampinfos" style="width:100%;">{{formData.replace_material}}</div>
      </el-form-item>
      <el-form-item label="备注">
        <div class="sampinfos" style="width:100%;">{{formData.remark}}</div>
      </el-form-item>
      <div class="el-form-item-inline">
        <el-form-item label="离站时间：">
          <div class="sampinfo">{{formData.leave_time}} &nbsp;</div>
        </el-form-item>
        <el-form-item label="服务耗时：">
          <div class="sampinfo">{{formData.keep_time}}</div>
        </el-form-item>
        <el-form-item label="维护人员：">
          <div class="sampinfo">{{formData.user}}</div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      printObj: {
        id: "#printRecord",
        popTitle: " ",
        extraCss: "",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      printRecordShow: false,
      diaLogFormExcelVisible: false,
      diaLogFormVisible: false,
      diaLogTitle: "",
      uploadTemp: this.hostURL + "/downloads/weihu.xls",
      uploadAction: this.hostURL + "/record/importRecord",
      uploadData: { type: 1 },
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
      searchType: "1",
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
      searchEndTime: "",
      prepareList: [],
      sysCheckList: [],
      deviceCheckkList: [],
      periodCheck: []
    };
  },
  created() {
    this.getFatherStationList();
    this.getUsersList();
    this.getConfig();
    this.getDataList();
  },
  methods: {
    getDataList() {
      let page = this.page_cur;
      let type = this.searchType;
      let sid = this.chlidStationId;
      let start_time = this.searchStartTime;
      let end_time = this.searchEndTime;
      let user_id = this.searchAssignerId;
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
    searchAllEvent() {
      this.page_cur = 1;
      this.chlidStationId = 0;
      this.searchAssignerId = "0";
      this.searchStartTime = "";
      this.searchEndTime = "";
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
    getConfig() {
      this.request({
        url: "/record/getConfig",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.prepareList = data.data.prepare; //维护预备
          this.sysCheckList = data.data.sys_check; //系统检查
          this.deviceCheckkList = data.data.device_check; //仪器检查
          this.periodCheck = data.data.period_check; //周期维护
        }
      });
    },
    printEvent(id) {
      this.request({
        url: "/record/getRecordDetail",
        method: "get",
        params: { id: id, type: 1 }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.formData = data.data;
          document.getElementById("printBtn").click();
        }
      });
    },
    detailEvent(id) {
      this.diaLogTitle = "污水处理站维护记录表";
      this.diaLogFormVisible = true;
      this.request({
        url: "/record/getRecordDetail",
        method: "get",
        params: { id: id, type: 1 }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.formData = data.data;
          // this.formData.period_check=data.data.period_check).replace (/"/g,'');
          // console.log( this.formData.period_check);
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
            data: { id: id, type: 1 }
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
    problemEvent(flag, id) {
      this.request({
        url: "/record/changeProblem",
        method: "post",
        data: { id: id, is_problem: flag }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.getDataList();
          this.$message({
            type: "success",
            message: "设置成功！"
          });
        }
      });
    },
    handleEvent(flag, id) {
      this.request({
        url: "/record/changehandle",
        method: "post",
        data: { id: id, is_handle: flag }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.getDataList();
          this.$message({
            type: "success",
            message: "设置成功！"
          });
        }
      });
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
      this.fatherStationEvent(0);
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

.dialog-form-records .el-select {
  width: 100%;
}
.dialog-form-records .el-form-item-inline {
  display: inline-block;
}
.dialog-form-records .el-form-item-inline .el-form-item {
  display: inline-block;
  margin-bottom: 0px;
}
.dialog-form-records .el-form-item-block {
  display: block;
}
.dialog-form-records .el-form-item-inline .el-input__inner {
  width: 220px;
}

.dialog-form-records .samptitle {
  font-size: 16px;
  text-align: center;
  color: #338ff6;
  margin-bottom: 30px;
  margin-top: 20px;
}
.dialog-form-records .samptitles {
  font-size: 14px;
  padding-left: 8px;
  margin-bottom: 30px;
}
.dialog-form-records .sampinfo {
  display: inline-block;
  min-width: 100px;
  margin-right: 20px;
  color: #338ff6;
  overflow: hidden;
  height: 30px;
}
.dialog-form-records .sampinfos {
  overflow: hidden;
  display: inline-block;
  min-width: 58px;
  min-height: 28px;
  line-height: 28px;
  border-bottom: 1px #ddd solid;
}
.dialog-form-records
  .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner::after {
  border-color: #338ff6;
}
.dialog-opera .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #f2f6fc;
  border-color: #338ff6;
}
.dialog-form-records .el-checkbox__input.is-disabled .el-checkbox__inner {
  background-color: #edf2fc;
  border-color: #338ff6;
  cursor: not-allowed;
}
.dialog-form-records .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #333;
  cursor: not-allowed;
}

.isok-popover {
  min-width: 70px;
  padding: 5px;
}
.isok-popover span {
  cursor: pointer;
}
</style>