<template>
  <div id="location">
    <div class="el-menu-top">
      <el-menu router default-active="cardetector" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-location.png')" />定位管理
        </li>
        <el-menu-item index="location">人员定位统计</el-menu-item>
        <el-menu-item index="walldetector">墙壁探测器</el-menu-item>
        <el-menu-item index="cardetector">车载探测器</el-menu-item>
        <el-menu-item index="locationbind">定位从设备</el-menu-item>
        <el-menu-item index="device">机具</el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div class="app-page-container">
        <div class="app-page-select">
          <el-form :inline="true">
            <el-form-item>
              <el-button type="primary" icon="el-icon-plus" @click="addDialogInfo">添加设备</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="app-table">
          <el-table :data="dataList">
            <el-table-column prop="id" label="序号"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="number" label="设备编号"></el-table-column>
            <el-table-column prop="loco" label="所属列车">
              <template slot-scope="scope">
                <span v-if="scope.row.loco==''">暂无列车</span>
                <span v-else>{{scope.row.loco}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="company" label="公司名称"></el-table-column>
            <el-table-column prop="create_time" label="创建时间">
              <template slot-scope="scope">
                <p v-html="changeTime(scope.row.create_time)"></p>
              </template>
            </el-table-column>
                <el-table-column prop="update_time" label="修改时间">
              <template slot-scope="scope">
                <p v-html="changeTime(scope.row.update_time)"></p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-blue" size="mini" @click="goEdit(scope.row.id)">修改</el-button>
                  <el-button class="btn-red" size="mini" @click="goDel(scope.row.id)">删除</el-button>
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
              :total="this.pageTotal"
              @current-change="pageChange"
              prev-text="上一页"
              next-text="下一页"
            >
              <button @click="toFirstPage" type="button" class="btn-first">
                <span>首页</span>
              </button>
              <button @click="toLastPage" type="button" class="btn-last">
                <span>尾页</span>
              </button>
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- end table -->
    </div>
    <el-dialog
      width="700px"
      :close-on-click-modal="false"
      class="dialog-car"
      :title="this.diaLogTitle"
      :visible.sync="diaLogFormVisible"
    >
      <el-form
        class="el-form-custom"
        :model="detectorData"
        :rules="detectorRules"
        ref="detectorRulesForm"
      >
        <el-form-item label="设备名称：" prop="name">
          <el-input v-model="detectorData.name" autocomplete="off" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="设备编号：" prop="number">
          <el-input v-model="detectorData.number" autocomplete="off" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="公司名称：" prop="depart_id">
          <el-select
            v-model="detectorData.depart_id"
            placeholder="请选择公司"
            @change="selectGetCompanyList($event)"
          >
            <el-option
              v-for="item in companyList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属列车" prop="loco_id">
          <el-select v-model="detectorData.loco_id" placeholder="请选择" no-data-text="暂无列车">
            <el-option v-for="item in trainList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <div class="blank"></div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaLogFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="addOrEditDialog()">确定</el-button>
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
      detectorData: {},
      detectorRules: {
        name: [
          {
            required: true,
            message: "请输入设备名称2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" },
           { pattern: /(^\S+).*(\S+$)/, message: "开始和结尾不能有空格", trigger: "blur" }
        ],
        number: [
          {
            required: true,
            message: "请输入设备编号2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }
        ],
        depart_id: [
          { required: true, message: "请选择公司", trigger: "change" }
        ],
        loco_id: [
          { required: true, message: "请选择所属列车", trigger: "change" }
        ]
      },
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      companyList: [],
      trainList: []
    };
  },
  mounted() {
    document.querySelector("#app-menu-items #menu_location") .classList.add("is-active");
  },
  created() {
    this.getCompanyList();
    this.getDataList();
  },
  methods: {
    getCompanyList() {
      this.request({
        url: "/apply/getCompanyLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.companyList = data.data;
        }
      });
    },
    selectGetCompanyList(val) {
      this.$set(this.detectorData, "loco_id", "");
      this.getTrainList(val);
    },
    resetDetectorData() {},
    getTrainList(id) {
      this.request({
        url: "/common/getLocosByDepart",
        method: "get",
        params: { depart_id: id, type: 1 }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.trainList = data.data;
        }
      });
    },
    getDataList() {
      let page = this.page_cur;
      this.request({
        url: "/location/getCarDetectorPages",
        method: "get",
        params: {
          page
        }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataList = data.data.data;
          this.page_cur = parseInt(data.data.current_page);
          this.pageTotal = data.data.total;
          this.page_size = data.data.per_page;
          this.page_total = data.data.last_page;
        }
      });
    },
    pageChange(value) {
      this.page_cur = value;
      this.getDataList();
    },
    toFirstPage() {
      this.pageChange(1);
    },
    toLastPage() {
      this.page_cur = this.page_total;
      this.pageChange(this.page_total);
    },
    searchEvent() {
      this.page_cur = 1;
      this.getDataList();
    },
    addDialogInfo() {
      this.detectorData = {};
      this.diaLogTitle = "添加车载探测器信息";
      this.diaLogFormVisible = true;
    },
    addOrEditDialog() {
      this.$refs["detectorRulesForm"].validate(valid => {
        if (valid) {
          let data = this.detectorData;
          this.request({
            url: "/location/addOrEditCarDetector",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.diaLogFormVisible = false;
              this.detectorData.name = "";
              this.detectorData.description = "";
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
    goEdit(id) {
      this.diaLogTitle = "修改车载探测器信息";
      this.diaLogFormVisible = true;
      this.request({
        url: "/location/getCarDetector",
        method: "get",
        params: { id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.detectorData = data.data;
        }
      });
    },

    goDel(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
        ,customClass:"el-message-box-new"
      }).then(() => {
        this.request({
          url: "/location/deleteCarDetector",
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
      }).catch(()=>{});
    },
    changeTime(time) {
      if (time !== null && time !== undefined && time !== "") {
        return (
          "<span style='display:block'>" +
          time.substring(0, 10) +
          "</span><span style='display:block'>" +
          time.substring(time.length - 8) +
          "</span>"
        );
      } else {
        return "";
      }
    }
    //
  }
};
</script>
<style >
.dialog-car .el-textarea__inner {
  border: 1px #9db9fa solid;
  color: #4b6eca;
  height: 100px;
}
.dialog-car .el-textarea {
  width: 100% !important;
}
.dialog-car .el-form-item__label {
  width: 110px;
}
.dialog-car .el-form-item__content {
  margin-left: 110px;
}
.dialog-car .el-form-item-inline .el-input--medium {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.dialog-car .el-form-item-inline input {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.dialog-car .el-select {
  width: 100%;
}
</style>