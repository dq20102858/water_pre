<template>
  <div id="progress" ref="proWrapper">
    <div class="station">
      <canvas id="canvasStation" height="380" ref="canvasStation">
        <p>您的系统不支持此程序!</p>
      </canvas>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      //每米长度等于1px
      let every = 0.5;
      this.every = every;
      console.log("每米长度every：" + every);
      let canvasWidth = mileage/2;
      //canvas
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
          if (i == 0) start = startX - 200;
          //console.log("startX：" + parseInt(startX - start) );
          cansText.drawImage(img, startX - start, 126, 22, 120);
          //站名
          cansText.font = "bold 18px Microsoft Yahei";
          cansText.fillStyle = "#0AE39A";
          let origin = json[i].name;
          cansText.fillText(origin, startX - start - 2, 95);
          //DK
          let codes = "DK" + json[i].start_flag + " +" + json[i].start_length;
          cansText.fillStyle = "#fff";
          cansText.font = "12px  Microsoft Yahei";
          cansText.fillText(codes, startX - start, 115);
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

      // console.log(lineData);

      let startLength = cansText.measureText(from0).width,
        endLength = cansText.measureText(end0).width,
        n0Length = cansText.measureText(name0).width,
        n1Length = cansText.measureText(name1).width;

      cansText.font = "12px Microsoft Yahei";
      cansText.fillStyle = "#E8C640";

      cansText.fillText(from0, 50, 270);
      cansText.fillText(name0, 5, 270);
      cansText.fillText(end0, parseInt(endLength + canvasWidth - 120), 320);
      cansText.fillText(from1, 50, 320);
      cansText.fillText(name1, 5, 320);
      cansText.fillText(end1, parseInt(endLength + canvasWidth - 120), 270);
      //
    }
  },
  mounted() {
    window.addEventListener("resize", this.getProjectProcessMap);
  },
  destroyed() {
    window.removeEventListener("resize", this.getProjectProcessMap);
  }
};
</script>
<style>
#progress {
  background: #081c33;
  height: 100vh;
}

.station {
  margin: 100px 0 0 100px;
  overflow-x: scroll;
  height: 480px;
}

/* //#27DB07 */
</style>