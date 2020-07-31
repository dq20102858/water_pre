<template>
  <div class="app-device-page">
    <el-row :gutter="20" class="grid-menu">
      <el-col :xs="8" :sm="3" :md="3" :lg="3" :xl="3">
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
      </el-col>
      <el-col :xs="16" :sm="21" :md="21" :lg="21" :xl="21">
        <div class="app-page-container">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item class="el-form-item el-search-items">
                <el-select v-model="searchType" @change="searchTypeEvent">
                  <el-option label="设备告警" value="2"></el-option>
                  <el-option label="水质告警" value="1"></el-option>
                  <el-option label="入侵告警" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="app-table">
            <el-table :data="dataList">
              <el-table-column label="序号" width="80px">
                <template slot-scope="scope">{{scope.$index+(page_cur - 1) * page_size + 1}}</template>
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
              <el-table-column prop="address" label="发声位置"></el-table-column>
              <el-table-column prop="is_repair" label="是否修复" v-if="this.searchType!=3">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_repair==1">是</span>
                  <span v-else>
                    <el-button class="btn-sele"  @click="repairEvent(scope.row.id,1)">是</el-button>
                  <el-button class="btn-sele mar5"  @click="repairEvent(scope.row.id,0)">否 </el-button>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作"  v-if="this.searchType==3" width="150">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <a  class="btn-edit" target="_blank" :href="scope.row.video_url">查看视频</a>
                    <el-button class="btn-del" size="mini" @click="deleteEvent(scope.row.id)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
                 <el-table-column label="操作"  v-if="this.searchType !=3"  width="70">
                <template slot-scope="scope">
                  <div class="app-operation">
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
      </el-col>
    </el-row>
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
      searchType: "2"
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
        url: "/alert/getAlertPages",
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
    repairEvent(id,flag) {
     
          this.request({
            url: "/alert/isRepair",
            method: "post",
            data: { id: id, type: this.searchType,is_repair:flag }
          }).then(res => {
            let data = res.data;
            if (data.status == 1) {
                this.getDataList();
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
                this.getDataList();
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
.app-device-page {
  overflow: hidden;
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
</style>