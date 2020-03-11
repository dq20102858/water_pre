<template>
  <div id="project">
    <div class="el-menu-top">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-project.png')" />工程进度
        </li>
        <el-menu-item index="1">添加作业</el-menu-item>
        <el-menu-item index="2">计划日程</el-menu-item>
        <el-menu-item index="3">详情列表</el-menu-item>
        <el-menu-item index="4">图表数据</el-menu-item>
      </el-menu>
    </div>
    <div class="app-page">
      <div id="work" class="app-table" v-show="workShow">
        <div class="app-page-container">
          <div class="addbtn">
            <el-button type="primary" icon="el-icon-plus" @click="openAddWork">添加作业</el-button>
          </div>
          <el-table :data="workLists" ref="multipleTable">
            <el-table-column prop="sort" label="作业顺序" align="center"></el-table-column>
            <el-table-column prop="name" label="作业名称" align="center"></el-table-column>
            <el-table-column prop="start_time" label="计划开始时间" align="center"></el-table-column>
            <el-table-column prop="end_time" label="计划结束时间" align="center"></el-table-column>
            <el-table-column prop="total" label="设计总量" align="center"></el-table-column>
            <el-table-column label="操作" width="210px">
              <template slot-scope="scope">
                <div class="app-operation">
                  <el-button class="btn-blue" size="mini" @click="getLine(scope.row.id)">查看线别</el-button>
                  <el-button class="btn-blue" size="mini" @click="goDetail(scope.row.id)">修改</el-button>
                  <el-button class="btn-red" size="mini" @click="deleteWork(scope.row.id)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="app-pagination">
            <el-pagination
              class="pagination"
              v-if="workLists.length !== 0"
              layout="slot,prev, pager, next,slot,total"
              :current-page="this.workPage"
              :total="this.workTotal"
              @current-change="workPageChange"
              prev-text="上一页"
              next-text="下一页"
            >
              <button @click="workPageFirst" type="button" class="btn-first">
                <span>首页</span>
              </button>
              <button @click="workPageLast" type="button" class="btn-last">
                <span>尾页</span>
              </button>
            </el-pagination>
          </div>
        </div>
        <el-dialog class="dialog-work" :title="this.title" :visible.sync="workVisible">
          <el-form class="el-form-custom" :model="workData" :rules="wokRules" ref="workForm">
            <el-form-item label="名称" prop="name">
              <el-input v-model="workData.name" autocomplete="off" placeholder="请输入作业名称"></el-input>
            </el-form-item>
            <el-form-item label="顺序">
              <el-input
                v-model="workData.sort"
                autocomplete="off"
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                placeholder="请输入数字，数字越大越靠后"
              ></el-input>
            </el-form-item>
            <el-form-item label="类别" prop="type">
              <el-radio v-model="workData.type" :label="1">里程</el-radio>
              <el-radio v-model="workData.type" :label="2">计数（个，股，孔）</el-radio>
            </el-form-item>
            <el-form-item label="线别" prop="line_type" v-if="workData.type == 1">
              <el-checkbox-group v-model="workData.line_type">
                <el-checkbox
                  v-for="item in lineList"
                  :key="item.id"
                  :label="item.name"
                >{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <div class="el-form-item-inline">
              <el-form-item label="设计总量" prop="total">
                <el-input v-model="workData.total" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="单位" prop="unit">
                <el-input v-model="workData.unit" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div class="el-form-item-inline">
              <el-form-item label="计划开始时间" prop="start_time">
                <el-date-picker  @change="changeStarttime" v-model="workData.start_time" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="计划结束时间" prop="end_time">
                <el-date-picker  @change="changeEndtime" v-model="workData.end_time" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </div>
            <div class="blank"></div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="workVisible = false">关闭</el-button>
            <el-button type="primary" @click="addOrEditDo()">确定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="里程线别设置" :visible.sync="lineVisible">
          <el-table :data="lineData">
            <el-table-column label="线别" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.line_type == 1">左线</span>
                <span v-else-if="scope.row.line_type == 2">右线</span>
                <span v-else-if="scope.row.line_type == 3">入场线</span>
                <span v-else>出场线</span>
              </template>
            </el-table-column>
            <el-table-column label="开始里程" width="180">
              <template slot-scope="scope">
                <div>
                  <span>DK</span>
                  <input v-model="scope.row.start_flag" class="diinput" type="number" />
                  <span>+</span>
                  <input v-model="scope.row.start_length" class="diinput" type="number" />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="结束里程" width="180">
              <template slot-scope="scope">
                <div>
                  <span>DK</span>
                  <input v-model="scope.row.end_flag" class="diinput" type="number" />
                  <span>+</span>
                  <input v-model="scope.row.end_length" class="diinput" type="number" />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="addOrEditLineDo(scope.row)"
                  v-if="scope.row.id == 0"
                >设置</el-button>
                <el-button type="primary" size="mini" @click="addOrEditLineDo(scope.row)" v-else>修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="lineVisible = false">关闭</el-button>
          </div>
        </el-dialog>
      </div>
      <div id="plan" v-show="planShow">
        <div class="echart-top">
          <el-menu class="el-menu-cus" :default-active="subIndex" @select="handleSubSelect">
            <el-menu-item
              v-for="(item,index) in lineTypeList"
              :key="item.id"
              :index="item.id.toString()"
            >{{item.name}}</el-menu-item>
          </el-menu>
        </div>
        <div class="app-page-container">
          <el-calendar class="plancale">
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template slot="dateCell" slot-scope="{date, data}">
              <div class="calendar-wapper">
                <p class="date">{{ data.day.split('-').slice(2).join('-') }}</p>
                <p class="calendar-operate add" @click="addDayPlay(data.day)">添加</p>
                <p class="calendar-operate detail" @click="getDetail(data.day)">详情</p>
                <div class="calendar-tips">
                  <p class="calendar-show plan-finished">
                    <span>计划完成：</span>
                    <span v-if="typeof(calendarLists[data.day])!=='undefined'">
                      <div v-for="(item,index) in calendarLists[data.day]">{{item.plan_tip}}</div>
                    </span>
                  </p>
                  <p class="calendar-show act-finished">
                    <span>实际完成：</span>
                    <span v-if="typeof(calendarLists[data.day])!=='undefined'">
                      <div v-for="(item,index) in calendarLists[data.day]">{{item.true_tip}}</div>
                    </span>
                  </p>
                  <p class="calendar-show remark">
                    <span>备注：</span>
                    <span v-if="typeof(calendarLists[data.day])!=='undefined'">
                      <div v-for="(item,index) in calendarLists[data.day]">{{item.remark}}</div>
                    </span>
                  </p>
                </div>
              </div>
            </template>
          </el-calendar>
          <el-dialog class="dialog-plan-add" title="添加信息" :visible.sync="planVisible">
            <span class="ptxt">添加日期：{{addDate}}</span>
            <span class="ptxt">作业：{{planWorkName}}</span>
            <ul id="plan-ul">
              <li class="pheader">
                <div class="pitem">线别</div>
                <div class="pitem">计划开始里程</div>
                <div class="pitem">计划结束里程</div>
              </li>
              <li v-for="(item,index) in planOneData" class="li-line">
                <div class="plan-content">
                  <el-checkbox v-model="item.checked"></el-checkbox>
                  <span v-if="item.line_type == 1">左线</span>
                  <span v-else-if="item.line_type == 2">右线</span>
                  <span v-else-if="item.line_type == 3">入场线</span>
                  <span v-else>出场线</span>
                </div>
                <div class="plan-content">
                  <span>
                    <b>DK</b>
                  </span>
                  <input
                    v-model="item.start_flag"
                    :disabled="!item.checked"
                    class="pinput"
                    type="number"
                  />
                  <span>+</span>
                  <input
                    v-model="item.start_length"
                    :disabled="!item.checked"
                    class="pinput"
                    type="number"
                  />
                </div>
                <div class="plan-content">
                  <span>
                    <b>DK</b>
                  </span>
                  <input
                    v-model="item.end_flag"
                    :disabled="!item.checked"
                    class="pinput"
                    type="number"
                  />
                  <span>+</span>
                  <input
                    v-model="item.end_length"
                    :disabled="!item.checked"
                    class="pinput"
                    type="number"
                  />
                </div>
                <div class="plan-tip">{{item.tip}}</div>
              </li>
              <p style="clear:both"></p>
            </ul>
            <div class="plan-btn">
              <el-button @click="closePlan">关闭</el-button>
              <el-button type="primary" @click="addOnePlan">确定保存</el-button>
            </div>
          </el-dialog>
          <el-dialog class="dialog-plan-add" title="详细信息" :visible.sync="detailVisible">
            <div>
              <span class="ptxt">施工日期：</span>
              <span class="ptxt" v-if="planDetailList.length>0">{{planDetailList[0]['add_date']}}</span>
              <span class="ptxt">作业：</span>
              <span class="ptxt">{{this.planWorkName}}</span>
            </div>
            <el-table :data="planDetailList" class="plan-show">
              <el-table-column property="line_type_desc" label="线别"></el-table-column>
              <el-table-column property="plan_tip" label="计划里程"></el-table-column>
              <el-table-column property="true_tip" label="实际里程"></el-table-column>
              <el-table-column property="remark" label="备注"></el-table-column>
            </el-table>
            <div class="plan-btn">
              <el-button @click="closeDetail">关闭</el-button>
            </div>
          </el-dialog>
        </div>
      </div>

      <div id="detail" v-show="detailShow">
        <div class="app-page-container">
          <el-form :model="searchForm" :inline="true">
            <el-form-item label="作业">
              <el-select
                style="width:140px;"
                v-model="searchForm.work"
                clearable
                placeholder="请选择作业"
                class="search-input search-select"
              >
                <el-option
                  v-for="item in lineTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >{{item.name}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择时间">
              <el-date-picker
                v-model="searchForm.time_range"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2"
                class
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="完成状态">
              <el-select
                v-model="searchForm.is_finish"
                clearable
                placeholder="请选择状态"
                class="search-input search-select"
                style="width:140px;"
              >
                <el-option key="1" label="已完成" value="1">已完成</el-option>
                <el-option key="0" label="未完成" value="0">未完成</el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                size="small"
                icon="el-icon-search"
                type="primary"
                @click="getDetailLists"
              >检索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                size="small"
                icon="el-icon-plus"
                type="primary"
                @click="addHistory"
                style="margin-left:20px;"
              >添加历史记录</el-button>
            </el-form-item>
          </el-form>

          <div class="app-table">
            <el-table :data="detailListPages" ref="multipleTable">
              <el-table-column type="index" label="序号" align="center"></el-table-column>
              <el-table-column prop="pro_name" label="作业名称" align="center"></el-table-column>
              <el-table-column prop="plan_tip" label="计划完成" align="center"></el-table-column>
              <el-table-column prop="true_tip" label="实际完成" align="center"></el-table-column>
              <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_finish == 1">已完成</span>
                  <span v-else>未完成</span>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注" align="center"></el-table-column>
              <el-table-column prop="plan_date" label="日期" align="center"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="app-operation">
                    <el-button class="btn-blue" size="mini" @click="getPlanDetail(scope.row.id)">修改</el-button>
                    <el-button class="btn-red" size="mini" @click="deletePlan(scope.row.id)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="app-pagination">
            <el-pagination
              class="pagination"
              v-if="detailListPages.length !== 0"
              layout="slot,prev, pager, next,slot,total"
              :current-page="this.detailPage"
              :total="this.detailTotal"
              @current-change="detailPageChange"
              prev-text="上一页"
              next-text="下一页"
            >
              <button @click="detailPageFirst" type="button" class="btn-first">
                <span>首页</span>
              </button>
              <button @click="detailPageLast" type="button" class="btn-last">
                <span>尾页</span>
              </button>
            </el-pagination>
          </div>
          <el-dialog
            class="dialog-plan-detail"
            :title="this.historyTitle"
            :visible.sync="addHistoryVisible"
          >
            <div class="ptxtbox" v-show="!addShow">
              <span class="ptxt">作业名称：</span>
              <span class="ptxt">{{historyData.pro_name}}</span>
              <span class="ptxt">日期：</span>
              <span class="ptxt">{{historyData.plan_time}}</span>
              <span class="ptxt">线别：</span>
              <span class="ptxt">{{historyData.line_type_desc}}</span>
            </div>
            <el-form :model="historyData" :rules="historyRules" ref="detailForm">
              <el-form-item label="作业名称" label-width="80px" prop="pro_id" v-show="addShow">
                <el-select
                  v-model="historyData.pro_id"
                  clearable
                  placeholder="请选择作业"
                  @change="getTheLineType"
                >
                  <el-option
                    v-for="item in lineTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="线别" label-width="80px" prop="line_type" v-show="addShow">
                <el-select v-model="historyData.line_type" @change="historyLineTypeChange" clearable placeholder="请选择线别">
                  <el-option
                    v-for="item in selectedLineTypeLists"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <div class="el-form-item__error">{{lineTypeDes}}</div>
              </el-form-item>
              <el-form-item label="计划里程" label-width="80px" prop="start_flag">
                <b>DK</b>
                <el-input class="pinput" v-model="historyData.start_flag" placeholder="公里"></el-input>+
                <el-input class="pinput" v-model="historyData.start_length" placeholder="米"></el-input>
                <em>~</em>
                <b>DK</b>
                <el-input class="pinput" v-model="historyData.end_flag" placeholder="公里"></el-input>+
                <el-input class="pinput" v-model="historyData.end_length" placeholder="米"></el-input>
              </el-form-item>
              <el-form-item label="实际里程" label-width="80px" prop="t_start_flag">
                <b>DK</b>
                <el-input class="pinput" v-model="historyData.t_start_flag" placeholder="公里"></el-input>+
                <el-input class="pinput" v-model="historyData.t_start_length" placeholder="米"></el-input>
                <em>~</em>
                <b>DK</b>
                <el-input class="pinput" v-model="historyData.t_end_flag" placeholder="公里"></el-input>+
                <el-input class="pinput" v-model="historyData.t_end_length" placeholder="米"></el-input>
              </el-form-item>

              <el-form-item label="完成日期" label-width="80px" prop="plan_time" v-show="addShow">
                <el-date-picker v-model="historyData.plan_time" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="是否完成" label-width="80px" prop="is_finish">
                <el-radio v-model="historyData.is_finish" label="1" value="1">是</el-radio>
                <el-radio v-model="historyData.is_finish" label="0" value="0">否</el-radio>
              </el-form-item>
              <el-form-item label="备注" label-width="80px">
                <el-input v-model="historyData.remark" placeholder="填写备注" type="textarea"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button @click="addHistoryVisible = false">关闭</el-button>
              <el-button type="primary" @click="addOrEditPlanDo()">确定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
      <!-- echarts -->

      <div id="echart" v-show="echartShow">
        <div class="echart-top">
          <el-menu :default-active="subIndex" class="el-menu-cus" @select="handleChartSubSelect">
            <el-menu-item
              v-for="(item,index) in lineTypeList"
              :index="item.id.toString()"
            >{{item.name}}</el-menu-item>
          </el-menu>
          <div class="el-serach">
            <el-date-picker
              v-model="echartDate"
              type="month"
              placeholder="在此选择年月查询"
              format="yyyy-MM"
              value-format="yyyy-MM"
            ></el-date-picker>
            <el-button @click="searchChartByDate">查询</el-button>
          </div>
        </div>
        <div class="app-page-container">
          <div class="chartbox">
            <div id="oneChart"></div>
          </div>
        </div>
        <div class="chart-ontainer">
          <el-row :gutter="20">
            <el-col :span="10">
              <div class="second-content">
                <h2>{{echartDataNames}} 总体完成情况</h2>
                <ul class="oneitem">
                  <li>
                    <p>设计工程量：</p>
                    <h3 class="p1">{{echartDataList.designTotal}}公里</h3>
                  </li>
                  <li>
                    <p>完成百分比：</p>
                    <h3 class="p2">{{echartDataList.percent}}公里</h3>
                  </li>
                </ul>
                <ul class="twoitem">
                  <li>
                    <p>月累完成：</p>
                    <h3>{{echartDataList.monthTotal}}</h3>
                  </li>
                  <li>
                    <p>年累完成：</p>
                    <h3>{{echartDataList.yearTotal}}</h3>
                  </li>
                  <li>
                    <p>开累完成：</p>
                    <h3>{{echartDataList.workTotal}}</h3>
                  </li>
                  <li>
                    <p>剩余工程量：</p>
                    <h3>{{echartDataList.leftTotal}}</h3>
                  </li>
                </ul>
              </div>
            </el-col>
            <el-col :span="14">
              <div class="second-content">
                <div id="thirdChart"></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- end echarts -->
    </div>
  </div>
</template>
<script>
import { publicData } from "@/utils/common";
export default {
  data() {
    return {
      activeIndex: "1",
      subIndex: "0",
      workShow: true,
      workLists: [],
      workPage: 1,
      workTotal: 0,
      workPage_total: 0,
      workVisible: false,
      lineList: [],
      workData: {
        type:1,
        line_type: []
      },
      title: "添加作业信息",
      wokRules: {
        name: [{ required: true, message: "请输入名称3~60个字符", trigger: "blur" },
        { min: 3, max:60, message: '长度在3到60个字符', trigger: 'blur' }],
        type: [{ required: true, message: "请选择类别", trigger: "change" }],
        line_type: [
          { required: true, message: "请选择线别", trigger: "change" }
        ],
        start_time: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        end_time: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        total: [{ required: true, message: "请输入设计总量", trigger: "blur" },
         { type: 'number', message: '请输入数字'}],
        unit: [{ required: true, message: "请输入单位", trigger: "blur" }]
      },
      lineVisible: false, //查看线别
      lineData: [],
      planInputDisabled: true,
      planShow: false,
      lineTypeList: [],
      planVisible: false,
      planOneData: [],
      echartShow: false,
      echartDate: "",
      curMonth: "",
      echartDataList: [],
      echartDataNames: "",
      addDate: "",
      planWorkName: "",
      planDetailList: [],
      detailVisible: false,
      calendarLists: {},
      detailShow: false,
      detailListPages: [],
      detailPage: 1,
      detailTotal: 0,
      detailPage_total: 0,
      searchForm: {},
      pickerOptions2: publicData.pickerOptions2,
      addHistoryVisible: false,
      historyData: {},
      historyTitle: "",
      historyRules: {
        pro_id: [{ required: true, message: "请选择作业", trigger: "change" }],
        line_type: [
          { required: true, message: "请选择线别", trigger: "change" }
        ],
        start_flag: [
          { required: true, message: "请输入计划里程", trigger: "blur" }
        ],
        t_start_flag: [
          { required: true, message: "请输入实际里程", trigger: "blur" }
        ],
        plan_time: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        is_finish: [
          { required: true, message: "请选择是否完成", trigger: "change" }
        ]
      },
      selectedLineTypeLists: [],
      lineTypeListDes:[],
      lineTypeDes:'',
      addShow: true,
    
    };
  },
  created() {
    this.getWorkLists();
    this.getLineType();
    let nowDate = new Date();
    let date = {
      y: nowDate.getFullYear(),
      m:
        nowDate.getMonth() < 9
          ? "0" + (nowDate.getMonth() + 1)
          : nowDate.getMonth() + 1
    };
    this.curMonth = date.y + "-" + date.m;
    console.log(this.curMonth);
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == 1) {
        this.workShow = true;
        this.planShow = false;
        this.detailShow = false;
        this.echartShow = false;
        this.getWorkLists();
      } else if (key == 2) {
        this.workShow = false;
        this.planShow = true;
        this.getWorkTypeList();
        this.detailShow = false;
        this.echartShow = false;
      } else if (key == 3) {
        this.workShow = false;
        this.planShow = false;
        this.detailShow = true;
        this.echartShow = false;
        this.getDetailLists();
        this.getWorkTypeList();
      } else {
        this.workShow = false;
        this.planShow = false;
        this.detailShow = false;
        this.echartShow = true;
        this.getChartWorkTypeList();
      }
    },
    handleSubSelect(key) {
      this.subIndex = key;
      this.getCurrData();
      this.getPlanByDate(key);
    },
    initWorkData() {
      this.workData = {
        type:1,
        line_type: []
      };
    },
    workPageChange(value) {
      this.workPage = value;
      this.getWorkLists();
    },
    workPageFirst() {
      this.workPageChange(1);
    },
    workPageLast() {
      this.workPage = this.workPage_total;
      this.workPageChange(this.workPage_total);
    },
    detailPageChange(value) {
      this.detailPage = value;
      this.getDetailLists();
    },
    detailPageFirst() {
      this.detailPageChange(1);
    },
    detailPageLast() {
      this.detailPage = this.detailPage_total;
      this.detailPageChange(this.detailPage_total);
    },
    openAddWork() {
      this.title = "添加作业信息";
      this.workVisible = true;
      this.initWorkData();
    },
    getWorkLists() {
      let page = this.workPage;
      this.request({
        url: "/project/getWorkLists",
        method: "get",
        params: { page }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.workLists = data.data.data;
          this.workPage = parseInt(data.data.current_page);
          this.workTotal = parseInt(data.data.total);
          this.workPage_total = parseInt(data.data.last_page);
        }
      });
    },
    addOrEditDo() {
      this.$refs["workForm"].validate(valid => {
        if (valid) {
          let data = this.workData;
          this.request({
            url: "/project/addOrEditWork",
            method: "post",
            data
          }).then(response => {
            var data = response.data;
            if (data.status == 1) {
              this.workVisible = false;
              this.getWorkLists();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goDetail(id) {
      this.title = "修改信息";
      this.workVisible = true;
      this.request({
        url: "/project/getWorkDetail",
        method: "get",
        params: { id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.workData = data.data;
        }
      });
    },
    deleteWork(id) {
      this.$confirm("请确认要删除，删除后不可恢复", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let data = {
          id: id
        };
        this.request({
          url: "/project/deleteWork",
          method: "post",
          data
        }).then(response => {
          let data = response.data;
          if (data.status == 1) {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            this.getWorkLists();
          } else {
            this.$message({
              showClose: true,
              message: "删除失败",
              type: "error"
            });
          }
        });
      });
    },
    addOrEditLineDo(data) {
      this.request({
        url: "/project/addOrEditLineDo",
        method: "post",
        data
      }).then(response => {
        var data = response.data;
        if (data.status == 1) {
          this.$message({
            showClose: true,
            message: "操作成功",
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: "操作失败",
            type: "error"
          });
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
    getLine(id) {
      this.lineVisible = true;
      this.request({
        url: "/project/getLine",
        method: "get",
        params: { id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.lineData = data.data;
        }
      });
    },
    getWorkTypeList() {
      this.request({
        url: "/project/getWorkTypeList",
        method: "get",
        params: {}
      }).then(response => {
        let data = response.data;
        if (data.status == 1 && data.data.length > 0) {
          this.lineTypeList = data.data;
          this.subIndex = this.lineTypeList[0]["id"].toString();
          this.planWorkName = this.lineTypeList[0]["name"];
          this.getPlanByDate(this.subIndex);
        }
      });
    },
    getCurrData() {
      let subIndex = this.subIndex;
      let one = {};
      this.lineTypeList.forEach(function(item, key) {
        if (subIndex == item["id"]) {
          one = item;
        }
      });
      if (JSON.stringify(one) !== "{}") {
        this.planOneData = one["des"];
        this.planWorkName = one["name"];
      }
    },
    addDayPlay(date) {
      this.addDate = date;
      this.planVisible = true;
      this.getCurrData();
    },
    addOnePlan() {
      let canSubmit = false;
      this.planOneData.forEach(function(item) {
        if (item["checked"] == true) {
          canSubmit = true;
          this.planInputDisabled = false;
        }
      });
      if (canSubmit == false) {
        this.$message({
          showClose: true,
          message: "请选中要作业的线别",
          type: "error"
        });
        return false;
      }
      let data = {
        addDate: this.addDate,
        checkedList: this.planOneData,
        workName: this.planWorkName
      };
      this.request({
        url: "/project/addOnedayPlan",
        method: "post",
        data
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: "添加失败",
            type: "error"
          });
        }
      });
    },
    getPlanDetailLists(addDate) {
      let proId = this.subIndex;
      this.request({
        url: "/project/getPlanDetailLists",
        method: "get",
        params: { addDate, proId }
      }).then(response => {
        let data = response.data;
        if (data.status == 1 && data.data.length > 0) {
          this.planDetailList = data.data;
        }
      });
    },
    getDetail(addDate) {
      this.detailVisible = true;
      this.getPlanDetailLists(addDate);
    },
    closeDetail() {
      this.detailVisible = false;
    },
    closePlan() {
      this.planVisible = false;
    },
    getPlanByDate() {
      let proId = this.subIndex;
      this.request({
        url: "/project/getPlanByDate",
        method: "get",
        params: { proId }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.calendarLists = data.data;
        }
      });
    },
    getDetailLists() {
      let page = this.detailPage;
      let pro_id = this.searchForm.work;
      let time_range = this.searchForm.time_range;
      let is_finish = this.searchForm.is_finish;
      console.log(this.searchForm);
      this.request({
        url: "/project/getPlanPages",
        method: "get",
        params: { page, pro_id, time_range, is_finish }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.detailListPages = data.data.data;
          this.detailPage = parseInt(data.data.current_page);
          this.detailTotal = parseInt(data.data.total);
          this.detailPage_total = parseInt(data.data.last_page);
        }
      });
    },
    getPlanDetail(id) {
      this.addHistoryVisible = true;
      this.historyTitle = "修改进度信息";
      this.addShow = false;
      this.request({
        url: "/project/getPlanDetail",
        method: "get",
        params: { id }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.historyData = data.data;
          this.historyData.is_finish = this.historyData.is_finish.toString();
        }
      });
    },
    deletePlan(id) {
      this.$confirm("您确定删除作业?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let data = {
          id: id
        };
        this.request({
          url: "/project/deletePlan",
          method: "post",
          data
        }).then(response => {
          let data = response.data;
          if (data.status == 1) {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            this.getDetailLists();
          } else {
            this.$message({
              showClose: true,
              message: "删除失败",
              type: "error"
            });
          }
        });
      });
    },
    addHistory() {
      this.addHistoryVisible = true;
      this.historyTitle = "添加历史记录";
      this.initHistoryData();
      this.addShow = true;
      this.lineTypeDes='';
    },
  
    getTheLineType(value) {
      let selectedLineTypeLists = [];
      let selectedLineTypeDes=[];
      this.lineTypeList.forEach(function(item) {
       
        if (item.id == value) {
          selectedLineTypeLists = item.line_type_lists;
           selectedLineTypeDes=item.des;
        }
      });
      this.selectedLineTypeLists = selectedLineTypeLists;
      this.lineTypeListDes=selectedLineTypeDes;
       //console.log(JSON.stringify(this.lineTypeListDes));
    },
      historyLineTypeChange(value){
       this.lineTypeListDes.map((item,i)=>{
          if (item.line_type == value) {
            this.lineTypeDes=item.tip
            //console.log(item.tip);
          }
       })
    },
    initHistoryData() {
      this.historyData = {};
    },
    addOrEditPlanDo() {
      this.$refs["detailForm"].validate(valid => {
        if (valid) {
          let data = this.historyData;
          this.request({
            url: "/project/addOrEditPlan",
            method: "post",
            data
          }).then(response => {
            let data = response.data;
            let msg = "";
            if (data.status == 1) {
              if (
                typeof this.historyData.id == "undefined" ||
                this.historyData.id == 0
              ) {
                msg = "新增成功";
              } else {
                msg = "修改成功";
              }
              this.$message({
                showClose: true,
                message: msg,
                type: "success"
              });
              this.getDetailLists();
              this.addHistoryVisible = false;
            } else {
              if (
                typeof this.historyData.id == "undefined" ||
                this.historyData.id == 0
              ) {
                msg = "新增失败";
              } else {
                msg = "修改失败";
              }
              this.$message({
                showClose: true,
                message: msg,
                type: "error"
              });
            }
          });
        }
      });
    },
    // echart
    getChartWorkTypeList() {
      this.request({
        url: "/project/getWorkTypeList",
        method: "get",
        params: {}
      }).then(response => {
        let data = response.data;
        if (data.status == 1 && data.data.length > 0) {
          this.lineTypeList = data.data;
          this.subIndex = this.lineTypeList[0]["id"].toString();
          this.echartDate = "";
          this.getCharData(
            this.subIndex,
            this.curMonth,
            this.lineTypeList[0]["name"]
          );
        }
      });
    },
    handleChartSubSelect(key) {
      let date = this.curMonth;
      if (this.echartDate != "" && this.echartDate != null) {
        date = this.echartDate;
      }
      let names = "";
      this.lineTypeList.map((item, i) => {
        if (item.id == key) {
          names = item.name;
        }
      });
      //this.subIndex = key;
      this.getCharData(key, date, names);
    },
    searchChartByDate() {
      let date = this.curMonth;
      if (this.echartDate != "" && this.echartDate != null) {
        date = this.echartDate;
      }
      // if (this.echartDate == "" || this.echartDate == null) {
      //   this.$message.error("请选择年月查询");
      //   this.echartDate="";
      //   return;
      // }
      var key = this.subIndex;
      let names = "";
      this.lineTypeList.map((item, i) => {
        if (item.id == key) {
          names = item.name;
        }
      });
      this.getCharData(key, date, names);
    },
    getCharData(proId, date, proName) {
      this.getOneChart(proId, date, proName);
      this.getSecondChart(proId, date, proName);
      this.getThirdChart(proId, date, proName);
    },
    getOneChart(proId, date, proName) {
      this.request({
        url: "/project/getData",
        method: "get",
        params: { proId: proId, date: date }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          let myChart = this.$echarts.init(document.getElementById("oneChart"));
          myChart.setOption({
            title: {
              text: proName + "  " + date + "  单位：公里",
              textStyle: {
                color: "#1D397A",
                fontWeight: "400",
                fontSize: 14
              }
            },
            tooltip: {
              trigger: "axis"
            },
            color: ["#4b6eca", "#ff5c75"],
            legend: {
              data: ["计划", "实际"],
              icon: "rectangle",
              textStyle: {
                fontSize: 14,
                color: "#1d397a"
              }
            },
            grid: {
              left: "1%",
              right: "1%",
              bottom: "1%",
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: data.data.x
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                name: "计划",
                type: "line",
                data: data.data.list[0].data
              },
              {
                name: "实际",
                type: "line",
                data: data.data.list[1].data
              }
            ]
          });
          myChart.resize();
          window.addEventListener("resize", function() {
            myChart.resize();
          });
          //end
        }
      });
    },
    getSecondChart(proId, date, proName) {
      this.request({
        url: "/project/getSecond",
        method: "get",
        params: { proId: proId, date: date }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.echartDataList = data.data;
          this.echartDataNames = proName;
          console.log("echartDataList：" + this.echartDataList);
        }
      });
    },
    getThirdChart(proId, date, proName) {
      this.request({
        url: "/project/getThird",
        method: "get",
        params: { proId: proId, date: date }
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          let myChart = this.$echarts.init(
            document.getElementById("thirdChart")
          );
          myChart.setOption({
            title: {
              text: ""
            },
            tooltip: {
              trigger: "axis"
            },
            color: ["#4b6eca", "#ff5c75"],
            legend: {
              data: ["计划", "实际"],
              icon: "rectangle",
              textStyle: {
                fontSize: 14,
                color: "#1d397a"
              }
            },
            grid: {
              left: "1%",
              right: "1%",
              bottom: "1%",
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: [
              {
                type: "category",
                boundaryGap: false,
                data: data.data.x
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            series: [
              {
                name: "计划",
                type: "bar",
                data: data.data.list[0].data
              },
              {
                name: "实际",
                type: "bar",
                data: data.data.list[1].data
              }
            ]
          });
          myChart.resize();
          window.addEventListener("resize", function() {
            myChart.resize();
          });
          //end
        }
      });
    },
    changeStarttime(){
      if (this.workData.start_time>this.workData.end_time) {
      this.$message.error('开始日期不能大于结束日期');
      this.workData.start_time="";
     }
    },
    changeEndtime(){
      if (this.workData.end_time < this.workData.start_time) {
      this.$message.error('结束日期需大于开始日期');
      this.workData.end_time="";
     }
  }
    //
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

.plancale .el-calendar-table {
  border-radius: 6px 6px 0 0;
}
.plancale .el-calendar-table .prev .el-calendar-day {
  display: none;
}
.plancale .el-calendar-table .next .el-calendar-day {
  display: none;
}
.plancale .el-calendar-table thead th {
  background: #3655a5;
  color: #fff;
}
.plancale .el-calendar-table thead th:first-child {
  border-radius: 6px 0 0 0;
}
.plancale .el-calendar-table thead th:last-child {
  border-radius: 0 6px 0 0;
}
.plancale .el-calendar-table .el-calendar-day {
  height: 110px;
  padding: 10px;
}
.plancale .date {
  font-size: 28px;
  color: #4b6eca;
}
.plancale .calendar-wapper {
  position: relative;
}
.plancale .calendar-operate {
  position: absolute;
  top: 0px;
  font-size: 10px;
  cursor: pointer;
}
.plancale .add {
  right: 34px;
  color: red;
}
.plancale .detail {
  right: 0px;
  color: #72acce;
}
.plancale .calendar-tips {
  position: absolute;
  font-size: 10px;
  left: 0;
}
.plancale .calendar-show {
  padding-top: 5px;
  color: #666;
}
.plancale .is-today {
  background: #c9d7f9;
}
/* work */
.dialog-work .el-dialog {
  width: 700px;
}
.dialog-work .el-form-item__label {
  width: 110px;
}
.dialog-work .el-form-item__content {
  margin-left: 110px;
}
.addbtn {
  margin-bottom: 15px;
}
.diinput {
  width: 60px;
  height: 28px;
  border: 1px #9db9fa solid;
  text-align: center;
}
/*plan */
.dialog-plan-add .ptxt {
  color: #4b6eca;
  display: inline-block;
  margin-right: 15px;
  font-size: 18px;
}
.dialog-plan-add .pinput {
  width: 80px;
  height: 31px;
  border: 1px #9db9fa solid;
  text-align: center;
}
.dialog-plan-add #plan-ul {
  list-style: none;
  border: 1px #ddd solid;
  border-bottom: none;
  margin-top: 20px;
}
.dialog-plan-add #plan-ul li {
  border-bottom: 1px solid #ccc;
  padding: 15px 20px;
  overflow: hidden;
}
.dialog-plan-add #plan-ul .pheader {
  background: #f2f2f2;
}
.dialog-plan-add #plan-ul .pitem {
  width: 32%;
  display: inline-block;
}
.dialog-plan-add .plan-content {
  width: 33%;
  float: left;
  margin-bottom: 10px;
}
.dialog-plan-add .plan-content span {
  color: #1d397a;
}
.dialog-plan-add .plan-tip {
  color: #90a8e8;
  text-align: center;
  font-size: 12px;
  display: block;
  margin-left: -15px;
}
.plan-btn {
  text-align: right;
  margin-top: 20px;
}

