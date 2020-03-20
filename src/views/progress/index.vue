<template>
  <div id="progress" ref="proWrapper">
    <div class="sttitle">施工形象进度图</div>

    <div class="station">
      <canvas id="canvasStation" height="380" ref="canvasStation">
        <p>您的系统不支持此程序!</p>
      </canvas>
    </div>
    <div class="linebar" v-for="item in listSchedule" :key="item.id">
      <div class="title">{{item.name}}</div>
      <div class="bar" v-for="lines in item.lines" :key="lines.id">
        <span>{{lines.name}}</span>
        <em :style="{width: cwidth + 'px' }" v-html="lineFill(lines.lists)">
          <!-- <i v-for="lists in lines.lists" :key="lists.id" :style="{{lineFill(lists.start_flag)}}"></i> -->
        </em>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cwidth:0,
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
          this.listSchedule=data.data.datas;
          this.getStationList();
          //  this.getLineType();
        }
      });
    },

    getStationList() {
      let clientWidth = this.$refs.proWrapper.clientWidth;
      let canvasWidth = clientWidth - 200;
      this.cwidth=canvasWidth;
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
        if (lineJson[i].name == "左线" || lineJson[i].name == "右线") {
          lineData.push(lineJson[i]);
        }
      }

      let from0 =
          "DK" + lineData[0].start_flag + "+" + lineData[0].start_length,
        end0 = "DK" + lineData[0].end_flag + "+" + lineData[0].end_length,
        from1 = "DK" + lineData[1].start_flag + "+" + lineData[1].start_length,
        end1 = "DK" + lineData[1].end_flag + "+" + lineData[1].end_length,
        name0 = lineData[0].name,
        name1 = lineData[1].name;

       console.log(lineData);

      let startLength = cansText.measureText(from0).width,
        endLength = cansText.measureText(end0).width,
        n0Length = cansText.measureText(name0).width,
        n1Length = cansText.measureText(name1).width;

      cansText.font = "12px Microsoft Yahei";
      cansText.fillStyle = "#E8C640";

      cansText.fillText(from0, 50, 270);
      cansText.fillText(name0, 5, 270);
      cansText.fillText(end0, parseInt( endLength+canvasWidth-120), 320);
      cansText.fillText(from1, 50, 320);
      cansText.fillText(name1, 5, 320);
      cansText.fillText(end1, parseInt( endLength+canvasWidth-120), 270);
      //Line=====================workline

      // let datas = [
      //   {
      //     name: "焊接1",
      //     lines: [
      //       {
      //         name: "左线1",
      //         lists: [
      //           {
      //             start_flag: "21",
      //             start_length: "370",
      //             end_flag: "22",
      //             end_length: "520"
      //           },
      //           {
      //             start_flag: "23",
      //             start_length: "300",
      //             end_flag: "23",
      //             end_length: "500"
      //           }
      //         ]
      //       },
      //       {
      //         name: "右线1",
      //         lists: [
      //           {
      //             start_flag: "30",
      //             start_length: "100",
      //             end_flag: "30",
      //             end_length: "500"
      //           },
      //           {
      //             start_flag: "33",
      //             start_length: "20",
      //             end_flag: "33",
      //             end_length: "400"
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // ];

      // this.listSchedule = datas;

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
  font-size: 24px; text-align: center;
}
#progress {
  background: #081c33;
  height: 100vh;
}

.station {
  margin: 50px 100px 0px 100px;
}

.linebar {
  overflow: hidden;
}
.linebar .title {
  margin-left: 102px;
  color: #fff;
  font-weight: 700;
  color: #fff;
}
.linebar .bar {
  margin-bottom: 10px;
}
.linebar .bar span {
  width: 96px;
  font-size: 12px;
  text-align: right;
  color: #fff;
  display: inline-block;
}
.linebar .bar em {
  border: 1px #27db07 solid;
  height: 10px;
  display: inline-block;
  position: relative;
}
.linebar .bar em i {
  position: absolute;
  top: 0;
  background: #27db07;
  height: 8px;
  display: inline-block;
}
/* //#27DB07 */
</style>