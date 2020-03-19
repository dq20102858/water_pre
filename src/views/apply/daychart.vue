<template>
  <div id="app-apply">
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
       projectName:'',
      mark_line: [],
      project_kind_name: [],
      kcolor: ["red", "green", "yellow", "#467aff", "#44ddb5", "#c245d3"]
    };
  },
  mounted() {
    this.getChart();
  },
  created() {
    this.projectName= localStorage.getItem('projectName');
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
          //根据项目具体类别配置创建出对应格式
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
          //
          let t = resdata.data.data;
          for (var k in t) {
            this.project_kind_name.push({
              value: t[k].type,
              label: t[k].type,
              color: this.kcolor[k]
            });
          }

          //时间
          let dayArr = [];
          let tday = resdata.data.x;
          for (var i in tday) {
            dayArr.push(i);
          }
          console.log("dayAry:" + dayArr);
          let dataMin = dayArr.shift(); //new Date(Math.min.apply(null, dayArr)).toLocaleDateString();
          let dataMax = dayArr.pop(); //new Date(Math.max.apply(null, dayArr)).toLocaleDateString();

          // let dataMin = Math.min.apply(
          //   Math,
          //   dayAry.map(function(item,i) {
          //     return i;
          //   })
          // );
          // let dataMax = Math.max.apply(
          //   Math,
          //   dayAry.map(function(item) {
          //     return item;
          //   })
          // );
          console.log("day:" + dataMin + "_" + dataMax);
          //option
          var option = {
            textStyle: {
              color: "#fff"
            },
            tooltip: {},
            grid: {
              left: "15%",
              right: "5%"
            },
            xAxis: {
              type: "time",
              min: dataMin,
              max: dataMax,
              minInterval: 3600 * 12 * 1000,
              maxInterval: 3600 * 1 * 1000,
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
                filterMode: "weakFilter", //weakFilter参数配合echarts.graphic.clipRectByRect效果最佳
                show: true,
                zoomLock: true,
                xAxisIndex: [0],
                top: 24,
                start: 0,
                end: 17,
                minValueSpan: 4 * 3600 * 1000,
                textStyle: {
                  color: "#fff"
                },
                borderColor: "#2B2B2B",
                handleSize: "75%",
                fillerColor: "#202f40"
                // handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
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
                zoomOnMouseWheel:false,
                start: 0,
                end: 100
              }
            ],
            series: [
              {
                name: "车站",
                type: "line",
                markLine: {
                  silent: true,
                  data: this.mark_line,
                  label: {
                    normal: {
                      position: "left",
                      formatter: "{b}"
                    }
                  },
                  lineStyle: {
                    color: "#7a7a7a"
                  },
                  animation: false
                }
              }
            ],
            visualMap: {
              pieces: this.project_kind_name,
              dimension: 7,
              left: "center",
              bottom: -5,
              orient: "horizontal",
              textStyle: {
                color: "#fff"
              },
              outOfRange: {
                symbolSize: [0, 0, 0, 0]
              },
              controller: {
                outOfRange: {
                  color: "#7A7A7A"
                }
              }
            },
            color: ["#fff"],
            animation: false
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          //视觉映射开关事件
          var global_v_selected = "";
          myChart.on("datarangeselected", function(params) {
            // var filter_data = [];
            // for (var k in project_line_name) {
            //   filter_data[project_line_name[k].name] = [];
            // }
            // //循环遍历视觉开关，根据状态过滤相应数据
            // for (var k in params.selected) {
            //   //如果开关状态为开启（true）则将此类数据全部添加到对应下别下
            //   if (params.selected[k]) {
            //     for (var j in data) {
            //       if (data[j].length) {
            //         for (var i in data[j]) {
            //           if (data[j][i][7] == project_kind_name[k].name) {
            //             filter_data[j].push(data[j][i]);
            //           }
            //         }
            //       }
            //     }
            //   }
            // }
            // // console.log(data)
            // // console.log(filter_data)
            // var change_series = [];
            // for (var k in project_line_name) {
            //   var obj = { data: "" };
            //   obj.data = filter_data[project_line_name[k].name];
            //   change_series[k] = obj;
            // }
            // //根据对应的开关重新加载对应的数据
            // myChart.setOption({
            //   series: change_series
            // });
            // myChart.setOption({
            //   visualMap: {
            //     selected: params.selected
            //   }
            // });
            // global_v_selected = params.selected;
            // var myLegend = myChart.getOption().legend[0].selected;
            // // var myVisualMap = myChart.getOption().visualMap[0].selected;
            // localStorage.myL = JSON.stringify(myLegend);
            // // localStorage.myV = JSON.stringify(myVisualMap);
          });
          myChart.resize();
          window.addEventListener("resize", function() {
            myChart.resize();
          });

          //==========
        }
      });
    }
  }
};
</script>
<style>
.maintitle{text-align: center;font-size: 24px;color:#fff;}
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
  background-color: #030a2e;
  padding: 30px;
}
.canvas_main {
  /*width: 100%;*/
}

.head_btn {
  /*width: 100%;*/

  padding-top: 20px;
}
.list_btn {
  position: absolute;
  top: 84px;
  right: 250px;
}
</style>
