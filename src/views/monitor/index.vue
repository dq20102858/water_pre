<template>
  <div id="progress">
    <div class="station-top">
      <div class="startend">
        <div class="sleft">
          {{firstStation}}方向
          <i class="line-a"></i>
        </div>
        <div class="sright">
          {{lastStation}}方向
          <i class="line-b"></i>
        </div>
      </div>
      <div class="stations">
        <i class="el-icon-arrow-left" @click="leftMove"></i>
        <div class="item" :style="{width:scrollwidth  + 'px'}">
          <ul :style="{width: stationList.length * 100 + 'px','margin-left': wdpx * 100 + 'px'}">
            <li v-for="item in stationList" :key="item.id">{{item.name}}</li>
          </ul>
        </div>
        <i class="el-icon-arrow-right" @click="rightMove"></i>
      </div>
    </div>
    <div class="main-canvas">
      <div
        class="group-canvas"
      @mousedown="touchStart($event)"
        v-on:mousedown="touchMove($event)"
      
      >
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
      every: 1
    };
  },
  created() {
    this.getProjectProcessMap();
  },
  mounted() {},
  methods: {
    touchStart(e) {
       var x = e.clientX;
      console.log("start:"+x);
    },
    touchMove(e) {
     
      var x = e.clientX;
      console.log("move：" + x);
    },
    touchEnd(e) {
    
      console.log("end");
    },
    getProjectProcessMap() {
      this.request({
        url: "/monitor/getMointorDatas",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
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
          this.scrollwidth = document.documentElement.clientWidth - 380;
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
          context.fillText(origin, startX + 90, 55);
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
    },
    //top
    leftMove() {
      if (this.wdpx < 0) {
        this.wdpx += 1;
      }
    },
    rightMove() {
      if (this.wdpx > -(this.stationList.length + this.wdpx)) {
        this.wdpx -= 1;
      }
    }
    //
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.scrollwidth = document.documentElement.clientWidth - 380;
    });
  }
};
</script>

<style>
#progress {
  background: #081c33;
  height: 100vh;
}

.group-canvas {
  overflow-x: scroll;
  overflow-y: hidden;
  height: 580px;
  padding-right: 100px;
}

.station-top {
  margin: 0 40px;
}
.startend {
  padding-top: 40px;
  overflow: hidden;
}
.startend div {
  background: #4b6eca;
  color: #fff;
  padding: 15px 15px;
  display: block;
  font-size: 18px;
}
.startend .sleft {
  float: left;
}
.startend .sright {
  float: right;
  margin-right: 10px;
}
.startend .line-a {
  position: relative;
  background: #fff;
  height: 1px;
  display: block;
  margin-top: 10px;
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
  margin-top: 10px;
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
  padding-top: 30px;
  margin-bottom: 50px;
}
.stations .item {
  width: 900px;
  overflow: hidden;
  display: inline-block;
  white-space: nowrap;
}
.stations ul li {
  display: inline-block;
  background: #4b6eca;
  color: #fff;
  padding: 10px 15px;
  margin-left: 15px;
  cursor: pointer;
}
.stations ul li:hover {
  background: #2359e2;
}
.stations i {
  display: inline-block;
  background: #3062e2;
  color: #fff;
  padding: 8px 15px;
  font-size: 20px;
  vertical-align: top;
  cursor: pointer;
}
.stations i:hover {
  background: #2359e2;
}
/* //#27DB07 */
</style>