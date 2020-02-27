<template>
  <div id="app-apply">
    <div class="el-menu-top">
      <el-menu router default-active="daychart" mode="horizontal">
        <li class="ptitle">无锡地铁三号线</li>
        <el-submenu index="1">
          <template slot="title">日班计划</template>
          <el-menu-item index="daychart">日班图表</el-menu-item>
          <el-menu-item index="apply">已班列表</el-menu-item>
          <el-menu-item index="conflictcheck">冲突检测</el-menu-item>
        </el-submenu>
        <el-menu-item>
          <router-link :to="{name:'weekplan'}">周计划</router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <!-- :style="{height: scrollerHeight,width: scrollerWidth}" -->
      <div id="main" style="height:700px;width:100%;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "daychart",
  data() {
    return {
      work_points: [], //blade模板语法，IDE报错为误报，结尾必须有分号
      mark_line: [
        { name: "\u82cf\u5e99\u7ad9", yAxis: 14.128 },
        { name: "\u94b1\u6865\u7ad9", yAxis: 15.43144 },
        { name: "\u9f99\u5c71\u68a2\u7ad9", yAxis: 16.892 },
        { name: "\u77f3\u95e8\u8def\u7ad9", yAxis: 18.44503 },
        { name: "\u76db\u5cb8\u7ad9", yAxis: 19.75896 },
        { name: "\u5434\u6865\u7ad9", yAxis: 21.36873 },
        { name: "\u5317\u6805\u53e3\u4e09\u9662\u7ad9", yAxis: 22.52276 },
        { name: "\u65e0\u9521\u706b\u8f66\u7ad9", yAxis: 23.547246 },
        { name: "\u5e7f\u745e\u7ad9", yAxis: 24.8706 },
        { name: "\u9756\u6d77\u7ad9", yAxis: 26.10519 },
        { name: "\u4e1c\u98ce\u7ad9", yAxis: 27.32126 },
        { name: "\u53d9\u4e30\u7ad9", yAxis: 28.31952 },
        { name: "\u592a\u6e56\u82b1\u56ed\u7ad9", yAxis: 29.3671 },
        { name: "\u65b0\u5149\u8def\u7ad9", yAxis: 30.716 },
        { name: "\u65fa\u5e84\u8def\u7ad9", yAxis: 31.65484 },
        { name: "\u9ec4\u5c71\u8def\u7ad9", yAxis: 33.44535 },
        { name: "\u9ad8\u6d6a\u4e1c\u8def\u7ad9", yAxis: 34.3903 },
        { name: "\u5468\u6cfe\u5df7\u7ad9", yAxis: 35.768 },
        { name: "\u65e0\u9521\u65b0\u533a\u7ad9", yAxis: 37.64827 },
        { name: "\u957f\u6c5f\u5357\u8def\u7ad9", yAxis: 38.94032 },
        { name: "\u7855\u653e\u673a\u573a\u7ad9", yAxis: 42.26975 },
        { name: "\u505c\u8f66\u573a", yAxis: 0.77 },
        { name: "\u8f66\u8f86\u6bb5", yAxis: 42.41 }
      ],
      project: {
        id: 4,
        name: "\u65e0\u9521\u5730\u94c1\u4e09\u53f7\u7ebf",
        desc: "\u65e0\u9521\u5730\u94c1\u4e09\u53f7\u7ebf",
        from: 13900.691,
        end: 42410,
        is_finish: 0,
        config: 0,
        created_at: "2018-11-16 10:30:17",
        updated_at: "2018-11-19 13:50:21",
        force_close: 0
      },
      project_line_name: [
        { name: "\u5de6\u7ebf" },
        { name: "\u53f3\u7ebf" },
        { name: "\u5165\u573a\u7ebf(1\u5c40\u6bb5)" },
        { name: "\u51fa\u573a\u7ebf(1\u5c40\u6bb5)" },
        { name: "\u5165\u573a\u7ebf(19\u5c40)" },
        { name: "\u51fa\u573a\u7ebf(19\u5c40)" }
      ],
      project_line: [
        { line_id: 9, from: 13900.691, end: 42410, type: 0 },
        { line_id: 10, from: 13900.691, end: 42410, type: 0 },
        { line_id: 15, from: 0, end: 779.083, type: 1 },
        { line_id: 16, from: 0, end: 770.291, type: 1 },
        { line_id: 17, from: 0, end: 1500, type: 1 },
        { line_id: 18, from: 0, end: 1500, type: 1 }
      ],
      project_kind_name: [
        { name: "A1" },
        { name: "A2" },
        { name: "A3" },
        { name: "A4" }
      ]
    };
  },

  created() {
    //this.getChart();
  },
  methods: {
    getChart() {
      var myChart = this.$echarts.init(document.getElementById("main"));
      //console.log(work_points,project_line_name,project_kind_name);   //服务器获取的数据
      console.log("mark_line：" + JSON.stringify(this.mark_line));
      console.log("project" + JSON.stringify(this.project));
      console.log("project_line_name" + JSON.stringify(this.project_line_name));
      console.log("project_line" + JSON.stringify(this.project_line));

      //将服务器获取的数据处理为坐标系需要的数据格式
      function handle_data(line) {
        if (work_points[line]) {
          for (var i = 0; i < work_points[line].length; i++) {
            data[line][i] = [];
            var data_index = 0;
            for (var k in work_points[line][i]) {
              if (k == "y1" || k == "y2") {
                data[line][i][data_index] = work_points[line][i][k] / 1000;
              } else {
                data[line][i][data_index] = work_points[line][i][k];
              }
              data_index++;
            }
          }
        }
      }

      //图形渲染方法
      var user_company_id = 0;
      function renderItem(params, api) {
        var start = api.coord([api.value(0), api.value(3)]);
        var size = api.size([
          api.value(2) - api.value(0),
          api.value(3) - api.value(1)
        ]);
        var color = api.style().fill;
        var item_company_id = api.value(9);

        if (user_company_id == item_company_id) {
          var style = api.style({ stroke: color, fill: null, lineWidth: 6 });
        } else {
          var style = api.style({
            stroke: color,
            fill: null,
            lineWidth: 3,
            opacity: 0.5
          });
        }

        return {
          type: "rect",
          shape: echarts.graphic.clipRectByRect(
            {
              //此方法会在放缩时截断图形
              x: start[0],
              y: start[1],
              width: size[0],
              height: size[1]
            },
            {
              //此方法必须有第二个参数为边界
              x: params.coordSys.x,
              y: params.coordSys.y,
              width: params.coordSys.width,
              height: params.coordSys.height
            }
          ),
          style: style
        };
      }
      //鼠标悬浮信息窗自定义方法
      function tooltipFormatter(params, ticket, callback) {
        // console.log(params)
        var now = params.data[6].now;
        switch (now) {
          case "新请点":
            var color = "#feff43";
            break;
          case "总批同意":
            var color = "#00df00";
            break;
          case "电批同意":
            var color = "#667e1e";
            break;
          case "已作废":
            var color = "#909090";
            break;
          case "已销点":
            var color = "#cc9d44";
            break;
          case "已完成":
            var color = "#4072ee";
            break;
          case "总批拒绝":
            var color = "red";
            break;
          case "电批拒绝":
            var color = "red";
            break;
          default:
            var color = "orange";
            now = "状态异常，请联系管理员";
        }

        //拼接tooltip内容并返回
        var status =
          '<span style="color:' +
          color +
          ';font-size: 16px">状态 : ' +
          now +
          "</span>";
        var title =
          '<span style="color:#64a7e2;font-size: 20px;font-weight: bolder">' +
          params.data[13] +
          '</span><hr style="margin: 5px">';
        var ser = "<span>作业编号" + " : " + params.data[11] + "</span><br>";
        var seq = "<span>作业令号" + " : " + params.data[8] + "</span><br>";
        var from_time =
          "<span>起始时间" + " : " + params.data[0] + "</span><br>";
        var end_time =
          "<span>结束时间" + " : " + params.data[2] + "</span><br>";
        var start = "<span>作业区间" + " : " + params.data[1] + " km</span>";
        var stop = "<span> 至 " + params.data[3] + " km</span><br>";
        var next =
          "<span>&emsp;&emsp;下一步" +
          " : " +
          params.data[6].next +
          "</span><br>";
        var content =
          '<p>工作内容 : </p><textarea style="background-color: black;overflow-y:hidden;resize: none" cols="30" rows="5">' +
          params.data[14] +
          '</textarea><hr style="margin: 5px">';

        var res =
          title +
          ser +
          seq +
          from_time +
          end_time +
          start +
          stop +
          content +
          status +
          next;
        // setTimeout(function() {
        // 仅为了模拟异步回调
        // callback(ticket,res);
        // }, 1000)
        return res;
      }

      //车站线标
      function markLine(params) {
        return (
          params.name +
          "  DK " +
          Math.floor(params.value) +
          " + " +
          Math.round((params.value - Math.floor(params.value)) * 1000) +
          " "
        );
      }
      // 指定图表的配置项和数据

      //获取本地图例开关历史状态
      if (localStorage.myL) {
        var myL = JSON.parse(localStorage.myL);
      }

      // if(localStorage.myV){
      //     var myV = JSON.parse(localStorage.myV);
      // }

      var data = [];
      var legend_data = [];
      var series = [];
      var pieces = [];
      var kind_color = [
        "red",
        "green",
        "yellow",
        "#467aff",
        "#44ddb5",
        "#c245d3"
      ];
      //根据项目具体线别配置创建出对应格式的series参数
      let project_line_name=this.project_line_name;
      for (var k in project_line_name) {
        //根据服务器返回的当前项目线别循环常见出对应预处理数组
        data[project_line_name[k].name] = [];
        //调用数据格式化函数
        handle_data(project_line_name[k].name);
        //legend.data配置数组
        legend_data[k] = project_line_name[k].name;

        var obj = {
          name: "",
          type: "custom",
          renderItem: renderItem,
          itemStyle: {
            normal: {
              opacity: 0.8
            }
          },
          encode: {
            //编码x与y轴对应哪个维度的数据
            x: [0, 2],
            y: [1, 3]
          },
          data: data[project_line_name[k].name],
          tooltip: {
            formatter: tooltipFormatter
          },
          animation: false
        };

        obj.name = project_line_name[k].name;

        series[k] = obj;
      }

      var series_line_type = {
        name: "车站",
        type: "line",
        markLine: {
          silent: true,
          data: this.mark_line,
          label: {
            position: "start",
            formatter: markLine
          },
          lineStyle: {
            color: "#7a7a7a"
          },
          animation: false
        }
      };

      series[series.length] = series_line_type;
      //根据项目具体类别配置创建出对应格式的pieces参数
      let project_kind_name=this.project_kind_name;
      for (var k in project_kind_name) {
        var obj = {
          value: "",
          label: "",
          color: ""
        };
        obj.value = project_kind_name[k].name;
        obj.label = project_kind_name[k].name;
        obj.color = kind_color[k];

        pieces[k] = obj;
      }
      // console.log(data,legend_data,series,pieces,project);     //处理后的数据

      var option = {
        // title: {
        //     text: 'test'
        // },
        textStyle: {
          color: "#fff"
        },
        tooltip: {},
        legend: {
          type: "scroll",
          data: legend_data,
          selected: myL,
          inactiveColor: "#7A7A7A",
          textStyle: {
            color: "#fff"
          },
          // formatter: function (name) {
          //     return name;
          // },
          selectedMode: "single"
        },
        // grid: {
        //     show:true,
        //     containLabel:true
        // },
        xAxis: {
          type: "time",
          // min: 'dataMin',
          // max: 'dataMax',
          min: 1582300800000,
          max: 1582905600000,
          minInterval: 3600 * 0.5 * 1000,
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
          // name:'里程',
          // nameLocation:'center',
          // nameGap:50,
          min: project.from / 1000,
          // min:'dataMin',
          max: project.end / 1000,
          // max:'dataMax',
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
            xAxisIndex: [0],
            top: 24,
            start: 0,
            end: 100,
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
            left: "91%",
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
            start: 0,
            end: 100
          }
        ],
        series: series,
        visualMap: {
          // min: 1,
          // max: 8,
          // splitNumber: 8,
          // color: ['#d94e5d','#eac736','#50a3ba'],
          // textStyle: {
          //     color: '#fff'
          // },
          // selected:myV,
          pieces: pieces,
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
      if (localStorage.myY) {
        var myY = JSON.parse(localStorage.myY);
        myChart.setOption({
          yAxis: myY
        });
      }
      function getMyDate(str) {
        var oDate = new Date(str),
          oYear = oDate.getFullYear(),
          oMonth = oDate.getMonth() + 1,
          oDay = oDate.getDate(),
          oHour = oDate.getHours(),
          oMin = oDate.getMinutes(),
          oSen = oDate.getSeconds(),
          oTime =
            oYear +
            "-" +
            getzf(oMonth) +
            "-" +
            getzf(oDay) +
            " " +
            getzf(oHour) +
            ":" +
            getzf(oMin) +
            ":" +
            getzf(oSen);
        return oTime;
      }
      //补0操作
      function getzf(num) {
        if (parseInt(num) < 10) {
          num = "0" + num;
        }
        return num;
      }
      //视觉映射开关事件
      var global_v_selected = "";

      myChart.on("datarangeselected", function(params) {
        var filter_data = [];
        for (var k in project_line_name) {
          filter_data[project_line_name[k].name] = [];
        }
        //循环遍历视觉开关，根据状态过滤相应数据
        for (var k in params.selected) {
          //如果开关状态为开启（true）则将此类数据全部添加到对应下别下
          if (params.selected[k]) {
            for (var j in data) {
              if (data[j].length) {
                for (var i in data[j]) {
                  if (data[j][i][7] == project_kind_name[k].name) {
                    filter_data[j].push(data[j][i]);
                  }
                }
              }
            }
          }
        }
        // console.log(data)
        // console.log(filter_data)

        var change_series = [];
        for (var k in project_line_name) {
          var obj = { data: "" };

          obj.data = filter_data[project_line_name[k].name];

          change_series[k] = obj;
        }
        //根据对应的开关重新加载对应的数据
        myChart.setOption({
          series: change_series
        });

        myChart.setOption({
          visualMap: {
            selected: params.selected
          }
        });

        global_v_selected = params.selected;

        var myLegend = myChart.getOption().legend[0].selected;
        // var myVisualMap = myChart.getOption().visualMap[0].selected;
        localStorage.myL = JSON.stringify(myLegend);
        // localStorage.myV = JSON.stringify(myVisualMap);
      });

      myChart.on("legendselectchanged", function(params) {
        for (var k in project_line_name) {
          if (params.name == project_line_name[k].name) {
            let project_line=this.project_line;
            var line_info = project_line[k];
            myChart.setOption({
              yAxis: {
                min: line_info.from / 1000,
                max: line_info.end / 1000
              }
            });
            if (line_info.type == 0) {
              myChart.setOption({
                legend: {
                  selected: {
                    车站: true
                  }
                },
                yAxis: {
                  show: false
                }
              });
            } else {
              myChart.setOption({
                legend: {
                  selected: {
                    车站: false
                  }
                },
                yAxis: {
                  show: true,
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: "#2B2B2B",
                      type: "dotted",
                      width: 1
                    }
                  },
                  axisLabel: {
                    show: true,
                    showMinLabel: true,
                    showMaxLabel: true,
                    formatter: function(value, index) {
                      return value + " km";
                    }
                  }
                }
              });
            }
          }
        }
        myChart.setOption({
          visualMap: {
            selected: global_v_selected
          }
        });
        var myLegend = myChart.getOption().legend[0].selected;
        var myYAxis = myChart.getOption().yAxis[0];
        // var myVisualMap = myChart.getOption().visualMap[0].selected;
        localStorage.myL = JSON.stringify(myLegend);
        localStorage.myY = JSON.stringify(myYAxis);
        // localStorage.myV = JSON.stringify(myVisualMap);
      });

      myChart.resize();
      window.addEventListener("resize", function() {
        myChart.resize();
      });
      // myChart.on('dblclick',function (params) {
      // console.log(params,123)
      // })
      //$(window).resize(function(){
      //    w_h_init();
      //    if(typeof(myChart) != 'undefined'){
      //        myChart.resize()
      //    }
      //});
    }
  }
};
</script>
<style>
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
body {
  font-family: "微软雅黑";
  font-size: 16px !important;
  overflow: auto !important;
}

body {
  background-color: #030a2e;
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
