<template>
  <div id="realtime">
    <div class="el-menu-top">
      <el-menu router default-active="search" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-search.png')" />实时定位
        </li>
      </el-menu>
    </div>
    <div class="app-page">
      <div class="app-page-container">
        <div class="app-page-peple">
          <div class="title">无锡地铁三号线<span>当日人数：{{dataInfo.oneline_num}}人</span><span>在线人数：{{dataInfo.all_num}}人</span> </div>
          <table>
            <thead>
              <th>公司名称</th>
              <th>在线人数</th>
              <th>当日人数</th>
              <th>公司名称</th>
              <th>在线人数</th>
              <th>当日人数</th>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="app-table">
          <h3 class="aptitle">当日在线人员列表</h3>
          <el-table :data="dataList">
            <el-table-column label="序号">
              <template scope="scope">
                <span>{{scope.$index+(page_cur - 1) * page_size + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="location" label="位置">
              <!-- <template slot-scope="scope">
                <b>DK</b>
                {{scope.row.start_flag}} + {{scope.row.start_length}}
              </template>-->
            </el-table-column>
            <el-table-column prop="line" label="线别"></el-table-column>
            <el-table-column prop="number" label="定位设备编号"></el-table-column>
            <el-table-column prop="company" label="公司"></el-table-column>
            <el-table-column prop="create_time" label="入场时间"></el-table-column>
            <el-table-column prop="leave_time" label="出场时间" show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="app-pagination">
            <el-pagination
              class="pagination"
              v-if="dataList.length !== 0"
              layout="slot,prev, pager, next,slot,total"
              :page-size="this.page_size"
              :current-page="this.page_cur"
              :total="this.page_items"
              @current-change="pageChange"
              prev-text="上一页"
              next-text="下一页"
            >
              <button @click="pageToFirst" type="button" class="btn-first">
                <span>首页</span>
              </button>
              <button @click="pageToLast" type="button" class="btn-last">
                <span>尾页</span>
              </button>
            </el-pagination>
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
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.searchForm.end_time) {
            return (
              time.getTime() > new Date(this.searchForm.end_time).getTime()
            );
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.searchForm.start_time) {
            return (
              time.getTime() < new Date(this.searchForm.start_time).getTime()
            );
          }
        }
      },
      searchForm: {},
      page_cur: 1,
      page_items: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      dataInfo: [],
      getLocomotiveList: []
    };
  },
  created() {
    this.getLocomotiveLists();
    this.getDataList();
  },
  methods: {
    //选择机车
    getLocomotiveLists() {
      this.request({
        url: "dispatch/getLocomotiveLists",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.getLocomotiveList = data.data;
        }
      });
    },
    getDataList() {
      let page = this.page_cur;
      this.request({
        url: "/location/getRealtimeLists",
        method: "get",
        params: {
          page
        }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataInfo=data.data;
          this.dataList = data.data.data;
          this.page_cur = parseInt(data.data.current_page);
          this.page_items = data.data.total;
          this.page_size = data.data.per_page;
          this.page_total = data.data.last_page;
        }
      });
    },
    pageChange(value) {
      this.page_cur = value;
      this.getDataList();
    },
    pageToFirst() {
      this.page_cur = 1;
      this.getDataList();
    },
    pageToLast() {
      this.page_cur = this.page_total;
      this.getDataList();
    },
    pageSearch() {
      this.page_cur = 1;
      this.getDataList();
    },
    resetSerach() {
      this.searchForm = {
        loco_id: "",
        alert_type: "",
        start_time: "",
        end_time: ""
      };
      this.getDataList();
    },
    goDel(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      })
        .then(() => {
          this.request({
            url: "/search/deleteAlert",
            method: "post",
            data: { id: id }
          }).then(res => {
            let data = res.data;
            if (data.status == 1) {
              this.$message({
                type: "success",
                message: "删除成功！"
              });
              this.getDataList();
            }
          });
        })
        .catch(() => {});
    }
    //
  }
};
</script>
<style >
.app-page-peple {
  padding: 10px 0 30px 0;
}
.app-page-peple .title {
  text-align: center;
  color: #1d397a;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
}
.app-page-peple .title span {
 margin-left: 20px;display: inline-block;
 font-size: 18px;
}
.app-page-peple table {
  width: 100%;
  border: 1px #9db9fa  solid;
  border-collapse: collapse;
}
.app-page-peple table td,
.app-page-peple table th {
  text-align: center;
  padding: 12px 0;
  height: 40px;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  color: #1d397a;
}
.app-page-peple table td {
  border-top: 1px solid #9db9fa ;
}
 .aptitle {
  color: #1d397a;
  font-size: 20px;
  margin-bottom:15px;
}
</style>