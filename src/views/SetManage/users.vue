<template>
  <div class="app-set-page">
    <el-row :gutter="20" class="grid-menu">
      <el-col :xs="8" :sm="8" :md="8" :lg="3" :xl="3">
        <div  class="left-menu">
        <h5>设置</h5>
        <el-menu router class="el-menu-vertical-demo">
          <el-menu-item  class="is-active">
            <router-link to="/setmanage">用户设置</router-link>
          </el-menu-item>
          <el-menu-item>
            <router-link to="/setmanage/users">人员设置</router-link>
          </el-menu-item>
          <el-menu-item>
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
              <h3 class="ttitles">人员列表</h3>
            </el-form-item>
            <div class="el-serach noborder">
              <!-- <el-input v-model="searchName" autocomplete="off" placeholder="请输入名称查询" clearable></el-input> -->
              <el-button  @click="goAdd">添加</el-button>
            </div>
          </el-form>
        </div>
        <div class="app-table">
          <el-table :data="dataList">
            <el-table-column label="序号" width="80px">
              <template slot-scope="scope">{{scope.$index+(page_cur - 1) * page_size + 1}}</template>
            </el-table-column>
            <el-table-column prop="name" label="用户名"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="role" label="职位"></el-table-column>
               <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="phone" label="发布时间"></el-table-column>
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
          class="dialog-users"
          :title="this.diaLogTitle"
          :close-on-click-modal="false"
          :visible.sync="diaLogFormVisible"
        >
          <el-form
            :inline="true"
            :model="userData"
            class="el-form-custom"
            :rules="userAddRules"
            ref="userRulesForm"
          >
            <div class="el-form-item-inlinessddd">
              <el-form-item
                class="newitem"
                label="用户名："
                prop="user_name"
                v-if="this.userDialogTitle=='添加人员信息'"
              >
                <el-input v-model="userData.user_name" show-word-limit></el-input>
              </el-form-item>
              <el-form-item class="newitem" label="姓名：" prop="name">
                <el-input v-model="userData.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item class="newitem" label="公司名称：" prop="company_id">
                <el-select v-model="userData.company_id" @change="getDepartLists($event)">
                  <el-option
                    v-for="item in this.companySelectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                class="newitem"
                label="密码："
                prop="password"
                v-if="this.userDialogTitle=='添加人员信息'"
              >
                <el-input v-model="userData.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                class="newitem"
                label="密码："
                prop="passwordEdit"
                v-if="this.userDialogTitle=='修改人员信息'"
              >
                <el-input v-model="userData.passwordEdit" autocomplete="off" placeholder="不修改密码请留空"></el-input>
              </el-form-item>

              <el-form-item class="newitem" label="部门名称：" prop="depart_id">
                <el-select v-model="userData.depart_id" @change="getPostLists($event)">
                  <el-option
                    v-for="item in this.departSelectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="newitem" label="邮箱：" prop="email">
                <el-input v-model="userData.email" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item class="newitem" label="职位名称：" prop="post_id">
                <el-select v-model="userData.post_id">
                  <el-option
                    v-for="item in this.postSelectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="newitem" label="手机号码：" prop="phone">
                <el-input v-model="userData.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="头像上传：" style="width:100%;">
                <el-upload
                  ref="uploadfive"
                  class="avatar-uploader"
                  :action="uploadAction"
                  :auto-upload="true"
                  :on-exceed="uploadExceed"
                  :before-upload="uploadBefore"
                  :on-success="uploadSuccess"
                  :show-file-list="false"
                >
                  <img v-if="userData.avatar" :src="userData.avatar" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="用户角色：" prop="sys_role">
                <el-radio-group v-model="userData.sys_role" @change="changeSysrole($event)">
                  <el-radio :label="3">普通用户</el-radio>
                  <el-radio :label="1">管理员</el-radio>
                  <el-radio :label="2">业主方</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="用户职责：" class="checkbox-group" v-show="userData.sys_role==3">
                <el-checkbox-group v-model="userData.menus" @change="selectUuserMenu">
                  <el-checkbox
                    v-for="item in userMenuList"
                    :key="item.id"
                    :label="item.id+''"
                  >{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="userDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </div>
        </el-dialog>


        <el-dialog
          width="700px"
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
export default {
  data() {
    return {
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
      this.request({
        url: "/user/getUserPages",
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
    getArrText(arrs) {
      let results = "";
      let str = JSON.parse("[" + arrs + "]");
      let arr = str.sort((a, b) => {
        return a - b;
      });
      arr.map(item => {
        if (item == 1) {
          results += "<em class='m-tags'>施工队长</em>";
        } else if (item == 2) {
          results += "<em class='m-tags'>施工人员</em>";
        } else if (item == 3) {
          results += "<em class='m-tags'>行车</em>";
        }
      });
      return results;
    }
    //
  }
};
</script>
<style>
.app-set-page {
  padding: 20px;
}

</style>