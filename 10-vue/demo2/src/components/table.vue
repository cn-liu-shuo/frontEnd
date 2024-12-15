<template>
  <div  class="scrollable-area">
    <!-- -->
    <!-- data 表格的数据 -->
    <el-table :data="tableData" stripe border style="width: 100%">
        <!-- 多选 -->
      <el-table-column type="selection" fixed width="55"> </el-table-column>
      <!-- 排序 -->
      <el-table-column type="index" width="55" label="序号"> </el-table-column>
      <!-- prop 对应列内容的字段名-->
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="180"> 
        <!-- 插槽 -->
        <template v-slot="scope">
            <!-- 当前行的所有信息 -->
            <!-- {{ scope.row }} -->
            <el-tag v-if="scope.row.sex == 0">男</el-tag>
            <el-tag v-else type="success">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="like" label="爱好" width="180"> </el-table-column>
      <el-table-column prop="address" show-overflow-tooltip label="地址" width="180"> </el-table-column>
      <el-table-column prop="grade" label="成绩" width="180"> </el-table-column>
      <el-table-column label="操作" width="180" fixed="right"> 
        <template>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
            <el-button icon="el-icon-search" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          sex: 0,
          like: "于昊天",
          grade: 100
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          sex: 1,
          like: "于昊天",
          grade: 100
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          sex: 1,
          like: "于昊天",
          grade: 100
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          sex: 1,
          like: "于昊天",
          grade: 100
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
    
</style>
