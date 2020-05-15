<template>
  <div id="progress">
    <div class="progress">
      <div class="starte-top">
        <div class="sleft">
          {{firstStation}}方向
          <i class="line-a"></i>
        </div>
        <div class="scenter">
          <div class="stations">
            <i class="el-icon-arrow-left" @click="stationLeftMove"></i>
            <div class="item" :style="{width:scrollwidth  + 'px'}">
              <ul
                :style="{width: stationList.length * 100 + 'px','margin-left': wdpx * 100 + 'px'}"
              >
                <li
                  @click="scrollPosition(item.start_flag,item.start_length)"
                  v-for="item in stationList"
                  :key="item.id"
                >{{item.name}}</li>
              </ul>
            </div>
            <i class="el-icon-arrow-right" @click="stationRightMove"></i>
          </div>
        </div>
        <div class="sright">
          {{lastStation}}方向
          <i class="line-b"></i>
        </div>
      </div>
      <div class="chkleft">
        <router-link to="/monitor/indexmini" class="rlink">缩小</router-link>
      </div>
      <div class="main-canvas">
        <div class="group-canvas scrollbar">
          <canvas id="mycanvas" height="680" ref="mycanvas">
            <p>您的系统不支持此程序!</p>
          </canvas>
        </div>
      </div>
      <div class="check-list">
        <el-checkbox
          class="bridgechk"
          v-model="bridgeCheckValue"
          @change="bridgeCheckSelect"
          label="桥"
        ></el-checkbox>
        <el-checkbox
          class="tunnelchk"
          v-model="tunnelCheckValue"
          @change="tunnelCheckSelect"
          label="隧道"
        ></el-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
