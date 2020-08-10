<template>
  <div class="app-page-main">
    <div class="app-page-rows">
      <div class="app-page-rows-left"></div>
      <div class="app-page-rows-right">
        <div class="app-page-site">
          <div class="app-page-site-box">
            <div class="app-site">
              <div class="centerbox">
                <div class="items">
                  <div class="wbox box1"></div>
                  <canvas id="line1" class="line1"></canvas>
                </div>
                <div class="items">
                  <div class="wbox box2"></div>
                </div>
                <div class="items">
                  <div class="wbox box3"></div>
                </div>
                <div class="items">
                  <div class="wbox box4"></div>
                </div>
                <div class="items">
                  <div class="wbox box5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Createline } from "../../utils/liudong.js";
export default {
  data() {
    return {};
  },
  mounted() {
    this.lineDong();
  },
  
  methods: {
    lineDong() {
      var data = {
        time: 140, //运动速度
        mx: 0, //起点位置
        my: 6,
        ly: 6,
        canvas_w: 100,
        canvas_h: 12,
        color: "#51b9d4", //颜色
        vx: 4,
        vy: 0,
        line_w: 5,
        fx: "w",
        width: 10, //线长
        jiange: 5 //间隔
      };
      //debugger;
      var res = new Createline(data);
      res.begin("line1", data);
    }
    //
  }
};
</script>
<style>
.app-page-site {
  background: #24284d;
  height: calc(100vh - 100px);
}
.app-page-site-box {
  background: #24284d url("~@/assets/image/sitebg.png");
  background-repeat: no-repeat;
  height: 100vh;

  overflow-x: auto;
}
.main-top {
  padding: 30px 30px 0 30px;
  color: #fff;
  font-size: 20px;
}
.main-top .item span {
  background: #244177;
  color: #fff;
  border-radius: 3px;
  font-size: 16px;
  padding: 8px 10px;
  margin-right: 30px;
  cursor: pointer;
}
.app-site {
  position: relative;
  margin: 30px;
}
.app-site .centerbox {
  margin: 0 auto;
  margin-top: 400px;
  position: relative;
  width: 1000px;
  z-index: 99;
}
.app-site .items {
  width: 20%;
  float: left;
}
.app-site .wbox {
  margin: 0 auto;
  background-image: linear-gradient(to top, #28467b, #28467b, transparent);
  width: 70%;
  height: 128px;
  z-index: 999;
  border: 2px #3d6d95 solid; 
}
.app-site .box1 {
  left: 100px;
  top: 400px;
}
.app-site .box2 {
  left: 320px;
  top: 400px;
}
.app-site .box3 {
  left: 550px;
  top: 400px;
}
.app-site .box4 {
  left: 780px;
  top: 400px;
}
.app-site .box5 {
  left: 1000px;
  top: 400px;
}
.app-site .line {
  background: #163c57;
  height: 10px;
  position: absolute;
  z-index: 1;
}
.app-site .line1 {
  width: 100px;
  left: 150px;
  top: 60px;
  background: #163c57;
  height: 10px;
  position: absolute;
  border-radius: 3px;
}
</style>