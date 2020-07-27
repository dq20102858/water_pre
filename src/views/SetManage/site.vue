<template>
  <div class="app-set-page">
    <el-row :gutter="20" class="grid-menu">
      <el-col :xs="8" :sm="8" :md="8" :lg="3" :xl="3">
        <div class="left-menu">
          <h5>设置</h5>
          <el-menu router>
            <el-menu-item>
              <router-link to="/setmanage">用户设置</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/setmanage/users">人员设置</router-link>
            </el-menu-item>
            <el-menu-item class="is-active">
              <router-link to="/setmanage/site">站点设置</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/setmanage/warning">告警设置</router-link>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :xs="16" :sm="16" :md="16" :lg="21" :xl="21">
        <div class="app-page-container ptopz">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item>
                <h3 class="ttitles">站点列表</h3>
              </el-form-item>
              <div class="el-serach noborder">
                <!-- <el-input v-model="searchName" autocomplete="off" placeholder="请输入名称查询" clearable></el-input> -->
                <el-button @click="goAdd">添加</el-button>
              </div>
            </el-form>
          </div>
          <div class="app-table">
            <el-table :data="dataList">
              <el-table-column label="序号" width="80px">
                <template slot-scope="scope">{{scope.$index+(page_cur - 1) * page_size + 1}}</template>
              </el-table-column>
              <el-table-column prop="title" label="站点名"></el-table-column>
              <el-table-column prop="send_user" label="所在位置"></el-table-column>
              <el-table-column prop="recept_type" label="日均排污量">
                <template slot-scope="scope">
                  <span v-html="getArrText(scope.row.recept_type)"></span>
                </template>
              </el-table-column>
              <el-table-column prop="send_user" label="入网时间"></el-table-column>
              <el-table-column label="操作" width="130">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-edit" size="mini" @click="goDetail(scope.row)">编辑</el-button>
                    <el-button class="btn-del" size="mini" @click="goDetail(scope.row)">删除</el-button>
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
            class="dialog-msg"
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
              <el-form-item label="站点名称：" prop="title">
                <el-input v-model="keyword" :keyword="keyword"></el-input>
              </el-form-item>
                <el-form-item label="日均排污量：" prop="title">
                <el-input
                  v-model="formData.title"
                  autocomplete="off"
                  maxlength="20"
                  show-word-limit
                ></el-input>
              </el-form-item>

              <el-form-item label="站点地址：" prop="title">
                <el-input v-model="keyword"></el-input>
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
                    <bm-view style="width: 100%; height:400px;"></bm-view>
                    <bm-marker
                      　　　:position="{ lng: centerStr.lng, lat: centerStr.lat }"
                      　　　:dragging="true"
                      　　　animation="BMAP_ANIMATION_BOUNCE"
                    ></bm-marker>
                    <bm-local-search
                      :keyword="keyword"
                      :auto-viewport="true"
                      style="width:0px;height:0px;overflow: hidden;"
                    ></bm-local-search>
                  </baidu-map>
                </div>
              </el-form-item>
              <!-- <el-form-item label="经度">
                <el-input :value.sync="centerStr.lng"></el-input>
              </el-form-item>
              <el-form-item label="纬度">
                <el-input :value.sync="centerStr.lat"></el-input>
              </el-form-item> -->
              <div class="blank"></div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="diaLogFormVisible = false">关闭</el-button>
              <el-button type="primary" @click="addEventDialog()">确定</el-button>
            </div>
          </el-dialog>
          <el-dialog
            width="980px"
            :close-on-click-modal="false"
            class="dialog-msg"
            title="消息详情"
            :visible.sync="diaLogShowFormVisible"
          >
            <el-form class="el-form-custom" :model="formDataShow">
              <el-form-item label="消息主题：">
                <el-input v-model="formDataShow.title" autocomplete="off" readonly></el-input>
              </el-form-item>
              <el-form-item label="发送对象：" prop="recept_type">
                <el-checkbox-group v-model="formDataShow.recept_type">
                  <el-checkbox :label="1">施工队长</el-checkbox>
                  <el-checkbox :label="2">施工人员</el-checkbox>
                  <el-checkbox :label="3">行车</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="消息内容：">
                <el-input
                  v-model="formDataShow.description"
                  autocomplete="off"
                  type="textarea"
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="发送时间：">
                <el-input v-model="formDataShow.create_time" autocomplete="off" readonly></el-input>
              </el-form-item>
              <div class="blank"></div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="diaLogShowFormVisible = false">关闭</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
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
      keyword: "",
      centerStr: {
        lng: "",
        lat: ""
      },

      diaLogFormVisible: false,
      diaLogTitle: "发送消息",
      diaLogShowFormVisible: false,
      formDataShow: {},
      formData: {
        recept_type: []
      },
      formRules: {
        title: [
          {
            required: true,
            message: "请输入消息主题2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" },
          {
            pattern: /(^\S+).*(\S+$)/,
            message: "开始和结尾不能有空格",
            trigger: "blur"
          }
        ],
        recept_type: [
          {
            required: true,
            message: "请选择发送对象",
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
      dataList: []
    };
  },
  mounted() {
    document
      .querySelector(".el-menu-top #setmanage")
      .classList.add("is-active");
  },
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      let page = this.page_cur;
      // let recept_type = "我们";
      this.request({
        url: "/message/getMessagePages",
        method: "get",
        params: {
          page
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
    searchEvent() {
      this.page_cur = 1;
      this.getDataList();
    },

    goAdd() {
      this.diaLogTitle = "发送消息";
      this.diaLogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["formRulesRef"].clearValidate();
      });
      this.formData = {
        title: "",
        description: "",
        recept_type: []
      };
    },
    addEventDialog() {
      const that = this;
      this.$refs["formRulesRef"].validate(valid => {
        if (valid) {
          //this.formData.recept_type=JSON.stringify(that.formData.recept_type);
          let data = that.formData;
          this.request({
            url: "/message/addMessage",
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
    goDetail(rows) {
      this.diaLogShowFormVisible = true;
      this.formDataShow.title = rows.title;
      this.formDataShow.create_time = rows.create_time;
      let arr = JSON.parse("[" + rows.recept_type + "]");
      this.formDataShow.recept_type = arr;
      this.formDataShow.description = rows.description;
      console.log(rows + "-" + arr);
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
            url: "/search/deleteStation",
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
    },
    getClickInfo(e) {
      this.centerStr.lng = e.point.lng;
      this.centerStr.lat = e.point.lat;

     
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.centerStr.lng = lng;
      this.centerStr.lat = lat;
      this.zoom = e.target.getZoom();

       console.log(this.centerStr.lng+"_"+ this.centerStr.lat);
    }
    //
  }
};
</script>
<style>
* { touch-action: pan-y; }
.app-set-page {
  padding: 20px;
}

.baiduMap {
  margin-top: 5px;
  padding: 5px;
  border-radius: 3px;
  border: 1px #ddd solid;
}
</style>