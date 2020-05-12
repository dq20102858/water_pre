<template>
  <div id="planlist">
    <div class="el-menu-top">
      <el-menu router mode="horizontal">
        <li class="ptitle">施工生产调度指挥管理系统</li>
      </el-menu>
    </div>

    <div class="app-page">
      <div class="app-page-container">
        <div class="app-page-select">
          <el-form :model="searchForm" :inline="true">
            <el-form-item label="工点">
              <el-select v-model="searchForm.start_station" placeholder="请选择起始车站" clearable>
                <el-option
                  v-for="item in stationList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.end_station" placeholder="请选择结束车站" clearable>
                <el-option
                  v-for="item in stationList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划类型">
              <el-select v-model="searchForm.type" placeholder="请选择日班计划类型" clearable>
                <el-option label="有车施工计划" :value="1"></el-option>
                <el-option label="无车施工计划" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="searchForm.start_time"
                :picker-options="pickerOptionsStart"
                type="date"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="searchForm.end_time"
                :picker-options="pickerOptionsEnd"
                type="date"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="form-so">
              <label class="el-form-item__label"></label>
              <el-button
                size="small"
                icon="el-icon-search"
                @click="pageSearchEvent"
                type="primary"
              >查询</el-button>
              <el-button size="small" plain @click="resetSerach">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- end search -->
        <div class="app-table">
          <el-table :data="dataList">
            <el-table-column label="序号">
              <template scope="scope">
                <span>{{scope.$index+(page_cur - 1) * page_size + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="计划编号"></el-table-column>
            <el-table-column prop="line_type" label="施工线别"></el-table-column>
            <el-table-column label="施工站点" width="240">
              <template slot-scope="scope">
                <p>站点：{{scope.row.start_station}}-{{scope.row.end_station}}</p>
                <p>里程：DK{{parseFloat(scope.row.start_flag)}} + {{parseFloat(scope.row.start_length)}} ~ DK {{parseFloat(scope.row.end_flag)}} + {{parseFloat(scope.row.end_length)}}</p>
              </template>
            </el-table-column>
            <el-table-column label="作业时间" width="200">
              <template slot-scope="scope">
                <p>开始：{{scope.row.start_time}}</p>
                <p>结束：{{scope.row.end_time}}</p>
              </template>
            </el-table-column>
            <el-table-column label="施工内容">
              <template slot-scope="scope">
                <p>项目：{{scope.row.work}}</p>
                <p>工序：{{scope.row.item}}</p>
              </template>
            </el-table-column>
            <el-table-column label="行车信息" width="280">
              <template slot-scope="scope">
                <p>始发：{{scope.row.start_time}} - {{scope.row.start_station}}</p>
                <p>终止：{{scope.row.end_time}} - {{scope.row.end_station}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="完成情况">
              <template slot-scope="scope">
                <span class="statuse1" v-if="scope.row.status==1">未完成</span>
                <span class="statuse2" v-if="scope.row.status==2">已完成</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-blue" size="mini" @click="goDetail(scope.row.id)">详情</el-button>
                  <el-button class="btn-red" size="mini" @click="goDetele(scope.row.id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="app-pagination">
            <el-pagination
              class="pagination"
              v-if="dataList.length !== 0"
              layout="slot,prev, pager, next,slot,total"
              :page-size="this.page_size"
              :current-page="this.page_cur"
              :total="this.pageTotal"
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
    <el-dialog
      width="980px"
      :close-on-click-modal="false"
      class="dialog-planinfo"
      :title="this.dialogTitle"
      :visible.sync="dialogFormVisible"
    >
      <div class="ptielss">
        日班计划编号：
        <span>{{dataListItem.number}}</span>
        <em v-if="dataListItem.plan_type==1">( 行车和施工计划 )</em>
        <em v-if="dataListItem.plan_type==2">( 行车计划 )</em>
        <em v-if="dataListItem.plan_type==3">( 施工计划 )</em>
      </div>
      <fieldset>
        <legend>计划列车信息</legend>
        <div>
          <table style="width: 100%">
            <!-- <tr>
              <td colspan="3">
                <b>列车类型：</b>
                {{dataListItem.car_type}}
              </td>
            </tr> -->
            <tr>
              <td>
                <b>出发车次：</b>
                {{dataListItem.out_car}}
              </td>
              <td>
                <b>本务：</b>
                {{dataListItem.out_business_loco_name}}
              </td>
              <td>
                <b>重连：</b>
                {{dataListItem.out_reco_name}}
              </td>
              <td>
                <b>补机：</b>
                {{dataListItem.out_supple_name}}
              </td>
            </tr>
            <tr>
              <td>
                <b>出发线别：</b>
                {{dataListItem.out_line}}
              </td>
              <td>
                <b>车长：</b>
                {{dataListItem.out_master}}
              </td>
              <td>
                <b>司机：</b>
                {{dataListItem.out_driver}}
              </td>
              <td>
                <b>出发编组：</b>
                {{dataListItem.out_marshalling}}
              </td>
            </tr>
            <tr>
              <td>
                <b>返回车次：</b>
                {{dataListItem.back_car}}
              </td>
              <td>
                <b>本务：</b>
                {{dataListItem.back_business_loco_name}}
              </td>
              <td>
                <b>重连：</b>
                {{dataListItem.back_reco_name}}
              </td>
              <td>
                <b>补机：</b>
                {{dataListItem.back_supple_name}}
              </td>
            </tr>
            <tr>
              <td>
                <b>返回线别：</b>
                {{dataListItem.back_line}}
              </td>
              <td>
                <b>车长：</b>
                {{dataListItem.back_master}}
              </td>
              <td>
                <b>司机：</b>
                {{dataListItem.back_driver}}
              </td>
              <td>
                <b>返回编组：</b>
                {{dataListItem.back_marshalling}}
              </td>
            </tr>
          </table>
        </div>
      </fieldset>
      <fieldset>
        <legend>计划施工信息</legend>
        <div>
          <table style="width: 100%">
            <tr>
              <td>
                <b>开始时间：</b>
                {{dataListItem.start_time}}
              </td>
              <td>
                <b>结束时间：</b>
                {{dataListItem.end_time}}
              </td>
              <td>
                <b>作业类型：</b>
                {{dataListItem.work_type_name}}
              </td>
              <td>
                <b>线别：</b>
                {{dataListItem.line}}
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <b>涉及站点：</b>
                {{dataListItem.start_station_name}} - {{dataListItem.end_station_name}}
              </td>
              <td colspan="2">
                <b>里程：</b>
                DK{{parseFloat(dataListItem.start_flag)}}+{{parseFloat(dataListItem.start_length)}} ~ DK{{parseFloat(dataListItem.end_flag)}}+{{parseFloat(dataListItem.end_length)}}
              </td>
            </tr>
            <tr>
              <td>
                <b>施工作业队：</b>
                {{dataListItem.work_plan_name}}
              </td>
              <td>
                <b>项目：</b>
                {{dataListItem.item}}
              </td>
              <td>
                <b>工序：</b>
                {{dataListItem.work}}
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <b>备注：</b>
                {{dataListItem.description}}
              </td>
            </tr>
          </table>
        </div>
      </fieldset>
      <fieldset >
        <legend>实际完成信息</legend>
        <div>
          <table style="width: 100%">
            <tr>
              <td>
                <b>开始时间：</b>
                {{dataListItem.true_start_time}}
              </td>
              <td>
                <b>结束时间：</b>
                {{dataListItem.true_end_time}}
              </td>
              <td>
                <b>记录人：</b>
                {{dataListItem.record}}
              </td>
              <td>
                <b>记录时间：</b>
                {{dataListItem.back_line}}
              </td>
            </tr>
            <tr>
              <td>
                <b>开始里程：</b>
                DK{{parseFloat(dataListItem.true_start_flag)}}+{{parseFloat(dataListItem.true_start_length)}}
              </td>
              <td>
                <b>结束里程：</b>
                DK{{parseFloat(dataListItem.true_end_flag)}}+{{parseFloat(dataListItem.true_end_length)}}
              </td>
              <td>
                <b>完成长度：</b>
                {{dataListItem.nums}} 公里
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <b>备注：</b>
                 {{dataListItem.remark}}
              </td>
            </tr>
             <tr>
              <td colspan="4">
                <b>未完成原因：</b>
                 {{dataListItem.reason}}
              </td>
            </tr>
          </table>
        </div>
      </fieldset>
      <!-- <el-form class="el-form-custom">
        <el-form-item label="名称：" prop="name">
          <el-input autocomplete="off" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <div class="blank"></div>
      </el-form>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {},
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
      stationList: [],
      end_station: [],
      dataList: [],
      dataListItem: [],
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      dialogFormVisible: false,
      dialogTitle: ""
    };
  },
  created() {
    this.getStationList();
    this.getDataList();
  },
  methods: {
    getStationList() {
      this.request({
        url: "/apply/getStationLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.stationList = data.data;
        }
      });
    },
    getDataList() {
      let page = this.page_cur;
      let start_station = this.searchForm.start_station;
      let end_station = this.searchForm.end_station;
      let type = this.searchForm.type;
      let start_time = this.searchForm.start_time;
      let end_time = this.searchForm.end_time;
      this.request({
        url: "/dayplan/getDayplanLists",
        method: "get",
        params: {
          page,
          start_station,
          end_station,
          type,
          start_time,
          end_time
        }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataList = data.data.data;
          this.page_cur = parseInt(data.data.current_page);
          this.pageTotal = data.data.total;
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
      this.pageChange(1);
    },
    pageToLast() {
      this.page_cur = this.page_total;
      this.pageChange(this.page_total);
    },
    pageSearchEvent() {
      this.page_cur = 1;
      this.getDataList();
    },
    resetSerach() {
      this.searchForm = {
        start_station: "",
        end_station: "",
        type: "",
        start_time: "",
        end_time: ""
      };
      this.page_cur = 1;
      this.getDataList();
    },
    goDetail(id) {
      this.dialogTitle = "施工管理详情";
      this.dialogFormVisible = true;
      this.request({
        url: "/dayplan/getDayPlanDetail",
        method: "get",
        params: { id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.dataListItem = data.data;
          //   this.detectorData.start_flag = parseInt(data.data.start_flag);
          //   this.detectorData.start_length = parseInt(data.data.start_length);
        }
      });
    },

    goDetele(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      })
        .then(() => {
          this.request({
            url: "dayplan/deleteDayPlan",
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

<style>
.nowrap {
  white-space: nowrap;
  width: 200px;
}
.nowrap .cell {
  white-space: nowrap;
  width: 200px;
}
.nowrap p {
  white-space: nowrap;
  width: 200px;
}
.dialog-planinfo .ptielss {
  font-size: 18px;
  margin-bottom: 15px;
  text-align: right;
  color: #333;
}
.dialog-planinfo .ptielss span {
  color: #cb9f00;
}
.dialog-planinfo .ptielss em {
  color: #25ade2;
  font-style: normal;
}
.dialog-planinfo fieldset {
  border: 1px #9db9fa solid;
  margin-bottom: 15px;
  border-radius: 3px;
  padding: 5px 15px;
}
.dialog-planinfo fieldset legend {
  font-size: 16px;
  color: #4b6eca;
  padding: 0 10px;
}
.dialog-planinfo .blue {
  color: #4b6eca;
}
.dialog-planinfo td {
  color: #79899c;
  padding: 8px 0;
  width: 26%;
}
.dialog-planinfo td b {
  color: #636b6f;
  font-size: 15px;
  display: inline-block;
  width: 90px;
  text-align: right;
}
</style>