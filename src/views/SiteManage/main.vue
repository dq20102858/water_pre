<template>
  <div class="app-page-main">
    <div class="app-page-rows-lefts">
      <div class="left-menu-area">
        <div class="input-so">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="chlidName"
            @input="chlidNameEvent"
            clearable
          ></el-input>
        </div>
        <el-menu router>
          <el-menu-item :class="fatherId === 0 ? 'active' : ''" @click="fatherStationEvent(0)">
            <span>全部</span>
          </el-menu-item>
          <el-menu-item
            v-for="item in fatherStationList"
            :key="item.id"
            :class="fatherId === item.id ? 'active' : ''"
            @click="fatherStationEvent(item.id)"
          >
            <span>{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="left-menu-chlid">
        <!-- <div class="el-menu-title">
           <i class="el-icon-location-information"></i>
         中南新村
        </div>-->
        <el-menu router>
          <el-menu-item
            v-for="item in childStationList"
            :key="item.id"
            :class="fatherId === item.id ? 'active' : ''"
            @click="chlidStationEvent(item.id)"
          >
            <span>{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="app-page-rows-rights">
      <div class="app-page-site">
        <div class="main-top">
          <div class="item">
            <span @click="waterStatisticsDetail">查看能耗分析</span> 当前控制室温度37
          </div>
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
      fatherId: 0,
      fatherStationList: [],
      childStationList: [],
      chlidName: ""
    };
  },
  created() {
    this.getFatherStationList();
  },
  methods: {
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
          if (this.fatherId == 0) {
            this.getChildStationList();
          }
        }
      });
    },
    getChildStationList() {
      let name = this.chlidName;
      this.request({
        url: "/station/getChildStationLists",
        method: "get",
        params: { name }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.childStationList = data.data;
        }
      });
    },
    fatherStationEvent(val) {
      if (val == 0) {
        this.getChildStationList();
      }
      this.fatherId = val;
      this.fatherStationList.map(ele => {
        if (ele.id == val) {
          this.childStationList = ele.child;
        }
      });
      console.log(this.childStationList);
    },
    chlidStationEvent() {},
    chlidNameEvent() {},

    waterStatisticsDetail() {
      this.$router.push({
        path: "/sitemanage/statisticswater",
        query: { id: this.$route.query.id }
      });
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

.main-top {
  padding: 30px 30px 0 30px;
  color: #fff;
  font-size: 20px;
}
.main-top .item span {
  background: #244177;
  color: #fff;
  border-radius: 3px;
  font-size: 16px;
  padding: 8px 10px;
  margin-right: 30px;
  cursor: pointer;
}
</style>