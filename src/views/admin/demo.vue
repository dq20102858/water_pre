<template>
  <div id="demo">
    <el-upload
      class="uploader el-upload-list--picture-card"
      action="#"
      list-type="picture-card"
      :auto-upload="false"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
        <div class="el-upload-list__item-input">
          <input class="ddd" placeholder="dsfsdf" />
        </div>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>

  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      uploadAction: "/upload/uploadFile",
      uploadFiveFlies: [],
      formData: []
    };
  },
  created() {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;

      //
    }
  }
};
</script>
<style>
.el-upload-list__item-input {
  position: absolute;
  bottom: 0;
  z-index: 999999;
}
</style>