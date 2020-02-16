<template>
  <div class="app-page">
  <div  class="app-page-container">
   <div class="app-page-select">
   <el-form :model="searchForm" :inline="true">   
        <div class="select-from-inline">
        <el-form-item>
            <el-button type="primary" class="redbtn"  @click="openAdd">新建调度命令</el-button>
        </el-form-item>
        <el-form-item  label="机车名称">
             <el-select v-model="searchForm.area" placeholder="请选择" @change="getAreaLists" clearable>
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="值班调度">  
            <el-select v-model="searchForm.area" placeholder="请选择" @change="getAreaLists" clearable>
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="车长">  
            <el-select v-model="searchForm.area" placeholder="请选择" @change="getAreaLists" clearable>
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="司机">  
            <el-select v-model="searchForm.area" placeholder="请选择" @change="getAreaLists" clearable>
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        </div>
    <div class="select-from-inline">
         <el-form-item>
            <el-button type="primary" class="bluebtn">更多信息<i class="el-icon-plus el-icon--right"></i></el-button>
        </el-form-item>
         <el-form-item label="命令状态">  
            <el-select v-model="searchForm.area" placeholder="请选择" @change="getAreaLists" clearable>
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="开始时间">  
           <el-date-picker type="date" placeholder="选择日期" v-model="searchForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
         <el-form-item label="结束时间">  
            <el-date-picker type="date" placeholder="选择日期" v-model="searchForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
            <label class="el-form-item__label"></label>
           <el-button size="small" icon="el-icon-search" type="primary" @click="getUsersLists">查询</el-button>
       </el-form-item>
    </div>
      </el-form>
    </div>
     <div  class="app-table">
      <el-table   :data="tableData">
        <el-table-column prop="nums" label="命令号" width="140"></el-table-column>
        <el-table-column prop="txt" label="受令司机" width="120"></el-table-column>
        <el-table-column prop="txt" label="守令车长"></el-table-column>
        <el-table-column prop="txt" label="守令司机"></el-table-column>
        <el-table-column prop="txt" label="受令处所"></el-table-column>
        <el-table-column prop="txt" label="值班调度"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column class-name="app-nowarp" prop="datatimes" label="发令时间"></el-table-column>
        <el-table-column class-name="app-nowarp" prop="datatimes" label="确认时间"></el-table-column>
        <el-table-column prop="txt" label="操作" width="240">
             <template slot-scope="scope">
            <div class="app-operation">
            <el-button class="btn-blue" size="mini" @click="goDetail(scope.row.id)">详情</el-button>
            <el-button class="btn-blue" size="mini" @click="goDetail(scope.row.id)">作废</el-button>
            <el-button class="btn-red" size="mini" @click="goDetail(scope.row.id)">删除</el-button>
            <el-button class="btn-green" size="mini" @click="goDetail(scope.row.id)">打印</el-button>
            </div>
        </template>
        </el-table-column>
      </el-table>
      <div class="app-pagination">
        <el-pagination class="pagination" layout="prev, pager, next,total" :total="1000" prev-text="上一页" next-text="下一页"> </el-pagination>
      </div>
     </div>
  </div>

  <!-- add -->
  <el-dialog class="app-dialog" title="添加部门信息" :visible.sync="isVisible">
        <el-form >
          <el-form-item label="公司名称" label-width="120px">
            <el-select placeholder="请选择" @change="getAreaLists" clearable>
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="部门名称" label-width="120px">
              <el-input  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否属于施工队" label-width="120px">
              <el-radio label="1">是</el-radio>
              <el-radio  label="0">否</el-radio>
            </el-form-item>
            <el-form-item label="部门详情" label-width="120px">
              <el-input autocomplete="off" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isVisible = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </div>
      </el-dialog>

</div>
</template>

<script>
export default {
  name: '',
  data() {
      const item = {
        nums: '201900000',
        txt: '测试数据库',
        status:'已确认',
        datatimes:'2019-02-16'
      };
      
      return {
         isVisible:false,
        tableData: Array(10).fill(item),
         searchForm:{
                time_range:[],
                area:"",
                street:"",
                keyword:"",
                 date1: "",
            },
         options: [{
          value: '选项1',
          label: '下拉选择1'
        }, {
          value: '选项2',
          label: '下拉选择2'
        }, {
          value: '选项3',
          label: '下拉选择3'
        }, {
          value: '选项4',
          label: '下拉选择4'
        }],
      }
  },
  computed:{
  },
  methods: {
     openAdd(){
          this.isVisible = true;
   },
  },
};
</script>

<style>
.app-page-select{margin-bottom: 10px; width: 100%;}
.app-page-select .select-from-inline .el-form-item__label{width: 70px;}
.app-page-select .select-from-inline{display: flex}
.app-page-select .select-from-inline .el-form-item{display: flex}
.app-page-select .select-from-inline .bluebtn{ width: 120px; margin-right: 20px} 
.app-page-select .select-from-inline .redbtn{background: #FF5C75;width: 120px;border-color:#FF5C75; margin-right: 20px} 
.app-page-select .select-from-inline  .input{ width: 120px;} 
</style>
