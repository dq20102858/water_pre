<template>
  <div class="app-device-page">
    <div class="app-page-rows">
      <div class="app-page-rows-left">
        <div class="left-menu-area">
          <div class="input-so">
            <el-input
              placeholder="请输入处理站"
              prefix-icon="el-icon-search"
              v-model="searchVillageName"
              @input="searchVillageNameEvent"
              maxlength="10"
              clearable
            ></el-input>
          </div>
          <el-menu router>
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
            <!-- <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li><li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
       <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li><li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
          <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村</span></li>
            <li role="menuitem" tabindex="-1" class="el-menu-item" style="padding-left: 20px;"><span>测试村13123</span></li>-->
          </el-menu>
        </div>
      </div>
      <div class="app-page-rows-right">
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
                  placeholder="选择结束时间"
                  v-model="searchEndTime"
                  style="width:150px"
                  @change="searchEndTimeEvent"
                  :picker-options="pickerEndTime"
                ></el-date-picker>
              </el-form-item>
              <!-- <el-form-item class="el-form-item">
                <el-date-picker
                  v-model="searchDataTime"
                  type="daterange"
                  start-placeholder="请选择开始日期"
                  end-placeholder="请选择结束日期"
                  range-separator="至"
                  @change="searchDataTimeEvent"
                  clearable
                ></el-date-picker>
              </el-form-item>-->
            </el-form>
          </div>
          <div class="app-table">
            <el-table :data="dataList">
              <el-table-column label="序号" width="80px">
                <template slot-scope="scope">
                  <span
                    :class="[scope.row.is_read==0? 'cirshow' : 'nums']"
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
              <el-table-column label="操作" v-if="this.searchType==3" width="150">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <a class="btn-edit" target="_blank" :href="scope.row.video_url">查看视频</a>
                    <el-button class="btn-del" size="mini" @click="deleteEvent(scope.row.id)">删除</el-button>
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
      childStation: [],
      searchVillageName: "",
      searchVillageId: 0,
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
      searchEndTime: ""
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
    searchVillageEvent(val) {
      this.page_cur = 1;
      this.searchVillageId = val;
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
    searchVillageNameEvent() {
      this.getChildStationList();
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
.samplinglist .nums {
  padding: 3px 5px;
}
.samplinglist .cirshow {
  background: #f45e23;
  color: #fff;
  padding: 3px 5px;
  border-radius: 3px;
}
</style>