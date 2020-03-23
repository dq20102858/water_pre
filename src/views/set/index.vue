<template>
  <div id="monitor">
    <div class="el-menu-top">
      <el-menu router default-active="index" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-set.png')" />设置
        </li>
        <el-menu-item index="index">
          <router-link :to="{path: '/set'}">站点设置</router-link>
        </el-menu-item>
        <el-menu-item index="speed">
          <router-link :to="{path: '/set/speed'}">限速设置</router-link>
        </el-menu-item>
        <el-menu-item index="walldetector">防区设置</el-menu-item>
        <el-menu-item index="bridge">桥设置</el-menu-item>
        <el-menu-item index="locationbind">隧道设置</el-menu-item>
        <el-menu-item index="locationbind">坡度设置</el-menu-item>
      </el-menu>
      <!-- <div @click="goDetail()">to apple</div> -->
    </div>
    <div class="app-page">
      <div class="app-page-container">
        <div class="app-page-select">
          <el-form :inline="true">
            <el-form-item>
              <el-button type="primary" icon="el-icon-plus" @click="goAdd">添加站点</el-button>
            </el-form-item>
            <div class="el-serach">
              <el-input v-model="searchName" autocomplete="off" placeholder="请输入设备编号查询" clearable></el-input>
              <el-button @click="searchEvent">查询</el-button>
            </div>
          </el-form>
        </div>
        <div class="app-table">
          <el-table :data="dataList">
            <el-table-column prop="id" label="序号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="sort" label="排序"></el-table-column>
            <el-table-column prop="position" label="位置">
              <template slot-scope="scope">
                <b>DK</b>
                {{scope.row.start_flag}} + {{scope.row.start_length}}
              </template>
            </el-table-column>
            <el-table-column prop="type" label="站点类型"></el-table-column>
            <el-table-column prop="line" label="线别"></el-table-column>
            <el-table-column prop="company" label="公司"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="update_time" label="修改时间"></el-table-column>
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
        <el-dialog
          width="700px"
          :close-on-click-modal="false"
          class="dialog-station"
          :title="this.diaLogTitle"
          :visible.sync="diaLogFormVisible"
        >
          <el-form class="el-form-custom" :model="formData" :rules="formRules" ref="formRules">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="线别" prop="line_type">
              <el-select
                v-model="formData.line_type"
                placeholder="请选择"
                @change="selectLineType($event)"
              >
                <el-option
                  v-for="item in lineTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <div class="el-form-item__error">{{lineTypeDes}}</div>
            </el-form-item>
            <el-form-item label="位置：" prop="position">
              <el-input v-model="formData.position" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="formData.type">
                <el-option label="客运站" :value="1"></el-option>
                <el-option label="中间站" :value="2"></el-option>
                <el-option label="越行站" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
              <el-input v-model="formData.sort" autocomplete="off"></el-input>
            </el-form-item>
            <div class="blank"></div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="diaLogFormVisible = false">关闭</el-button>
            <el-button type="primary" @click="addOrEditDialog()">确定</el-button>
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
      diaLogFormVisible: false,
      diaLogTitle: "添加信息",
      formData: {
        type: 1
      },
      formRules: {
        name: [
          {
            required: true,
            message: "请输入名称2~30个字符",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ],
        line_type: [
          { required: true, message: "请选择线别", trigger: "change" }
        ],
        position: [
          {
            required: true,
            message: "请输入设备编号2~30个字符",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ],

        sort: [
          { min: 2, max: 5, message: "长度在2到30个字符", trigger: "blur" }
        ]
      },
      page_cur: 1,
      page_data_total: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      searchName: "",
      lineTypeDes: "",
      lineTypeList: []
    };
  },
  created() {
    this.getLineTypeLists();
    this.getDataList();
  },
  methods: {
    getDataList() {
      let page = this.page_cur;
      let name = this.searchName;
      this.request({
        url: "/search/getStationPages",
        method: "get",
        params: {
          page,
          name
        }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataList = data.data.data;
          this.page_cur = data.data.current_page;
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
      this.pageChange(1);
    },
    pageToLast() {
      this.page_cur = this.page_total;
      this.pageChange(this.page_total);
    },
    searchEvent() {
      this.page_cur = 1;
      this.getDataList();
    },
    getLineTypeLists() {
      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.lineTypeList = data.data;
        }
      });
    },
    selectLineType(value) {
      const that = this;
      this.lineTypeList.map((item, index) => {
        if (item.id == value) {
          that.lineTypeDes = item.tip;
        }
      });
      console.log(this.lineTypeDes);
    },
    goAdd() {
      this.formData = {};
      this.diaLogTitle = "添加信息";
      this.diaLogFormVisible = true;
      this.lineTypeDes = "";
    },
    addOrEditDialog() {
      this.$refs["formRules"].validate(valid => {
        if (valid) {
          let data = this.formData;
          this.request({
            url: "/location/addOrEditCarDetector",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.diaLogFormVisible = false;
              this.formData.name = "";
              this.formData.description = "";
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
      this.title = "修改信息";
      this.diaLogFormVisible = true;
      this.request({
        url: "/search/getStationDetail",
        method: "get",
        params: { id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.formData = data.data;
        }
      });
    },
    goDel(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
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
      });
    }
    //
  }
};
</script>
<style>
.dialog-station .el-textarea__inner {
  border: 1px #9db9fa solid;
  color: #4b6eca;
  height: 100px;
}
.dialog-station .el-textarea {
  width: 100% !important;
}
.dialog-station .el-form-item__label {
  width: 110px;
}
.dialog-station .el-form-item__content {
  margin-left: 110px;
}
.dialog-station .el-form-item-inline .el-input--medium {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.dialog-station .el-form-item-inline input {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.dialog-station .el-select {
  width: 100%;
}
</style>