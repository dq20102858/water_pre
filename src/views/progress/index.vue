<template>
  <div id="progress" ref="proWrapper">
    <div class="sttitle">施工形象进度图</div>

    <div class="station">
      <canvas id="canvasStation" height="380" ref="canvasStation">
        <p>您的系统不支持此程序!</p>
      </canvas>
    </div>
    <!-- <div class="canvasbox">
      <div style="position: relative;text-align: left;padding-left: 66px;">
        <canvas id="myCanvas" width="1000" height="400" style="border: 2px solid #ddd;">
          <p>您的系统不支持此程序!</p>
        </canvas>
        <div id="alertDataDiv">
          <span id="alertDataSpan"></span>
          <span class="lineStyle"></span>
        </div>
      </div>
    </div>-->
    <!-- <div class="ptable">
      <table>
        <tr>
          <td class="thone">1</td>
          <td colspan="2">2</td>
        </tr>
        <tr>
          <td rowspan="3" class="thone">1</td>
          <td>2</td>
          <td>2</td>
        </tr>
        <tr>
          <td class="thone">1</td>
          <td>2</td>
        </tr>
        <tr>
          <td class="thone">1</td>
          <td>2</td>
        </tr>
        <tr>
          <td rowspan="3" class="thone">1</td>
          <td>2</td>
          <td>2</td>
        </tr>
        <tr>
          <td class="thone">1</td>
          <td>2</td>
        </tr>
        <tr>
          <td class="thone">1</td>
          <td>2</td>
        </tr>
      </table>
    </div>-->

    <!-- <div id="imgDiv">
        <div id="img1Div">
          <img id="img1" src />
        </div>

        <div id="img2Div">
          <img id="img2" src />
        </div>
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      stationList: [],
      lineList: [],
      lineTypeList: [
        {
          id: 1,
          name: "左线",
          start_flag: 14,
          start_length: 100,
          end_flag: 42,
          end_length: 410
        },
        {
          id: 2,
          name: "右线",
          start_flag: 14,
          start_length: 100,
          end_flag: 42,
          end_length: 410
        },
        {
          id: 3,
          name: "入场线",
          start_flag: 0,
          start_length: 0,
          end_flag: 0,
          end_length: 0
        },
        {
          id: 4,
          name: "出场线",
          start_flag: 0,
          start_length: 0,
          end_flag: 0,
          end_length: 0
        }
      ]
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
          this.lineList = data.data.line_types;
          this.getStationList();
          //  this.getLineType();
        }
      });
    },
    getLineType() {
      //                 console.log(json);
      //起终点名称
      // window.mileageType = json.data.is_large_mileage;
      // window.projectFrom = json.data.from;
      // window.projectEnd = json.data.end;
      // window.rate = (1553 / (projectEnd - projectFrom)).toFixed(5); //作业施工显示图比率
      // $.get(webUrl.getline,
      //     function(json){
    },
    getStationList() {
      let clientWidth = this.$refs.proWrapper.clientWidth;
      let canvasWidth = clientWidth - 200;
      console.log("canvasWidth" + canvasWidth);
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
      cansText.lineWidth = 2;
      cansText.moveTo(0, 245);
      cansText.lineTo(0, 365);
      cansText.stroke();
      // cansText.moveTo(1729, 215);
      // cansText.lineTo(1729, 365);
      // cansText.stroke();

      //Station=====================Station
      let json = this.stationList.reverse();
      console.log(JSON.stringify(json));
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
      console.log("mileage：" + mileage);
      //每米长度
      let every = (canvasWidth / mileage).toFixed(5);
      console.log("每米长度：" + every);
      let img = new Image();
      img.src = require("@/assets/image/sta.png");

      img.onload = function() {
        let start = 0;
        for (let i = 0; i < json.length; i++) {
          // 绘制站点图
          //console.log(json[i].start_flag);
          let total =
            parseInt(json[i].start_flag) * 1000 +
            parseInt(json[i].start_length);
          //console.log("total：" + total);
          // 计算当前站点的x轴
          let startX = total * every;
          // 不知什么原因，粗线向右移动了100像素，所以需要修正x轴
          if (i == 0) start = startX - 126; //从左侧126像素开始绘制
          cansText.drawImage(img, startX - start, 126, 22, 120);
          //站名
          cansText.font = "16px Microsoft Yahei";
          cansText.fillStyle = "#0AE39A";
          let origin = json[i].name.split("");
          for (let x = 0; x < origin.length; x++) {
            cansText.fillText(
              origin[x],
              startX - start,
              138 - origin.length * 19 + 18 * x
            );
          }
          //DK
          let codes = "DK" + json[i].start_flag + " +" + json[i].start_length;
          cansText.fillStyle = "#fff";
          cansText.font = "12px  Microsoft Yahei";
          cansText.fillTextVertical(codes, startX - start - 3, 165);
        }
      };

      //Line=====================line
      let lineJson = this.lineTypeList;
      console.log("lineJson:" + lineJson);
      let lineData = [];
      for (let i = 0; i < lineJson.length; i++) {
        if (lineJson[i].name == "左线" || lineJson[i].name == "右线") {
          lineData.push(lineJson[i]);
        }
      }
      console.log("lineData:" + lineData);
      let from0 =
          "DK" + lineData[0].start_flag + "+" + lineData[0].start_length,
        end0 = "DK" + lineData[0].end_flag + "+" + lineData[0].end_length,
        from1 = "DK" + lineData[1].start_flag + "+" + lineData[1].start_length,
        end1 = "DK" + lineData[1].end_flag + "+" + lineData[1].end_length,
        name0 = lineData[0].name,
        name1 = lineData[1].name;

      // console.log(lineData);

      let startLength = cansText.measureText(from0).width,
        endLength = cansText.measureText(end0).width,
        n0Length = cansText.measureText(name0).width,
        n1Length = cansText.measureText(name1).width;

      cansText.font = "12px Microsoft Yahei";
      cansText.fillStyle = "#E8C640";

      cansText.fillText(from0, 60, 270);
      cansText.fillText(name0, 5, 270);
      cansText.fillText(end0, canvasWidth, 270);
      cansText.fillText(from1, 60, 320);
      cansText.fillText(name1, 5, 320);
      cansText.fillText(end1, 1693 - endLength, 290);
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
.sttitle{color: #fff; padding: 22px 0 0 25px;font-size: 24px;}
#progress {
  background: #081c33;
  height: 100vh;
}
.canvasbox {
  margin-left: 200px;
  margin-top: 300px;
  border-left: 3px #fff solid;
}
.station {
  margin: 100px;
}

.ptable {
  margin: 0px 100px 100px 100px;
}
.ptable table {
  border-collapse: collapse;
  width: 100%;
}
.ptable table td {
  border: 2px solid #fff;
  line-height: 30px;
  padding: 10px;
}
.ptable table .thone {
  width: 200px;
}
</style>