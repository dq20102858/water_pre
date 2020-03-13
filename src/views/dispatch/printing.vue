<template>
  <div id="dispatch-print" class="app-page-layer">
    <div id="printMe">
      <h3 class="ptitle">调度命令 （行车调度）</h3>
      <p class="pdate">发令时间 ： {{dataInfo.create_time}}</p>
      <table>
        <tbody>
          <tr>
            <td>
              <b class="tname">命令号</b>
            </td>
            <td>
              <p>{{dataInfo.number}}</p>
            </td>
            <td>
              <b class="tname">调度</b>
            </td>
            <td>
              <p>{{dataInfo.dispatch}}</p>
            </td>
            <td>
              <b class="tname">车站</b>
            </td>
            <td>
              <p>{{dataInfo.station==""?"暂无":dataInfo.station}}</p>
            </td>
          </tr>
          <tr>
            <td>
              <b class="tname">机车</b>
            </td>
            <td>
              <p>{{dataInfo.loco}}</p>
            </td>
            <td>
              <b class="tname">车长</b>
            </td>
            <td>
              <p>{{dataInfo.master}}</p>
            </td>
            <td>
              <b class="tname">司机</b>
            </td>
            <td>
              <p>{{dataInfo.driver==""?"暂无":dataInfo.driver}}</p>
            </td>
          </tr>
          <tr>
            <td>
              <b class="tname">值班员</b>
            </td>
            <td>
              <p>{{dataInfo.station_worker==""?"暂无":dataInfo.station_worker}}</p>
            </td>
            <td>
              <b class="tname">受令处所</b>
            </td>
            <td colspan="3">
              <p>{{dataInfo.location==""?"暂无":dataInfo.location}}</p>
            </td>
          </tr>
          <tr>
            <td>
              <b class="tname">内容</b>
            </td>
            <td colspan="5">
              <p>{{dataInfo.description}}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <p style="padding-top:10px;">注：本调度命令一式四份，调度留存一份，联络员，施工负责人各一份。</p>
    </div>
    <div slot="footer" class="app-dialog-footer">
      <el-button class="bluebtn" @click="isCancel">返回列表</el-button>
      <el-button class="redbtn" v-print="'#printMe'">打印信息</el-button>
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
@media print {
  #printMe table {
    border-collapse: collapse;
    width: 100%;
  }
  #printMe table td {
    border: 1px solid #9db9fa;
    line-height: 30px;
    padding: 10px;
  }
  undefined{display: none;}
}
#dispatch-print {
  width: 100%;
}
#printMe {
  padding: 30px;
}
#printMe table {
  border-collapse: collapse;
  width: 100%;
}
#printMe table td {
  border: 1px solid #9db9fa;
  line-height: 30px;
  padding: 10px;
}
#printMe p {
  line-height: 33px;
}
#printMe .ptitle {
  font-size: 18px;
  text-align: center;
  color: #1d397a;
}
#printMe .pdate {
  text-align: center;
}
#printMe p {
  line-height: 33px;
  color: #4b6eca;
}
#printMe .tname {
  white-space: nowrap;
  color: #1d397a;
}
#dispatch-print .app-dialog-form {
  padding: 30px 0px 30px 30px;
  display: block;
  margin-top: 1px;
}

#dispatch-print .app-dialog-footer {
  text-align: center;
  margin-top: 30px;
}
#dispatch-print .app-dialog-footer .el-button {
  margin-right: 10px;
  padding: 12px 80px;
  font-size: 16px;
  color: #fff;
}
#dispatch-print .app-dialog-footer .bluebtn {
  background: #4b6eca;
  border-color: #4b6eca;
  margin-left: 10px;
}
#dispatch-print .app-dialog-footer .redbtn {
  background: #ff5c75;
  border-color: #ff5c75;
}
</style>
