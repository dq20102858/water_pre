<template>
  <div id="app-apply-chart">
    <div class="el-menu-top">
      <el-menu router default-active="daychart" mode="horizontal">
        <li class="ptitle">{{projectName}}</li>
        <el-submenu index="1">
          <template slot="title">日班计划</template>
          <el-menu-item index="daychart">日班图表</el-menu-item>
          <el-menu-item index="apply">日班列表</el-menu-item>
          <el-menu-item index="conflictcheck">冲突检测</el-menu-item>
        </el-submenu>
        <el-menu-item>
          <router-link :to="{name:'weekplan'}">周计划</router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="app-page-chart">
      <div class="maintitle">日班图表</div>
      <div id="main" style="height:500px;width:100%;"></div>
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
      kcolor: ["red", "green", "yellow", "#467aff", "#44ddb5", "#c245d3"]
    };
  },
  mounted() {
    document
      .querySelector("#app-menu-items #menu_apply")
      .classList.add("is-active");
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
          this.mark_line = JSON.parse(
            JSON.stringify(resdata.data.y).replace(/value/g, "yAxis")
          );
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
          // let dataTypeArr2 = [
          //   {
          //     type: "A1",
          //     lists: [
          //       { name: "2020-04-08 05:00:00", value: 21.003 },
          //       { name: "2020-04-08 10:00:00", value: 32.9 }
          //     ]
          //   },
          //   {
          //     type: "A2",
          //     lists: [
          //       { name: "2020-03-30 12:00:00", value: 21.003 },
          //       { name: "2020-03-30 16:00:00", value: 32.9 }
          //     ]
          //   }
          // ];
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
              label: {
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
                color: "#7a7a7a"
              },
              animation: false
            }
          });
          let projectData = [];
          for (let k in typeData) {
            seriesData.push({
              name: typeData[k].name,
              type: "scatter",
              symbolSize: 10,
              itemStyle: { normal: { color: this.kcolor[k] } },
              data: typeData[k].lists
            });
          }
          // console.log("projectData：" + JSON.stringify(seriesData));
          //时间
          let dayArr = [];
          let tday = resdata.data.x;
          for (var i in tday) {
            dayArr.push(i);
          }
          let dataMin = dayArr.shift();
          let dataMax = dayArr.pop();
          //option
          var option = {
            textStyle: {
              color: "#fff"
            },
            tooltip: { formatter: "{a}: ({c})" },
            legend: {
              icon: "roundRect",
              itemGap: 20,
              bottom: 0,
              data: ["A1", "A2", "A3", "A4"],
              textStyle: {
                color: "#fff",
                fontSize: 16
              }
            },
            grid: {
              left: "15%",
              right: "5%"
            },
            xAxis: {
              type: "time",
              min: dataMin,
              max: dataMax,
              minInterval: 3600 * 12 * 1000,
              maxInterval: 3600 * 24 * 1000,
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#2B2B2B",
                  type: "dotted",
                  width: 1
                }
              }
            },
            yAxis: {
              show: false,
              type: "value",
              min: minLineNum,
              max: maxLineNum,
              scale: true,
              minInterval: 0.5,
              maxInterval: 5,
              splitLine: {
                show: false,
                lineStyle: {
                  color: "#2B2B2B",
                  type: "dotted",
                  width: 1
                }
              },
              axisLabel: {
                show: false,
                showMinLabel: false,
                showMaxLabel: false,
                formatter: function(value, index) {
                  return value;
                }
              }
            },
            dataZoom: [
              {
                type: "slider",
                filterMode: "weakFilter",
                show: true,
                zoomLock: true,
                xAxisIndex: [0],
                top: 24,
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
                textStyle: {
                  color: "#fff"
                },
                borderColor: "#2B2B2B",
                handleSize: "75%",
                fillerColor: "#202f40"
              },
              {
                type: "inside",
                xAxisIndex: [0]
              },
              {
                type: "inside",
                yAxisIndex: [0]
              }
            ],
            series: seriesData,
            color: ["#fff"],
            animation: false
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          myChart.resize();
          window.addEventListener("resize", function() {
            myChart.resize();
          });
        }
      });
    }
  }
};
</script>
<style>
#app-apply-chart {
  background-color: #030a2e;
  height: 100vh;
}
.maintitle {
  text-align: center;
  font-size: 24px;
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
.app-page-chart {
  font-size: 16px !important;
  padding: 30px;
}
.canvas_main {
  /*width: 100%;*/
}
</style>
