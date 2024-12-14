<script>
export default {
  name: 'index',
  props: {
    total: {
      type: Number
    },
    currentPage: {
      type: Number
    },
    pageSize: {
      type: Number
    },
    page: {
      type: Array,
      default: () => {
        return [10, 20, 50, 100]
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>

<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="page"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>

<style scoped lang="scss">

</style>
