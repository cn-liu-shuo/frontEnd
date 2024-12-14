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
            <div style="width: 68px; height: 68px; border:1px solid #f0f0f0;cursor: hand;" @click="picSelect('static/img/biosample/blood.png')">
              <img src="static/img/biosample/blood.png"  style="width: 100%; height: 100%; cursor: hand;" alt="" />
            </div>
          </el-col>
          <el-col :span="6">
            <div style="width: 68px; height: 68px; border:1px solid #f0f0f0;cursor: hand;" @click="picSelect('static/img/biosample/redcell.png')">
              <img src="static/img/biosample/redcell.png" style="width: 100%; height: 100%; cursor: hand;" alt="" />
            </div>
          </el-col>
          <el-col :span="6">
            <div style="width: 68px; height: 68px; border:1px solid #f0f0f0;cursor: hand;" @click="picSelect('static/img/biosample/whitecell.png')">
              <img src="static/img/biosample/whitecell.png" style="width: 100%; height: 100%; cursor: hand;" alt="" />
            </div>
          </el-col>
          <el-col :span="6">
            <div style="width: 68px; height: 68px; border:1px solid #f0f0f0;cursor: hand;" @click="picSelect('static/img/biosample/platelets.png')">
              <img src="static/img/biosample/platelets.png" style="width: 100%; height: 100%; cursor: hand;" alt="" />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="5" style="margin-top: 10px">
          <el-col :span="6">
            <div style="width: 68px; height: 68px; border:1px solid #f0f0f0;cursor: hand;" @click="picSelect('static/img/biosample/xuejiang.png')">
              <img src="static/img/biosample/xuejiang.png" @click="picSelect('static/img/biosample/blood.png')" style="width: 100%; height: 100%; cursor: hand;" alt="" />
            </div>
          </el-col>
          <el-col :span="6">
            <div style="width: 68px; height: 68px; border:1px solid #f0f0f0;cursor: hand;" @click="picSelect('static/img/biosample/xueqing.png')">
              <img src="static/img/biosample/xueqing.png" style="width: 100%; height: 100%; cursor: hand;" alt="" />
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
