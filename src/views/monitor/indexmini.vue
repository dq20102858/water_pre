<template>
  <div id="progress" ref="proWrapper" :style="conheight">
    <div class="progress">
      <div style="display:bolock;padding-top:15px;padding-left:15px;">
        <router-link to="/monitor/" class="rlink" style="color:#fff">返回</router-link>
      </div>
      <div class="station">
        <canvas id="canvasStation" height="650" ref="canvasStation">
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
    window.addEventListener("resize", this.getStationList);
  },
  destroyed() {
    window.removeEventListener("resize", this.getStationList);
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
          }
          //请点
          this.applyList = data.data.apply_lists;
          this.getStationList();
          //
        }
      });
    },

    getStationList() {
      let clientWidth = this.$refs.proWrapper.clientWidth;
      let canvasWidth = clientWidth - 90;
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
        x: 30,
        y: axis_Height - 400
      };
      let axis_LeftLine_Two = {
        x: 30,
        y: axis_Height - 280
      };
      //出入场线
      let axis_OutLine = {
        x: 30,
        y: axis_Height - 160
      };
      let axis_OutLine_Two = {
        x: 30,
        y: axis_Height - 50
      };

      let axis_Applay = {
        x: 30,
        y: axis_Height - 450
      };
      let axis_Applay_two = {
        x: 30,
        y: axis_Height - 330
      };
      let offsetX = 30;
      let lineTypeMinMileage = this.lineTypeMinMileage;
      let every = this.every; //每米长度等于px
      console.log("every：" + every);

      const canvas = this.$refs.canvasStation;
      let context = canvas.getContext("2d");
      canvas.width = canvasWidth;

      //左右线
      function drawAxesLine(lineJson) {
        // lineJson=[
        //             {
        //                 "id": 1,
        //                 "name": "\u5de6\u7ebf",
        //                 "start_flag": 0,
        //                 "start_length": 257,
        //                 "end_flag": 11,
        //                 "end_length": 455,
        //                 "start_total": 257,
        //                 "end_total": 11455
        //             },
        //             {
        //                 "id": 2,
        //                 "name": "\u53f3\u7ebf",
        //                 "start_flag": 0,
        //                 "start_length": 257,
        //                 "end_flag": 11,
        //                 "end_length": 455,
        //                 "start_total": 257,
        //                 "end_total": 11455
        //             },
        //             {
        //                 "id": 3,
        //                 "name": "入场线",
        //                 "start_flag": 1,
        //                 "start_length": 804,
        //                 "end_flag": 4,
        //                 "end_length": 232,
        //                 "start_total": 1804,
        //                 "end_total": 4232
        //             },
        //             {
        //                 "id": 4,
        //                 "name": "出场线",
        //                 "start_flag": 1,
        //                 "start_length": 804,
        //                 "end_flag": 4,
        //                 "end_length": 232,
        //                 "start_total": 1804,
        //                 "end_total": 4232
        //             }
        //         ]

        context.beginPath();
        context.strokeStyle = "#fff";
        context.fillStyle = "#fff";
        context.font="13px Microsoft Yahei";
        context.lineWidth = 10;
        let lineData = [];
        for (let i = 0; i < lineJson.length; i++) {
          lineData.push(lineJson[i]);
          let tfrom =
              lineJson[i].name +
              " " +
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
            context.moveTo(axis_LeftLine.x, axis_LeftLine.y);
            context.lineTo(canvasWidth, axis_LeftLine.y);
            context.fillText(tfrom, 30, axis_LeftLine.y + 25);
            context.fillText(tend, canvasWidth -75, axis_LeftLine.y + 25);
          } else if (lineJson[i].id == 2) {
            context.moveTo(axis_LeftLine.x, axis_LeftLine_Two.y);
            context.lineTo(canvasWidth, axis_LeftLine_Two.y);
            context.fillText(tfrom, 30, axis_LeftLine_Two.y + 25);
            context.fillText(tend, canvasWidth - 75, axis_LeftLine_Two.y + 25);
          } else if (lineJson[i].id == 3) {
            let startZB = (starttotal - lineTypeMinMileage) * every;
            let endZB =
              parseFloat((endtotal - starttotal) * every) + parseFloat(startZB);
            context.moveTo(startZB, axis_OutLine.y);
            context.lineTo(endZB, axis_OutLine.y);
            //
            let beteew = endZB - startZB;
            if (beteew < 160) {
              context.fillText(tfrom, startZB - 160, axis_OutLine.y + 25);
              context.fillText(tend, endZB - 80, axis_OutLine.y + 25);
            } else {
              context.fillText(tfrom, startZB, axis_OutLine.y + 25);
              context.fillText(tend, endZB - 75, axis_OutLine.y + 25);
            }
          } else if (lineJson[i].id == 4) {
            let startZB = (starttotal - lineTypeMinMileage) * every;
            let endZB =
              parseFloat((endtotal - starttotal) * every) + parseFloat(startZB);
            context.moveTo(startZB, axis_OutLine_Two.y);
            context.lineTo(endZB, axis_OutLine_Two.y);
            //
            let beteew = endZB - startZB;
            if (beteew < 160) {
              context.fillText(tfrom, startZB - 160, axis_OutLine_Two.y + 25);
              context.fillText(tend, endZB - 80, axis_OutLine_Two.y + 25);
            } else {
              context.fillText(tfrom, startZB, axis_OutLine_Two.y + 25);
              context.fillText(tend, endZB - 75, axis_OutLine_Two.y + 25);
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
            if (startLineX == 0) {
              startLineX = axis_LeftLine.x;
            }
            // 计算当前站点的x轴
            context.drawImage(
              img,
              startLineX - 8,
              axis_LeftLine.y - 95,
              18,
              90
            );
            // //站名
            context.font = "18px Microsoft Yahei";
            context.fillStyle = "#fff";
            let origin = json[i].name.split("");
            for (let x = 0; x < origin.length; x++) {
              context.fillText(
                origin[x],
                startLineX - 8,
                axis_LeftLine.y - 85 - origin.length * 20 + 20 * x
              );
            }
            //DK
            let codes = "DK" + json[i].start_flag + " +" + json[i].start_length;
            context.fillStyle = "#5f88f9";
            context.font = "12px  Microsoft Yahei";
            context.fillTextVertical(
              codes,
              startLineX + 10,
              axis_LeftLine.y - 66
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
            start_flag: 2,
            start_length: 300,
            line_type: 1
          },
          {
            id: 1,
            name: "ZY01",
            start_flag: 5,
            start_length: 245,
            line_type: 1
          },

          {
            id: 1,
            name: "ZY01",
            start_flag: 7,
            start_length: 300,
            line_type: 2
          },
          {
            id: 2,
            name: "ZY02",
            start_flag: 3,
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
            start_flag: 8,
            start_length: 300,
            line_type: 1
          },
          {
            id: 1,
            name: "R",
            start_flag: 4,
            start_length: 232,
            line_type: 1
          },
          {
            id: 1,
            name: "Y",
            start_flag: 1,
            start_length: 300,
            line_type: 2
          },
          {
            id: 1,
            name: "Y",
            start_flag: 6,
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
                startLineX - 16,
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
                startLineX - 16,
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
      let that = this;
      function drawAxesApply(jsonData) {
        let json1 = jsonData;
        let json = [
          {
            line_type: 1,
            number: "A4-2-007-1",
            command_num: "(2020)\u5b57\u7b2c04.21-007-2",
            description: "\u98ce\u98ce\u5149\u5149",
            work_area: "DK14+130\u81f3DK42+410",
            start_time: "2020-04-28 00:00:00",
            end_time: "2020-04-28 23:59:59",
            start_flag: "1",
            start_length: "804",
            end_flag: "4",
            end_length: "232",
            type: "A4",
            start_total: 14600,
            end_total: 26410
          },
          {
            line_type: 1,
            number: "A3-2-007-1",
            command_num: "(2020)\u5b57\u7b2c04.21-007-2",
            description: "\u98ce\u98ce\u5149\u5149",
            work_area: "DK14+160\u81f3DK21+370",
            start_time: "2020-04-28 00:00:00",
            end_time: "2020-04-28 23:59:59",
            start_flag: "6",
            start_length: "736",
            end_flag: "9",
            end_length: "808",
            type: "A3",
            start_total: 14600,
            end_total: 21370
          },
          {
            line_type: 2,
            number: "A3-2-007-1",
            command_num: "(2020)\u5b57\u7b2c04.21-007-2",
            description: "\u98ce\u98ce\u5149\u5149",
            work_area: "DK14+160\u81f3DK21+370",
            start_time: "2020-04-28 00:00:00",
            end_time: "2020-04-28 23:59:59",
            start_flag: "6",
            start_length: "736",
            end_flag: "9",
            end_length: "808",
            type: "A3",
            start_total: 14600,
            end_total: 21370
          }
        ];
        let clickXYApplyList = [];
        for (let i = 0; i < json.length; i++) {
          let start =
            parseInt(json[i].start_flag) * 1000 +
            parseInt(json[i].start_length);
          let end =
            parseInt(json[i].end_flag) * 1000 + parseInt(json[i].end_length);
          let dksatrt =
            "YDK" + json[i].start_flag + " +" + json[i].start_length;
          let dkend = "YDK" + json[i].end_flag + " +" + json[i].end_length;
          let startX = (start - lineTypeMinMileage) * every;
          let endX = (end - lineTypeMinMileage) * every;
          let centerX = (endX + startX) / 2; //开始结束平均值
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
            //画水平直线
            context.fillRect(startX, axis_Applay.y - 8, 2, 15);
            context.fillRect(endX, axis_Applay.y - 8, 2, 15);
            context.moveTo(startX, axis_Applay.y);
            context.lineTo(endX + 1, axis_Applay.y);
            //文字
            clickXYApplyList.push({
              x: centerX - 32,
              y: axis_Applay.y - 30,
              w: 60,
              h: 54,
              i: json[i]
            });
            let img = new Image();
            img.src = require("@/assets/image/" + desc + ".png");
            img.onload = function() {
              context.drawImage(img, centerX - 32, axis_Applay.y - 56, 60, 54);
            };
          } else if (json[i].line_type == 2) {
            //画水平直线
            context.fillRect(startX, axis_Applay_two.y - 8, 2, 15);
            context.fillRect(endX, axis_Applay_two.y - 8, 2, 15);
            context.moveTo(startX, axis_Applay_two.y);
            context.lineTo(endX + 1, axis_Applay_two.y);
            //文字
            clickXYApplyList.push({
              x: centerX - 32,
              y: axis_Applay_two.y - 30,
              w: 60,
              h: 54,
              i: json[i]
            });
            let img = new Image();
            img.src = require("@/assets/image/" + desc + ".png");
            img.onload = function() {
              context.drawImage(
                img,
                centerX - 32,
                axis_Applay_two.y - 56,
                60,
                54
              );
            };
          }
          context.stroke();
          //
        }
        canvas.addEventListener(
          "dblclick",
          function(event) {
            var x = event.pageX - canvas.getBoundingClientRect().left;
            var y = event.pageY - canvas.getBoundingClientRect().top;
            console.log("clickXY：" + JSON.stringify(clickXYApplyList));
            for (let item of clickXYApplyList) {
              if (
                x >= item.x &&
                x <= item.x + item.w &&
                y >= item.y &&
                y <= item.y + item.h
              ) {
                let infos = item.i;
                that
                  .$confirm(
                    "<p style='color:#4b6eca;padding-left:20px'><span style='color:#1d397a'>作业编号：</span>" +
                      infos.number +
                      "</p><p style='color:#4b6eca;padding-left:20px'><span style='color:#1d397a'>作业令号</span>：" +
                      infos.command_num +
                      "</p>" +
                      "<p style='color:#4b6eca;padding-left:20px'><span style='color:#1d397a'>开始时间：</span>" +
                      infos.start_time +
                      "</p><p style='color:#4b6eca;padding-left:20px'><span style='color:#1d397a'>结束时间：</span>" +
                      infos.end_time +
                      "</p>" +
                      "<p style='color:#4b6eca;padding-left:20px'><span style='color:#1d397a'>施工区间：</span>" +
                      infos.work_area +
                      "</p><p style='color:#4b6eca;padding-left:20px'><span style='color:#1d397a'>施工内容：</span>" +
                      infos.description +
                      "</p>",
                    {
                      distinguishCancelAndClose: true,
                      dangerouslyUseHTMLString: true,
                      showCancelButton: false,
                      showConfirmButton: false
                    }
                  )
                  .catch(() => {});
                break;
              }
            }
          },
          false
        );
      }
      //
      drawAxesLine(this.lineTypeList);
      drawAxesStationList(this.stationList);
      drawAxesCar(this.applyList);
      drawAxesPeple(this.applyList);
      drawAxesApply(this.applyList);
      //
    }
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

.station {
  margin: 30px 30px 0px 30px;
  position: relative;
  z-index: 999; 
}

.clear {
  clear: both;
}
/* //#27DB07 */
</style>

