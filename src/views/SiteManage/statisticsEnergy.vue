<template>
  <div class="app-page-statistics">
    <div class="app-page-container">
      <div class="statistics-top">
        <div class="deleft">
          <b>进出水量统计</b>
          <el-button
            type="primary"
            style="background: #00ADFF;border: none;"
            size="mini"
            round
            @click="backURL"
          >返回</el-button>
        </div>
        <div class="deright">
          <span>{{new Date()|formatGetDate}}</span>
        </div>
      </div>
      <div class="statistics">
        <div class="grid-content-chart">
          <div class="chart-title">
            <div class="titleleft">
              <b>电流统计</b>
              <em>单位：安培</em>
            </div>
            <div class="titleright"></div>
          </div>
          <div class="chart-main">
            <div id="twoChart"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.getThirdChart(1);
  },
  methods: {
    backURL() {
      this.$router.go(-1);
    },
    getThirdChart(proId, date, proName) {
      this.request({
        url: "/station/getStationLists",
        method: "get",
        params: { proId: proId, date: date }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          let xData = [
            "2020-01",
            "2020-02",
            "2020-03",
            "2020-04",
            "2020-05",
            "2020-06",
            "2020-07",
            "2020-08",
            "2020-09",
            "2020-10",
            "2020-11",
            "2020-12"
          ];
          let yDataA = [0, 0, 0, 0, 0, 2.44, 0, 0, 0, 0, 0, 0];
          let yDataB = [0, 0, 0, 0, 0, 3.64, 0, 0, 0, 0, 0, 0];
          let myChart = this.$echarts.init(document.getElementById("twoChart"));
          myChart.setOption({
            title: {
              text: ""
            },
            tooltip: {
              trigger: "axis"
            },
            color: ["#4b6eca", "#ff5c75"],
            legend: {
              data: ["进水", "出水"],
              icon: "rectangle",
              textStyle: {
                fontSize: 14,
                color: "#1d397a"
              }
            },
            grid: {
              left: "1%",
              right: "1%",
              bottom: "1%",
              containLabel: true
            },
            toolbox: {
              right: 30,
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: [
              {
                type: "category",
                axisLabel: {
                  show: true,
                  interval: 0,
                  rotate: 0,
                  textStyle: {
                    color: "#333"
                  }
                },
                data: xData
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            series: [
              {
                name: "计划",
                type: "bar",
                data: yDataA
              },
              {
                name: "实际",
                type: "bar",
                data: yDataB
              }
            ]
          });
          myChart.resize();
          window.addEventListener("resize", function() {
            myChart.resize();
          });
          //end
        }
      });
    },

    getStationList() {
      this.request({
        url: "/station/getStationLists",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.stationOptions = data.data;
        }
      });
    }

    //
  }
};
</script>
<style>
.app-device-page-detail {
  padding: 20px;
}
.statistics-top {
  overflow: hidden;
  margin-bottom: 30px;
}
.statistics-top .deleft {
  float: left;
}
.statistics-top .deleft b {
  font-weight: 400;
  font-size: 18px;
  margin-right: 20px;
}
.statistics-top .deright {
  float: right;
  color: #666;
  font-size: 14px;
}
.statistics-top .deright span {
  padding-left: 20px;
}
.statistics .el-row {
  margin-bottom: 20px;
}
.statistics .grid-content {
  padding: 40px 0px 30px 50px;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 5px 1px 15px rgba(222, 222, 222, 0.9);
}
.statistics .grid-img {
  float: left;
  width: 100px;
  height: 150px;
  margin-right: 40px;
  border-radius: 100%;
}
.statistics .grid-img img {
  margin-top: 15px;
  float: left;
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
.statistics .grid-info p {
  color: #333;
  display: inline-block;
  width: 21%;
  padding-top: 20px;
  font-size: 16px;
}
.statistics .grid-info p em {
  color: #666;
}
.grid-content-chart {
  border-radius: 6px;
  margin-top: 30px;
  background: #fff;

  box-shadow: 5px 1px 15px rgba(222, 222, 222, 0.9);
}
.chart-title {
  background: #4093ed;
  border-radius: 6px 6px 0 0;
  padding: 12px 15px;
  color: #fff;
  overflow: hidden;
}
.chart-title .titleleft {
  float: left;
}
.chart-title .titleright {
  float: right;
}
.chart-title b {
  font-size: 16px;
  margin-right: 20px;
  font-weight: 400;
}
.chart-main {
  min-height: 400px;
}
/**/
#twoChart {
  height: 500px;
  width: 100%;
}
</style>