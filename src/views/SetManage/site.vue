<template>
  <div class="app-set-page">
    <div class="app-page-rows">
      <div class="app-page-rows-left">
        <div class="left-menu-area">
          <h5 class="atitle">系统设置</h5>
          <el-menu router>
            <el-menu-item>
              <router-link to="/setmanage">人员管理</router-link>
            </el-menu-item>
            <el-menu-item class="active">
              <router-link to="/setmanage/site">站点设置</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/setmanage/warning">告警设置</router-link>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="app-page-rows-right">
        <div class="app-page-container">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item class="el-form-item">
                <el-input
                  prefix-icon="el-icon-search"
                  placeholder="请输入站点名"
                  @input="searchKeywordEvent"
                  v-model="searchKeyword"
                  class="input-with-select"
                  clearable
                ></el-input>
              </el-form-item>
              <div class="el-serach noborder">
                <el-button @click="addShowDialog">添加</el-button>
              </div>
            </el-form>
          </div>
          <div class="app-table">
            <el-table :data="dataList">
              <el-table-column label="序号" width="80px">
                <template slot-scope="scope">{{scope.$index+(page_cur - 1) * page_size + 1}}</template>
              </el-table-column>
              <el-table-column prop="name" label="站点名"></el-table-column>
              <el-table-column prop="address" label="所在位置" show-overflow-tooltip></el-table-column>
              <el-table-column prop="number" label="日均排污量（吨）">
                <template slot-scope="scope">
                  <span v-html="scope.row.number">吨</span>
                </template>
              </el-table-column>
              <el-table-column prop="create_time" label="入网时间"></el-table-column>
              <el-table-column label="操作" width="130">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-edit" size="mini" @click="editEvent(scope.row.id)">编辑</el-button>
                    <el-button class="btn-del" size="mini" @click="deleteEvent(scope.row.id)">删除</el-button>
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
                :total="this.page_data_total"
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
          <el-dialog
            width="780px"
            :close-on-click-modal="false"
            class="dialog-station"
            :title="this.diaLogTitle"
            :visible.sync="diaLogFormVisible"
          >
            <el-form
              class="el-form-custom"
              :model="formData"
              :rules="formRules"
              ref="formRulesRef"
              label-width="110px"
            >
              <el-form-item label="站点名称：" prop="name">
                <el-input v-model="formData.name"></el-input>
              </el-form-item>
              <el-form-item label="所属父级：" prop="pid">
                <el-select v-model="formData.pid">
                  <el-option
                    v-for="item in this.fatherStationList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="日均排污量：" prop="number">
                <el-input placeholder="请输入日均排污量" v-model="formData.number">
                  <template slot="append">吨</template>
                </el-input>
              </el-form-item>
              <el-form-item label="站点地址：" prop="address">
                <el-input v-model="formData.address" placeholder="请输入地址  支持手动在地图标注位置"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="baiduMap">
                  <baidu-map
                    　　class="bm-view"
                    　　ak="GsTerPPU46fUXlt09K8840K0HxTvKIIa"
                    　　center="江苏省"
                    　　:zoom="12"
                    　　:scroll-wheel-zoom="true"
                    　　@click="getClickInfo"
                    　　@moving="syncCenterAndZoom"
                    　　@moveend="syncCenterAndZoom"
                    　　@zoomend="syncCenterAndZoom"
                  >
                    <bm-view style="width: 100%; height:360px;"></bm-view>
                    <bm-marker
                      　　　:position="{ lng: centerStr.lng, lat: centerStr.lat }"
                      　　　:dragging="true"
                      　　　animation="BMAP_ANIMATION_BOUNCE"
                    ></bm-marker>
                    <bm-local-search
                      :keyword="formData.address"
                      :auto-viewport="true"
                      style="width:0px;height:0px;overflow: hidden;"
                    ></bm-local-search>
                  </baidu-map>
                </div>
              </el-form-item>
              <el-form-item label="经度" style="display:none">
                <el-input :value.sync="centerStr.lng"></el-input>
              </el-form-item>
              <el-form-item label="纬度" style="display:none">
                <el-input :value.sync="centerStr.lat"></el-input>
              </el-form-item>
              <div class="blank"></div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="diaLogFormVisible = false">关闭</el-button>
              <el-button type="primary" @click="addEvent()">确定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BaiduMap, BmView, BmLocalSearch, BmMarker } from "vue-baidu-map";
