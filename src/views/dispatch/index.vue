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
        <el-table-column prop="nums" label="命令号"></el-table-column>
        <el-table-column prop="txt" label="受令机车"></el-table-column>
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
  <el-dialog class="app-dialog app-dialog-addtop" width="880px" title="添加信息" :visible.sync="isVisible">
        <el-form label-position="top"  :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm">
          <el-form-item label="命令号码"  prop="name">
              <el-input  v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="受令机车">
            <el-select placeholder="请选择" @change="getAreaLists" clearable>
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </el-form-item>
              <el-form-item label="类型">
            <el-select placeholder="请选择" @change="getAreaLists" clearable>
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </el-form-item>
              <el-form-item label="受令机长">
            <el-select placeholder="请选择" @change="getAreaLists" clearable>
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </el-form-item>
              <el-form-item label="受令处所">
            <el-select placeholder="请选择" @change="getAreaLists" clearable>
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </el-form-item>
               <el-form-item label="受令司机">
            <el-select placeholder="请选择" @change="getAreaLists" clearable>
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </el-form-item>
             <el-form-item label="值班调度">
            <el-select placeholder="请选择" @change="getAreaLists" clearable>
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="受令车站">
              <el-input  autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="车站值班员">
            <el-select placeholder="请选择" @change="getAreaLists" clearable>
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </el-form-item> 
            <el-form-item label="调度命令内容">
            <el-select placeholder="请选择" @change="getAreaLists" clearable>
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
             <el-button type="primary" class="bluebtn">删除选中模板</el-button>
             <el-button type="primary" class="redbtn">新建调度内容模板<i class="el-icon-plus el-icon--right"></i></el-button>
            </el-form-item>
            <div class="blank"></div>
             <div class="contents">
              <el-input type="textarea"></el-input>
          </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
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

        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入命令号码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
  },
  computed:{
  },
  methods: {
     openAdd(){
          this.isVisible = true;
   },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
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

.app-dialog-addtop{padding-left: 10px; margin-top: -5vh;}
.app-dialog-addtop .el-dialog__body{padding: 15px 0 20px 20px}
.app-dialog-addtop .el-form-item{margin-bottom: 10px;}
.app-dialog-addtop .el-form-item__label{width: 100px}
.app-dialog-addtop .el-input input{ width: 200px;} 
.app-dialog-addtop .bluebtn{margin-left:10px}
.app-dialog-addtop .redbtn{background: #FF5C75;border-color:#FF5C75; } 
.app-dialog-addtop .contents{display: block}
.app-dialog-addtop .contents .el-textarea{width: 98%;}
.app-dialog-addtop .contents .el-textarea__inner{width: 100%;height:120px;}
.app-dialog-addtop .el-form-item__error{padding-top: 5px;}
</style>
