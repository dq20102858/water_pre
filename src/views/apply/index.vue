<template>
  <div id="app-apply">
    <div class="el-menu-top">
      <el-menu router mode="horizontal">
        <li class="ptitle">{{projectName}}</li>
        <el-submenu index="1" class="is-active">
          <template slot="title">日班计划</template>
          <el-menu-item index="daychart">日班图表</el-menu-item>
          <el-menu-item class="is-active" index="apply">日班列表</el-menu-item>
          <el-menu-item index="conflictcheck">冲突检测</el-menu-item>
        </el-submenu>
        <el-menu-item index="weekplan">周计划</el-menu-item>
       <el-menu-item index="weekplanapply" v-if="sys_role==1">权限审批</el-menu-item>
      </el-menu>
    </div>

    <div class="app-page">
      <div class="app-page-container">
        <div class="app-page-select">
          <el-form :model="searchForm" :inline="true">
            <!-- <el-form-item class="form-add-item">
              <el-dropdown placement="bottom-start" @command="addHandleCommand">
                <el-button size="small" icon="el-icon-plus" type="primary">新增清点</el-button>
                <el-dropdown-menu slot="dropdown" style="width:110px;">
                  <el-dropdown-item command="A1">A1</el-dropdown-item>
                  <el-dropdown-item command="A2">A2</el-dropdown-item>
                  <el-dropdown-item command="A3">A3</el-dropdown-item>
                  <el-dropdown-item command="A4">A4</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item> -->
            <el-form-item label="公司">
              <el-select v-model="searchForm.depart_id" placeholder="请选择公司" clearable>
                <el-option
                  v-for="item in companyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="线别">
              <el-select v-model="searchForm.line_type" placeholder="请选择线别" clearable>
                <el-option
                  v-for="item in lineList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="searchForm.type" placeholder="请选择类型" clearable>
                <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="起始车站">
              <el-select v-model="searchForm.start_station" placeholder="请选择起始车站" clearable>
                <el-option
                  v-for="item in stationList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结束车站">
              <el-select v-model="searchForm.end_station" placeholder="请选择结束车站" clearable>
                <el-option
                  v-for="item in stationList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
                <el-option
                  v-for="item in statusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker
                v-model="searchForm.time_range"
                type="daterange"
                range-separator="至"
                start-placeholder="选择开始日期"
                end-placeholder="选择结束日期"
                :default-time="['00:00:00', '23:59:59']"
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
        <!-- <div class="page-count">找到{{pageTotal}}条相关作业令</div> -->
        <!-- end search -->
        <div class="app-table">
          <el-table :data="dataList">
            <el-table-column prop="number" label="作业编号"></el-table-column>
            <el-table-column prop="command_num" label="作业令号"></el-table-column>
            <el-table-column prop="description" label="作业内容" show-overflow-tooltip></el-table-column>
               <el-table-column prop="company" label="公司简称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="当前状态" width="80" align="center">
              <template slot-scope="scope">
                <span class="statuse1" v-if="scope.row.status=='未批复'">未批复</span>
                <span class="statuse2" v-if="scope.row.status=='同意'">同意</span>
                <span class="statuse3" v-if="scope.row.status=='拒绝'">拒绝</span>
                <span class="statuse4" v-if="scope.row.status=='已完成'">完成</span>
                <span class="statuse6" v-if="scope.row.status=='已销点'">已销点</span>
                <span class="statuse1" v-if="scope.row.status=='注销'">注销</span>
              </template>
            </el-table-column>

            <el-table-column prop="next_status" label="下一步状态" width="100" align="center"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="150"></el-table-column>
            <el-table-column label="操作" width="125">
              <template slot-scope="scope">
                <div class="app-operation">
                  <span v-if="can_check==1">
                    <el-button
                      v-if="scope.row.status=='未批复'"
                      class="btn-red"
                      size="mini"
                      @click="goApply(scope.row.id,scope.row.company)"
                    >审批</el-button>
                    <el-button
                      v-if="scope.row.status=='已销点'"
                      class="btn-red"
                      size="mini"
                      @click="goApplyOk(scope.row.id,scope.row.company)"
                    >完成</el-button>
                    <el-button
                      v-if="scope.row.status=='已完成'"
                      class="btn-red"
                      size="mini"
                      @click="goApplyNo(scope.row.id,scope.row.company)"
                    >注销</el-button>
                  </span>
                  <el-button
                    class="btn-blue"
                    size="mini"
                    @click="goDetail(scope.row.id,scope.row.type)"
                  >详情</el-button>
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
        <!-- end table -->
      </div>
    </div>
    <el-dialog class="dialogStyle" title="审批" :visible.sync="dialogVisible" width="300px" center>
      <span>请选择审批状态？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="applyClick(dialogId,2)">同意</el-button>
        <el-button @click="applyClick(dialogId,3)">拒绝</el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="dialogStyle"
      title="完成审批"
      :visible.sync="dialogVisibleOk"
      width="300px"
      center
    >
      <span>您确定任务已完成？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="applyClick(dialogId,4)">确定</el-button>
        <el-button @click="dialogVisibleOk=false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="dialogStyle"
      title="注销审批"
      :visible.sync="dialogVisibleNo"
      width="300px"
      center
    >
      <span>您确定注销此任务？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="applyClick(dialogId,6)">确定</el-button>
        <el-button @click="dialogVisibleNo=false">取消</el-button>
      </span>
    </el-dialog>

    <!-- A1 A2 -->

    <!-- END  A1 A2 -->
    <div v-if="diaLogFormVisible">
      <el-dialog
        width="1000px"
        :close-on-click-modal="false"
        class="dialog-applys"
        :title="this.diaLogTitle"
        :visible.sync="diaLogFormVisible"
      >
        <el-form
          :inline="true"
          class="el-form-custom"
          :model="formData"
          :rules="formRules"
          ref="formRulesRef"
        >
          <fieldset>
            <el-form-item class="company" label="施工单位：" prop="company_id" label-width="100px">
              <el-select
                v-model="formData.company_id"
                filterable
                placeholder="请选择"
                @change="selectCompanyList($event)"
              >
                <el-option
                  v-for="item in companyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <div class="el-form-item-block">
              <el-form-item label="   " label-width="100px">
                <el-checkbox v-model="formData.is_need_car" border>是否需要动车</el-checkbox>
              </el-form-item>
              <el-form-item label="   " label-width="42px">
                <el-checkbox v-model="formData.is_need_fire" border>是否需要动火</el-checkbox>
              </el-form-item>
              <el-form-item label="   " label-width="65px">
                <el-checkbox v-model="formData.is_need_help" border>是否需要帮助</el-checkbox>
              </el-form-item>
              <el-form-item label="   " label-width="52px">
                <el-checkbox v-model="formData.is_need_break_ele" border>是否需要断电</el-checkbox>
              </el-form-item>
            </div>
          </fieldset>
          <fieldset>
            <legend>人员信息</legend>
            <div class="el-form-item-block">
              <el-form-item label="联系人：" label-width="100px" prop="contact">
                <el-select
                  v-model="formData.contact"
                  filterable
                  placeholder="请选择"
                  @change="selectUserList($event,'phone')"
                >
                  <el-option
                    v-for="item in objUserList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电话：" prop="phone" label-width="60px">
                <el-input v-model="formData.phone"></el-input>
              </el-form-item>
              <el-form-item label="负责人：" prop="p_in_charge" label-width="125px">
                <el-select
                  v-model="formData.p_in_charge"
                  filterable
                  placeholder="请选择"
                  @change="selectUserList($event,'p_in_charge_phone')"
                >
                  <el-option
                    v-for="item in objUserList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电话：" prop="p_in_charge_phone" label-width="60px">
                <el-input v-model="formData.p_in_charge_phone"></el-input>
              </el-form-item>
            </div>
            <div class="el-form-item-block">
              <el-form-item label="承运人：" label-width="100px">
                <el-select
                  v-model="formData.carrier"
                  filterable
                  placeholder="请选择"
                  @change="selectUserList($event,'carrier_phone')"
                >
                  <el-option
                    v-for="item in objUserList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电话：" label-width="60px">
                <el-input v-model="formData.carrier_phone"></el-input>
              </el-form-item>
              <el-form-item label="监理人：" label-width="125px">
                <el-select
                  v-model="formData.supervisor"
                  filterable
                  placeholder="请选择"
                  @change="selectUserList($event,'supervisor_phone')"
                >
                  <el-option
                    v-for="item in objUserList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电话：" label-width="60px">
                <el-input v-model="formData.supervisor_phone"></el-input>
              </el-form-item>
            </div>
            <div class="el-form-item-block">
              <div class="el-form-item-block-item" v-for="(hitem, index) in formData.holders">
                <el-form-item
                  label-width="100px"
                  label="持证人："
                  :prop="'holders.' + index + '.name'"
                  :rules="{ required: true, message: '请选择持证人', trigger: 'change' }"
                >
                  <el-select
                    v-model="hitem.name"
                    filterable
                    placeholder="请选择"
                    @change="selectUserListHolder($event,hitem)"
                  >
                    <el-option
                      v-for="item in objUserList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label-width="60px"
                  label="电话："
                  :prop="'holders.' + index + '.phone'"
                  :rules="{required: true, message: '请输入持证人电话', trigger: 'change'}"
                >
                  <el-input v-model="hitem.phone">
                    <el-button
                      v-if="index==0"
                      title="删除"
                      style="padding:10px 5px"
                      slot="append"
                      icon="el-icon-plus"
                      @click.prevent="addHolders"
                    ></el-button>
                    <el-button
                      v-if="index>0"
                      title="删除"
                      style="padding:10px 5px"
                      slot="append"
                      icon="el-icon-delete"
                      @click.prevent="removeHolders(hitem)"
                    ></el-button>
                  </el-input>
                </el-form-item>
              </div>
            </div>
            <div class="el-form-item-block">
              <el-form-item label="作业人数：" prop="worker_num" label-width="100px">
                <el-input v-model="formData.worker_num"></el-input>
              </el-form-item>
              <el-form-item label-width="10px">
                <div class="additem">
                  <!-- <el-button
                type="primary" plain 
                title="添加"
                icon="el-icon-plus"
                @click.prevent="addHolders"
                  >添加持证人</el-button>-->
                  <el-button
                    type="primary"
                    plain
                    title="添加"
                    icon="el-icon-plus"
                    @click.prevent="addWorker"
                  >添加施工人员</el-button>
                </div>
              </el-form-item>
            </div>
            <div class="el-form-item-block">
              <div class="el-form-item-block-item" v-for="(witem, index) in formData.worker">
                <el-form-item
                  label-width="100px"
                  label="施工人："
                  :prop="'worker.' + index + '.name'"
                  :rules="{ required: true, message: '请选择施工人', trigger: 'change' }"
                >
                  <el-select
                    v-model="witem.name"
                    filterable
                    placeholder="请选择"
                    @change="selectUserListWorker($event,witem)"
                  >
                    <el-option
                      v-for="item in objUserList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label-width="60px"
                  label="电话："
                  :prop="'worker.' + index + '.phone'"
                  :rules="{required: true, message: '请输入施工人电话', trigger: 'change'}"
                >
                  <el-input v-model="witem.phone">
                    <el-button
                      title="删除"
                      style="padding:10px 5px"
                      slot="append"
                      icon="el-icon-delete"
                      @click.prevent="removeWorker(witem)"
                    ></el-button>
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </fieldset>
          <!---2 -->

          <el-form-item class="istextarea" label="计划内容：" label-width="110px" prop="description">
            <el-input
              v-model="formData.description"
              autocomplete="off"
              type="textarea"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
          <div class="blank"></div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="diaLogFormVisible = false">关闭</el-button>
          <el-button type="primary" @click="addDailyApplyDialog()">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- END  A3 A4 -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import detailForm from "./applydetail.vue";
