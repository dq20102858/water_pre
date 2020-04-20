<template>
  <div id="progress" ref="proWrapper">
    <div class="progress">
      <div class="sttitle">施工形象进度图</div>
      <div class="station">
        <canvas id="canvasStation" height="480" ref="canvasStation">
          <p>您的系统不支持此程序!</p>
        </canvas>
      </div>
      <div class="linebox">
        <table class="lineTable">
          <tr
            class="linebar"
            v-for="item in listSchedule"
            :key="item.id"
            v-if="item.lines.name !=''"
          >
            <td>
              <div class="tdtitle">{{item.name}}</div>
            </td>
            <td class="tdbar">
              <div class="bar" v-for="lines in item.lines" :key="lines.id">
                <span>{{lines.name}}</span>
                <em :style="{width: cwidth + 'px' }" v-html="lineFill(lines.lists)">
                  <!-- <i v-for="lists in lines.lists" :key="lists.id" :style="{{lineFill(lists.start_flag)}}"></i> -->
                </em>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <!-- <div class="linebox">
        <div
          class="linebar"
          v-for="item in listSchedule"
          :key="item.id"
          v-if="item.lines.name !=''"
        >
          <div class="title">{{item.name}}</div>
          <div class="bar" v-for="lines in item.lines" :key="lines.id">
            <span>{{lines.name}}</span>
            <em :style="{width: cwidth + 'px' }" v-html="lineFill(lines.lists)">
             <i v-for="lists in lines.lists" :key="lists.id" :style="{{lineFill(lists.start_flag)}}"></i> 
            </em>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cwidth: 0,
      stationList: [],
      lineTypeList: [],
      listSchedule: [],
      minMileage: 0,
      every: 0
    };
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
          this.lineTypeList = data.data.line_types;
          this.listSchedule = data.data.datas;
          this.getStationList();
          //  this.getLineType();
        }
      });
    },

    getStationList() {
      let clientWidth = this.$refs.proWrapper.clientWidth;
      let canvasWidth = clientWidth - 330;
      this.cwidth = canvasWidth;
      console.log("canvasWidth：" + canvasWidth);
      const canvas = this.$refs.canvasStation;
      let cansText = canvas.getContext("2d");
      canvas.width = canvasWidth;

      cansText.moveTo(0, 250);
      cansText.lineTo(canvasWidth, 250);
      cansText.strokeStyle = "#B4D3E5";
      cansText.lineWidth = 10;
      cansText.stroke();
      cansText.moveTo(0, 300);
      cansText.lineTo(canvasWidth, 300);
      cansText.stroke();

      //起终点里程
      // cansText.lineWidth = 3;
      // cansText.moveTo(0, 245);
      // cansText.lineTo(0, 380);
      // cansText.stroke();
      //Station=====================Station
      let json = this.stationList;
      //console.log(JSON.stringify(json))
      //找到最大数与最小数
      let first = json[0];
      let end = json[0];
      for (let i = 1; i < json.length; i++) {
        let tmp = json[i];
        if (first.start_flag > tmp.start_flag) first = tmp;
        if (end.start_flag < tmp.start_flag) end = tmp;
      }

      // 总里程（最大数 - 最小数)
      let mileage =
        (end.start_flag - first.start_flag) * 1000 +
        end.start_length -
        first.start_length;
      console.log("总里程mileage：" + mileage);
      this.minMileage = first.start_flag * 1000 + first.start_length; //最小里程
      console.log("最小里程minMileage：" + this.minMileage);
      //每米长度等于px
      let every = (parseInt(canvasWidth - 30) / mileage).toFixed(5);
      this.every = every;
      console.log("每米长度every：" + every);
      //
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
          // 计算当前站点的x轴
          let startX = total * every;
          // 粗线向右移动了100像素，所以需要修正x轴
          if (i == 0) start = startX; //从左侧126像素开始绘制
          //console.log("startX：" + parseInt(startX - start) );
          cansText.drawImage(img, startX - start, 126, 22, 120);
          //站名
          cansText.font = "16px Microsoft Yahei";
          cansText.fillStyle = "#0AE39A";
          let origin = json[i].name.split("");
          for (let x = 0; x < origin.length; x++) {
            cansText.fillText(
              origin[x],
              startX - start + 2,
              138 - origin.length * 19 + 19 * x
            );
          }
          //DK
          let codes = "DK" + json[i].start_flag + " +" + json[i].start_length;
          cansText.fillStyle = "#fff";
          cansText.font = "12px  Microsoft Yahei";
          cansText.fillTextVertical(codes, startX - start + 20, 165);
        }
      };

      //Line=====================line
      let lineJson = this.lineTypeList;
      console.log("lineJson:" + JSON.stringify(lineJson));
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
        if (lineJson[i].id == 1) {
          cansText.fillText(tfrom, 0, 270);
          cansText.fillText(tend, parseInt(endLength + canvasWidth - 112), 270);
        } else if (lineJson[i].id == 2) {
          cansText.fillText(tfrom, 0, 320);
          cansText.fillText(tend, parseInt(endLength + canvasWidth - 122), 320);
          //3
        } else if (lineJson[i].id == 3) {
          let starttotal =
            parseInt(lineJson[i].start_flag) * 1000 +
            parseInt(lineJson[i].start_length);
          if (starttotal == 0) {
            starttotal = this.minMileage;
          }
          let endtotal =
            parseInt(lineJson[i].end_flag) * 1000 +
            parseInt(lineJson[i].end_length);
          let startZB = (starttotal - this.minMileage) * every + 10;
          let endZB =
            parseFloat((endtotal - starttotal) * every) + parseFloat(startZB);
          console.log("start_total：" + starttotal + "-" + startZB);
          console.log(
            "end_total：" +
              endtotal +
              "-" +
              (parseFloat(startZB) + parseFloat(endZB))
          );
          cansText.moveTo(startZB, 350);
          cansText.lineTo(endZB, 350);
          cansText.stroke();
          //
          cansText.fillText(tfrom, startZB, 370);
          cansText.fillText(tend, endZB - 50, 370);
          //4
        } else if (lineJson[i].id == 4) {
          let starttotal =30000;
          //  parseInt(lineJson[i].start_flag) * 1000 +
           // parseInt(lineJson[i].start_length);

          let endtotal =35000;
         //   parseInt(lineJson[i].end_flag) * 1000 +
        //    parseInt(lineJson[i].end_length);
          let startZB = (starttotal - this.minMileage) * every + 10;
          let endZB =
            parseFloat((endtotal - starttotal) * every) + parseFloat(startZB);
          console.log("start_total4：" + starttotal + "-" + startZB);
          console.log("end_total4：" + endtotal + "-" + endZB);
          cansText.moveTo(startZB, 400);
          cansText.lineTo(endZB, 400);
          cansText.stroke();
          //
          cansText.fillText(tfrom, startZB, 420);
          cansText.fillText(tend, endZB - 50, 420);
        }
      }
      //
    },
    lineFill: function(paras) {
      let result = "";
      let start = 0;
      for (let i = 0; i < paras.length; i++) {
        let starMileage =
          parseInt(paras[i].start_flag) * 1000 +
          parseInt(paras[i].start_length);
        let endMileage =
          parseInt(paras[i].end_flag) * 1000 + parseInt(paras[i].end_length);
        let leftPosition =
          parseInt(starMileage - this.minMileage) * this.every + 10;
        let widthPosition = parseInt(endMileage - starMileage) * this.every;
        // console.log("starNum:" + starMileage + " endNum:" + endMileage);
        // console.log(
        //   "leftPosition:" + leftPosition + " widthPosition:" + widthPosition
        // );
        result +=
          "<i style='width:" +
          widthPosition +
          "px;left:" +
          leftPosition +
          "px'>";
      }
      return result;
    }
  },
  mounted() {
    window.addEventListener("resize", this.getProjectProcessMap);
  },
  destroyed() {
    window.removeEventListener("resize", this.getProjectProcessMap);
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
}
.linebox {
  margin-left: 30px;
  margin-right: 100px;
  border-top: 0;
}
/* lineTable */
.lineTable {  background: #102843;
  width: 100%;
  border: 1px #fff solid;
  overflow: hidden;
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
.tdbar {
  height: 18px;
  overflow: hidden;
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
  width: 68px;
  float: left;
  text-align: center;
  height: 20px;
  line-height: 18px;
}
.tdbar .bar em {
  height: 20px;
  background: #081c33;
  display: inline-block;
  position: relative;
}
.tdbar .bar em i {
  position: absolute;
  top: 0;
  background: #27db07;
  height: 18px;
  display: inline-block;
}
/* //#27DB07 */

</style>

