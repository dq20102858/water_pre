<template>
  <div id="app-apply">
    <div class="app-page">
      <!-- temp1 -->
      <div v-if="dataInfo.type=='A1' || dataInfo.type=='A2'" class="app-apply-tempone">
        <div class="vtable">
          <table>
            <tbody>
              <tr>
                <td class="auto-style" rowspan="2">
                  <b>作业编号：</b>
                </td>
                <td class="auto-style2 clblue" rowspan="2">{{ dataInfo.number}}</td>
                <td class="clblue" rowspan="2">施工单位:{{dataInfo.company}}</td>
                <td>
                  是否需要动车：
                  <b v-if="dataInfo.is_need_car==0">否</b>
                  <b v-if="dataInfo.is_need_car==1">是</b>
                </td>
                <td>
                  是否需要动火：
                  <b v-if="dataInfo.is_need_fire==0">否</b>
                  <b v-if="dataInfo.is_need_fire==1">是</b>
                </td>
              </tr>
              <tr>
                <td>
                  是否需要帮助：
                  <b v-if="dataInfo.is_need_help==0">否</b>
                  <b v-if="dataInfo.is_need_help==1">是</b>
                </td>
                <td>
                  是否需要断电：
                  <b v-if="dataInfo.is_need_break_ele==0">否</b>
                  <b v-if="dataInfo.is_need_break_ele==1">是</b>
                </td>
              </tr>
              <tr>
                <td class="auto-style">
                  <b>作业令号：</b>
                </td>
                <td class="clblue">{{dataInfo.command_num}}</td>
                <td colspan="2">
                  <!--  -->
                  <div>
                    联系人：
                    <span
                      style="width:40%;display:inline-block"
                      class="clblue"
                    >{{dataInfo.contact}}</span>
                    联系电话：
                    <span class="clblue">{{dataInfo.phone}}</span>
                  </div>
                  <div v-for="item in dataInfo.holder" :key="item.id">
                    持证人：
                    <span style="width:40%;display:inline-block" class="clblue">{{item.name}}</span>
                    联系电话：
                    <span class="clblue">{{item.phone}}</span>
                  </div>
                  <div>
                    负责人：
                    <span
                      style="width:40%;display:inline-block;overflow: hidden;white-space: nowrap; vertical-align: middle;"
                      class="clblue"
                    >{{dataInfo.p_in_charge}}</span>
                    联系电话：
                    <span class="clblue">{{dataInfo.p_in_charge_phone}}</span>
                  </div>
                </td>
                <td>
                  人数：
                  <span class="clblue">{{dataInfo.worker_num}}人</span>
                </td>
              </tr>
              <tr>
                <td class="auto-style">
                  <b>工作地点 （上/下行线）：</b>
                </td>
                <td colspan="4" style="padding:0;">
                  <table class="innertable">
                    <tr>
                      <th>由</th>
                      <th>至</th>
                      <th style="width:120px;">线别</th>
                      <th>列车编组</th>
                      <th>工作时间</th>
                    </tr>
                    <tr v-for="areas in dataInfo.area_or_car" :key="areas.id">
                      <td>{{areas.start_station_name}} DK{{areas.start_flag}} + {{areas.start_length}}</td>
                      <td>{{areas.end_station_name}} DK{{areas.end_flag}} + {{areas.end_length}}</td>
                      <td>{{areas.line_type_name}}</td>
                      <td>
                        <span
                          style="margin-right:10px;"
                          v-for="item in areas.car_use"
                          :key="item.id"
                        >{{item.car_type}}</span>
                      </td>
                      <td>{{areas.start_time}} ~ {{areas.end_time}}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="auto-style">
                  <b>计划运行路径：</b>
                </td>
                <td colspan="4">
                  <div class="textoverflow clblue">{{dataInfo.plan_route}}</div>
                </td>
              </tr>
              <tr>
                <td class="auto-style">
                  <b>工作内容：</b>
                </td>
                <td colspan="4">
                  <div class="textoverflow clblue">{{dataInfo.description}}</div>
                </td>
              </tr>
              <tr>
                <td class="auto-style">
                  <b>车辆：</b>
                </td>
                <td colspan="4" style="padding:0;">
                  <table class="innertable">
                    <tr>
                      <th>车辆类型</th>
                      <th>车号</th>
                      <th>装载重量</th>
                    </tr>
                    <tbody v-for="areas in dataInfo.area_or_car" :key="areas.id">
                      <tr v-for="item in areas.car_use" :key="item.id">
                        <td>{{item.car_type}}</td>
                        <td>{{item.car_number}}</td>
                        <td>{{item.car_weight}}</td>
                      </tr>
                    </tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="auto-style">
                  <b>保护措施：</b>
                </td>
                <td colspan="4">
                  <div class="textoverflow clblue">{{funIsEmpty(dataInfo.attention)}}</div>
                </td>
              </tr>
              <tr>
                <td class="auto-style">
                  <b>其他信息</b>
                </td>
                <td colspan="2">
                  <div class="textoverflow clblue">{{funIsEmpty(dataInfo.other)}}</div>
                </td>
                <td colspan="2">监理确认并签字：{{dataInfo.supervisor}}</td>
              </tr>

              <tr>
                <td colspan="2" rowspan="2">
                  <b>承运人签名（章）：</b>
                  {{dataInfo.carrier}}
                </td>
                <td style="width:200px;">审批人：{{dataInfo.approver}}</td>
                <td style="width:200px;">销点人:{{dataInfo.logout}}</td>
                <td style="width:200px;">注销人：{{dataInfo.logoff}}</td>
              </tr>
              <tr>
                <td>审批时间：{{dataInfo.approve_time}}</td>
                <td>销点时间：{{dataInfo.logout_time}}</td>
                <td>注销时间：{{dataInfo.logoff_time}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else class="app-apply-detail">
        <el-form :inline="true" style="margin-left:95px;">
          <el-form-item label="作业编号">
            <span class="input">{{ dataInfo.number}}</span>
          </el-form-item>
          <el-form-item label="作业令号">
            <span class="input">{{ dataInfo.command_num}}</span>
          </el-form-item>
        </el-form>
        <el-timeline>
          <el-timeline-item
            timestamp="申请"
            placement="top"
            type="warning "
            color="#ff5c75"
            size="large"
          >
            <div class="onebox">
              <div class="item">
                <label class="labels">兹申请允许持证人（主站）</label>
                <span class="input">{{ dataInfo.main_apply_user}}</span>
                <label class="labels">辅站及负责人</label>
                <span class="input">{{ dataInfo.sub_apply_user}}</span>
              </div>
              <div class="item">
                <label class="labels">单位：</label>
                <span class="input" style="width:550px;">{{ dataInfo.company}}</span>
              </div>
              <div class="item">
                <label class="labels">联系电话：</label>
                <span class="input" style="width:250px;">{{ dataInfo.phone}}</span>
                <label class="labels">带领 ( {{dataInfo.worker_num}} ) 人进行以下工作：</label>
              </div>
              <div class="item">
                <label class="labels">A区域/车辆：</label>
                <div class="conn">
                  <div v-for="areas in dataInfo.area_or_car" :key="areas.id">
                    <p>
                      <em>{{areas.start_station_name}} - {{areas.end_station_name}} 区间 {{areas.line_type_name}} ( DK{{areas.start_flag}} + {{areas.start_length}} - DK{{areas.end_flag}} + {{areas.end_length}} )</em>
                    </p>
                    <p>
                      <i>开始时间：{{areas.start_time}}</i>
                      <i>结束时间：{{areas.end_time}}</i>
                    </p>
                  </div>
                  <!-- <div>
                  <em>长江南路站 - 长江南路站 区间 左线 ( DK38 + 940 - DK38 + 940 )</em>
                  <i>开始时间：2019-12-29 07:00:00 结束时间：2019-12-29 20:00:00</i>
                  </div>-->
                </div>
              </div>
              <div class="item">
                <label class="labels">B工作内容：</label>
                <div class="conn">
                  <em>{{funIsEmpty(dataInfo.description)}}</em>
                </div>
              </div>
              <div class="item">
                <label class="labels">C安全措施及注意事项：</label>
                <div class="conn">
                  <em>{{funIsEmpty(dataInfo.attention)}}</em>
                </div>
              </div>
              <div class="item">
                <ul class="scheck">
                  <li>
                    是否需要动车：
                    <b v-if="dataInfo.is_need_car==0">否</b>
                    <b v-if="dataInfo.is_need_car==1">是</b>
                  </li>
                  <li>
                    是否需要动火：
                    <b v-if="dataInfo.is_need_fire==0">否</b>
                    <b v-if="dataInfo.is_need_fire==1">是</b>
                  </li>
                  <li>
                    是否需要帮助：
                    <b v-if="dataInfo.is_need_help==0">否</b>
                    <b v-if="dataInfo.is_need_help==1">是</b>
                  </li>
                  <li>
                    是否需要断电：
                    <b v-if="dataInfo.is_need_break_ele==0">否</b>
                    <b v-if="dataInfo.is_need_break_ele==1">是</b>
                  </li>
                </ul>
              </div>
              <div
                class="itemconn"
                style="margin-bottom:30px;"
              >本单位及本人谨此声明：愿意在规定时间内完成上述工作，并确保本人属下员工遵守上述安全措施，同时本人或本人属 下员工不会试图损坏其它单位的设备，在其它区域或车辆上工作。</div>
              <div class="singn">
                <span class="pull-left">
                  工点负责人（签名）
                  <b>{{dataInfo.p_in_charge}}</b>
                </span>
                <span class="pull-right">{{dataInfo.create_time}}</span>
              </div>
            </div>
          </el-timeline-item>
          <el-timeline-item
            timestamp="审批"
            placement="top"
            type="warning "
            color="#ff5c75"
            size="large"
          >
            <div class="onebox">
              <div class="itemconn">兹审批此许可证生效，或按红笔修改的执行。</div>
              <div class="singn lines">
                <span class="pull-left">
                  审批负责人（签名）
                  <b>{{dataInfo.approver}}</b>
                </span>
                <span class="pull-right">{{dataInfo.approve_time}}</span>
              </div>
            </div>
          </el-timeline-item>
          <el-timeline-item
            timestamp="销点"
            placement="top"
            type="warning "
            color="#ff5c75"
            size="large"
          >
            <div class="onebox">
              <div
                class="itemconn"
              >本人谨此声明：⑴ 此进场作业许可证所述工作现已完成，本人及属下员工已经撤离，安全措施已经撤除，并已被告知在轨道区域/车辆上工作已不再安全。⑵ 完成情况及所有故障/损坏已经书面呈报。</div>
              <div class="singn lines">
                <span class="pull-left">
                  销点负责人（签名）
                  <b>{{dataInfo.logout}}</b>
                </span>
                <span class="pull-right">{{dataInfo.logout_time}}</span>
              </div>
            </div>
          </el-timeline-item>
          <el-timeline-item
            timestamp="注销"
            placement="top"
            type="warning "
            color="#ff5c75"
            size="large"
          >
            <div class="onebox">
              <div class="itemconn">此许可证已经原批准人或联合办公室经理同意注销。</div>
              <div class="singn lines">
                <span class="pull-left">
                  注销负责人（签名）
                  <b>{{dataInfo.logoff}}</b>
                </span>
                <span class="pull-right">{{dataInfo.logoff_time}}</span>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      dataInfo: [],
      carUse: []
    };
  },
  props: {
    iframeData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    layerid: {
      type: String,
      default: ""
    }
  },
  mounted() {
    document
      .querySelector("#app-menu-items #menu_apply")
      .classList.add("is-active");
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$layer.title = "dsfds";
      this.request({
        url: "/apply/getApplyDetail",
        method: "get",
        params: { id: this.iframeData.id }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataInfo = data.data;
          // let car=data.data.area_or_car;
          this.carUse = data.data.area_or_car[0].car_use;
          // console.log(JSON.stringify(this.carUse));
        }
      });
    },
    isCancel() {
      this.$layer.close(this.layerid);
    },
    funIsEmpty(item) {
      if (item == "") {
        return "暂无";
      } else {
        return item;
      }
    }
  }
};
</script>
<style>
.vl-notify-content {
  height: 91.5% !important;
}
.app-apply-detail {
  width: 100%;
}
.app-apply-detail .app-page {
  overflow: hidden;
  padding-bottom: 200px;
}
.app-apply-detail .el-form-item {
  margin-bottom: 25px;
}
.app-apply-detail .el-form-item__label {
  color: #1d397a;
}
.app-apply-detail .el-form-item .input {
  width: 280px;
  text-align: left;
}
.app-apply-detail .input {
  height: 36px;
  border: 1px #9db9fa solid;
  color: #4b6eca;
  border-radius: 4px;
  line-height: 36px;
  display: inline-block;
  padding: 0 12px;
}
.app-apply-detail .onebox {
  padding: 0 50px;
  margin-bottom: 60px;
  font-size: 15px;
}
.app-apply-detail .el-timeline-item__timestamp {
  color: #1d397a;
  font-size: 16px;
  font-weight: 700;
}
.app-apply-detail .item {
  margin-bottom: 20px;
  overflow: hidden;
}
.app-apply-detail .item .labels {
  color: #1d397a;
  margin: 0 15px 0 15px;
  min-width: 75px;
  display: inline-block;
}
.app-apply-detail .item em {
  display: block;
  color: #4b6eca;
  font-style: normal;
}
.app-apply-detail .item i {
  display: inline-block;
  color: #1d397a;
  font-size: 13px;
  margin-right: 10px;
  font-style: normal;
}
.app-apply-detail .conn {
  display: block;
  padding-left: 110px;
  line-height: 24px;
  word-wrap: break-word;
  word-break: break-all;
}
.app-apply-detail .scheck {
  margin-left: 15px;
}
.app-apply-detail .scheck li {
  display: inline-block;
  color: #1d397a;
  margin-right: 40px;
}
.app-apply-detail .scheck b {
  font-size: 16px;
}
.app-apply-detail .itemconn {
  color: #1d397a;
  margin-left: 15px;
  line-height: 24px;
}
.app-apply-detail .singn {
  color: #1d397a;
  margin: 20px 0 20px 15px;
  line-height: 24px;
}
.app-apply-detail .lines {
  border-top: 1px #ededed solid;
  margin-top: 35px;
  padding-top: 10px;
}

#app-apply {
  width: 100%;
}
.app-page {
  width: 100%;
}
.vtable {
  width: 100%;
}
.vtable table {
  border-collapse: collapse;
  width: 100%;
}
.vtable table td {
  border: 1px solid #9db9fa;
  line-height: 30px;
  padding: 10px;
}

.vtable .auto-style {
  width: 190px;
  word-wrap: break-word;
  word-break: break-all;
  white-space: nowrap;
}
.vtable .auto-style2 {
  width: 19.2%;
}
.clblue {
  color: #4b6eca;
}
.clcenter {
  text-align: center;
}
.textoverflow {
  word-wrap: break-word;
  word-break: break-all;
}
.innertable {
  width: 100%;
}
.innertable {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: -1px;
  margin-left: -1px;
}
.innertable th {
  color: #111;
  border-left: 1px #9db9fa solid;
  border-bottom: 1px #9db9fa solid;
}
.innertable td {
  border-top: 0 !important;
  border-right: 0 !important;
  padding: 0 10px !important;
  height: 40px;
  text-align: center;
  color: #444;
}
</style>
