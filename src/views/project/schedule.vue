<template>
  <div id="project">
    <div class="el-menu-top">
      <el-menu router default-active="schedule" mode="horizontal">
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
      <div class="echart-top">
        <el-menu
          class="el-menu-cus"
          :default-active="workSelectId.toString()"
          @select="selectLineTypeList"
        >
          <el-menu-item
            v-for="item in lineTypeList"
            :key="item.id"
            :index="item.id.toString()"
          >{{item.name}}</el-menu-item>
        </el-menu>
      </div>
      <div class="app-page-container">
        <el-calendar class="plancale" v-model="dateCellValue">
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{date, data}">
            <div class="calendar-wapper">
              <p class="date">{{ data.day.split('-').slice(2).join('-') }}</p>
              <p class="calendar-operate add" @click="addDayPlan(data.day)">添加</p>
              <p class="calendar-operate detail" @click="detailDayPlan(data.day)">详情</p>
              <div class="calendar-tips">
                <p class="calendar-show plan-finished">
                  <span>计划完成：</span>
                  <span
                    v-if="typeof(calendarLists[data.day])!=='undefined'"
                  >{{calendarLists[data.day]["plan"]}}{{calendarLists[data.day]["unit"]}}</span>
                </p>
                <p class="calendar-show act-finished">
                  <span>实际完成：</span>
                  <span
                    v-if="typeof(calendarLists[data.day])!=='undefined'"
                  >{{calendarLists[data.day]["true"]}}{{calendarLists[data.day]["unit"]}}</span>
                </p>
                <p class="calendar-show remark">
                  <el-tooltip
                    v-if="typeof(calendarLists[data.day])!=='undefined'"
                    class="item"
                    effect="dark"
                    :content="calendarLists[data.day]['remark']"
                    placement="top-start"
                  >
                    <span class="calendar-beizhu">备注：{{calendarLists[data.day]["remark"]}}</span>
                  </el-tooltip>
                </p>
              </div>
            </div>
          </template>
        </el-calendar>
        <el-dialog
          width="700px"
          :close-on-click-modal="false"
          class="dialog-plan-add"
          title="添加信息"
          :visible.sync="dialogAddVisible"
          v-if="dialogAddVisible"
        >
          <span class="ptxt">添加日期：{{addDate}}</span>
          <span class="ptxt">作业：{{planWorkName}}</span>
          <div v-if="planOneDataType==1">
            <ul id="plan-ul">
              <li class="pheader">
                <div class="pitem">线别</div>
                <div class="pitem">计划开始里程</div>
                <div class="pitem">计划结束里程</div>
              </li>
              <li v-for="(item,index) in planOneData" :key="item.id" class="li-line">
                <div class="plan-content">
                  <el-checkbox v-model="item.checked"></el-checkbox>
                  <span v-if="item.line_type == ii.id" v-for="ii in lineList">{{ii.name}}</span>
                </div>
                <div class="plan-content">
                  <span>
                    <b>DK</b>
                  </span>
                  <input
                    v-model="item.start_flag"
                    :disabled="!item.checked"
                    class="pinput"
                    type="number"
                    placeholder="公里"
                    oninput="if(value.length>2)value=value.slice(0,2)"
                  />
                  <span>+</span>
                  <input
                    v-model="item.start_length"
                    :disabled="!item.checked"
                    class="pinput"
                    type="number"
                    placeholder="米"
                    oninput="if(value.length>3)value=value.slice(0,3)"
                  />
                </div>
                <div class="plan-content">
                  <span>
                    <b>DK</b>
                  </span>
                  <input
                    v-model="item.end_flag"
                    :disabled="!item.checked"
                    class="pinput"
                    type="number"
                    placeholder="公里"
                    oninput="if(value.length>2)value=value.slice(0,2)"
                  />
                  <span>+</span>
                  <input
                    v-model="item.end_length"
                    :disabled="!item.checked"
                    class="pinput"
                    type="number"
                    placeholder="米"
                    oninput="if(value.length>3)value=value.slice(0,3)"
                  />
                </div>
                <div class="plan-tip">{{item.tip}}</div>
              </li>
              <p style="clear:both"></p>
            </ul>
          </div>
          <div v-else style="margin-top:20px;width:280px;">
            <el-input placeholder="请输入正确的数字" v-model="planWorkNum" max="10000000" maxlength="8">
              <template slot="prepend">计划数量</template>
            </el-input>
          </div>
          <div class="plan-btn">
            <!-- <div class="el-form-item-error">{{messageError}}</div> -->
            <el-button @click="dialogAddVisible = false">关闭</el-button>
            <el-button type="primary" @click="addOnePlan">确定</el-button>
          </div>
        </el-dialog>
        <el-dialog
          width="700px"
          :close-on-click-modal="false"
          class="dialog-plan-add"
          title="详细信息"
          :visible.sync="dialogDetailVisible"
        >
          <div>
            <span class="ptxt">施工日期：</span>
            <span class="ptxt">{{planWorkDate}}</span>
            <span class="ptxt">作业：</span>
            <span class="ptxt">{{planWorkName}}</span>
          </div>
          <div v-if="proType==1">
            <el-table :data="planDetailList" class="plan-show" border>
              <el-table-column property="line_type_desc" label="线别"></el-table-column>
              <el-table-column property="plan_tip" label="计划里程" width="200px"></el-table-column>
              <el-table-column property="true_tip" label="实际里程" width="200px"></el-table-column>
              <el-table-column property="remark" label="备注"></el-table-column>
            </el-table>
          </div>
          <div v-else>
            <el-table :data="planDetailList" class="plan-show" border>
              <el-table-column property="plan_num" label="计划完成" width="200px"></el-table-column>
              <el-table-column property="true_num" label="实际完成" width="200px"></el-table-column>
              <el-table-column property="remark" label="备注"></el-table-column>
            </el-table>
          </div>
          <div class="plan-btn">
            <el-button @click="dialogDetailVisible=false">关闭</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { publicData } from "@/utils/common";
