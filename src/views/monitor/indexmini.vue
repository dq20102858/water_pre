<template>
  <div id="progress" ref="proWrapper" :style="conheight">
    <div class="progress">
      <div class="chkleft">
        <router-link to="/monitor/" class="rlink">返回</router-link>
      </div>

      <div class="station-top">
        <!-- <div class="startend">
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
        </div>-->
      </div>

      <div class="station">
        <canvas
          id="canvasStation"
          height="650"
          style="border-bottom:1px #ddd solid;"
          ref="canvasStation"
        >
          <p>您的系统不支持此程序!</p>
        </canvas>
      </div>
      <div class="linebox" ref="reflinebox">
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      conheight: {
        height: ""
      },
      cwidth: 0,
      stationList: [],
      lineTypeList: [],
      listSchedule: [],
      stationlineHeight: 0,
      stationlineTwoHeight: 0,
      every: 0,
      everyLineType: 0,
      lineTypeMinMileage: 0,
      lineTypeMaxMileage: 0,
      lineTypeEnterMinMileage: 0,
      lineTypeOutMinMileage: 0,
      applyList: []
    };
  },
  updated() {},
  created() {
    this.getProjectProcessMap();
  },
  mounted() {
    document.querySelector(body).classList.add("is-active");
  },
  methods: {
    getProjectProcessMap() {
      this.request({
        url: "/monitor/getMointorDatas",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.stationList = data.data.stations;
          let linetypeJson = data.data.line_types;
          this.lineTypeList = linetypeJson;
          for (let i = 0; i < linetypeJson.length; i++) {
            if (linetypeJson[i].id == 1) {
              this.lineTypeMinMileage =
                parseInt(linetypeJson[i].start_flag) * 1000 +
                parseInt(linetypeJson[i].start_length);
              this.lineTypeMaxMileage =
                parseInt(linetypeJson[i].end_flag) * 1000 +
                parseInt(linetypeJson[i].end_length);
            } else if (linetypeJson[i].id == 3) {
              this.lineTypeEnterMinMileage =
                parseInt(linetypeJson[i].start_flag) * 1000 +
                parseInt(linetypeJson[i].start_length);
            } else if (linetypeJson[i].id == 4) {
              this.lineTypeOutMinMileage =
                parseInt(linetypeJson[i].start_flag) * 1000 +
                parseInt(linetypeJson[i].start_length);
            }
            //请点
            this.applyList = data.data.apply_lists;
            //
            this.getStationList();
          }
        }
      });
    },

    getStationList() {
      let clientWidth = this.$refs.proWrapper.clientWidth;
      let canvasWidth = clientWidth - 60;
      this.cwidth = canvasWidth - 10;
      let lineTypeBetwentMileage =
        this.lineTypeMaxMileage - this.lineTypeMinMileage;
      let lineTypeTotalMileage =
        this.lineTypeMaxMileage + this.lineTypeMinMileage;
      this.everyLineType = (
        parseInt(this.cwidth) / lineTypeBetwentMileage
      ).toFixed(5);
      this.every = (parseInt(canvasWidth) / lineTypeBetwentMileage).toFixed(5);
      console.log("cwidth" + this.cwidth + "_" + this.everyLineType);

      //请点标尺起点
      let axis_Height = "650";
      //左右线标尺起点
      let axis_LeftLine = {
        x: 0,
        y: axis_Height - 400
      };
      let axis_LeftLine_Two = {
        x: 0,
        y: axis_Height - 300
      };
      //出入场线
      let axis_OutLine = {
        x: 10,
        y: axis_Height - 200
      };
      let axis_OutLine_Two = {
        x: 10,
        y: axis_Height - 100
      };

      let axis_applay = {
        x: 10,
        y: axis_Height - 535
      };
      let axis_applay_two = {
        x: 10,
        y: axis_Height - 245
      };
      let lineTypeMinMileage = this.lineTypeMinMileage;
      let every = this.every; //每米长度等于px
      console.log("every：" + every);

      const canvas = this.$refs.canvasStation;
      let context = canvas.getContext("2d");
      canvas.width = canvasWidth;

      //左右线
      function drawAxesLine(lineJson) {
        context.beginPath();
        context.strokeStyle = "#fff";
        context.fillStyle = "#fff";
        context.lineWidth = 10;
        let lineData = [];
        for (let i = 0; i < lineJson.length; i++) {
          lineData.push(lineJson[i]);
          let tfrom =
              lineJson[i].name +
              "   " +
              "DK" +
              lineJson[i].start_flag +
              "+" +
              lineJson[i].start_length,
            tend = "DK" + lineJson[i].end_flag + "+" + lineJson[i].end_length;
          let startLength = context.measureText(tfrom).width,
            endLength = context.measureText(tend).width;
          let starttotal = parseInt(lineJson[i].start_total);
          let endtotal = parseInt(lineJson[i].end_total);
          let startX = (starttotal - lineTypeMinMileage) * every;
          if (lineJson[i].id == 1) {
            context.moveTo(startX, axis_LeftLine.y);
            context.lineTo(canvasWidth, axis_LeftLine.y);
            context.fillText(tfrom, 0, axis_LeftLine.y + 20);
            context.fillText(tend, canvasWidth - 65, axis_LeftLine.y + 20);
          } else if (lineJson[i].id == 2) {
            context.moveTo(startX, axis_LeftLine_Two.y);
            context.lineTo(canvasWidth, axis_LeftLine_Two.y);
            context.fillText(tfrom, 0, axis_LeftLine_Two.y + 20);
            context.fillText(tend, canvasWidth - 65, axis_LeftLine_Two.y + 20);
            //3
          } else if (lineJson[i].id == 3) {
            if (starttotal == 0) {
              starttotal = lineTypeMinMileage;
            }
            let endX = parseFloat((endtotal - starttotal) * every);
            context.moveTo(startX, axis_OutLine.y);
            context.lineTo(endX, axis_OutLine.y);
            //
            context.fillText(tfrom, 0, axis_OutLine.y + 20);
            context.fillText(tend, endX - 60, axis_OutLine.y + 20);
            //4
          } else if (lineJson[i].id == 4) {
            let startZB = (starttotal - lineTypeMinMileage) * every;
            let endZB =
              parseFloat((endtotal - starttotal) * every) + parseFloat(startZB);
            context.moveTo(startZB, axis_OutLine_Two.y);
            context.lineTo(endZB, axis_OutLine_Two.y);
            //
            let beteew = endZB - startZB;
            if (beteew < 160) {
              context.fillText(tfrom, startZB - 160, axis_OutLine_Two.y + 20);
              context.fillText(tend, endZB - 80, axis_OutLine_Two.y + 20);
            } else {
              context.fillText(tfrom, startZB, axis_OutLine_Two.y + 20);
              context.fillText(tend, endZB - 55, axis_OutLine_Two.y + 20);
            }
          }
        }
        context.stroke();
      }
      //站点
      function drawAxesStationList(jsonData) {
        let json = jsonData;
        let img = new Image();
        img.src = require("@/assets/image/stasm.png");
        img.onload = function() {
          let start = 0;
          for (let i = 0; i < json.length; i++) {
            // 绘制站点图
            let total =
              parseInt(json[i].start_flag) * 1000 +
              parseInt(json[i].start_length);
            let startLineX = (total - lineTypeMinMileage) * every;
            // 计算当前站点的x轴
            context.drawImage(
              img,
              startLineX - 8,
              axis_LeftLine.y - 95,
              18,
              90
            );
            // //站名
            context.font = "17px Microsoft Yahei";
            context.fillStyle = "#fff";
            let origin = json[i].name.split("");
            for (let x = 0; x < origin.length; x++) {
              context.fillText(
                origin[x],
                startLineX,
                axis_LeftLine.y - 85 - origin.length * 19 + 19 * x
              );
            }
            //DK
            let codes = "DK" + json[i].start_flag + " +" + json[i].start_length;
            context.fillStyle = "#0AE39A";
            context.font = "12px  Microsoft Yahei";
            context.fillTextVertical(
              codes,
              startLineX + 18,
              axis_LeftLine.y - 65
            );
          }
        };
        context.stroke();
      }
      //车定位
      function drawAxesCar(jsonData) {
        context.beginPath();
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
            context.fillStyle = "#fafafa";
            context.font = " 11px";
            if (jsonCar[i].line_type == 1) {
              let total =
                parseInt(jsonCar[i].start_flag) * 1000 +
                parseInt(jsonCar[i].start_length);
              let startLineX = (total - lineTypeMinMileage) * every;
              context.drawImage(
                imgcar,
                startLineX,
                axis_LeftLine.y - 25,
                140,
                20
              );
              //DK
              let codes =
                jsonCar[i].name +
                " [ ZDK" +
                jsonCar[i].start_flag +
                " +" +
                jsonCar[i].start_length +
                " ]";
              context.fillText(codes, startLineX + 18, axis_LeftLine.y - 30);
            } else if (jsonCar[i].line_type == 2) {
              // 绘制站点图
              let total =
                parseInt(jsonCar[i].start_flag) * 1000 +
                parseInt(jsonCar[i].start_length);
              let startLineX = (total - lineTypeMinMileage) * every;
              context.drawImage(
                imgcar,
                startLineX,
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
                startLineX + 18,
                axis_LeftLine_Two.y - 30
              );
            } //
          }
        };
        context.stroke();
      }
      //人定位
      function drawAxesPeple(jsonData) {
        let jsonCar = [
          {
            id: 1,
            name: "R",
            start_flag: 20,
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
            start_flag: 30,
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
              let startLineX = (total - lineTypeMinMileage) * every;
              context.drawImage(
                imgcar,
                startLineX,
                axis_LeftLine.y - 39,
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

              context.fillText(codes, startLineX + 5, axis_LeftLine.y - 39);
            } else if (jsonCar[i].line_type == 2) {
              let total =
                parseInt(jsonCar[i].start_flag) * 1000 +
                parseInt(jsonCar[i].start_length);
              let startLineX = (total - lineTypeMinMileage) * every;
              context.drawImage(
                imgcar,
                startLineX,
                axis_LeftLine_Two.y - 39,
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
              context.fillText(codes, startLineX + 5, axis_LeftLine_Two.y - 39);
            } //
          }
        };
      }
      //绘制请点
      function drawAxesApply(jsonData) {
        let json = jsonData;
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
            start_length: "130",
            end_flag: "24",
            end_length: "890",
            type: "A4",
            start_total: 14600,
            end_total: 26410
          },
          {
            line_type: 1,
            number: "A1-2-007-1",
            command_num: "(2020)\u5b57\u7b2c04.21-007-2",
            description: "\u98ce\u98ce\u5149\u5149",
            work_area: "DK14+130\u81f3DK42+410",
            start_time: "2020-04-28 00:00:00",
            end_time: "2020-04-28 23:59:59",
            start_flag: "30",
            start_length: "720",
            end_flag: "37",
            end_length: "650",
            type: "A1",
            start_total: 28500,
            end_total: 32500
          },
          {
            line_type: 2,
            number: "A3-2-007-1",
            command_num: "(2020)\u5b57\u7b2c04.21-007-2",
            description: "\u98ce\u98ce\u5149\u5149",
            work_area: "DK14+160\u81f3DK21+370",
            start_time: "2020-04-28 00:00:00",
            end_time: "2020-04-28 23:59:59",
            start_flag: "14",
            start_length: "600",
            end_flag: "21",
            end_length: "370",
            type: "A3",
            start_total: 14600,
            end_total: 21370
          },
          {
            line_type: 3,
            number: "A3-2-007-1",
            command_num: "(2020)\u5b57\u7b2c04.21-007-2",
            description: "\u98ce\u98ce\u5149\u5149",
            work_area: "DK14+130\u81f3DK42+410",
            start_time: "2020-04-28 00:00:00",
            end_time: "2020-04-28 23:59:59",
            start_flag: "14",
            start_length: "600",
            end_flag: "21",
            end_length: "370",
            type: "A3",
            start_total: 14600,
            end_total: 21370
          }
        ];
        console.log("applyListJson" + jsonData);
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
          context.lineWidth = 2;
          if (json[i].type == "A1") {
            context.fillStyle = "#1AE642";
            context.strokeStyle = "#1AE642";
          } else if (json[i].type == "A2") {
          } else if (json[i].type == "A3") {
            context.fillStyle = "#ff0000";
            context.strokeStyle = "#ff0000";
          } else if (json[i].type == "A4") {
            context.fillStyle = "#ffff00";
            context.strokeStyle = "#ffff00";
          }

          context.beginPath();

          if (json[i].line_type == 1) {
            let dksatrt =
              "ZDK" + json[i].start_flag + " +" + json[i].start_length;
            let dkend = "ZDK" + json[i].end_flag + " +" + json[i].end_length;
            let startX = (start - lineTypeMinMileage) * every;
            let endX = (end - lineTypeMinMileage) * every;
            let centerX = (endX + startX) / 2; //开始结束平均值
            //画水平直线
            context.fillRect(startX - 1, 290, 2, 15);
            context.fillRect(endX - 1, 290, 2, 15);
            context.moveTo(startX, 298);
            context.lineTo(endX, 298);
            //文字
            context.font = "24px Microsoft Yahei";
            context.fillText(desc, centerX - 15, 295);
            clickXY.push({ x: centerX, y: 245, r: 50, i: json[i] });
            context.font = "12px Microsoft Yahei";
            context.fillText(dksatrt, startX + 5, 295);
            context.fillText(dkend, endX - 75, 295);
          } else if (json[i].line_type == 2) {
            let dksatrt =
              "YDK" + json[i].start_flag + " +" + json[i].start_length;
            let dkend = "YDK" + json[i].end_flag + " +" + json[i].end_length;
            let startX = (start - lineTypeMinMileage) * every;
            let endX = (end - lineTypeMinMileage) * every;
            let centerX = (endX + startX) / 2; //开始结束平均值
            //画水平直线
            context.fillRect(startX, 390, 2, 15);
            context.fillRect(endX, 390, 2, 15);
            context.moveTo(startX, 398);
            context.lineTo(endX, 398);
            //文字
            context.font = "24px Microsoft Yahei";
            context.fillText(desc, centerX - 15, 395);
            clickXY.push({ x: centerX, y: 345, r: 50, i: json[i] });
            context.font = "12px Microsoft Yahei";
            context.fillText(dksatrt, startX + 5, 395);
            context.fillText(dkend, endX - 75, 395);
          } else if (json[i].line_type == 3) {
            let dksatrt =
              "RDK" + json[i].start_flag + " +" + json[i].start_length;
            let dkend = "RDK" + json[i].end_flag + " +" + json[i].end_length;
            if (start == 0) {
              start = lineTypeMinMileage;
            }
            let startX = (start - lineTypeMinMileage) * every;
            let endX = (end - lineTypeMinMileage) * every;
            let centerX = (endX + startX) / 2; //开始结束平均值
            //画水平直线
            context.fillRect(startX, 490, 2, 15);
            context.fillRect(endX, 490, 2, 15);
            context.moveTo(startX, 498);
            context.lineTo(endX, 498);
            //文字
            context.font = "24px Microsoft Yahei";
            context.fillText(desc, centerX - 15, 495);
            clickXY.push({ x: centerX, y: 445, r: 50, i: json[i] });
            context.font = "12px Microsoft Yahei";
            context.fillText(dksatrt, startX + 5, 495);
            context.fillText(dkend, endX - 75, 495);
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

      //
      drawAxesLine(this.lineTypeList);
      drawAxesStationList(this.stationList);
      drawAxesCar(this.applyList);
      drawAxesPeple(this.applyList);
      drawAxesApply(this.applyList);

      //
    }
  },
  mounted() {
    window.addEventListener("resize", this.getStationList);
  },
  destroyed() {
    window.removeEventListener("resize", this.getStationList);
  }
};

