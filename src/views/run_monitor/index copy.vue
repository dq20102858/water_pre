<template>
  <div id="app-monitor-chart">
    <div class="app-page-chart">
      <div class="chartleft">
        <div class="maintitle">2020年04月02日 16时 -— 2020年04月04日 16时轨行区作业分布图</div>
        <div id="main" style="height:500px;width:100%;"></div>
      </div>
      <div class="chartright">
        <div class="sidebox">
          <div class="btnitem">
            <el-date-picker v-model="todayValue" type="date" placeholder="选择日期"></el-date-picker>
          </div>
          <div class="btnitems">
            <el-button @click="preDate" type="primary" plain>前一天</el-button>
            <el-button @click="nextDate" type="primary" plain>后一天</el-button>
          </div>

          <div class="btnitem">
            <el-button type="primary" plain>编制日班计划图</el-button>
          </div>
          <div class="btnitem">
            <el-button type="primary" plain>编制日班实际图</el-button>
          </div>
          <div class="btnitem">
            <el-button type="primary" plain>区间封锁</el-button>
          </div>
          <div class="btnitem">
            <el-button type="primary" plain>批注</el-button>
          </div>
          <div class="btnitem">
            <el-button type="primary" plain>刷新</el-button>
          </div>
          <div class="btnitem">
            <el-button type="primary" plain>提交</el-button>
          </div>
        </div>
        <div class="sidebox">
          <h3>显示控制</h3>
          <div class="chklist">
            <el-checkbox label="左线"></el-checkbox>
            <el-checkbox label="右线"></el-checkbox>
            <el-checkbox label="入场线"></el-checkbox>
            <el-checkbox label="出场线"></el-checkbox>
          </div>
          <div class="chklist">
            <el-checkbox label="计划图"></el-checkbox>
            <el-checkbox label="实际图"></el-checkbox>
            <el-checkbox label="轨迹图"></el-checkbox>
            <el-checkbox label="批注"></el-checkbox>
            <el-checkbox label="区间封锁"></el-checkbox>
            <el-checkbox label="清点"></el-checkbox>
          </div>
          <div class="chklist">
            <el-checkbox label="ZY01"></el-checkbox>
            <el-checkbox label="ZY02"></el-checkbox>
            <el-checkbox label="ZY03"></el-checkbox>
            <el-checkbox label="ZY04"></el-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "daychart",
  data() {
    return {
      projectName: "",
      mark_line: [],
      project_kind_name: [],
      kcolor: ["red", "green", "yellow", "#467aff", "#44ddb5", "#c245d3"],
      todayValue: new Date()
    };
  },
  mounted() {
    this.getChart();
  },
  created() {
    this.projectName = localStorage.getItem("projectName");
  },
  methods: {
    getChart() {
      this.request({
        url: "/apply/getDailyChart",
        method: "get"
      }).then(res => {
        let resdata = res.data;
        if (resdata.status == 1) {
          //myChart
          var myChart = this.$echarts.init(document.getElementById("main"));
          myChart.getDom().style.height =
            document.body.clientHeight - 280 + "px";
          //站点
          let jsonStations = [];
          resdata.data.stations.map(item => {
             this.mark_line.push({
              name: item.name + " DK " + item.start_flag + +item.start_length,
              yAxis: item.start_flag +item.start_length
            });
          });
          console.log( this.mark_line)
          // this.mark_line = JSON.parse(
          //   JSON.stringify(resdata.data.stations).replace(/value/g, "yAxis")
          // );
          let minLineNum = Math.min.apply(
            Math,
            this.mark_line.map(function(item) {
              return parseInt(item.yAxis + 2);
            })
          );
          let maxLineNum = Math.max.apply(
            Math,
            this.mark_line.map(function(item) {
              return parseInt(item.yAxis + 2);
            })
          );
          //A1 A2 A3 A4
          let typeData = [];
          let dataTypeArr = resdata.data.data;
          dataTypeArr.forEach(item => {
            let jlist = [];
            item.lists.forEach(item => {
              jlist.push([item.name, item.value]);
            });
            typeData.push({ name: item.type, lists: jlist });
          });
          console.log("typeData：" + JSON.stringify(typeData));
          let seriesData = [];
          seriesData.push({
            name: "车站",
            type: "line",
            markLine: {
              silent: true,
              data: this.mark_line,
              symbol: ["none"],
              label: {
                show: false,
                normal: {
                  position: "left",
                  formatter: function(value, index) {
                    return (
                      value.name.replace(/.00/, "").replace(/.00/, "") + "   "
                    );
                  }
                }
              },
              lineStyle: {
                normal: {
                  type: "solid",
                  color: "#1D397A"
                }
              },
              animation: false
            }
          });
          // let projectData = [];
          // for (let k in typeData) {
          //   seriesData.push({
          //     name: typeData[k].name,
          //     type: "scatter",
          //     symbolSize: 10,
          //     itemStyle: { normal: { color: this.kcolor[k] } },
          //     data: typeData[k].lists
          //   });
          // }
          // console.log("projectData：" + JSON.stringify(seriesData));
          //时间
          let dayArr = [];
          let tday = resdata.data.x;
          for (var i in tday) {
            dayArr.push(i);
          }
          let dataMin = new Date(
            new Date(this.todayValue.getTime() - 24 * 60 * 60 * 1000).setHours(
              17,
              0,
              0,
              0
            )
          );
          let dataMax = new Date(
            new Date(this.todayValue.getTime() + 24 * 60 * 60 * 1000).setHours(
              19,
              0,
              0,
              0
            )
          );
          //option
          var option = {
            textStyle: {
              color: "#1D397A"
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#376df4"
                },
                lineStyle: {
                  color: "#376df4",
                  width: 1
                }
              }
            },
            grid: {
              left: "15%",
              right: "5%"
            },
            xAxis: {
              type: "time",
              position: "top",
              min: dataMin,
              max: dataMax,
              maxInterval: 3600 * 0.1 * 1000,
              axisLabel: {
                formatter: function(val, index) {
                  let date = new Date(val);
                  let months = date.getMonth() + 1 + "/" + date.getDate();
                  let hours = date.getHours() + ":00";
                  if (index % 6 == 0) {
                    return months + "\r\n" + hours;
                  }
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: ["#c0c0c0"],
                  type: "solid",
                  width: 1
                }
              }
            },
            yAxis: {
              show: false,
              type: "value",
              min: minLineNum,
              max: maxLineNum,
              animation: false
            },
            dataZoom: [
              {
                type: "slider",
                filterMode: "weakFilter", //weakFilter参数配合echarts.graphic.clipRectByRect效果最佳
                show: false,
                zoomLock: true,
                xAxisIndex: [0],
                bottom: 10,
                start: 0,
                end: 25,
                minValueSpan: 3600 * 12 * 1000,
                textStyle: {
                  color: "#fff"
                },
                borderColor: "#2B2B2B",
                handleSize: "75%",
                fillerColor: "#202f40"
              },
              {
                type: "slider",
                filterMode: "weakFilter",
                show: true,
                yAxisIndex: [0],
                left: "96%",
                start: 0,
                end: 100,
                minValueSpan: 5,
                textStyle: {
                  color: "#fff"
                },
                borderColor: "#2B2B2B",
                handleSize: "75%",
                fillerColor: "#202f40"
              },
              {
                type: "inside",
                xAxisIndex: [0],
                start: 0,
                end: 100
              },
              {
                type: "inside",
                yAxisIndex: [0],
                zoomOnMouseWheel: false,
                start: 0,
                end: 100
              }
            ],
            series: seriesData
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          myChart.resize();
          window.addEventListener("resize", function() {
            myChart.resize();
          });
        }
      });
    },
    preDate() {
      //前一天
      this.todayValue = new Date(
        this.todayValue.getTime() - 24 * 60 * 60 * 1000
      );
      this.getChart();
    },
    nextDate() {
      //后一天
      this.todayValue = new Date(
        this.todayValue.getTime() + 24 * 60 * 60 * 1000
      );
      this.getChart();
    }
    //
  }
};
</script>
<style>
.app-page-chart {
  min-width: 1170px;
}
.maintitle {
  text-align: center;
  font-size: 20px;
  color: #fff;
}
.el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
  min-width: 124px;
  text-align: center;
  padding: 0;
}
.el-menu--horizontal .el-menu .el-menu-item.is-active,
.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {
  background: #4b6eca;
  color: #fff;
}
.chartleft {
  float: left;
  width: 80%;
  background: #fff;
  padding: 30px;
  border-radius: 6px;
}
.chartright {
  float: left;
  width: 19%;
  margin-left: 1%;
}
.chartright .sidebox {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
}
.chartright .sidebox .btnitems {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
.chartright .sidebox .btnitems .is-plain {
  width: 100% !important;
  display: inline-block;
  background: #fff;
}
.chartright .sidebox .btnitem {
  margin-top: 15px;
}
.chartright .el-date-editor.el-input,
.chartright .el-date-editor.el-input__inner {
  width: 100%;
}
.chartright .sidebox .btnitem .is-plain {
  width: 100% !important;
  background: #fff;
}
.chartright .sidebox .is-plain:hover {
  background: #4b6eca;
  border-color: #4b6eca;
  color: #fff;
}
.chartright .sidebox .is-plain:focus {
  background: #4b6eca;
  border-color: #4b6eca;
  color: #fff;
}
.chartright .sidebox h3 {
  font-size: 14px;
}
.chartright .chklist {
  margin-top: 15px;
}
.chartright .chklist .el-checkbox {
  margin-bottom: 10px;
}
@media (max-width: 960px) {
  .chartleft {
    width: 100%;
  }
  .chartright {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
