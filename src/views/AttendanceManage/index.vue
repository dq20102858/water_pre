<template>
  <div class="app-device-page">
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
              <el-form-item class="el-form-item" style="margin-left:30px">
                <span
                  @click="searchDateEvent(1)"
                  :class="oneType == 1 ? 'sobtns active':'sobtns'"
                >全部</span>
                <span
                  @click="searchDateEvent(2)"
                  :class="oneType == 2 ? 'sobtns active':'sobtns'"
                >今日</span>
                <span
                  @click="searchDateEvent(3)"
                  :class="oneType == 3 ? 'sobtns active':'sobtns'"
                >本周</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="app-table">
            <el-table :data="dataList">
              <el-table-column label="序号" width="80px">
                <template slot-scope="scope">{{scope.$index+(page_cur - 1) * page_size + 1}}</template>
              </el-table-column>
              <el-table-column prop="user" label="考勤人"></el-table-column>
              <el-table-column prop="start_time" label="打卡开始时间"></el-table-column>
              <el-table-column prop="end_time" label="打卡结束时间"></el-table-column>
              <el-table-column prop="address" label="打卡地点"></el-table-column>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      page_cur: 1,
      page_data_total: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      fatherStationList: [],
      childStationList: [],
      fatherStationId: 0,
      chlidStationId: 0,
      chlidStationName: "",
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
      oneType: 1
    };
  },
  created() {
    this.getFatherStationList();
    this.getDataList();
  },
  methods: {
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
    },
    //end station

    getDataList() {
      let page = this.page_cur;
      let sid = this.chlidStationId;
      let start_time = this.searchStartTime;
      let end_time = this.searchEndTime;
      //console.log("start_time：" + start_time + "\n_end_time：" + end_time);
      this.request({
        url: "clock/getClockPages",
        method: "get",
        params: { page, sid, start_time, end_time }
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
      this.searchStartTime = "";
      this.searchEndTime = "";
      this.getDataList();
    },
    searchDateEvent(type) {
      this.page_cur = 1;
      this.oneType = type;
      if (type == 1) {
        this.searchStartTime = "";
        this.searchEndTime = "";
        this.fatherStationEvent(0);
      } else if (type == 2) {
        let end = new Date();
        let start = new Date(
          new Date(new Date().toLocaleDateString()).getTime()
        );
        this.searchStartTime = start;
        this.searchEndTime = end;
        this.getDataList();
      } else {
        let end = new Date();
        let start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        this.searchStartTime = start;
        this.searchEndTime = end;
        this.getDataList();
      }
    },
    repairEvent(flag, id) {
      this.request({
        url: "/alert/isRepair",
        method: "post",
        data: { id: id, type: this.searchType, is_repair: flag }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.getDataList();
          //let msginfo = flag == 1 ? "设置已修复" : "取消已修复";
          this.$message({
            type: "success",
            message: "设置成功！"
          });
        }
      });
    },
    updateRead(id) {
      this.request({
        url: "/alert/updateRead",
        method: "post",
        data: { id: id, type: this.searchType }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.getDataList();
          //let msginfo = flag == 1 ? "设置已修复" : "取消已修复";
          this.$message({
            type: "success",
            message: "设置成功！"
          });
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
            url: "/alert/deleteAlert",
            method: "post",
            data: { id: id, type: this.searchType }
          }).then(res => {
            let data = res.data;
            if (data.status == 1) {
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
            }
          });
        })
        .catch(() => {});
    }
    //
  }
};
</script>
<style>
.samplinglist .el-table tr th {
  text-align: center;
}
.nums {
  padding: 3px 5px;
}
.cirshow {
  background: #f45e23;
  color: #fff;
  padding: 3px 5px;
  border-radius: 3px;
}
.sobtns {
  cursor: pointer;
  border-radius: 3px;
  margin-left: 10px;
  padding: 8px 20px;
  font-size: 14px;
  background: #f4f4f5;
  color: #909399;
  border: 1px #d3d4d6 solid;
}
.sobtns.active {
  background: #338ff6;
  color: #fff;
  border: 1px #338ff6 solid;
}
</style>