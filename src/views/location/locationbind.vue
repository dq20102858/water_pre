<template>
  <div id="location">
    <div class="el-menu-top">
      <el-menu router default-active="locationbind" mode="horizontal">
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
          <el-form :model="searchForm" :inline="true">
            <el-form-item>
              <el-button type="primary" icon="el-icon-plus" @click="addDialogInfo">添加设备</el-button>
            </el-form-item>
            <el-form-item label="公司">
              <el-select v-model="searchForm.depart_id" placeholder="请选择公司" clearable>
                <el-option
                  v-for="item in companySelectLists"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="searchForm.type" placeholder="请选择公司" clearable>
                <el-option label="人" value="1"></el-option>
                <el-option label="车" value="2"></el-option>
                <el-option label="机具" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编号或名称">
              <el-input v-model="searchForm.keyword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="form-so">
              <label class="el-form-item__label"></label>
              <el-button size="small" icon="el-icon-search" @click="pageSearch" type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="app-table">
          <el-table :data="dataList">
            <el-table-column prop="id" label="序号"></el-table-column>
            <el-table-column prop="number" label="设备编号"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="bind_obj" label="被绑定对象"></el-table-column>
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
        :model="locationData"
        :rules="detectorRules"
        ref="detectorRulesForm"
      >
        <el-form-item label="设备编号：" prop="number">
          <el-input v-model="locationData.number" autocomplete="off"></el-input>
        </el-form-item>
        <div v-if="locationData.id>0">
          <el-form-item label="设备类型：" prop="type">
            <el-select v-model="locationData.type" placeholder="请选择" clearable disabled>
              <el-option label="人" :value="1"></el-option>
              <el-option label="车" :value="2"></el-option>
              <el-option label="机具" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定对象：" prop="bind_obj">
            <el-select v-model="locationData.bind_obj" placeholder="请选择" clearable>
              <el-option label="heekey" :value="12"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="设备类型：" prop="type">
            <el-select
              v-model="locationData.type"
              placeholder="请选择"
              clearable
              @change="selectDeviceType($event)"
            >
              <el-option label="人" :value="1"></el-option>
              <el-option label="车" :value="2"></el-option>
              <el-option label="机具" :value="3"></el-option>
            </el-select>
          </el-form-item>

          <!-- <div v-if="this.diaLogTitle=='添加设备信息'"> -->

          <el-form-item label="所属公司：" prop="depart_id">
            <el-select
              v-model="locationData.depart_id"
              placeholder="请选择公司"
              @change="selectCompanyLists($event)"
            >
              <el-option
                v-for="item in companySelectLists"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div v-if="locationData.type==1">
            <el-form-item label="所属部门：" prop="sub_pid">
              <el-select v-model="locationData.sub_pid" @change="selectDepartLists($event)">
                <el-option
                  v-for="item in this.departSelectLists"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属职位：">
              <el-select v-model="locationData.post_pid" @change="selectPostLists($event)">
                <el-option
                  v-for="item in this.postSelectLists"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="绑定对象：" prop="bind_obj">
            <el-select v-model="locationData.bind_obj" placeholder="请选择">
              <el-option
                v-for="item in this.objSelectLists"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- </div> -->

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
      locationData: {
        sub_pid: "",
        post_pid: ""
      },
      detectorRules: {
        depart_id: [
          { required: true, message: "请选择公司", trigger: "change" }
        ],
        type: [
          { required: true, message: "请选择设备类型：", trigger: "change" }
        ],
        name: [
          {
            required: true,
            message: "请输入设备名称2~30个字符",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ],
        number: [
          {
            required: true,
            message: "请输入设备编号2~30个字符",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ],
        sub_pid: [
          { required: true, message: "请选择所属部门：", trigger: "change" }
        ],
        post_pid: [
          { required: true, message: "请选择所属职位：", trigger: "change" }
        ],
        loco_id: [
          { required: true, message: "请选择所属列车", trigger: "change" }
        ],
        bind_obj: [
          { required: true, message: "请选择绑定对象：", trigger: "change" }
        ]
      },
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      searchForm: {},
      deviceType: 1,
      dataList: [],
      companySelectLists: [],
      departSelectLists: [],
      postSelectLists: [],
      objSelectLists: []
    };
  },
  mounted() {
     document.querySelector("#app-menu-items #menu_location").classList.add("is-active");
  },
  created() {
    this.getCompanyLists();
    this.getDataList();
  },
  methods: {
    getDataList() {
      let page = this.page_cur;
      let depart_id = this.searchForm.depart_id;
      let type = this.searchForm.type;
      let keyword = this.searchForm.keyword;
      this.request({
        url: "/location/getLocationBindPages",
        method: "get",
        params: {
          page,
          depart_id,
          type,
          keyword
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
    pageToFirst() {
      this.pageChange(1);
    },
    pageToLast() {
      this.page_cur = this.page_total;
      this.pageChange(this.page_total);
    },
    pageSearch() {
      this.page_cur = 1;
      this.getDataList();
    },

    addDialogInfo() {
      this.locationData = {};
      this.diaLogTitle = "添加设备信息";
      this.diaLogFormVisible = true;
    },
    addOrEditDialog() {
      this.$refs["detectorRulesForm"].validate(valid => {
        if (valid) {
          let data = this.locationData;
          this.request({
            url: "/location/addOrEditBind",
            method: "post",
            data: data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.diaLogFormVisible = false;
              this.locationData.name = "";
              this.locationData.description = "";
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
      this.diaLogTitle = "修改设备信息";
      this.diaLogFormVisible = true;
      this.request({
        url: "/location/localBindDetail",
        method: "get",
        params: { id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.locationData = data.data;
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
          url: "/location/deleteBind",
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
    //公司 部门 职位
    selectDeviceType(val) {
      this.deviceType = val;
      this.resetLocationData();
    },
    resetLocationData() {
      this.$set(this.locationData, "depart_id", "");
      this.$set(this.locationData, "sub_pid", "");
      this.$set(this.locationData, "post_pid", "");
      this.$set(this.locationData, "bind_obj", "");
    },
    getCompanyLists() {
      this.request({
        url: "/apply/getCompanyLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.companySelectLists = data.data;
        }
      });
    },

    //选择公司
    selectCompanyLists(val) {
      this.$set(this.locationData, "sub_pid", "");
      this.$set(this.locationData, "post_pid", "");
      this.$set(this.locationData, "bind_obj", "");
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid:val, type:2 }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          if (this.locationData.type == 1) {
            this.departSelectLists = data.data;
          } else if (this.locationData.type == 2) {
            this.getTrainList(val, 1);
          } else {
            this.getTrainList(val, 2);
          }
        }
      });
    },
    //选择部门
    selectDepartLists(val) {
      this.$set(this.locationData, "post_pid", "");
      this.$set(this.locationData, "bind_obj", "");
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid:val, type:3 }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.postSelectLists = data.data;
        }
      });
    },
    //选择职位
    selectPostLists(val) {
      this.$set(this.locationData, "bind_obj", "");
      this.request({
        url: "/user/getUserByDepart",
        method: "get",
        params: { id:val, type:2 }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.objSelectLists = data.data;
        }
      });
    },
    //获取车辆
    getTrainList(val, type) {
      this.request({
        url: "/common/getLocosByDepart",
        method: "get",
        params: { depart_id: val, type: type }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.objSelectLists = data.data;
        }
      });
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