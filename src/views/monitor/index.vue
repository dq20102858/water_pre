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
        <div class="group-canvas">
          <div id="scrollbar">
            <canvas id="mycanvas" height="680" ref="mycanvas">
              <p>您的系统不支持此程序!</p>
            </canvas>
          </div>
        </div>
      </div>
      <div class="check-list">
        <span class="namess">显示图形：</span>
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
        <el-checkbox
          class="speedchk"
          v-model="speedCheckValue"
          @change="speedCheckSelect"
          label="限速区"
        ></el-checkbox>
        <el-checkbox
          class="alertchk"
          v-model="alertCheckValue"
          @change="alertCheckSelect"
          label="防区"
        ></el-checkbox>
        <!-- <el-checkbox v-model="checked5" label="道岔" border></el-checkbox> -->
        <el-checkbox
          class="slopechk"
          v-model="slopeCheckValue"
          @change="slopeCheckSelect"
          label="坡度"
        ></el-checkbox>
        <el-checkbox class="daocchk" v-model="daocCheckValue" @change="daocCheckSelect" label="道岔"></el-checkbox>
      </div>
      <div class="progresslist" v-if="this.progressCheckValue !=''">
        <span class="namess">施工进度：</span>
        <el-radio-group v-model="progressCheckValue" @change="progressCheckSelect">
          <el-radio v-for="item in progressList" :key="item.name" :label="item.name">{{item.name}}</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
