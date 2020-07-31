<template>
  <div class="app-set-page">
    <el-row :gutter="20" class="grid-menu">
      <el-col :xs="8" :sm="4" :md="3" :lg="3" :xl="3">
        <div class="left-menu-area">
          <h5  class="atitle">系统设置</h5>
          <el-menu router class="el-menu-vertical-demo">
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
      </el-col>
      <el-col :xs="16" :sm="20" :md="21" :lg="21" :xl="21">
        <div class="app-page-container">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item>
                <h3 class="ttitles">告警设置</h3>
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
              <div>
                <el-form-item label="PH：" prop="ph">
                  <el-input v-model="formData.ph" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="DO：" prop="do">
                  <el-input v-model="formData.do" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电导绿：" prop="conductivity">
                  <el-input v-model="formData.conductivity" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="液位：" prop="level">
                  <el-input v-model="formData.level" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="addEventDialog">确定</el-button>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
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
            message: "请输入PH",
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
            message: "请输入DO",
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
            message: "请输入电导绿",
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
.app-set-page {
overflow: hidden;
}
.add-from {
  width: 400px;
}
</style>