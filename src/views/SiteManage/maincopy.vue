<template>
  <div class="app-page-main">
    <div class="app-page-rows-lefts">
      <div class="left-menu-area">
        <div class="input-so">
          <el-input
            placeholder="请输入处理站"
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
          <div class="app-page-site">
            <div class="app-page-site-box">
              <div class="app-site">
                <div class="centerbox">
                  <div class="jcname">进水口</div>
                  <canvas id="line1" class="wline"></canvas>
                  <canvas id="line2" class="wline"></canvas>
                  <canvas id="line3" class="wline rotate270"></canvas>
                  <canvas id="line4" class="wline"></canvas>
                  <canvas id="line5" class="wline rotate90"></canvas>
                  <canvas id="line6" class="wline rotate270"></canvas>
                  <canvas id="line7" class="wline rotate270"></canvas>
                  <canvas id="line8" class="wline rotate270"></canvas>
                  <canvas id="line9" class="wline"></canvas>
                  <canvas id="line10" class="rotate270 wline"></canvas>
                  <canvas id="line11" class="wline"></canvas>
                  <canvas id="line12" class="wline"></canvas>
                  <canvas id="line13" class="wline"></canvas>
                  <canvas id="line14" class="wline"></canvas>
                  <canvas id="line15" class="wline rotate90"></canvas>
                  <canvas id="line16" class="wline rotate90"></canvas>
                  <div class="adapter1 ad1"></div>
                  <div class="adapter2 ad2"></div>
                  <div class="adapter1 ad3"></div>
                  <div class="adapter1 ad4"></div>
                  <div class="adapter1 ad5"></div>
                  <div class="adapter4 ad6"></div>
                  <div class="adapter1 ad7"></div>
                  <div class="adapter2 ad8"></div>
                  <div class="adapter2 ad9"></div>
                  <div class="j2text">
                    <div>PH：60</div>
                    <div>PH：60</div>
                    <div>PH：60</div>
                  </div>
                  <div class="itembox1">
                    <div class="wbox">
                      <div class="bwater"></div>
                      <div class="ble"></div>
                    </div>
                    <div class="bnames">栅格池</div>
                  </div>
                  <div class="itembox2">
                    <div class="wbox">
                      <div class="bwater"></div>
                      <div class="ble"></div>
                      <div class="bban"></div>
                    </div>
                    <div class="bnames">调节池</div>
                  </div>
                  <div class="itembox3">
                    <div class="wbox">
                      <div class="bwater"></div>
                      <div class="ble"></div>
                    </div>
                    <div class="bnames">厌氧池</div>
                  </div>
                  <div class="itembox4">
                    <div class="wbox">
                      <div class="bwater"></div>
                      <div class="ble"></div>
                      <div class="bban"></div>
                    </div>
                    <div class="bnames">好氧池</div>
                  </div>
                  <div class="itembox5">
                    <div class="wbox">
                      <div class="bwater"></div>
                      <div class="ble"></div>
                      <div class="bban"></div>
                    </div>
                    <div class="bnames">二沉池</div>
                  </div>
                  <div class="itembox6">
                    <div class="wbox">
                      <div class="bwater"></div>
                      <div class="ble"></div>
                    </div>
                    <div class="bnames">预留池</div>
                  </div>
                  <div class="itembox7">
                    <div class="wbox">
                      <div class="bwater"></div>
                      <div class="ble"></div>
                    </div>
                    <div class="bnames">消毒池</div>
                  </div>
                  <div class="itembox8">
                    <div class="wbox">
                      <div class="bwater"></div>
                      <div class="ble"></div>
                    </div>
                    <div class="bnames">排放池</div>
                  </div>
                  <div class="itembox0">
                    <div class="wbox0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Createline } from "../../utils/flowAnimation.js";
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

    this.flowAnimation("line1", 145, 12, "w");
    this.flowAnimation("line2", 145, 12, "w");
    this.flowAnimation("line3", 100, 12, "w");
    this.flowAnimation("line4", 100, 12, "w");
    this.flowAnimation("line5", 100, 12, "w");
    this.flowAnimation("line6", 200, 12, "w");
    this.flowAnimation("line7", 150, 12, "w");
    this.flowAnimation("line8", 100, 12, "w");
    this.flowAnimation("line9", 300, 12, "w");
    this.flowAnimation("line10", 80, 12, "w");
    this.flowAnimation("line11", 100, 12, "w");
    this.flowAnimation("line12", 100, 12, "w");
    this.flowAnimation("line13", 450, 12, "w");
    this.flowAnimation("line14", 200, 12, "w");
    this.flowAnimation("line15", 90, 12, "w");
    this.flowAnimation("line16", 150, 12, "w");
  },
  methods: {
    flowAnimation(canvas, canvas_w, canvas_h, fx) {
      var data = {
        time: 150, //运动速度
        mx: 0, //起点位置
        my: 6,
        ly: 6,
        canvas_w: canvas_w,
        canvas_h: canvas_h,
        color: "#51b9d4", //颜色
        vx: 4,
        vy: 0,
        line_w: 4,
        fx: fx,
        width: 10, //线长
        jiange: 10 //间隔
      };
      var res = new Createline(data);
      res.begin(canvas, data);
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
/* */
.app-page-site {
  background: #24284d;
  height: calc(100vh - 100px);
}
.app-page-site-box {
  background: #24284d;
  background-repeat: no-repeat;
  height: 100vh;
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
  border-radius: 2px;
  font-size: 16px;
  padding: 8px 10px;
  margin-right: 30px;
  cursor: pointer;
}
.app-site {
  position: relative;
  margin-left: 100px;
  width: 1120px;
}
.app-site .centerbox {
  margin-top: 400px;
  position: relative;

  z-index: 99;
}
.app-site .itembox1 {
  position: absolute;
  top: 0px;
  left: 130px;
}
.app-site .itembox2 {
  position: absolute;
  top: 0px;
  left: 350px;
}
.app-site .itembox3 {
  position: absolute;
  top: 0px;
  left: 570px;
}
.app-site .itembox4 {
  position: absolute;
  top: 0px;
  left: 790px;
}
.app-site .itembox5 {
  position: absolute;
  top: 0px;
  left: 1010px;
}
.app-site .itembox6 {
  position: absolute;
  top: 240px;
  left: 1010px;
}
.app-site .itembox7 {
  position: absolute;
  top: 240px;
  left: 790px;
}
.app-site .itembox8 {
  position: absolute;
  top: 240px;
  left: 570px;
}
.app-site .itembox0 {
  position: absolute;
  top: -320px;
  left: 1000px;
}
.app-site .wbox0 {
  margin: 0 auto;
  background: url("~@/assets/image/site-03.png") no-repeat;
  height: 229px;
  width: 281px;
  z-index: 999;
  overflow: hidden;
}
.app-site .wbox {
  margin: 0 auto;
  background: url("~@/assets/image/site-01.png") no-repeat;
  width: 151px;
  height: 128px;
  z-index: 999;
  overflow: hidden;
  position: relative;
}
.app-site .wbox .bwater {
  margin-top: 40px;
  display: block;
  margin-bottom: 10px;
  background: url("~@/assets/image/site-02.png") no-repeat;
  height: 67px;
}
.app-site .wbox .ble {
  background: #1d689e;
  height: 2px;
  width: 150px;
}
.app-site .wbox .bban {
  background: url("~@/assets/image/site-04.png") no-repeat;
  width: 38px;
  height: 59px;
  position: absolute;
  right: 5px;
  bottom: 12px;
}
.app-site .bnames {
  color: #fff;
  text-align: center;
  font-size: 16px;
  padding-top: 15px;
}
.app-site .jcname {
  background: rgba(32, 95, 156, 0.5);
  color: #fff;
  width: 80px;
  text-align: center;
  padding: 4px 0px;
  border-radius: 2px;
  border: 1px #4274a5 solid;
  position: absolute;
  top: 30px;
}
.app-site .j2text {
  position: absolute;
  top: -120px;
  left: 150px;
}
.app-site .j2text div {
  background: rgba(32, 95, 156, 0.5);
  color: #fff;
  width: 105px;
  padding: 2px 0px;
  border-radius: 2px;
  border: 1px #4274a5 solid;
  margin-bottom: 10px;
  text-indent: 10px;
}
/* line */
.app-site .wline {
  position: absolute;
  background: #1f5880;
  border-radius: 2px;
}
.app-site #line1 {
  left: 40px;
  top: 70px;
}
.app-site #line2 {
  left: 240px;
  top: 50px;
}
.app-site #line3 {
  left: 415px;
  top: 10px;
}
.app-site #line4 {
  left: 480px;
  top: -50px;
}
.app-site #line5 {
  left: 545px;
  top: 15px;
}
.app-site #line6 {
  left: 530px;
  top: -90px;
}
.app-site #line7 {
  left: 590px;
  top: -10px;
}
.app-site #line8 {
  left: 645px;
  top: 15px;
}
.app-site #line9 {
  left: 645px;
  top: -200px;
}
.app-site #line10 {
  left: 910px;
  top: -200px;
}
.app-site #line11 {
  left: 960px;
  top: -240px;
}
.app-site #line12 {
  left: 960px;
  top: -161px;
}
.app-site #line13 {
  left: 670px;
  top: -90px;
}
.app-site #line14 {
  left: 700px;
  top: -50px;
}
.app-site #line15 {
  left: 860px;
  top: 10px;
}
.app-site #line16 {
  left: 1050px;
  top: -10px;
}
/* */
.adapter1 {
  position: absolute;
  width: 21px;
  height: 22px;
  background: url("~@/assets/image/w-g1.png") no-repeat;
}
.adapter2 {
  position: absolute;
  width: 21px;
  height: 22px;
  background: url("~@/assets/image/w-g2.png") no-repeat;
}
.adapter3 {
  position: absolute;
  width: 21px;
  height: 22px;
  background: url("~@/assets/image/w-g3.png") no-repeat;
}
.adapter4 {
  position: absolute;
  width: 21px;
  height: 22px;
  background: url("~@/assets/image/w-g4.png") no-repeat;
}
.ad1 {
  left: 460px;
  top: -50px;
}
.ad2 {
  left: 580px;
  top: -50px;
}
.ad3 {
  left: 625px;
  top: -200px;
}
.ad4 {
  left: 660px;
  top: -90px;
}
.ad5 {
  left: 945px;
  top: -240px;
}
.ad6 {
  left: 945px;
  top: -170px;
}
.ad7 {
  left: 690px;
  top: -50px;
}
.ad8 {
  left: 890px;
  top: -50px;
}
.ad9 {
  left: 1110px;
  top: -90px;
}
.rotate360 {
  transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  -o-transform: rotate(360deg);
}
.rotate270 {
  transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  -moz-transform: rotate(270deg);
  -webkit-transform: rotate(270deg);
  -o-transform: rotate(270deg);
}
.rotate180 {
  transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -o-transform: rotate(180deg);
}
.rotate90 {
  transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  -o-transform: rotate(90deg);
}
</style>