<template>
  <div>
    <!-- -->
    <el-dialog :title="id ? '修改' : '新增'" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" :before-close="resetForm">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="组编码" prop="groupCode">
          <el-input readonly v-model="ruleForm.groupCode" placeholder="组编码">
            <template slot="append" v-if="visible">
              <el-button @click="lsGetCodecsequence()">生成</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="组名称" prop="groupName">
          <el-input v-model="ruleForm.groupName" placeholder="组名称"></el-input>
        </el-form-item>
        <el-form-item label="管理员" prop="managerName">
          <el-input v-model="ruleForm.managerName" placeholder="管理员"></el-input>
        </el-form-item>
        <el-form-item label="组地址" prop="groupAddress">
          <el-input v-model="ruleForm.groupAddress" placeholder="组地址"></el-input>
        </el-form-item>
        <el-form-item label="是否可用" prop="name">
          <el-radio-group v-model="ruleForm.enabled">
            <el-radio :label="1">可用</el-radio>
            <el-radio :label="2">不可用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import equipment from '@/api/equipment'
export default {
  data () {
    return {
      visible: true,
      dialogVisible: false,
      id: null,
      ruleForm: {
        groupCode: '',
        groupName: '',
        managerName: '',
        groupAddress: '',
        enabled: 1,
        remark: ''
      },
      rules: {
        groupCode: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        groupName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        managerName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        groupAddress: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  mounted () {

  },

  methods: {
    lsInit (id) {
      this.dialogVisible = true
      this.id = id
      if (id) {
        equipment.lsGetEquipmentgroupRow(id).then(({data}) => {
          this.ruleForm = data.equipmentGroup
        })
      }
    },
    // 生成
    lsGetCodecsequence () {
      equipment.lsGetEquipmentGroupSequence().then(({ data }) => {
        if (data.code === 0) {
          this.ruleForm.groupCode = data.equipmentGroupSequence
          this.visible = false
        }
      })
    },
    // 确定
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id) {
            equipment.lsUpdateEquipmentgroup(this.ruleForm).then(({data}) => {
              if (data.code === 0) {
                this.dialogVisible = false
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.$emit('refresh')
              }
            })
          } else {
            equipment.lsPostEquipmentgroup(this.ruleForm).then(({data}) => {
              if (data.code === 0) {
                console.log(data)
                this.dialogVisible = false
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.$emit('refresh')
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      try {
        this.$refs.ruleForm.resetFields()
      } catch (e) {
        return true
      }
      this.dialogVisible = false
    }
  }
}
</script>