export default {
  data() {
    return {
      projectName: "",
      page_cur: 1,
      pageTotal: 0,
      page_size: 20,
      page_total: 0,
      companyList: [],
      lineList: [],
      typeList: [
        { id: "A1", name: "A1" },
        { id: "A2", name: "A2" },
        { id: "A3", name: "A3" },
        { id: "A4", name: "A4" }
      ],
      stationList: [],
      statusList: [
        { id: 1, name: "未批复" },
        { id: 2, name: "同意" },
        { id: 3, name: "拒绝" },
        { id: 4, name: "完成" },
        { id: 5, name: "已销点" },
        { id: 6, name: "注销" }
      ],
      dataList: [],
      searchForm: {
        depart_id: "",
        line_type: "",
        type: "",
        start_station: "",
        end_station: "",
        time_range: [],
        status: ""
      },
      dialogVisible: false,
      dialogVisibleOk: false,
      dialogVisibleNo: false,
      dialogId: 0,
      dialogContent: "",
      can_check: 0,
      diaLogFormVisible: false,
      diaLogTitle: "添加信息",
      formData: {
        holders: [
          {
            name: "",
            phone: ""
          }
        ],
        worker: []
      },
      formRules: {
        company_id: [
          { required: true, message: "请选择施工单位", trigger: "change" }
        ],
        contact: [
          { required: true, message: "请选择联系人", trigger: "change" }
        ],
        phone: [
          {
            required: true,
            message: "请输入联系人电话",
            trigger: "change"
          }
        ],
        p_in_charge: [
          { required: true, message: "请选择负责人", trigger: "change" }
        ],
        p_in_charge_phone: [
          {
            required: true,
            message: "请输入负责人电话",
            trigger: "change"
          }
        ],
        worker_num: [
          {
            required: true,
            message: "请输入作业人数",
            trigger: "blur"
          },
          {
            pattern: /^\d{1,5}$/,
            message: "请输入1-5位正整数",
            trigger: "blur"
          }
        ]
        // holder_phone: [
        //   {
        //     required: true,
        //     message: "请输入持证人电话",
        //     trigger: "change"
        //   }
        // ]
      },
      objUserList: [],
      dynamicValidateForm: {
        holders: [
          {
            name: "",
            phone: ""
          }
        ]
      }
    };
  },
   computed: {
    ...mapGetters(["sys_role", "roles"])
  },
  created() {
    this.getProjectName();
    this.getDataList();
    this.getCompanyList();
    this.getLineType(); //线别
    this.getStationList(); //车站
  },
  methods: {
    getProjectName() {
      this.request({
        url: "/common/getItemDetail",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.projectName = data.data.name;
          localStorage.setItem("projectName", data.data.name);
        }
      });
    },

    getDataList() {
      let page = this.page_cur;
      let depart_id = this.searchForm.depart_id;
      let line_type = this.searchForm.line_type;
      let type = this.searchForm.type;
      let start_station = this.searchForm.start_station;
      let end_station = this.searchForm.end_station;
      let time_range = this.searchForm.time_range;
      let status = this.searchForm.status;
      this.request({
        url: "/apply/getApplyPages",
        method: "get",
        params: {
          page,
          depart_id,
          line_type,
          type,
          start_station,
          end_station,
          time_range,
          status
        }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.dataList = data.data.data;
          this.can_check = parseInt(data.data.can_check);
          console.log(this.can_check);
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
      this.searchForm = {};
      this.page_cur = 1;
      this.getDataList();
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
    getLineType() {
      this.request({
        url: "/common/getLineType",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.lineList = data.data;
        }
      });
    },
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
    goDetail(id, type) {
      let laytitle = "";
      if (type == "A1" || type == "A2") {
        laytitle = "轨行区及施工作业许可证";
      } else {
        laytitle = this.projectName + "进场作业许可证";
      }
      this.$layer.iframe({
        area: ["85%", "90%"],
        title: laytitle,
        shadeClose: false,
        scrollbar: false,
        content: {
          content: detailForm,
          parent: this,
          data: { iframeData: { id: id, titles: laytitle } }
        }
      });
    },
    goApply(id, company) {
      this.dialogVisible = true;
      this.dialogId = id;
      this.dialogContent = company;
    },
    goApplyOk(id, company) {
      this.dialogVisibleOk = true;
      this.dialogId = id;
      this.dialogContent = company;
    },
    goApplyNo(id, company) {
      this.dialogVisibleNo = true;
      this.dialogId = id;
      this.dialogContent = company;
    },
    applyClick(id, status) {
      this.request({
        url: "/apply/changeStatus",
        method: "POST",
        data: { id: id, status: status }
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.$message({
            type: "success",
            message: "恭喜您，操作成功"
          });
          this.dialogVisible = false;
          this.dialogVisibleOk = false;
          this.dialogVisibleNo = false;
          this.getDataList();
        } else {
          this.$message({
            type: "success",
            message: "审批失败"
          });
          this.dialogVisible = false;
          this.dialogVisibleOk = false;
          this.dialogVisibleNo = false;
        }
      });
    },
    // 添加
    selectCompanyList(val) {
      this.$set(this.formData, "contact", ""); //联系人清空
      this.request({
        url: "/user/getUserByDepart",
        method: "get",
        params: { id: val, type: 1 }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.objUserList = data.data;
        }
      });
    },
    selectUserList(event, params) {
      let obj = {};
      obj = this.objUserList.find(item => {
        return item.id === event;
      });
      console.log(obj);
      this.$set(this.formData, params, obj.phone);
    },

    addHandleCommand(command) {
      if (command == "A1" || command == "A2") {
        this.diaLogTitle = "添加信息";
        this.diaLogFormVisible = true;
        this.formData = {
          holders: [
            {
              name: "",
              phone: ""
            }
          ],
          worker: []
        };
      }
    },
    selectUserListHolder(event, params) {
      let obj = {};
      obj = this.objUserList.find(item => {
        return item.id === event;
      });
      this.$set(params, "phone", obj.phone);
    },

    removeHolders(item) {
      var index = this.formData.holders.indexOf(item);
      if (index !== -1) {
        this.formData.holders.splice(index, 1);
      }
    },
    addHolders() {
      this.formData.holders.push({
        name: "",
        phone: ""
      });
    },
    //
    selectUserListWorker(event, params) {
      let obj = {};
      obj = this.objUserList.find(item => {
        return item.id === event;
      });
      this.$set(params, "phone", obj.phone);
    },

    removeWorker(item) {
      var index = this.formData.worker.indexOf(item);
      if (index !== -1) {
        this.formData.worker.splice(index, 1);
      }
    },
    addWorker() {
      this.formData.worker.push({
        name: "",
        phone: ""
      });
    },

    addDailyApplyDialog() {
      this.$refs["formRulesRef"].validate(valid => {
        if (valid) {
          let data = this.formData;
          console.log(JSON.stringify(data));
          console.log(this.formData.holders);
        }
      });
    }
    // End 添加
  }
};
</script>
<style>
.el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
  min-width: 124px;
  text-align: center;
  padding: 0;
}
.el-menu--horizontal .el-menu .el-menu-item.is-active,
.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {
  background: #4b6eca;
  color: #fff;
}
.page-count {
  text-align: right;
  color: #1d397a;
  padding-bottom: 20px;
}
#app-apply .el-dialog__footer {
  text-align: center;
}
.confirmButtonClass {
  font-size: 14px;
  padding: 8px 15px;
  background: #ff5c75 !important;
  border-color: #ff5c75 !important;
  margin-left: 15px !important;
}
.cancelButtonClass {
  padding: 8px 15px;
  font-size: 14px;
  background: #1d397a;
  border-color: #1d397a;
  color: #fff;
}
.cancelButtonClass:hover {
  background: #1d397a;
  border-color: #1d397a;
  color: #fff;
}
.dialogStyle .el-button--medium {
  padding: 7px 20px;
}
.statuse2 {
  color: #029b02;
}
.statuse3 {
  color: #ff5c75;
}
.statuse4 {
  color: #0a0693;
}
.statuse6 {
  color: #4072d1;
}

