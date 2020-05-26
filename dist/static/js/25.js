webpackJsonp([25],{

/***/ "WfHw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/run_monitor/index.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var run_monitor = ({
  data: function data() {
    var _this = this;

    var valEndTime = function valEndTime(rule, value, callback) {
      if (value < +_this.formData.start_time) {
        callback(new Error("结束时间不能小于开始时间"));
      } else {
        callback();
      }
    };
    var valEditEndTime = function valEditEndTime(rule, value, callback) {
      if (new Date(value) < new Date(_this.formEditData.start_time)) {
        callback(new Error("结束时间不能小于开始时间"));
      } else {
        callback();
      }
    };
    var valEditTrueEndTime = function valEditTrueEndTime(rule, value, callback) {
      if (new Date(value) < new Date(_this.formEditData.true_start_time)) {
        callback(new Error("结束时间不能小于开始时间"));
      } else {
        callback();
      }
    };
    return {
      mark_line: [],
      project_kind_name: [],
      kcolor: ["red", "green", "yellow", "#467aff", "#44ddb5", "#c245d3"],
      todayValue: new Date(),
      todayPreValue: "",
      todayNextValue: "",
      diaLogFormVisible: false,
      diaLogTitle: "计划图",
      formData: {
        plan_type: 1,
        car_type: ""
      },
      locoList: [],
      lineTypeList: [],
      masterList: [],
      driverList: [],
      stationList: [],
      workTypeList: [],
      workLineTypeList: [],
      workTypeFlag: 1,
      userList: [],
      formRules: {
        number: [{
          required: true,
          message: "请输入编号2~20个字符",
          trigger: "blur"
        }, { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }, {
          pattern: /(^\S+).*(\S+$)/,
          message: "开始和结尾不能有空格",
          trigger: "blur"
        }],
        start_time: [{
          required: true,
          message: "请选择开始时间",
          trigger: "change"
        }],
        end_time: [{
          required: true,
          message: "请选择结束时间",
          trigger: "change"
        }, { required: true, validator: valEndTime, trigger: "change" }],
        work_type: [{ required: true, message: "请选择线别", trigger: "change" }],
        line_type: [{ required: true, message: "请选择线别", trigger: "change" }],
        start_station: [{
          required: true,
          message: "请选择开始站点",
          trigger: "change"
        }],
        end_station: [{
          required: true,
          message: "请选择结束站点",
          trigger: "change"
        }],
        start_flag: [{
          required: true,
          message: "请输入公里",
          trigger: "blur"
        }],
        start_length: [{
          required: true,
          message: "请输入米",
          trigger: "blur"
        }],
        end_flag: [{
          required: true,
          message: " 请输入公里",
          trigger: "blur"
        }],
        end_length: [{
          required: true,
          message: "请输入米",
          trigger: "blur"
        }]
      },
      formEditRules: {
        number: [{
          required: true,
          message: "请输入编号2~20个字符",
          trigger: "blur"
        }, { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }, {
          pattern: /(^\S+).*(\S+$)/,
          message: "开始和结尾不能有空格",
          trigger: "blur"
        }],
        start_time: [{
          required: true,
          message: "请选择开始时间",
          trigger: "change"
        }],
        end_time: [{
          required: true,
          message: "请选择结束时间",
          trigger: "change"
        }, { required: true, validator: valEditEndTime, trigger: "change" }],
        work_type: [{ required: true, message: "请选择线别", trigger: "change" }],
        line_type: [{ required: true, message: "请选择线别", trigger: "change" }],
        start_station: [{
          required: true,
          message: "请选择开始站点",
          trigger: "change"
        }],
        end_station: [{
          required: true,
          message: "请选择结束站点",
          trigger: "change"
        }],
        start_flag: [{
          required: true,
          message: "请输入公里",
          trigger: "blur"
        }],
        start_length: [{
          required: true,
          message: "请输入米",
          trigger: "blur"
        }],
        end_flag: [{
          required: true,
          message: " 请输入公里",
          trigger: "blur"
        }],
        end_length: [{
          required: true,
          message: "请输入米",
          trigger: "blur"
        }],
        true_start_time: [{
          required: true,
          message: "请选择开始时间",
          trigger: "change"
        }],
        true_end_time: [{
          required: true,
          message: "请选择结束时间",
          trigger: "change"
        }, { required: true, validator: valEditTrueEndTime, trigger: "change" }],
        record_id: [{
          required: true,
          message: "请选择记录人",
          trigger: "change"
        }],
        true_start_flag: [{
          required: true,
          message: "请输入公里",
          trigger: "blur"
        }],
        true_start_length: [{
          required: true,
          message: "请输入米",
          trigger: "blur"
        }],
        true_end_flag: [{
          required: true,
          message: " 请输入公里",
          trigger: "blur"
        }],
        true_end_length: [{
          required: true,
          message: "请输入米",
          trigger: "blur"
        }]
      },
      diaLogFormEditVisible: false,
      diaLogTitleEdit: "",
      formEditData: {},
      numberId: 0,
      planNumbersList: [],
      select_line_type: [],
      select_type_plan: true,
      select_type_now: true,
      select_loco_type: [],
      departLists: [],
      itemLists: [],
      workSortLists: [],
      lineTypeListDes: [],
      lineTypeDes: "",
      lineTypeStartTotal: 0,
      lineTypeEndTotal: 0,
      reasonShow: true
    };
  },
  created: function created() {
    this.getPageLoad();
  },

  methods: {
    getPageLoad: function getPageLoad() {
      this.getLocomotiveLists(); //机车
      this.getLineTypeList(); //线别
    },
    getChart: function getChart() {
      var _this2 = this;

      this.formData.date = this.todayValue;
      this.todayPreValue = this.getNextDate(this.todayValue, -1);
      this.todayNextValue = this.getNextDate(this.todayValue, 1);
      var start_time = this.getNextDate(this.todayValue, -1, "-");
      var end_time = this.getNextDate(this.todayValue, 1, "-");
      var line_type = this.select_line_type.toString();
      var type = 1;
      var loco_type = this.select_loco_type.toString();
      this.request({
        url: "/dayplan/getLineDatas",
        method: "get",
        params: { start_time: start_time, end_time: end_time, line_type: line_type, type: type, loco_type: loco_type }
      }).then(function (res) {
        var resdata = res.data;
        if (resdata.status == 1) {
          //myChart
          var myChart = _this2.$echarts.init(document.getElementById("main"));
          myChart.clear();
          myChart.getDom().style.width = "2000px";
          myChart.getDom().style.height = document.body.clientHeight - 260 + "px";
          //站点=============
          _this2.mark_line = [];
          resdata.data.stations.map(function (item) {
            _this2.mark_line.push({
              name: item.name + " DK " + item.start_flag + " + " + item.start_length,
              yAxis: item.start_flag + item.start_length / 1000
            });
          });
          var minLineNum = Math.min.apply(Math, _this2.mark_line.map(function (item) {
            return parseInt(item.yAxis - 1);
          }));
          var maxLineNum = Math.max.apply(Math, _this2.mark_line.map(function (item) {
            return parseInt(item.yAxis + 1);
          }));
          // 数据
          var seriesData = [];
          seriesData.push({
            name: "车站",
            type: "line",
            markLine: {
              silent: true,
              data: _this2.mark_line,
              symbol: ["none"],
              label: {
                show: false,
                normal: {
                  position: "left",
                  formatter: function formatter(value, index) {
                    return value.name;
                  }
                }
              },
              lineStyle: {
                normal: {
                  type: "solid",
                  color: "#1D397A"
                }
              }
            }
          });
          //划线  计划线 实际线
          var dataTypeArr = resdata.data.plan;
          var lineTypeData = [];
          dataTypeArr.forEach(function (item, index) {
            var start_flag_list = [];
            var end_flag_list = [];
            var true_start_flag_list = [];
            var true_end_flag_list = [];
            start_flag_list.push(item.start_time, parseFloat(item.start_flag) + parseFloat(item.start_length / 1000));
            end_flag_list.push(item.end_time, parseFloat(item.end_flag) + parseFloat(item.end_length / 1000));
            if (_this2.select_type_plan) {
              var colors = "#0000ff";
              if (item.line_type == 1) {
                colors = "#0099cc";
              } else if (item.line_type == 2) {
                colors = "#0000ff";
              } else if (item.line_type == 3) {
                colors = "#9900ff";
              } else {
                colors = "#660033";
              }
              lineTypeData.push({
                color: colors,
                lists: [start_flag_list, end_flag_list]
              });
            }
            if (item.true_start_time != "") {
              true_start_flag_list.push(item.true_start_time, parseFloat(item.true_start_flag) + parseFloat(item.true_start_length / 1000));
              true_end_flag_list.push(item.true_end_time, parseFloat(item.true_end_flag) + parseFloat(item.true_end_length / 1000));
              if (_this2.select_type_now) {
                lineTypeData.push({
                  color: "#2dca2d",
                  lists: [true_start_flag_list, true_end_flag_list]
                });
              }
            }
          });
          for (var k in lineTypeData) {
            seriesData.push({
              type: "line",
              itemStyle: { normal: { color: lineTypeData[k].color } },
              data: lineTypeData[k].lists
            });
          }
          //console.log("seriesLineData" + JSON.stringify(seriesData));
          //时间
          var dataMin = new Date(_this2.todayValue.getTime() - 24 * 60 * 60 * 1000).setHours(17);
          var dataMax = new Date(_this2.todayValue.getTime() + 24 * 60 * 60 * 1000).setHours(19);

          //option
          var option = {
            textStyle: {
              color: "#1D397A"
            },
            tooltip: {
              trigger: "none",
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
              top: "25px",
              left: "180px",
              right: "20px",
              bottom: "50px"
            },
            xAxis: {
              type: "time",
              position: "bottom",
              min: dataMin,
              max: dataMax,
              maxInterval: 3600 * 0.1 * 1000,
              axisLabel: {
                formatter: function formatter(val, index) {
                  var date = new Date(val);
                  var months = date.getMonth() + 1 + "/" + date.getDate();
                  var hours = date.getHours() + ":00";
                  if (index % 6 == 0) {
                    return months + "\n" + hours;
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
              max: maxLineNum
            },
            // dataZoom: [
            //   {
            //     show: true,
            //     realtime: true,
            //     zoomLock: true,
            //     start: 0,
            //     end: 50
            //   },
            //   {
            //     type: "inside",
            //     realtime: true,
            //     zoomOnMouseWheel: false,
            //     start: 0,
            //     end: 50
            //   }
            // ],
            series: seriesData
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option, true);
          myChart.resize();
          window.addEventListener("resize", function () {
            myChart.resize();
          });
        }
      });
    },

    //date 代表指定的日期，格式：2018-09-27 day 传-1表始前一天，传1表始后一天
    getNextDate: function getNextDate(date, day, flag) {
      var dd = new Date(date);
      dd.setDate(dd.getDate() + day);
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      if (flag == "-") {
        return y + "-" + m + "-" + d;
      } else {
        return y + "年" + m + "月" + d + "日";
      }
    },
    preDate: function preDate() {
      //前一天
      this.todayValue = new Date(this.todayValue.getTime() - 24 * 60 * 60 * 1000);
      this.getChart();
    },
    nextDate: function nextDate() {
      //后一天
      this.todayValue = new Date(this.todayValue.getTime() + 24 * 60 * 60 * 1000);
      this.getChart();
    },

    //from
    getLocomotiveLists: function getLocomotiveLists() {
      var _this3 = this;

      this.request({
        url: "/dispatch/getLocomotiveLists",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this3.locoList = data.data;
          _this3.locoList.map(function (item) {
            _this3.select_loco_type.push(item.id);
          });
          //this.getChart();
          _this3.$set(_this3.formData, "out_business_loco", _this3.locoList[0]["id"]);
          _this3.$set(_this3.formData, "back_business_loco", _this3.locoList[0]["id"]);
        }
      });
    },
    getLineTypeList: function getLineTypeList() {
      var _this4 = this;

      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this4.lineTypeList = data.data;
          _this4.lineTypeList.map(function (item) {
            _this4.select_line_type.push(item.id);
          });
          _this4.getChart();
          _this4.$set(_this4.formData, "out_line_type", _this4.lineTypeList[0]["id"]);
          _this4.$set(_this4.formData, "back_line_type", _this4.lineTypeList[0]["id"]);
          _this4.$set(_this4.formData, "line_type", _this4.lineTypeList[0]["id"]);
        }
      });
    },

    //5:车长,6:司机,7:调度值班员，8：车站值班员 /dispatch/getUsersLists
    getMasterList: function getMasterList() {
      var _this5 = this;

      this.request({
        url: "/dispatch/getUsersLists?role_id=5",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this5.masterList = data.data;
          _this5.$set(_this5.formData, "out_master_id", _this5.masterList[0]["id"]);
          _this5.$set(_this5.formData, "back_master_id", _this5.masterList[0]["id"]);
        }
      });
    },
    getdriverList: function getdriverList() {
      var _this6 = this;

      this.request({
        url: "/dispatch/getUsersLists?role_id=6",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this6.driverList = data.data;
          _this6.$set(_this6.formData, "out_driver_id", _this6.driverList[0]["id"]);
          _this6.$set(_this6.formData, "back_driver_id", _this6.driverList[0]["id"]);
        }
      });
    },
    getStationList: function getStationList() {
      var _this7 = this;

      this.request({
        url: "/apply/getStationLists",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this7.stationList = data.data;
          // this.$set(this.formData, "start_station", this.stationList[0]["id"]);
          //this.$set(this.formData, "end_station", this.stationList[0]["id"]);
        }
      });
    },
    changeStartStation: function changeStartStation(value) {
      var _this8 = this;

      //alert(value);
      this.stationList.map(function (item) {
        if (item.id == value) {
          _this8.$set(_this8.formData, "start_flag", parseFloat(item.start_flag));
          _this8.$set(_this8.formData, "start_length", parseFloat(item.start_length));
          _this8.$set(_this8.formEditData, "start_flag", parseFloat(item.start_flag));
          _this8.$set(_this8.formEditData, "start_length", parseFloat(item.start_length));
        }
      });
    },
    changeEndStation: function changeEndStation(value) {
      var _this9 = this;

      this.stationList.map(function (item) {
        if (item.id == value) {
          _this9.$set(_this9.formData, "end_flag", parseFloat(item.start_flag));
          _this9.$set(_this9.formData, "end_length", parseFloat(item.start_length));
          _this9.$set(_this9.formEditData, "end_flag", parseFloat(item.start_flag));
          _this9.$set(_this9.formEditData, "end_length", parseFloat(item.start_length));
        }
      });
    },
    getWorkTypeList: function getWorkTypeList() {
      var _this10 = this;

      this.request({
        url: "/project/getWorkTypeList",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          var workTypeJson = data.data.filter(function (e) {
            return e.type == 1;
          });
          _this10.workTypeList = workTypeJson;
          // let wordId = this.workTypeList[0]["id"];
          // this.$set(this.formData, "work_type", wordId);
          // this.changeWorkListItem(wordId);
        }
      });
    },
    getWorkTypeListEdit: function getWorkTypeListEdit(val, val2) {
      var _this11 = this;

      this.request({
        url: "/project/getWorkTypeList",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          var workTypeJson = data.data.filter(function (e) {
            return e.type == 1;
          });
          _this11.workTypeList = workTypeJson;
          // let wordId = this.workTypeList[0]["id"];
          // this.$set(this.formData, "work_type", wordId);
          _this11.changeWorkListItem(val);
          _this11.changeWorkLineTypeList(val2);
        }
      });
    },
    changeWorkListItem: function changeWorkListItem(value) {
      var that = this;
      this.$set(this.formData, "line_type", "");
      var selectedLineTypeLists = [];
      var selectedLineTypeDes = [];
      this.workTypeList.forEach(function (item) {
        if (item.id == value) {
          selectedLineTypeLists = item.line_type_lists;
          selectedLineTypeDes = item.des;
          that.workTypeFlag = item.type;
        }
      });
      this.workLineTypeList = selectedLineTypeLists;
      this.lineTypeListDes = selectedLineTypeDes;
      // this.$set(this.formData, "line_type", selectedLineTypeLists[0]["id"]);
    },
    changeWorkLineTypeList: function changeWorkLineTypeList(value) {
      var _this12 = this;

      this.lineTypeListDes.map(function (item, i) {
        if (item.line_type == value) {
          _this12.lineTypeDes = item.tip;
          _this12.lineTypeStartTotal = item.total_start_flag * 1000 + parseInt(item.total_start_length);
          _this12.lineTypeEndTotal = item.total_end_flag * 1000 + parseInt(item.total_end_length);
          console.log("lineTypeStartTotal：" + _this12.lineTypeStartTotal + " lineTypeEndTotal：" + _this12.lineTypeEndTotal);
          //console.log(item.tip);
        }
      });
    },
    getDepartList: function getDepartList() {
      var _this13 = this;

      this.request({
        url: "/dayplan/getWorkTeamLists",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this13.departLists = data.data;
          //console.log("this.departLists：" + this.departLists);
        }
      });
    },
    geItemList: function geItemList() {
      var _this14 = this;

      this.request({
        url: "/set/getItemLists",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this14.itemLists = data.data.data;
        }
      });
    },
    getWorkSortList: function getWorkSortList() {
      var _this15 = this;

      this.request({
        url: "/set/getWorkSortLists",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this15.workSortLists = data.data.data;
        }
      });
    },
    planAdd: function planAdd() {
      this.diaLogTitle = "计划图";
      this.diaLogFormVisible = true;
      this.formData.line_type = "";
      this.getMasterList(); //车长
      this.getdriverList(); //司机
      this.getStationList(); //车站
      this.getWorkTypeList(); //作业类型
      this.getDepartList(); //施工队
      this.geItemList(); //项目
      this.getWorkSortList(); //工序
    },
    addDayPlanDialog: function addDayPlanDialog() {
      var _this16 = this;

      this.$refs["formRules"].validate(function (valid) {
        if (valid) {
          var data = _this16.formData;
          if (+_this16.formData.end_time < +_this16.formData.start_time) {
            _this16.$message.error("施工开始时间不能大于结束时间");
            return false;
          }
          var start = _this16.formData.start_flag * 1000 + parseInt(_this16.formData.start_length);
          var end = _this16.formData.end_flag * 1000 + parseInt(_this16.formData.end_length);
          if (start < _this16.lineTypeStartTotal || end > _this16.lineTypeEndTotal) {
            _this16.$message.error("请输入" + _this16.lineTypeDes);
            return;
          }
          if (end < start) {
            _this16.$message.error({
              duration: 5000,
              message: "输入的开始里程不能大于结束里程"
            });
            return;
          }

          _this16.request({
            url: "/dayplan/addDayPlan",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this16.diaLogFormVisible = false;
              _this16.formData.number = "";
              _this16.formData.start_time = "";
              _this16.formData.end_time = "";

              _this16.$message({
                type: "success",
                message: "保存成功！"
              });
              _this16.getChart();
            }
          });
        }
      });
    },

    //編輯
    getUserLists: function getUserLists() {
      var _this17 = this;

      this.request({
        url: "/dayplan/getUserLists",
        method: "get"
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this17.userList = data.data;
          // debugger
          // if (this.formEditData.record_id == null) {
          //   let record_id = this.userList[0]["id"];
          //   this.formEditData.record_id = record_id;
          // }
          // this.$set(this.formEditData, "record_id", record_id);
        }
      });
    },
    getPlanNumbers: function getPlanNumbers() {
      var _this18 = this;

      var todayNum = this.todayValue;
      var start_time = this.getNextDate(todayNum, -1, "-"); //前一天
      var end_time = this.getNextDate(todayNum, 1, "-"); //后一天
      this.request({
        url: "/dayplan/getPlanNumbers",
        method: "get",
        params: {
          start_time: start_time,
          end_time: end_time
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          _this18.planNumbersList = data.data;
          if (_this18.numberId == 0) {
            _this18.numberId = _this18.planNumbersList[0]["id"];
          }
          _this18.getPlanDetail(_this18.numberId);
        }
      });
    },
    selectPlanNumbers: function selectPlanNumbers(value) {
      this.getPlanDetail(value);
      this.numberId = value;
    },
    getPlanDetail: function getPlanDetail(id) {
      var _this19 = this;

      this.request({
        url: "/dayplan/getDayPlanDetail",
        method: "get",
        params: { id: id }
      }).then(function (response) {
        var data = response.data;
        if (data.status == 1) {
          _this19.formEditData = data.data;
          _this19.getdriverList(); //司机
          _this19.getStationList(); //车站

          _this19.getDepartList(); //施工队
          _this19.geItemList(); //项目
          _this19.getWorkSortList(); //工序

          _this19.getWorkTypeListEdit(_this19.formEditData.work_type, _this19.formEditData.line_type);
          _this19.formEditData.line_type = data.data.line_type.toString();
          _this19.formEditData.date = _this19.formData.date;
          if (data.data.out_reco == "0") {
            _this19.formEditData.out_reco = "";
          }

          if (data.data.out_supple == "0") {
            _this19.formEditData.out_supple = "";
          }

          if (data.data.back_reco == "0") {
            _this19.formEditData.back_reco = "";
          }

          if (data.data.back_supple == "0") {
            _this19.formEditData.back_supple = "";
          }

          _this19.formEditData.start_flag = parseFloat(data.data.start_flag);
          _this19.formEditData.start_length = parseFloat(data.data.start_length);
          _this19.formEditData.end_flag = parseFloat(data.data.end_flag);
          _this19.formEditData.end_length = parseFloat(data.data.end_length);

          if (data.data.work_plan_id == "0") {
            _this19.formEditData.work_plan_id = "";
          }
          _this19.formEditData.item_id = data.data.item_id;
          _this19.formEditData.work_id = data.data.work_id;
          if (data.data.item_id == "0") {
            _this19.formEditData.item_id = "";
          }
          if (data.data.work_id == "0") {
            _this19.formEditData.work_id = "";
          }

          _this19.formEditData.status = _this19.formEditData.status == 1 ? true : false;
          if (_this19.formEditData.status) {
            _this19.reasonShow = false;
          }
          //
          // (this.formEditData.record_id =
          //   data.data.record_id == null
          //     ? this.formEditData.record_id
          //     : data.data.record_id),
          //   (this.formEditData.true_start_time =
          //     data.data.true_start_time == ""
          //       ? data.data.start_time
          //       : data.data.true_start_time),
          //   (this.formEditData.true_end_time =
          //     data.data.true_end_time == ""
          //       ? data.data.end_time
          //       : data.data.true_end_time),
          //   (this.formEditData.true_start_flag =
          //     data.data.true_start_flag == null
          //       ? parseFloat(data.data.start_flag)
          //       : parseFloat(data.data.true_start_flag)),
          //   (this.formEditData.true_start_length =
          //     data.data.true_start_length == null
          //       ? parseFloat(data.data.start_length)
          //       : parseFloat(data.data.true_start_length)),
          //   (this.formEditData.true_end_flag =
          //     data.data.true_end_flag == null
          //       ? parseFloat(data.data.end_flag)
          //       : parseFloat(data.data.true_end_flag)),
          //   (this.formEditData.true_end_length =
          //     data.data.true_end_length == null
          //       ? parseFloat(data.data.end_length)
          //       : parseFloat(data.data.true_end_length)),
          console.log(_this19.formEditData);
        }
      });
    },
    planEdit: function planEdit() {
      var _this20 = this;

      var todayNum = this.todayValue;
      var start_time = this.getNextDate(todayNum, -1, "-"); //前一天
      var end_time = this.getNextDate(todayNum, 1, "-"); //后一天
      this.request({
        url: "/dayplan/getPlanNumbers",
        method: "get",
        params: {
          start_time: start_time,
          end_time: end_time
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status == 1) {
          if (data.data.length > 0) {
            _this20.diaLogTitleEdit = "日班实际图";
            _this20.diaLogFormEditVisible = true;

            _this20.planNumbersList = data.data;
            if (_this20.numberId == 0) {
              _this20.numberId = _this20.planNumbersList[0]["id"];
            }
            _this20.getPlanDetail(_this20.numberId);
            // this.getPlanNumbers(); //日班计划列表
            _this20.getUserLists(); //记录人
          } else {
            _this20.$alert("<strong>当天没有计划！</strong>", "提示信息", {
              dangerouslyUseHTMLString: true
            });
            // this.$message({
            //   type: "warning",
            //   message: "当天没有计划！"
            // });
          }
        }
      });
    },
    formStatus: function formStatus() {
      this.reasonShow = !this.reasonShow;
    },
    updateDayTrueplan: function updateDayTrueplan() {
      var _this21 = this;

      this.$refs["refFormEditRules"].validate(function (valid) {
        if (valid) {
          var data = _this21.formEditData;
          var dataa = data.end_time;

          if (+_this21.formEditData.end_time < +_this21.formEditData.start_time) {
            _this21.$message.error("施工开始时间不能大于结束时间");
            return false;
          }
          var start = _this21.formEditData.true_start_flag * 1000 + parseInt(_this21.formEditData.true_start_length);
          var end = _this21.formEditData.true_end_flag * 1000 + parseInt(_this21.formEditData.true_end_length);
          console.log("dd:" + _this21.lineTypeStartTotal);
          if (start < _this21.lineTypeStartTotal || end > _this21.lineTypeEndTotal) {
            _this21.$message.error("请输入" + _this21.lineTypeDes);
            return;
          }
          if (end < start) {
            _this21.$message.error({
              duration: 5000,
              message: "输入的开始里程不能大于结束里程"
            });
            return;
          }

          // if (new Date(data.end_time) < new Date(data.start_time)) {
          //   this.$message.error("施工开始时间不能大于结束时间");
          //   return false;
          // }
          // if (new Date(data.true_end_time) < new Date(data.true_start_time)) {
          //   this.$message.error("实际施工开始时间不能大于结束时间");
          //   return false;
          // }
          _this21.request({
            url: "/dayplan/updateDayTrueplan",
            method: "post",
            data: data
          }).then(function (response) {
            var data = response.data;
            if (data.status == 1) {
              _this21.diaLogFormEditVisible = false;
              _this21.getChart();
              _this21.$message({
                type: "success",
                message: "保存成功！"
              });
            }
          });
        } else {
          console.log("操作失败！");
          return false;
        }
      });
    },


    //多选操作
    selectDatePicker: function selectDatePicker(value) {
      this.todayValue = value;
      //this.$set(this.todayValue, value);
      this.getChart();
    },
    refreshPage: function refreshPage() {
      this.todayValue = new Date();
      this.getChart();
      // this.getPageLoad();
      // this.select_type_plan = true;
      // this.select_type_now = true;
    },
    selectLineTypeChart: function selectLineTypeChart(value) {
      this.getChart();
    },
    selectTypePlanChart: function selectTypePlanChart(value) {
      //alert(this.select_line_type);
      this.select_type_plan = value;
      this.getChart();
    },
    selectTypeNowChart: function selectTypeNowChart(value) {
      this.select_type_now = value;
      this.getChart();
    },
    selectLocoTypeChart: function selectLocoTypeChart(value) {
      //alert(this.select_line_type);
      this.getChart();
    }
    //

  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-564a4e9e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/run_monitor/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app-monitor-chart"}},[_c('div',{staticClass:"maintitle"},[_vm._v(_vm._s(_vm.todayPreValue)+" 18时 -— "+_vm._s(_vm.todayNextValue)+" 18时轨行区作业分布图")]),_vm._v(" "),_c('div',{staticClass:"app-page"},[_c('div',{staticClass:"app-page-container"},[_c('div',{staticClass:"app-page-adds"},[_c('div',{staticClass:"btnitem"},[_c('el-button',{attrs:{"type":"primary","plain":""},on:{"click":_vm.planAdd}},[_vm._v("编制日班计划图")])],1),_vm._v(" "),_c('div',{staticClass:"btnitem"},[_c('el-button',{attrs:{"type":"primary ","plain":""},on:{"click":_vm.planEdit}},[_vm._v("编制日班实际图")])],1),_vm._v(" "),_c('div',{staticClass:"btnitem"},[_c('el-button',{attrs:{"type":"primary","plain":""},on:{"click":_vm.refreshPage}},[_vm._v("刷新")])],1),_vm._v(" "),_c('div',{staticClass:"btnitem"},[_c('el-date-picker',{staticStyle:{"width":"160px"},attrs:{"type":"date","placeholder":"选择日期","clearable":false},on:{"input":function($event){_vm.selectDatePicker($event)}},model:{value:(_vm.formData.date),callback:function ($$v) {_vm.$set(_vm.formData, "date", $$v)},expression:"formData.date"}}),_vm._v(" "),_c('el-button',{attrs:{"type":"primary","plain":""},on:{"click":_vm.preDate}},[_vm._v("前一天")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary","plain":""},on:{"click":_vm.nextDate}},[_vm._v("后一天")])],1)]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{staticClass:"sidebox"},[_c('div',{staticClass:"chklist chlone"},[_c('el-checkbox-group',{on:{"change":_vm.selectLineTypeChart},model:{value:(_vm.select_line_type),callback:function ($$v) {_vm.select_line_type=$$v},expression:"select_line_type"}},_vm._l((_vm.lineTypeList),function(item){return _c('el-checkbox',{key:item.id,attrs:{"label":item.id}},[_vm._v(_vm._s(item.name))])}))],1),_vm._v(" "),_c('div',{staticClass:"chklist"},[_c('el-checkbox',{attrs:{"label":"计划图","checked":""},on:{"change":_vm.selectTypePlanChart}}),_vm._v(" "),_c('el-checkbox',{staticClass:"chkshiji",attrs:{"label":"实际图","checked":""},on:{"change":_vm.selectTypeNowChart}})],1),_vm._v(" "),_c('div',{staticClass:"chklist chltwo"},[_c('el-checkbox-group',{on:{"change":_vm.selectLocoTypeChart},model:{value:(_vm.select_loco_type),callback:function ($$v) {_vm.select_loco_type=$$v},expression:"select_loco_type"}},_vm._l((_vm.locoList),function(item){return _c('el-checkbox',{key:item.id,attrs:{"label":item.id}},[_vm._v(_vm._s(item.name))])}))],1)])])]),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-monitor",attrs:{"width":"998px","close-on-click-modal":false,"title":this.diaLogTitle,"visible":_vm.diaLogFormVisible},on:{"update:visible":function($event){_vm.diaLogFormVisible=$event}}},[_c('el-form',{ref:"formRules",staticClass:"el-form-custom",attrs:{"inline":true,"model":_vm.formData,"rules":_vm.formRules}},[_c('el-form-item',{attrs:{"label":"日班计划编号：","prop":"number"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20","show-word-limit":""},model:{value:(_vm.formData.number),callback:function ($$v) {_vm.$set(_vm.formData, "number", $$v)},expression:"formData.number"}})],1),_vm._v(" "),_c('el-form-item',[_c('el-select',{model:{value:(_vm.formData.plan_type),callback:function ($$v) {_vm.$set(_vm.formData, "plan_type", $$v)},expression:"formData.plan_type"}},[_c('el-option',{attrs:{"label":"行车和施工计划","value":1}})],1)],1),_vm._v(" "),(_vm.formData.plan_type!=3)?_c('fieldset',[_c('legend',[_vm._v("列车信息")]),_vm._v(" "),_c('el-form-item',{staticStyle:{"display":"none"},attrs:{"label":"列车类型：","label-width":"100px"}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formData.car_type),callback:function ($$v) {_vm.$set(_vm.formData, "car_type", $$v)},expression:"formData.car_type"}})],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"出发车次：","label-width":"100px"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20"},model:{value:(_vm.formData.out_car),callback:function ($$v) {_vm.$set(_vm.formData, "out_car", $$v)},expression:"formData.out_car"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"本务："}},[_c('el-select',{model:{value:(_vm.formData.out_business_loco),callback:function ($$v) {_vm.$set(_vm.formData, "out_business_loco", $$v)},expression:"formData.out_business_loco"}},_vm._l((_vm.locoList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"重联："}},[_c('el-select',{attrs:{"placeholder":"无"},model:{value:(_vm.formData.out_reco),callback:function ($$v) {_vm.$set(_vm.formData, "out_reco", $$v)},expression:"formData.out_reco"}},[_c('el-option',{attrs:{"label":"无","value":0}}),_vm._v(" "),_vm._l((_vm.locoList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})})],2)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"补机："}},[_c('el-select',{attrs:{"placeholder":"无"},model:{value:(_vm.formData.out_supple),callback:function ($$v) {_vm.$set(_vm.formData, "out_supple", $$v)},expression:"formData.out_supple"}},[_c('el-option',{attrs:{"label":"无","value":0}}),_vm._v(" "),_vm._l((_vm.locoList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})})],2)],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"出发线别：","label-width":"100px"}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formData.out_line_type),callback:function ($$v) {_vm.$set(_vm.formData, "out_line_type", $$v)},expression:"formData.out_line_type"}},_vm._l((_vm.lineTypeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"车长："}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formData.out_master_id),callback:function ($$v) {_vm.$set(_vm.formData, "out_master_id", $$v)},expression:"formData.out_master_id"}},_vm._l((_vm.masterList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"司机："}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formData.out_driver_id),callback:function ($$v) {_vm.$set(_vm.formData, "out_driver_id", $$v)},expression:"formData.out_driver_id"}},_vm._l((_vm.driverList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"编组："}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20"},model:{value:(_vm.formData.out_marshalling),callback:function ($$v) {_vm.$set(_vm.formData, "out_marshalling", $$v)},expression:"formData.out_marshalling"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"返回车次：","label-width":"100px"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20"},model:{value:(_vm.formData.back_car),callback:function ($$v) {_vm.$set(_vm.formData, "back_car", $$v)},expression:"formData.back_car"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"本务："}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formData.back_business_loco),callback:function ($$v) {_vm.$set(_vm.formData, "back_business_loco", $$v)},expression:"formData.back_business_loco"}},_vm._l((_vm.locoList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"重联："}},[_c('el-select',{attrs:{"placeholder":"无"},model:{value:(_vm.formData.back_reco),callback:function ($$v) {_vm.$set(_vm.formData, "back_reco", $$v)},expression:"formData.back_reco"}},[_c('el-option',{attrs:{"label":"无","value":0}}),_vm._v(" "),_vm._l((_vm.locoList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})})],2)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"补机："}},[_c('el-select',{attrs:{"placeholder":"无"},model:{value:(_vm.formData.back_supple),callback:function ($$v) {_vm.$set(_vm.formData, "back_supple", $$v)},expression:"formData.back_supple"}},[_c('el-option',{attrs:{"label":"无","value":0}}),_vm._v(" "),_vm._l((_vm.locoList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})})],2)],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"返回线别：","label-width":"100px"}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formData.back_line_type),callback:function ($$v) {_vm.$set(_vm.formData, "back_line_type", $$v)},expression:"formData.back_line_type"}},_vm._l((_vm.lineTypeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"车长："}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formData.back_master_id),callback:function ($$v) {_vm.$set(_vm.formData, "back_master_id", $$v)},expression:"formData.back_master_id"}},_vm._l((_vm.masterList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"司机："}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formData.back_driver_id),callback:function ($$v) {_vm.$set(_vm.formData, "back_driver_id", $$v)},expression:"formData.back_driver_id"}},_vm._l((_vm.driverList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"编组："}},[_c('el-input',{attrs:{"maxlength":"20","autocomplete":"off"},model:{value:(_vm.formData.back_marshalling),callback:function ($$v) {_vm.$set(_vm.formData, "back_marshalling", $$v)},expression:"formData.back_marshalling"}})],1)],1)],1):_vm._e(),_vm._v(" "),(_vm.formData.plan_type!=2)?_c('fieldset',[_c('legend',[_vm._v("施工信息")]),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"开始时间：","label-width":"100px","prop":"start_time"}},[_c('el-date-picker',{attrs:{"type":"datetime","format":"yyyy-MM-dd HH:mm","placeholder":"选择时间"},model:{value:(_vm.formData.start_time),callback:function ($$v) {_vm.$set(_vm.formData, "start_time", $$v)},expression:"formData.start_time"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"结束时间：","prop":"end_time"}},[_c('el-date-picker',{attrs:{"type":"datetime","format":"yyyy-MM-dd HH:mm","placeholder":"选择时间"},model:{value:(_vm.formData.end_time),callback:function ($$v) {_vm.$set(_vm.formData, "end_time", $$v)},expression:"formData.end_time"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"施工作业队：","label-width":"100px"}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formData.work_plan_id),callback:function ($$v) {_vm.$set(_vm.formData, "work_plan_id", $$v)},expression:"formData.work_plan_id"}},_vm._l((_vm.departLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"作业类型：","label-width":"100px","prop":"work_type"}},[_c('el-select',{attrs:{"placeholder":"请选择"},on:{"change":_vm.changeWorkListItem},model:{value:(_vm.formData.work_type),callback:function ($$v) {_vm.$set(_vm.formData, "work_type", $$v)},expression:"formData.work_type"}},_vm._l((_vm.workTypeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"danwei",attrs:{"label":"线别：","prop":"line_type"}},[_c('el-select',{attrs:{"placeholder":"请选择"},on:{"change":_vm.changeWorkLineTypeList},model:{value:(_vm.formData.line_type),callback:function ($$v) {_vm.$set(_vm.formData, "line_type", $$v)},expression:"formData.line_type"}},_vm._l((_vm.workLineTypeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"施工项目："}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formData.item_id),callback:function ($$v) {_vm.$set(_vm.formData, "item_id", $$v)},expression:"formData.item_id"}},_vm._l((_vm.itemLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"工序："}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formData.work_id),callback:function ($$v) {_vm.$set(_vm.formData, "work_id", $$v)},expression:"formData.work_id"}},_vm._l((_vm.workSortLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"工点：","label-width":"100px","prop":"start_station"}},[_c('el-select',{attrs:{"placeholder":"请选择"},on:{"change":function($event){_vm.changeStartStation($event)}},model:{value:(_vm.formData.start_station),callback:function ($$v) {_vm.$set(_vm.formData, "start_station", $$v)},expression:"formData.start_station"}},_vm._l((_vm.stationList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('b',{staticStyle:{"line-height":"31px"}},[_vm._v("—")]),_vm._v(" "),_c('el-form-item',{attrs:{"prop":"end_station"}},[_c('el-select',{attrs:{"placeholder":"请选择"},on:{"change":function($event){_vm.changeEndStation($event)}},model:{value:(_vm.formData.end_station),callback:function ($$v) {_vm.$set(_vm.formData, "end_station", $$v)},expression:"formData.end_station"}},_vm._l((_vm.stationList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-inlines is-required",attrs:{"label":"里程："}},[_c('el-form-item',{attrs:{"prop":"start_flag"}},[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"公里","maxlength":"3"},model:{value:(_vm.formData.start_flag),callback:function ($$v) {_vm.$set(_vm.formData, "start_flag", $$v)},expression:"formData.start_flag"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"lengtherror",attrs:{"prop":"start_length"}},[_c('b',[_vm._v("+")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"米","maxlength":"3"},model:{value:(_vm.formData.start_length),callback:function ($$v) {_vm.$set(_vm.formData, "start_length", $$v)},expression:"formData.start_length"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"lengtherror",attrs:{"prop":"start_flag"}},[_c('b',{staticStyle:{"width":"100px"}},[_vm._v("至")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"公里","maxlength":"3"},model:{value:(_vm.formData.end_flag),callback:function ($$v) {_vm.$set(_vm.formData, "end_flag", $$v)},expression:"formData.end_flag"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"lengtherror",attrs:{"prop":"end_length"}},[_c('b',[_vm._v("+")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"米","maxlength":"3"},model:{value:(_vm.formData.end_length),callback:function ($$v) {_vm.$set(_vm.formData, "end_length", $$v)},expression:"formData.end_length"}})],1)],1)],1)]):_vm._e(),_vm._v(" "),_c('el-form-item',{staticClass:"istextarea",attrs:{"label":"计划内容：","label-width":"110px","prop":"description"}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea","maxlength":"50","show-word-limit":""},model:{value:(_vm.formData.description),callback:function ($$v) {_vm.$set(_vm.formData, "description", $$v)},expression:"formData.description"}})],1),_vm._v(" "),_c('div',{staticClass:"blank"})],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.diaLogFormVisible = false}}},[_vm._v("关闭")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.addDayPlanDialog()}}},[_vm._v("确定")])],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"dialog-monitor",attrs:{"width":"998px","close-on-click-modal":false,"title":this.diaLogTitleEdit,"visible":_vm.diaLogFormEditVisible},on:{"update:visible":function($event){_vm.diaLogFormEditVisible=$event}}},[_c('el-form',{ref:"refFormEditRules",staticClass:"el-form-custom",attrs:{"inline":true,"model":_vm.formEditData,"rules":_vm.formEditRules}},[_c('el-form-item',{attrs:{"label":"日班计划：","label-width":"130px"}},[_c('el-select',{on:{"change":_vm.selectPlanNumbers},model:{value:(_vm.formEditData.number),callback:function ($$v) {_vm.$set(_vm.formEditData, "number", $$v)},expression:"formEditData.number"}},_vm._l((_vm.planNumbersList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.number,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"记录人：","label-width":"130px","prop":"record_id"}},[_c('el-select',{model:{value:(_vm.formEditData.record_id),callback:function ($$v) {_vm.$set(_vm.formEditData, "record_id", $$v)},expression:"formEditData.record_id"}},_vm._l((_vm.userList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),(_vm.formEditData.plan_type!=3)?_c('fieldset',[_c('legend',[_vm._v("列车信息")]),_vm._v(" "),_c('el-form-item',{staticStyle:{"display":"none"},attrs:{"label":"列车类型：","label-width":"100px"}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formEditData.car_type),callback:function ($$v) {_vm.$set(_vm.formEditData, "car_type", $$v)},expression:"formEditData.car_type"}})],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"出发车次：","label-width":"100px"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20"},model:{value:(_vm.formEditData.out_car),callback:function ($$v) {_vm.$set(_vm.formEditData, "out_car", $$v)},expression:"formEditData.out_car"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"本务："}},[_c('el-select',{model:{value:(_vm.formEditData.out_business_loco),callback:function ($$v) {_vm.$set(_vm.formEditData, "out_business_loco", $$v)},expression:"formEditData.out_business_loco"}},_vm._l((_vm.locoList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"重联："}},[_c('el-select',{attrs:{"placeholder":"无"},model:{value:(_vm.formEditData.out_reco),callback:function ($$v) {_vm.$set(_vm.formEditData, "out_reco", $$v)},expression:"formEditData.out_reco"}},[_c('el-option',{attrs:{"label":"无","value":0}}),_vm._v(" "),_vm._l((_vm.locoList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})})],2)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"补机："}},[_c('el-select',{attrs:{"placeholder":"无"},model:{value:(_vm.formEditData.out_supple),callback:function ($$v) {_vm.$set(_vm.formEditData, "out_supple", $$v)},expression:"formEditData.out_supple"}},[_c('el-option',{attrs:{"label":"无","value":0}}),_vm._v(" "),_vm._l((_vm.locoList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})})],2)],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"出发级别：","label-width":"100px"}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formEditData.out_line_type),callback:function ($$v) {_vm.$set(_vm.formEditData, "out_line_type", $$v)},expression:"formEditData.out_line_type"}},_vm._l((_vm.lineTypeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"车长："}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formEditData.out_master_id),callback:function ($$v) {_vm.$set(_vm.formEditData, "out_master_id", $$v)},expression:"formEditData.out_master_id"}},_vm._l((_vm.masterList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"司机："}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formEditData.out_driver_id),callback:function ($$v) {_vm.$set(_vm.formEditData, "out_driver_id", $$v)},expression:"formEditData.out_driver_id"}},_vm._l((_vm.driverList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"编组："}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20"},model:{value:(_vm.formEditData.out_marshalling),callback:function ($$v) {_vm.$set(_vm.formEditData, "out_marshalling", $$v)},expression:"formEditData.out_marshalling"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"返回车次：","label-width":"100px"}},[_c('el-input',{attrs:{"autocomplete":"off","maxlength":"20"},model:{value:(_vm.formEditData.back_car),callback:function ($$v) {_vm.$set(_vm.formEditData, "back_car", $$v)},expression:"formEditData.back_car"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"本务："}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formEditData.back_business_loco),callback:function ($$v) {_vm.$set(_vm.formEditData, "back_business_loco", $$v)},expression:"formEditData.back_business_loco"}},_vm._l((_vm.locoList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"重联："}},[_c('el-select',{attrs:{"placeholder":"无"},model:{value:(_vm.formEditData.back_reco),callback:function ($$v) {_vm.$set(_vm.formEditData, "back_reco", $$v)},expression:"formEditData.back_reco"}},[_c('el-option',{attrs:{"label":"无","value":0}}),_vm._v(" "),_vm._l((_vm.locoList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})})],2)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"补机："}},[_c('el-select',{attrs:{"placeholder":"无"},model:{value:(_vm.formEditData.back_supple),callback:function ($$v) {_vm.$set(_vm.formEditData, "back_supple", $$v)},expression:"formEditData.back_supple"}},[_c('el-option',{attrs:{"label":"无","value":0}}),_vm._v(" "),_vm._l((_vm.locoList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})})],2)],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"返回线别：","label-width":"100px"}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formEditData.back_line_type),callback:function ($$v) {_vm.$set(_vm.formEditData, "back_line_type", $$v)},expression:"formEditData.back_line_type"}},_vm._l((_vm.lineTypeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"车长："}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formEditData.back_master_id),callback:function ($$v) {_vm.$set(_vm.formEditData, "back_master_id", $$v)},expression:"formEditData.back_master_id"}},_vm._l((_vm.masterList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"司机："}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formEditData.back_driver_id),callback:function ($$v) {_vm.$set(_vm.formEditData, "back_driver_id", $$v)},expression:"formEditData.back_driver_id"}},_vm._l((_vm.driverList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"编组："}},[_c('el-input',{attrs:{"maxlength":"20","autocomplete":"off"},model:{value:(_vm.formEditData.back_marshalling),callback:function ($$v) {_vm.$set(_vm.formEditData, "back_marshalling", $$v)},expression:"formEditData.back_marshalling"}})],1)],1)],1):_vm._e(),_vm._v(" "),(_vm.formEditData.plan_type!=2)?_c('fieldset',[_c('legend',[_vm._v("施工信息")]),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"开始时间：","label-width":"100px","prop":"start_time"}},[_c('el-date-picker',{attrs:{"type":"datetime","format":"yyyy-MM-dd HH:mm","placeholder":"选择时间"},model:{value:(_vm.formEditData.start_time),callback:function ($$v) {_vm.$set(_vm.formEditData, "start_time", $$v)},expression:"formEditData.start_time"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"结束时间：","prop":"end_time"}},[_c('el-date-picker',{attrs:{"type":"datetime","format":"yyyy-MM-dd HH:mm","placeholder":"选择时间"},model:{value:(_vm.formEditData.end_time),callback:function ($$v) {_vm.$set(_vm.formEditData, "end_time", $$v)},expression:"formEditData.end_time"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"施工作业队：","label-width":"100px"}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formEditData.work_plan_id),callback:function ($$v) {_vm.$set(_vm.formEditData, "work_plan_id", $$v)},expression:"formEditData.work_plan_id"}},_vm._l((_vm.departLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"作业类型：","label-width":"100px"}},[_c('el-select',{attrs:{"disabled":"","placeholder":"请选择"},on:{"change":_vm.changeWorkListItem},model:{value:(_vm.formEditData.work_type),callback:function ($$v) {_vm.$set(_vm.formEditData, "work_type", $$v)},expression:"formEditData.work_type"}},_vm._l((_vm.workTypeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"danwei",attrs:{"label":"线别："}},[_c('el-select',{attrs:{"disabled":"","placeholder":"请选择"},on:{"change":_vm.changeWorkLineTypeList},model:{value:(_vm.formEditData.line_type),callback:function ($$v) {_vm.$set(_vm.formEditData, "line_type", $$v)},expression:"formEditData.line_type"}},_vm._l((_vm.workLineTypeList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"施工项目："}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formEditData.item_id),callback:function ($$v) {_vm.$set(_vm.formEditData, "item_id", $$v)},expression:"formEditData.item_id"}},_vm._l((_vm.itemLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"工序："}},[_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.formEditData.work_id),callback:function ($$v) {_vm.$set(_vm.formEditData, "work_id", $$v)},expression:"formEditData.work_id"}},_vm._l((_vm.workSortLists),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"工点：","label-width":"100px","prop":"start_station"}},[_c('el-select',{attrs:{"disabled":"","placeholder":"请选择"},on:{"change":function($event){_vm.changeStartStation($event)}},model:{value:(_vm.formEditData.start_station),callback:function ($$v) {_vm.$set(_vm.formEditData, "start_station", $$v)},expression:"formEditData.start_station"}},_vm._l((_vm.stationList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('b',{staticStyle:{"line-height":"31px"}},[_vm._v("—")]),_vm._v(" "),_c('el-form-item',{attrs:{"prop":"end_station"}},[_c('el-select',{attrs:{"disabled":"","placeholder":"请选择"},on:{"change":function($event){_vm.changeEndStation($event)}},model:{value:(_vm.formEditData.end_station),callback:function ($$v) {_vm.$set(_vm.formEditData, "end_station", $$v)},expression:"formEditData.end_station"}},_vm._l((_vm.stationList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-inlines is-required",attrs:{"label":"里程："}},[_c('el-form-item',{attrs:{"prop":"start_flag"}},[_c('el-input',{attrs:{"disabled":"","autocomplete":"off","placeholder":"公里","maxlength":"3"},model:{value:(_vm.formEditData.start_flag),callback:function ($$v) {_vm.$set(_vm.formEditData, "start_flag", $$v)},expression:"formEditData.start_flag"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"lengtherror",attrs:{"prop":"start_length"}},[_c('b',[_vm._v("+")]),_vm._v(" "),_c('el-input',{attrs:{"disabled":"","autocomplete":"off","placeholder":"米","maxlength":"3"},model:{value:(_vm.formEditData.start_length),callback:function ($$v) {_vm.$set(_vm.formEditData, "start_length", $$v)},expression:"formEditData.start_length"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"lengtherror",attrs:{"prop":"start_flag"}},[_c('b',{staticStyle:{"width":"100px"}},[_vm._v("至")]),_vm._v(" "),_c('el-input',{attrs:{"disabled":"","autocomplete":"off","placeholder":"公里","maxlength":"3"},model:{value:(_vm.formEditData.end_flag),callback:function ($$v) {_vm.$set(_vm.formEditData, "end_flag", $$v)},expression:"formEditData.end_flag"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"lengtherror",attrs:{"prop":"end_length"}},[_c('b',[_vm._v("+")]),_vm._v(" "),_c('el-input',{attrs:{"disabled":"","autocomplete":"off","placeholder":"米","maxlength":"3"},model:{value:(_vm.formEditData.end_length),callback:function ($$v) {_vm.$set(_vm.formEditData, "end_length", $$v)},expression:"formEditData.end_length"}})],1)],1)],1)]):_vm._e(),_vm._v(" "),_c('el-form-item',{staticClass:"istextarea",attrs:{"label":"计划内容：","label-width":"110px","prop":"description"}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea","maxlength":"50","show-word-limit":""},model:{value:(_vm.formEditData.description),callback:function ($$v) {_vm.$set(_vm.formEditData, "description", $$v)},expression:"formEditData.description"}})],1),_vm._v(" "),_c('fieldset',[_c('legend',[_vm._v("实际施工信息")]),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"实际开始时间：","label-width":"120px","prop":"true_start_time"}},[_c('el-date-picker',{attrs:{"type":"datetime","format":"yyyy-MM-dd HH:mm","placeholder":"选择时间"},model:{value:(_vm.formEditData.true_start_time),callback:function ($$v) {_vm.$set(_vm.formEditData, "true_start_time", $$v)},expression:"formEditData.true_start_time"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"实际结束时间：","prop":"true_end_time"}},[_c('el-date-picker',{attrs:{"type":"datetime","format":"yyyy-MM-dd HH:mm","placeholder":"选择时间"},model:{value:(_vm.formEditData.true_end_time),callback:function ($$v) {_vm.$set(_vm.formEditData, "true_end_time", $$v)},expression:"formEditData.true_end_time"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{staticClass:"el-form-item-inlines is-required",attrs:{"label":"开始里程(DK)：","label-width":"120px"}},[_c('el-form-item',{attrs:{"prop":"true_start_flag"}},[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"公里","maxlength":"3"},model:{value:(_vm.formEditData.true_start_flag),callback:function ($$v) {_vm.$set(_vm.formEditData, "true_start_flag", $$v)},expression:"formEditData.true_start_flag"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"lengtherror",attrs:{"prop":"true_start_length"}},[_c('b',[_vm._v("+")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"米","maxlength":"3"},model:{value:(_vm.formEditData.true_start_length),callback:function ($$v) {_vm.$set(_vm.formEditData, "true_start_length", $$v)},expression:"formEditData.true_start_length"}})],1)],1),_vm._v(" "),_c('el-form-item',{staticClass:"el-form-item-inlines is-required",attrs:{"label":"开始里程(DK)："}},[_c('el-form-item',{attrs:{"prop":"true_end_flag"}},[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"公里","maxlength":"3"},model:{value:(_vm.formEditData.true_end_flag),callback:function ($$v) {_vm.$set(_vm.formEditData, "true_end_flag", $$v)},expression:"formEditData.true_end_flag"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"lengtherror",attrs:{"prop":"true_end_length"}},[_c('b',[_vm._v("+")]),_vm._v(" "),_c('el-input',{attrs:{"autocomplete":"off","placeholder":"米","maxlength":"3"},model:{value:(_vm.formEditData.true_end_length),callback:function ($$v) {_vm.$set(_vm.formEditData, "true_end_length", $$v)},expression:"formEditData.true_end_length"}})],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"完成数量：","label-width":"120px"}},[_c('el-input',{attrs:{"autocomplete":"off","placeholder":"公里","maxlength":"3"},model:{value:(_vm.formEditData.finish_num),callback:function ($$v) {_vm.$set(_vm.formEditData, "finish_num", $$v)},expression:"formEditData.finish_num"}})],1),_vm._v(" "),_c('el-form-item',[_c('el-checkbox',{on:{"change":_vm.formStatus},model:{value:(_vm.formEditData.status),callback:function ($$v) {_vm.$set(_vm.formEditData, "status", $$v)},expression:"formEditData.status"}},[_vm._v("完成")])],1)],1),_vm._v(" "),_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"备注：","label-width":"120px"}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea","maxlength":"50","show-word-limit":""},model:{value:(_vm.formEditData.remark),callback:function ($$v) {_vm.$set(_vm.formEditData, "remark", $$v)},expression:"formEditData.remark"}})],1)],1),_vm._v(" "),(_vm.reasonShow)?_c('div',{staticClass:"el-form-item-block"},[_c('el-form-item',{attrs:{"label":"未完成原因：","label-width":"120px"}},[_c('el-input',{attrs:{"autocomplete":"off","type":"textarea","maxlength":"50","show-word-limit":""},model:{value:(_vm.formEditData.reason),callback:function ($$v) {_vm.$set(_vm.formEditData, "reason", $$v)},expression:"formEditData.reason"}})],1)],1):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"blank"})],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.diaLogFormEditVisible = false}}},[_vm._v("关闭")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.updateDayTrueplan()}}},[_vm._v("确定")])],1)],1)],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"chartmain"},[_c('div',{staticStyle:{"height":"500px","width":"100%"},attrs:{"id":"main"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_run_monitor = (esExports);
// CONCATENATED MODULE: ./src/views/run_monitor/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("d4SU")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  run_monitor,
  views_run_monitor,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_run_monitor = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "YfS6":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n.maintitle {\r\n  text-align: center;\r\n  font-size: 20px;\r\n  color: #4b6eca;\r\n  padding-top: 20px;\n}\n.app-page-adds {\r\n  overflow: hidden;\r\n  text-align: center;\r\n  width: 100%;\n}\n.app-page-adds .btnitem {\r\n  margin-right: 15px;\r\n  display: inline-block;\n}\n.app-page-adds .sideright {\r\n  float: right;\n}\n.app-page-adds .el-input__inner {\r\n  border-color: #b3d8ff;\r\n  border-radius: 4px;\r\n  color: #409eff;\n}\n.chartmain {\r\n  width: 100%;\r\n  overflow-x: scroll;\n}\r\n/*sidebox */\n.sidebox {\r\n  width: 100% !important;\r\n  background: #fff;\r\n  text-align: center;\r\n  padding: 10px 0;\n}\n.sidebox .el-checkbox__label {\r\n  font-size: 15px;\n}\n.sidebox h3 {\r\n  font-size: 14px;\r\n  display: inline-block;\n}\n.sidebox .chklist {\r\n  display: inline-block;\r\n  margin-top: 15px;\r\n  margin-right: 30px;\n}\n.chlone .el-checkbox:nth-child(1) .el-checkbox__label {\r\n  color: #0099cc;\n}\n.chlone .el-checkbox:nth-child(1) .is-checked .el-checkbox__inner {\r\n  background-color: #0099cc;\r\n  border-color: #0099cc;\n}\n.chlone .el-checkbox:nth-child(2) .el-checkbox__label {\r\n  color: #0000ff;\n}\n.chlone .el-checkbox:nth-child(2) .is-checked .el-checkbox__inner {\r\n  background-color: #0000ff;\r\n  border-color: #0000ff;\n}\n.chlone .el-checkbox:nth-child(3) .el-checkbox__label {\r\n  color: #9900ff;\n}\n.chlone .el-checkbox:nth-child(3) .is-checked .el-checkbox__inner {\r\n  background-color: #9900ff;\r\n  border-color: #9900ff;\n}\n.chlone .el-checkbox:nth-child(4) .el-checkbox__label {\r\n  color: #660033;\n}\n.chlone .el-checkbox:nth-child(4) .is-checked .el-checkbox__inner {\r\n  background-color: #660033;\r\n  border-color: #660033;\n}\n.chltwo .el-checkbox .el-checkbox__label {\r\n  color: #f6b26b;\n}\n.chltwo .el-checkbox__inner {\r\n  border-color: #f6b26b;\n}\n.chltwo .is-checked .el-checkbox__inner {\r\n  background-color: #f6b26b;\r\n  border-color: #f6b26b;\n}\n.chkshiji .el-checkbox__label {\r\n  color: #2dca2d !important;\n}\n.chkshiji .el-checkbox__inner {\r\n  border-color: #2dca2d;\n}\n.chkshiji .is-checked .el-checkbox__inner {\r\n  background-color: #2dca2d;\r\n  border-color: #2dca2d;\n}\r\n/*dialog  */\n.dialog-monitor .el-dialog__body {\r\n  padding: 30px 30px 0 30px;\n}\n.dialog-monitor b {\r\n  font-weight: 500;\n}\n.dialog-monitor .el-textarea__inner {\r\n  border: 1px #9db9fa solid;\r\n  color: #4b6eca;\r\n  height: 55px;\r\n  width: 780px;\n}\n.dialog-monitor .el-textarea {\r\n  width: 100%;\n}\n.dialog-monitor .el-form-item-inline .el-input--medium {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.dialog-monitor .el-form-item-inline input {\r\n  display: inline-block;\r\n  width: 80px;\r\n  text-align: center;\n}\n.dialog-monitor .el-form-item__label {\r\n  padding-right: 0;\n}\n.dialog-monitor .el-select {\r\n  width: 150px;\n}\n.dialog-monitor input {\r\n  width: 150px;\n}\n.dialog-monitor .el-date-editor input {\r\n  width: 180px;\n}\n.dialog-monitor .el-date-editor.el-input {\r\n  width: 180px;\n}\n.dialog-monitor b {\r\n  padding-right: 8px;\n}\n.dialog-monitor fieldset {\r\n  border: 1px #9db9fa solid;\r\n  margin-bottom: 15px;\r\n  border-radius: 3px;\r\n  padding: 5px 5px 0 5px;\n}\n.dialog-monitor fieldset legend {\r\n  font-size: 16px;\r\n  color: #4b6eca;\r\n  padding: 0 10px;\n}\n.el-form-item-block {\r\n  display: block;\n}\n.el-form-item-inlines {\r\n  display: inline-block;\n}\n.el-form-item-inlines .el-form-item {\r\n  display: inline-block;\n}\n.el-form-item-inlines .el-form-item .el-form-item__content {\r\n  margin-left: 0;\n}\n.el-form-item-inlines .el-input {\r\n  width: 72px;\n}\n.el-form-item-inlines input {\r\n  display: inline-block;\r\n  width: 72px;\r\n  text-align: center;\n}\n.el-form-item-inlines .el-form-item {\r\n  margin-bottom: 1px !important;\n}\n.dateinput input {\r\n  width: 180px;\n}\n.dateinput .el-select {\r\n  width: 180px;\n}\n.dateinput .el-form-item__content {\r\n  width: 180px;\n}\n.istextarea {\r\n  margin-right: 0 !important;\n}\n.istextarea .el-textarea__inner {\r\n  width: 825px;\n}\n.lengtherror .el-form-item__error {\r\n  padding-left: 20px;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "d4SU":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("YfS6");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("0e36cf9c", content, true);

/***/ })

});