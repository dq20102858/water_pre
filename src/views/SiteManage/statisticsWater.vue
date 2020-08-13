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
              <b>出水量统计</b>
              <em>单位：吨</em>
            </div>
            <div class="titleright">
              <el-date-picker
                @change="oneStartTimeSelect"
                class="seldate"
                v-model="oneStartTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
              <span @click="oneSelect(1)" class="selspan" :class="oneType == 1 ? 'active':''">按日</span>
              <span @click="oneSelect(2)" class="selspan" :class="oneType == 2 ? 'active':''">按月</span>
              <span @click="oneSelect(3)" class="selspan" :class="oneType == 3 ? 'active':''">按年</span>
            </div>
          </div>
          <div class="echarts-main">
            <div id="oneChart" class="echarts"></div>
          </div>
        </div>
        <div class="grid-content-chart">
          <div class="chart-title">
            <div class="titleleft">
              <b>瞬时量统计</b>
              <em>单位：吨</em>
            </div>
            <div class="titleright">
              <el-date-picker
                @change="twoStartTimeSelect"
                class="seldate"
                v-model="twoStartTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
              <span @click="twoSelect(1)" class="selspan" :class="twoType == 1 ? 'active':''">按日</span>
              <span @click="twoSelect(2)" class="selspan" :class="twoType == 2 ? 'active':''">按月</span>
              <span @click="twoSelect(3)" class="selspan" :class="twoType == 3 ? 'active':''">按年</span>
            </div>
          </div>
          <div class="echarts-main">
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
    return {
      oneType: 1,
      oneStartTime: "",
      twoType: 1,
      twoStartTime: ""
    };
  },
  created() {
    this.getOneChart(this.oneType);
    this.getTwoChart(this.twoType);
  },
  methods: {
    backURL() {
      this.$router.go(-1);
    },
    //=======1
    oneStartTimeSelect() {
      this.getOneChart(this.oneType);
    },
    oneSelect(type) {
      this.oneType = type;
      this.getOneChart(type);
    },
    getOneChart(type) {
      this.request({
        //url: "/log/getTotalEnterWater",
        url: "/log/getPhDatas",
        method: "get",
        params: {
          sid: this.$route.query.id,
          type: type,
          start_time: this.oneStartTime
        }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          let dataxAxis = data.data.x;
          let dataSeriesOuter = data.data.outer;
          let dataSeriesEnter = data.data.enter;
          //dataxAxis = [12, 13, 14, 15];
          //dataSeries = [120, 130, 140, 150];
          let myChart = this.$echarts.init(document.getElementById("oneChart"));
          if (data.data.length == 0) {
            //   dataxAxis = [
            //     "2020-08-01",
            //     "2020-08-02",
            //     "2020-08-03",
            //     "2020-08-04",
            //     "2020-08-05",
            //     "2020-08-06",
            //     "2020-08-07",
            //     "2020-08-08",
            //     "2020-08-09",
            //     "2020-08-10",
            //     "2020-08-11",
            //     "2020-08-12"
            //   ];
            //   dataSeriesEnter = [
            //     400,
            //     500,
            //     600,
            //     700,
            //     800,
            //     900,
            //     1000,
            //     1100,
            //     1200,
            //     1300,
            //     1400,
            //     1500
            //   ];
            //   dataSeriesOuter = [
            //     200,
            //     300,
            //     400,
            //     500,
            //     600,
            //     700,
            //     800,
            //     900,
            //     1000,
            //     1100,
            //     1200,
            //     1300
            //   ];

            myChart.showLoading({
              text: "暂无数据",
              color: "#fff",
              textColor: "#8a8e91",
              maskColor: "rgba(255, 255, 255, 0.8)"
            });
          }
          var option = {
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
              data: dataxAxis,
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
                data: dataSeriesEnter
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
                data: dataSeriesOuter
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
    //=======2
    twoStartTimeSelect() {
      this.getTwoChart(this.twoType);
    },
    twoSelect(type) {
      this.twoType = type;
      this.getTwoChart(type);
    },
    getTwoChart(type) {
      this.request({
        //url: "/log/getTotalEnterWater",
        url: "/log/getEnterWater",
        method: "get",
        params: {
          sid: this.$route.query.id,
          type: type,
          start_time: this.twoStartTime
        }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          let dataxAxis = data.data.x;
          let dataSeries = data.data.enter;

          //
          let myChart = this.$echarts.init(document.getElementById("twoChart"));
          if (data.data.length == 0) {
            myChart.showLoading({
              text: "暂无数据",
              color: "#fff",
              textColor: "#8a8e91",
              maskColor: "rgba(255, 255, 255, 0.8)"
            });
          }
          var option = {
            backgroundColor: "#fff",

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
              data: dataxAxis,
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
                data: dataSeriesEnter,
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
                }
              },
              {
                name: "出水",
                type: "bar",
                data: dataSeriesOuter,
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
                }
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
    //=======end
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
/**/
.echarts-main {
  padding: 20px;
  overflow: hidden;
}
.echarts {
  height: 400px;
  width: 100%;
}
</style>