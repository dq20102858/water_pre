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
            <div id="twoChart" class="echarts"></div>
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
          //
          //
          var labelOption = {
            show: true,
            rotate: 90,
            align: "left",
            verticalAlign: "middle",
            position: "top",
            distance: 10,
            formatter: "{c}  {name|{a}}",
            fontSize: 16,
            rich: {
              name: {
                textBorderColor: "#039bff"
              }
            }
          };
          let myChart = this.$echarts.init(document.getElementById("twoChart"));
          var option = {
            backgroundColor: "#fff",
            title: {
              text: "出水量统计",
              textStyle: {
                color: "#222"
              }
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: "1%",
              right: "2%",
              bottom: "2%",
              top: "10%",
              containLabel: true
            },

            legend: {
              data: ["进水", "出水"],
              top: 12,
              textStyle: {
                color: ["#4093ed", "#ef964b"],
                fontSize: 15
              },
              itemWidth: 32,
              itemHeight: 15
              // itemGap: 35
            },
            xAxis: {
              type: "category",
              data: [
                "2020-08-01",
                "2020-08-02",
                "2020-08-03",
                "2020-08-04",
                "2020-08-05",
                "2020-08-06",
                "2020-08-07",
                "2020-08-08",
                "2020-08-09",
                "2020-08-10",
                "2020-08-11",
                "2020-08-12"
              ],
              axisLine: {
                lineStyle: {
                  color: "#869ec6"
                }
              },
              axisLabel: {
                // interval: 0,
                // rotate: 40,
                textStyle: {
                  fontFamily: "Microsoft YaHei"
                }
              }
            },

            yAxis: {
              type: "value",
              // max: "1200",
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#869ec6"
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#eff4f6"
                }
              },
              axisLabel: {}
            },
            series: [
              {
                name: "进水",
                type: "bar",
                barWidth: "12",
                label: {
                  normal: {
                    show: true,
                    fontSize: 12,
                    color: "#fdaa64",
                    position: "top"
                  }
                },
                itemStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: "#fdaa64"
                        },
                        {
                          offset: 1,
                          color: "#ef964b"
                        }
                      ]
                    ),
                    barBorderRadius: [3, 3, 0, 0]
                  }
                },
                data: [
                  400,
                  500,
                  600,
                  700,
                  800,
                  900,
                  1000,
                  1100,
                  1200,
                  1300,
                  1400,
                  1500
                ]
              },
              {
                name: "出水",
                type: "bar",
                barWidth: "12",
                label: {
                  normal: {
                    show: true,
                    fontSize: 12,
                    color: "#00d7ff",
                    position: "top"
                  }
                },
                itemStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: "#00d7ff"
                        },
                        {
                          offset: 1,
                          color: "#009bff"
                        }
                      ]
                    ),
                    barBorderRadius: [3, 3, 0, 0]
                  }
                },
                data: [
                  200,
                  300,
                  400,
                  500,
                  600,
                  700,
                  800,
                  900,
                  1000,
                  1100,
                  1200,
                  1300
                ]
              }
            ]
          };
          myChart.setOption(option);
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
.chart-main {
  padding: 20px;
  overflow: hidden;
}
.echarts {
  height: 400px;
  width: 100%;
}
</style>