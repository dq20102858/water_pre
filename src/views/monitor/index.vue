<template>
  <div id="progress">
    <div class="main-canvas">
      <div class="group-canvas">
        <canvas id="mycanvas" height="480" ref="mycanvas">
          <p>您的系统不支持此程序!</p>
        </canvas>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stationList: [],
      minKM: 0,
      minMileage: 0,
      totalMileage: 0,
      every: 1
    };
  },
  created() {
    this.getProjectProcessMap();
  },
  mounted() {},
  methods: {
    getProjectProcessMap() {
      this.request({
        url: "/project/projectProcessMap",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.stationList = data.data.stations;
          let json = data.data.stations;
          //找到最大数与最小数
          let first = json[0];
          let end = json[0];
          for (let i = 1; i < json.length; i++) {
            let tmp = json[i];
            if (first.start_flag > tmp.start_flag) first = tmp;
            if (end.start_flag < tmp.start_flag) end = tmp;
          }
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
          this.initCanvas();
          //  this.getLineType();
        }
      });
    },

    initCanvas() {
      //坐标轴宽度高度
      let axis_Width = this.totalMileage / 2 + 600;
      let axis_Height = "480";
      //标尺起点
      let axis_Origin = {
        x: 100,
        y: axis_Height - 250
      };
      let axis_Origin_two = {
        x: 100,
        y: axis_Height - 50
      };
      //刻度的间隔
      let tick_Spacing = 100;
      //标记数值
      let num_Horizontal_Ticks = axis_Width / tick_Spacing;
      //刻度线高度
      let tick_Height = 8;

      //初始化
      let canvas = this.$refs.mycanvas;
      canvas.width = axis_Width;
      let context = canvas.getContext("2d");

      //开始
      function drawAxes() {
        context.save();
        context.lineWidth = 10;
        context.strokeStyle = "#27DB07";
        context.beginPath();
        context.moveTo(axis_Origin.x, axis_Origin.y);
        context.lineTo(axis_Width, axis_Origin.y);

        context.moveTo(axis_Origin_two.x, axis_Origin_two.y);
        context.lineTo(axis_Width, axis_Origin_two.y);
        context.stroke();

        //drawHorizontalAxis();

        drawHorizontalAxisTicks(axis_Origin.x, axis_Origin.y);
        drawHorizontalAxisTicks(axis_Origin_two.x, axis_Origin_two.y);
        context.restore();
      }
      // //画线
      // function drawHorizontalAxis() {
      //   context.strokeStyle = "#000";
      //   context.beginPath();
      //   context.moveTo(750, axis_Origin.y);
      //   context.lineTo(1000, axis_Origin.y);
      //   context.stroke();
      // }
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
      function drawAxisLabels(minkm, axis_Origin_X, axis_Origin_y) {
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "top";
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
      //画地铁站
      let json1 = this.stationList;
      let json = [
        { id: 1, name: "苏庙站", start_flag: 14, start_length: 100 },
        { id: 2, name: "钱桥站", start_flag: 15, start_length: 300 },
        { id: 3, name: "龙山梢站", start_flag: 16, start_length: 400 },
        { id: 4, name: "石门路", start_flag: 18, start_length: 450 },
        { id: 5, name: "盛岸站", start_flag: 19, start_length: 760 },
        { id: 6, name: "吴桥站", start_flag: 21, start_length: 370 },
        { id: 7, name: "北栅口三院站", start_flag: 22, start_length: 520 },
        { id: 8, name: "无锡火车站", start_flag: 23, start_length: 550 },
        { id: 9, name: "广瑞站", start_flag: 24, start_length: 870 },
        { id: 10, name: "靖海站", start_flag: 26, start_length: 110 },
        { id: 11, name: "东风站", start_flag: 27, start_length: 320 },
        { id: 12, name: "叙丰站", start_flag: 28, start_length: 320 },
        { id: 13, name: "太湖花园站", start_flag: 29, start_length: 370 },
        { id: 14, name: "新光路站", start_flag: 30, start_length: 720 },
        { id: 15, name: "旺庄路站", start_flag: 31, start_length: 650 },
        { id: 16, name: "黄山路站", start_flag: 33, start_length: 450 },
        { id: 17, name: "高浪东路站", start_flag: 34, start_length: 390 },
        { id: 18, name: "周泾巷站", start_flag: 35, start_length: 770 },
        { id: 19, name: "无锡新区站", start_flag: 37, start_length: 650 },
        { id: 20, name: "长江南路站", start_flag: 38, start_length: 940 },
        { id: 21, name: "硕放机场站", start_flag: 41, start_length: 200 },
        { id: 22, name: "车辆段", start_flag: 42, start_length: 410 }
      ];
      let every = 0.5; //每米长度等于px
      let minKm = this.minKM; //最小公里
      let img = new Image();
      img.src = require("@/assets/image/sta.png");
      img.onload = function() {
        let start = 0;
        for (let i = 0; i < json.length; i++) {
          // 绘制站点图
          let total =
            parseInt(json[i].start_flag) * 1000 +
            parseInt(json[i].start_length);
          console.log("total：" + total);
          // 计算当前站点的x轴坐标
          let startX = (total - parseInt(minKm * 1000)) * every;
          context.drawImage(img, startX + 89.5, 105, 22, 120);
          //站名
          context.font = "bold 24px Microsoft Yahei";
          context.fillStyle = "#fff";
          context.textAlign = "left";
          let origin = json[i].name;
          let lens = json[i].name.length;
          context.fillText(origin,  startX + 90, 55);
          //DK
          let codes = "DK" + json[i].start_flag + " +" + json[i].start_length;
          context.fillStyle = "#0AE39A";
          context.font = "14px Microsoft Yahei";
          context.fillText(codes, startX + 90, 85);
        }
      };

      //
      drawAxes();
      drawAxisLabels(this.minKM, axis_Origin.x, axis_Origin.y);
      drawAxisLabels(this.minKM, axis_Origin_two.x, axis_Origin_two.y);
    }

    //
  }
};
</script>

<style>
#progress {
  background: #081c33;
  height: 100vh;
}
.main-canvas {
}
.group-canvas {
  overflow-x: scroll;
  overflow-y: hidden;
  height: 580px;
  padding-right: 100px;
}

/* //#27DB07 */
</style>