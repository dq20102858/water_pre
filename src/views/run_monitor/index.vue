<template>
  <div id="app-monitor-chart">
    <div class="app-page-chart">
      <div class="maintitle">{{todayPreValue}} 18时 -— {{todayNextValue}} 18时轨行区作业分布图</div>
      <div class="chartleft">
        <div id="main" style="height:500px;width:100%;"></div>
      </div>
      <div class="chartright">
        <div class="sidebox">
          <div class="btnitem">
            <el-date-picker v-model="formData.date" type="date" placeholder="选择日期"></el-date-picker>
          </div>
          <div class="btnitems">
            <el-button @click="preDate" type="primary" plain>前一天</el-button>
            <el-button @click="nextDate" type="primary" plain>后一天</el-button>
          </div>

          <div class="btnitem">
            <el-button @click="planAdd" type="primary" plain>编制日班计划图</el-button>
          </div>
          <div class="btnitem">
            <el-button @click="planEdit" type="primary" plain>编制日班实际图</el-button>
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

    <el-dialog
      width="960px"
      :close-on-click-modal="false"
      class="dialog-monitor"
      :title="this.diaLogTitle"
      :visible.sync="diaLogFormVisible"
    >
      <el-form
        :inline="true"
        class="el-form-custom"
        :model="formData"
        :rules="formRules"
        ref="formRules"
      >
        <el-form-item label="日班计划编号：" prop="number">
          <el-input v-model="formData.number" autocomplete="off" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formData.plan_type">
            <el-option label="行车和施工计划" :value="1"></el-option>
            <el-option label="行车计划" :value="2"></el-option>
            <el-option label="施工计划" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <fieldset>
          <legend>列车信息</legend>
          <el-form-item label="列车类型：" label-width="100px">
            <el-select v-model="formData.car_type" placeholder="请选择"></el-select>
          </el-form-item>
          <div class="el-form-item-block">
            <el-form-item label="出行车次：" label-width="100px">
              <el-input v-model="formData.out_car" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="本务：">
              <el-select v-model="formData.out_business_loco">
                <el-option
                  v-for="item in locoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="重联：">
              <el-select v-model="formData.out_reco" placeholder="请选择">
                <el-option
                  v-for="item in locoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="补机：">
              <el-select v-model="formData.out_supple" placeholder="请选择">
                <el-option
                  v-for="item in locoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-form-item-block">
            <el-form-item label="出线级别：" label-width="100px">
              <el-select v-model="formData.out_line_type" placeholder="请选择">
                <el-option
                  v-for="item in linTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车长：">
              <el-select v-model="formData.out_master_id" placeholder="请选择">
                <el-option label="行车和施工计划" :value="1"></el-option>
                <el-option label="行车计划" :value="2"></el-option>
                <el-option label="施工计划" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="司机：">
              <el-select v-model="formData.out_driver_id" placeholder="请选择">
                <el-option label="行车和施工计划" :value="1"></el-option>
                <el-option label="行车计划" :value="2"></el-option>
                <el-option label="施工计划" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编组：">
              <el-input
                v-model="formData.out_marshalling"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>
          <div class="el-form-item-block">
            <el-form-item label="返回车次：" label-width="100px">
              <el-input
                v-model="formData.back_car"
                autocomplete="off"
                maxlength="20"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="本务：">
              <el-select v-model="formData.back_business_loco" placeholder="请选择">
                <el-option label="行车和施工计划" :value="1"></el-option>
                <el-option label="行车计划" :value="2"></el-option>
                <el-option label="施工计划" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="重联：">
              <el-select v-model="formData.back_reco" placeholder="请选择">
                <el-option label="行车和施工计划" :value="1"></el-option>
                <el-option label="行车计划" :value="2"></el-option>
                <el-option label="施工计划" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="补机：">
              <el-select v-model="formData.back_supple" placeholder="请选择">
                <el-option label="行车和施工计划" :value="1"></el-option>
                <el-option label="行车计划" :value="2"></el-option>
                <el-option label="施工计划" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-form-item-block">
            <el-form-item label="返回级别：" label-width="100px">
              <el-select v-model="formData.back_line_type" placeholder="请选择">
                <el-option
                  v-for="item in linTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车长：">
              <el-select v-model="formData.back_master_id" placeholder="请选择">
                <el-option label="行车和施工计划" :value="1"></el-option>
                <el-option label="行车计划" :value="2"></el-option>
                <el-option label="施工计划" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="司机：">
              <el-select v-model="formData.back_driver_id" placeholder="请选择">
                <el-option label="行车和施工计划" :value="1"></el-option>
                <el-option label="行车计划" :value="2"></el-option>
                <el-option label="施工计划" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编组：">
              <el-input
                v-model="formData.back_marshalling"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>
        </fieldset>
        <!---2 -->
        <fieldset>
          <legend>施工信息</legend>
          <div class="el-form-item-block">
            <el-form-item label="开始时间：" label-width="100px">
              <el-date-picker v-model="formData.start_time" type="datetime" placeholder="选择时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：">
              <el-date-picker v-model="formData.end_time" type="datetime" placeholder="选择时间"></el-date-picker>
            </el-form-item>
          </div>
          <div class="el-form-item-block">
            <el-form-item class="dateinput" label="工点：" label-width="100px">
              <el-select v-model="formData.start_station" placeholder="请选择">
                <el-option label="行车和施工计划" :value="1"></el-option>
                <el-option label="行车计划" :value="2"></el-option>
                <el-option label="施工计划" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <b style="line-height: 31px;">—</b>
            <el-form-item class="dateinput">
              <el-select v-model="formData.end_station" placeholder="请选择">
                <el-option label="行车和施工计划" :value="1"></el-option>
                <el-option label="行车计划" :value="2"></el-option>
                <el-option label="施工计划" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="里程(DK)：" label-width="100px" class="el-form-item-inlines">
              <el-form-item>
                <el-input
                  v-model="formData.start_flag"
                  autocomplete="off"
                  placeholder="公里"
                  maxlength="3"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <b>+</b>
                <el-input
                  v-model="formData.start_length"
                  autocomplete="off"
                  placeholder="米"
                  maxlength="3"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <b style="width:100px">至</b>
                <el-input
                  v-model="formData.start_flag"
                  autocomplete="off"
                  placeholder="公里"
                  maxlength="3"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <b>+</b>
                <el-input
                  v-model="formData.start_length"
                  autocomplete="off"
                  placeholder="米"
                  maxlength="3"
                ></el-input>
              </el-form-item>
            </el-form-item>
          </div>
          <div class="el-form-item-block">
            <el-form-item label="施工作业队：" label-width="100px">
              <el-select v-model="formData.work_plan_id" placeholder="请选择">
                <el-option label="行车和施工计划" :value="1"></el-option>
                <el-option label="行车计划" :value="2"></el-option>
                <el-option label="施工计划" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作业类型：">
              <el-select v-model="formData.work_type" placeholder="请选择">
                <el-option label="行车和施工计划" :value="1"></el-option>
                <el-option label="行车计划" :value="2"></el-option>
                <el-option label="施工计划" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="danwei" label="线别：">
              <el-select v-model="formData.line_type" placeholder="请选择">
                <el-option
                  v-for="item in linTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="el-form-item-block">
            <el-form-item label="施工项目：" label-width="100px">
              <el-select v-model="formData.item_id" placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="工序：" label-width="70px">
              <el-select v-model="formData.work_id" placeholder="请选择"></el-select>
            </el-form-item>
          </div>
        </fieldset>
        <el-form-item label="内容：" prop="description">
          <el-input
            v-model="formData.description"
            autocomplete="off"
            type="textarea"
            maxlength="30"
            show-word-limit
          ></el-input>
        </el-form-item>
        <div class="blank"></div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaLogFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="addOrEditDialog()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "daychart",
  data() {
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
      linTypeList: [],
      formRules: {
        number: [
          {
            required: true,
            message: "请输入编号2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getChart();
  },
  created() {
    this.getLocomotiveLists(); //机车
    this.getLineTypeList(); //线别
    //this.projectName = localStorage.getItem("projectName");
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
          let todayPreValues = dataMin.toLocaleDateString();
          let todayNextValues = dataMax.toLocaleDateString();
          this.todayPreValue = todayPreValues.replace(
            /(.+?)\/(.+?)\/(.+)/,
            "$1年$2月$3日"
          );
          this.todayNextValue = todayNextValues.replace(
            /(.+?)\/(.+?)\/(.+)/,
            "$1年$2月$3日"
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
              right: "1%"
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
                type: "inside",
                xAxisIndex: [0],
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
    },
    //from
    getLocomotiveLists() {
      this.request({
        url: "/dispatch/getLocomotiveLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.locoList = data.data;
          //this.formData.out_business_loco = this.locoList[0]["id"];
          this.$set(this.formData, "out_business_loco", this.locoList[0]["id"]);
          console.log(this.formData.out_business_loco);
        }
      });
    },
    getLineTypeList() {
      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.linTypeList = data.data;
          this.$set(this.formData, "out_line_type", this.linTypeList[0]["id"]);
          this.$set(this.formData, "back_line_type", this.linTypeList[0]["id"]);
          this.$set(this.formData, "line_type", this.linTypeList[0]["id"]);
        }
      });
    },
    planAdd() {
      this.diaLogTitle = "计划图";
      this.diaLogFormVisible = true;
    },

    addOrEditDialog() {
      this.$refs["formRules"].validate(valid => {
        if (valid) {
          let data = this.formData;
          alert(JSON.stringify(data));
          // this.companyData.type = 1;
          // if (this.companyData.color == "默认") {
          //   this.companyData.color = 0;
          // }
          // let url = "/company/addCompanyDo";
          // let baseid = this.companyData.id;
          // if (typeof baseid != "undefined") {
          //   url = "/company/editCompany";
          // }
          // this.request({
          //   url: url,
          //   method: "post",
          //   data
          // }).then(response => {
          //   var data = response.data;
          //   if (data.status == 1) {
          //     this.companyDialogVisible = false;
          //     this.$message({
          //       type: "success",
          //       message: "保存成功！"
          //     });
          //     this.getPageLists();
          //   }
          // });
        }
      });
    },
    planEdit() {
      this.formData = {};
      this.diaLogTitle = "修改计划图";
      this.diaLogFormVisible = true;
    }
    //
  }
};
</script>
<style>
.app-page-chart {
  min-width: 1170px;
  padding: 20px;
}
.maintitle {
  text-align: center;
  font-size: 20px;
  color: #4b6eca;
  padding-bottom: 20px;
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
.chartright .sidebox .btnitem {
  margin-bottom: 15px;
}
.chartright .sidebox .btnitems {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}
.chartright .sidebox .btnitems .is-plain {
  width: 100% !important;
  display: inline-block;
  background: #fff;
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
/*dialog  */
.dialog-monitor b {
  font-weight: 500;
}
.dialog-monitor .el-textarea__inner {
  border: 1px #9db9fa solid;
  color: #4b6eca;
  height: 85px;
  width: 835px;
}
.dialog-monitor .el-textarea {
  width: 100%;
}
.dialog-monitor .el-form-item-inline .el-input--medium {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.dialog-monitor .el-form-item-inline input {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.dialog-monitor .el-form-item__label {
  padding-right: 0;
}
.dialog-monitor .el-select {
  width: 150px;
}
.dialog-monitor input {
  width: 150px;
}
.dialog-monitor .el-date-editor input {
  width: 180px;
}
.dialog-monitor .el-date-editor.el-input {
  width: 180px;
}
.dialog-monitor b {
  padding-right: 10px;
}
.dialog-monitor fieldset {
  border: 1px #ddd solid;
  margin-bottom: 15px;
}
.dialog-monitor fieldset legend {
  font-weight: 700;
  color: #333;
}
.el-form-item-block {
  display: block;
}
.el-form-item-inlines {
  display: inline-block;
}
.el-form-item-inlines .el-form-item {
  display: inline-block;
}
.el-form-item-inlines .el-form-item .el-form-item__content {
  margin-left: 0;
}
.el-form-item-inlines .el-input {
  width: 72px;
}
.el-form-item-inlines input {
  display: inline-block;
  width: 72px;
  text-align: center;
}
.el-form-item-inlines .el-form-item {
  margin-bottom: 1px !important;
}
.dateinput input {
  width: 180px;
}
.dateinput .el-select {
  width: 180px;
}
.dateinput .el-form-item__content {
  width: 180px;
}
</style>
