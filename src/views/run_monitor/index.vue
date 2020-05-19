<template>
  <div id="app-monitor-chart">
    <div class="maintitle">{{todayPreValue}} 18时 -— {{todayNextValue}} 18时轨行区作业分布图</div>

    <div class="app-page">
      <div class="app-page-container">
        <div class="app-page-adds">
          <div class="btnitem">
            <el-button @click="planAdd" type="primary" plain>编制日班计划图</el-button>
          </div>
          <div class="btnitem">
            <el-button @click="planEdit" type="primary " plain>编制日班实际图</el-button>
          </div>
          <div class="btnitem">
            <el-button @click="refreshPage" type="primary" plain>刷新</el-button>
          </div>
          <div class="btnitem">
            <el-date-picker
              style="width:160px;"
              v-model="formData.date"
              type="date"
              placeholder="选择日期"
              :clearable="false"
              @input="selectDatePicker($event)"
            ></el-date-picker>
            <el-button @click="preDate" type="primary" plain>前一天</el-button>
            <el-button @click="nextDate" type="primary" plain>后一天</el-button>
          </div>
        </div>
        <div class="chartmain">
          <div id="main" style="height:500px;width:100%;"></div>
        </div>
        <div class="sidebox">
          <!-- <h3>显示控制</h3> -->
          <div class="chklist chlone">
            <el-checkbox-group v-model="select_line_type" @change="selectLineTypeChart">
              <el-checkbox
                v-for="item in lineTypeList"
                :key="item.id"
                :label="item.id"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="chklist">
            <el-checkbox label="计划图" @change="selectTypePlanChart" checked></el-checkbox>
            <el-checkbox class="chkshiji" label="实际图" @change="selectTypeNowChart" checked></el-checkbox>
          </div>
          <div class="chklist chltwo">
            <el-checkbox-group v-model="select_loco_type" @change="selectLocoTypeChart">
              <el-checkbox v-for="item in locoList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      width="998px"
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
            <!-- <el-option label="行车计划" :value="2"></el-option>
            <el-option label="施工计划" :value="3"></el-option>-->
          </el-select>
        </el-form-item>
        <fieldset v-if="formData.plan_type!=3">
          <legend>列车信息</legend>
          <el-form-item label="列车类型：" label-width="100px" style="display:none">
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
              <el-select v-model="formData.out_reco" placeholder="无">
                <el-option label="无" :value="0"></el-option>
                <el-option
                  v-for="item in locoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="补机：">
              <el-select v-model="formData.out_supple" placeholder="无">
                <el-option label="无" :value="0"></el-option>
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
                  v-for="item in lineTypeList"
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
              <el-select v-model="formData.back_reco" placeholder="无">
                <el-option label="无" :value="0"></el-option>
                <el-option
                  v-for="item in locoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="补机：">
              <el-select v-model="formData.back_supple" placeholder="无">
                <el-option label="无" :value="0"></el-option>
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
            <el-form-item label="返回线别：" label-width="100px">
              <el-select v-model="formData.back_line_type" placeholder="请选择">
                <el-option
                  v-for="item in lineTypeList"
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
        <fieldset v-if="formData.plan_type!=2">
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
              <el-select v-model="formData.work_plan_id" placeholder="请选择">
                <el-option
                  v-for="item in departLists"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-form-item-block">
            <el-form-item label="工点：" label-width="100px" prop="start_station">
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
            <el-form-item prop="end_station">
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
            <el-form-item label="里程：" class="el-form-item-inlines is-required">
              <el-form-item prop="start_flag">
                <el-input
                  v-model="formData.start_flag"
                  autocomplete="off"
                  placeholder="公里"
                  maxlength="3"
                ></el-input>
              </el-form-item>
              <el-form-item prop="start_length" class="lengtherror">
                <b>+</b>
                <el-input
                  v-model="formData.start_length"
                  autocomplete="off"
                  placeholder="米"
                  maxlength="3"
                ></el-input>
              </el-form-item>
              <el-form-item prop="start_flag" class="lengtherror">
                <b style="width:100px">至</b>
                <el-input
                  v-model="formData.end_flag"
                  autocomplete="off"
                  placeholder="公里"
                  maxlength="3"
                ></el-input>
              </el-form-item>
              <el-form-item prop="end_length" class="lengtherror">
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
              <el-select v-model="formData.item_id" placeholder="请选择">
                <el-option
                  v-for="item in itemLists"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工序：">
              <el-select v-model="formData.work_id" placeholder="请选择">
                <el-option
                  v-for="item in workSortLists"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </fieldset>
        <el-form-item class="istextarea" label="计划内容：" label-width="110px" prop="description">
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
    <!-- bj -->
    <el-dialog
      width="998px"
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
        <fieldset v-if="formEditData.plan_type!=3">
          <legend>列车信息</legend>
          <el-form-item label="列车类型：" label-width="100px" style="display:none">
            <el-select v-model="formEditData.car_type" placeholder="请选择"></el-select>
          </el-form-item>
          <div class="el-form-item-block">
            <el-form-item label="出行车次：" label-width="100px">
              <el-input v-model="formEditData.out_car" autocomplete="off" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="本务：">
              <el-select v-model="formEditData.out_business_loco">
                <el-option
                  v-for="item in locoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="重联：">
              <el-select v-model="formEditData.out_reco" placeholder="无">
                <el-option label="无" :value="0"></el-option>
                <el-option
                  v-for="item in locoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="补机：">
              <el-select v-model="formEditData.out_supple" placeholder="无">
                <el-option label="无" :value="0"></el-option>
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
              <el-select v-model="formEditData.out_line_type" placeholder="请选择">
                <el-option
                  v-for="item in lineTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车长：">
              <el-select v-model="formEditData.out_master_id" placeholder="请选择">
                <el-option
                  v-for="item in masterList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="司机：">
              <el-select v-model="formEditData.out_driver_id" placeholder="请选择">
                <el-option
                  v-for="item in driverList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编组：">
              <el-input v-model="formEditData.out_marshalling" autocomplete="off" maxlength="20"></el-input>
            </el-form-item>
          </div>
          <div class="el-form-item-block">
            <el-form-item label="返回车次：" label-width="100px">
              <el-input v-model="formEditData.back_car" autocomplete="off" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="本务：">
              <el-select v-model="formEditData.back_business_loco" placeholder="请选择">
                <el-option
                  v-for="item in locoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="重联：">
              <el-select v-model="formEditData.back_reco" placeholder="无">
                <el-option label="无" :value="0"></el-option>
                <el-option
                  v-for="item in locoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="补机：">
              <el-select v-model="formEditData.back_supple" placeholder="无">
                <el-option label="无" :value="0"></el-option>
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
            <el-form-item label="返回线别：" label-width="100px">
              <el-select v-model="formEditData.back_line_type" placeholder="请选择">
                <el-option
                  v-for="item in lineTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车长：">
              <el-select v-model="formEditData.back_master_id" placeholder="请选择">
                <el-option
                  v-for="item in masterList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="司机：">
              <el-select v-model="formEditData.back_driver_id" placeholder="请选择">
                <el-option
                  v-for="item in driverList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编组：">
              <el-input v-model="formEditData.back_marshalling" maxlength="20" autocomplete="off"></el-input>
            </el-form-item>
          </div>
        </fieldset>
        <!---2 -->
        <fieldset v-if="formEditData.plan_type!=2">
          <legend>施工信息</legend>
          <div class="el-form-item-block">
            <el-form-item label="开始时间：" label-width="100px" prop="start_time">
              <el-date-picker
                v-model="formEditData.start_time"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：" prop="end_time">
              <el-date-picker
                v-model="formEditData.end_time"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="施工作业队：" label-width="100px">
              <el-select v-model="formEditData.work_plan_id" placeholder="请选择">
                <el-option
                  v-for="item in departLists"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-form-item-block">
            <el-form-item label="工点：" label-width="100px" prop="start_station">
              <el-select
                v-model="formEditData.start_station"
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
            <el-form-item prop="end_station">
              <el-select
                v-model="formEditData.end_station"
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
            <el-form-item label="里程：" class="el-form-item-inlines is-required">
              <el-form-item prop="start_flag">
                <el-input
                  v-model="formEditData.start_flag"
                  autocomplete="off"
                  placeholder="公里"
                  maxlength="3"
                ></el-input>
              </el-form-item>
              <el-form-item prop="start_length" class="lengtherror">
                <b>+</b>
                <el-input
                  v-model="formEditData.start_length"
                  autocomplete="off"
                  placeholder="米"
                  maxlength="3"
                ></el-input>
              </el-form-item>
              <el-form-item prop="start_flag" class="lengtherror">
                <b style="width:100px">至</b>
                <el-input
                  v-model="formEditData.end_flag"
                  autocomplete="off"
                  placeholder="公里"
                  maxlength="3"
                ></el-input>
              </el-form-item>
              <el-form-item prop="end_length" class="lengtherror">
                <b>+</b>
                <el-input
                  v-model="formEditData.end_length"
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
                v-model="formEditData.work_type"
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
              <el-select v-model="formEditData.line_type" placeholder="请选择">
                <el-option
                  v-for="item in workLineTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="施工项目：">
              <el-select v-model="formEditData.item_id" placeholder="请选择">
                <el-option
                  v-for="item in itemLists"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工序：">
              <el-select v-model="formEditData.work_id" placeholder="请选择">
                <el-option
                  v-for="item in workSortLists"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </fieldset>
        <el-form-item class="istextarea" label="计划内容：" label-width="110px" prop="description">
          <el-input
            v-model="formEditData.description"
            autocomplete="off"
            type="textarea"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
        <fieldset>
          <legend>实际施工信息</legend>
          <div class="el-form-item-block">
            <el-form-item label="实际开始时间：" label-width="120px" prop="true_start_time">
              <el-date-picker
                v-model="formEditData.true_start_time"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="实际结束时间：" prop="true_end_time">
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
  data() {
    const valEndTime = (rule, value, callback) => {
      if (value < +this.formData.start_time) {
        callback(new Error("结束时间不能小于开始时间"));
      } else {
        callback();
      }
    };
    const valEditEndTime = (rule, value, callback) => {
      if (new Date(value) < new Date(this.formEditData.start_time)) {
        callback(new Error("结束时间不能小于开始时间"));
      } else {
        callback();
      }
    }; 
     const valEditTrueEndTime = (rule, value, callback) => {
      if (new Date(value) < new Date(this.formEditData.true_start_time)) {
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
      userList: [],
      formRules: {
        number: [
          {
            required: true,
            message: "请输入编号2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" },
          {
            pattern: /(^\S+).*(\S+$)/,
            message: "开始和结尾不能有空格",
            trigger: "blur"
          }
        ],
        start_time: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: "change"
          }
        ],
        end_time: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: "change"
          },
          { required: true, validator: valEndTime, trigger: "change" }
        ],
        start_station: [
          {
            required: true,
            message: "请选择开始站点",
            trigger: "change"
          }
        ],
        end_station: [
          {
            required: true,
            message: "请选择结束站点",
            trigger: "change"
          }
        ],
        start_flag: [
          {
            required: true,
            message: "请输入公里",
            trigger: "blur"
          }
        ],
        start_length: [
          {
            required: true,
            message: "请输入米",
            trigger: "blur"
          }
        ],
        end_flag: [
          {
            required: true,
            message: " 请输入公里",
            trigger: "blur"
          }
        ],
        end_length: [
          {
            required: true,
            message: "请输入米",
            trigger: "blur"
          }
        ]
      },
      formEditRules: {
        number: [
          {
            required: true,
            message: "请输入编号2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" },
          {
            pattern: /(^\S+).*(\S+$)/,
            message: "开始和结尾不能有空格",
            trigger: "blur"
          }
        ],
        start_time: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: "change"
          }
        ],
        end_time: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: "change"
          },
          { required: true, validator: valEditEndTime, trigger: "change" }
        ],
        start_station: [
          {
            required: true,
            message: "请选择开始站点",
            trigger: "change"
          }
        ],
        end_station: [
          {
            required: true,
            message: "请选择结束站点",
            trigger: "change"
          }
        ],
        start_flag: [
          {
            required: true,
            message: "请输入公里",
            trigger: "blur"
          }
        ],
        start_length: [
          {
            required: true,
            message: "请输入米",
            trigger: "blur"
          }
        ],
        end_flag: [
          {
            required: true,
            message: " 请输入公里",
            trigger: "blur"
          }
        ],
        end_length: [
          {
            required: true,
            message: "请输入米",
            trigger: "blur"
          }
        ],
        true_start_time: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: "change"
          }
        ],
        true_end_time: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: "change"
          },
          { required: true, validator: valEditTrueEndTime, trigger: "change" }
        ],
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
      workSortLists: []
    };
  },
  created() {
    this.getPageLoad();
  },
  methods: {
    getPageLoad() {
      this.getLocomotiveLists(); //机车
      this.getLineTypeList(); //线别
    },
    getChart() {
      this.formData.date = this.todayValue;
      this.todayPreValue = this.getNextDate(this.todayValue, -1);
      this.todayNextValue = this.getNextDate(this.todayValue, 1);
      let start_time = this.getNextDate(this.todayValue, -1, "-");
      let end_time = this.getNextDate(this.todayValue, 1, "-");
      let line_type = this.select_line_type.toString();
      let type = 1;
      let loco_type = this.select_loco_type.toString();
      this.request({
        url: "/dayplan/getLineDatas",
        method: "get",
        params: { start_time, end_time, line_type, type, loco_type }
      }).then(res => {
        let resdata = res.data;
        if (resdata.status == 1) {
          //myChart
          var myChart = this.$echarts.init(document.getElementById("main"));
          myChart.clear();
          myChart.getDom().style.width = "2000px";
          myChart.getDom().style.height =
            document.body.clientHeight - 260 + "px";
          //站点=============
          this.mark_line = [];
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
              return parseInt(item.yAxis -1);
            })
          );
          let maxLineNum = Math.max.apply(
            Math,
            this.mark_line.map(function(item) {
              return parseInt(item.yAxis +1);
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
          let dataTypeArr = resdata.data.plan;
          let lineTypeData = [];
          dataTypeArr.forEach((item, index) => {
            let start_flag_list = [];
            let end_flag_list = [];
            let true_start_flag_list = [];
            let true_end_flag_list = [];
            start_flag_list.push(
              item.start_time,
              parseFloat(item.start_flag) + parseFloat(item.start_length / 1000)
            );
            end_flag_list.push(
              item.end_time,
              parseFloat(item.end_flag) + parseFloat(item.end_length / 1000)
            );
            if (this.select_type_plan) {
              let colors = "#0000ff";
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
              true_start_flag_list.push(
                item.true_start_time,
                parseFloat(item.true_start_flag) +
                  parseFloat(item.true_start_length / 1000)
              );
              true_end_flag_list.push(
                item.true_end_time,
                parseFloat(item.true_end_flag) +
                  parseFloat(item.true_end_length / 1000)
              );
              if (this.select_type_now) {
                lineTypeData.push({
                  color: "#2dca2d",
                  lists: [true_start_flag_list, true_end_flag_list]
                });
              }
            }
          });
          for (let k in lineTypeData) {
            seriesData.push({
              type: "line",
              itemStyle: { normal: { color: lineTypeData[k].color } },
              data: lineTypeData[k].lists
            });
          }
          //console.log("seriesLineData" + JSON.stringify(seriesData));
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
                formatter: function(val, index) {
                  let date = new Date(val);
                  let months = date.getMonth() + 1 + "/" + date.getDate();
                  let hours = date.getHours() + ":00";
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
          this.locoList.map(item => {
            this.select_loco_type.push(item.id);
          });
          //this.getChart();
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
          this.lineTypeList = data.data;
          this.lineTypeList.map(item => {
            this.select_line_type.push(item.id);
          });
          this.getChart();
          this.$set(this.formData, "out_line_type", this.lineTypeList[0]["id"]);
          this.$set(
            this.formData,
            "back_line_type",
            this.lineTypeList[0]["id"]
          );
          this.$set(this.formData, "line_type", this.lineTypeList[0]["id"]);
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
          // this.$set(this.formData, "start_station", this.stationList[0]["id"]);
          //this.$set(this.formData, "end_station", this.stationList[0]["id"]);
        }
      });
    },
    changeStartStation(value) {
      //alert(value);
      this.stationList.map(item => {
        if (item.id == value) {
          this.$set(this.formData, "start_flag", parseFloat(item.start_flag));
          this.$set(
            this.formData,
            "start_length",
            parseFloat(item.start_length)
          );
          this.$set(
            this.formEditData,
            "start_flag",
            parseFloat(item.start_flag)
          );
          this.$set(
            this.formEditData,
            "start_length",
            parseFloat(item.start_length)
          );
        }
      });
    },
    changeEndStation(value) {
      this.stationList.map(item => {
        if (item.id == value) {
          this.$set(this.formData, "end_flag", parseFloat(item.start_flag));
          this.$set(this.formData, "end_length", parseFloat(item.start_length));
          this.$set(this.formEditData, "end_flag", parseFloat(item.start_flag));
          this.$set(
            this.formEditData,
            "end_length",
            parseFloat(item.start_length)
          );
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
    getDepartList() {
      this.request({
        url: "/dayplan/getWorkTeamLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.departLists = data.data;
          console.log("this.departLists：" + this.departLists);
        }
      });
    },
    geItemList() {
      this.request({
        url: "/set/getItemLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.itemLists = data.data.data;
        }
      });
    },
    getWorkSortList() {
      this.request({
        url: "/set/getWorkSortLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.workSortLists = data.data.data;
        }
      });
    },
    planAdd() {
      this.diaLogTitle = "计划图";
      this.diaLogFormVisible = true;

      this.getMasterList(); //车长
      this.getdriverList(); //司机
      this.getStationList(); //车站
      this.getWorkTypeList(); //作业类型
      this.getDepartList(); //施工队
      this.geItemList(); //项目
      this.getWorkSortList(); //工序
    },
    addDayPlanDialog() {
      this.$refs["formRules"].validate(valid => {
        if (valid) {
          let data = this.formData;
          if (+this.formData.end_time < +this.formData.start_time) {
            this.$message.error("施工开始时间不能大于结束时间");
            return false;
          }
          this.request({
            url: "/dayplan/addDayPlan",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.diaLogFormVisible = false;
              this.formData.number = "";
              this.formData.start_time = "";
              this.formData.end_time = "";

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
          if (this.numberId == 0) {
            this.numberId = this.planNumbersList[0]["id"];
          }
          this.getPlanDetail(this.numberId);
        }
      });
    },
    selectPlanNumbers(value) {
      this.getPlanDetail(value);
      this.numberId = value;
    },
    getPlanDetail(id) {
      this.request({
        url: "/dayplan/getDayPlanDetail",
        method: "get",
        params: { id: id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.formEditData = data.data;
          this.getMasterList(); //车长
          this.getdriverList(); //司机
          this.getStationList(); //车站
          this.getWorkTypeList(); //作业类型
          this.getDepartList(); //施工队
          this.geItemList(); //项目
          this.getWorkSortList(); //工序

          this.formEditData.date = this.formData.date;
          if (data.data.out_reco == "0") {
            this.formEditData.out_reco = "";
          }

          if (data.data.out_supple == "0") {
            this.formEditData.out_supple = "";
          }

          if (data.data.back_reco == "0") {
            this.formEditData.back_reco = "";
          }

          if (data.data.back_supple == "0") {
            this.formEditData.back_supple = "";
          }

          this.formEditData.start_flag = parseFloat(data.data.start_flag);
          this.formEditData.start_length = parseFloat(data.data.start_length);
          this.formEditData.end_flag = parseFloat(data.data.end_flag);
          this.formEditData.end_length = parseFloat(data.data.end_length);
          this.formEditData.line_type = data.data.line_type.toString();

          if (data.data.work_plan_id == "0") {
            this.formEditData.work_plan_id = "";
          }
          this.formEditData.item_id = data.data.item_id;
          this.formEditData.work_id = data.data.work_id;
          if (data.data.item_id == "0") {
            this.formEditData.item_id = "";
          }
          if (data.data.work_id == "0") {
            this.formEditData.work_id = "";
          }
          (this.formEditData.record_id =
            data.data.record_id == null
              ? this.formEditData.record_id
              : data.data.record_id),
            (this.formEditData.true_start_time =
              data.data.true_start_time == ""
                ? data.data.start_time
                : data.data.true_start_time),
            (this.formEditData.true_end_time =
              data.data.true_end_time == ""
                ? data.data.end_time
                : data.data.true_end_time),
            (this.formEditData.true_start_flag =
              data.data.true_start_flag == null
                ? parseFloat(data.data.start_flag)
                : parseFloat(data.data.true_start_flag)),
            (this.formEditData.true_start_length =
              data.data.true_start_length == null
                ? parseFloat(data.data.start_length)
                : parseFloat(data.data.true_start_length)),
            (this.formEditData.true_end_flag =
              data.data.true_end_flag == null
                ? parseFloat(data.data.end_flag)
                : parseFloat(data.data.true_end_flag)),
            (this.formEditData.true_end_length =
              data.data.true_end_length == null
                ? parseFloat(data.data.end_length)
                : parseFloat(data.data.true_end_length)),
            console.log(this.formEditData);
        }
      });
    },
    planEdit() {
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
          if (data.data.length > 0) {
            this.diaLogTitleEdit = "日班实际图";
            this.diaLogFormEditVisible = true;

            this.planNumbersList = data.data;
            if (this.numberId == 0) {
              this.numberId = this.planNumbersList[0]["id"];
            }
            this.getPlanDetail(this.numberId);
            // this.getPlanNumbers(); //日班计划列表
            this.getUserLists(); //记录人
          } else {
            this.$alert("<strong>当天没有计划！</strong>", "提示信息", {
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
    updateDayTrueplan() {
      this.$refs["refFormEditRules"].validate(valid => {
        if (valid) {
          let data = this.formEditData;
          let dataa = data.end_time;
          // if (new Date(data.end_time) < new Date(data.start_time)) {
          //   this.$message.error("施工开始时间不能大于结束时间");
          //   return false;
          // }
          // if (new Date(data.true_end_time) < new Date(data.true_start_time)) {
          //   this.$message.error("实际施工开始时间不能大于结束时间");
          //   return false;
          // }
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
    },
    //多选操作
    selectDatePicker(value) {
      this.todayValue = value;
      //this.$set(this.todayValue, value);
      this.getChart();
    },
    refreshPage() {
      this.todayValue = new Date();
      this.getChart();
      // this.getPageLoad();
      // this.select_type_plan = true;
      // this.select_type_now = true;
    },
    selectLineTypeChart(value) {
      this.getChart();
    },
    selectTypePlanChart(value) {
      //alert(this.select_line_type);
      this.select_type_plan = value;
      this.getChart();
    },
    selectTypeNowChart(value) {
      this.select_type_now = value;
      this.getChart();
    },
    selectLocoTypeChart(value) {
      //alert(this.select_line_type);
      this.getChart();
    }
    //
  }
};
</script>
<style>
.maintitle {
  text-align: center;
  font-size: 20px;
  color: #4b6eca;
  padding-top: 20px;
}
.app-page-adds {
  overflow: hidden;
  text-align: center;
  width: 100%;
}
.app-page-adds .btnitem {
  margin-right: 15px;
  display: inline-block;
}
.app-page-adds .sideright {
  float: right;
}
.app-page-adds .el-input__inner {
  border-color: #b3d8ff;
  border-radius: 4px;
  color: #409eff;
}

.chartmain {
  width: 100%;
  overflow-x: scroll;
}
/*sidebox */
.sidebox {
  width: 100% !important;
  background: #fff;
  text-align: center;
  padding: 10px 0;
}
.sidebox .el-checkbox__label {
  font-size: 15px;
}
.sidebox h3 {
  font-size: 14px;
  display: inline-block;
}
.sidebox .chklist {
  display: inline-block;
  margin-top: 15px;
  margin-right: 30px;
}
.chlone .el-checkbox:nth-child(1) .el-checkbox__label {
  color: #0099cc;
}
.chlone .el-checkbox:nth-child(1) .is-checked .el-checkbox__inner {
  background-color: #0099cc;
  border-color: #0099cc;
}
.chlone .el-checkbox:nth-child(2) .el-checkbox__label {
  color: #0000ff;
}
.chlone .el-checkbox:nth-child(2) .is-checked .el-checkbox__inner {
  background-color: #0000ff;
  border-color: #0000ff;
}
.chlone .el-checkbox:nth-child(3) .el-checkbox__label {
  color: #9900ff;
}
.chlone .el-checkbox:nth-child(3) .is-checked .el-checkbox__inner {
  background-color: #9900ff;
  border-color: #9900ff;
}
.chlone .el-checkbox:nth-child(4) .el-checkbox__label {
  color: #660033;
}
.chlone .el-checkbox:nth-child(4) .is-checked .el-checkbox__inner {
  background-color: #660033;
  border-color: #660033;
}

.chltwo .el-checkbox .el-checkbox__label {
  color: #f6b26b;
}
.chltwo .el-checkbox__inner {
  border-color: #f6b26b;
}
.chltwo .is-checked .el-checkbox__inner {
  background-color: #f6b26b;
  border-color: #f6b26b;
}
.chkshiji .el-checkbox__label {
  color: #2dca2d !important;
}
.chkshiji .el-checkbox__inner {
  border-color: #2dca2d;
}
.chkshiji .is-checked .el-checkbox__inner {
  background-color: #2dca2d;
  border-color: #2dca2d;
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
  width: 780px;
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
.istextarea {
  margin-right: 0 !important;
}
.istextarea .el-textarea__inner {
  width: 825px;
}
.lengtherror .el-form-item__error {
  padding-left: 20px;
}
</style>
