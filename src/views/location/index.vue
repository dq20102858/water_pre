<template>
  <div id="location">
    <div class="el-menu-top">
      <el-menu router default-active="location" mode="horizontal">
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
            <el-form-item label="公司名称">
              <el-select v-model="searchForm.depart_id" placeholder="请选择公司"  @change="selectCompanyList($event)">
                <el-option
                  v-for="item in companyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="人员姓名">
              <el-select v-model="searchForm.name" placeholder="请选择人员姓名" clearable>
                <el-option
                  v-for="item in objSelectLists"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="线别">
              <el-select v-model="searchForm.line_type" placeholder="请选择线别" clearable>
                <el-option
                  v-for="item in linTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始位置" class="el-form-item-inline">
              <b>DK</b>
              <el-input v-model="searchForm.start_flag" autocomplete="off" placeholder="公里" title="请输入数字" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
              <b>+</b>
              <el-input v-model="searchForm.start_length" autocomplete="off" placeholder="米" title="请输入数字" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="结束位置" class="el-form-item-inline">
              <b>DK</b>
              <el-input v-model="searchForm.end_flag" autocomplete="off" placeholder="公里" title="请输入数字" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
              <b>+</b>
              <el-input v-model="searchForm.end_length" autocomplete="off" placeholder="米" title="请输入数字" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="searchForm.start_time"
                :picker-options="pickerOptionsStart"
                type="date"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="searchForm.end_time"
                :picker-options="pickerOptionsEnd"
                type="date"
                clearable
              ></el-date-picker>
            </el-form-item>

            <el-form-item class="form-so">
              <label class="el-form-item__label"></label>
              <el-button size="small" icon="el-icon-search" @click="searchEvent" type="primary">查询</el-button>
              <el-button size="small" plain @click="resetSerach">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="app-table">
          <el-table :data="dataList">
            <el-table-column prop="id" label="序号"></el-table-column>
            <el-table-column prop="id" label="姓名"></el-table-column>
            <el-table-column prop="id" label="公司名称"></el-table-column>
            <el-table-column prop="id" label="在线时长"></el-table-column>
            <el-table-column prop="id" label="出入场次数查询"></el-table-column>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.searchForm.end_time) {
            return (
              time.getTime() > new Date(this.searchForm.end_time).getTime()
            );
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.searchForm.start_time) {
            return (
              time.getTime() < new Date(this.searchForm.start_time).getTime()
            );
          }
        }
      },
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      companyList: [],
      objSelectLists: [],
      linTypeList: [],
      searchForm: {}
    };
  },
  created() {
    this.getCompanyList();
    this.getLiTypeList();
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
    selectCompanyList(val) {
      this.$set(this.searchForm, "name", "");
      this.request({
        url: "/user/getUserByDepart",
        method: "get",
        params: { id: val, type: 1 }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.objSelectLists = data.data;
        }
      });
    },
    getLiTypeList() {
      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.linTypeList = data.data;
        }
      });
    },

    getDataList() {
      let page = this.page_cur;
      let depart_id = this.searchForm.depart_id;
      let name = this.searchForm.name;
      let line_type = this.searchForm.line_type;
      let start_time = this.searchForm.start_time;
      let end_time = this.searchForm.end_time;
      let start_flag = this.searchForm.start_flag;
      let start_length = this.searchForm.start_length;
      let end_flag = this.searchForm.end_flag;
      let end_length = this.searchForm.end_length;
      this.request({
        url: "/location/getLocationStatisticPages",
        method: "get",
        params: {
          page,
          depart_id,
          name,
          line_type,
          start_time,
          end_time,
          start_flag,
          start_length,
          end_flag,
          end_length
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
    searchEvent() {
      this.page_cur = 1;
      this.getDataList();
    },
    resetSerach() {
      this.searchForm = {
        depart_id: "",
        name: "",
        line_type: "",
        start_flag: "",
        start_length: "",
        end_flag: "",
        end_length: "",
        start_time: "",
        end_time: ""
      };
      this.getDataList();
    }
    //
  }
};
</script>
<style>
.app-page-select .el-form-item-inline .el-input--medium {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.app-page-select .el-form-item-inline input {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.app-page-select b{color: #999;}
.dialog-loction .el-textarea__inner {
  border: 1px #9db9fa solid;
  color: #4b6eca;
  height: 100px;
}
.dialog-loction .el-textarea {
  width: 100% !important;
}
.dialog-loction .el-form-item__label {
  width: 170px;
}
.dialog-loction .el-form-item__content {
  margin-left: 170px;
}

.dialog-loction .el-select {
  width: 100%;
}
</style>