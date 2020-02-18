<template>
  <div id="dispatch-print" class="app-page-layer">
    <div class="app-dialog-form">
      <el-form  id="printMe"  :inline="true" >
        <el-form-item label="命令号：">
          <el-input v-model="dataInfo.number" readonly></el-input>
        </el-form-item>
        <el-form-item label="调度：">
          <el-input v-model="dataInfo.dispatch" readonly></el-input>
        </el-form-item>
        <el-form-item label="车站：">
          <el-input v-model="dataInfo.station" readonly></el-input>
        </el-form-item>
        <el-form-item label="机车：">
          <el-input v-model="dataInfo.loco" readonly></el-input>
        </el-form-item>
        <el-form-item label="机长">
          <el-input v-model="dataInfo.master" readonly></el-input>
        </el-form-item>
        <el-form-item label="司机：">
          <el-input v-model="dataInfo.driver" readonly></el-input>
        </el-form-item>
        <el-form-item label="值班员：">
          <el-input v-model="dataInfo.station_worker" readonly></el-input>
        </el-form-item>
        <el-form-item label="受令处所：">
          <el-input v-model="dataInfo.location" readonly></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item class="contents" label="命令内容：">
          <div class="conn">{{dataInfo.description}}</div>
        </el-form-item>
      </el-form>
      <p class="info">注：本调度命令一式四份</p>
      <div slot="footer" class="app-dialog-footer">
        <el-button class="bluebtn" @click="isCancel">返回列表</el-button>
        <el-button class="redbtn" v-print="'#printMe'">打印信息</el-button>
      </div>
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
#dispatch-print .app-dialog-form {
  padding: 30px 0px 30px 30px;
  display: block;
  margin-top: 1px;
}
#dispatch-print .app-dialog-form .el-form-item {
  margin-bottom: 15px;
}
#dispatch-print .app-dialog-form .el-form-item__label {
  width: 90px;
  color: #1d397a;
}
#dispatch-print .app-dialog-form .el-input input {
  width: 200px;
}

#dispatch-print .app-dialog-form .contents {
  display: block;
  width: 100%;
}
#dispatch-print .app-dialog-form .contents .el-textarea {
  width: 100%;
}
#dispatch-print .app-dialog-form .contents .el-form-item__content {
  width: 723px;
}
#dispatch-print .conn {
  border: 1px #9db9fa solid;
  color: #4b6eca;
  padding: 10px;
  border-radius: 3px;
}
#dispatch-print .info {
  color: #4b6eca;
}
#dispatch-print .app-dialog-footer {
  text-align: center;
  margin-top: 30px;
}
#dispatch-print .app-dialog-footer .el-button {
  margin-right: 10px;
  padding: 12px 80px;
  font-size: 16px;color: #fff;
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
