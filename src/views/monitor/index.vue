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
    <div class="main-canvas">
      <div class="group-canvas scrollbar">
        <canvas id="mycanvas" height="580" ref="mycanvas">
          <p>您的系统不支持此程序!</p>
        </canvas>
      </div>
      <div class="stations-select">
        <el-checkbox
          v-model="bridgeCheckValue"
          class="bridgechk"
          @change="bridgeCheckSelect"
          label="桥"
          border
        ></el-checkbox>
        <el-checkbox v-model="tunnelCheckValue" class="tunnelchk" @change="tunnelCheckSelect" label="隧道" border></el-checkbox>
        <el-checkbox
          v-model="speedCheckValue"
          class="speedchk"
          @change="speedCheckSelect"
          label="限速区"
          border
        ></el-checkbox>
        <el-checkbox v-model="alertCheckValue" @change="alertCheckSelect" label="防区" border></el-checkbox>
        <el-checkbox v-model="checked5" label="道岔" border></el-checkbox>
        <el-checkbox v-model="checked6" label="坡度" border></el-checkbox>
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
      every: 0.5,
      bridgeCheckValue: true,
      bridgeList: [],
      tunnelCheckValue: true,
      tunnelList: [],
      speedCheckValue: true,
      speedList: [],
      alertCheckValue: true,
      checked5: true,
      checked6: true
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
          //桥 隧道等
          this.bridgeList = data.data.bridge_lists; //桥
          this.speedList = data.data.speed_lists; //限速区
          this.initCanvas();
          //  this.getLineType();
        }
      });
    },

    initCanvas() {
      //坐标轴宽度高度
      let axis_Width = this.totalMileage / 2 + 600;
      let axis_Height = "580";
      //标尺起点
      let axis_Origin = {
        x: 100,
        y: axis_Height - 350
      };
      let axis_Origin_Two = {
        x: 100,
        y: axis_Height - 150
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
        context.strokeStyle = "#27DB07";
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
        let json1 = bridgeListJson;
        let json = [
          {
            id: 7,
            name: "桥的名称桥的名称",
            line_type: 1,
            start_flag: 14,
            start_length: 200,
            end_flag: 14,
            end_length: 800
          },
          {
            id: 7,
            name: "桥的名称",
            line_type: 2,
            start_flag: 14,
            start_length: 200,
            end_flag: 15,
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

          // console.log(
          //   "startX：" +
          //     startX +
          //     " endX：" +
          //     endX +
          //     " centerX：" +
          //     centerX +
          //     " betweenMeters：" +
          //     betweenMeters
          // );
          
          context.lineWidth = 1;
         context.fillStyle = "#ffa918";
          context.strokeStyle = "#ffa918"; 
          let desc = json[i].name + " 共" + betweenMeters + "米";
          let codes = "DK" + json[i].start_flag + " +" + json[i].start_length +" ~ "+ "DK" + json[i].end_flag + " +" + json[i].end_length;
           if (json[i].line_type == 1) {
            //画垂直线
            context.fillRect(centerX + offsetX, axis_Origin.y +5, 2, 50);
            //画矩形
            context.strokeRect(startX + offsetX,  axis_Origin.y + 55,  betweenMeters * everys, 45 );
            // context.moveTo(startX + offsetX+30, axis_Origin.y + 55) //起点
            // context.lineTo(startX + offsetX, axis_Origin.y + 105) //终点
            // context.moveTo(endX + offsetX-30, axis_Origin.y + 55) //起点
            // context.lineTo(endX + offsetX, axis_Origin.y + 105) //终点
            // context.stroke();
            //文字
            context.font = "13px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_Origin.y +65);
            context.font = "11px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.fillText(codes, centerX + offsetX, axis_Origin.y +83);
          } else {
          
          //
            context.fillRect(centerX + offsetX, axis_Origin_Two.y +5, 2, 50);
            context.strokeRect(startX + offsetX,axis_Origin_Two.y + 55,betweenMeters * everys,45);
          //    context.moveTo(startX + offsetX+30, axis_Origin_Two.y + 60) //起点
          //   context.lineTo(startX + offsetX, axis_Origin_Two.y + 105) //终点
          //  context.moveTo(endX + offsetX-30, axis_Origin_Two.y + 60) //起点
          // context.lineTo(endX + offsetX, axis_Origin_Two.y + 105) //终点
          // context.stroke();
            //文字
             context.font = "13px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_Origin_Two.y + 65);
            context.font = "11px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.fillText(codes, centerX + offsetX, axis_Origin_Two.y +83);
          }
 
          //
        }
      }
       //绘隧道
      function drawTunnelAxis(tunnelListJson) {
        let json1 = tunnelListJson;
        let json = [
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
             start_flag: 15,
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

          console.log(
            "startX：" +
              startX +
              " endX：" +
              endX +
              " centerX：" +
              centerX +
              " betweenMeters：" +
              betweenMeters
          );
       
          context.lineWidth = 1;
        
          context.strokeStyle = "#18DBFF";     
          let desc = json[i].name + " 共" + betweenMeters + "米";
         let codes = "DK" + json[i].start_flag + " +" + json[i].start_length +" ~ "+ "DK" + json[i].end_flag + " +" + json[i].end_length;
            if (json[i].line_type == 1) {
           
            //画垂直线
             context.fillStyle = "#18DBFF";
            context.fillRect(startX + offsetX-1, axis_Origin.y -45, 2, 50);
             context.fillRect(endX + offsetX-1, axis_Origin.y -45, 2, 50);
            //画矩形
             
            context.fillRect(startX + offsetX-1,  axis_Origin.y - 90,  betweenMeters * everys+2, 45 );

            //   context.fillRect(100, 400, 500, 800);//填充矩形，有颜色填充，默认是黑色
            //文字
               context.fillStyle = "#fff";
            context.font = "13px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_Origin.y -80);
            context.font = "11px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.fillText(codes, centerX + offsetX, axis_Origin.y -62);
          } else {
  //画垂直线
          context.fillRect(centerX + offsetX, axis_Origin_Two.y -45, 2, 50);
              //画矩形
          context.strokeRect(startX + offsetX,axis_Origin_Two.y  -90,betweenMeters * everys,45);
            //文字
             context.font = "13px Microsoft Yahei";
            context.fillText(desc, centerX + offsetX, axis_Origin_Two.y -80);
            context.font = "11px Microsoft Yahei";
            context.fillStyle = "#fff";
            context.fillText(codes, centerX + offsetX, axis_Origin_Two.y -62);
          }
  context.stroke(); 
          //
        }
      }
      //绘制限速区
      function drawSpeedAxis(speedListJson) {
        let json1 = speedListJson;
        let json = [
          {
            id: 7,
            name: "\u9650\u901f",
            line_type: 1,
            start_flag: 14,
            start_length: 200,
            end_flag: 15,
            end_length: 400,
            speed: "5.00"
          },
          {
            id: 7,
            name: "\u9650\u901f",
            line_type: 2,
            start_flag: 16,
            start_length: 200,
            end_flag: 16,
            end_length: 600,
            speed: "5.00"
          },
          {
            id: 7,
            name: "\u9650\u901f",
            line_type: 1,
            start_flag: 30,
            start_length: 200,
            end_flag: 32,
            end_length: 200,
            speed: "5.00"
          }
        ];

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
          context.font = "14px Microsoft Yahei";
          let desc = json[i].name + json[i].speed + "公里/小时";
          context.beginPath();
          if (json[i].line_type == 1) {
            //画水平直线
            context.moveTo(startX + offsetX, axis_Origin.y);
            context.lineTo(endX + offsetX, axis_Origin.y);
            //文字
            context.fillText(desc, startX + 160, axis_Origin.y+35);
          } else {
            context.moveTo(startX + offsetX, axis_Origin_Two.y);
            context.lineTo(endX + offsetX, axis_Origin_Two.y);
            context.fillText(desc, startX + 160, axis_Origin_Two.y+35);
          }
          context.stroke();
          //
        }
      }
      //
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
    },
    //
    // =============桥 隧道 限速区 防区 道岔 坡度
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
    alertCheckSelect() {}
    //end 桥
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
  margin-bottom: 10px;
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
.stations-select {
  margin-top: 30px;
  text-align: center;
}
/* .stations-select .el-checkbox {
  margin-right: 0;
}
.stations-select .el-checkbox__label {
  color: #fff;
}
.stations-select .el-checkbox.is-bordered.is-checked {
  border-color: #27db07;
}
.stations-select .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #27db07;
}
.stations-select .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #27db07;
  border-color: #27db07;
} */

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
  border-color: #18DBFF !important;
}
.tunnelchk .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #18DBFF;
  border-color: #18DBFF;
}
.tunnelchk.is-checked .el-checkbox__label {
  color: #18DBFF;
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
</style>