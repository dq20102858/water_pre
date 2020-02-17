<template>
  <div>
    <el-form>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="searchForm.time_range"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <label class="el-form-item__label"></label>
        <el-button size="small" icon="el-icon-search" type="primary" @click="getDataLists">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      searchForm: {
        time_range: []
      }
    };
  },
  methods: {
    getDataLists() {
      alert(this.searchForm.time_range);
    }
  }
};
</script>

<style scoped>
</style>
