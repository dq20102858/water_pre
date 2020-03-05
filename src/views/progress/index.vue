<template>
  <div id="monitor">
    <!-- <a id="jumpBtn" href="http://train.ltrailways.com/web/workprogress/showchart3">
      <i id="jumpLogo"></i>
      <span>图表数据</span>
    </a>

    <a id="printBtn" href="#myCanvas" download="filename"></a>

    <a id="refreshBtn" onclick="javascript:location.reload();"></a> -->

    <div hidden style="color:#fff;">
      <div id="mileageFrom">0</div>
      <div id="mileageEnd">28493.059</div>
    </div>

    <div id="canvas-fa">
      <p style="font-size: 25px;margin:10px 0">施工形象进度图</p>

      <div id="canvasDiv">
        <div style="margin:30px 0 50px;text-align: left;padding-left: 45px;">
          <canvas id="canvasStation" width="1750" height="380">
            <p>您的系统不支持此程序!</p>
          </canvas>
        </div>

        <div style="position: relative;text-align: left;padding-left: 66px;">
          <canvas id="myCanvas" width="1704" height="400" style="border: 2px solid #ddd;">
            <p>您的系统不支持此程序!</p>
          </canvas>

          <div id="alertDataDiv">
            <span id="alertDataSpan"></span>
            <span class="lineStyle"></span>
          </div>
        </div>
      </div>

      <div id="imgDiv">
        <div id="img1Div">
          <img id="img1" src />
        </div>

        <div id="img2Div">
          <img id="img2" src />
        </div>
      </div>
    </div>

    <div id="isMileages"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.getInfs();
  },
  methods: {
    getInfs() {
        this.request({
            url:'/project/projectProcessMap',
            method:'get'
        }).then(response=>{
             let data = response.data;
        if (data.status == 1) {
        //   this.workData = data.data;
        console.log( data.data);
        }
        })
    },
    goDetail(id) {
      this.title = "修改信息";
      this.workVisible = true;
      this.request({
        url: "/project/getWorkDetail",
        method: "get",
        params: { id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.workData = data.data;
        }
      });
    }
  }
};
</script>
<style>
#jumpBtn,
#printBtn,
#refreshBtn {
  position: fixed;
  top: 15px;
  text-decoration: none;
  height: 40px;
}

#printBtn {
  width: 40px;
  right: 30px;
  background: url("http://train.ltrailways.com/assets/img/progress.png?1544599074")
    no-repeat -65px 0;
}

#refreshBtn {
  width: 40px;
  right: 95px;
  background: url("http://train.ltrailways.com/assets/img/progress.png?1544599074")
    no-repeat -20px 0;
}

#jumpBtn {
  height: 35px;
  right: 160px;
  border: 2px solid #4acae7;
  color: #4acae7;
  border-radius: 4px;
  padding-left: 5px;
  font-size: 14px;
}
#jumpBtn:hover {
  border-color: #6af2f2;
  color: #6af2f2;
}

#jumpLogo {
  padding: 0 8px;
  background: url("http://train.ltrailways.com/assets/img/progress.png?1544599074")
    no-repeat 0 4px;
}

#jumpBtn > span {
  display: inline-block;
  margin: 7px 5px 0;
}

#canvas-fa {
  width: 1800px;
  height: 100%;
  text-align: center;
  background: #111a28;
  color: #fff;
  padding: 10px 0 20px;
  margin: 0 auto;
}
#isMileages {
  color: #fff;
}

#imgDiv {
  display: none;
}

#img1Div {
  width: 1750px;
  height: 380px;
  margin: 20px auto;
}

#imgDiv img {
  width: 100%;
}

#img2Div {
  border: 2px solid #ddd;
  width: 1704px;
  height: 400px;
  margin: 30px auto;
}

/*分辨率处理*/
@media (min-width: 1024px) and (max-width: 1280px) {
  #canvas-fa {
    width: 1250px;
  }
  #img1Div {
    width: 1200px;
    height: 300px;
    margin: 20px auto;
  }

  #img2Div {
    border: 2px solid #ddd;
    width: 1168px;
    height: 273px;
    margin: 0 auto;
  }
}

@media (min-width: 1281px) and (max-width: 1360px) {
  #canvas-fa {
    width: 1320px;
  }
  #img1Div {
    width: 1280px;
    height: 300px;
    margin: 20px auto;
  }

  #img2Div {
    border: 2px solid #ddd;
    width: 1246px;
    height: 291px;
    margin: 0 auto;
  }
}

@media (min-width: 1361px) and (max-width: 1366px) {
  #canvas-fa {
    width: 1350px;
  }
  #img1Div {
    width: 1320px;
    height: 300px;
    margin: 20px auto;
  }

  #img2Div {
    border: 2px solid #ddd;
    width: 1285px;
    height: 301px;
    margin: 0 auto;
  }
}

@media (min-width: 1367px) and (max-width: 1441px) {
  #canvas-fa {
    width: 1430px;
  }
  #img1Div {
    width: 1360px;
    height: 300px;
    margin: 20px auto;
  }

  #img2Div {
    border: 2px solid #ddd;
    width: 1323px;
    height: 310px;
    margin: 0 auto;
  }
}

@media (min-width: 1442px) and (max-width: 1660px) {
  #canvas-fa {
    width: 1580px;
  }
  #img1Div {
    width: 1510px;
    height: 345px;
    margin: 20px auto;
  }

  #img2Div {
    border: 2px solid #ddd;
    width: 1470px;
    height: 344px;
    margin: 10px auto;
  }
}

@media (min-width: 1661px) and (max-width: 1768px) {
  #canvas-fa {
    width: 1750px;
  }
  #img1Div {
    width: 1650px;
    height: 375px;
    margin: 20px auto;
  }

  #img2Div {
    border: 2px solid #ddd;
    width: 1610px;
    height: 377px;
    margin: 10px auto;
  }
}

#alertDataDiv {
  display: none;
  position: absolute;
  top: -100px;
  color: #11e2bc;
  /*height: 22px;*/
  border: 2px solid #11e2bc;
  border-radius: 5px;
  text-align: center;
  padding: 10px;
}

#alertDataSpan {
  display: inline-block;
  min-width: 210px;
}

.lineStyle {
  display: block;
  /*padding: 14px 0;*/
  background: #11e2bc;
  width: 2px;
  /*margin: 0 auto -14px;*/
  position: absolute;
  top: 41px;
  margin-bottom: -20px;
}

#alertDataEnd .lineStyle {
  padding: 27px 1px;
  margin-bottom: -30px;
}
</style>