let canvas;
let context;
//坐标轴宽度高度
//  let axis_Width = this.totalMileage / 2 + 1000;
let axis_Height = "680";
//左右线标尺起点
let axis_LeftLine = {
  x: 100,
  y: axis_Height - 490
};
let axis_LeftLine_Two = {
  x: 100,
  y: axis_Height - 285
};
//出入场线
let axis_OutLine = {
  x: 100,
  y: axis_Height - 150
};
let axis_OutLine_Two = {
  x: 100,
  y: axis_Height - 80
};
//请点标尺起点
let axis_applay = {
  x: 100,
  y: axis_Height - 300
};
let axis_applay_two = {
  x: 100,
  y: axis_Height - 245
};
//刻度的间隔
let tick_Spacing = 100;
let tick_Height = 8; //刻度线高度
let everys = 0.5; //每米长度等于px
let offsetX = 100;
let offsetXLine = 88;
export default {
  data() {
    return {
      flag: false,
      startX: 0,
      endX: 0,
      slideStyle: {
        left: 0,
        transition: "none"
      },
      wdpx: 0,
      stationList: [],
      firstStation: "",
      lastStation: "",
      scrollwidth: 900,
      bridgeCheckValue: true,
      bridgeList: [],
      tunnelCheckValue: true,
      tunnelList: [],
      speedCheckValue: true,
      speedList: [],
      alertCheckValue: true,
      alertList: [],
      slopeCheckValue: true,
      slopeList: [],
      daocCheckValue: true,
      daocList: [],
      progressList: [],
      progressListItem: [],
      progressCheckValue: 0,
      applyList: [],
      applyClickXYList: [],
      lineTypeList: [],
      every: 0.5,
      minKM: 0,
      minKMLength: 0,
      leftLineMinMileage: 0,
      leftLineMaxMileage: 0,
      leftLineBetwentMileage: 0,
      enterLineMinMileage: 0,
      enterLineMaxMileage: 0,
      outLineMinMileage: 0,
      outLineMaxMileage: 0
    };
  },
  updated() {},

  mounted() {
    this.initCanvas();
    window.onresize = () => {
      this.initCanvas();
    };
    // window.addEventListener("resize", () => {
    //   this.scrollwidth = document.documentElement.clientWidth - 640;
    // });
  },
  created() {
    this.getProjectProcessMap();
  },
  methods: {
    getProjectProcessMap() {
      this.request({
        url: "/monitor/getMointorDatas",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          //线别
          this.lineTypeList = data.data.line_types;
          let linetypeJson = data.data.line_types;
          for (let i = 0; i < linetypeJson.length; i++) {
            if (linetypeJson[i].id == 1) {
              this.leftLineMinMileage = parseInt(linetypeJson[i].start_total);
              this.leftLineMaxMileage = parseInt(linetypeJson[i].end_total);
              this.minKM = parseInt(linetypeJson[i].start_flag); //最小公里
              this.minKMLength = parseInt(linetypeJson[i].start_length); //最小米数
            } else if (linetypeJson[i].id == 3) {
              this.enterLineMinMileage = parseInt(linetypeJson[i].start_total);
              this.enterLineMaxMileage = parseInt(linetypeJson[i].end_total);
            } else if (linetypeJson[i].id == 4) {
              this.outLineMinMileage = parseInt(linetypeJson[i].start_total);
              this.outLineMaxMileage = parseInt(linetypeJson[i].end_total);
            }
          }
          //======站点
          this.stationList = data.data.stations;
          let json = data.data.stations;
          this.scrollwidth = document.documentElement.clientWidth - 530;
          console.log(this.scrollwidth);
          //请点
          this.applyList = data.data.apply_lists;
          console.log("applyList：" + this.applyList);
          //桥 隧道等
          this.bridgeList = data.data.bridge_lists; //桥
          this.tunnelList = data.data.tunnel_lists; //隧道
          this.speedList = data.data.speed_lists; //限速区
          this.alertList = data.data.alert_lists; //防区
          this.slopeList = data.data.slope_lists; //坡度
          //施工进度
          this.progressList = data.data.project;
          this.progressCheckValue = data.data.project[0]["name"];
          this.progressListItem = data.data.project[0].list;
        }
      });
    },

    initCanvas() {
      console.log("initCanvas");
      const that = this;

      let minkm = this.minKM; //最小的公里数
      let minkmLength = this.minKMLength; //最小米数
      let leftLineMinMileage = this.leftLineMinMileage;
      let leftLineMaxMileage = this.leftLineMaxMileage;
      let enterLineMinMileage = this.enterLineMinMileage;
      let enterLineMaxMileage = this.enterLineMaxMileage;
      let outLineMinMileage = this.outLineMinMileage;
      let outLineMaxMileage = this.leftLineMaxMileage;
      let axis_Width = (leftLineMaxMileage - leftLineMinMileage) * everys + 150;
      //初始化
      canvas = this.$refs.mycanvas;
      canvas.width = axis_Width;
      context = canvas.getContext("2d");
      this.drawSmile();
    },
    // ===================================桥 隧道 限速区 防区 道岔 坡度 施工进度
    drawSmile() {
      context.beginPath();
      context.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
      context.moveTo(110, 75);
      context.arc(75, 75, 35, 0, Math.PI, false); // 口(顺时针)
      context.moveTo(65, 65);
      context.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
      context.moveTo(95, 65);
      context.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
      context.stroke();
    },
    //桥
    bridgeCheckSelect() {
      context.lineWidth = 10;
      context.strokeStyle = "#27DB07";
    context.beginPath();
      context.arc(175, 175, 150, 0, Math.PI * 2, true); // 绘制
      context.moveTo(110, 175);
      context.arc(175, 175, 35, 0, Math.PI, false); // 口(顺时针)
      context.moveTo(165, 165);
      context.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
      context.moveTo(95, 65);
      context.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
      context.stroke();
    },
    tunnelCheckSelect() {
      context.lineWidth = 10;
      context.strokeStyle = "#fff";
      context.beginPath();
      context.moveTo(100, 200); //设置起点状态
      context.lineTo(300, 300); //设置末端状态
      context.stroke(); //进行绘制
    },
    //top
    stationLeftMove() {
      if (this.wdpx < 0) {
        this.wdpx += 1;
      }
    },
    stationRightMove() {
      if (this.wdpx > -(this.stationList.length + this.wdpx)) {
        this.wdpx -= 1;
      }
    },
    scrollPosition(start_flag, start_length) {
      let total = start_flag;
      let startX = (total - this.minKM) * 1000 * 0.5;
      document.querySelector(".group-canvas").scrollLeft = startX;
    }
  }
};
</script>

<style>
#progress {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #081c33;
}
.progress {
  background: #081c33;
}

