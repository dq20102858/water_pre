<template>
  <div class="app-page-main">
    <div class="app-page-rows-left">
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
    </div>
    <div class="app-page-rows-right">
      <div class="app-page-site">
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
        <div class="app-site"></div>
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
    repairEvent(id, flag) {
      this.request({
        url: "/alert/isRepair",
        method: "post",
        data: { id: id, type: this.searchType, is_repair: flag }
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
.app-page-site {
  background-image: url("~@/assets/image/sitebg.png");
  background-repeat: no-repeat;
  height: calc(100vh - 100px);
}
</style>