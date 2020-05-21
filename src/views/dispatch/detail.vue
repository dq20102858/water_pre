<template>
  <div id="dispatch-detail" class="app-page-layer"  style="width:100%">
    <div class="app-dialog-form">
      <table style="width:100%">
        <tbody>
          <tr>
            <td>
              <b class="tname">命令号</b>
            </td>
            <td>
              <p>{{dataInfo.number}}</p>
            </td>
            <td>
              <b class="tname">值班调度</b>
            </td>
            <td>
              <p>{{dataInfo.dispatch}}</p>
            </td>
          </tr>

          <tr>
            <td>
              <b class="tname">命令状态</b>
            </td>
            <td>
              <p class="redbtn" v-if="dataInfo.status=='1'">新命令</p>
              <p class="redbtn" v-if="dataInfo.status=='2'">已确认</p>
              <p class="redbtn" v-if="dataInfo.status=='3'">已作废</p>
            </td>
            <td>
              <b class="tname">受令机车</b>
            </td>
            <td>
              <p>{{dataInfo.loco}}</p>
            </td>
          </tr>
          <tr>
            <td>
              <b class="tname">受令司机</b>
            </td>
            <td>
              <p>{{dataInfo.driver}}</p>
            </td>
            <td>
              <b class="tname">受令车长</b>
            </td>
            <td>
              <p>{{dataInfo.master}}</p>
            </td>
          </tr>
          <tr>
            <td>
              <b class="tname">发令时间</b>
            </td>
            <td>
              <p>{{dataInfo.create_time}}</p>
            </td>
            <td>
              <b class="tname">受令车站</b>
            </td>
            <td>
              <p>{{dataInfo.station==''?'无' : dataInfo.station}}</p>
            </td>
          </tr>
          <tr>
            <td>
              <b class="tname">车站值班员</b>
            </td>
            <td>
              <p>{{dataInfo.station_worker==''?'无' : dataInfo.station_worker}}</p>
            </td>
            <td>
              <b class="tname">确认时间</b>
            </td>
            <td>
              <p v-if="dataInfo.makesure_time==''">暂未确认</p>
              <p v-else>{{dataInfo.makesure_time}}</p>
            </td>
          </tr>

          <tr>
            <td>
              <b class="tname">受令处所</b>
            </td>
            <td colspan="3">
              <p>{{dataInfo.location}}</p>
            </td>
          </tr>

          <tr>
            <td>
              <b class="tname">内容</b>
            </td>
            <td colspan="3">
              <p>{{dataInfo.description}}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div slot="footer" class="app-dialog-footer">
      <el-button @click="isCancel">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iframepar: {},
      id: 1,
      dataInfo: [],
      iData: { id: 3 }
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
        url: "/dispatch/getDispatchDetail?id=" + this.iframeData.id,
        method: "get"
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
#dispatch-detail {
  padding: 25px;
}
#dispatch-detail table {
  border-collapse: collapse;
  width: 100%;
}
#dispatch-detail table td {
  border: 1px solid #9db9fa;
  line-height: 30px;
  padding: 10px;
}
#dispatch-detail .pdate {
  text-align: center;
}
#dispatch-detail p {
  line-height: 28px;
  font-size: 14px;
  color: #4b6eca;
}
#dispatch-detail .tname {
  white-space: nowrap;
  color: #1d397a;
}
#dispatch-detail .redbtn {
  color: #ff5c75;
}
#dispatch-detail .app-dialog-footer {
  text-align: right;
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
