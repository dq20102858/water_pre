<template>
  <div id="project">
    <div class="el-menu-top">
      <el-menu router default-active="chartdata" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-project.png')" />工程进度
        </li>
        <el-menu-item index="project">添加作业</el-menu-item>
        <el-menu-item index="schedule">计划日程</el-menu-item>
        <el-menu-item index="detaillist">详情列表</el-menu-item>
        <el-menu-item index="chartdata">图表数据</el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div id="echart">
        <div class="echart-top">
          <el-menu :default-active="workSelectId.toString()" class="el-menu-cus" @select="changeWorkTypeList">
            <el-menu-item
              v-for="item  in workTypeList"
              :key="item.id"
              :index="item.id.toString()"
            >{{item.name}}</el-menu-item>
          </el-menu>
          <div class="el-serach">
            <el-date-picker
              v-model="echartDate"
              type="month"
              placeholder="在此选择年月查询"
              format="yyyy-MM"
              value-format="yyyy-MM"
            ></el-date-picker>
            <el-button @click="searchChartByDate">查询</el-button>
          </div>
        </div>
        <div class="app-page-container">
          <div class="chartbox">
            <div id="oneChart"></div>
          </div>
        </div>
        <div class="chart-ontainer">
          <el-row :gutter="20">
            <el-col :span="10">
              <div class="second-content">
                <h2>{{echartDataNames}} 总体完成情况</h2>
                <ul class="oneitem">
                  <li>
                    <p>设计工程量：</p>
                    <h3 class="p1">{{echartDataList.designTotal}}公里</h3>
                  </li>
                  <li>
                    <p>完成百分比：</p>
                    <h3 class="p2">{{echartDataList.percent}}公里</h3>
                  </li>
                </ul>
                <ul class="twoitem">
                  <li>
                    <p>月累完成：</p>
                    <h3>{{echartDataList.monthTotal}}</h3>
                  </li>
                  <li>
                    <p>年累完成：</p>
                    <h3>{{echartDataList.yearTotal}}</h3>
                  </li>
                  <li>
                    <p>开累完成：</p>
                    <h3>{{echartDataList.workTotal}}</h3>
                  </li>
                  <li>
                    <p>剩余工程量：</p>
                    <h3>{{echartDataList.leftTotal}}</h3>
                  </li>
                </ul>
              </div>
            </el-col>
            <el-col :span="14">
              <div class="second-content">
                <div id="thirdChart"></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- end echarts -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      workSelectId: "0",
      workSelectName: "",
      workTypeList: [],
      echartDate: "",
      curMonth: "",
      echartDataList: [],
      echartDataNames: ""
    };
  },
  created() {
    this.getWorkTypeList();
    let nowDate = new Date();
    let date = {
      y: nowDate.getFullYear(),
      m:
        nowDate.getMonth() < 9
          ? "0" + (nowDate.getMonth() + 1)
          : nowDate.getMonth() + 1
    };
    this.curMonth = date.y + "-" + date.m;
  },
  methods: {
    //作业列表
    getWorkTypeList() {
      this.workSelectId = 0;
      this.request({
        url: "/project/getWorkTypeList",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1 && data.data.length > 0) {
          this.workTypeList = data.data;
          this.workSelectId = this.workTypeList[0]["id"].toString();
          this.workSelectName = this.workTypeList[0]["name"];
          this.echartDate = "";
          this.getCharData(
            this.workSelectId,
            this.curMonth,
            this.workSelectName
          );
        }
      });
    },
    //选择作业
    changeWorkTypeList(key) {
      let date = this.curMonth;
      if (this.echartDate != "" && this.echartDate != null) {
        date = this.echartDate;
      }
      this.workTypeList.map((item, i) => {
        if (item.id == key) {
          this.workSelectId = item.id;
          this.workSelectName = item.name;
        }
      });
      this.getCharData(key, date, this.workSelectName);
    },
    //查询
    searchChartByDate() {
      let date = this.curMonth;
      if (this.echartDate != "" && this.echartDate != null) {
        date = this.echartDate;
      }

      // this.workTypeList.map((item, i) => {
      //   if (item.id == key) {
      //      this.workSelectId= item.id;
      //     this.workSelectName = item.name;
      //   }
      // });
      this.getCharData(this.workSelectId, date, this.workSelectName);
    },
    //图表一
    getCharData(proId, date, proName) {
      this.getOneChart(proId, date, proName);
      this.getSecondChart(proId, date, proName);
      this.getThirdChart(proId, date, proName);
    },
    getOneChart(proId, date, proName) {
      this.request({
        url: "/project/getData",
        method: "get",
        params: { proId: proId, date: date }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          let myChart = this.$echarts.init(document.getElementById("oneChart"));
          myChart.setOption({
            title: {
              text: proName + "  " + date + "  单位：公里",
              textStyle: {
                color: "#1D397A",
                fontWeight: "400",
                fontSize: 14
              }
            },
            tooltip: {
              trigger: "axis"
            },
            color: ["#4b6eca", "#ff5c75"],
            legend: {
              data: ["计划", "实际"],
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
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: data.data.x
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                name: "计划",
                type: "line",
                data: data.data.list[0].data
              },
              {
                name: "实际",
                type: "line",
                data: data.data.list[1].data
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
    getSecondChart(proId, date, proName) {
      this.request({
        url: "/project/getSecond",
        method: "get",
        params: { proId: proId, date: date }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.echartDataList = data.data;
          this.echartDataNames = proName;
          console.log("echartDataList：" + this.echartDataList);
        }
      });
    },
    getThirdChart(proId, date, proName) {
      this.request({
        url: "/project/getThird",
        method: "get",
        params: { proId: proId, date: date }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          let myChart = this.$echarts.init(
            document.getElementById("thirdChart")
          );
          myChart.setOption({
            title: {
              text: ""
            },
            tooltip: {
              trigger: "axis"
            },
            color: ["#4b6eca", "#ff5c75"],
            legend: {
              data: ["计划", "实际"],
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
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: [
              {
                type: "category",
                boundaryGap: false,
                data: data.data.x
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
                data: data.data.list[0].data
              },
              {
                name: "实际",
                type: "bar",
                data: data.data.list[1].data
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
    }
    //
  }
};
</script>
<style>
.el-form-item-inline .el-form-item {
  float: left;
  white-space: nowrap;
}
.el-form-item-inline .el-input__inner {
  width: 220px;
}
.chart-ontainer {
  margin: 20px 0;
}
.second-content {
  height: 340px;
  background: #fff;
  padding: 20px;
  border-radius: 6px;
}
.second-content h2 {
  color: #1d397a;
  font-size: 18px;
  margin-bottom: 50px;
  font-weight: 400;
}
.second-content .oneitem {
  text-align: center;
  margin: 70px 40px;
  display: flex;
  justify-content: space-between;
}
.second-content .oneitem p {
  color: #1d397a;
  font-size: 15px;
  line-height: 41px;
}
.second-content .oneitem .p1 {
  color: #ff5c75;
  font-size: 20px;
}
.second-content .oneitem .p2 {
  color: #27db07;
  font-size: 20px;
}
.second-content .twoitem {
  padding: 0 -15px;
  display: flex;
  justify-content: space-between;
}
.second-content .twoitem li {
  border-right: 1px #b8ccfb solid;
  padding: 0 15px;
}
.second-content .twoitem li:last-child {
  border: 0;
}
.second-content .twoitem p {
  color: #4b6eca;
  font-size: 14px;
  line-height: 31px;
}
.second-content .twoitem h3 {
  color: #1d397a;
  font-size: 16px;
  text-align: center;
}
.chartbox {
  width: 100%;
  height: 100%;
}
#oneChart {
  width: 100%;
  height: 400px;
  box-sizing: border-box;
}
#thirdChart {
  width: 100%;
  height: 300px;
  box-sizing: border-box;
}
.echart-top {
  overflow: hidden;
  margin-bottom: 20px;
}
.el-menu-cus {
  float: left;
  background: none;
  border: 0;
}
.el-menu-cus .el-menu-item {
  display: inline-block;
  margin-right: 10px;
  color: #1d397a;
  height: 35px;
  line-height: 36px;
  font-size: 16px;
  padding: 0 12px;
}
.el-menu-cus .el-menu-item.is-active {
  background: #4b6eca;
  color: #fff;
  border-radius: 3px;
}
.el-serach {
  float: right;
  border: 2px #4b6eca solid;
  border-radius: 3px;
}
.el-serach .el-date-editor {
  width: 178px;
}
.el-serach .el-input__inner {
  background: none;
  border: none;
  color: #4b6eca;
  width: 178px;
}
.el-serach .el-input__inner:placeholder {
  color: #4b6eca;
}
.el-serach .el-input__inner:-webkit-input-placeholder {
  color: #4b6eca;
}
.el-serach .el-input__inner:-moz-placeholder {
  color: #4b6eca;
}
.el-serach .el-input__inner:-ms-input-placeholder {
  color: #4b6eca;
}
.el-serach .el-button {
  background: #4b6eca;
  color: #fff;
}
.app-page-container {
  border-radius: 6px;
  padding: 20px;
  background: #fff;
}
</style>
