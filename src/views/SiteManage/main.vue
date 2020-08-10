<template>
  <div class="app-page-main">
    <div class="app-page-rows-lefts">
      <div class="left-menu-area">
        <div class="input-so">
          <el-input
            placeholder="输入处理站"
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
        <div class="app-page-site-box">
          <div class="main-top">
            <div class="item">
              <span @click="statisticsEnergyDetail">查看能耗分析</span>
              <span @click="statisticsWaterDetail">出水量统计</span>
              <span @click="statisticsWaterQualityDetail">水质监测</span>
              当前控制室温度37
            </div>
          </div>
          <div class="app-site">
            <canvas id="line1" class="line1"></canvas>
            <div class="wbox box1"></div>
            <div class="wbox box2"></div>
            <div class="wbox box3"></div>
            <div class="wbox box4"></div>
            <div class="wbox box5"></div>
            <div class="wbox box6"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Createline } from "../../utils/liudong.js";
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
    this.lineDong();
  },
  methods: {
    lineDong() {
      var data = {
        time: 140, //运动速度
        mx: 0, //起点位置
        my: 6,
        ly: 6,
        canvas_w: 580,
        canvas_h: 10,
        color: "#428bf1", //颜色
        vx: 4,
        vy: 0,
        line_w: 4,
        fx: "w",
        width: 20, //线长
        jiange: 8 //间隔
      };
          debugger
      var res = new Createline(data);
      res.begin("line1", data);
    },
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

    statisticsEnergyDetail() {
      this.$router.push({
        path: "/sitemanage/statisticsenergy",
        query: { id: this.$route.query.id }
      });
    },
    statisticsWaterDetail() {
      this.$router.push({
        path: "/sitemanage/statisticswater",
        query: { id: this.$route.query.id }
      });
    },
    statisticsWaterQualityDetail() {
      this.$router.push({
        path: "/sitemanage/statisticswaterquality",
        query: { id: this.$route.query.id }
      });
    }

    //
  }
};
</script>
<style>
.app-page-site {
  background: #24284d;
  height: calc(100vh - 100px);
}
.app-page-site-box {
  background: #24284d url("~@/assets/image/sitebg.png");
  background-repeat: no-repeat;
  height: 100vh;
  min-width: 1200px;
  overflow-x: auto;
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
.app-site {
  position: relative;
  margin: 30px;
}
.app-site .wbox {
  background: url("~@/assets/image/w-box.png");
  width: 150px;
  height: 128px;
  position: absolute;
  z-index: 999;
}
.app-site .box1 {
  left: 100px;
  top: 400px;
}
.app-site .box2 {
  left: 320px;
  top: 400px;
}
.app-site .box3 {
  left: 550px;
  top: 400px;
}
.app-site .box4 {
  left: 780px;
  top: 400px;
}
.app-site .box5 {
  left: 1000px;
  top: 400px;
}
.app-site .line {
  background: #163c57;
  height: 10px;
  position: absolute;
}
.app-site .line1 {
  width: 100px;
  left: 230px;
  top: 460px;
  background: #163c57;
  height: 10px;
  position: absolute;
}
</style>