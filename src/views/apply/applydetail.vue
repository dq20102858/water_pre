<template>
  <div class="app-apply-detail">
    <div class="app-page">
      <el-form :inline="true" style="margin:0 auto; text-align: center">
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
              <label class="labels">单位</label>
              <span class="input" style="width:500px;">{{ dataInfo.company}}</span>
            </div>
            <div class="item">
              <label class="labels">联系电话</label>
              <span class="input" style="width:500px;">{{ dataInfo.phone}}</span>
            </div>
            <div class="item">
              <label class="labels">A区域/车辆：</label>
              <div class="conn">
                <em>长江南路站 - 长江南路站 区间 左线 ( DK38 + 940 - DK38 + 940 )</em>
                <i>开始时间：2019-12-29 07:00:00 结束时间：2019-12-29 20:00:00</i>
                <em>长江南路站 - 长江南路站 区间 右线 ( DK38 + 940 - DK38 + 940 )</em>
                <i>开始时间：2019-12-29 07:00:00 结束时间：2019-12-29 20:00:00</i>
              </div>
            </div>
            <div class="item">
              <label class="labels">B工作内容：</label>
              <div class="conn">
                <em>人防门调试。油漆，工具包，电焊机，脚手架。人防门调试。油漆，工具包，电焊机，脚手架。人防门调试。油漆，工具包，电焊机，脚手架。人防门调试。油漆，工具包，电焊机，脚手架。</em>
              </div>
            </div>
            <div class="item">
              <label class="labels">C安全措施及注意事项：</label>
              <div class="conn">
                <em>{{dataInfo.attention}}</em>
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
              class="itemconn" style="margin-bottom:30px;"
            >本单位及本人谨此声明：愿意在规定时间内完成上述工作，并确保本人属下员工遵守上述安全措施，同时本人或本人属 下员工不会试图损坏其它单位的设备，在其它区域或车辆上工作。</div>
            <div class="singn">
              <span class="pull-left">工点负责人（签名）</span>
              <span class="pull-right">2019年12月11日 17时47分</span>
            </div>
          </div>
        </el-timeline-item>
        <el-timeline-item
          timestamp="批准"
          placement="top"
          type="warning "
          color="#ff5c75"
          size="large"
        >
          <div class="onebox">
            <div class="itemconn">兹批准此许可证生效，或按红笔修改的执行。</div>
            <div class="singn lines">
              <span class="pull-left">批准人（签名）</span>
              <span class="pull-right">2019年12月11日 17时47分</span>
            </div>
          </div>
        </el-timeline-item>
        <el-timeline-item
          timestamp="消点"
          placement="top"
          type="warning "
          color="#ff5c75"
          size="large"
        >
          <div class="onebox">
            <div
              class="itemconn"
            >本人谨此声明：⑴ 此进场作业许可证所述工作现已完成，本人及属下员工已经撤离，安全措施已经撤除，并已被告之在轨道区域/车辆上工作已不再安全。⑵ 完成情况及所有故障/损坏已经书面呈报。</div>
            <div class="singn lines">
              <span class="pull-left">工点负责人（签名）</span>
              <span class="pull-right">2019年12月11日 17时47分</span>
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
              <span class="pull-left">批准人（签名） <b>{{dataInfo.logout}}</b></span>
              <span class="pull-right">{{dataInfo.logout_time}}</span>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataInfo: []
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
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.request({
        url: "/apply/getApplyDetail",
        method: "get",
        params: { id: this.iframeData.id }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataInfo = data.data;
          //console.log(JSON.stringify(this.dataInfo));
        }
      });
    },
    isCancel() {
      this.$layer.close(this.layerid);
    }
  }
};
</script>
<style>
.app-apply-detail {
  width: 100%;
}
.app-apply-detail .app-page {
  overflow: hidden;
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
.item {
  margin-bottom: 20px;
  overflow: hidden;
}
.item .labels {
  color: #1d397a;
  margin: 0 15px 0 15px;
}
.item em {
  display: inline-block;
  color: #4b6eca;
  font-style: normal;
}
.item i {
  display: block;
  color: #1d397a;
  font-size: 12px;
  font-style: normal;
}
.conn {
  display: block;
  padding-left: 100px;
  line-height: 24px;
}
.scheck {
  margin-left: 15px;
}
.scheck li {
  display: inline-block;
  color: #1d397a;
  margin-right: 40px;
}
.scheck b {
  font-size: 16px;
}
.itemconn {
  color: #1d397a;
  margin-left: 15px;
  line-height: 24px;
}
.singn {
  color: #1d397a;
  margin: 20px 0 20px 15px;
  line-height: 24px;
}
.lines {
  border-top: 1px #ededed solid;
  margin-top: 35px;
  padding-top: 10px;
}
</style>
