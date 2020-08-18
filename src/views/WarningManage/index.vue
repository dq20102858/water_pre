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
            <!-- <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">end中南新村</span></li>
        <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">end中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">end中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
        <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">end中南新村</span></li>
        <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">1中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">2南新村</span></li>
        <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">3中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">4中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">dend中南新村</span></li>
            -->
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
            <!-- <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
        <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">中南新村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item is-active" style="padding-left: 20px;"><span title="中南新村">end中南新村</span></li>
            -->
          </el-menu>
        </div>
      </div>
      <div class="app-page-rows-rights" ref="apprights">
        <div class="app-page-container">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item class="el-form-item el-select-dorps">
                <el-select v-model="searchType" @change="searchTypeEvent" style="width:120px">
                  <el-option label="设备告警" value="2"></el-option>
                  <el-option label="水质告警" value="1"></el-option>
                  <el-option label="入侵告警" value="3"></el-option>
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
            </el-form>
          </div>
          <div class="app-table">
            <el-table :data="dataList">
              <el-table-column label="序号" width="80px">
                <template slot-scope="scope">
                  <span
                    :class="[scope.row.is_read!=1? 'cirshow' : 'nums']"
                  >{{scope.$index+(page_cur - 1) * page_size + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="告警设备" v-if="this.searchType==2">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==1">风机</span>
                  <span v-else>水泵</span>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="水质类型" v-if="this.searchType==1">
                <template slot-scope="scope">
                  <span v-if="scope.row.type==1">PH</span>
                  <span v-else-if="scope.row.type==2">DO</span>
                  <span v-else>液位</span>
                </template>
              </el-table-column>
              <el-table-column prop="reason" label="告警原因" v-if="this.searchType!=3"></el-table-column>
              <el-table-column prop="create_time" label="告警时间"></el-table-column>
              <el-table-column prop="address" label="发生位置"></el-table-column>
              <el-table-column prop="is_repair" label="是否修复" v-if="this.searchType!=3">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_repair==1">是</span>
                  <span v-if="scope.row.is_repair==0">否</span>
                  <el-switch
                    title="设置状态"
                    v-model="scope.row.is_repair"
                    :active-value="1"
                    :inactive-value="0"
                    active-text
                    inactive-text
                    active-color="#383C57"
                    @change="repairEvent($event,scope.row.id)"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" v-if="this.searchType==3" width="220">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button v-if="scope.row.is_read==1" class="btn-gray" size="mini" disabled>已读</el-button>
                    <el-button
                      v-if="scope.row.is_read!=1"
                      @click="updateRead(scope.row.id)"
                      class="btn-print"
                      size="mini"
                    >未读</el-button>
                    <el-button class="btn-edit" @click="videoEvent(scope.row.id)">查看视频</el-button>
                    <el-button
                      class="btn-del"
                      size="mini"
                      @click="deleteEvent(scope.row.id,scope.row.is_read)"
                    >删除</el-button>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" v-if="this.searchType !=3" width="125">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button v-if="scope.row.is_read==1" class="btn-gray" size="mini" disabled>已读</el-button>
                    <el-button
                      v-if="scope.row.is_read!=1"
                      @click="updateRead(scope.row.id)"
                      class="btn-print"
                      size="mini"
                    >未读</el-button>
                    <el-button
                      class="btn-del"
                      size="mini"
                      @click="deleteEvent(scope.row.id,scope.row.is_read)"
                    >删除</el-button>
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
        width="920px"
        title="监控画面"
        :close-on-click-modal="false"
        :visible.sync="diaLogFormVisible"
      >
        <div class="videolist">
          <div class="vitems">
            <div class="gtitle">视屏1</div>
            <img :src="require('@/assets/image/videos.png')" />
          </div>
          <div class="vitems">
            <div class="gtitle">视屏1</div>
            <img :src="require('@/assets/image/videos.png')" />
          </div>
        </div>
      </el-dialog>
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
      searchEndTime: "",
      diaLogFormVisible: false
    };
  },
  mounted() {},
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
      let type = this.searchType;
      let sid = this.chlidStationId;
      let start_time = this.searchStartTime;
      let end_time = this.searchEndTime;
      this.request({
        url: "/alert/getAlertPages",
        method: "get",
        params: { page, type, sid, start_time, end_time }
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
    searchTypeEvent(val) {
      this.type = this.searchType;
      this.getDataList();
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
      let mscount = document.querySelectorAll(".msgcount")[0].innerText;
      this.request({
        url: "/alert/updateRead",
        method: "post",
        data: { id: id, type: this.searchType }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.getDataList();
          document.querySelectorAll(".msgcount")[0].innerText =
            parseInt(mscount) - 1;
          this.$message({
            type: "success",
            message: "设置成功！"
          });
        }
      });
    },
    videoEvent() {
      this.diaLogFormVisible = true;
    },
    deleteEvent(id, is_read) {
      let mscount = document.querySelectorAll(".msgcount")[0].innerText;
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
              if (parseInt(is_read) != 1) {
                document.querySelectorAll(".msgcount")[0].innerText =
                  parseInt(mscount) - 1;
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
.videolist {
  overflow: hidden;
  border-radius: 3px;
}
.videolist .vitems {
  width: 400px;
  float: left;
  margin: 0 15px 20px 15px;
}
.videolist .vitems img {
  width: 100%;
}
.videolist .gtitle {
  background: #4093ed;
  color: #fff;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  border-radius: 3px 3px 0 0;
  padding-left: 20px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>