//prototype
CanvasRenderingContext2D.prototype.fillTextVertical = function(text, x, y) {
  var context = this;
  var canvas = context.canvas;

  var arrText = text.split("");
  var arrWidth = arrText.map(function(letter) {
    return context.measureText(letter).width;
  });

  var align = context.textAlign;
  var baseline = context.textBaseline;

  if (align == "left") {
    x = x + Math.max.apply(null, arrWidth) / 2;
  } else if (align == "right") {
    x = x - Math.max.apply(null, arrWidth) / 2;
  }
  if (
    baseline == "bottom" ||
    baseline == "alphabetic" ||
    baseline == "ideographic"
  ) {
    y = y - arrWidth[0] / 2;
  } else if (baseline == "top" || baseline == "hanging") {
    y = y + arrWidth[0] / 2;
  }

  context.textAlign = "center";
  context.textBaseline = "middle";

  // 开始逐字绘制
  arrText.forEach(function(letter, index) {
    // 确定下一个字符的纵坐标位置
    var letterWidth = arrWidth[index];
    // 是否需要旋转判断
    var code = letter.charCodeAt(0);
    if (code <= 256) {
      context.translate(x, y);
      // 英文字符，旋转90°
      context.rotate((90 * Math.PI) / 180);
      context.translate(-x, -y);
    } else if (index > 0 && text.charCodeAt(index - 1) < 256) {
      // y修正
      y = y + arrWidth[index - 1] / 2;
    }
    context.fillText(letter, x, y);
    // 旋转坐标系还原成初始态
    context.setTransform(1, 0, 0, 1, 0, 0);
    // 确定下一个字符的纵坐标位置
    var letterWidth = arrWidth[index];
    y = y + letterWidth;
  });
  // 水平垂直对齐方式还原
  context.textAlign = align;
  context.textBaseline = baseline;
};
</script>
<style>
.sttitle {
  color: #fff;
  padding: 22px 0 0 25px;
  font-size: 24px;
  text-align: center;
}
#progress {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #081c33;
}
.progress {
  background: #081c33;
  padding-bottom: 30px;
}
.suofang {
  padding: 30px 0 10px 30px;
}
.suofang a {
  color: #fff;
  margin-right: 10px;
  font-size: 18px;
}
.station-top {
  margin: 0 30px;
}
.startend {
  padding-top: 10px;
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
@media (max-width: 1024px) {
  #progress {
    width: 1024px;
  }
}
.station {
  margin: 30px 0px 0px 30px;
  position: relative;
  z-index: 999;
}

.clear {
  clear: both;
}
/* //#27DB07 */
</style>

