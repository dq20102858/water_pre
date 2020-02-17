<template>
  <div class="app-page-layer">
    <div class="app-dialog-form">
      <el-form :inline="true">
        <el-form-item label="命令号码：">
          <el-input v-model="dataInfo.number" readonly></el-input>
        </el-form-item>
        <el-form-item label="值班调度：">
          <el-input v-model="dataInfo.dispatch" readonly></el-input>
        </el-form-item>
        <el-form-item label="命令状态">
          <p v-if="dataInfo.status=='1'">
            <el-input readonly value="新命令"></el-input>
          </p>
          <p v-if="dataInfo.status=='2'">
            <el-input readonly value="已确认"></el-input>
          </p>
          <p v-if="dataInfo.status=='3'">
            <el-input readonly value="已作废"></el-input>
          </p>
        </el-form-item>
        <el-form-item label="受令机车：">
          <el-input v-model="dataInfo.loco" readonly></el-input>
        </el-form-item>
        <el-form-item label="受令司机：">
          <el-input v-model="dataInfo.driver" readonly></el-input>
        </el-form-item>
        <el-form-item label="受令机长">
          <el-input v-model="dataInfo.master" readonly></el-input>
        </el-form-item>
        <el-form-item label="发令时间：">
          <el-input readonly v-model="dataInfo.create_time"></el-input>
        </el-form-item>
        <el-form-item label="受令车站：">
          <el-input v-model="dataInfo.station" readonly></el-input>
        </el-form-item>
        <el-form-item label="车站值班员：">
          <el-input v-model="dataInfo.dispatch" readonly></el-input>
        </el-form-item>
        <el-form-item label="确认时间：">
          <p v-if="dataInfo.makesure_time.length==0">
            <el-input readonly value="暂未确认"></el-input>
          </p>
          <p v-else>
            <el-input readonly v-model="dataInfo.makesure_time"></el-input>
          </p>
        </el-form-item>
        <el-form-item label="受令处所：">
          <el-input v-model="dataInfo.location" readonly></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item class="contents" label="调度命令内容：">
          <el-input type="textarea" v-model="dataInfo.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="app-dialog-footer">
        <el-button @click="isCancel">关闭</el-button>
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
          console.log(JSON.stringify(this.dataInfo));
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
.app-dialog-form {
  padding: 30px 0px 30px 30px;
  display: block;
  margin-top: 20px;
}
.app-dialog-form .el-form-item {
  margin-bottom: 15px;
}
.app-dialog-form .el-form-item__label {
  width: 120px;
  color: #1d397a;
}
.app-dialog-form .el-input input {
  width: 245px;
}
.app-dialog-form .bluebtn {
  margin-left: 10px;
}
.app-dialog-form .redbtn {
  background: #ff5c75;
  border-color: #ff5c75;
}
.app-dialog-form .contents {
  display: block;
  width: 100%;
}
.app-dialog-form .contents .el-textarea {
  width: 100%;
}
.app-dialog-form .contents .el-form-item__content {
  width: 623px;
}
.app-dialog-form .contents .el-textarea__inner {
  width: 100%;
  height: 100px;
}
.app-dialog-footer {
  margin-top: 20px;
}
.app-dialog-footer .tips {
  color: #ff5c75;
  font-size: 16px;
}
.app-dialog-footer .el-button {
  float: right;
  margin-right: 30px;
}
</style>
