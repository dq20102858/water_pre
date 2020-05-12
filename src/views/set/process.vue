<template>
  <div id="process">
    <div class="el-menu-top">
      <el-menu router default-active="process" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-set.png')" />设置
        </li>
        <el-menu-item index="set">站点设置</el-menu-item>
        <el-menu-item index="speed">限速设置</el-menu-item>
        <el-menu-item index="alert">防区设置</el-menu-item>
        <el-menu-item index="bridge">桥设置</el-menu-item>
        <el-menu-item index="tunnel">隧道设置</el-menu-item>
        <el-menu-item index="slope">坡度设置</el-menu-item>
        <el-menu-item index="process">项目工序</el-menu-item>
      </el-menu>
      <!-- <div @click="goDetail()">to apple</div> -->
    </div>
    <div class="app-page">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="app-page-container">
            <div class="app-page-select">
              <el-form :inline="true">
                <el-form-item>
                  <el-button type="primary" icon="el-icon-plus" @click="goAdd(4)">添加项目</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="app-table">
              <el-table :data="dataItemList">
                <el-table-column label="编号" prop="id"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column label="操作" width="68">
                  <template slot-scope="scope">
                    <div class="app-operation">
                      <!-- <el-button class="btn-blue" size="mini" @click="goEdit(scope.row.id)">修改</el-button> -->
                      <el-button class="btn-red" size="mini" @click="goDel(scope.row.id)">删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="app-page-container">
            <div class="app-page-select">
              <el-form :inline="true">
                <el-form-item>
                  <el-button type="primary" icon="el-icon-plus" @click="goAdd(5)">添加工序</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="app-table">
              <el-table :data="dataWorkSortList">
                <el-table-column label="编号" prop="id"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column label="操作" width="68">
                  <template slot-scope="scope">
                    <div class="app-operation">
                           <el-button class="btn-red" size="mini" @click="goDel(scope.row.id)">删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      width="400px"
      :close-on-click-modal="false"
      class="dialog-station"
      :title="this.diaLogTitle"
      :visible.sync="diaLogFormVisible"
    >
      <el-form class="el-form-custom" :model="formData" :rules="formRules" ref="formRules">
        <el-form-item label="名称：" prop="name" label-width="70px">
          <el-input v-model="formData.name" autocomplete="off" maxlength="20" show-word-limit></el-input>
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
      diaLogFormVisible: false,
      diaLogTitle: "添加信息",
      formData: {
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
        ]
      },
      itemType:4,
      dataItemList: [],
      dataWorkSortList: []
    };
  },
  created() {
    this.getItemList();
    this.getWorkSortLists();
  },
  methods: {
    getItemList() {
      this.request({
        url: "/set/getItemLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataItemList = data.data.data;
        }
      });
    },
    getWorkSortLists() {
      this.request({
        url: "/set/getWorkSortLists",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataWorkSortList = data.data.data;
        }
      });
    },
    goAdd(addtype) {
      this.formData = {
        name: ""
      };
      if (addtype == 4) {
        this.diaLogTitle = "添加项目信息";
      } else {
        this.diaLogTitle = "添加工序信息";
      }
      this.itemType=addtype;
      this.diaLogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["formRules"].clearValidate();
      });
    },
    addOrEditDialog() {
      const that = this;
      this.$refs["formRules"].validate(valid => {
        if (valid) {
          let data = that.formData;
          that.formData.type=this.itemType;
          this.request({
            url: "/set/addItem",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.diaLogFormVisible = false;
              this.formData.name = "";
              this.getItemList();
              this.getWorkSortLists();
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
   
    goDel(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "el-message-box-new"
      })
        .then(() => {
          this.request({
            url: "/set/deleteItem",
            method: "post",
            data: { id: id }
          }).then(res => {
            let data = res.data;
            if (data.status == 1) {
              this.getItemList();
              this.getWorkSortLists();
                 this.$message({
                type: "success",
                message: "删除成功！"
              });
            }
          });
        })
        .catch(() => {});
    },
  
    //
  }
};
</script>
<style>
#process  .app-page-container{min-height: 680px;}
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