/*starte-top*/
.starte-top {
  padding-top: 30px;
  overflow: hidden;
  margin: 0 30px;
}
.starte-top .sleft,
.starte-top .sright {
  background: #4b6eca;
  color: #fff;
  padding: 10px 15px 15px 15px;
  display: block;
  font-size: 16px;
  font-weight: 700;
}
.starte-top .sleft {
  float: left;
  margin-right: 20px;
}

.starte-top .sright {
  float: right;
}
.starte-top .line-a {
  position: relative;
  background: #fff;
  height: 1px;
  display: block;
  margin-top: 6px;
}
.starte-top .line-a::before {
  content: "";
  position: absolute;
  left: 0;
  top: 2px;
  width: 10px;
  height: 3px;
  border-bottom: 1px solid #fff;
  transform: rotateZ(45deg);
}
.starte-top .line-b {
  position: relative;
  background: #fff;
  height: 1px;
  display: block;
  margin-top: 6px;
}
.starte-top .line-b::before {
  content: "";
  position: absolute;
  right: -1px;
  top: 4px;
  width: 10px;
  height: 3px;
  border-bottom: 1px solid #fff;
  transform: rotateZ(135deg);
}
.starte-top .stations {
  float: left;
}
.starte-top .stations .item {
  width: 500px;
  overflow: hidden;
  display: inline-block;
  white-space: nowrap;
}
.starte-top .stations ul li {
  display: inline-block;
  background: #4b6eca;
  color: #fff;
  padding: 17px 15px;
  margin-left: 10px;
  cursor: pointer;
}
.starte-top .stations ul li:hover {
  background: #2359e2;
}
.starte-top .stations i {
  display: inline-block;
  background: #3062e2;
  color: #fff;
  padding: 15px 15px;
  font-size: 20px;
  vertical-align: top;
  cursor: pointer;
}
.starte-top .stations i:hover {
  background: #2359e2;
}
/*check-list*/
.check-list {
  margin: 20px 30px 0 30px;
  text-align: center;
}
.chkleft {
  margin: 10px 30px 0 30px;
}
.chkleft .rlink {
  color: #fff;
  margin-right: 20px;
  font-size: 15px;
}
.chkright {
  float: right;
}
.check-list .el-checkbox__label {
  color: #fff;
  font-size: 15px;
}
.bridgechk.is-checked {
  border-color: #cdaa7d !important;
}
.bridgechk .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #cdaa7d;
  border-color: #cdaa7d;
}
.bridgechk.is-checked .el-checkbox__label {
  color: #cdaa7d;
}
.tunnelchk.is-checked {
  border-color: #25bfdb !important;
}
.tunnelchk .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #25bfdb;
  border-color: #25bfdb;
}
.tunnelchk.is-checked .el-checkbox__label {
  color: #25bfdb;
}
.speedchk.is-checked {
  border-color: #ff9900 !important;
}
.speedchk .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #ff9900;
  border-color: #ff9900;
}
.speedchk.is-checked .el-checkbox__label {
  color: #ff9900;
}
.slopechk.is-checked {
  border-color: #6e7b8b !important;
}
.slopechk .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #6e7b8b;
  border-color: #6e7b8b;
}
.slopechk.is-checked .el-checkbox__label {
  color: #6e7b8b;
}
.alertchk.is-checked {
  border-color: #df4b4b !important;
}
.alertchk .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #df4b4b;
  border-color: #df4b4b;
}
.alertchk.is-checked .el-checkbox__label {
  color: #df4b4b;
}
.daocchk.is-checked {
  border-color: #107af7 !important;
}
.daocchk .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #107af7;
  border-color: #107af7;
}
.daocchk.is-checked .el-checkbox__label {
  color: #107af7;
}
/*canvas*/
.main-canvas {
  background: #081c33;
  margin: 0 10px;
}
.group-canvas {
  overflow-x: scroll;
  overflow-y: hidden;
  height: 680px;
  padding-right: 20px;
}

.progresslist {
  padding-top: 20px;
  padding-left: 30px;
  color: #fff;
}
.progresslist .namess {
  padding-bottom: 10px;
  display: inline-block;
}
.progresslist .el-radio__label {
  color: #fff;
}
.suofang {
  padding: 30px 0 10px 30px;
}
.suofang a {
  color: #fff;
  margin-right: 10px;
  font-size: 18px;
}
</style>