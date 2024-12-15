<template>
  <div>
    <!-- -->
    <div class="search">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户手机">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="归属人">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="跟进时间">
              <el-date-picker v-model="value1" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期"
                :default-time="['12:00:00']">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary">搜索</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="btn">
      <el-button>新增</el-button>
      <el-button>修改</el-button>
      <el-button>删除</el-button>
      <el-button>导出</el-button>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      form: {
        name: ''
      },
      value1: '',
    }
  },

  mounted() {

  },

  methods: {

  },
}
</script>