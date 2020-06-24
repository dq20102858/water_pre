<template>
  <div id="progress" ref="proWrapper" :style="conheight">
    <div class="progress">
      <div class="sttitle">施工形象进度图</div>
      <div class="station">
        <div :style="{height:stationlineHeight  + 'px'}" class="stationlineleft"></div>
        <div :style="{height:stationlineHeight  + 'px'}" class="stationlineright"></div>
        <canvas id="canvasStation" height="400" ref="canvasStation">
          <p>您的系统不支持此程序!</p>
        </canvas>
      </div>
      <div class="linebox" ref="reflinebox">
        <table class="lineTable">
          <tr class="linebar" v-for="item in listSchedule" :key="item.id">
            <td>
              <div class="tdtitle" :title="item.name">{{item.name}}</div>
            </td>
            <td class="tdbar">
              <div class="bar" v-for="lines in item.lines" :key="lines.id">
                <span>{{lines.name}}</span>
                <em :style="{width: cwidth + 'px' }" v-html="lineFill(lines.lists,lines.name)">
                  <!-- <i v-for="lists in lines.lists" :key="lists.id" :style="{{lineFill(lists.start_flag)}}"></i> -->
                </em>
              </div>
            </td>
          </tr>
        </table>
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
      lineTypeOutMinMileage: 0
    };
  },

  updated() {
    this.getStationList();
    this.stationlineHeight = 188 + this.$refs.reflinebox.offsetHeight;
  },
  created() {
    this.getProjectProcessMap();
  },
  methods: {
    getProjectProcessMap() {
      this.request({
        url: "/project/projectProcessMap",
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
          this.listSchedule = data.data.datas;
        }
      });
    },

    getStationList() {
      let clientWidth = this.$refs.proWrapper.clientWidth;
      let canvasWidth = clientWidth - 270;
      this.cwidth = canvasWidth - 10;
      let lineTypeBetwentMileage =
        this.lineTypeMaxMileage - this.lineTypeMinMileage;
      let lineTypeTotalMileage =
        this.lineTypeMaxMileage + this.lineTypeMinMileage;
      this.everyLineType = (
        parseInt(this.cwidth) / lineTypeBetwentMileage
      ).toFixed(5);
      this.every = (parseInt(canvasWidth) / lineTypeBetwentMileage).toFixed(5);
      // console.log("cwidth" + this.cwidth + "_" + this.everyLineType);

      const canvas = this.$refs.canvasStation;
      let cansText = canvas.getContext("2d");
      canvas.width = canvasWidth;

      cansText.moveTo(9, 220);
      cansText.lineTo(canvasWidth, 220);
      cansText.strokeStyle = "#fff";
      cansText.lineWidth = 10;
      cansText.stroke();
      cansText.moveTo(9, 270);
      cansText.lineTo(canvasWidth, 270);
      cansText.stroke();

      //Station=====================Station
      let json = this.stationList;
      let lineTypeMinMileage = this.lineTypeMinMileage;
      let lineTypeMaxMileage = this.lineTypeMaxMileage;
      let every = this.every; //每米长度等于px
      //console.log("every：" + every);
      //
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
          cansText.drawImage(img, startLineX, 126, 18, 90);
          let endLineX = lineTypeMaxMileage - total;
          // //站名
          cansText.font = "18px Microsoft Yahei";
          cansText.fillStyle = "#fff";
          let origin = json[i].name.split("");
          for (let x = 0; x < origin.length; x++) {
            cansText.fillText(
              origin[x],
              startLineX,
              138 - origin.length * 20 + 20 * x
            );
          }
          //DK
          let codes = "DK" + json[i].start_flag + " +" + json[i].start_length;
          cansText.fillStyle = "#5f88f9";
          cansText.font = "12px  Microsoft Yahei";
          if (endLineX < 400) {
            cansText.fillTextVertical(codes, startLineX - 1, 156);
          } else {
            cansText.fillTextVertical(codes, startLineX + 15, 156);
          }

          console.log(endLineX);
        }
      };
      //Line=====================
      let lineJson = this.lineTypeList;
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
        let startLength = cansText.measureText(tfrom).width,
          endLength = cansText.measureText(tend).width;

        cansText.font = "12px Microsoft Yahei";
        cansText.fillStyle = "#E8C640";
        let starttotal =
          parseInt(lineJson[i].start_flag) * 1000 +
          parseInt(lineJson[i].start_length);
        let endtotal =
          parseInt(lineJson[i].end_flag) * 1000 +
          parseInt(lineJson[i].end_length);
        if (lineJson[i].id == 1) {
          cansText.fillText(tfrom, 15, 240);
          cansText.fillText(tend, parseInt(endLength + canvasWidth - 115), 240);
        } else if (lineJson[i].id == 2) {
          cansText.fillText(tfrom, 15, 290);
          cansText.fillText(tend, parseInt(endLength + canvasWidth - 125), 290);
          //3
        } else if (lineJson[i].id == 3) {
          if (starttotal == 0) {
            starttotal = this.lineTypeMinMileage;
          }
          let startZB = (starttotal - this.lineTypeMinMileage) * every + 9;
          let endZB =
            parseFloat((endtotal - starttotal) * every) + parseFloat(startZB);
          cansText.moveTo(startZB, 320);
          cansText.lineTo(endZB, 320);
          cansText.stroke();
          //
          cansText.fillText(tfrom, startZB + 5, 340);
          cansText.fillText(tend, endZB - 60, 340);
          //4
        } else if (lineJson[i].id == 4) {
          let startZB = (starttotal - this.lineTypeMinMileage) * every + 10;
          let endZB =
            parseFloat((endtotal - starttotal) * every) + parseFloat(startZB);
          cansText.moveTo(startZB, 370);
          cansText.lineTo(endZB, 370);
          cansText.stroke();
          //
          let beteew = endZB - startZB;
          if (beteew < 160) {
            cansText.fillText(tfrom, startZB - 160, 390);
            cansText.fillText(tend, endZB - 80, 390);
          } else {
            cansText.fillText(tfrom, startZB, 390);
            cansText.fillText(tend, endZB - 55, 390);
          }
        }
      }
      //
    },
    lineFill: function(paras, linename) {
      // paras = [
      //   {
      //     id: 69,
      //     pro_id: 65,
      //     pro_name:
      //       "\u91cc\u7a0b\u4f5c\u4e1a0424\u4f5c\u4e1a\u540d\u79f0\u4f5c\u4e1a\u540d\u79f0\u4f5c\u4e1a\u540d\u79f0",
      //     line_type: 3,
      //     start_flag: "12",
      //     start_length: "400",
      //     end_flag: "18",
      //     end_length: "600"
      //   }
      // ];
      let result = "";
      let start = 0;
      for (let i = 0; i < paras.length; i++) {
        let starMileage =
          parseInt(paras[i].start_flag) * 1000 +
          parseInt(paras[i].start_length);
        let endMileage =
          parseInt(paras[i].end_flag) * 1000 + parseInt(paras[i].end_length);
        let leftPosition =
          parseFloat(starMileage - this.lineTypeMinMileage) *
          this.everyLineType;
        let widthPosition =
          parseFloat(endMileage - starMileage) * this.everyLineType;

        // if (linename == "入场线") {
        //   let enterMinMileage = this.lineTypeEnterMinMileage;
        //   if (enterMinMileage == 0) {
        //      leftPosition =parseFloat(starMileage - this.lineTypeMinMileage) *this.everyLineType;
        //      widthPosition =parseFloat(endMileage - starMileage) * this.everyLineType;
        //   }
        //   else{
        //      leftPosition =parseFloat(starMileage - this.lineTypeEnterMinMileage) *this.everyLineType;
        //      widthPosition =parseFloat(endMileage - starMileage) * this.everyLineType;
        //   }
        if (starMileage == 0) {
          leftPosition = 0;
          widthPosition =
            parseFloat(endMileage - this.lineTypeMinMileage) *
            this.everyLineType;
        }
        let titles =
          "DK " +
          paras[i].start_flag +
          "+" +
          paras[i].start_length +
          "~" +
          paras[i].end_flag +
          "+" +
          paras[i].end_length;
        result +=
          "<i title='" +
          titles +
          "' style='width:" +
          widthPosition +
          "px;left:" +
          leftPosition +
          "px'></i>";
      }
      return result;
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
@media (max-width: 1024px) {
  #progress {
    width: 1024px;
  }
}
.station {
  margin: 50px 0px 0px 230px;
  position: relative;
  z-index: 999;
}
.stationlineleft {
  min-height: 188px;
  width: 1px;
  background: #fff;
  position: absolute;
  left: 8px;
  top: 215px;
  z-index: 1000;
}
.stationlineright {
  min-height: 188px;
  width: 1px;
  background: #fff;
  position: absolute;
  right: 40px;
  top: 215px;
  z-index: 1000;
}
.linebox {
  margin-left: 30px;
  margin-right: 40px;
  border-top: 0;
  overflow: hidden;
  clear: both;
}
/* lineTable */
.lineTable {
  width: 100%;
  border: 1px #fff solid;
  border-collapse: collapse;
}
.lineTable td {
  color: #fff;
  border: 1px solid #fff;
}
.lineTable .tdtitle {
  text-align: center;
  overflow: hidden;
  height: 18px;
  padding-left: 5px;
  width: 125px;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tdbar .bar {
  border-bottom: 1px solid #fff;
  height: 18px;
  overflow: hidden;
}
.tdbar .bar:last-child {
  border-bottom: 0;
}

.tdbar .bar span {
  font-size: 12px;
  color: #fff;
  width: 78px;
  float: left;
  line-height: 18px;
  text-align: center;
  border-right: 0px #fff solid;
}
.tdbar .bar em {
  height: 20px;
  display: inline-block;
  position: relative;
  overflow: hidden;
}
.tdbar .bar em i {
  position: absolute;
  top: 0;
  background: #27db07;
  height: 18px;
  display: inline-block;
  overflow: hidden;
}
.tdbar .bar em i:first-child {
  border-left: 0;
}
.tdbar .bar em i:last-child {
  border-left: 0;
}
.clear {
  clear: both;
}
/* //#27DB07 */
</style>