export default {
  data() {
    return {
      workSelectId: "0",
      lineTypeList: [],
      lineList: [],
      planInputDisabled: true,

      planOneData: [],
      planOneDataType: 1,
      addDate: "",
      planWorkName: "",
      planWorkDate: "",
      planWorkNum: "",
      planDetailList: [],
      dialogAddVisible: false,
      dialogDetailVisible: false,
      calendarLists: {},
      dateCellValue: "",
      proType: 1
    };
  },
  mounted() {
    document
      .querySelector("#app-menu-items #menu_project")
      .classList.add("is-active");
  },
  created() {
    this.getLineType();
    this.getWorkTypeList();
  },
  methods: {
    getWorkTypeList() {
      this.request({
        url: "/project/getWorkTypeList",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1 && data.data.length > 0) {
          this.lineTypeList = data.data;
          this.workSelectId = this.lineTypeList[0]["id"].toString();
          this.planWorkName = this.lineTypeList[0]["name"];
          this.getPlanByDate(this.workSelectId);
        }
      });
    },

    //获取已添加的记录
    getPlanByDate() {
      let proId = this.workSelectId;
      this.request({
        url: "/project/getPlanByDate",
        method: "get",
        params: { proId }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.calendarLists = data.data;
        }
      });
    },
    //选择作业
    selectLineTypeList(key) {
      this.workSelectId = key;
      this.dateCellValue = new Date();
      //  this.getCurrData();
      //this.dateTimePicker1.MaxDate = DateTime.Now;
      this.getPlanByDate(key);
    },
    //查看详情
    getPlanDetailLists(addDate) {
      this.planDetailList = [];
      let proId = this.workSelectId;
      this.planWorkDate = addDate;
      this.request({
        url: "/project/getPlanDetailLists",
        method: "get",
        params: { addDate, proId }
      }).then(response => {
        let data = response.data;
        if (data.status == 1 && data.data.length > 0) {
          this.planDetailList = data.data;
          if (this.planDetailList.length > 0) {
            this.proType = this.planDetailList[0]["pro_type"];
          }
        }
      });
    },
    detailDayPlan(addDate) {
      this.dialogDetailVisible = true;
      this.getPlanDetailLists(addDate);
    },
    getLineType() {
      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.lineList = data.data;
        }
      });
    },

    addDayPlan(date) {
      this.addDate = date;
      this.dialogAddVisible = true;
      this.planOneData.forEach(function(item) {
        item.checked = false;
        item.start_flag = "";
        item.start_length = "";
        item.end_flag = "";
        item.end_length = "";
      });
      this.planWorkNum = "";
      this.getCurrData();
    },
    getCurrData() {
      const that = this;
      let workSelectId = this.workSelectId;
      let one = {};
      this.lineTypeList.forEach(function(item, key) {
        if (workSelectId == item["id"]) {
          one = item;
          that.planOneDataType = item.type;
          console.log("planOneDataType：" + that.planOneDataType);
        }
      });
      if (JSON.stringify(one) !== "{}") {
        this.planOneData = one["des"];
        this.planWorkName = one["name"];
      }
    },
    //添加
    addOnePlan() {
      const that = this;
      if (this.planOneDataType == 1) {
        let canSubmit = false;
        this.planOneData.forEach(function(item) {
          if (item["checked"] == true) {
            canSubmit = true;
            that.planInputDisabled = false;
          }
        });
        if (canSubmit == false) {
          this.$message({
            showClose: true,
            message: "请选中要作业的线别",
            type: "error"
          });
          return false;
        }
      }
      //console.log("planOneData：" + JSON.stringify(this.planOneData));
      let json = this.planOneData;
      for (let i = 0; i < json.length; i++) {
        if (json[i].checked == true) {
          if (
            json[i].start_flag == "" ||
            json[i].start_length == "" ||
            json[i].end_flag == "" ||
            json[i].end_length == ""
          ) {
            that.$message.error("请输入开始和结束里程（公里和米）");
            return;
          }
          let start =
            json[i].start_flag * 1000 + parseInt(json[i].start_length);
          let total_start =
            json[i].total_start_flag * 1000 +
            parseInt(json[i].total_start_length);
          let end = json[i].end_flag * 1000 + parseInt(json[i].end_length);
          let total_end =
            json[i].total_end_flag * 1000 + parseInt(json[i].total_end_length);
          console.log("start：" + start + " total_start：" + total_start);
          console.log("end：" + end + " total_end：" + total_end);
          if (start < total_start || end > total_end) {
            that.$message.error("请输入" + json[i].tip);
            return;
          }
          if (end < start) {
            that.$message.error("输入的结束里程不能小于开始里程");
            return;
          }
        }
      }
      if (this.planOneDataType == 2) {
        let num = this.planWorkNum;
        var regexp = /^[1-9]\d*$/;
        if (!regexp.test(num)) {
          that.$message.error("请输入正确的计划数量");
          return;
        }
      }
      let data = {
        addDate: this.addDate,
        checkedList: this.planOneData,
        workName: this.planWorkName,
        pro_id: this.workSelectId,
        plan_num: this.planWorkNum
      };
      this.request({
        url: "/project/addOnedayPlan",
        method: "post",
        data
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          this.getPlanByDate(this.workSelectId);
          this.dialogAddVisible = false;
        } else {
          this.$message({
            showClose: true,
            message: "添加失败",
            type: "error"
          });
        }
      });
    }

    //
  }
};
</script>
<style>
/*calendar*/
.plancale .el-calendar__body {
  padding: 20px 0;
}
.plancale .el-calendar__header {
  padding: 0 0 0 0;
  border: none;
}
.plancale .el-calendar-table {
  border-radius: 6px 6px 0 0;
}
.plancale .el-calendar-table thead th {
  background: #3655a5;
  color: #fff;
}
.plancale .el-calendar-table thead th:first-child {
  border-radius: 6px 0 0 0;
}
.plancale .el-calendar-table thead th:last-child {
  border-radius: 0 6px 0 0;
}
.plancale .el-calendar-table .el-calendar-day {
  height: 110px;
  padding: 10px;
  overflow: hidden;
}
.plancale .date {
  font-size: 28px;
  color: #4b6eca;
}
.plancale .calendar-wapper {
  position: relative;
}
.plancale .calendar-operate {
  position: absolute;
  top: 0px;
  font-size: 10px;
  cursor: pointer;
}
.plancale .add {
  right: 34px;
  color: red;
}
.plancale .detail {
  right: 0px;
  color: #72acce;
}
.plancale .calendar-tips {
  position: absolute;
  font-size: 10px;
  left: 0;
}
.plancale .calendar-show {
  padding-top: 5px;
  color: #666;
}
.plancale .is-today {
  background: #cce3fb;
}

