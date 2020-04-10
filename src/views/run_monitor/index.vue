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
            <el-date-picker
              v-model="formData.date"
              type="date"
              placeholder="选择日期"
              :clearable="false"
            ></el-date-picker>
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
      width="990px"
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
              <el-input v-model="formData.out_car" autocomplete="off" maxlength="20"></el-input>
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
                <el-option
                  v-for="item in masterList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="司机：">
              <el-select v-model="formData.out_driver_id" placeholder="请选择">
                <el-option
                  v-for="item in driverList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编组：">
              <el-input v-model="formData.out_marshalling" autocomplete="off" maxlength="20"></el-input>
            </el-form-item>
          </div>
          <div class="el-form-item-block">
            <el-form-item label="返回车次：" label-width="100px">
              <el-input v-model="formData.back_car" autocomplete="off" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="本务：">
              <el-select v-model="formData.back_business_loco" placeholder="请选择">
                <el-option
                  v-for="item in locoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="重联：">
              <el-select v-model="formData.back_reco" placeholder="请选择">
                <el-option
                  v-for="item in locoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="补机：">
              <el-select v-model="formData.back_supple" placeholder="请选择">
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
                <el-option
                  v-for="item in masterList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="司机：">
              <el-select v-model="formData.back_driver_id" placeholder="请选择">
                <el-option
                  v-for="item in driverList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编组：">
              <el-input v-model="formData.back_marshalling" maxlength="20" autocomplete="off"></el-input>
            </el-form-item>
          </div>
        </fieldset>
        <!---2 -->
        <fieldset>
          <legend>施工信息</legend>
          <div class="el-form-item-block">
            <el-form-item label="开始时间：" label-width="100px" prop="start_time">
              <el-date-picker
                v-model="formData.start_time"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：" prop="end_time">
              <el-date-picker
                v-model="formData.end_time"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="施工作业队：" label-width="100px">
              <el-select v-model="formData.work_plan_id" placeholder="请选择"></el-select>
            </el-form-item>
          </div>
          <div class="el-form-item-block">
            <el-form-item label="工点：" label-width="100px">
              <el-select
                v-model="formData.start_station"
                placeholder="请选择"
                @change="changeStartStation($event)"
              >
                <el-option
                  v-for="item in stationList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <b style="line-height: 31px;">—</b>
            <el-form-item>
              <el-select
                v-model="formData.end_station"
                placeholder="请选择"
                @change="changeEndStation($event)"
              >
                <el-option
                  v-for="item in stationList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="里程：" class="el-form-item-inlines">
              <el-form-item prop="start_flag">
                <el-input
                  v-model="formData.start_flag"
                  autocomplete="off"
                  placeholder="公里"
                  maxlength="3"
                ></el-input>
              </el-form-item>
              <el-form-item prop="start_length">
                <b>+</b>
                <el-input
                  v-model="formData.start_length"
                  autocomplete="off"
                  placeholder="米"
                  maxlength="3"
                ></el-input>
              </el-form-item>
              <el-form-item prop="start_flag">
                <b style="width:100px">至</b>
                <el-input
                  v-model="formData.end_flag"
                  autocomplete="off"
                  placeholder="公里"
                  maxlength="3"
                ></el-input>
              </el-form-item>
              <el-form-item prop="end_length">
                <b>+</b>
                <el-input
                  v-model="formData.end_length"
                  autocomplete="off"
                  placeholder="米"
                  maxlength="3"
                ></el-input>
              </el-form-item>
            </el-form-item>
          </div>
          <div class="el-form-item-block">
            <el-form-item label="作业类型：" label-width="100px">
              <el-select
                v-model="formData.work_type"
                placeholder="请选择"
                @change="changeWorkListItem"
              >
                <el-option
                  v-for="item in workTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="danwei" label="线别：">
              <el-select v-model="formData.line_type" placeholder="请选择">
                <el-option
                  v-for="item in workLineTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="施工项目：">
              <el-select v-model="formData.item_id" placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="工序：">
              <el-select v-model="formData.work_id" placeholder="请选择"></el-select>
            </el-form-item>
          </div>
        </fieldset>
        <el-form-item label="内容：" label-width="110px" prop="description">
          <el-input
            v-model="formData.description"
            autocomplete="off"
            type="textarea"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
        <div class="blank"></div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaLogFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="addDayPlanDialog()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      width="780px"
      :close-on-click-modal="false"
      class="dialog-monitor"
      :title="this.diaLogTitleEdit"
      :visible.sync="diaLogFormEditVisible"
    >
      <el-form
        :inline="true"
        class="el-form-custom"
        :model="formEditData"
        :rules="formEditRules"
        ref="refFormEditRules"
      >
        <el-form-item label="日班计划：" label-width="130px">
          <el-select v-model="formEditData.number" @change="selectPlanNumbers">
            <el-option
              v-for="item in planNumbersList"
              :key="item.id"
              :label="item.number"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="记录人：" label-width="130px">
          <el-select v-model="formEditData.record_id">
            <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <fieldset>
          <legend>实际施工信息</legend>
          <div class="el-form-item-block">
            <el-form-item label="实际开始时间：" label-width="120px" prop="start_time">
              <el-date-picker
                v-model="formEditData.true_start_time"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="实际结束时间：" prop="end_time">
              <el-date-picker
                v-model="formEditData.true_end_time"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="el-form-item-block">
            <el-form-item label="开始里程(DK)：" label-width="120px" class="el-form-item-inlines">
              <el-form-item prop="start_flag">
                <el-input
                  v-model="formEditData.true_start_flag"
                  autocomplete="off"
                  placeholder="公里"
                  maxlength="3"
                ></el-input>
              </el-form-item>
              <el-form-item prop="start_length">
                <b>+</b>
                <el-input
                  v-model="formEditData.true_start_length"
                  autocomplete="off"
                  placeholder="米"
                  maxlength="3"
                ></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="开始里程(DK)：" class="el-form-item-inlines">
              <el-form-item prop="start_flag">
                <el-input
                  v-model="formEditData.true_end_flag"
                  autocomplete="off"
                  placeholder="公里"
                  maxlength="3"
                ></el-input>
              </el-form-item>
              <el-form-item prop="end_length">
                <b>+</b>
                <el-input
                  v-model="formEditData.true_end_length"
                  autocomplete="off"
                  placeholder="米"
                  maxlength="3"
                ></el-input>
              </el-form-item>
            </el-form-item>
          </div>
          <div class="el-form-item-block">
            <el-form-item label="完成数量：" label-width="120px">
              <el-input
                v-model="formEditData.finish_num"
                autocomplete="off"
                placeholder="公里"
                maxlength="3"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="formEditData.status">完成</el-checkbox>
            </el-form-item>
          </div>
          <div class="el-form-item-block">
            <el-form-item label="备注：" label-width="120px">
              <el-input
                v-model="formEditData.remark"
                autocomplete="off"
                type="textarea"
                maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
          </div>
          <div class="el-form-item-block">
            <el-form-item label="未完成原因：" label-width="120px">
              <el-input
                v-model="formEditData.reason"
                autocomplete="off"
                type="textarea"
                maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
          </div>
        </fieldset>

        <div class="blank"></div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaLogFormEditVisible = false">关闭</el-button>
        <el-button type="primary" @click="updateDayTrueplan()">确定</el-button>
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
      masterList: [],
      driverList: [],
      stationList: [],
      workTypeList: [],
      workLineTypeList: [],
      userList: [],
      formRules: {
        number: [
          {
            required: true,
            message: "请输入编号2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }
        ],
        start_time: [
          {
            required: true,
            message: "请输入开始时间",
            trigger: "change"
          }
        ],
        end_time: [
          {
            required: true,
            message: "请输入结束时间",
            trigger: "change"
          }
        ],
        start_flag: [
          {
            required: true,
            message: "请输入里程(公里)",
            trigger: "blur"
          }
        ],
        start_length: [
          {
            required: true,
            message: "请输入里程(米)",
            trigger: "blur"
          }
        ],
        end_flag: [
          {
            required: true,
            message: "请输入里程(公里)",
            trigger: "blur"
          }
        ],
        end_length: [
          {
            required: true,
            message: "请输入里程(米)",
            trigger: "blur"
          }
        ]
      },
      diaLogFormEditVisible: false,
      diaLogTitleEdit: "",
      formEditData: {},
      numberId: 0,
      planNumbersList: [],
      formEditRules: {}
    };
  },
  mounted() {
    this.getChart();
  },
  created() {
    this.getLocomotiveLists(); //机车
    this.getLineTypeList(); //线别
    this.getMasterList(); //车长
    this.getdriverList(); //司机
    this.getStationList(); //车站
    this.getWorkTypeList(); //作业类型
  },
  methods: {
    getChart() {
      this.formData.date = this.todayValue;
      this.todayPreValue = this.getNextDate(this.todayValue, -1);
      this.todayNextValue = this.getNextDate(this.todayValue, 1);
      let start_time = this.getNextDate(this.todayValue, -1, "-");
      let end_time = this.getNextDate(this.todayValue, 1, "-");
      let line_type = "1,2,3,4";
      let type = 1;
      let loco_type = "1,2,3,4";
      this.request({
        url: "/dayplan/getLineDatas",
        method: "get",
        params: { start_time, end_time, line_type, type, loco_type }
      }).then(res => {
        let resdata = res.data;
        if (resdata.status == 1) {
          //myChart
          var myChart = this.$echarts.init(document.getElementById("main"));
          myChart.getDom().style.height =
            document.body.clientHeight - 280 + "px";
          //站点=============
          resdata.data.stations.map(item => {
            this.mark_line.push({
              name:
                item.name +
                " DK " +
                item.start_flag +
                " + " +
                item.start_length,
              yAxis: item.start_flag + item.start_length / 1000
            });
          });
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
          // 数据
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
              }
            }
          });

          //划线===============
          console.log("plan" + JSON.stringify(resdata.data.plan));
          let dataTypeArr = resdata.data.plan;
          let dataTypeArr3 = [
            {
              lists: [
                { name: "2020-04-09 20:00:00", value: 21.003 },
                { name: "2020-04-09 23:00:00", value: 32.9 }
              ]
            },
            {
              lists: [
                { name: "2020-04-09 19:00:00", value: 14.003 },
                { name: "2020-04-09 20:00:00", value: 16.9 }
              ]
            },
            {
              lists: [
                { name: "2020-04-09 22:00:00", value: 24.003 },
                { name: "2020-04-09 23:00:00", value: 32.9 }
              ]
            },
            {
              lists: [
                { name: "2020-04-08 20:00:00", value: 18.003 },
                { name: "2020-04-09 0:00:00", value: 22.9 }
              ]
            }
          ];
          //计划线 实际线
          let typeData = [];
          let typeSJData = [];
          dataTypeArr.forEach((item, index) => {
            let startlist = [];
            let start_flag_list = [];
            let start_length_list = [];
            start_flag_list.push(item.start_time,  parseFloat(item.start_flag) + parseFloat(item.start_length / 1000));
            start_length_list.push(item.end_time, parseFloat(item.end_flag) + parseFloat(item.end_length / 1000));
            startlist.push(start_flag_list, start_length_list);
           typeData.push({ lists: startlist });
            //
           let endlist = [];
            let true_start_flag_list = [];
            let  true_start_length_list = [];
            true_start_flag_list.push(item.start_time, parseFloat(item.true_start_flag) + parseFloat(item.true_start_length / 1000));
            true_start_length_list.push(item.end_time, parseFloat(item.true_end_flag) + parseFloat(item.true_end_length / 1000));
            endlist.push(true_start_flag_list, true_start_flag_list);
            typeSJData.push({ lists: endlist});
          });
          console.log("typeData：" + JSON.stringify(typeData));
          for (let k in typeData) {
            seriesData.push({
              type: "line",
              itemStyle: { normal: { color: "blue" } },
              data: typeData[k].lists
            });
          }
          //
          console.log("typeSJData" + JSON.stringify(typeSJData));
          for (let k in typeSJData) {
            seriesData.push({
              type: "line",
              itemStyle: { normal: { color: "green" } },
              data: typeSJData[k].lists
            });
          }

              console.log("projectData：" + JSON.stringify(seriesData));
          //时间
          let dataMin = new Date(
            this.todayValue.getTime() - 24 * 60 * 60 * 1000
          ).setHours(17);
          let dataMax = new Date(
            this.todayValue.getTime() + 24 * 60 * 60 * 1000
          ).setHours(19);
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
              min: minLineNum - 3,
              max: maxLineNum,
              animation: false
            },
            dataZoom: [
              {
                show: true,
                realtime: true,
                zoomLock: true,
                start: 0,
                end: 50
              },
              {
                type: "inside",
                realtime: true,
                zoomOnMouseWheel: false,
                start: 0,
                end: 50
              }
            ],
            // dataZoom: [
            //   {
            //     type: "slider",
            //     filterMode: "weakFilter",
            //     show: false,
            //     zoomLock: true,
            //     top: 24,
            //     start: 0,
            //     end: 50,
            //     minValueSpan: 4 * 3600 * 1000
            //   },
            //   {
            //     type: "inside",
            //     start: 0,
            //     end: 100
            //   },
            //   {
            //     type: "inside",
            //     zoomOnMouseWheel: false,
            //     start: 0,
            //     end: 100
            //   }
            // ],
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
    //date 代表指定的日期，格式：2018-09-27 day 传-1表始前一天，传1表始后一天
    getNextDate(date, day, flag) {
      var dd = new Date(date);
      dd.setDate(dd.getDate() + day);
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      if (flag == "-") {
        return y + "-" + m + "-" + d;
      } else {
        return y + "年" + m + "月" + d + "日";
      }
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
          this.$set(this.formData, "out_business_loco", this.locoList[0]["id"]);
          this.$set(
            this.formData,
            "back_business_loco",
            this.locoList[0]["id"]
          );
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
    //5:车长,6:司机,7:调度值班员，8：车站值班员 /dispatch/getUsersLists
    getMasterList() {
      this.request({
        url: "/dispatch/getUsersLists?role_id=5",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.masterList = data.data;
          this.$set(this.formData, "out_master_id", this.masterList[0]["id"]);
          this.$set(this.formData, "back_master_id", this.masterList[0]["id"]);
        }
      });
    },
    getdriverList() {
      this.request({
        url: "/dispatch/getUsersLists?role_id=6",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.driverList = data.data;
          this.$set(this.formData, "out_driver_id", this.driverList[0]["id"]);
          this.$set(this.formData, "back_driver_id", this.driverList[0]["id"]);
        }
      });
    },
    getStationList() {
      this.request({
        url: "/apply/getStationLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.stationList = data.data;
          this.$set(this.formData, "start_station", this.stationList[0]["id"]);
          this.$set(this.formData, "end_station", this.stationList[0]["id"]);
        }
      });
    },
    changeStartStation(value) {
      //alert(value);
      this.stationList.map(item => {
        if (item.id == value) {
          this.formData.start_flag = parseFloat(item.start_flag);
          this.formData.start_length = parseFloat(item.start_length);
        }
      });
    },
    changeEndStation(value) {
      //alert(value);
      this.stationList.map(item => {
        if (item.id == value) {
          this.formData.end_flag = parseFloat(item.start_flag);
          this.formData.end_length = parseFloat(item.start_length);
        }
      });
    },
    getWorkTypeList() {
      this.request({
        url: "/project/getWorkTypeList",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.workTypeList = data.data;
          let wordId = this.workTypeList[0]["id"];
          this.$set(this.formData, "work_type", wordId);
          this.changeWorkListItem(wordId);
        }
      });
    },
    changeWorkListItem(value) {
      const that = this;
      this.$set(this.formData, "line_type", "");
      let selectedLineTypeLists = [];
      this.workTypeList.forEach(function(item) {
        if (item.id == value) {
          selectedLineTypeLists = item.line_type_lists;
        }
      });
      this.workLineTypeList = selectedLineTypeLists;
      this.$set(this.formData, "line_type", selectedLineTypeLists[0]["id"]);
    },
    planAdd() {
      this.diaLogTitle = "计划图";
      this.diaLogFormVisible = true;
    },
    addDayPlanDialog() {
      this.$refs["formRules"].validate(valid => {
        if (valid) {
          let data = this.formData;
          this.request({
            url: "/dayplan/addDayPlan",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.diaLogFormVisible = false;
              this.$message({
                type: "success",
                message: "保存成功！"
              });
              this.getChart();
            }
          });
        }
      });
    },
    //編輯
    getUserLists() {
      this.request({
        url: "/dayplan/getUserLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.userList = data.data;
          let record_id = this.userList[0]["id"];
          this.formEditData.record_id = record_id;
          // this.$set(this.formEditData, "record_id", record_id);
        }
      });
    },
    getPlanNumbers() {
      let todayNum = this.todayValue;
      let start_time = this.getNextDate(todayNum, -1, "-"); //前一天
      let end_time = this.getNextDate(todayNum, 1, "-"); //后一天
      this.request({
        url: "/dayplan/getPlanNumbers",
        method: "get",
        params: {
          start_time: start_time,
          end_time: end_time
        }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.planNumbersList = data.data;
          this.numberId = this.planNumbersList[0]["id"];
          this.getPlanDetail(this.planNumbersList[0]["id"]);
        }
      });
    },
    selectPlanNumbers(value) {
      this.getPlanDetail(value);
    },
    getPlanDetail(id) {
      this.request({
        url: "/dayplan/getDayPlanDetail",
        method: "get",
        params: { id: id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.formEditData = {
            id: this.numberId,
            number: data.data.number,
            record_id:
              data.data.record_id == null
                ? this.formEditData.record_id
                : data.data.record_id,
            true_start_time:
              data.data.true_start_time == ""
                ? data.data.start_time
                : data.data.true_start_time,
            true_end_time:
              data.data.true_end_time == ""
                ? data.data.end_time
                : data.data.true_end_time,
            true_start_flag:
              data.data.true_start_flag == null
                ? parseFloat(data.data.start_flag)
                : parseFloat(data.data.true_start_flag),
            true_start_length:
              data.data.true_start_length == null
                ? parseFloat(data.data.start_length)
                : parseFloat(data.data.true_start_length),
            true_end_flag:
              data.data.true_end_flag == null
                ? parseFloat(data.data.end_flag)
                : parseFloat(data.data.true_end_flag),
            true_end_length:
              data.data.true_end_length == null
                ? parseFloat(data.data.end_length)
                : parseFloat(data.data.true_end_length),
            finish_num: data.data.finish_num,
            remark: data.data.remark,
            reason: data.data.reason,
            status: data.data.status
          };
          console.log(this.formEditData);
        }
      });
    },
    planEdit() {
      this.diaLogTitleEdit = "修改计划图";
      this.diaLogFormEditVisible = true;
      this.getPlanNumbers(); //日班计划列表
      this.getUserLists(); //记录人
    },
    updateDayTrueplan() {
      this.$refs["refFormEditRules"].validate(valid => {
        if (valid) {
          let data = this.formEditData;
          this.request({
            url: "/dayplan/updateDayTrueplan",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.diaLogFormEditVisible = false;
              this.getChart();
              this.$message({
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
    }
    // this.request({
    //   url: "/dayplan/updateDayTrueplan",
    //   method: "get",
    //   params: { id: this.numberId }
    // }).then(response => {
    //   let data = response.data;
    //   if (data.status == 1) {
    //     // this.formData = data.data;
    //     // this.lineTypeList.map((item, index) => {
    //     //   if (item.id == data.data.line_type) {
    //     //     // this.lineTypeDes = "里程范围：" + item.tip;
    //     //     // this.lineTypeStart = item.start;
    //     //     // this.lineTypeEnd = item.end;
    //     //     // var timestamp = new Date(data.data.end_time);
    //     //     // console.log("timestamp:" + timestamp);
    //     //     // this.formData.end_time = timestamp;
    //   }
    // });

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
.dialog-monitor .el-dialog__body {
  padding: 30px 30px 0 30px;
}
.dialog-monitor b {
  font-weight: 500;
}
.dialog-monitor .el-textarea__inner {
  border: 1px #9db9fa solid;
  color: #4b6eca;
  height: 55px;
  width: 550px;
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
  padding-right: 8px;
}
.dialog-monitor fieldset {
  border: 1px #9db9fa solid;
  margin-bottom: 15px;
  border-radius: 3px;
  padding: 5px 5px 0 5px;
}
.dialog-monitor fieldset legend {
  font-size: 16px;
  color: #4b6eca;
  padding: 0 10px;
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