export default {
  components: {
    BaiduMap,
    BmView,
    BmLocalSearch,
    BmMarker
  },
  data() {
    return {
      centerStr: {
        lng: "",
        lat: ""
      },
      diaLogFormVisible: false,
      diaLogTitle: "添加站点",
      diaLogEdit: false,
      formData: {},
      formRules: {
        name: [
          {
            required: true,
            message: "请输入名称2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" },
          {
            pattern: /(^\S+).*(\S+$)/,
            message: "开始和结尾不能有空格",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入地址",
            trigger: "blur"
          },
          { min: 2, max: 50, message: "长度在2到50个字符", trigger: "blur" }
        ],
        number: [
          {
            required: true,
            message: "请输入日均排污量",
            trigger: "blur"
          },
          {
            pattern: /^(|[1-9]\d{0,2})(\.\d{1,2})?$/,
            message: "请输入1-3位正数字并可保留两位小数点",
            trigger: "blur"
          }
        ],
        pid: [
          {
            required: true,
            message: "请选择所属父级",
            trigger: "change"
          }
        ],
        description: [
          {
            required: true,
            message: "请输入消息内容2~200个字符",
            trigger: "blur"
          },
          { min: 2, max: 200, message: "长度在2到200个字符", trigger: "blur" },
          {
            pattern: /\s\S+|S+\s|\S/,
            message: "内容不能全部是空格",
            trigger: "blur"
          }
        ]
      },
      page_cur: 1,
      page_data_total: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      fatherStationList: [],
      searchKeyword: ""
    };
  },

  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      let page = this.page_cur;
      let name = this.searchKeyword;
      this.request({
        url: "/station/getStationPages",
        method: "get",
        params: {
          page,
          name
        }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataList = data.data.data;
          this.page_cur = parseInt(data.data.current_page);
          this.page_total = data.data.last_page;
          this.page_data_total = data.data.total;
          this.page_size = data.data.per_page;
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
    searchKeywordEvent() {
      this.page_cur = 1;
      this.getDataList();
    },
    getFatherStationList() {
      this.request({
        url: "/station/getFatherStationLists",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.fatherStationList = data.data;
        }
      });
    },
    addShowDialog() {
      this.getFatherStationList();
      this.diaLogTitle = "添加站点";
      this.diaLogFormVisible = true;
      this.diaLogEdit = false;
      this.$nextTick(() => {
        this.$refs["formRulesRef"].clearValidate();
      });
      this.formData = {
        // title: "",
        // description: "",
        // recept_type: []
      };
    },
    addEvent() {
      const that = this;
      this.$refs["formRulesRef"].validate(valid => {
        if (valid) {
          let data = that.formData;
          data.map = this.centerStr.lng + "," + this.centerStr.lat;
          let url = "/station/addStation";
          let baseid = this.formData.id;
          if (typeof baseid != "undefined") {
            url = "/station/editStation";
          }
          this.request({
            url: url,
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.diaLogFormVisible = false;
              this.getDataList();
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
    editEvent(id) {
      this.getFatherStationList();
      this.diaLogFormVisible = true;
      this.diaLogEdit = true;
      this.diaLogTitle = "编辑站点";
      this.$nextTick(() => {
        this.$refs["formRulesRef"].clearValidate();
      });
      this.request({
        url: "/station/getStation",
        method: "get",
        params: { id: id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.formData = data.data;
          console.log(data.data.lng + "_" + data.data.lat);
          this.centerStr = {
            lng: "",
            lat: ""
          };
          this.$set(this.centerStr, "lat", data.data.lat);
          this.$set(this.centerStr, "lng", data.data.lng);
        }
      });
    },
    deleteEvent(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      })
        .then(() => {
          this.request({
            url: "/station/delStation",
            method: "post",
            data: { id: id }
          }).then(res => {
            let data = res.data;
            if (data.status == 1) {
              if (this.dataList.length == 1) {
                this.page_cur = this.page_cur - 1;
                this.getDataList();
              } else {
                this.getDataList();
              }
              this.$message({
                type: "success",
                message: "删除成功！"
              });
            }
          });
        })
        .catch(() => {});
    },
    getClickInfo(e) {
      this.centerStr.lng = e.point.lng;
      this.centerStr.lat = e.point.lat;
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      if (this.diaLogEdit == true) {
        this.centerStr.lng = this.formData.lng;
        this.centerStr.lat = this.formData.lat;
      } else {
        this.centerStr.lng = lng;
        this.centerStr.lat = lat;
      }
      this.zoom = e.target.getZoom();
      // console.log(this.centerStr.lng + "__A__" + this.centerStr.lat);
    }
    //
  }
};
</script>
<style>
.app-set-page {
  overflow: hidden;
}
.dialog-station .el-select {
  width: 100%;
}
.dialog-station .baiduMap {
  margin-top: 5px;
  padding: 5px;
  border-radius: 3px;
  border: 1px #ddd solid;
}
</style>