<template>
  <div id="location">
    <div class="el-menu-top">
      <el-menu router default-active="device" mode="horizontal">
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
              <el-button type="primary" icon="el-icon-plus" @click="addDialogInfo">添加机具</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="app-table">
          <el-table :data="dataList">
            <el-table-column prop="id" label="序号"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="description" label="详情" show-overflow-tooltip></el-table-column>
            <el-table-column prop="company" label="公司名称"></el-table-column>
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
      class="dialog-jiju"
      :title="this.diaLogTitle"
      :visible.sync="diaLogFormVisible"
    >
      <el-form class="el-form-custom" :model="deviceData" :rules="deviceRules" ref="deviceForm">
        <el-form-item label="公司名称：" prop="depart_id">
          <el-select v-model="deviceData.depart_id" placeholder="请选择公司" clearable>
            <el-option
              v-for="item in companyList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机具名称：" prop="name">
          <el-input v-model="deviceData.name" autocomplete="off" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="详情：" prop="description">
          <el-input type="textarea" v-model="deviceData.description" maxlength="50" show-word-limit></el-input>
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
      companyList: [],
      deviceData: {},
      deviceRules: {
        depart_id: [
          { required: true, message: "请选择公司", trigger: "change" }
        ],
        name: [
          {
            required: true,
            message: "请输入机具名称2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }
        ],
        description: [
          { min: 0, max: 50, message: "长度在0到50个字符", trigger: "blur" }
        ]
      },
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      dataList: []
    };
  },
  mounted() {
    document
      .querySelector("#app-menu-items #menu_location")
      .classList.add("is-active");
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
    getDataList() {
      let page = this.page_cur;
      this.request({
        url: "/location/getDevicePages",
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
    pageToFirst() {
      this.pageChange(1);
    },
    pageToLast() {
      this.page_cur = this.page_total;
      this.pageChange(this.page_total);
    },
    addDialogInfo() {
      this.deviceData = {
        depart_id: "",
        name: "",
        description: ""
      };
      this.diaLogTitle = "添加信息";
      this.diaLogFormVisible = true;
    },
    addOrEditDialog() {
      this.$refs["deviceForm"].validate(valid => {
        if (valid) {
          if (this.deviceData.description == "") {
            this.deviceData.description = "暂无";
          }
          let data = this.deviceData;
          this.request({
            url: "/location/addOrEditDevice",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.diaLogFormVisible = false;
              this.$message({
                type: "success",
                message: "保存成功！"
              });
              this.getDataList();
            }
          });
        } else {
          this.$message.error("操作失败！");
          return false;
        }
      });
    },
    goEdit(id) {
      this.diaLogTitle = "修改信息";
      this.diaLogFormVisible = true;
      this.request({
        url: "/location/getDevice",
        method: "get",
        params: { id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.deviceData = data.data;
          if (data.data.description == "暂无") {
            this.deviceData.description = "";
          }
        }
      });
    },

    goDel(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      })
        .then(() => {
          this.request({
            url: "/location/deleteDevice",
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
        })
        .catch(() => {});
    }
    //
  }
};
</script>
<style >
.dialog-jiju .el-textarea__inner {
  border: 1px #9db9fa solid;
  color: #4b6eca;
  height: 100px;
}
.dialog-jiju .el-textarea {
  width: 100% !important;
}
.dialog-jiju .el-select {
  width: 100%;
}
.dialog-jiju .el-form-item__label {
  width: 110px;
}
.dialog-jiju .el-form-item__content {
  margin-left: 110px;
}
</style>