<template>
  <div>
    <!-- 分页封装 -->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="current" :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="size"
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
    current: {
      type: Number
    },
    size: {
      type: Number
    }
  },
  data() {
    return {
      page: {
        total: 0,
        current: 1,
        size: 10
      }
    }
  },

  mounted() {

  },

  methods: {
    // 条数
    handleSizeChange(val) {
      this.$emit('setSizeChange', val)
    },
    // 页数
    handleCurrentChange(val) {
      this.$emit('setCurrentChange', val)
    }
  },
}
</script>