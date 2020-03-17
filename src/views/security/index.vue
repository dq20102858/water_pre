
<template>
  <div id="security">
    <div class="app-page">
      <div class="security-title">安全事件添加</div>
      <div class="app-page-container">
        <div class="formbox">
          <el-form
            class="el-form-custom"
            label-width="120px"
            label-position="right"
            :model="formData"
            :rules="formRules"
            ref="formRulesForm"
          >
            <el-form-item label="添加事件公司：" prop="depart_id">
              <el-select v-model="formData.depart_id" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="人员：" prop="admin_id">
              <el-select v-model="formData.admin_id" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="安全事件标题：" prop="title">
              <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="安全事件地址：" prop="address">
              <el-input v-model="formData.address"></el-input>
            </el-form-item>
            <el-form-item label="安全事件描述：" prop="description">
              <el-input type="textarea" v-model="formData.description"></el-input>
            </el-form-item>
            <el-form-item label="相关图片：">
              <el-upload limit="2"
                action="http://129.211.168.161/upload/uploadFile"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addEvent">信息确认无误，点击上传</el-button>
            </el-form-item>
          </el-form>
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
        depart_id: [
          { required: true, message: "请选择公司", trigger: "change" }
        ],
         admin_id: [
          { required: true, message: "请选择公司", trigger: "change" }
        ],
        title: [
          {
            required: true,
            message: "请输入安全事件标题2~60个字符",
            trigger: "blur"
          },
          { min: 2, max: 60, message: "长度在2到60个字符", trigger: "blur" }
        ],
        address: [
          {
            required: true,
            message: "请输入安全事件标题2~60个字符",
            trigger: "blur"
          },
          { min: 2, max: 60, message: "长度在2到60个字符", trigger: "blur" }
        ],
        description: [
          {
            required: true,
            message: "请输入安全事件描述2~60个字符",
            trigger: "blur"
          },
          { min: 2, max: 60, message: "长度在2到60个字符", trigger: "blur" }
        ]
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    addEvent() {
      this.$refs["formRulesForm"].validate(valid => {
        if (valid) {
          let data = this.formData;
          console.log(data);
        }
      });
    }
    //
  }
};
</script>
<style>
.security-title {
  background: #3655a5;
  color: #fff;
  border-bottom: none !important;
  font-size: 18px;
  border-radius: 6px 6px 0 0;
  padding: 12px 0;
  text-align: center;
}
#security .formbox {
  padding: 50px 100px 30px 100px;
}
#security .el-textarea {
  width: 100%;
}
#security .el-textarea__inner {
  height: 100px;
}
</style>