/*plan */
.dialog-plan-add .ptxt {
  color: #4b6eca;
  display: inline-block;
  margin-right: 15px;
  font-size: 18px;
}
.dialog-plan-add .pinput {
  width: 70px;
  height: 31px;
  border: 1px #9db9fa solid;
  text-align: center;
}
.dialog-plan-add .pinput[disabled] {
  background: #f1f1f1;
}
.dialog-plan-add #plan-ul {
  list-style: none;
  border: 1px #ddd solid;
  border-bottom: none;
  margin-top: 20px;
}
.dialog-plan-add #plan-ul li {
  border-bottom: 1px solid #ccc;
  padding: 15px 20px;
  overflow: hidden;
}
.dialog-plan-add #plan-ul .pheader {
  background: #f2f2f2;
}
.dialog-plan-add #plan-ul .pitem {
  width: 32%;
  display: inline-block;
}
.dialog-plan-add .plan-content {
  width: 33%;
  float: left;
  margin-bottom: 10px;
}
.dialog-plan-add .plan-content span {
  color: #1d397a;
}
.dialog-plan-add .plan-tip {
  color: #90a8e8;
  text-align: center;
  font-size: 12px;
  display: block;
  margin-left: -15px;
}
.plan-btn {
  text-align: right;
  margin-top: 20px;
}
.plan-btn .el-form-item-error {
  float: left;
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
}
.plan-show {
  border: 1px #ddd solid;
  border-bottom: none;
  margin-top: 20px;
}
.plan-show .has-gutter th {
  background: #f2f2f2;
}
/* end plan */
.el-menu-cus {
  padding: 0px 20px 20px 0px;
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

.el-calendar-table:not(.is-range) td.next,
.el-calendar-table:not(.is-range) td.prev {
  pointer-events: none;
  background: #fafafa;
}
.el-calendar-table:not(.is-range) td.next .date,
.el-calendar-table:not(.is-range) td.prev .date {
  color: #ccc;
}
.calendar-beizhu {
  height: 40px;
  max-width: 180px;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden;
}
</style>
