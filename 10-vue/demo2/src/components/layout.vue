<template>
    <div>
        <!-- -->
        <el-form ref="form" :model="form" label-width="80px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="活动名称">
                        <el-input v-model="msg"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="活动名称">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="活动名称">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="活动名称">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="活动名称">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="活动名称">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                
            </el-row>
        </el-form>

    </div>
</template>

<script>
export default {
name: "hi",
  data() {
    return {
      form: {

      },
      msg: ''
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>