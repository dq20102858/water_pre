<template>
  <div class="app-page">
    <div class="app-page-container">
      <div class="app-page-select">
        <el-form :model="searchForm" :inline="true">
          <div class="select-from-inline">
            <el-form-item>
              <el-button type="primary" class="redbtn" style="width:145px;" icon="el-icon-plus" @click="addInfo">新建调度命令</el-button>
            </el-form-item>
            <el-form-item label="机车名称">
              <el-select v-model="searchForm.lid" placeholder="请选择" clearable>
                <el-option
                  v-for="item in lidList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="值班调度">
              <el-select placeholder="请选择调度员" v-model="searchForm.dispatch_id" clearable>
                <el-option
                  v-for="item in dispatchList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车长">
              <el-select placeholder="请选择" v-model="searchForm.master_id" clearable>
                <el-option
                  v-for="item in masterList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="司机">
              <el-select placeholder="请选择" v-model="searchForm.driver_id" clearable>
                <el-option
                  v-for="item in driverList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="select-from-inline">
            <el-form-item>
              <el-button type="primary" style="width:145px;" class="bluebtn"  icon="el-icon-refresh-right" @click="onLoadPage">更新信息</el-button>
            </el-form-item>
            <el-form-item label="命令状态">
              <el-select v-model="searchForm.status" placeholder="请选择" clearable>
                <el-option label="新命令" value="1"></el-option>
                <el-option label="已确认" value="2"></el-option>
                <el-option label="已作废" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="searchForm.time_range"
                 type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="form-so">
              <label class="el-form-item__label"></label>
              <el-button size="small" icon="el-icon-search" type="primary" @click="getDataLists">查询</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="app-table">
        <el-table :data="dataList">
          <el-table-column prop="number" label="命令号"></el-table-column>
          <el-table-column prop="loco" label="受令机长"></el-table-column>
          <el-table-column prop="master" label="受令车长"></el-table-column>
          <el-table-column prop="driver" label="受令司机"></el-table-column>
          <el-table-column prop="location" label="受令处所"></el-table-column>
          <el-table-column prop="dispatch" label="值班调度"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span class="statused" v-if="scope.row.status=='1'">新命令</span>
              <span class="statused" v-if="scope.row.status=='2'">已确认</span>
              <span class="statused" v-if="scope.row.status=='3'">已作废</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" min-width="80" label="发令时间"></el-table-column>
          <el-table-column prop="makesure_time" min-width="80" label="确认时间">
            <template slot-scope="scope">
              <span v-if="scope.row.makesure_time.length==0">暂未确认</span>
              <span v-else>{{scope.row.makesure_time}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <div class="app-operation">
                <el-button class="btn-blue" size="mini" @click="goDetail(scope.row.id)">详情</el-button>
                <el-button
                  :disabled="scope.row.status == '3'"
                  class="btn-blue"
                  size="mini"
                  @click="goInvalid(scope.row.id,scope.$index)"
                >作废</el-button>
                <el-button
                  title="作废后才能删除"
                  :disabled="scope.row.status != '3'"
                  class="btn-red"
                  size="mini"
                  @click="goDel(scope.row.id)"
                >删除</el-button>
                <el-button class="btn-green" size="mini" @click="goPrint(scope.row.id)">打印</el-button>
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
          <button @click="toFirstPage" type="button" class="btn-first"><span>首页</span></button>
          <button @click="toLastPage" type="button" class="btn-last"><span>尾页</span></button>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addForm from "./edit.vue";
import detailForm from "./detail.vue";
import printlForm from "./printing.vue";
export default {
  name: "",
  data() {
    return {
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      lidList: [],
      masterList: [],
      driverList: [],
      dispatchList: [],
      dataList: [],
      searchForm: {
        lid: "",
        dispatch_id: "",
        master_id: "",
        driver_id: "",
        status: "",
        time_range: []
      }
    };
  },
  created() {
    this.getlibLists(); //机车
    this.getUsersListDispatch(); //调度员
    this.getUsersListMaster(); //车长
    this.getUsersListDriver(); //司机
    this.getDataLists();
  },
  methods: {
    onLoadPage() {
      this.$router.go(0);
    },
    getlibLists() {
      this.request({
        url: "/dispatch/getLocomotiveLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.lidList = data.data;
        }
      });
    },
    //5:车长,6:司机,7:调度值班员
    getUsersListMaster() {
      this.request({
        url: "/dispatch/getUsersLists?role_id=5",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.masterList = data.data;
        }
      });
    },
    getUsersListDriver() {
      this.request({
        url: "/dispatch/getUsersLists?role_id=6",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.driverList = data.data;
        }
      });
    },
    getUsersListDispatch() {
      this.request({
        url: "/dispatch/getUsersLists?role_id=7",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dispatchList = data.data;
        }
      });
    },
    getDataLists() {
      let page = this.page_cur;
      let lid = this.searchForm.lid;
      let dispatch_id = this.searchForm.dispatch_id;
      let master_id = this.searchForm.master_id;
      let driver_id = this.searchForm.driver_id;
      let status = this.searchForm.status;
      let time_range = this.searchForm.time_range;
      //alert(time_range);
      this.request({
        url: "/dispatch/getDispatchPages",
        method: "get",
        params: {
          page,
          lid,
          dispatch_id,
          master_id,
          driver_id,
          status,
          time_range
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
      this.getDataLists();
    },
    toFirstPage() {
      this.pageChange(1);
    },
    toLastPage() {
      this.page_cur = this.page_total;
      this.pageChange(this.page_total);
    },
    addInfo: function() {
      this.$layer.iframe({
        area: ["800px", "590px"],
        title: "新建调度命令",
        skin: "layers",
        shadeClose: false,
        scrollbar: false,
        content: {
          content: addForm,
          parent: this,
          data: {}
        }
      });
    },
    goDetail: function(id) {
      this.$layer.iframe({
        area: ["800px", "590px"],
        title: "调度命令详情",
        shadeClose: false,
        scrollbar: false,
        content: {
          content: detailForm,
          parent: this,
          data: { iframeData: { id: id } }
        }
      });
    },
    goInvalid(id, index) {
      this.$confirm("您确定作废命令?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.request({
          url: "/dispatch/changeStatus",
          method: "post",
          data: { id: id, status: 3 },
          contentType: "application/x-www-form-urlencoded"
        }).then(res => {
          let data = res.data;
          if (data.status == 1) {
            this.$message({
              type: "success",
              message: "作废成功!"
            });
            this.$set(this.dataList[index], "status", 3);
          }
        });
      });
    },
    goDel(id) {
      this.$confirm("您确定删除命令?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.request({
          url: "/dispatch/changeStatus",
          method: "post",
          data: { id: id, status: 0 },
          contentType: "application/x-www-form-urlencoded"
        }).then(res => {
          let data = res.data;
          if (data.status == 1) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getDataLists();
          }
        });
      });
    },
    goPrint: function(id) {
      this.$layer.iframe({
        area: ["960px", "590px"],
        title: "调度命令（行车调度）",
        shadeClose: false,
        scrollbar: false,
        content: {
          content: printlForm,
          parent: this,
          data: { iframeData: { id: id } }
        }
      });
    }
  }
};
</script>

<style>
.app-page-select {
  margin-bottom: 10px;
  width: 100%;
}
.app-page-select .select-from-inline .el-form-item__label {
  width: 70px;
}
.app-page-select .select-from-inline {
  display: flex;
}
.app-page-select .select-from-inline .el-form-item {
  display: flex;
}
.app-page-select .select-from-inline .bluebtn {
  width: 120px;
  margin-right: 20px;
}
.app-page-select .select-from-inline .redbtn {
  background: #ff5c75;
  width: 120px;
  border-color: #ff5c75;
  margin-right: 20px;
}
.app-page-select .select-from-inline .input {
  width: auto;
}
.app-page-select .select-from-inline .form-so {
  width: 29%;
  text-align: right;
}
.app-page-select .select-from-inline .form-so .el-form-item__content {
  width: 100%;
}
.app-page-select .select-from-inline .form-so .el-button- {
  float: right;
}


</style>
