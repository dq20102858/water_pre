<template>
  <div id="monitor">
    <div class="el-menu-top">
      <el-menu router default-active="set" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-set.png')" />设置
        </li>
        <el-menu-item index="set" @click="pageToFirst">站点设置</el-menu-item>
        <el-menu-item index="speed">限速设置</el-menu-item>
        <el-menu-item index="alerts">防区设置</el-menu-item>
        <el-menu-item index="bridge">桥设置</el-menu-item>
        <el-menu-item index="tunnel">隧道设置</el-menu-item>
        <el-menu-item index="slope">坡度设置</el-menu-item>
        <el-menu-item index="process">项目工序</el-menu-item>
      </el-menu>
      <!-- <div @click="goDetail()">to apple</div> -->
    </div>
    <div class="app-page">
      <div class="app-page-container">
        <div class="app-page-select">
          <el-form :inline="true">
            <el-form-item>
              <el-button type="primary" icon="el-icon-plus" @click="goAdd">添加站点</el-button>
            </el-form-item>
            <div class="el-serach">
              <el-input
                v-model="searchName"
                autocomplete="off"
                placeholder="请输入名称查询"
                clearable
                maxlength="20"
              ></el-input>
              <el-button @click="searchEvent">查询</el-button>
            </div>
          </el-form>
        </div>
        <div class="app-table">
          <el-table :data="dataList">
            <el-table-column label="序号">
              <template slot-scope="scope">
                <span>{{scope.$index+(page_cur - 1) * page_size + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="position" label="位置">
              <template slot-scope="scope">
                <b>DK</b>
                {{parseFloat(scope.row.start_flag)}} + {{parseFloat(scope.row.start_length)}}
              </template>
            </el-table-column>
            <el-table-column prop="type" label="站点类型">
              <template slot-scope="scope">
                <span v-show="scope.row.type==1">客运站</span>
                <span v-show="scope.row.type==2">中间站</span>
                <span v-show="scope.row.type==3">越行站</span>
              </template>
            </el-table-column>
            <el-table-column prop="line" label="线别"></el-table-column>
            <!-- <el-table-column prop="company" label="公司"></el-table-column> -->
            <el-table-column prop="create_time" label="创建时间">
              <template slot-scope="scope">
                <span class="time-warp">{{scope.row.create_time}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="update_time" label="修改时间">
              <template slot-scope="scope">
                <span class="time-warp">{{timestampToTime(scope.row.update_time)}}</span>
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
          width="700px"
          :close-on-click-modal="false"
          class="dialog-station"
          :title="this.diaLogTitle"
          :visible.sync="diaLogFormVisible"
        >
          <el-form class="el-form-custom" :model="formData" :rules="formRules" ref="formRules">
            <el-form-item label="名称：" prop="name">
              <el-input v-model="formData.name" autocomplete="off" maxlength="20" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="线别：" prop="line_type">
              <el-select
                v-model="formData.line_type"
                placeholder="请选择"
                @change="selectLineType($event)"
              >
                <el-option
                  v-for="item in lineTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <div class="el-form-item__error">{{lineTypeDes}}</div>
            </el-form-item>
            <el-form-item label="位置：" prop="position">
                <el-input v-model="formData.position" autocomplete="off" placeholder="请输入公里数+米数"></el-input>
            </el-form-item>
            <el-form-item label="类型：">
              <el-select v-model="formData.type">
                <el-option label="客运站" :value="1"></el-option>
                <el-option label="中间站" :value="2"></el-option>
                <el-option label="越行站" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序：" prop="sort" style="display:none">
              <el-input v-model="formData.sort" autocomplete="off" maxlength="3" show-word-limit></el-input>
            </el-form-item>
            <div class="blank"></div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="diaLogFormVisible = false">关闭</el-button>
            <el-button type="primary" @click="addOrEditDialog()">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      diaLogFormVisible: false,
      diaLogTitle: "添加信息",
      formData: {
        type: 1
      },
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
        line_type: [
          { required: true, message: "请选择线别", trigger: "change" }
        ],
        position: [
          {
            required: true,
            message: "请输入公里数+米数，比如12公里300米  等同 12300",
            trigger: "blur"
          },
          {
            pattern: /^\d{1,7}$/,
            message: "请输入1-7位正整数",
            trigger: "blur"
          }
        ],
        sort: [
          {
            pattern: /^\d{1,3}$/,
            message: "请输入1-3位正整数",
            trigger: "blur"
          }
        ]
      },
      page_cur: 1,
      page_data_total: 0,
      page_size: 20,
      page_total: 0,
      dataList: [],
      searchName: "",
      lineTypeStart: "",
      lineTypeEnd: "",
      lineTypeDes: "",
      lineTypeList: []
    };
  },
  created() {
    this.getLineTypeLists();
    this.getDataList();
  },
  methods: {
    getDataList() {
      let page = this.page_cur;
      let name = this.searchName;
      this.request({
        url: "/search/getStationPages",
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
    searchEvent() {
      this.page_cur = 1;
      this.getDataList();
    },
    getLineTypeLists() {
      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          let lineJson = data.data;
          var newArr = new Array();
          for (var i = 0; i < lineJson.length; i++) {
            var j = lineJson[i];
            if (j.id == 1) {
              newArr.push(j);
            }
          }
          this.lineTypeList = newArr;
        }
      });
    },
    selectLineType(value) {
      const that = this;
      this.lineTypeList.map((item, index) => {
        if (item.id == value) {
          that.lineTypeDes = "里程范围：" + item.tip;
          that.lineTypeStart = item.start;
          that.lineTypeEnd = item.end;
        }
      });
      console.log(this.lineTypeDes);
    },
    goAdd() {
      this.formData = {
        type: 1
      };
      this.diaLogTitle = "添加信息";
      this.diaLogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["formRules"].clearValidate();
      });
      this.lineTypeDes = "";
    },
    addOrEditDialog() {
      const that = this;
      this.$refs["formRules"].validate(valid => {
        if (valid) {
          let data = that.formData;
          let pnum = data.position;
          let lineStart = that.lineTypeStart * 1000;
          let lineEnd = that.lineTypeEnd * 1000;
          // if (parseInt( parseInt(m_start)>) {
          //   alert("num2 > num1！");
          //   return false;
          // }
          if (parseInt(pnum) < parseInt(lineStart)) {
            this.$message({
              message:
                "位置输入不在线别" + lineStart + "~" + lineEnd + "里程范围内",
              duration: 5000,
              type: "error"
            });

            return false;
          }
          if (parseInt(pnum) > parseInt(lineEnd)) {
            this.$message({
              message:
                "位置输入不在线别" + lineStart + "~" + lineEnd + "里程范围内",
              duration: 5000,
              type: "error"
            });
            return false;
          }
          this.request({
            url: "/search/addOrEditStaion",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.diaLogFormVisible = false;
              this.formData.name = "";
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
      this.diaLogTitle = "修改信息";
      this.diaLogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["formRules"].clearValidate();
      });
      this.request({
        url: "/search/getStationDetail",
        method: "get",
        params: { id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.formData = data.data;
          this.lineTypeList.map((item, index) => {
            if (item.id == data.data.line_type) {
              this.lineTypeDes = "里程范围：" + item.tip;
              this.lineTypeStart = item.start;
              this.lineTypeEnd = item.end;
              this.formData.position = parseFloat(data.data.position);
            }
          });
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
    timestampToTime(time) {
      // let time = row[column.property];
      if (time == null) {
        return null;
      }
      const date = new Date(time * 1000);
      let tt =
        [
          date.getFullYear(),
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1,
          date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        ].join("-") +
        "  " +
        [
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
        ].join(":");
      return tt;
    }
    //
  }
};
</script>
<style>
.dialog-station .el-textarea__inner {
  border: 1px #9db9fa solid;
  color: #4b6eca;
  height: 100px;
}
.dialog-station .el-textarea {
  width: 100% !important;
}
.dialog-station .el-form-item__label {
  width: 110px;
}
.dialog-station .el-form-item__content {
  margin-left: 110px;
}
.dialog-station .el-form-item-inline .el-input--medium {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.dialog-station .el-form-item-inline input {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.dialog-station .el-select {
  width: 100%;
}
</style>