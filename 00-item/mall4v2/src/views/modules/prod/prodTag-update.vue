<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
  >
    <el-form
      ref="dataFormRef"
      :model="dataForm"
      :rules="dataRule"
      label-width="80px"
      @keyup.enter="onSubmit()"
    >
      <el-form-item
        label="标签名称"
        :rules="[
          { required: true, message: '标签名称不能为空', trigger: 'blur' },
          {
            pattern: /\s\S+|S+\s|\S/,
            message: '请输入正确的标签名称',
            trigger: 'blur',
          },
        ]"
        prop="title"
      >
        <el-input v-model="dataForm.title" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="dataForm.status" v-removeAriaHidden>
          <el-radio :label="1"> 正常 </el-radio>
          <el-radio :label="0"> 禁用 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="列表样式" prop="style">
        <el-radio-group v-model="dataForm.style" v-removeAriaHidden>
          <el-radio :label="0"> 一列一个 </el-radio>
          <el-radio :label="1"> 一列两个 </el-radio>
          <el-radio :label="2"> 一列三个 </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="排序" prop="seq">
        <el-input-number
          v-model="dataForm.seq"
          controls-position="right"
          :min="0"
          label="排序号"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false"> 取消 </el-button>
        <el-button type="primary" @click="onSubmit()"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataRule: {},
      dataForm: {
        id: null,
        title: null,
        shopId: null,
        status: 1,
        isDefault: null,
        prodCount: null,
        seq: null,
        style: 0,
      },
      dataFormRef: null,
    };
  },

  mounted() {},

  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.dataFormRef.resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl("/prod/prodTag/info/" + this.dataForm.id),
            method: "get",
            params: this.$http.adornParams(),
          }).then(({ data }) => {
            this.dataForm = data;
          });
        }
      });
    },
    /**
     * 表单提交
     */
    onSubmit() {
      this.$refs.dataFormRef.validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl("/prod/prodTag"),
            method: this.dataForm.id ? "put" : "post",
            data: this.$http.adornData(this.dataForm),
          }).then(() => {
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.visible = false;
            this.$emit("refreshDataList");
          });
        }
      });
    },
  },
};
</script>
