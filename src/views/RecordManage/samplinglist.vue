<template>
  <div class="app-page-samp">
    <div class="app-page-rows-left">
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
    </div>
    <div class="app-page-rows-right">
      <div class="app-page-container">
        <div class="app-page-select">
          <el-form :inline="true">
            <el-form-item class="el-form-item">
              <el-button type="primary">全部</el-button>
            </el-form-item>
            <el-form-item class="el-form-item el-search-items">
              <el-select v-model="searchType" @change="searchTypeEvent">
                <el-option label="维护记录" value="1"></el-option>
                <el-option label="运行记录" value="2"></el-option>
                <el-option label="采样化验单" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="el-form-item">
              <el-button type="primary" @click="expectExcel">导入</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="app-table">
          <el-table :data="dataList" class="samplinglist">
            <el-table-column align="center" label="序号" width="80px">
              <template slot-scope="scope">{{scope.$index+(page_cur - 1) * page_size + 1}}</template>
            </el-table-column>
            <el-table-column align="center" prop="create_time" label="记录日期"></el-table-column>
            <el-table-column label="进 水" align="center">
              <el-table-column align="center" prop="in_ph" label="PH"></el-table-column>
              <el-table-column align="center" prop="in_cod" label="COD"></el-table-column>
              <el-table-column align="center" prop="in_nh3" label="NH3-N"></el-table-column>
              <el-table-column align="center" prop="in_tp" label="TP"></el-table-column>
              <el-table-column align="center" prop="in_tn" label="TN"></el-table-column>
            </el-table-column>
            <el-table-column label="出 水">
              <el-table-column align="center" prop="out_ph" label="PH"></el-table-column>
              <el-table-column align="center" prop="out_cod" label="COD"></el-table-column>
              <el-table-column align="center" prop="out_nh3" label="NH3-N"></el-table-column>
              <el-table-column align="center" prop="out_tp" label="TP"></el-table-column>
              <el-table-column align="center" prop="out_tn" label="TN"></el-table-column>
            </el-table-column>
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

    <el-dialog
      width="780px"
      :title="this.diaLogTitle"
      :close-on-click-modal="false"
      :visible.sync="diaLogFormVisible"
    >
      <el-form class="dialog-form-samp" :model="formData" label-width="80px">
        <div class="el-form-item-inline">
          <el-form-item label="地址：" label-width="100px">
            <div class="sampinfo">{{formData.station_name}}</div>
          </el-form-item>
          <el-form-item label="记录日期：" label-width="100px">
            <div class="sampinfo">{{formData.create_time}} &nbsp;</div>
          </el-form-item>
          <el-form-item label="采样化验人：" label-width="100px">
            <div class="sampinfo">{{formData.user}}</div>
          </el-form-item>
        </div>
        <div class="samptitle">进水</div>
        <div class="el-form-item-inline">
          <el-form-item label="PH：">
            <div class="sampinfos">{{formData.in_ph}}</div>
          </el-form-item>
          <el-form-item label="COD：">
            <div class="sampinfos">{{formData.in_cod}}</div>
          </el-form-item>
          <el-form-item label="NH3-N：">
            <div class="sampinfos">{{formData.in_nh3}}</div>
          </el-form-item>
          <el-form-item label="TP：">
            <div class="sampinfos">{{formData.in_tp}}</div>
          </el-form-item>
          <el-form-item label="TN：">
            <div class="sampinfos">{{formData.in_tn}}</div>
          </el-form-item>
        </div>
        <div class="samptitle">出水</div>
        <div class="el-form-item-inline">
          <el-form-item label="PH：">
            <div class="sampinfos">{{formData.out_ph}}</div>
          </el-form-item>
          <el-form-item label="COD：">
            <div class="sampinfos">{{formData.out_cod}}</div>
          </el-form-item>
          <el-form-item label="NH3-N：">
            <div class="sampinfos">{{formData.out_nh3}}</div>
          </el-form-item>
          <el-form-item label="TP：">
            <div class="sampinfos">{{formData.out_tp}}</div>
          </el-form-item>
          <el-form-item label="TN：">
            <div class="sampinfos">{{formData.out_tn}}</div>
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
    <el-form id="printRecord" class="dialog-form-samp" :model="formData" label-width="80px">
      <h3 class="printTitles">污水处理采样化验单表</h3>
      <div class="el-form-item-inline">
        <el-form-item label="地址：" label-width="100px">
          <div class="sampinfo">{{formData.station_name}}</div>
        </el-form-item>
        <el-form-item label="记录日期：" label-width="100px">
          <div class="sampinfo">{{formData.create_time}} &nbsp;</div>
        </el-form-item>
        <el-form-item label="采样化验人：" label-width="100px">
          <div class="sampinfo">{{formData.user}}</div>
        </el-form-item>
      </div>
      <div class="samptitle">进水</div>
      <div class="el-form-item-inline">
        <el-form-item label="PH：">
          <div class="sampinfos">{{formData.in_ph}}</div>
        </el-form-item>
        <el-form-item label="COD：">
          <div class="sampinfos">{{formData.in_cod}}</div>
        </el-form-item>
        <el-form-item label="NH3-N：">
          <div class="sampinfos">{{formData.in_nh3}}</div>
        </el-form-item>
        <el-form-item label="TP：">
          <div class="sampinfos">{{formData.in_tp}}</div>
        </el-form-item>
        <el-form-item label="TN：">
          <div class="sampinfos">{{formData.in_tn}}</div>
        </el-form-item>
      </div>
      <div class="samptitle">出水</div>
      <div class="el-form-item-inline">
        <el-form-item label="PH：">
          <div class="sampinfos">{{formData.out_ph}}</div>
        </el-form-item>
        <el-form-item label="COD：">
          <div class="sampinfos">{{formData.out_cod}}</div>
        </el-form-item>
        <el-form-item label="NH3-N：">
          <div class="sampinfos">{{formData.out_nh3}}</div>
        </el-form-item>
        <el-form-item label="TP：">
          <div class="sampinfos">{{formData.out_tp}}</div>
        </el-form-item>
        <el-form-item label="TN：">
          <div class="sampinfos">{{formData.out_tn}}</div>
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
      diaLogFormExcelVisible: false,
      diaLogFormVisible: false,
      diaLogTitle: "",

      uploadAction: this.hostURL + "/record/importRecord",
      uploadTemp: this.hostURL + "/downloads/1.xls",
      uploadData: { type: 3 },
      formData: {},
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
      searchType: "3",
      searchKeyword: ""
    };
  },
  created() {
    this.getChildStationList();
    this.getDataList();
  },
  methods: {
    getDataList() {
      let page = this.page_cur;
      let type = this.searchType;
      let sid = this.searchVillageId;
      this.request({
        url: "/record/getRecordRepairPages",
        method: "get",
        params: { type, sid, page }
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
    searchTypeEvent(val) {
      this.page_cur = 1;
      this.searchType = val;
      console.log(val);
      this.getDataList();
    },
    searchVillageNameEvent() {
      this.getChildStationList();
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

    printEvent(id) {
      this.request({
        url: "/record/getRecordDetail",
        method: "get",
        params: { id: id, type: 3 }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.formData = data.data;
          document.getElementById("printBtn").click();
        }
      });
    },
    detailEvent(id) {
      this.diaLogTitle = "污水处理采样化验单表";
      this.diaLogFormVisible = true;
      this.request({
        url: "/record/getRecordDetail",
        method: "get",
        params: { id: id, type: 3 }
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
            data: { id: id, type: 3 }
          }).then(res => {
            let data = res.data;
            if (data.status == 1) {
              this.getDataList();
              this.$message({
                type: "success",
                message: "删除成功！"
              });
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
    }
    //
  }
};
</script>
<style>
.app-page-samp {
  overflow: hidden;
}
.app-page-samp .el-table--border td {
  border: 0;
}
.app-page-samp .el-table--border th {
  border: 0;
}
.app-page-samp .el-table tr th {
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
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

.dialog-form-samp .el-select {
  width: 100%;
}
.dialog-form-samp .el-form-item-inline {
  display: inline-block;
}
.dialog-form-samp .el-form-item-inline .el-form-item {
  display: inline-block;
  margin-bottom: 0;
}
.dialog-form-samp .el-form-item-block {
  display: block;
}
.dialog-form-samp .el-form-item-inline .el-input__inner {
  width: 220px;
}

.sampde .el-form-item__label {
  padding: 0;
}
.dialog-form-samp .samptitle {
  font-size: 16px;
  text-align: center;
  color: #338ff6;
  margin-bottom: 30px;
  margin-top: 20px;
}
.dialog-form-samp .sampinfo {
  display: inline-block;
  min-width: 100px;
  margin-right: 20px;
  color: #338ff6;
  overflow: hidden;
  height: 30px;
}
.dialog-form-samp .sampinfos {
  overflow: hidden;
  display: inline-block;
  min-width: 58px;
  border-bottom: 1px #ddd solid;
  height: 30px;
  text-align: center;
}
/*print*/
#printBtn,
#printRecord {
  display: none;
}
@media print {
  #printRecord {
    display: block;
  }
  undefined {
    display: none;
  }
}
</style>