.plan-show {
  border: 1px #ddd solid;
  border-bottom: none;
  margin-top: 20px;
}
.plan-show .has-gutter th {
  background: #f2f2f2;
}
/* end plan */
.ptxtbox {
  padding: 0 10px 10px 10px;
  margin-bottom: 15px;
}
.dialog-plan-detail .ptxt {
  color: #4b6eca;
  display: inline-block;
  margin-right: 15px;
  font-size: 18px;
}
.dialog-plan-detail .el-form-item {
  margin-bottom: 25px;
}
.dialog-plan-detail .el-form-item em {
  padding: 0 10px;
}
.dialog-plan-detail .el-form-item:last-child {
  margin-bottom: 0;
}
.dialog-plan-detail .el-input__inner {
  border: 1px #9db9fa solid;
  color: #4b6eca;
  width: 100%;
}
.dialog-plan-detail .el-form-item__error {
  padding-top: 5px;
}
.dialog-plan-detail .el-select {
  width: 100%;
}
.dialog-plan-detail .el-input {
  width: auto;
}
.dialog-plan-detail .pinput input {
  width: 60px;
  text-align: center;
  margin: 0 3px;
  padding:0 5px;
}
.dialog-plan-detail .el-form-item__label {
  color: #1d397a;
}
.dialog-plan-detail .el-textarea {
  width: 100%;
}
.dialog-plan-detail .el-textarea__inner {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
}
.dialog-plan-detail .el-dialog__body {
  padding: 20px;
}
/* end detail */
.el-form-item-inline .el-form-item {
  float: left;
  white-space: nowrap;
}
.el-form-item-inline .el-input__inner {
  width: 220px;
}
.chart-ontainer {
  margin: 20px 0;
}
.second-content {
  height: 340px;
  background: #fff;
  padding: 20px;
  border-radius: 6px;
}
.second-content h2 {
  color: #1d397a;
  font-size: 18px;
  margin-bottom: 50px;
  font-weight: 400;
}
.second-content .oneitem {
  text-align: center;
  margin: 70px 40px;
  display: flex;
  justify-content: space-between;
}
.second-content .oneitem p {
  color: #1d397a;
  font-size: 15px;
  line-height: 41px;
}
.second-content .oneitem .p1 {
  color: #ff5c75;
  font-size: 20px;
}
.second-content .oneitem .p2 {
  color: #27db07;
  font-size: 20px;
}
.second-content .twoitem {
  padding: 0 -15px;
  display: flex;
  justify-content: space-between;
}
.second-content .twoitem li {
  border-right: 1px #b8ccfb solid;
  padding: 0 15px;
}
.second-content .twoitem li:last-child {
  border: 0;
}
.second-content .twoitem p {
  color: #4b6eca;
  font-size: 14px;
  line-height: 31px;
}
.second-content .twoitem h3 {
  color: #1d397a;
  font-size: 16px;
  text-align: center;
}
.chartbox {
  width: 100%;
  height: 100%;
}
#oneChart {
  width: 100%;
  height: 400px;
  box-sizing: border-box;
}
#thirdChart {
  width: 100%;
  height: 300px;
  box-sizing: border-box;
}
.echart-top {
  overflow: hidden;
  margin-bottom: 20px;
}
.el-menu-cus {
  float: left;
  background: none;
  border: 0;
}
.el-menu-cus .el-menu-item {
  display: inline-block;
  margin-right: 10px;
  color: #1d397a;
  height: 35px;
  line-height: 36px;
  font-size: 16px;
  padding: 0 12px;
}
.el-menu-cus .el-menu-item.is-active {
  background: #4b6eca;
  color: #fff;
  border-radius: 3px;
}
.el-serach {
  float: right;
  border: 2px #4b6eca solid;
  border-radius: 3px;
}
.el-serach .el-date-editor {
  width: 178px;
}
.el-serach .el-input__inner {
  background: none;
  border: none;
  color: #4b6eca;
  width: 178px;
}
.el-serach .el-input__inner:placeholder {
  color: #4b6eca;
}
.el-serach .el-input__inner:-webkit-input-placeholder {
  color: #4b6eca;
}
.el-serach .el-input__inner:-moz-placeholder {
  color: #4b6eca;
}
.el-serach .el-input__inner:-ms-input-placeholder {
  color: #4b6eca;
}
.el-serach .el-button {
  background: #4b6eca;
  color: #fff;
}
.app-page-container {
  border-radius: 6px;
  padding: 20px;
  background: #fff;
}
</style>