<template>
  <div id="app-apply">
    <div class="el-menu-top">
      <el-menu  mode="horizontal" active-text-color="#1d397a">
        <li class="ptitle">无锡地铁三号线</li>
        <el-submenu index="1">
          <template slot="title">日班计划</template>
          <el-menu-item index="2-1">日班图表</el-menu-item>
          <el-menu-item index="2-2">已班列表</el-menu-item>
          <el-menu-item index="2-3">冲突检测</el-menu-item>
        </el-submenu>
        <el-menu-item><router-link :to="{name:'weekplan'}">周计划</router-link></el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div class="app-page-container">
                 <div class="app-page-select">
          <el-form :model="searchForm" :inline="true">
            <el-form-item>
              <el-select v-model="searchForm.lid" placeholder="请选择" clearable>
                <el-option
                  v-for="item in lidList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.lid" placeholder="请选择" clearable>
                <el-option
                  v-for="item in lidList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.lid" placeholder="请选择" clearable>
                <el-option
                  v-for="item in lidList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.lid" placeholder="请选择" clearable>
                <el-option
                  v-for="item in lidList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.lid" placeholder="请选择" clearable>
                <el-option
                  v-for="item in lidList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.lid" placeholder="请选择" clearable>
                <el-option
                  v-for="item in lidList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.lid" placeholder="请选择" clearable>
                <el-option
                  v-for="item in lidList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.lid" placeholder="请选择" clearable>
                <el-option
                  v-for="item in lidList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="form-so">
              <label class="el-form-item__label"></label>
              <el-button size="small" icon="el-icon-search" @click="geURL" type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- end search -->
        <div class="app-table">
          <el-table :data="tableData">
            <el-table-column prop="nums" label="作业编号"></el-table-column>
            <el-table-column prop="txt" label="作业令号"></el-table-column>
            <el-table-column prop="txt" label="作业内容"></el-table-column>
            <el-table-column prop="txt" label="当前状态"></el-table-column>
            <el-table-column prop="txt" label="下一步状态"></el-table-column>
            <el-table-column prop="txt" label="公司简称"></el-table-column>
            <el-table-column prop="txt" label="操作" width="80">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-blue" size="mini" @click="goDetail(scope.row.id)">详情</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="app-pagination">
            <el-pagination
              class="pagination"
              layout="prev, pager, next,total"
              :total="1000"
              prev-text="上一页"
              next-text="下一页"
            ></el-pagination>
          </div>
        </div>
        <!-- end table -->
      </div>
    </div>
  </div>
</template>
<script>
import weekplan from "./weekplan.vue";
export default {
  data() {
       const item = {
        nums: '201900000',
        txt: '测试数据库',
        status:'已确认',
        datatimes:'2019-02-16'
      };
    return {
      lidList: [],
      tableData: Array(20).fill(item),
      searchForm: {
        lid: "",
        dispatch_id: "",
        master_id: "",
        driver_id: "",
        status: "",
        time_range: []
      }
    };
  },
  created() {
    this.getlibLists(); //机车
  },
  methods: {
      geURL(){
          //this.$router.push({path: '/weekplan' , params: { Id: 1 }})
      },
    getlibLists() {
      this.request({
        url: "/dispatch/getLocomotiveLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.lidList = data.data;
        }
      });
    },
     goDetail: function(id) {},
  },
   components: {
        'Demo': weekplan  //将别名demo 变成 组件 Demo
      }

};
</script>