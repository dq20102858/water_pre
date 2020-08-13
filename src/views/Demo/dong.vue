<template>
  <el-row class="demo-autocomplete">
    <el-col :span="12">
      <div class="sub-title">输入后匹配输入建议</div>
      <el-autocomplete
        class="inline-input"
        v-model="state2"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        :trigger-on-focus="false"
        @select="handleSelect" clearable
      ></el-autocomplete>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      restaurants: [],
      state1: "",
      state2: ""
    };
  },
  methods: {
    querySearch(queryString, callback) {
      let list = [];
      let name = queryString;
      this.request({
        url: "/station/getChildStationLists",
        method: "get",
        params: { name }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.childStationList = data.data;
          let map = data.data;
          for (let item of map) {
            list.push({
              id: item.id,
              value: item.name
            });
          }
          console.log(list);
          callback(list);
        }
      });
      // var restaurants = this.restaurants;
      // var results = queryString   ? restaurants.filter(this.createFilter(queryString)): restaurants;
      // // 调用 callback 返回建议列表的数据
      // cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { name: "三全鲜食（北新泾店）", id: 1 },
        { name: "Hot honey 首尔炸鸡（仙霞路）", id: 2 },
        { name: "新旺角茶餐厅", id: 3 },
        { name: "泷千家(天山西路店)", id: 4 },
        { name: "胖仙女纸杯蛋糕（上海凌空店）", id: 5 },
        { name: "贡茶", id: 6 }
      ];
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>