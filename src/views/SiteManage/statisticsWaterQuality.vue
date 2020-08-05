<template>
  <div class="app-page-statistics">
    <div class="app-page-container">
      <div class="statistics-top">
        <div class="deleft">
          <b>水质监测</b>
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
              <b>液位</b>
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
              <b>PH值</b>
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
        <div class="grid-content-chart">
          <div class="chart-title">
            <div class="titleleft">
              <b>DO值</b>
              <em>单位：吨</em>
            </div>
            <div class="titleright">
              <el-date-picker
                @change="threeStartTimeSelect"
                class="seldate"
                v-model="threeStartTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
              <span @click="threeSelect(1)" class="selspan" :class="threeType == 1 ? 'active':''">按日</span>
              <span @click="threeSelect(2)" class="selspan" :class="threeType == 2 ? 'active':''">按月</span>
              <span @click="threeSelect(3)" class="selspan" :class="threeType == 3 ? 'active':''">按年</span>
            </div>
          </div>
          <div class="echarts-main">
            <div id="threeChart" class="echarts"></div>
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
      twoStartTime: "",
      threeType: 1,
      threeStartTime: ""
    };
  },
  created() {
    this.getOneChart(this.oneType);
    this.getTwoChart(this.twoType);
    this.getThreeChart(this.threeType);
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
        url: "/log/getLevelDatas",
        method: "get",
        params: { type: type, start_time: this.oneStartTime }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          let dataxAxis = data.data.x;
          let dataSeries = data.data.data;
          //dataxAxis = [12, 13, 14, 15];
          //dataSeries = [120, 130, 140, 150];
          let myChart = this.$echarts.init(document.getElementById("oneChart"));
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
            legend: {
              data: ["液位"],
              textStyle: {
                color: ["#4093ed"],
                fontSize: 15
              },
              itemWidth: 32,
              itemHeight: 15
            },
            grid: {
              left: "1%",
              right: "2%",
              bottom: "2%",
              top: "10%",
              containLabel: true
            },
            xAxis: {
              type: "category",
              data: dataxAxis,
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
              axisLabel: {
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
                name: "液位",
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
                data: dataSeries
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
        url: "/log/getPhDatas",
        method: "get",
        params: { type: type, start_time: this.twoStartTime }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          let dataxAxis = data.data.x;
          let dataSeries = data.data.data;
          // dataxAxis = [12, 13, 14, 15];
          // dataSeries = [120, 130, 140, 150];

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
              data: ["PH值"],
              textStyle: {
                color: ["#4093ed", "#ef964b"],
                fontSize: 15
              },
              itemWidth: 32,
              itemHeight: 15
            },
            xAxis: {
              type: "category",
              data: dataxAxis,
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
              axisLabel: {
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
                name: "PH值",
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
                data: dataSeries
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
    //=======3
    threeStartTimeSelect() {
      this.getThreeChart(this.threeType);
    },
    threeSelect(type) {
      this.threeType = type;
      this.getThreeChart(type);
    },
    getThreeChart(type) {
      this.request({
        url: "/log/getDoDatas",
        method: "get",
        params: { type: type, start_time: this.threeStartTime }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          let dataxAxis = data.data.x;
          let dataSeries = data.data.data;
          // dataxAxis = [12, 13, 14, 15];
          // dataSeries = [120, 130, 140, 150];

          //
          let myChart = this.$echarts.init(
            document.getElementById("threeChart")
          );
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
              data: ["DO值"],
              textStyle: {
                color: ["#4093ed", "#ef964b"],
                fontSize: 15
              },
              itemWidth: 32,
              itemHeight: 15
            },
            xAxis: {
              type: "category",
              data: dataxAxis,
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
              axisLabel: {
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
                name: "DO值",
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
                data: dataSeries
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