/*dialog  */
.dialog-applys .el-dialog__body {
  padding: 30px 30px 0 30px;
}
.dialog-applys b {
  font-weight: 500;
}
.dialog-applys .el-textarea__inner {
  border: 1px #9db9fa solid;
  color: #4b6eca;
  height: 55px;
  width: 780px;
}
.dialog-applys .el-textarea {
  width: 100%;
}
.dialog-applys .el-form-item-inline .el-input--medium {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.dialog-applys .el-form-item-inline input {
  display: inline-block;
  width: 80px;
  text-align: center;
}
.dialog-applys .el-form-item__label {
  padding-right: 0;
}
.dialog-applys .el-select {
  width: 120px;
}
.dialog-applys .company input,
.dialog-applys .company .el-select {
  width: 350px;
}
.dialog-applys input {
  width: 130px;
}
.dialog-applys .el-date-editor input {
  width: 130px;
}
.dialog-applys .el-date-editor.el-input {
  width: 130px;
}
.dialog-applys b {
  padding-right: 8px;
}
.dialog-applys fieldset {
  border: 1px #9db9fa solid;
  margin-bottom: 15px;
  border-radius: 3px;
  padding: 15px 5px 0 5px;
}
.dialog-applys fieldset legend {
  font-size: 16px;
  color: #4b6eca;
  padding: 0 10px;
}
.dialog-applys .el-form-item-block {
  display: block;
}
.dialog-applys .el-form-item-inlines {
  display: inline-block;
}
.dialog-applys .el-form-item-inlines .el-form-item {
  display: inline-block;
}
.dialog-applys .el-form-item-inlines .el-form-item .el-form-item__content {
  margin-left: 0;
}
.dialog-applys .el-form-item-inlines .el-input {
  width: 72px;
}
.dialog-applys .el-form-item-inlines input {
  display: inline-block;
  width: 72px;
  text-align: center;
}
.dialog-applys .el-form-item-inlines .el-form-item {
  margin-bottom: 1px !important;
}
.dialog-applys .dateinput input {
  width: 180px;
}
.dialog-applys .el-checkbox.is-bordered {
  width: 150px;
  border: 1px solid #9db9fa !important;
  padding-top: 9px;
  border-radius: 2px;
}
.dialog-applys .dateinput .el-select {
  width: 180px;
}
.dialog-applys .dateinput .el-form-item__content {
  width: 180px;
}
.dialog-applys .el-input-group__append {
  padding: 0 7px 0 20px;
  border: 1px solid #9db9fa;
  border-left: 0;
  border-radius: 2px;
}
.dialog-applys .el-input-group__append button {
  border: 0;
}
.dialog-applys .el-input-group__append .addicon {
  color: #4b6eca;
  border-radius: 0;
  font-weight: 700;
  font-size: 18px;
}

.dialog-applys .istextarea {
  margin-right: 0 !important;
}
.dialog-applys .istextarea .el-textarea__inner {
  width: 825px;
}
.dialog-applys .lengtherror .el-form-item__error {
  padding-left: 20px;
}
.el-form-item-block-item {
  display: inline-block;
}

.dialog-applys .additem {
  padding-left: 50px;
}
.dialog-applys .additem button {
  display: inline-block;
  width: 130px;
  padding: 10px;
  border-radius: 2px;
}
</style>
