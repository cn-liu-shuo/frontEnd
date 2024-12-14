<template>
  <div>
    <el-dialog
      title="选择图片"
      width="400px"
      :close-on-click-modal="false"
      :visible.sync="visible"
      append-to-body>
      <div>
        <el-row :gutter="5">
          <el-col :span="6">
            <div style="width: 68px; height: 68px; border:1px solid #f0f0f0;cursor: hand;" @click="picSelect('static/img/biosample/equipment/equipment.png')">
              <img src="static/img/biosample/equipment/equipment.png"  style="width: 100%; height: 100%; cursor: hand;" alt="" />
            </div>
          </el-col>
          <el-col :span="6">
            <div style="width: 68px; height: 68px; border:1px solid #f0f0f0;cursor: hand;" @click="picSelect('static/img/biosample/equipment/equipment_ml.png')">
              <img src="static/img/biosample/equipment/equipment_ml.png" style="width: 100%; height: 100%; cursor: hand;" alt="" />
            </div>
          </el-col>
          <el-col :span="6">
            <div style="width: 68px; height: 68px; border:1px solid #f0f0f0;cursor: hand;" @click="picSelect('static/img/biosample/equipment/equipment_ym.png')">
              <img src="static/img/biosample/equipment/equipment_ym.png" style="width: 100%; height: 100%; cursor: hand;" alt="" />
            </div>
          </el-col>
          <el-col :span="6">
            <div style="width: 68px; height: 68px; border:1px solid #f0f0f0;cursor: hand;" @click="picSelect('static/img/biosample/equipment/yedanguan.png')">
              <img src="static/img/biosample/equipment/yedanguan.png" style="width: 100%; height: 100%; cursor: hand;" alt="" />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible: false
      }
    },
    methods: {
      init () {
        this.visible = true
      },
      // 查询数据
      picSelect (picUrl) {
        this.$emit('changePicture', picUrl)
        this.visible = false
      }
    }
  }
</script>
