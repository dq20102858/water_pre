<template>
  <div id="location">
    <div class="el-menu-top">
      <el-menu router default-active="walldetector" mode="horizontal"  @select="handleMenuSelect">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-location.png')" />定位管理
        </li>
        <el-menu-item index="location">人员定位统计</el-menu-item>
        <el-menu-item index="walldetector">墙壁探测器</el-menu-item>
        <el-menu-item index="cardetector">车载探测器</el-menu-item>
        <el-menu-item index="locationbind">定位从设备</el-menu-item>
        <el-menu-item index="device">机具</el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div class="app-page-container">
        <div class="app-page-select">
          <el-form :inline="true">
            <el-form-item>
              <el-button type="primary" icon="el-icon-plus" @click="addDialogInfo">添加设备</el-button>
            </el-form-item>
            <div class="el-serach">
              <el-input v-model="numberSearch" autocomplete="off" placeholder="请输入设备编号查询" clearable maxlength="30"></el-input>
              <el-button @click="searchEvent">查询</el-button>
            </div>
          </el-form>
        </div>
        <div class="app-table">
          <el-table :data="dataList">
            <el-table-column prop="id" label="序号">
              <template scope="scope">
                <span>{{scope.$index+(page_cur - 1) * page_size + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="number" label="设备编号"></el-table-column>
            <el-table-column prop="location" label="位置"></el-table-column>
            <el-table-column prop="is_enter" label="是否在出入口">
              <template slot-scope="scope">
                <span
                  style="background: #5cb85c;color: #fff;border-radius: 3px;padding: 1px 4px;"
                  v-if="scope.row.is_enter==1"
                >是</span>
                <span
                  style="background: #d9534f;color: #fff;border-radius: 3px;padding: 1px 4px;"
                  v-else
                >否</span>
              </template>
            </el-table-column>
            <el-table-column prop="line" label="线路"></el-table-column>
            <el-table-column prop="company" label="公司名称"></el-table-column>
            <el-table-column prop="ip" label="IP地址"></el-table-column>
            <el-table-column prop="create_time" label="创建时间">
              <template slot-scope="scope">
                <p v-html="changeTime(scope.row.create_time)"></p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-blue" size="mini" @click="goEdit(scope.row.id)">修改</el-button>
                  <el-button class="btn-red" size="mini" @click="goDel(scope.row.id)">删除</el-button>
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
              <button @click="toFirstPage" type="button" class="btn-first">
                <span>首页</span>
              </button>
              <button @click="toLastPage" type="button" class="btn-last">
                <span>尾页</span>
              </button>
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- end table -->
    </div>
    <el-dialog
      width="700px"
      :close-on-click-modal="false"
      class="dialog-sebei"
      :title="this.diaLogTitle"
      :visible.sync="diaLogFormVisible"
    >
      <el-form
        class="el-form-custom"
        :model="detectorData"
        :rules="detectorRules"
        ref="detectorForm"
      >
        <el-form-item label="公司名称：" prop="depart_id">
          <el-select v-model="detectorData.depart_id" placeholder="请选择公司" clearable>
            <el-option
              v-for="item in companyList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称：" prop="name">
          <el-input v-model="detectorData.name" autocomplete="off" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="设备编号：" prop="number">
          <el-input v-model="detectorData.number" autocomplete="off" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="设定线路" prop="line_type">
          <el-select v-model="detectorData.line_type" placeholder="请选择" clearable>
            <el-option
              v-for="item in linTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IP地址：" prop="ip">
          <el-input v-model="detectorData.ip" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在位置：" class="el-form-item-inlines is-required">
          <el-form-item prop="start_flag" class="wall-errora">
            <b>DK</b>
            <el-input
              v-model="detectorData.start_flag"
              autocomplete="off"
              placeholder="公里"
              maxlength="4"
            ></el-input>
          </el-form-item>
          <el-form-item prop="start_length" class="wall-errorb">
            <b>+</b>
            <el-input
              v-model="detectorData.start_length"
              autocomplete="off"
              placeholder="米"
              maxlength="3"
            ></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="设备是否装在出入口：" prop="is_enter">
          <el-radio v-model="detectorData.is_enter" :label="1">是</el-radio>
          <el-radio v-model="detectorData.is_enter" :label="0">否</el-radio>
        </el-form-item>
        <div class="blank"></div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaLogFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="addOrEditDialog()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: 1,
      diaLogFormVisible: false,
      diaLogTitle: "添加信息",
      detectorData: {},
      detectorRules: {
        depart_id: [
          { required: true, message: "请选择公司", trigger: "change" }
        ],
        name: [
          {
            required: true,
            message: "请输入设备名称2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" },
           { pattern: /(^\S+).*(\S+$)/, message: "开始和结尾不能有空格", trigger: "blur" }
        ],
        number: [
          {
            required: true,
            message: "请输入设备编号2~20个字符",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在2到20个字符", trigger: "blur" }
        ],
        line_type: [
          { required: true, message: "请选择线路", trigger: "change" }
        ],
        ip: [
          {
            required: true,
            message: "请输入IP地址",
            trigger: "blur"
          },
          {
            pattern:
              "^((25[0-5]|2[0-4]\\d|[1]{1}\\d{1}\\d{1}|[1-9]{1}\\d{1}|\\d{1})($|(?!\\.$)\\.)){4}$",
            message: "请输入正确的IP地址",
            trigger: "blur"
          }
        ],
        start_flag: [
          {
            required: true,
            message: "请输入位置公里",
            trigger: "blur"
          },
          {
            pattern: /^\d{1,4}$/,
            message: "请输入1-4位正整数",
            trigger: "blur"
          }
        ],
        start_length: [
          {
            required: true,
            message: "请请输入位置米",
            trigger: "blur"
          },
          {
            pattern: /^\d{1,3}$/,
            message: "请输入1-3位正整数",
            trigger: "blur"
          }
        ],
        is_enter: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ]
      },
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      companyList: [],
      linTypeList: [],
      numberSearch: ""
    };
  },
  mounted() {
    document
      .querySelector("#app-menu-items #menu_location")
      .classList.add("is-active");
  },
  created() {
    this.getCompanyList();
    this.getLiTypeList();
    this.getDataList();
  },
  methods: {
      handleMenuSelect (index) {
   this.pageChange(1);
    },
    getCompanyList() {
      this.request({
        url: "/apply/getCompanyLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.companyList = data.data;
        }
      });
    },
    getLiTypeList() {
      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.linTypeList = data.data;
        }
      });
    },

    getDataList() {
      let page = this.page_cur;
      let number = this.numberSearch;
      this.request({
        url: "/location/getWallDetectorPages",
        method: "get",
        params: {
          page,
          number
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
    toFirstPage() {
      this.pageChange(1);
    },
    toLastPage() {
      this.page_cur = this.page_total;
      this.pageChange(this.page_total);
    },
    searchEvent() {
      this.page_cur = 1;
      this.getDataList();
    },
    //
    addDialogInfo() {
      this.detectorData = {
        depart_id: "",
        name: "",
        number: "",
        line_type: "",
        ip: "",
        start_flag: "",
        start_length: "",
        is_enter: ""
      };
      this.diaLogTitle = "添加墙壁探测器信息";
      this.diaLogFormVisible = true;
    },
    addOrEditDialog() {
      this.$refs["detectorForm"].validate(valid => {
        if (valid) {
          let data = this.detectorData;
          this.request({
            url: "/location/addOrEditWallDetector",
            method: "post",
            data: data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.diaLogFormVisible = false;
              this.detectorData.name = "";
              this.detectorData.description = "";
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
    goEdit(id) {
      this.diaLogTitle = "修改墙壁探测器信息";
      this.diaLogFormVisible = true;
      this.request({
        url: "/location/getWallDetector",
        method: "get",
        params: { id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.detectorData = data.data;
          this.detectorData.start_flag = parseInt(data.data.start_flag);
          this.detectorData.start_length = parseInt(data.data.start_length);
        }
      });
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
            url: "/location/deleteWallDetector",
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
    changeTime(time) {
      if (time !== null && time !== undefined && time !== "") {
        return (
          "<span style='display:block'>" +
          time.substring(0, 10) +
          "</span><span style='display:block'>" +
          time.substring(time.length - 8) +
          "</span>"
        );
      } else {
        return "";
      }
    }
    //
  }
};
</script>
<style >
.dialog-sebei .el-textarea__inner {
  border: 1px #9db9fa solid;
  color: #4b6eca;
  height: 100px;
}
.dialog-sebei .el-textarea {
  width: 100% !important;
}
.dialog-sebei .el-form-item__label {
  width: 170px;
}
.dialog-sebei .el-form-item__content {
  margin-left: 170px;
}
.dialog-sebei .el-form-item-inline .el-input--medium {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.dialog-sebei .el-form-item-inline input {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.dialog-sebei .el-select {
  width: 100%;
}
.el-form-item-inlines {
  display: inline-block;
}
.el-form-item-inlines .el-form-item {
  display: inline-block;
}
.el-form-item-inlines .el-form-item .el-form-item__content {
  margin-left: 0;
}
.el-form-item-inlines .el-input {
  width: 100px;
}
.el-form-item-inlines input {
  display: inline-block;
  width: 100px;
  text-align: center;
}
.el-form-item-inlines .el-form-item {
  margin-bottom: 1px !important;
}
.wall-errora .el-form-item__error{ padding-left: 23px;}
.wall-errorb .el-form-item__error{padding-left: 12px;}
</style>