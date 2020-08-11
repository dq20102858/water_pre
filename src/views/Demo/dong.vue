<template>
  <div class="app-page-main">
    <div class="app-page-rows">
      <div class="app-page-rows-lefts"></div>
      <div class="app-page-rows-rights">
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
</template>
<script>
import { Createline } from "../../utils/flowAnimation.js";
export default {
  data() {
    return {};
  },
  mounted() {
    this.lineDong("line1", 145, 12, "w");
    this.lineDong("line2", 145, 12, "w");
    this.lineDong("line3", 100, 12, "w");
    this.lineDong("line4", 100, 12, "w");
    this.lineDong("line5", 100, 12, "w");
    this.lineDong("line6", 200, 12, "w");
    this.lineDong("line7", 150, 12, "w");
    this.lineDong("line8", 100, 12, "w");
    this.lineDong("line9", 300, 12, "w");
    this.lineDong("line10", 80, 12, "w");
    this.lineDong("line11", 100, 12, "w");
    this.lineDong("line12", 100, 12, "w");
    this.lineDong("line13", 450, 12, "w");
    this.lineDong("line14", 200, 12, "w");
    this.lineDong("line15", 90, 12, "w");
    this.lineDong("line16", 150, 12, "w");
  },
  methods: {
    lineDong(canvas, canvas_w, canvas_h, fx) {
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
      //debugger;
      var res = new Createline(data);
      res.begin(canvas, data);
    }
    //
  }
};
</script>
<style>
.app-page-rows {
  background: #428bf1;
}
.app-page-rows-lefts {
  width: 260px;
  float: left;
}
.app-page-rows-rights {
  margin-left: 260px;
  background: #fff;
  min-height: 500px;
}
.app-page-rows-left {
  width: 160px;
  float: left;
  height: calc(100vh - 100px);
  min-height: 100%;
}
.app-page-rows-right {
  margin-left: 160px;
  background: #fff;
  min-height: 500px;
}
/* left-menu-area */
.left-menu-area {
  float: left;
  background: #428bf1;
  width: 160px;
  height: 100vh;
}
.left-menu-area .el-menu {
  background: none;
  border: none;
  overflow-y: auto;
  max-height: 98%;
}
.left-menu-area .el-menu-item {
  position: relative;
  background: none;
  color: #fff;
  height: 39px;
  line-height: 39px;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 30px;
}
.left-menu-area .el-menu-item span {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.left-menu-area .el-menu-item:hover {
  background: #2377fc;
  color: #fff;
}
.left-menu-area .el-menu-item.active {
  background: #fff;
  color: #4688f1;
}
.left-menu-area .input-so {
  padding: 10px;
}
.left-menu-area .atitle {
  padding: 0 10px;
  margin: 0;
  font-size: 16px;
  color: #fff;
  height: 56px;
  line-height: 56px;
}
.left-menu-area .el-menu-item a {
  display: block;
  text-decoration: none;
  color: #fff;
}
.left-menu-area .el-menu-item.active a {
  text-decoration: none;
  color: #4688f1;
}
.left-menu-area .el-menu-item.active::after {
  content: "";
  position: absolute;
  right: 10px;
  top: 15px;
  width: 0px;
  height: 0px;
  border-width: 5px 0 5px 8px;
  border-style: solid;
  border-color: transparent transparent transparent #428bf1;
}

.left-menu-chlid {
  float: left;
  background: #fff;
  width: 100px;
  height: calc(100vh - 100px);
}
.left-menu-chlid .el-menu {
  background: none;
  border: none;
}
.left-menu-chlid .el-menu-item {
  position: relative;
  background: none;
  color: #333;
  padding-right: 10px !important;
  padding-left: 10px !important;
  height: 39px;
  line-height: 39px;
  white-space: nowrap;
  overflow: hidden;
}
.left-menu-chlid .el-menu-item span {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.left-menu-chlid .el-menu-item:hover {
  background: #9aaeca;
  color: #fff;
}
.left-menu-chlid .el-menu-item.active {
  background: #fff;
  color: #9aaeca;
}
.left-menu-chlid .el-menu-item a {
  display: block;
  text-decoration: none;
  color: #fff;
}
.left-menu-chlid .el-menu-item.active a {
  text-decoration: none;
  color: #9aaeca;
}
.left-menu-chlid .el-menu-item.active::after {
  content: "";
  position: absolute;
  right: 10px;
  top: 15px;
  width: 0px;
  height: 0px;
  border-width: 5px 0 5px 8px;
  border-style: solid;
  border-color: transparent transparent transparent #428bf1;
}
.left-menu-chlid .el-menu-title {
  font-weight: 700;
  background: #428bf1;
  height: 56px;
  line-height: 56px;
  color: #fff;
}
/*print*/

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