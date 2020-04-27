<template>
  <div id="progress">
    <div class="progress">
      <div class="station-top">
        <div class="startend">
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
      </div>
      <div class="main-canvas">
        <div class="group-canvas scrollbar">
          <canvas id="mycanvas" height="680" ref="mycanvas">
            <p>您的系统不支持此程序!</p>
          </canvas>
        </div>
      </div>
      <div class="progresslist" v-if="this.progressCheckValue !=''">
        <span class="namess">施工进度：</span>
        <el-radio-group v-model="progressCheckValue" @change="progressCheckSelect">
          <el-radio v-for="item in progressList" :key="item.name" :label="item.name">{{item.name}}</el-radio>
        </el-radio-group>
      </div>
      <div class="stations-select">
        <el-checkbox
          class="bridgechk"
          v-model="bridgeCheckValue"
          @change="bridgeCheckSelect"
          label="桥"
          border
        ></el-checkbox>
        <el-checkbox
          class="tunnelchk"
          v-model="tunnelCheckValue"
          @change="tunnelCheckSelect"
          label="隧道"
          border
        ></el-checkbox>
        <el-checkbox
          class="speedchk"
          v-model="speedCheckValue"
          @change="speedCheckSelect"
          label="限速区"
          border
        ></el-checkbox>
        <el-checkbox
          class="alertchk"
          v-model="alertCheckValue"
          @change="alertCheckSelect"
          label="防区"
          border
        ></el-checkbox>
        <!-- <el-checkbox v-model="checked5" label="道岔" border></el-checkbox> -->
        <el-checkbox
          class="slopechk"
          v-model="slopeCheckValue"
          @change="slopeCheckSelect"
          label="坡度"
          border
        ></el-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
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
      minKM: 0,
      maxKM: 0,
      minMileage: 0,
      totalMileage: 0,
      every: 0.5,
      bridgeCheckValue: false,
      bridgeList: [],
      tunnelCheckValue: false,
      tunnelList: [],
      speedCheckValue: false,
      speedList: [],
      alertCheckValue: false,
      alertList: [],
      slopeCheckValue: false,
      slopeList: [],
      progressList: [],
      progressListItem: [],
      progressCheckValue: 0,
      applyList: [],
      applyClickXYList: [],
      lineTypeList: [],
      lineTypeMinMileage: 0,
      lineTypeMaxMileage: 0,
      lineTypeZuoMinMileage: 0,
      lineTypeZuoMaxMileage: 0
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
          let linetypeJson = data.data.line_types;
          this.lineTypeList = data.data.line_types;
          // for (let i = 0; i < linetypeJson.length; i++) {
          //   if (linetypeJson[i].id == 1) {
          //     this.lineTypeMinMileage =
          //       parseInt(linetypeJson[i].start_flag) * 1000 +
          //       parseInt(linetypeJson[i].start_length);
          //     this.lineTypeMaxMileage =
          //       parseInt(linetypeJson[i].end_flag) * 1000 +
          //       parseInt(linetypeJson[i].end_length);
          //   } else if (linetypeJson[i].id == 3) {
          //     this.lineTypeZuoMinMileage =
          //       parseInt(linetypeJson[i].start_flag) * 1000 +
          //       parseInt(linetypeJson[i].start_length);
          //     this.lineTypeZuoMaxMileage =
          //       parseInt(linetypeJson[i].end_flag) * 1000 +
          //       parseInt(linetypeJson[i].end_length);
          //   }
          // }
          // console.log(
          //   "lineTypeZuoMinMileage" +
          //     this.lineTypeZuoMinMileage +
          //     "_" +
          //     this.lineTypeZuoTotalMileage
          // );

          //======站点
          this.stationList = data.data.stations;
          let json = data.data.stations;
          //找到最大数与最小数公里数
          let first = json[0];
          let end = json[0];
          for (let i = 1; i < json.length; i++) {
            let tmp = json[i];
            if (first.start_flag > tmp.start_flag) first = tmp;
            if (end.start_flag < tmp.start_flag) end = tmp;
          }
          this.scrollwidth = document.documentElement.clientWidth - 640;
          console.log(this.scrollwidth);
          this.firstStation = json[0].name; // 第一个站
          this.lastStation = json[json.length - 1].name; // 最后一个站
          // 总里程
          this.totalMileage =
            (end.start_flag - first.start_flag) * 1000 +
            end.start_length -
            first.start_length;
          this.minMileage = first.start_flag * 1000 + first.start_length; //最小里程
          this.maxKM = end.start_flag + 1; //最大公里
          this.minKM = first.start_flag; //最小公里
          console.log(
            "总里程mileage：" +
              this.totalMileage +
              " 最小里程minMileage：" +
              this.minMileage +
              " minKM：" +
              this.minKM
          );
          this.applyList = data.data.apply_lists; //请点
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
      const that = this;
      //坐标轴宽度高度
      let axis_Width = this.totalMileage / 2 + 1000;
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

      //请点标尺起点
      let axis_applay = {
        x: 100,
        y: axis_Height - 535
      };
      let axis_applay_two = {
        x: 100,
        y: axis_Height - 245
      };
      //刻度的间隔
      let tick_Spacing = 100;
      //出入场线
      let axis_OutLine = {
        x: 100,
        y: axis_Height - 150
      };
      let axis_OutLine_two = {
        x: 100,
        y: axis_Height - 70
      };
      //标记数值
      // let num_Horizontal_Ticks = axis_Width / tick_Spacing;
      //刻度线高度
      let tick_Height = 8;
      let everys = this.every; //每米长度等于px
      let minkm = this.minKM; //最小的公里数
      let maxkm = this.maxKM;
      let minMileages = this.minMileage;
      let offsetX =100; 
      let offsetXLine =92; 
      //初始化
      let canvas = this.$refs.mycanvas;
      canvas.width = axis_Width;
      let context = canvas.getContext("2d");
      context.beginPath();
      let lineJson = this.lineTypeList;
      for (let i = 0; i < lineJson.length; i++) {
        context.font = "12px Microsoft Yahei";
        context.fillStyle = "#E8C640";
        context.lineWidth = 10;
        context.strokeStyle = "#fff";

        let starttotal =
          parseInt(lineJson[i].start_flag) * 1000 +
          parseInt(lineJson[i].start_length);
        let endtotal =
          parseInt(lineJson[i].end_flag) * 1000 +
          parseInt(lineJson[i].end_length);
        let tfrom =
            "DK" + lineJson[i].start_flag + "+" + lineJson[i].start_length,
          tend = "DK" + lineJson[i].end_flag + "+" + lineJson[i].end_length;
        if (lineJson[i].id == 1) {
          let startZB =starttotal* everys;
          console.log("startZB："+startZB);
          let endZB =parseFloat((endtotal - starttotal) * everys) + parseFloat(startZB);
          context.moveTo(offsetX, axis_LeftLine.y);
          context.lineTo(endZB + 1000, axis_LeftLine.y);
          context.stroke();
          drawAxisTicksLine(axis_Width, axis_LeftLine.x, axis_LeftLine.y);
          drawAxisTicksNum(
            minkm,
            axis_Width,
            axis_LeftLine.x,
            axis_LeftLine.y,
            "ZDK"
          );
          context.restore();
          context.fillStyle = "#fff";
          context.font = "18px Microsoft Yahei";
          context.fillText("左线", axis_LeftLine.x - 50, axis_LeftLine.y - 25);
          context.stroke();
        } else if (lineJson[i].id == 2) {
          let startZB =minkm * everys;
          let endZB =
            parseFloat((endtotal - starttotal) * everys) + parseFloat(startZB);
          context.moveTo(startZB+offsetXLine, axis_LeftLine_Two.y);
          context.lineTo(endZB + 1000, axis_LeftLine_Two.y);
          context.stroke();
          drawAxisTicksLine(axis_Width, axis_LeftLine.x, axis_LeftLine_Two.y);
          drawAxisTicksNum(
            minkm,
            axis_Width,
            axis_LeftLine.x,
            axis_LeftLine_Two.y,
            "YDK"
          );
          context.restore();
          context.fillStyle = "#fff";
          context.font = "18px Microsoft Yahei";
          context.fillText(
            "右线",
            axis_LeftLine_Two.x - 50,
            axis_LeftLine_Two.y - 25
          );
          //3
        } else if (lineJson[i].id == 3) {
          // starttotal=14600;
          // endtotal=16000;
          if (starttotal == 0) {
            starttotal = this.minMileage;
          }

          let startZB = (starttotal - minkm * 1000) * everys;
          let endZB =
            parseInt((endtotal - starttotal) * everys) + parseInt(startZB);
          let betweenWidth = (endtotal - starttotal) * everys;
          console.log("startZB:" + startZB + "_" + endZB + "_" + betweenWidth);
          context.moveTo(startZB + offsetX, axis_OutLine.y);
          context.lineTo(endZB + offsetX, axis_OutLine.y);
          context.stroke();
          drawAxisTicksLine(betweenWidth, startZB + offsetX, axis_OutLine.y);
          //drawAxisTicksNum(starttotal/1000,betweenWidth, startZB+offsetX, axis_OutLine.y);
          context.restore();
          //
          context.fillStyle = "#fff";
          context.font = "18px Microsoft Yahei";
          context.fillText(
            "入场线",
            startZB + offsetX - 50,
            axis_OutLine.y - 25
          );
          context.font = "12px Microsoft Yahei";
          context.fillText(tfrom, startZB + offsetX + 20, axis_OutLine.y + 20);
          context.fillText(tend, endZB + offsetX - 30, axis_OutLine.y + 20);
        } else if (lineJson[i].id == 4) {
          // starttotal = 42000;
          // endtotal = 42500;

          //      if (starttotal == 0) {
          //    starttotal = this.minMileage;
          //  }
          let startZB = (starttotal - minkm * 1000) * everys;
          let endZB =
            parseInt((endtotal - starttotal) * everys) + parseInt(startZB);
          let betweenWidth = (endtotal - starttotal) * everys;
          console.log("startZB:" + startZB + "_" + endZB + "_" + betweenWidth);
          context.moveTo(startZB + offsetX, axis_OutLine_two.y);
          context.lineTo(endZB + offsetX, axis_OutLine_two.y);
          context.stroke();
          drawAxisTicksLine(
            betweenWidth,
            startZB + offsetX,
            axis_OutLine_two.y
          );
          //drawAxisTicksNum(starttotal/1000,betweenWidth, startZB+offsetX, axis_OutLine.y);
          context.restore();
          //
          context.fillStyle = "#fff";
          context.font = "18px Microsoft Yahei";
          context.fillText(
            "入场线",
            startZB + offsetX - 50,
            axis_OutLine_two.y - 25
          );
          context.font = "12px Microsoft Yahei";
          context.fillText(
            tfrom,
            startZB + offsetX + 20,
            axis_OutLine_two.y + 20
          );
          context.fillText(tend, endZB + offsetX - 30, axis_OutLine_two.y + 20);
        }
      }

      //开始
      function drawAxes() {
        context.save();
        context.lineWidth = 10;
        context.strokeStyle = "#fff";
        context.beginPath();
        //左线

        // context.fillStyle = "#fff";
        // context.font = "22px Microsoft Yahei";
        // context.fillText("左线", axis_LeftLine.x - 80, axis_LeftLine.y + 8);
        // context.moveTo(axis_LeftLine.x, axis_LeftLine.y);
        // context.lineTo(axis_Width, axis_LeftLine.y);

        // //右线
        // context.fillText("右线", axis_LeftLine_Two.x - 80, axis_LeftLine_Two.y + 8);
        // context.moveTo(axis_LeftLine_Two.x, axis_LeftLine_Two.y);
        // context.lineTo(axis_Width, axis_LeftLine_Two.y);

        // //入场线
        // let startRX = (this.lineTypeZuoMinMileage - parseInt(minkm * 1000)) * everys; //开始值
        // let endRX = (this.lineTypeZuoMaxMileage - parseInt(minkm * 1000)) * everys; //结束值
        // context.moveTo(startRX + offsetX, axis_OutLine.y);
        // context.lineTo(endRX + offsetX, axis_OutLine.y);

        // context.moveTo(axis_OutLine.x, axis_OutLine.y);
        // context.lineTo(churuline_Width, axis_OutLine.y);

        //
        context.stroke();
        drawAxisTicksLine(axis_Width, axis_LeftLine.x, axis_LeftLine.y); //左线
        drawAxisTicksLine(axis_Width, axis_LeftLine_Two.x, axis_LeftLine_Two.y); //右线
        drawAxisTicksLine(churuline_Width, axis_OutLine.x, axis_OutLine.y); //入场线 刻度标
        context.restore();
      }
      //绘制水平的小标
      function drawAxisTicksLine(axis_Width, axis_LeftLine_X, axis_LeftLine_y) {
        let num_Horizontal_Ticks = axis_Width / tick_Spacing;
        context.lineWidth = 2;
        context.strokeStyle = "white";
        var deltaY;
        for (var i = 0; i < num_Horizontal_Ticks; i++) {
          context.beginPath();
          if (i % 5 == 0) {
            deltaY = tick_Height;
            context.moveTo(
              axis_LeftLine_X + i * tick_Spacing,
              axis_LeftLine_y - deltaY + 13
            );
            context.lineTo(
              axis_LeftLine_X + i * tick_Spacing,
              axis_LeftLine_y + deltaY + 9
            );
          } else {
            deltaY = tick_Height / 2;
            context.moveTo(
              axis_LeftLine_X + i * tick_Spacing,
              axis_LeftLine_y - deltaY + 9
            );
            context.lineTo(
              axis_LeftLine_X + i * tick_Spacing,
              axis_LeftLine_y + deltaY + 9
            );
          }

          context.stroke();
        }
      }
      //绘制标注
      function drawAxisTicksNum(
        axis_MinKm,
        axis_Width,
        axis_Line_X,
        axis_Line_y,
        dk
      ) {
        let num_Horizontal_Ticks = axis_Width / tick_Spacing;
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "top";
        //  context.font = "bold 12px Microsoft Yahei";
        let s = parseInt(axis_MinKm) - 1;
        var num = 0;
        for (var i = 0; i <= num_Horizontal_Ticks; i++) {
          if (i % 5 === 0) {
            s++;
            context.fillText(
              dk + s,
              axis_Line_X + i * tick_Spacing,
              axis_Line_y + 20
            );
            num = 0;
          } else {
            num++;
            context.fillText(
              200 * num,
              axis_Line_X + i * tick_Spacing,
              axis_Line_y + 20
            );
          }
        }
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
            let startX = (total - parseInt(minkm * 1000)) * everys;
            context.drawImage(img, startX + 89.5, 65, 24, 120);
            //站名
            context.font = "bold 24px Microsoft Yahei";
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
      //绘制请点
      function drawAxesApply(applyListJson) {
        let json = applyListJson;
        let clickXY = [];
        for (let i = 0; i < json.length; i++) {
          let start =
            parseInt(json[i].start_flag) * 1000 +
            parseInt(json[i].start_length);
          let end =
            parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);
          //console.log("start：" + start + " end：" + end);
          // 计算当前站点的x轴坐标
          let startX = (start - parseInt(minkm * 1000)) * everys; //开始值
          let endX = (end - parseInt(minkm * 1000)) * everys; //结束值
          let centerX = (endX + startX) / 2; //开始结束平均值
          let desc = json[i].type;
          let dksatrt = "DK" + json[i].start_flag + " +" + json[i].start_length;
          let dkend = "DK" + json[i].end_flag + " +" + json[i].end_length;

          context.lineWidth = 2;
          context.fillStyle = "#ffff00";
          context.strokeStyle = "#ffff00";
          context.beginPath();

          if (json[i].line_type == 1) {
            //画水平直线
            context.fillRect(startX + offsetX - 1, axis_LeftLine.y - 53, 2, 15);
            context.fillRect(endX + offsetX - 1, axis_LeftLine.y - 53, 2, 15);
            context.moveTo(startX + offsetX, axis_applay.y);
            context.lineTo(endX + offsetX, axis_applay.y);
            //文字
            context.font = "24px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_applay.y - 25);
            context.fillStyle = "#fff";
            context.font = "12px Microsoft Yahei";
            context.fillText(dksatrt, startX + 139, axis_applay.y - 15);
            context.fillText(dkend, endX + 66, axis_applay.y - 15);
            clickXY.push({
              x: centerX + offsetX,
              y: axis_applay.y - 20,
              r: 50,
              i: json[i]
            });
          } else if (json[i].line_type == 2) {
            context.fillRect(startX + offsetX - 1, axis_LeftLine.y - 46, 2, 22);
            context.fillRect(endX + offsetX - 1, axis_LeftLine.y - 46, 2, 22);
            context.moveTo(startX + offsetX, axis_applay_two.y);
            context.lineTo(endX + offsetX, axis_applay_two.y);
            //文字
            context.fillStyle = "#ffff00";
            context.font = "24px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_applay.y + 225);
            context.fillStyle = "#ffff00";
            context.font = "12px Microsoft Yahei";
            context.fillText(dksatrt, startX + 139, axis_applay_two.y - 15);
            context.fillText(dkend, endX + 66, axis_applay_two.y - 15);
            clickXY.push({
              x: centerX + offsetX,
              y: axis_applay_two.y + 225,
              r: 50,
              i: json[i]
            });
          }
          context.stroke();

          //
        }
        //clickXYList=clickXY;
        canvas.addEventListener("click", function(e) {
          var x = event.pageX - canvas.getBoundingClientRect().left;
          var y = event.pageY - canvas.getBoundingClientRect().top;
          console.log(clickXY);
          for (let i of clickXY) {
            if (
              x > i.x - i.r &&
              x < i.x + i.r &&
              y > i.y - i.r &&
              y < i.y + i.r
            ) {
              let infos = i.i;
              that.$alert(
                "<p style='color:#4b6eca'><span style='color:#1d397a'>作业编号：</span>" +
                  infos.number +
                  "</p><p style='color:#4b6eca'><span style='color:#1d397a'>作业令号</span>：" +
                  infos.command_num +
                  "</p>" +
                  "<p style='color:#4b6eca'><span style='color:#1d397a'>开始时间：</span>" +
                  infos.start_time +
                  "</p><p style='color:#4b6eca'><span style='color:#1d397a'>结束时间：</span>" +
                  infos.end_time +
                  "</p>" +
                  "<p style='color:#4b6eca'><span style='color:#1d397a'>施工区间：</span>" +
                  infos.work_area +
                  "</p><p style='color:#4b6eca'><span style='color:#1d397a'>施工内容：</span>" +
                  infos.description +
                  "</p>",
                {
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: "关闭"
                }
              );
              // .catch(() => {});
            }
          }
        });
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
          let startX = (start - parseInt(minkm * 1000)) * everys; //开始值
          let endX = (end - parseInt(minkm * 1000)) * everys; //结束值
          let centerX = (endX + startX) / 2; //开始结束平均值

          context.lineWidth = 2;
          context.fillStyle = "#2179cb";
          context.font = "12px Microsoft Yahei";
          context.strokeStyle = "#2179cb";
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
          } else {
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
          let startX = (start - parseInt(minkm * 1000)) * everys; //开始值
          let endX = (end - parseInt(minkm * 1000)) * everys; //结束值
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
          context.fillStyle = "#18DBFF";
          context.font = "12px Microsoft Yahei";
          context.strokeStyle = "#18DBFF";
          context.beginPath();
          if (json[i].line_type == 1) {
            //画垂直线  矩形
            context.fillRect(startX + offsetX, axis_LeftLine.y - 38, 2, 33);
            context.fillRect(endX + offsetX, axis_LeftLine.y - 38, 2, 33);
            context.moveTo(startX + offsetX, axis_LeftLine.y - 37);
            context.lineTo(endX + offsetX, axis_LeftLine.y - 37);
            //context.strokeRect(startX + offsetX,axis_LeftLine.y -38,betweenMeters * everys,1);
            //文字
            context.fillText(desc, centerX + offsetX, axis_LeftLine.y - 31);
            context.fillStyle = "#fff";
            context.font = "10px Microsoft Yahei";
            context.fillText(codes, centerX + offsetX, axis_LeftLine.y - 17);
          } else {
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
          //console.log("start：" + start + " end：" + end);
          // 计算当前站点的x轴坐标
          let startX = (start - parseInt(minkm * 1000)) * everys;
          let endX = (end - parseInt(minkm * 1000)) * everys;
          //console.log("startX：" + startX + " endX：" + endX);
          context.strokeStyle = "#ff6000";
          context.lineWidth = 10;
          context.fillStyle = "#ff6000";
          context.font = "12px Microsoft Yahei";
          let desc = "限速" + json[i].speed + "公里/小时";
          context.beginPath();
          //画水平直线
          if (json[i].line_type == 1) {
            context.moveTo(startX + offsetX, axis_LeftLine.y);
            context.lineTo(endX + offsetX, axis_LeftLine.y);
            context.fillText(desc, startX + 152, axis_LeftLine.y + 35);
          } else {
            context.moveTo(startX + offsetX, axis_LeftLine_Two.y);
            context.lineTo(endX + offsetX, axis_LeftLine_Two.y);
            context.fillText(desc, startX + 152, axis_LeftLine_Two.y + 35);
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
          //console.log("start：" + start + " end：" + end);
          // 计算当前站点的x轴坐标
          let startX = (start - parseInt(minkm * 1000)) * everys;
          let endX = (end - parseInt(minkm * 1000)) * everys;
          //console.log("startX：" + startX + " endX：" + endX);
          context.strokeStyle = "#ff1833";
          context.lineWidth = 10;
          context.fillStyle = "#ff1833";
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
            //画水平直线
            context.moveTo(startX + offsetX, axis_LeftLine.y);
            context.lineTo(endX + offsetX, axis_LeftLine.y);
            //文字
            context.fillText(desc, startX + 178, axis_LeftLine.y + 35);
          } else {
            context.moveTo(startX + offsetX, axis_LeftLine_Two.y);
            context.lineTo(endX + offsetX, axis_LeftLine_Two.y);
            context.fillText(desc, startX + 178, axis_LeftLine_Two.y + 35);
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
          let startX = (start - parseInt(minkm * 1000)) * everys; //开始值
          let endX = (end - parseInt(minkm * 1000)) * everys; //结束值
          let centerX = (endX + startX) / 2; //开始结束平均值

          context.lineWidth = 1;
          context.strokeStyle = "#ff8000";
          context.fillStyle = "#ff8000";
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
          if (start == 0) {
            start = minMileages;
          }
          // 计算当前站点的x轴坐标
          let startX = (start - parseInt(minkm * 1000)) * everys;
          let endX = (end - parseInt(minkm * 1000)) * everys;

          //console.log("startX：" + startX + " endX：" + endX);
          context.lineWidth = 10;
          context.strokeStyle = "#27DB07";
          context.beginPath();
          if (json[i].line_type == 1) {
            //画水平直线
            context.moveTo(startX + offsetX, axis_LeftLine.y);
            context.lineTo(endX + offsetX, axis_LeftLine.y);
          } else if (json[i].line_type == 2) {
            context.moveTo(startX + offsetX, axis_LeftLine_Two.y);
            context.lineTo(endX + offsetX, axis_LeftLine_Two.y);
          } else if (json[i].line_type == 3) {
            context.moveTo(startX + offsetX, axis_OutLine.y);
            context.lineTo(endX + offsetX, axis_OutLine.y);
          } else if (json[i].line_type == 4) {
            context.moveTo(startX + offsetX, axis_OutLine_two.y);
            context.lineTo(endX + offsetX, axis_OutLine_two.y);
          }
          context.stroke();
          //
        }
      }
      //==================基础
      //drawAxes();
      //drawAxisTicksNum(axis_Width, axis_LeftLine.x, axis_LeftLine.y);
      //drawAxisTicksNum(axis_Width,axis_LeftLine_Two.x, axis_LeftLine_Two.y);
      //drawAxisTicksNum(axis_Width,axis_OutLine.x, axis_OutLine.y);

      //画地铁站
      drawStations(this.stationList);

      //桥
      if (this.bridgeCheckValue) {
        drawBridgeAxis(this.bridgeList);
      }
      //隧道
      if (this.tunnelCheckValue) {
        drawTunnelAxis(this.tunnelList);
      }
      //限速区
      if (this.speedCheckValue) {
        drawSpeedAxis(this.speedList);
      }
      //防区
      if (this.alertCheckValue) {
        drawAlertAxis(this.alertList);
      }
      //坡度
      if (this.slopeCheckValue) {
        drawSlopeAxis(this.slopeList);
      }
      //施工进度
      // if (this.progressCheckValue) {
      //   drawProgressAxis(this.progressListItem);
      // }
      //作业
      drawAxesApply(this.applyList);
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
      this.initCanvas();
    },
    //隧道
    tunnelCheckSelect() {
      this.initCanvas();
    },
    //限速区
    speedCheckSelect() {
      this.initCanvas();
    },
    //防区
    alertCheckSelect() {
      this.initCanvas();
    },
    //坡度
    slopeCheckSelect() {
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
      //console.log(startX);
      document.querySelector(".group-canvas").scrollTo(startX, 0);
    }
    //
  },
  mounted() {
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
.main-canvas {
  background: #081c33;
}
.group-canvas {
  overflow-x: scroll;
  overflow-y: hidden;
  height: 680px;
  padding-right: 100px;
}
.station-top {
  margin: 0 30px;
}
.startend {
  padding-top: 30px;
  overflow: hidden;
}
.startend .sleft,
.startend .sright {
  background: #4b6eca;
  color: #fff;
  padding: 10px 15px 15px 15px;
  display: block;
  font-size: 16px;
  font-weight: 700;
}
.startend .sleft {
  float: left;
  margin-right: 20px;
}
.startend .scenter {
}
.startend .sright {
  float: right;
}
.startend .line-a {
  position: relative;
  background: #fff;
  height: 1px;
  display: block;
  margin-top: 6px;
}
.startend .line-a::before {
  content: "";
  position: absolute;
  left: 0;
  top: 2px;
  width: 10px;
  height: 3px;
  border-bottom: 1px solid #fff;
  transform: rotateZ(45deg);
}
.startend .line-b {
  position: relative;
  background: #fff;
  height: 1px;
  display: block;
  margin-top: 6px;
}
.startend .line-b::before {
  content: "";
  position: absolute;
  right: -1px;
  top: 4px;
  width: 10px;
  height: 3px;
  border-bottom: 1px solid #fff;
  transform: rotateZ(135deg);
}
.stations {
  float: left;
}
.stations .item {
  width: 500px;
  overflow: hidden;
  display: inline-block;
  white-space: nowrap;
}
.stations ul li {
  display: inline-block;
  background: #4b6eca;
  color: #fff;
  padding: 17px 15px;
  margin-left: 10px;
  cursor: pointer;
}
.stations ul li:hover {
  background: #2359e2;
}
.stations i {
  display: inline-block;
  background: #3062e2;
  color: #fff;
  padding: 15px 15px;
  font-size: 20px;
  vertical-align: top;
  cursor: pointer;
}
.stations i:hover {
  background: #2359e2;
}
.stations-select {
  margin-top: 30px;
  padding-bottom: 30px;
  text-align: center;
}
.stations-select .el-checkbox__label {
  color: #fff;
}
.bridgechk.is-checked {
  border-color: #2179cb !important;
}
.bridgechk .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #2179cb;
  border-color: #2179cb;
}
.bridgechk.is-checked .el-checkbox__label {
  color: #2179cb;
}
.tunnelchk.is-checked {
  border-color: #18dbff !important;
}
.tunnelchk .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #18dbff;
  border-color: #18dbff;
}
.tunnelchk.is-checked .el-checkbox__label {
  color: #18dbff;
}
.speedchk.is-checked {
  border-color: #ff6000 !important;
}
.speedchk .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #ff6000;
  border-color: #ff6000;
}
.speedchk.is-checked .el-checkbox__label {
  color: #ff6000;
}

.slopechk.is-checked {
  border-color: #ff8000 !important;
}
.slopechk .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #ff8000;
  border-color: #ff8000;
}
.slopechk.is-checked .el-checkbox__label {
  color: #ff8000;
}
.alertchk.is-checked {
  border-color: #ff1833 !important;
}
.alertchk .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #ff1833;
  border-color: #ff1833;
}
.alertchk.is-checked .el-checkbox__label {
  color: #ff1833;
}
.progresslist {
  padding-top: 20px;
  padding-left: 30px;
  color: #fff;
}
.progresslist .namess {
  padding-bottom: 10px;
  display: block;
}
.progresslist .el-radio__label {
  color: #fff;
}
</style>