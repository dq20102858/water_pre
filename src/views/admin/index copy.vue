<template>
  <div id="admins">
    <div class="el-menu-top">
      <el-menu router default-active="admin" mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-peple.png')" />人员管理
        </li>
        <el-menu-item index="admin">公司列表</el-menu-item>
        <el-menu-item index="departlist">部门列表</el-menu-item>
        <el-menu-item index="postlist">职位列表</el-menu-item>
        <el-menu-item index="userlist">人员列表</el-menu-item>
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
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-blue" size="mini" @click="detailCompany(scope.row.id)">修改</el-button>
                    <el-button class="btn-red" size="mini" @click="delCompany(scope.row.id)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="app-pagination">
              <el-pagination
                class="pagination"
                v-if="companyLists.length !== 0"
                layout="slot,prev, pager, next,slot,total"
                :page-size="companyPage_size"
                :current-page="this.companyPage_cur"
                :total="this.companyPage_items"
                @current-change="companyChangePage"
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
            :title="companyDialogTitle"
            :visible.sync="companyDialogVisible"
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
                  <el-option label="默认" :value="0"></el-option>
                  <el-option label="红色" :value="1"></el-option>
                  <el-option label="橙色" :value="2"></el-option>
                  <el-option label="黄色" :value="3"></el-option>
                  <el-option label="绿色" :value="4"></el-option>
                  <el-option label="青色" :value="5"></el-option>
                  <el-option label="蓝色" :value="6"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="公司详情：" prop="description">
                <el-input v-model="companyData.description" autocomplete="off" type="textarea"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="companyDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addCompany()">确 定</el-button>
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
                <el-select v-model="search_pid" clearable>
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
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-blue" size="mini" @click="detailDepart(scope.row.id)">修改</el-button>
                    <el-button class="btn-red" size="mini" @click="delDepart(scope.row.id)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="app-pagination">
              <el-pagination
                class="pagination"
                v-if="departLists.length !== 0"
                layout="slot,prev, pager, next,slot,total"
                :page-size="departPage_size"
                :current-page="this.departPage_cur"
                :total="this.departPage_items"
                @current-change="departChangePage"
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
            :title="departDialogTitle"
            :visible.sync="departDialogVisible"
            :close-on-click-modal="false"
          >
            <el-form
              :model="departData"
              class="el-form-custom"
              :rules="departAddRules"
              ref="departRulesForm"
            >
              <el-form-item label="公司名称：" prop="pid" v-if="departDialogTitle=='添加部门信息'">
                <el-select v-model="departData.pid">
                  <el-option
                    v-for="item in this.companySelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门名称：" prop="name">
                <el-input v-model="departData.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="是否属于施工队：" prop="is_work_team">
                <el-radio-group v-model="departData.is_work_team">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="部门详情：" prop="description">
                <el-input v-model="departData.description" autocomplete="off" type="textarea"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="departDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addDepart()">确 定</el-button>
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
                <el-select v-model="post_search_pid" ref="departselectClear">
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
                <el-button
                  size="small"
                  icon="el-icon-search"
                  type="primary"
                  @click="postSearchPage"
                >查询</el-button>
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
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-blue" size="mini" @click="detailPost(scope.row.id)">修改</el-button>
                    <el-button class="btn-red" size="mini" @click="delPost(scope.row.id)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="app-pagination">
              <el-pagination
                class="pagination"
                v-if="postLists.length !== 0"
                layout="slot,prev, pager, next,slot,total"
                :page-size="postPage_size"
                :current-page="this.postPage_cur"
                :total="this.postPage_items"
                @current-change="postChangePage"
                prev-text="上一页"
                next-text="下一页"
              >
                <button @click="postFirstPage" type="button" class="btn-first">
                  <span>首页</span>
                </button>
                <button @click="postLastPage" type="button" class="btn-last">
                  <span>尾页</span>
                </button>
              </el-pagination>
            </div>
          </div>
          <el-dialog
            width="580px"
            class="dialog-company"
            title="添加职位信息"
            :close-on-click-modal="false"
            :visible.sync="postDialogVisible"
          >
            <el-form
              :model="postData"
              class="el-form-custom"
              :rules="postAddRules"
              ref="postRulesForm"
            >
              <el-form-item label="公司名称：" prop="pid" v-if="postDialogTitle=='添加职位信息'">
                <el-select v-model="postData.pid" @change="getDepartLists($event)">
                  <el-option
                    v-for="item in this.companySelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="部门名称："
                prop="sub_pid"
                ref="departselectClear"
                v-if="postDialogTitle=='添加职位信息'"
              >
                <el-select v-model="postData.sub_pid">
                  <el-option
                    v-for="item in this.departSelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位名称：" prop="name">
                <el-input v-model="postData.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="职位详情：" prop="description">
                <el-input v-model="postData.description" autocomplete="off" type="textarea"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="postDialogVisible = false">取 消</el-button>
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
                <el-input v-model="userSearch.user_name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="公司">
                <el-select
                  v-model="userSearch.company_id"
                  @change="getDepartLists($event)"
                  clearable
                >
                  <el-option
                    v-for="item in this.companySelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门">
                <el-select v-model="userSearch.depart_id" @change="getPostLists($event)" clearable>
                  <el-option
                    v-for="item in this.departSelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位">
                <el-select v-model="userSearch.post_id" clearable>
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
                <el-button
                  size="small"
                  icon="el-icon-search"
                  type="primary"
                  @click="getAdminListsPage"
                >查询</el-button>
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
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-blue" size="mini" @click="detailUser(scope.row.id)">修改</el-button>
                    <el-button class="btn-red" size="mini" @click="delUser(scope.row.id)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="app-pagination">
              <el-pagination
                class="pagination"
                v-if="companyLists.length !== 0"
                layout="slot,prev, pager, next,slot,total"
                :page-size="companyPage_size"
                :current-page="this.companyPage_cur"
                :total="this.companyPage_items"
                @current-change="userChangePage"
                prev-text="上一页"
                next-text="下一页"
              >
                <button @click="userFirstPage" type="button" class="btn-first">
                  <span>首页</span>
                </button>
                <button @click="userLastPage" type="button" class="btn-last">
                  <span>尾页</span>
                </button>
              </el-pagination>
            </div>
          </div>
          <el-dialog
            width="580px"
            class="dialog-company"
            :title="this.userDialogTitle"
            :close-on-click-modal="false"
            :visible.sync="userDialogVisible"
          >
            <el-form
              :model="userData"
              class="el-form-custom"
              :rules="userAddRules"
              ref="userRulesForm"
            >
              <el-form-item label="用户名：" prop="user_name" v-if="this.userDialogTitle=='添加人员信息'">
                <el-input v-model="userData.user_name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="password">
                <el-input v-model="userData.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="姓名：" prop="name">
                <el-input v-model="userData.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="公司名称：" prop="company_id">
                <p>{{userData.company_id}}</p>
                <el-select v-model="userData.company_id" @change="getDepartLists($event)">
                  <el-option
                    v-for="item in this.companySelectLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门名称：" prop="depart_id">
                <el-select v-model="userData.depart_id" @change="getPostLists($event)">
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
              <el-button @click="userDialogVisible = false">取 消</el-button>
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
      companyShow: true,
      departShow: false,
      postShow: false,
      usersShow: false,
      companyLists: [],
      companyPage_size: 20,
      companyPage_cur: 1,
      companyPage_items: 0,
      companyPage_total: 0,
      companyDialogVisible: false,
      companyDialogTitle: "",
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
      departLists: [],

      departPage_cur: 1,
      departPage_size: 20,
      departPage_items: 0,
      departPage_total: 0,
      departDialogVisible: false,
      departDialogTitle: "",
      departData: {},
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
      postLists: [],
      post_search_pid: "",
      postPage_size: 20,
      postPage_cur: 1,
      postPage_items: 0,
      postPage_total: 0,
      postDialogVisible: false,
      postDialogTitle: "",
      postData: {},
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
      adminLists: [],
      adminPage_size: 20,
      adminPage_cur: 1,
      adminPage_items: 0,
      userPage_size: 20,
      userPage_cur: 1,
      userPage_items: 0,
      userPage_total: 0,
      userDialogVisible: false,
      userDialogTitle: "",
      userData: {},
      userSearch: {},
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
      search_pid: "",
      pid: "",
      sub_pid: "",
      post_pid: "",
      companySelectLists: [],
      departSelectLists: [],
      postSelectLists: []
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
      //type  1 公司  2 部门 3 职位
      let par = {};
      let page = 1;
      if (type == 1) {
        page = this.companyPage_cur;
        par = { page, type };
      } else if (type == 2) {
        page = this.departPage_cur;
        let pid = this.search_pid;
        par = { page, type, pid };
      } else {
        page = this.postPage_cur;
        let pid = this.post_search_pid;
        par = { page, type, pid };
      }
      this.request({
        url: "/company/getPageLists",
        method: "get",
        params: par
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          if (type == 1) {
            this.companyLists = data.data.data;
            this.companyPage_size = data.data.per_page;
            this.companyPage_cur = parseInt(data.data.current_page);
            this.companyPage_items = parseInt(data.data.total);
            this.companyPage_total = parseInt(data.data.last_page);
          } else if (type == 2) {
            this.departLists = data.data.data;
            this.departPage_size = data.data.per_page;
            this.departPage_cur = parseInt(data.data.current_page);
            this.departPage_items = parseInt(data.data.total);
            this.departPage_total = parseInt(data.data.last_page);
          } else {
            this.postLists = data.data.data;
            this.departPage_size = data.data.per_page;
            this.postPage_cur = parseInt(data.data.current_page);
            this.postPage_items = parseInt(data.data.total);
            this.postPage_total = parseInt(data.data.last_page);
          }
        }
      });
    },
    //公司
    companyChangePage(value) {
      this.companyPage_cur = value;
      this.getPageLists(1);
    },
    companyFirstPage() {
      this.companyPage_cur = 1;
      this.getPageLists(1);
    },
    companyLastPage() {
      this.companyPage_cur = this.companyPage_total;
      this.getPageLists(1);
    },
    openAddCompany() {
      this.companyDialogVisible = true;
      this.companyDialogTitle = "添加公司信息";
      this.companyData = {
        color: "默认"
      };
    },

    addCompany() {
      console.log("this.companyData.id：" + this.companyData.id);
      this.$refs["companyRulesForm"].validate(valid => {
        if (valid) {
          let data = this.companyData;
          this.companyData.type = 1;
          if (this.companyData.color == "默认") {
            this.companyData.color = 0;
          }
          let url = "/company/addCompanyDo";
          let baseid = this.companyData.id;
          if (typeof baseid != "undefined") {
            url = "/company/editCompany";
          }
          this.request({
            url: url,
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.companyDialogVisible = false;
              this.$message({
                type: "success",
                message: "保存成功！"
              });
              this.getPageLists(1);
            }
          });
        }
      });
    },
    detailCompany(id) {
      this.companyDialogVisible = true;
      this.companyDialogTitle = "修改公司信息";
      this.request({
        url: "/company/getDepartDetail",
        method: "get",
        params: { id: id }
      }).then(response => {
        var data = response.data;
        if (data.status == 1) {
          this.companyData = data.data;
        }
      });
    },
    delCompany(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
        ,customClass:"el-message-box-new"
      }).then(() => {
        this.request({
          url: "/company/deleteCompany",
          method: "post",
          data: { id: id }
        }).then(res => {
          let data = res.data;
          if (data.status == 1) {
            this.$message({
              type: "success",
              message: "删除成功！"
            });
            this.getPageLists(1);
          }
        });
      }).catch(()=>{});
    },
    //部门
    departChangePage(value) {
      this.departPage_cur = value;
      this.getPageLists(2);
    },
    departFirstPage() {
      this.departPage_cur = 1;
      this.getPageLists(2);
    },
    departLastPage() {
      this.departPage_cur = this.departPage_total;
      this.getPageLists(2);
    },
    departSearchPage() {
      this.departPage_cur = 1;
      this.getPageLists(2);
    },
    openAddDepart() {
      this.departDialogVisible = true;
      this.departDialogTitle = "添加部门信息";
      this.departData = {};
    },
    addDepart() {
      this.$refs["departRulesForm"].validate(valid => {
        if (valid) {
          let data = this.departData;
          this.departData.type = 2;
          let url = "/company/addCompanyDo";
          let baseid = this.departData.id;
          if (typeof baseid != "undefined") {
            url = "/company/editCompany";
          }
          this.request({
            url: url,
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.departDialogVisible = false;
              this.$message({
                type: "success",
                message: "保存成功！"
              });
              this.getPageLists(2);
            }
          });
        }
      });
    },
    detailDepart(id) {
      this.departDialogTitle = "修改部门信息";
      this.departDialogVisible = true;
      this.request({
        url: "/company/getDepartDetail",
        method: "get",
        params: { id: id }
      }).then(response => {
        var data = response.data;
        if (data.status == 1) {
          this.departData = data.data;
        }
      });
    },
    delDepart(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
        ,customClass:"el-message-box-new"
      }).then(() => {
        this.request({
          url: "/company/deleteCompany",
          method: "post",
          data: { id: id }
        }).then(res => {
          let data = res.data;
          if (data.status == 1) {
            this.$message({
              type: "success",
              message: "删除成功！"
            });
            this.getPageLists(2);
          }
        });
      }).catch(()=>{});
    },
    //职位
    postChangePage(value) {
      this.postPage_cur = value;
      this.getPageLists(3);
    },
    postFirstPage() {
      this.postPage_cur = 1;
      this.getPageLists(3);
    },
    postLastPage() {
      this.postPage_cur = this.departPage_total;
      this.getPageLists(3);
    },
    postSearchPage() {
      this.postPage_cur = 1;
      this.getPageLists(3);
    },
    openAddPost() {
      this.postDialogTitle = "添加职位信息";
      this.postDialogVisible = true;
      this.postData = {};
    },
    addPost(type) {
      this.$refs["postRulesForm"].validate(valid => {
        if (valid) {
          let data = this.postData;
          this.postData.type = 3;
          let url = "/company/addCompanyDo";
          let baseid = this.postData.id;
          if (typeof baseid != "undefined") {
            url = "/company/editCompany";
          }
          this.request({
            url: url,
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.postDialogVisible = false;
              this.$message({
                type: "success",
                message: "保存成功！"
              });
              this.getPageLists(3);
            }
          });
        }
      });
    },
    detailPost(id) {
      this.postDialogTitle = "修改职位信息";
      this.postDialogVisible = true;
      this.request({
        url: "/company/getDepartDetail",
        method: "get",
        params: { id: id }
      }).then(response => {
        var data = response.data;
        if (data.status == 1) {
          this.postData = data.data;
        }
      });
    },
    delPost(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
        ,customClass:"el-message-box-new"
      }).then(() => {
        this.request({
          url: "/company/deleteCompany",
          method: "post",
          data: { id: id }
        }).then(res => {
          let data = res.data;
          if (data.status == 1) {
            this.$message({
              type: "success",
              message: "删除成功！"
            });
            this.getPageLists(3);
          }
        });
      }).catch(()=>{});
    },
    //人员 userRulesForm

    getAdminListsPage() {
      let page = this.adminPage_cur;
      let user_name = this.userSearch.user_name;
      let company_id = this.userSearch.company_id;
      let depart_id = this.userSearch.depart_id;
      let post_id = this.userSearch.post_id;
      this.request({
        url: "/user/getUserPage",
        method: "get",
        params: { page, user_name, company_id, depart_id, post_id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.adminLists = data.data.data;
          this.adminPage_cur = parseInt(data.data.current_page);
          this.adminPage_items = data.data.total;
          this.adminPage_size = data.data.per_page;
          this.padminPage_total = data.data.last_page;
        }
      });
    },
    userChangePage(value) {
      this.userPage_cur = value;
      this.getAdminListsPage();
    },
    userFirstPage() {
      this.userPage_cur = 1;
      this.getAdminListsPage();
    },
    userLastPage() {
      this.userPage_cur = this.userPage_total;
      this.getAdminListsPage();
    },
    userSearchPage() {
      this.userPage_cur = 1;
      getAdminListsPage;
    },
    openAddUser() {
      this.userData = {};
      this.userDialogVisible = true;
      this.userDialogTitle = "添加人员信息";
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
              this.userDialogVisible = false;
              this.getAdminListsPage();
            }
          });
        }
      });
    },
    detailUser(id) {
      this.userDialogTitle = "修改人员信息";
      this.userDialogVisible = true;

      this.request({
        url: "/user/getUserDetial",
        method: "get",
        params: { id: id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.userData = data.data;
          this.getDepartListSearch(data.data.company_id); //部门
          this.getPostListSearch(data.data.depart_id); //职位
        }
      });
    },
    delUser(id) {
      this.$confirm("您确定要删除？删除后不能恢复！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
        ,customClass:"el-message-box-new"
      }).then(() => {
        this.request({
          url: "/user/deleteUser",
          method: "post",
          data: { id: id }
        }).then(res => {
          let data = res.data;
          if (data.status == 1) {
            this.$message({
              type: "success",
              message: "删除成功！"
            });
            this.getAdminListsPage();
          }
        });
      }).catch(()=>{});
    },
    adminPageChange(value) {
      this.adminPage_cur = value;
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
      this.$set(this.postData, "sub_pid", "");
      this.$set(this.userData, "depart_id", "");
      this.$set(this.userData, "post_id", "");
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
      this.$set(this.userData, "post_id", "");
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
      });
    },
    getDepartListSearch(val) {
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
    getPostListSearch(pid) {
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
      });
    }
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