let canvas;
let context;
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
let scrollGapX = 0;
let scrollStartx = 0;
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
      scrollwidthTwo: 900,
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
  updated() {
    this.initCanvas();
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
          this.scrollwidthTwo =
            (this.leftLineMaxMileage - this.leftLineMinMileage) * everys + 150;
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
          if (data.data.project.length > 0) {
            this.progressList = data.data.project;
            this.progressCheckValue = data.data.project[0]["name"];
            this.progressListItem = data.data.project[0].list;
          }
        }
      });
    },

    initCanvas() {
      const that = this;
      //坐标轴宽度高度
      //  let axis_Width = this.totalMileage / 2 + 1000;

      let minkm = this.minKM; //最小的公里数
      let minkmLength = this.minKMLength; //最小米数
      let leftLineMinMileage = this.leftLineMinMileage;
      let leftLineMaxMileage = this.leftLineMaxMileage;
      let enterLineMinMileage = this.enterLineMinMileage;
      let enterLineMaxMileage = this.enterLineMaxMileage;
      let outLineMinMileage = this.outLineMinMileage;
      let outLineMaxMileage = this.leftLineMaxMileage;
      let axis_Width = (leftLineMaxMileage - leftLineMinMileage) * everys + 150;
      console.log(
        "axis_Width：" +
          axis_Width +
          "_" +
          leftLineMinMileage +
          "_" +
          leftLineMaxMileage
      );
      //初始化
      canvas = this.$refs.mycanvas;
      canvas.width = axis_Width;
      context = canvas.getContext("2d");
      let lineJson = this.lineTypeList;
      for (let i = 0; i < lineJson.length; i++) {
        context.font = "12px Microsoft Yahei";
        context.fillStyle = "#E8C640";
        context.lineWidth = 10;
        context.strokeStyle = "#fff";
        context.beginPath();
        let start = parseInt(lineJson[i].start_flag) * 1000;
        let startLength = parseInt(lineJson[i].start_length);
        let end = parseInt(lineJson[i].end_flag) * 1000;
        let endLength = parseInt(lineJson[i].end_length);
        axis_Width =
          (parseInt(end + endLength) - parseInt(start + startLength)) * everys;
        if (lineJson[i].id == 1) {
          drawAxisTicksNum(
            start,
            startLength,
            end,
            endLength,
            axis_Width,
            axis_LeftLine.x,
            axis_LeftLine.y,
            "ZDK"
          );
          context.font = "15px Microsoft Yahei";
          context.fillText("左线", axis_LeftLine.x - 60, axis_LeftLine.y + 25);
        } else if (lineJson[i].id == 2) {
          drawAxisTicksNum(
            start,
            startLength,
            end,
            endLength,
            axis_Width,
            axis_LeftLine_Two.x,
            axis_LeftLine_Two.y,
            "YDK"
          );
          context.font = "15px Microsoft Yahei";
          context.fillText(
            "右线",
            axis_LeftLine_Two.x - 60,
            axis_LeftLine_Two.y + 25
          );
        } else if (lineJson[i].id == 3) {
          drawAxisTicksNum(
            start,
            startLength,
            end,
            endLength,
            axis_Width,
            axis_OutLine.x,
            axis_OutLine.y,
            "RDK"
          );
          context.font = "15px Microsoft Yahei";
          context.fillText("入场线", axis_OutLine.x - 68, axis_OutLine.y + 25);
        } else if (lineJson[i].id == 4) {
          drawAxisTicksNum(
            start,
            startLength,
            end,
            endLength,
            axis_Width,
            axis_OutLine_Two.x,
            axis_OutLine_Two.y,
            "CDK"
          );
          context.font = "15px Microsoft Yahei";
          context.fillText(
            "出场线",
            axis_OutLine_Two.x - 68,
            axis_OutLine_Two.y + 25
          );
        }
      }
      function drawAxisTicksNum(
        start,
        startLen,
        end,
        endLen,
        axis_Width,
        axis_Line_X,
        axis_Line_y,
        axis_DK
      ) {
        //查找起始坐标
        let first = darpNum(startLen);
        let last = darpNum(endLen);
        let lastMileage = end + endLen;
        //
        context.beginPath();
        context.font = "12px Microsoft Yahei";
        context.lineWidth = 10;
        context.strokeStyle = "#ffffff";
        context.moveTo(axis_Line_X, axis_Line_y);
        context.lineTo(axis_Width + axis_Line_X + 1, axis_Line_y);
        context.stroke();
        //
        context.beginPath();
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "top";
        context.lineWidth = 2;
        context.strokeStyle = "white";
        let num_Ticks = axis_Width;
        //起点
        let startTicksNum = axis_DK + start / 1000 + " + " + startLen;
        context.fillText(startTicksNum, axis_Line_X, axis_Line_y + 30);
        context.moveTo(offsetX + 1, axis_Line_y + 5);
        context.lineTo(offsetX + 1, axis_Line_y + 20);
        //
        //终点
        let endTicksNum = axis_DK + end / 1000 + " + " + endLen;
        //alert(endTicksNum);
        context.fillText(
          endTicksNum,
          axis_Width + axis_Line_X, //guohonglin add
          axis_Line_y + 30
        );
        context.moveTo(
          axis_Width + axis_Line_X, //guohonglin add
          axis_Line_y + 5
        );
        context.lineTo(
          axis_Width + axis_Line_X, //guohonglin add
          axis_Line_y + 20
        );
        context.stroke();

        //中间

        axis_Line_X = (parseInt(first) - parseInt(startLen)) * everys;
        let num = 0;
        let minKm = start / 1000;
        for (let i = 1; i <= axis_Width; i++) {
          let nums = parseInt(first) + parseInt(200 * num);
          var endFlagNum = parseInt(minKm * 1000) + parseInt(nums);
          if (endFlagNum < lastMileage) {
            if (nums == 1000) {
              minKm++;
              //画数字
              context.fillText(
                axis_DK + minKm + " + 000",
                axis_Line_X + i * tick_Spacing,
                axis_Line_y + 20
              );
              num = 0;
              first = 200;
              //画小标
              context.moveTo(axis_Line_X + i * tick_Spacing, axis_Line_y + 5);
              context.lineTo(axis_Line_X + i * tick_Spacing, axis_Line_y + 15);
              //
            } else {
              num++;
              nums = parseInt(first) + parseInt(200 * (num - 1));
              //画数字

              context.fillText(
                nums,
                axis_Line_X + i * tick_Spacing,
                axis_Line_y + 20
              );
              //画小标
              context.moveTo(axis_Line_X + i * tick_Spacing, axis_Line_y + 5);
              context.lineTo(axis_Line_X + i * tick_Spacing, axis_Line_y + 10);
            }
          }
          //
        }
        //结束
        context.stroke();
      }

      function darpNum(startLen) {
        let nums;
        let startLens = parseInt(startLen);
        if (startLens >= 0 && startLens < 200) {
          nums = 200;
        } else if (startLens >= 200 && startLens < 400) {
          nums = 400;
        } else if (startLens >= 400 && startLens < 600) {
          nums = 600;
        } else if (startLens >= 600 && startLens < 800) {
          nums = 800;
        } else if (startLens >= 800 && startLens <= 1000) {
          nums = 1000;
        }
        return nums;
      }
      //绘制地铁站
      function drawStations(stationListJson) {
        let json = stationListJson;
        let img = new Image();
        img.src = require("@/assets/image/sta.png");
        img.onload = function() {
          let start = 0;
          for (let i = 0; i < json.length; i++) {
            // 绘制站点图
            let total =
              parseInt(json[i].start_flag) * 1000 +
              parseInt(json[i].start_length);
            //console.log("total：" + total);
            // 计算当前站点的x轴坐标
            let startX = (total - leftLineMinMileage) * everys;
            // console.log(startX);
            context.drawImage(img, startX + offsetXLine + 1, 65, 24, 120);
            //站名
            context.font = "bold 20px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.textAlign = "left";
            let origin = json[i].name;
            let lens = json[i].name.length;
            context.fillText(origin, startX + 90, 25);
            //DK
            let codes = "DK" + json[i].start_flag + " +" + json[i].start_length;
            context.fillStyle = "#0AE39A";
            context.font = "14px Microsoft Yahei";
            context.fillText(codes, startX + 90, 52);
          }
        };
      }
      //绘制道岔
      function drawDaocha() {
        // let json1 = ListJson;
        let json = [
          {
            id: 1,
            type: 1,
            start_flag: 15,
            start_length: 400,
            end_flag: 15,
            end_length: 900
          },
          {
            id: 1,
            type: 1,
            start_flag: 31,
            start_length: 400,
            end_flag: 32,
            end_length: 200
          }
        ];
        let img = new Image();
        img.src = require("@/assets/image/icon-dc.png");
        img.onload = function() {
          let start = 0;
          for (let i = 0; i < json.length; i++) {
            let start =
              parseInt(json[i].start_flag) * 1000 +
              parseInt(json[i].start_length);
            let end =
              parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);
            let betweenMeters = (end - start) * everys; //两点之间距离米
            let startX = (start - leftLineMinMileage) * everys;
            context.drawImage(
              img,
              startX + offsetXLine + 13,
              axis_LeftLine.y + 5,
              betweenMeters + 20,
              196
            );
          }
        };
      }
      //绘制桥
      function drawBridgeAxis(bridgeListJson) {
        let json = bridgeListJson;
        for (let i = 0; i < json.length; i++) {
          let start =
            parseInt(json[i].start_flag) * 1000 +
            parseInt(json[i].start_length);
          let end =
            parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);
          let betweenMeters = end - start; //两点之间距离米
          let startX = (start - leftLineMinMileage) * everys; //开始值
          let endX = (end - leftLineMinMileage) * everys; //结束值
          let centerX = (endX + startX) / 2; //开始结束平均值

          context.lineWidth = 2;
          context.fillStyle = "#CDAA7D";
          context.font = "12px Microsoft Yahei";
          context.strokeStyle = "#CDAA7D";
          let desc = json[i].name + " 共" + betweenMeters + "米";
          let codes =
            "DK" +
            json[i].start_flag +
            " +" +
            json[i].start_length +
            " ~ " +
            "DK" +
            json[i].end_flag +
            " +" +
            json[i].end_length;
          context.beginPath();
          if (json[i].line_type == 1) {
            //画垂直线
            context.fillRect(
              startX + offsetX - 1,
              axis_LeftLine.y - 101,
              2,
              96
            );
            context.fillRect(endX + offsetX - 1, axis_LeftLine.y - 101, 2, 96);
            context.moveTo(startX + offsetX, axis_LeftLine.y - 100);
            context.lineTo(endX + offsetX, axis_LeftLine.y - 100);
            // context.strokeRect(
            //   startX + offsetX,
            //   axis_LeftLine.y - 100,
            //   betweenMeters * everys,
            //   1
            // );
            //文字
            context.fillText(desc, centerX + offsetX, axis_LeftLine.y - 95);
            context.font = "11px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.fillText(codes, centerX + offsetX, axis_LeftLine.y - 80);
          } else if (json[i].line_type == 2) {
            //画垂直线
            context.fillRect(
              startX + offsetX - 1,
              axis_LeftLine_Two.y - 101,
              2,
              96
            );
            context.fillRect(
              endX + offsetX - 1,
              axis_LeftLine_Two.y - 101,
              2,
              96
            );
            context.moveTo(startX + offsetX, axis_LeftLine_Two.y - 100);
            context.lineTo(endX + offsetX, axis_LeftLine_Two.y - 100);
            //文字
            context.fillText(desc, centerX + offsetX, axis_LeftLine_Two.y - 95);
            context.font = "11px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.fillText(
              codes,
              centerX + offsetX,
              axis_LeftLine_Two.y - 80
            );
          }
          context.stroke();
        }
      }
      //绘隧道
      function drawTunnelAxis(tunnelListJson) {
        let json = tunnelListJson;
        for (let i = 0; i < json.length; i++) {
          let start =
            parseInt(json[i].start_flag) * 1000 +
            parseInt(json[i].start_length);
          let end =
            parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);
          let betweenMeters = end - start; //两点之间距离米
          let startX = (start - leftLineMinMileage) * everys; //开始值
          let endX = (end - leftLineMinMileage) * everys; //结束值
          let centerX = (endX + startX) / 2; //开始结束平均值

          let desc = json[i].name + " 共" + betweenMeters + "米";
          let codes =
            "DK" +
            json[i].start_flag +
            " +" +
            json[i].start_length +
            " ~ " +
            "DK" +
            json[i].end_flag +
            " +" +
            json[i].end_length;

          context.lineWidth = 2;
          context.fillStyle = "#25bfdb";
          context.font = "12px Microsoft Yahei";
          context.strokeStyle = "#25bfdb";
          context.beginPath();
          if (json[i].line_type == 1) {
            //画垂直线  矩形
            context.fillRect(startX + offsetX - 1, axis_LeftLine.y - 38, 2, 33);
            context.fillRect(endX + offsetX - 1, axis_LeftLine.y - 38, 2, 33);
            context.moveTo(startX + offsetX, axis_LeftLine.y - 37);
            context.lineTo(endX + offsetX, axis_LeftLine.y - 37);
            //context.strokeRect(startX + offsetX,axis_LeftLine.y -38,betweenMeters * everys,1);
            //文字
            context.fillText(desc, centerX + offsetX, axis_LeftLine.y - 31);
            context.fillStyle = "#fff";
            context.font = "10px Microsoft Yahei";
            context.fillText(codes, centerX + offsetX, axis_LeftLine.y - 17);
          } else if (json[i].line_type == 2) {
            //画垂直线 画矩形
            context.fillRect(
              startX + offsetX - 1,
              axis_LeftLine_Two.y - 38,
              2,
              33
            );
            context.fillRect(
              endX + offsetX - 1,
              axis_LeftLine_Two.y - 38,
              2,
              33
            );
            context.moveTo(startX + offsetX, axis_LeftLine_Two.y - 37);
            context.lineTo(endX + offsetX, axis_LeftLine_Two.y - 37);
            //context.strokeRect(startX + offsetX,axis_LeftLine_Two.y - 38,betweenMeters * everys,1 );
            //文字
            context.fillText(desc, centerX + offsetX, axis_LeftLine_Two.y - 31);
            context.fillStyle = "#fff";
            context.font = "10px Microsoft Yahei";
            context.fillText(
              codes,
              centerX + offsetX,
              axis_LeftLine_Two.y - 17
            );
          }
          context.stroke();
        }
      }
      //绘制限速区
      function drawSpeedAxis(speedListJson) {
        let json = speedListJson;
        for (let i = 0; i < json.length; i++) {
          let start =
            parseInt(json[i].start_flag) * 1000 +
            parseInt(json[i].start_length);
          let end =
            parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);
          context.strokeStyle = "#ff9900";
          context.lineWidth = 10;
          context.fillStyle = "#ff9900";
          context.font = "12px Microsoft Yahei";
          let desc = "限速" + json[i].speed + "公里/小时";
          context.beginPath();
          //画水平直线
          if (json[i].line_type == 1) {
            let startX = (start - leftLineMinMileage) * everys;
            let endX = (end - leftLineMinMileage) * everys;
            let centerX = (endX + startX) / 2; //开始结束平均值
            context.fillRect(centerX + offsetX, axis_LeftLine.y, 2, 30);
            context.moveTo(startX + offsetX, axis_LeftLine.y);
            context.lineTo(endX + offsetX, axis_LeftLine.y);
            context.fillText(desc, centerX + offsetX, axis_LeftLine.y + 35);
          } else if (json[i].line_type == 2) {
            let startX = (start - leftLineMinMileage) * everys;
            let endX = (end - leftLineMinMileage) * everys;
            let centerX = (endX + startX) / 2;

            if (start == 0) {
              startX = 0;
              endX = end * everys;
            }
            context.fillRect(centerX + offsetX, axis_LeftLine_Two.y, 2, 30);
            context.moveTo(startX + offsetX, axis_LeftLine_Two.y);
            context.lineTo(endX + offsetX, axis_LeftLine_Two.y);
            context.fillText(desc, centerX + offsetX, axis_LeftLine_Two.y + 35);
          } else if (json[i].line_type == 3) {
            let startX = (start - enterLineMinMileage) * everys;
            let endX = (end - enterLineMinMileage) * everys;
            let centerX = (endX + startX) / 2;
            if (start == 0) {
              startX = 0;
              endX = end * everys;
            }
            context.fillRect(centerX + offsetX, axis_OutLine.y, 2, 30);
            context.moveTo(startX + offsetX, axis_OutLine.y);
            context.lineTo(endX + offsetX, axis_OutLine.y);
            context.fillText(desc, centerX + offsetX, axis_OutLine.y + 35);
          } else if (json[i].line_type == 4) {
            let startX = (start - outLineMinMileage) * everys;
            let endX = (end - outLineMinMileage) * everys;
            let centerX = (endX + startX) / 2;
            if (start == 0) {
              startX = 0;
              endX = end * everys;
            }
            context.fillRect(centerX + offsetX, axis_OutLine_Two.y, 2, 30);
            context.moveTo(startX + offsetX, axis_OutLine_Two.y);
            context.lineTo(endX + offsetX, axis_OutLine_Two.y);
            context.fillText(desc, centerX + offsetX, axis_OutLine_Two.y + 35);
          }
          context.stroke();
        }
      }
      //绘制防区
      function drawAlertAxis(alertListJson) {
        let json = alertListJson;
        for (let i = 0; i < json.length; i++) {
          let start =
            parseInt(json[i].start_flag) * 1000 +
            parseInt(json[i].start_length);
          let end =
            parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);
          context.strokeStyle = "#df4b4b";
          context.lineWidth = 10;
          context.fillStyle = "#df4b4b";
          context.font = "12px Microsoft Yahei";
          let desc =
            "防区 DK" +
            json[i].start_flag +
            "+" +
            json[i].start_length +
            "- DK" +
            json[i].end_flag +
            "+" +
            json[i].end_length;
          context.beginPath();
          if (json[i].line_type == 1) {
            let startX = (start - leftLineMinMileage) * everys;
            let endX = (end - leftLineMinMileage) * everys;
            let centerX = (endX + startX) / 2; //开始结束平均值
            context.fillRect(centerX + offsetX, axis_LeftLine.y, 2, 30);
            context.moveTo(startX + offsetX, axis_LeftLine.y);
            context.lineTo(endX + offsetX, axis_LeftLine.y);
            context.fillText(desc, centerX + 100, axis_LeftLine.y + 35);
          } else if (json[i].line_type == 2) {
            let startX = (start - leftLineMinMileage) * everys;
            let endX = (end - leftLineMinMileage) * everys;
            let centerX = (endX + startX) / 2;
            context.fillRect(centerX + offsetX, axis_LeftLine_Two.y, 2, 30);
            context.moveTo(startX + offsetX, axis_LeftLine_Two.y);
            context.lineTo(endX + offsetX, axis_LeftLine_Two.y);
            context.fillText(desc, centerX + 100, axis_LeftLine_Two.y + 35);
          } else if (json[i].line_type == 3) {
            let startX = (start - enterLineMinMileage) * everys;
            let endX = (end - enterLineMinMileage) * everys;
            let centerX = (endX + startX) / 2; //开始结束平均值
            if (start == 0) {
              startX = 0;
              endX = end * everys;
            }
            context.fillRect(centerX + offsetX, axis_OutLine.y, 2, 30);
            context.moveTo(startX + offsetX, axis_OutLine.y);
            context.lineTo(endX + offsetX, axis_OutLine.y);
            context.fillText(desc, centerX + 100, axis_OutLine.y + 35);
          } else if (json[i].line_type == 4) {
            let startX = (start - outLineMinMileage) * everys;
            let endX = (end - outLineMinMileage) * everys;
            let centerX = (endX + startX) / 2; //开始结束平均值
            if (start == 0) {
              startX = 0;
              endX = end * everys;
            }
            context.fillRect(centerX + offsetX, axis_OutLine_Two.y, 2, 30);
            context.moveTo(startX + offsetX, axis_OutLine_Two.y);
            context.lineTo(endX + offsetX, axis_OutLine_Two.y);
            context.fillText(desc, centerX + 100, axis_OutLine_Two.y + 35);
          }
          context.stroke();
          //
        }
      }
      //绘制坡度
      function drawSlopeAxis(slopeListJson) {
        let json = slopeListJson;
        for (let i = 0; i < json.length; i++) {
          let start =
            parseInt(json[i].start_flag) * 1000 +
            parseInt(json[i].start_length);
          let end =
            parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);
          let betweenMeters = end - start; //两点之间距离米
          let startX = (start - leftLineMinMileage) * everys; //开始值
          let endX = (end - leftLineMinMileage) * everys; //结束值
          let centerX = (endX + startX) / 2; //开始结束平均值

          context.lineWidth = 1;
          context.strokeStyle = "#fff";
          context.fillStyle = "#fff";
          context.font = "12px Microsoft Yahei";
          let slope_height = parseFloat(json[i].height);
          let slope_length = parseFloat(json[i].length);
          let slope_center = (betweenMeters * everys) / 2;
          context.beginPath();
          //type  1 2 3 代表上坡 平坡 下坡
          if (json[i].line_type == 1) {
            //对角线
            if (json[i].type == 1) {
              context.moveTo(startX + offsetX, axis_LeftLine.y + 100); //起点
              context.lineTo(
                startX + offsetX + betweenMeters * everys,
                axis_LeftLine.y + 50
              ); //终点
              context.stroke();
              context.fillText(
                slope_height,
                startX + offsetX + slope_center - 20,
                axis_LeftLine.y + 60
              );
              context.fillText(
                slope_length,
                startX + offsetX + slope_center + 20,
                axis_LeftLine.y + 80
              );
            }
            if (json[i].type == 2) {
              context.moveTo(startX + offsetX, axis_LeftLine.y + 50 + 25); //起点
              context.lineTo(
                startX + offsetX + betweenMeters * everys,
                axis_LeftLine.y + 50 + 25
              ); //终点
              context.stroke();
              context.fillText(
                slope_height,
                startX + offsetX + slope_center,
                axis_LeftLine.y + 60
              );
              context.fillText(
                slope_length,
                startX + offsetX + slope_center,
                axis_LeftLine.y + 80
              );
            }
            if (json[i].type == 3) {
              context.moveTo(startX + offsetX, axis_LeftLine.y + 50); //起点
              context.lineTo(
                startX + offsetX + betweenMeters * everys,
                axis_LeftLine.y + 100
              ); //终点
              context.stroke();
              context.fillText(
                slope_height,
                startX + offsetX + slope_center + 20,
                axis_LeftLine.y + 60
              );
              context.fillText(
                slope_length,
                startX + offsetX + slope_center - 20,
                axis_LeftLine.y + 80
              );
            }
            //画矩形
            context.strokeRect(
              startX + offsetX,
              axis_LeftLine.y + 50,
              betweenMeters * everys,
              50
            );
          } else if (json[i].line_type == 2) {
            //对角线
            if (json[i].type == 1) {
              context.moveTo(startX + offsetX, axis_LeftLine_Two.y + 100); //起点
              context.lineTo(
                startX + offsetX + betweenMeters * everys,
                axis_LeftLine_Two.y + 50
              ); //终点
              context.stroke();
              context.fillText(
                slope_height,
                startX + offsetX + slope_center - 20,
                axis_LeftLine_Two.y + 60
              );
              context.fillText(
                slope_length,
                startX + offsetX + slope_center + 20,
                axis_LeftLine_Two.y + 80
              );
            }
            if (json[i].type == 2) {
              context.moveTo(startX + offsetX, axis_LeftLine_Two.y + 50 + 25); //起点
              context.lineTo(
                startX + offsetX + betweenMeters * everys,
                axis_LeftLine_Two.y + 50 + 25
              ); //终点
              context.stroke();
              context.fillText(
                slope_height,
                startX + offsetX + slope_center,
                axis_LeftLine_Two.y + 60
              );
              context.fillText(
                slope_length,
                startX + offsetX + slope_center,
                axis_LeftLine_Two.y + 80
              );
            }
            if (json[i].type == 3) {
              context.moveTo(startX + offsetX, axis_LeftLine_Two.y + 50); //起点
              context.lineTo(
                startX + offsetX + betweenMeters * everys,
                axis_LeftLine_Two.y + 100
              ); //终点
              context.stroke();
              context.fillText(
                slope_height,
                startX + offsetX + slope_center + 20,
                axis_LeftLine_Two.y + 60
              );
              context.fillText(
                slope_length,
                startX + offsetX + slope_center - 20,
                axis_LeftLine_Two.y + 80
              );
            }
            //画矩形
            context.strokeRect(
              startX + offsetX,
              axis_LeftLine_Two.y + 50,
              betweenMeters * everys,
              50
            );
          }
          context.stroke();
        }
      }
      //绘制施工进度
      function drawProgressAxis(sprogressListJson) {
        let json = sprogressListJson;

        for (let i = 0; i < json.length; i++) {
          let start =
            parseInt(json[i].start_flag) * 1000 +
            parseInt(json[i].start_length);
          let end =
            parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);

          // 计算当前站点的x轴坐标

          //console.log("startX：" + startX + " endX：" + endX);
          context.lineWidth = 10;
          context.strokeStyle = "#27DB07";
          context.beginPath();
          if (json[i].line_type == 1) {
            let startX = (start - leftLineMinMileage) * everys;
            let endX = (end - leftLineMinMileage) * everys;
            //画水平直线
            context.moveTo(startX + offsetX, axis_LeftLine.y);
            context.lineTo(endX + offsetX, axis_LeftLine.y);
          } else if (json[i].line_type == 2) {
            let startX = (start - leftLineMinMileage) * everys;
            let endX = (end - leftLineMinMileage) * everys;
            //画水平直线
            context.moveTo(startX + offsetX, axis_LeftLine_Two.y);
            context.lineTo(endX + offsetX, axis_LeftLine_Two.y);
          } else if (json[i].line_type == 3) {
            let startX = (start - enterLineMinMileage) * everys;
            let endX = (end - enterLineMinMileage) * everys;
            if (start == 0) {
              startX = 0;
              endX = end * everys;
            }
            context.moveTo(startX + offsetX, axis_OutLine.y);
            context.lineTo(endX + offsetX, axis_OutLine.y);
          } else if (json[i].line_type == 4) {
            let startX = (start - outLineMinMileage) * everys;
            let endX = (end - outLineMinMileage) * everys;
            if (start == 0) {
              startX = 0;
              endX = end * everys;
            }
            context.moveTo(startX + offsetX, axis_OutLine_Two.y);
            context.lineTo(endX + offsetX, axis_OutLine_Two.y);
          }
          context.stroke();
          //
        }
      }
      //绘制请点
      function drawAxesApply(applyListJson) {
        let json = applyListJson;
        let json1 = [
          {
            line_type: 1,
            number: "A4-2-007-1",
            command_num: "(2020)\u5b57\u7b2c04.21-007-2",
            description: "\u98ce\u98ce\u5149\u5149",
            work_area: "DK14+130\u81f3DK42+410",
            start_time: "2020-04-28 00:00:00",
            end_time: "2020-04-28 23:59:59",
            start_flag: "14",
            start_length: "600",
            end_flag: "16",
            end_length: "410",
            type: "A4",
            start_total: 14600,
            end_total: 16410
          },
          {
            line_type: 2,
            number: "A4-2-007-1",
            command_num: "(2020)\u5b57\u7b2c04.21-007-2",
            description: "\u98ce\u98ce\u5149\u5149",
            work_area: "DK14+130\u81f3DK42+410",
            start_time: "2020-04-28 00:00:00",
            end_time: "2020-04-28 23:59:59",
            start_flag: "14",
            start_length: "600",
            end_flag: "16",
            end_length: "410",
            type: "A4",
            start_total: 14600,
            end_total: 16410
          }
        ];
        console.log("applyListJson" + applyListJson);
        let clickXY = [];
        for (let i = 0; i < json.length; i++) {
          let start =
            parseInt(json[i].start_flag) * 1000 +
            parseInt(json[i].start_length);
          let end =
            parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);
          //console.log("start：" + start + " end：" + end);
          // 计算当前站点的x轴坐标
          //let startX = (start - parseInt(minkm * 1000)) * everys; //开始值
          // let endX = (end - parseInt(minkm * 1000)) * everys; //结束值

          let desc = json[i].type;
          let dksatrt = "DK" + json[i].start_flag + " +" + json[i].start_length;
          let dkend = "DK" + json[i].end_flag + " +" + json[i].end_length;

          context.lineWidth = 2;
          context.fillStyle = "#ffff00";
          context.strokeStyle = "#ffff00";
          context.beginPath();

          if (json[i].line_type == 1) {
            let startX = (start - leftLineMinMileage) * everys;
            let endX = (end - leftLineMinMileage) * everys;
            let centerX = (endX + startX) / 2; //开始结束平均值
            //画水平直线
            context.fillRect(startX + offsetX - 1, axis_applay.y - 8, 2, 15);
            context.fillRect(endX + offsetX - 1, axis_applay.y - 8, 2, 15);
            context.moveTo(startX + offsetX, axis_applay.y);
            context.lineTo(endX + offsetX, axis_applay.y);
            //文字
            context.font = "24px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_applay.y - 25);
            clickXY.push({
              x: centerX + offsetX,
              y: axis_applay.y - 25,
              r: 50,
              i: json[i]
            });
            context.fillStyle = "#ffff00";
            context.font = "12px Microsoft Yahei";
            context.fillText(dksatrt, startX + 139, axis_applay.y - 15);
            context.fillText(dkend, endX + 60, axis_applay.y - 15);
          } else if (json[i].line_type == 2) {
            let startX = (start - leftLineMinMileage) * everys;
            let endX = (end - leftLineMinMileage) * everys;
            let centerX = (endX + startX) / 2; //开始结束平均值
            context.fillRect(
              startX + offsetX - 1,
              axis_applay_two.y - 93,
              2,
              15
            );
            context.fillRect(endX + offsetX - 1, axis_applay_two.y - 93, 2, 15);
            context.moveTo(startX + offsetX, axis_applay_two.y - 85);
            context.lineTo(endX + offsetX, axis_applay_two.y - 85);
            //文字
            context.fillStyle = "#ffff00";
            context.font = "24px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_applay.y + 180);
            clickXY.push({
              x: centerX + offsetX,
              y: axis_applay_two.y + 180,
              r: 50,
              i: json[i]
            });
            context.fillStyle = "#ffff00";
            context.font = "12px Microsoft Yahei";
            context.fillText(dksatrt, startX + 139, axis_applay_two.y - 99);
            context.fillText(dkend, endX + 60, axis_applay_two.y - 99);
          }
          context.stroke();

          //
        }
        //clickXYList=clickXY;
        // canvas.addEventListener("click", function(e) {
        //   var x = event.pageX - canvas.getBoundingClientRect().left;
        //   var y = event.pageY - canvas.getBoundingClientRect().top;
        //   console.log(clickXY);
        //   for (let i of clickXY) {
        //     if (
        //       x > i.x - i.r &&
        //       x < i.x + i.r &&
        //       y > i.y - i.r &&
        //       y < i.y + i.r
        //     ) {
        //       let infos = i.i;
        //       that.$alert(
        //         "<p style='color:#4b6eca'><span style='color:#1d397a'>作业编号：</span>" +
        //           infos.number +
        //           "</p><p style='color:#4b6eca'><span style='color:#1d397a'>作业令号</span>：" +
        //           infos.command_num +
        //           "</p>" +
        //           "<p style='color:#4b6eca'><span style='color:#1d397a'>开始时间：</span>" +
        //           infos.start_time +
        //           "</p><p style='color:#4b6eca'><span style='color:#1d397a'>结束时间：</span>" +
        //           infos.end_time +
        //           "</p>" +
        //           "<p style='color:#4b6eca'><span style='color:#1d397a'>施工区间：</span>" +
        //           infos.work_area +
        //           "</p><p style='color:#4b6eca'><span style='color:#1d397a'>施工内容：</span>" +
        //           infos.description +
        //           "</p>",
        //         {
        //           dangerouslyUseHTMLString: true,
        //           confirmButtonText: "关闭"
        //         }
        //       );
        //       // .catch(() => {});
        //     }
        //   }
        // });
      }
      //车定位
      function drawAxesCar(jsonData) {
        let jsonCar = [
          {
            id: 1,
            name: "ZY01",
            start_flag: 15,
            start_length: 300,
            line_type: 1
          },
          {
            id: 1,
            name: "ZY01",
            start_flag: 25,
            start_length: 300,
            line_type: 1
          },
          {
            id: 2,
            name: "ZY02",
            start_flag: 32,
            start_length: 430,
            line_type: 1
          },
          {
            id: 1,
            name: "ZY01",
            start_flag: 17,
            start_length: 300,
            line_type: 2
          },
          {
            id: 1,
            name: "ZY01",
            start_flag: 25,
            start_length: 300,
            line_type: 2
          },
          {
            id: 2,
            name: "ZY02",
            start_flag: 33,
            start_length: 430,
            line_type: 2
          }
        ];

        let imgcar = new Image();
        imgcar.src = require("@/assets/image/icon-car.png");
        imgcar.onload = function() {
          let start = 0;

          for (let i = 0; i < jsonCar.length; i++) {
            context.fillStyle = "#fff";
            context.font = "12px Microsoft Yahei";
            if (jsonCar[i].line_type == 1) {
              let total =
                parseInt(jsonCar[i].start_flag) * 1000 +
                parseInt(jsonCar[i].start_length);
              let startLineX = (total - leftLineMinMileage) * everys;
              context.drawImage(
                imgcar,
                startLineX + offsetX,
                axis_LeftLine.y - 25,
                140,
                20
              );
              //DK
              let codes =
                jsonCar[i].name +
                "[ ZDK" +
                jsonCar[i].start_flag +
                " +" +
                jsonCar[i].start_length +
                " ]";

              context.fillText(
                codes,
                startLineX + offsetX + 18,
                axis_LeftLine.y - 40
              );
            } else if (jsonCar[i].line_type == 2) {
              let total =
                parseInt(jsonCar[i].start_flag) * 1000 +
                parseInt(jsonCar[i].start_length);
              let startLineX = (total - leftLineMinMileage) * everys;
              context.drawImage(
                imgcar,
                startLineX + offsetX,
                axis_LeftLine_Two.y - 25,
                140,
                20
              );
              //DK
              let codes =
                jsonCar[i].name +
                " [ YDK" +
                jsonCar[i].start_flag +
                " +" +
                jsonCar[i].start_length +
                " ]";
              context.fillText(
                codes,
                startLineX + offsetX + 18,
                axis_LeftLine_Two.y - 40
              );
            } //
          }
        };
      }
      //人定位
      function drawAxesPeple(jsonData) {
        let jsonCar = [
          {
            id: 1,
            name: "R",
            start_flag: 16,
            start_length: 300,
            line_type: 1
          },
          {
            id: 1,
            name: "R",
            start_flag: 28,
            start_length: 300,
            line_type: 1
          },
          {
            id: 1,
            name: "R",
            start_flag: 16,
            start_length: 300,
            line_type: 2
          },
          {
            id: 1,
            name: "R",
            start_flag: 20,
            start_length: 300,
            line_type: 2
          }
        ];

        let imgcar = new Image();
        imgcar.src = require("@/assets/image/m_apply.png");
        imgcar.onload = function() {
          let start = 0;
          context.fillStyle = "#fff ";
          context.font = "12px  Microsoft Yahei";
          for (let i = 0; i < jsonCar.length; i++) {
            if (jsonCar[i].line_type == 1) {
              let total =
                parseInt(jsonCar[i].start_flag) * 1000 +
                parseInt(jsonCar[i].start_length);
              let startLineX = (total - leftLineMinMileage) * everys;
              context.drawImage(
                imgcar,
                startLineX + offsetX,
                axis_LeftLine.y - 40,
                36,
                36
              );
              //DK
              let codes =
                " [ ZDK" +
                jsonCar[i].start_flag +
                " +" +
                jsonCar[i].start_length +
                " ]";

              context.fillText(
                codes,
                startLineX + offsetX + 15,
                axis_LeftLine.y - 50
              );
            } else if (jsonCar[i].line_type == 2) {
              let total =
                parseInt(jsonCar[i].start_flag) * 1000 +
                parseInt(jsonCar[i].start_length);
              let startLineX = (total - leftLineMinMileage) * everys;
              context.drawImage(
                imgcar,
                startLineX + offsetX,
                axis_LeftLine_Two.y - 40,
                36,
                36
              );
              //DK
              let codes =
                " [ YDK" +
                jsonCar[i].start_flag +
                " +" +
                jsonCar[i].start_length +
                " ]";
              context.fillText(
                codes,
                startLineX + offsetX + 15,
                axis_LeftLine_Two.y - 50
              );
            } //
          }
        };
      }
      //============================
      //画地铁站
      drawStations(this.stationList);
      //施工进度
      if (this.progressCheckValue) {
        drawProgressAxis(this.progressListItem);
      }
      //限速区
      if (this.speedCheckValue) {
        drawSpeedAxis(this.speedList);
      }
      //防区
      if (this.alertList.length > 0) {
        if (this.alertCheckValue) {
          drawAlertAxis(this.alertList);
        }
      }
      //桥
      if (this.bridgeCheckValue) {
        drawBridgeAxis(this.bridgeList);
      }
      //隧道
      if (this.tunnelCheckValue) {
        drawTunnelAxis(this.tunnelList);
      }
      //坡度
      if (this.slopeCheckValue) {
        drawSlopeAxis(this.slopeList);
      }
      //作业
      if (this.applyList.length > 0) {
        drawAxesApply(this.applyList);
      }
      //道岔
      if (this.daocCheckValue) {
        drawDaocha();
      }
      //定位人和车
      drawAxesPeple(this.applyList);
      drawAxesCar(this.applyList);
    },
    // ===================================桥 隧道 限速区 防区 道岔 坡度 施工进度
    //进度
    progressCheckSelect(val) {
      this.progressList.map(item => {
        if (item.name == val) {
          this.progressListItem = item.list;
        }
      });
      this.initCanvas();
    },
    //桥
    bridgeCheckSelect() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      this.initCanvas();
    },
    //隧道
    tunnelCheckSelect() {
      this.initCanvas();
    },
    //防区
    alertCheckSelect() {
      if (this.alertList.length > 0) {
        this.initCanvas();
      }
    },
    //限速区
    speedCheckSelect() {
      this.initCanvas();
    },
    //坡度
    slopeCheckSelect() {
      this.initCanvas();
    },
    //道岔
    daocCheckSelect() {
      this.initCanvas();
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
    },
    dragScroll: function() {
      let gapX = 0;
      let startx = 0;
      let obj = document.getElementById("scrollbar"); //
      obj.addEventListener("mousedown", function(event) {
        if (event.button == 0) {
          //判断是否点击鼠标左键
          gapX = event.clientX;
          startx = document.querySelector(".group-canvas").scrollLeft; // document.documentElement.scrollLeft; // scroll的初始位置
          console.log(
            "a：" +
              event.clientX +
              "_" +
              document.documentElement.scrollLeft +
              "_" +
              event.screenX
          );
          //movemove事件必须绑定到$(document)上，鼠标移动是在整个屏幕上的 此处的$(document)可以改为obj
          document.addEventListener("mousemove", move);
          document.addEventListener("mouseup", stop);
        }
        return false; //阻止默认事件或冒泡
      });
      function move(event) {
        var left = event.clientX - gapX; // 鼠标移动的相对距离
        document.querySelector(".group-canvas").scrollLeft = startx - left;
        return false; //阻止默认事件或冒泡
      }
      function stop() {
        //解绑定，这一步很必要，前面有解释
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", stop);
      }
    }
    //
  },
  mounted() {
    this.dragScroll();
    window.addEventListener("resize", () => {
      this.scrollwidth = document.documentElement.clientWidth - 640;
    });
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
}
.check-list .namess {
  color: #fff;
  margin-right: 15px;
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
.main-canvas .group-canvas {
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