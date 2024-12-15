<template>
  <div>
    <!-- -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
        type: Number
    },
    currentPage: {
        type: Number
    }
  },
  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        // this.query.rows = val
        // this.query.page = 1
        // this.getList()
        this.$emit("rows", val)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        // this.query.page = val
        // this.getList()
        this.$emit('pages', val)
      }
  },
};
</script>