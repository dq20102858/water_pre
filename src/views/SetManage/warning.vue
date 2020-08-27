<template>
  <div class="app-page-set-warm">
    <div class="app-page-rows">
      <div class="app-page-rows-left">
        <div class="left-menu-area">
          <h5 class="atitle">系统设置</h5>
          <el-menu router>
            <el-menu-item>
              <router-link to="/setmanage">人员管理</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/setmanage/site">站点设置</router-link>
            </el-menu-item>
            <el-menu-item class="active">
              <router-link to="/setmanage/warning">告警设置</router-link>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="app-page-rows-right">
        <div class="app-page-container">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item>
                <h3 class="ttitles">告警设置：设定一个最小值、一个最大值，当各项数值超过此范围时，系统发起告警</h3>
              </el-form-item>
            </el-form>
          </div>
          <div class="add-from">
            <el-form
              :model="formData"
              class="el-form-custom"
              :rules="formRules"
              ref="formRulesRef"
              label-width="110px"
            >
              <el-form-item label="PH：" required>
                <el-col :span="11">
                  <el-form-item prop="ph">
                    <el-input v-model="formData.ph" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="max_ph">
                    <el-input v-model="formData.max_ph" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>

              <el-form-item label="DO：" required>
                <el-col :span="11">
                  <el-form-item prop="do">
                    <el-input v-model="formData.do" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="max_do">
                    <el-input v-model="formData.max_do" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>

              <el-form-item label="电导率：" required>
                <el-col :span="11">
                  <el-form-item prop="conductivity">
                    <el-input v-model="formData.conductivity" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="max_conductivity">
                    <el-input v-model="formData.max_conductivity" autocomplete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="液位：" prop="level">
                <el-input v-model="formData.level">
                  <template slot="append">厘米</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <br />
                <el-button type="primary" @click="addEventDialog">确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      formRules: {
        ph: [
          {
            required: true,
            message: "请输入1-3位正数字并可保留两位小数点",
            trigger: "blur"
          },
          {
            pattern: /^(|[1-9]\d{0,2})(\.\d{1,2})?$/,
            message: "请输入1-3位正数字并可保留两位小数点",
            trigger: "blur"
          }
        ],
        max_ph: [
          {
            required: true,
            message: "请输入1-3位正数字并可保留两位小数点",
            trigger: "blur"
          },
          {
            pattern: /^(|[1-9]\d{0,2})(\.\d{1,2})?$/,
            message: "请输入1-3位正数字并可保留两位小数点",
            trigger: "blur"
          }
        ],
        do: [
          {
            required: true,
            message: "请输入1-3位正数字并可保留两位小数点",
            trigger: "blur"
          },
          {
            pattern: /^(|[1-9]\d{0,2})(\.\d{1,2})?$/,
            message: "请输入1-3位正数字并可保留两位小数点",
            trigger: "blur"
          }
        ],
        max_do: [
          {
            required: true,
            message: "请输入1-3位正数字并可保留两位小数点",
            trigger: "blur"
          },
          {
            pattern: /^(|[1-9]\d{0,2})(\.\d{1,2})?$/,
            message: "请输入1-3位正数字并可保留两位小数点",
            trigger: "blur"
          }
        ],
        conductivity: [
          {
            required: true,
            message: "请输入1-3位正数字并可保留两位小数点",
            trigger: "blur"
          },
          {
            pattern: /^(|[1-9]\d{0,2})(\.\d{1,2})?$/,
            message: "请输入1-3位正数字并可保留两位小数点",
            trigger: "blur"
          }
        ],
        max_conductivity: [
          {
            required: true,
            message: "请输入1-3位正数字并可保留两位小数点",
            trigger: "blur"
          },
          {
            pattern: /^(|[1-9]\d{0,2})(\.\d{1,2})?$/,
            message: "请输入1-3位正数字并可保留两位小数点",
            trigger: "blur"
          }
        ],
        level: [
          {
            required: true,
            message: "请输入液位",
            trigger: "blur"
          },
          {
            pattern: /^(|[1-9]\d{0,2})(\.\d{1,2})?$/,
            message: "请输入1-3位正数字并可保留两位小数点",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getSetDetail();
  },
  methods: {
    addEventDialog() {
      const that = this;
      this.$refs["formRulesRef"].validate(valid => {
        if (valid) {
          let data = that.formData;

          if (parseFloat(that.formData.max_ph) < parseFloat(that.formData.ph)) {
            this.$message({
              type: "error",
              message: "PH值：最小值不能大于最大值"
            });
            return false;
          }
          if (parseFloat(that.formData.max_do) < parseFloat(that.formData.do)) {
            this.$message({
              type: "error",
              message: "DO值：最小值不能大于最大值"
            });
            return false;
          }
          if (
            parseFloat(that.formData.max_conductivity) <
            parseFloat(that.formData.conductivity)
          ) {
            this.$message({
              type: "error",
              message: "电导率值：最小值不能大于最大值"
            });
            return false;
          }
          this.request({
            url: "/set/addOrUpdateSet",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.getSetDetail();
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
    getSetDetail() {
      this.request({
        url: "/set/getSetDetail",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.formData = data.data;
        }
      });
    }
    //
  }
};
</script>
<style>
.add-from {
  width: 600px;
  overflow: hidden;
}
.add-from .el-form-custom .el-form-item {
  margin-bottom: 15px;
}
</style>