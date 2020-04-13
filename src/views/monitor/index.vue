<template>
  <div id="progress">
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
            <ul :style="{width: stationList.length * 100 + 'px','margin-left': wdpx * 100 + 'px'}">
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
    <div class="progresslist">
      施工进度：
      <el-radio-group v-model="progressCheckValue" @change="progressCheckSelect">
        <el-radio v-for="item in progressList" :key="item.name" :label="item.name">{{item.name}}</el-radio>
        <!-- <el-radio :label="6">备选项</el-radio>
        <el-radio :label="9">备选项</el-radio>-->
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
      minMileage: 0,
      totalMileage: 0,
      every: 0.5,
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
      progressList: [],
      progressListItem: [],
      progressCheckValue: 0
    };
  },
  created() {
    this.getProjectProcessMap();
  },
  mounted() {},
  methods: {
    getProjectProcessMap() {
      this.request({
        url: "/monitor/getMointorDatas",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
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
          this.minKM = first.start_flag; //最小公里
          console.log(
            "总里程mileage：" +
              this.totalMileage +
              " 最小里程minMileage：" +
              this.minMileage +
              " minKM：" +
              this.minKM
          );
          //桥 隧道等
          this.bridgeList = data.data.bridge_lists; //桥
          this.tunnelList = data.data.tunnel_lists; //隧道
          this.speedList = data.data.speed_lists; //限速区
          this.alertList = data.data.alert_lists; //防区
          this.slopeList = data.data.slope_lists; //坡度
          //施工进度
          this.progressList = data.data.project;
          this.initCanvas();
          //  this.getLineType();
        }
      });
    },

    initCanvas() {
      //坐标轴宽度高度
      let axis_Width = this.totalMileage / 2 + 600;
      let axis_Height = "680";
      //标尺起点
      let axis_Origin = {
        x: 100,
        y: axis_Height - 450
      };
      let axis_Origin_Two = {
        x: 100,
        y: axis_Height - 200
      };
      //刻度的间隔
      let tick_Spacing = 100;
      //标记数值
      let num_Horizontal_Ticks = axis_Width / tick_Spacing;
      //刻度线高度
      let tick_Height = 8;
      let everys = this.every; //每米长度等于px
      let minkm = this.minKM; //最小的公里数
      let offsetX = 100; //偏移100像素 找不到原因
      //初始化
      let canvas = this.$refs.mycanvas;
      canvas.width = axis_Width;
      let context = canvas.getContext("2d");
      //开始
      function drawAxes() {
        context.save();
        context.lineWidth = 10;
        context.strokeStyle = "#ffffff";
        context.beginPath();
        context.moveTo(axis_Origin.x, axis_Origin.y);
        context.lineTo(axis_Width, axis_Origin.y);
        context.moveTo(axis_Origin_Two.x, axis_Origin_Two.y);
        context.lineTo(axis_Width, axis_Origin_Two.y);
        context.stroke();
        //drawHorizontalAxis();
        drawHorizontalAxisTicks(axis_Origin.x, axis_Origin.y);
        drawHorizontalAxisTicks(axis_Origin_Two.x, axis_Origin_Two.y);
        context.restore();
      }
      //绘制水平的小标
      function drawHorizontalAxisTicks(axis_Origin_X, axis_Origin_y) {
        context.lineWidth = 2;
        context.strokeStyle = "white";
        var deltaY;
        for (var i = 1; i < num_Horizontal_Ticks; i++) {
          context.beginPath();
          //判断画的是大坐标还是短坐标
          if (i % 5 == 0) {
            deltaY = tick_Height;
            context.moveTo(
              axis_Origin_X + i * tick_Spacing,
              axis_Origin_y - deltaY + 13
            );
            context.lineTo(
              axis_Origin_X + i * tick_Spacing,
              axis_Origin_y + deltaY + 9
            );
          } else {
            deltaY = tick_Height / 2;
            context.moveTo(
              axis_Origin_X + i * tick_Spacing,
              axis_Origin_y - deltaY + 9
            );
            context.lineTo(
              axis_Origin_X + i * tick_Spacing,
              axis_Origin_y + deltaY + 9
            );
          }

          context.stroke();
        }
      }
      //绘制标注
      function drawAxisLabels(axis_Origin_X, axis_Origin_y) {
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "top";
        //  context.font = "bold 12px Microsoft Yahei";
        let s = parseInt(minkm) - 1;
        var num = 0;
        for (var i = 0; i <= num_Horizontal_Ticks; i++) {
          if (i % 5 === 0) {
            s++;
            context.fillText(
              "ZDK" + s,
              axis_Origin_X + i * tick_Spacing,
              axis_Origin_y + 20
            );
            num = 0;
          } else {
            num++;
            context.fillText(
              200 * num,
              axis_Origin_X + i * tick_Spacing,
              axis_Origin_y + 20
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
            context.drawImage(img, startX + 89.5, 105, 22, 120);
            //站名
            context.font = "bold 24px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.textAlign = "left";
            let origin = json[i].name;
            let lens = json[i].name.length;
            context.fillText(origin, startX + 90, 55);
            //DK
            let codes = "DK" + json[i].start_flag + " +" + json[i].start_length;
            context.fillStyle = "#0AE39A";
            context.font = "14px Microsoft Yahei";
            context.fillText(codes, startX + 90, 85);
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
          let startX = (start - parseInt(minkm * 1000)) * everys; //开始值
          let endX = (end - parseInt(minkm * 1000)) * everys; //结束值
          let centerX = (endX + startX) / 2; //开始结束平均值

          context.lineWidth = 2;
          context.fillStyle = "#ffa918";
          context.strokeStyle = "#ffa918";
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
          if (json[i].line_type == 1) {
            //画垂直线
            context.fillRect(centerX + offsetX, axis_Origin.y + 5, 2, 105);
            //画矩形
            context.strokeRect(
              startX + offsetX,
              axis_Origin.y + 110,
              betweenMeters * everys,
              45
            );
            // context.moveTo(startX + offsetX+30, axis_Origin.y + 55) //起点
            // context.lineTo(startX + offsetX, axis_Origin.y + 105) //终点
            // context.moveTo(endX + offsetX-30, axis_Origin.y + 55) //起点
            // context.lineTo(endX + offsetX, axis_Origin.y + 105) //终点
            // context.stroke();
            //文字
            context.font = "13px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_Origin.y + 120);
            context.font = "11px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.fillText(codes, centerX + offsetX, axis_Origin.y + 138);
          } else {
            //
            context.fillRect(centerX + offsetX, axis_Origin_Two.y + 5, 2, 105);
            context.strokeRect(
              startX + offsetX,
              axis_Origin_Two.y + 110,
              betweenMeters * everys,
              45
            );
            //    context.moveTo(startX + offsetX+30, axis_Origin_Two.y + 60) //起点
            //   context.lineTo(startX + offsetX, axis_Origin_Two.y + 105) //终点
            //  context.moveTo(endX + offsetX-30, axis_Origin_Two.y + 60) //起点
            // context.lineTo(endX + offsetX, axis_Origin_Two.y + 105) //终点
            // context.stroke();
            //文字
            context.font = "13px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_Origin_Two.y + 120);
            context.font = "11px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.fillText(codes, centerX + offsetX, axis_Origin_Two.y + 138);
          }

          //
        }
      }
      //绘隧道
      function drawTunnelAxis(tunnelListJson) {
        let json = tunnelListJson;
        let json1 = [
          {
            id: 7,
            name: "隧道名称一",
            line_type: 1,
            start_flag: 15,
            start_length: 200,
            end_flag: 15,
            end_length: 800
          },
          {
            id: 7,
            name: "隧道名称二",
            line_type: 2,
            start_flag: 14,
            start_length: 200,
            end_flag: 16,
            end_length: 100
          }
        ];

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
          context.strokeStyle = "#18DBFF";
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
          if (json[i].line_type == 1) {
            //画垂直线
            context.fillStyle = "#18DBFF";
            context.fillRect(startX + offsetX - 1, axis_Origin.y - 45, 2, 40);
            context.fillRect(endX + offsetX - 1, axis_Origin.y - 45, 2, 40);
            //画矩形
            context.strokeRect(
              startX + offsetX,
              axis_Origin.y - 90,
              betweenMeters * everys,
              45
            );
            //文字
            context.fillStyle = "#18DBFF";
            context.font = "13px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_Origin.y - 80);
            context.font = "11px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.fillText(codes, centerX + offsetX, axis_Origin.y - 62);
          } else {
            //画垂直线
            context.fillStyle = "#18DBFF";
            context.fillRect(
              startX + offsetX - 1,
              axis_Origin_Two.y - 45,
              2,
              40
            );
            context.fillRect(endX + offsetX - 1, axis_Origin_Two.y - 45, 2, 40);

            //画矩形
            context.strokeRect(
              startX + offsetX,
              axis_Origin_Two.y - 90,
              betweenMeters * everys,
              45
            );
            //文字
            context.font = "13px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_Origin_Two.y - 80);
            context.font = "11px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.fillText(codes, centerX + offsetX, axis_Origin_Two.y - 62);
          }

          //
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
          console.log("start：" + start + " end：" + end);
          // 计算当前站点的x轴坐标
          let startX = (start - parseInt(minkm * 1000)) * everys;
          let endX = (end - parseInt(minkm * 1000)) * everys;
          //console.log("startX：" + startX + " endX：" + endX);
          context.strokeStyle = "#FF18D3";
          context.lineWidth = 10;
          context.fillStyle = "#FF18D3";
          context.font = "12px Microsoft Yahei";
          let desc = "限速" + json[i].speed + "公里/小时";
          context.beginPath();
          if (json[i].line_type == 1) {
            //画水平直线
            context.moveTo(startX + offsetX, axis_Origin.y);
            context.lineTo(endX + offsetX, axis_Origin.y);
            //文字
            context.fillText(desc, startX + 152, axis_Origin.y + 35);
          } else {
            context.moveTo(startX + offsetX, axis_Origin_Two.y);
            context.lineTo(endX + offsetX, axis_Origin_Two.y);
            context.fillText(desc, startX + 152, axis_Origin_Two.y + 35);
          }
          context.stroke();
          //
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
          console.log("start：" + start + " end：" + end);
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
            context.moveTo(startX + offsetX, axis_Origin.y);
            context.lineTo(endX + offsetX, axis_Origin.y);
            //文字
            context.fillText(desc, startX + 178, axis_Origin.y + 35);
          } else {
            context.moveTo(startX + offsetX, axis_Origin_Two.y);
            context.lineTo(endX + offsetX, axis_Origin_Two.y);
            context.fillText(desc, startX + 178, axis_Origin_Two.y + 35);
          }
          context.stroke();
          //
        }
      }
      //绘制坡度
      function drawSlopeAxis(slopeListJson) {
        let json = slopeListJson;
        let json1 = [
          {
            id: 7,
            name: "\u9650\u901f",
            line_type: 1,
            start_flag: 14,
            start_length: 200,
            end_flag: 14,
            end_length: 400,
            height: "2",
            length: "200",
            type: 1
          },
          {
            id: 7,
            name: "\u9650\u901f",
            line_type: 1,
            start_flag: 14,
            start_length: 400,
            end_flag: 14,
            end_length: 600,
            height: "3",
            length: "300",
            type: 1
          },
          {
            id: 7,
            name: "\u9650\u901f",
            line_type: 1,
            start_flag: 14,
            start_length: 600,
            end_flag: 15,
            end_length: 0,
            height: "4",
            length: "600",
            type: 3
          },
          {
            id: 7,
            name: "\u9650\u901f",
            line_type: 1,
            start_flag: 15,
            start_length: 0,
            end_flag: 15,
            end_length: 400,
            height: "4",
            length: "400",
            type: 3
          },
          {
            id: 7,
            name: "右线",
            line_type: 2,
            start_flag: 14,
            start_length: 200,
            end_flag: 14,
            end_length: 400,
            height: "3",
            length: "300",
            type: 1
          },
          {
            id: 7,
            name: "\u9650\u901f",
            line_type: 2,
            start_flag: 14,
            start_length: 400,
            end_flag: 14,
            end_length: 600,
            height: "3.00",
            length: "200",
            type: 1
          },
          {
            id: 7,
            name: "\u9650\u901f",
            line_type: 2,
            start_flag: 14,
            start_length: 600,
            end_flag: 15,
            end_length: 0,
            height: "3.00",
            length: "600",
            type: 3
          },
          {
            id: 7,
            name: "\u9650\u901f",
            line_type: 2,
            start_flag: 15,
            start_length: 0,
            end_flag: 15,
            end_length: 400,
            height: "3.00",
            length: "600",
            type: 3
          }
        ];

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
          context.strokeStyle = "#FF5F18";
          context.fillStyle = "#FF5F18";

          let slope_height = parseFloat(json[i].height);
          let slope_length = parseFloat(json[i].length);
          let slope_center = (betweenMeters * everys) / 2;
          //type  1 2 3 代表上坡 平坡 下坡
          if (json[i].line_type == 1) {
            //对角线
            if (json[i].type == 1) {
              context.moveTo(startX + offsetX, axis_Origin.y + 100); //起点
              context.lineTo(
                startX + offsetX + betweenMeters * everys,
                axis_Origin.y + 50
              ); //终点
              context.stroke();
              context.fillText(
                slope_height,
                startX + offsetX + slope_center - 20,
                axis_Origin.y + 60
              );
              context.fillText(
                slope_length,
                startX + offsetX + slope_center + 20,
                axis_Origin.y + 80
              );
            }
            if (json[i].type == 2) {
              context.moveTo(startX + offsetX, axis_Origin.y + 50 + 25); //起点
              context.lineTo(
                startX + offsetX + betweenMeters * everys,
                axis_Origin.y + 50 + 25
              ); //终点
              context.stroke();
              context.fillText(
                slope_height,
                startX + offsetX + slope_center,
                axis_Origin.y + 60
              );
              context.fillText(
                slope_length,
                startX + offsetX + slope_center,
                axis_Origin.y + 80
              );
            }
            if (json[i].type == 3) {
              context.moveTo(startX + offsetX, axis_Origin.y + 50); //起点
              context.lineTo(
                startX + offsetX + betweenMeters * everys,
                axis_Origin.y + 100
              ); //终点
              context.stroke();
              context.fillText(
                slope_height,
                startX + offsetX + slope_center + 20,
                axis_Origin.y + 60
              );
              context.fillText(
                slope_length,
                startX + offsetX + slope_center - 20,
                axis_Origin.y + 80
              );
            }
            //画矩形
            context.strokeRect(
              startX + offsetX,
              axis_Origin.y + 50,
              betweenMeters * everys,
              50
            );
          } else if (json[i].line_type == 2) {
            //对角线
            if (json[i].type == 1) {
              context.moveTo(startX + offsetX, axis_Origin_Two.y + 100); //起点
              context.lineTo(
                startX + offsetX + betweenMeters * everys,
                axis_Origin_Two.y + 50
              ); //终点
              context.stroke();
              context.fillText(
                slope_height,
                startX + offsetX + slope_center - 20,
                axis_Origin_Two.y + 60
              );
              context.fillText(
                slope_length,
                startX + offsetX + slope_center + 20,
                axis_Origin_Two.y + 80
              );
            }
            if (json[i].type == 2) {
              context.moveTo(startX + offsetX, axis_Origin_Two.y + 50 + 25); //起点
              context.lineTo(
                startX + offsetX + betweenMeters * everys,
                axis_Origin_Two.y + 50 + 25
              ); //终点
              context.stroke();
              context.fillText(
                slope_height,
                startX + offsetX + slope_center,
                axis_Origin_Two.y + 60
              );
              context.fillText(
                slope_length,
                startX + offsetX + slope_center,
                axis_Origin_Two.y + 80
              );
            }
            if (json[i].type == 3) {
              context.moveTo(startX + offsetX, axis_Origin_Two.y + 50); //起点
              context.lineTo(
                startX + offsetX + betweenMeters * everys,
                axis_Origin_Two.y + 100
              ); //终点
              context.stroke();
              context.fillText(
                slope_height,
                startX + offsetX + slope_center + 20,
                axis_Origin_Two.y + 60
              );
              context.fillText(
                slope_length,
                startX + offsetX + slope_center - 20,
                axis_Origin_Two.y + 80
              );
            }
            //画矩形
            context.strokeRect(
              startX + offsetX,
              axis_Origin_Two.y + 50,
              betweenMeters * everys,
              50
            );
          }
          //
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
          console.log("start：" + start + " end：" + end);
          // 计算当前站点的x轴坐标
          let startX = (start - parseInt(minkm * 1000)) * everys;
          let endX = (end - parseInt(minkm * 1000)) * everys;
          //console.log("startX：" + startX + " endX：" + endX);
              context.lineWidth = 10;
        context.strokeStyle = "#27DB07";
          context.beginPath();
          if (json[i].line_type == 1) {
            //画水平直线
            context.moveTo(startX + offsetX, axis_Origin.y);
            context.lineTo(endX + offsetX, axis_Origin.y);
          } else if (json[i].line_type == 2) {
            context.moveTo(startX + offsetX, axis_Origin_Two.y);
            context.lineTo(endX + offsetX, axis_Origin_Two.y);
          }
          context.stroke();
          //
        }
      }
      //基础
      drawAxes();
      drawAxisLabels(axis_Origin.x, axis_Origin.y);
      drawAxisLabels(axis_Origin_Two.x, axis_Origin_Two.y);
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
      if (this.progressCheckValue) {
        drawProgressAxis(this.progressListItem);
      }
    },

    // =============桥 隧道 限速区 防区 道岔 坡度 施工进度
    //进度
    progressCheckSelect(val) {
      this.progressList.map(item => {
        if (item.name == val) {
          this.progressListItem = item.list;
        }
      });
      console.log("progressListItem" + JSON.stringify(this.progressListItem));
      this.getProjectProcessMap();
    },
    //桥
    bridgeCheckSelect() {
      this.getProjectProcessMap();
    },
    //隧道
    tunnelCheckSelect() {
      this.getProjectProcessMap();
    },
    //限速区
    speedCheckSelect() {
      this.getProjectProcessMap();
    },
    //防区
    alertCheckSelect() {
      this.getProjectProcessMap();
    },
    //坡度
    slopeCheckSelect() {
      this.getProjectProcessMap();
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
      console.log(startX);
      document.querySelector(".group-canvas").scrollTo(startX, 0);
    }
    //
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.scrollwidth = document.documentElement.clientWidth - 350;
    });
  }
};
</script>

<style>
#progress {
  background: #081c33;
  height: 100vh;
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
  float: left; margin-right: 20px;
}
.startend .scenter{}
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
  border-color: #ffa918 !important;
}
.bridgechk .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #ffa918;
  border-color: #ffa918;
}
.bridgechk.is-checked .el-checkbox__label {
  color: #ffa918;
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
  border-color: #ff18d3 !important;
}
.speedchk .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #ff18d3;
  border-color: #ff18d3;
}
.speedchk.is-checked .el-checkbox__label {
  color: #ff18d3;
}

.slopechk.is-checked {
  border-color: #ff5f18 !important;
}
.slopechk .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #ff5f18;
  border-color: #ff5f18;
}
.slopechk.is-checked .el-checkbox__label {
  color: #ff5f18;
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
.progresslist  .el-radio__label{color:#fff;}
</style>