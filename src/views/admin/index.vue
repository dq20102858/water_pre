<template>
  <div id="admins">
    <div class="el-menu-top">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-peple.png')" />人员管理
        </li>
        <el-menu-item index="1">公司列表</el-menu-item>
        <el-menu-item index="2">部门列表</el-menu-item>
        <el-menu-item index="3">职位列表</el-menu-item>
        <el-menu-item index="4">人员列表</el-menu-item>
      </el-menu>
    </div>
    <div id="company" v-show="companyShow">
      <div class="app-page">
        <div class="app-page-container">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item>
                <el-button type="primary" icon="el-icon-plus" @click="openAddCompany">添加公司</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="app-table">
            <el-table :data="companyLists">
              <el-table-column type="index" label="序号" align="center"></el-table-column>
              <el-table-column prop="name" label="公司名称" align="center"></el-table-column>
              <el-table-column prop="description" label="公司详情" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="color_tag" label="标签颜色" align="center"></el-table-column>
              <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
              <el-table-column prop="update_time" label="修改时间" align="center"></el-table-column>
              <el-table-column label="操作" width="140">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-blue" size="mini" @click="goDetail(scope.row.id)">修改</el-button>
                    <el-button class="btn-red" size="mini" @click="delProd(scope.row.id)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="goDetail(scope.row.id)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="delProd(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>-->
            </el-table>

            <!-- <div class="pagination">
          <el-pagination v-if="companyLists.length !== 0" background layout="prev, pager, next"
           :current-page="this.companyPage" :total="this.companyTotal"  @current-change="companyPageChange"></el-pagination>
            </div>-->
            <div class="app-pagination">
              <el-pagination
                class="pagination"
                v-if="companyLists.length !== 0"
                layout="slot,prev, pager, next,slot,total"
                :current-page="this.companyPage"
                :total="this.companyTotal"
                @current-change="companyPageChange"
                prev-text="上一页"
                next-text="下一页"
              >
                <button @click="companyFirstPage" type="button" class="btn-first">
                  <span>首页</span>
                </button>
                <button @click="companyLastPage" type="button" class="btn-last">
                  <span>尾页</span>
                </button>
              </el-pagination>
            </div>
          </div>

          <el-dialog
            width="580px"
            class="dialog-company"
            title="添加公司信息"
            :visible.sync="companyVisible"
            :close-on-click-modal="false"
          >
            <el-form
              :model="companyData"
              class="el-form-custom"
              :rules="companyAddRules"
              ref="companyRulesForm"
            >
              <el-form-item label="公司名称：" prop="name">
                <el-input v-model="companyData.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="标签颜色：">
                <el-select v-model="companyData.color">
                  <el-option label="默认" value="0"></el-option>
                  <el-option label="红色" value="1"></el-option>
                  <el-option label="橙色" value="2"></el-option>
                  <el-option label="黄色" value="3"></el-option>
                  <el-option label="绿色" value="4"></el-option>
                  <el-option label="青色" value="5"></el-option>
                  <el-option label="蓝色" value="6"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="公司详情：" prop="description">
                <el-input v-model="companyData.description" autocomplete="off" type="textarea"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="companyVisible = false">取 消</el-button>
              <el-button type="primary" @click="addCompany(1)">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <!-- departShow -->
    <div id="department" v-show="departShow">
      <div class="app-page">
        <div class="app-page-container">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item>
                <el-button type="primary" icon="el-icon-plus" @click="openAddDepart">添加部门</el-button>
              </el-form-item>
              <el-form-item label="公司" label-width="80px">
                <el-select v-model="pid">
                  <el-option
                    v-for="item in this.companySelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="form-so">
                <label class="el-form-item__label"></label>
                <el-button
                  size="small"
                  icon="el-icon-search"
                  @click="departSearchPage"
                  type="primary"
                >查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="app-table">
            <el-table :data="departLists" ref="multipleTable">
              <el-table-column type="index" label="序号" align="center"></el-table-column>
              <el-table-column prop="company" label="公司名称" align="center"></el-table-column>
              <el-table-column prop="name" label="部门名称" align="center"></el-table-column>
              <el-table-column label="是否属于施工队" align="center">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.is_work_team === 0">否</el-tag>
                  <el-tag v-else type="success">是</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="description" label="部门详情" width="200" align="center"></el-table-column>
              <el-table-column prop="create_time" label="创建时间" width="200" align="center"></el-table-column>
              <el-table-column prop="update_time" label="修改时间" width="200" align="center"></el-table-column>
              <el-table-column label="操作" width="140">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-blue" size="mini" @click="goDetail(scope.row.id)">修改</el-button>
                    <el-button class="btn-red" size="mini" @click="delProd(scope.row.id)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- <div class="pagination">
              <el-pagination
                v-if="departLists.length !== 0"
                background
                layout="prev, pager, next"
                :current-page="this.departPage"
                :total="this.departTotal"
                @current-change="departPageChange"
              ></el-pagination>
            </div>-->
            <div class="app-pagination">
              <el-pagination
                class="pagination"
                v-if="departLists.length !== 0"
                layout="slot,prev, pager, next,slot,total"
                :current-page="this.departPage"
                :total="this.departTotal"
                @current-change="departPageChange"
                prev-text="上一页"
                next-text="下一页"
              >
                <button @click="departFirstPage" type="button" class="btn-first">
                  <span>首页</span>
                </button>
                <button @click="departLastPage" type="button" class="btn-last">
                  <span>尾页</span>
                </button>
              </el-pagination>
            </div>
          </div>
          <el-dialog
            width="580px"
            class="dialog-company"
            title="添加部门信息"
            :visible.sync="departVisible"
            :close-on-click-modal="false"
          >
            <el-form
              :model="companyData"
              class="el-form-custom"
              :rules="departAddRules"
              ref="departRulesForm"
            >
              <el-form-item label="公司名称：" prop="pid">
                <el-select v-model="companyData.pid">
                  <el-option
                    v-for="item in this.companySelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门名称：" prop="name">
                <el-input v-model="companyData.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="是否属于施工队：" prop="is_work_team">
                <el-radio v-model="companyData.is_work_team" label="1">是</el-radio>
                <el-radio v-model="companyData.is_work_team" label="0">否</el-radio>
              </el-form-item>
              <el-form-item label="部门详情：" prop="description">
                <el-input v-model="companyData.description" autocomplete="off" type="textarea"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addDepart(2)">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <!-- postShow -->
    <div id="post" v-show="postShow">
      <div class="app-page">
        <div class="app-page-container">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item>
                <el-button type="primary" icon="el-icon-plus" @click="openAddPost">添加职位</el-button>
              </el-form-item>

              <el-form-item label="公司">
                <el-select v-model="pid" @change="getDepartLists(pid)">
                  <el-option
                    v-for="item in this.companySelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门">
                <el-select v-model="sub_pid" ref="departselectClear">
                  <el-option
                    v-for="item in this.departSelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="form-so">
                <label class="el-form-item__label"></label>
                <el-button size="small" icon="el-icon-search" type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="app-table">
            <el-table :data="postLists" ref="multipleTable">
              <el-table-column type="index" label="序号" align="center"></el-table-column>
              <el-table-column prop="company" label="公司名称" align="center"></el-table-column>
              <el-table-column prop="depart" label="部门名称" align="center"></el-table-column>
              <el-table-column prop="name" label="职位名称" align="center"></el-table-column>
              <el-table-column prop="description" label="职位详情" align="center"></el-table-column>
              <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
              <el-table-column prop="update_time" label="修改时间" align="center"></el-table-column>
              <el-table-column label="操作" width="140">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-blue" size="mini" @click="goDetail(scope.row.id)">修改</el-button>
                    <el-button class="btn-red" size="mini" @click="delProd(scope.row.id)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                v-if="postLists.length !== 0"
                background
                layout="prev, pager, next"
                :current-page="this.postPage"
                :total="this.postTotal"
                @current-change="postPageChange"
              ></el-pagination>
            </div>
          </div>
          <el-dialog
            width="580px"
            class="dialog-company"
            title="添加职位信息"
            :close-on-click-modal="false"
            :visible.sync="postVisible"
          >
            <el-form
              :model="companyData"
              class="el-form-custom"
              :rules="postAddRules"
              ref="postRulesForm"
            >
              <el-form-item label="公司名称：" prop="pid">
                <el-select v-model="companyData.pid" @change="getDepartLists($event)">
                  <el-option
                    v-for="item in this.companySelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门名称：" prop="sub_pid" ref="departselectClear">
                <el-select v-model="companyData.sub_pid">
                  <el-option
                    v-for="item in this.departSelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位名称：" prop="name">
                <el-input v-model="companyData.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="职位详情：" prop="description">
                <el-input v-model="companyData.description" autocomplete="off" type="textarea"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addPost(3)">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <!-- usersShow -->
    <div id="users" v-show="usersShow">
      <div class="app-page">
        <div class="app-page-container">
          <div class="app-page-select">
            <el-form :inline="true">
              <el-form-item>
                <el-button type="primary" icon="el-icon-plus" @click="openAddUser">添加人员</el-button>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="公司">
                <el-select v-model="pid" @change="getDepartLists(pid)">
                  <el-option
                    v-for="item in this.companySelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门">
                <el-select v-model="sub_pid" @change="getPostLists(sub_pid)">
                  <el-option
                    v-for="item in this.departSelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位">
                <el-select v-model="post_pid">
                  <el-option
                    v-for="item in this.postSelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="form-so">
                <label class="el-form-item__label"></label>
                <el-button size="small" icon="el-icon-search" type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="app-table">
            <el-table :data="adminLists">
              <el-table-column type="index" label="序号" align="center"></el-table-column>
              <el-table-column prop="user_name" label="用户名" align="center"></el-table-column>
              <el-table-column prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="company" label="公司" align="center"></el-table-column>
              <el-table-column prop="depart" label="部门" align="center"></el-table-column>
              <el-table-column prop="post" label="职位" align="center"></el-table-column>
              <el-table-column prop="create_time" label="邮箱" align="center"></el-table-column>
              <el-table-column prop="update_time" label="电话" align="center"></el-table-column>
              <el-table-column prop="dispatch_desc" label="调度信息" align="center"></el-table-column>
              <el-table-column label="操作" width="140">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-blue" size="mini" @click="goDetail(scope.row.id)">修改</el-button>
                    <el-button class="btn-red" size="mini" @click="delProd(scope.row.id)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                v-if="adminLists.length !== 0"
                background
                layout="prev, pager, next"
                :current-page="this.adminPage"
                :total="this.adminTotal"
                @current-change="adminPageChange"
              ></el-pagination>
            </div>
          </div>
          <el-dialog
            width="580px"
            class="dialog-company"
            title="添加人员"
            :close-on-click-modal="false"
            :visible.sync="usersVisible"
          >
            <el-form
              :model="userData"
              class="el-form-custom"
              :rules="userAddRules"
              ref="userRulesForm"
            >
              <el-form-item label="姓名：" prop="name">
                <el-input v-model="userData.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户名：" prop="user_name">
                <el-input v-model="userData.user_name" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="密码：" prop="password">
                <el-input v-model="userData.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="公司名称：" prop="company_id">
                <el-select v-model="userData.company_id" @change="getDepartLists">
                  <el-option
                    v-for="item in this.companySelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门名称：" prop="depart_id">
                <el-select v-model="userData.depart_id" @change="getPostLists">
                  <el-option
                    v-for="item in this.departSelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位名称：" prop="post_id">
                <el-select v-model="userData.post_id">
                  <el-option
                    v-for="item in this.postSelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱：">
                <el-input v-model="userData.email" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="调度信息：" prop="dispatch">
                <el-select v-model="userData.dispatch">
                  <el-option label="普通" value="1"></el-option>
                  <el-option label="司机" value="2"></el-option>
                  <el-option label="车长" value="3"></el-option>
                  <el-option label="值班调度" value="4"></el-option>
                  <el-option label="车站值班员" value="5"></el-option>
                  <el-option label="施工队长" value="6"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="手机号码：">
                <el-input v-model="companyData.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUserDo">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>

    <!-- end  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      companyLists: [],
      companyPage: 1,
      companyTotal: 0,
      companyPageTotal: 0,
      departLists: [],
      departPage: 1,
      departTotal: 0,
      departPageTotal: 0,
      postLists: [],
      postPage: 1,
      postTotal: 0,
      postPageTotal: 0,
      adminLists: [],
      adminPage: 1,
      adminTotal: 0,
      companyShow: true,
      companyVisible: false,
      companyData: {
        color: "默认"
      },
      companyAddRules: {
        name: [
          {
            required: true,
            message: "请输入公司名称2~30个字符",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ],
        description: [
          { min: 2, max: 500, message: "长度在2到500个字符", trigger: "blur" }
        ]
      },
      departAddRules: {
        pid: [
          {
            required: true,
            message: "请选择公司",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入部门名称2~30个字符",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ],
        is_work_team: [
          {
            required: true,
            message: "请选择施工队",
            trigger: "change"
          }
        ],
        description: [
          { min: 2, max: 500, message: "长度在2到500个字符", trigger: "blur" }
        ]
      },
      postAddRules: {
        pid: [
          {
            required: true,
            message: "请选择公司",
            trigger: "change"
          }
        ],
        sub_pid: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入职位名称2~30个字符",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ],
        description: [
          { min: 2, max: 500, message: "长度在2到500个字符", trigger: "blur" }
        ]
      },
      userAddRules: {
        name: [
          {
            required: true,
            message: "请输入姓名2~30个字符",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ],
        user_name: [
          {
            required: true,
            message: "请输入用户名2~30个字符",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ],
        company_id: [
          {
            required: true,
            message: "请选择公司",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码2~30个字符",
            trigger: "blur"
          },
          { min: 2, max: 30, message: "长度在2到30个字符", trigger: "blur" }
        ],
        depart_id: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change"
          }
        ],
        post_id: [
          {
            required: true,
            message: "请选择职位",
            trigger: "change"
          }
        ],
        dispatch: [
          {
            required: true,
            message: "请选择调度信息",
            trigger: "change"
          }
        ]
      },
      departShow: false,
      departVisible: false,
      postShow: false,
      postVisible: false,
      usersShow: false,
      usersVisible: false,
      pid: "",
      sub_pid: "",
      post_pid: "",
      companySelectLists: [],
      departSelectLists: [],
      postSelectLists: [],
      userData: {}
    };
  },
  created() {
    this.getPageLists(1);
  },
  methods: {
    handleSelect(key, keyPath) {
      this.pid = "";
      this.sub_pid = "";
      this.post_pid = "";
      if (key == 1) {
        this.companyShow = true;
        this.departShow = false;
        this.postShow = false;
        this.usersShow = false;
        this.getPageLists(1);
      } else if (key == 2) {
        this.companyShow = false;
        this.departShow = true;
        this.postShow = false;
        this.usersShow = false;
        this.getPageLists(2);
        this.getCompanyLists();
      } else if (key == 3) {
        this.companyShow = false;
        this.departShow = false;
        this.postShow = true;
        this.usersShow = false;
        this.getPageLists(3);
        this.getCompanyLists();
      } else {
        this.companyShow = false;
        this.departShow = false;
        this.postShow = false;
        this.usersShow = true;
        this.getCompanyLists();
        this.getAdminListsPage();
      }
    },
    getPageLists(type) {
      let page = 1;
      if (type == 1) {
        page = this.companyPage;
      } else if (type == 2) {
        page = this.departPage;
      } else {
        page = this.postPage;
      }
      this.request({
        url: "/company/getPageLists",
        method: "get",
        params: { page, type }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          if (type == 1) {
            this.companyLists = data.data.data;
            this.companyPage = parseInt(data.data.current_page);
            this.companyTotal = parseInt(data.data.total);
            this.companyPageTotal = parseInt(data.data.last_page);
          } else if (type == 2) {
            this.departLists = data.data.data;
            this.departPage = parseInt(data.data.current_page);
            this.departTotal = parseInt(data.data.total);
            this.departPageTotal = parseInt(data.data.last_page);
          } else {
            this.postLists = data.data.data;
            this.postPage = parseInt(data.data.current_page);
            this.postTotal = parseInt(data.data.total);
            this.postPageTotal = parseInt(data.data.last_page);
          }
        }
      });
    },
    //公司
    companyPageChange(value) {
      this.getPageLists(1);
      this.companyPage = value;
    },
    companyFirstPage() {
      this.companyPageChange(1);
    },
    companyLastPage() {
      this.companyPage = this.companyPageTotal;
      this.companyPageChange(this.companyPageTotal);
    },
    openAddCompany() {
      this.companyVisible = true;
    },
    addCompany(type) {
      this.$refs["companyRulesForm"].validate(valid => {
        if (valid) {
          this.companyData.type = type;
          let data = this.companyData;
          if (this.companyData.color == "默认") {
            this.companyData.color = 0;
          }
          this.request({
            url: "/company/addCompanyDo",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.companyVisible = false;
              this.departVisible = false;
              this.postVisible = false;
              this.getPageLists(type);
              this.companyData = {
                color: "默认"
              };
            }
          });
        }
      });
    },
    //部门
    departPageChange(value) {
      this.getPageLists(2);
      this.departPage = value;
    },
    departFirstPage() {
      this.departPageChange(1);
    },
    departLastPage() {
      this.departPage = this.departPageTotal;
      this.departPageChange(this.departPageTotal);
    },
    departSearchPage() {
      this.departPage = 1;
      this.getPageLists(2);
    },
    openAddDepart() {
      this.departVisible = true;
    },
    addDepart(type) {
      this.$refs["departRulesForm"].validate(valid => {
        if (valid) {
          this.companyData.type = type;
          let data = this.companyData;
          if (this.companyData.color == "默认") {
            this.companyData.color = 0;
          }
          this.request({
            url: "/company/addCompanyDo",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.companyVisible = false;
              this.departVisible = false;
              this.postVisible = false;
              this.getPageLists(type);
              this.companyData = {
                color: "默认"
              };
            }
          });
        }
      });
    },
    //职位
    postPageChange(value) {
      this.getPageLists(3);
      this.postPage = value;
    },
    openAddPost() {
      this.postVisible = true;
    },

    addPost(type) {
      this.$refs["postRulesForm"].validate(valid => {
        if (valid) {
          this.companyData.type = type;
          let data = this.companyData;
          if (this.companyData.color == "默认") {
            this.companyData.color = 0;
          }
          this.request({
            url: "/company/addCompanyDo",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.companyVisible = false;
              this.departVisible = false;
              this.postVisible = false;
              this.getPageLists(type);
              this.companyData = {
                color: "默认"
              };
            }
          });
        }
      });
    },
    //人员 userRulesForm
    getAdminListsPage() {
      let page = this.adminPage;
      this.request({
        url: "/user/getUserPage",
        method: "get",
        params: { page }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.adminLists = data.data.data;
        }
      });
    },
    openAddUser() {
      this.usersVisible = true;
    },
    addUserDo() {
      this.$refs["userRulesForm"].validate(valid => {
        if (valid) {
          let data = this.userData;
          this.request({
            url: "/user/addUser",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.usersVisible = false;
            }
          });
        }
      });
    },
    adminPageChange(value) {
      this.adminPage = value;
      this.getAdminListsPage();
    },

    //公司 部门 职位
    getCompanyLists() {
      let pid = 0;
      let type = 1;
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid, type }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.companySelectLists = data.data;
        }
      });
    },
    
    getDepartLists(val) {
      console.log("select_company_id：" + val);
      //this.companyData.sub_pid = null;
       //this.companyData.sub_pid= '';
      this.departSelectLists = [];
      console.log("this.companyData.sub_pid：" + this.companyData.sub_pid);
      let pid = val;
      let type = 2;
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid, type }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.departSelectLists = data.data;
        }
      });
    },
    getPostLists(pid) {
      // let pid = this.sub_pid;
      // if (pid == 0 || pid == "") {
      //   pid = this.companyData["sub_pid"];
      // }
      // if (pid == 0 || pid == "" || typeof pid == "undefined") {
      //   pid = this.userData["depart_id"];
      // }
      console.log("select_depart_id：" + pid);
      let type = 3;
      this.request({
        url: "/company/getDepartLists",
        method: "get",
        params: { pid, type }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.postSelectLists = data.data;
        }
        // this.sub_pid = "";
      });
    }
  },
  watch: {
    // companySelectLists: function(newValue) {
    //   this.companySelectLists = newValue;
    //   this.pid = null;
    //   this.sub_pid = null;
    //   this.companyData.pid=null;
    //   this.companyData.sub_pid=null;
    //     console.log('watch');
    // }
  }
  //
};
</script>

<style>
.admins .el-dialog {
  width: 500px !important;
}
.dialog-company .el-textarea {
  width: 100% !important;
}
.dialog-company .el-textarea__inner {
  height: 80px;
}
.dialog-company .el-form-item__label {
  width: 110px;
}
.dialog-company .el-form-item__content {
  margin-left: 110px;
}
.dialog-company .el-input--medium {
  width: 100%;
}
.dialog-company .el-select {
  width: 100%;
}
</style>
