<template>
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
              <el-select v-model="formEditData.out_reco" placeholder="请选择">
                <el-option
                  v-for="item in locoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="补机：">
              <el-select v-model="formEditData.out_supple" placeholder="请选择">
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
              <el-select v-model="formEditData.back_reco" placeholder="请选择">
                <el-option
                  v-for="item in locoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="补机：">
              <el-select v-model="formEditData.back_supple" placeholder="请选择">
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
              <el-select v-model="formEditData.work_plan_id" placeholder="请选择"></el-select>
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
              <el-select v-model="formEditData.item_id" placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="工序：">
              <el-select v-model="formEditData.work_id" placeholder="请选择"></el-select>
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
</template>