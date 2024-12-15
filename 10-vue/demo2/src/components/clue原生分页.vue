<template>
    <div class="clue">
        <div class="searchDiv">
            <el-form ref="form" :model="form" label-width="70px">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="客户姓名">
                            <el-input size="small" v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="客户手机">
                            <el-input size="small" v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="归属人">
                            <el-input size="small" v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="客户姓名">
                            <el-select v-model="value" size="small" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="线索状态">
                            <el-select v-model="value" size="small" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="跟进时间">
                            <el-date-picker size="small" v-model="value1" type="datetimerange" start-placeholder="开始日期"
                                end-placeholder="结束日期" :default-time="['12:00:00']">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button size="small" type="primary" @click="onSubmit">立即创建</el-button>
                            <el-button size="small">取消</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="tableDiv">
            <div class="btn" style="text-align: left">
                <el-button type="primary" size="small" plain icon="el-icon-search">新增</el-button>
                <el-button type="danger" size="small" plain icon="el-icon-search">删除</el-button>
                <el-button type="success" size="small" plain icon="el-icon-search">修改</el-button>
                <el-button type="warning" size="small" plain icon="el-icon-search">导出</el-button>
            </div>
            <div class="tables">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column type="index" width="50" label="线索编号">
                    </el-table-column>
                    <el-table-column prop="name" label="客户姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="phone" label="手机号码" width="180">
                    </el-table-column>
                    <el-table-column prop="channelName" label="渠道来源">
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间">
                    </el-table-column>
                    <el-table-column prop="owner" label="线索归属">
                    </el-table-column>
                    <el-table-column prop="status" label="线索状态">
                        <template v-slot="scope">
                            <!-- scope.row 获取当前行信息 -->
                            <el-tag v-if="scope.row.status == 1">已分配</el-tag>
                            <el-tag type="success" v-if="scope.row.status == 2">已跟进</el-tag>
                            <el-tag type="danger" v-if="scope.row.status == 3">回收</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="nextTime" label="下次根据时间">
                    </el-table-column>
                    <el-table-column label="操作">
                    </el-table-column>
                </el-table>
            </div>
            <!--@size-change 每页几条改变会触发  -->
            <!-- @current-change 第几页改变时会触发-->
            <!-- current-page 当前页数 -->
            <el-pagination 
            background 
            style="text-align: right;" 
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
            :current-page="query.pageNum" 
            :page-sizes="[10, 20, 30, 40]" 
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper" 
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { list } from "@/api/clue"
export default {

  data() {
    return {
        form: {

        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        value1: '',
        value2: '',
        tableData: [],
        total: 0,
        query: {
            pageNum: 1,
            pageSize: 10
        }
    
    };
  },
  created() {
    this.getList()
  },
  methods: {
    getList(){
        list(this.query).then(res => {
            console.log(res)
            if (res.code == 200) {
                this.tableData = res.rows
                this.total = res.total
            }
        })
    },
    onSubmit() {
        console.log('submit!');
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.query.pageNum = 1
        this.query.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.query.pageNum = val
        this.getList()
      }
  },
};
</script>
<style lang="scss" scoped>
.tables {
    padding: 20px 0;
}

::v-deep .el-table thead {
    background-color: #909399 !important;
}

::v-deep .el-table thead tr {
    background-color: #909399 !important;
}

::v-deep .el-table thead th {
    background-color: #f0f0f0 !important;

}
</style>