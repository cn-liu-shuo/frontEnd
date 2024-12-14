<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataList[0].propId ? '新增' : '修改'"
    :close-on-click-modal="false"
  >
    <el-table :data="dataList" border style="width: 100%">
      <el-table-column
        prop="propName"
        header-align="center"
        align="center"
        label="属性名称"
      >
        <template #default="scope">
          <el-input
            v-model="scope.row.propName"
            placeholder="请输入内容"
            maxlength="10"
            show-word-limit
            clearable
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="prodPropValues"
        header-align="center"
        align="center"
        label="属性值"
      >
        <template #default="scope">
          <el-col
            v-for="item in scope.row.prodPropValues"
            :key="item.valueId"
            :span="12"
          >
            <el-input
              v-model="item.propValue"
              placeholder="请输入内容"
              class="prop-value-input"
              maxlength="20"
              show-word-limit
              clearable
              @clear="clearProdPropValues"
            />
          </el-col>
          <el-col :span="4">
            <el-button
              v-show="
                scope.row.prodPropValues[scope.row.prodPropValues.length - 1]
                  .propValue
              "
              type="primary"
              class="add-input"
              icon="el-icon-circle-plus"
              @click="addInput()"
            />
          </el-col>
        </template>
      </el-table-column>
    </el-table>
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
      dataList: [{ propId: 0, propName: "", prodPropValues: [{ valueId: 0 }] }],
      page: {
        total: 0,
        current: 1,
        size: 10,
      },
    };
  },

  mounted() {},

  methods: {
    init(val) {
      if (val) {
        this.dataList = [JSON.parse(JSON.stringify(val))];
      } else {
        this.dataList = [
          { propId: 0, propName: "", prodPropValues: [{ valueId: 0 }] },
        ];
      }
      this.visible = true;
    },
    /**
     * 表单提交
     */
    onSubmit() {
      if (this.dataList[0].prodPropValues) {
        const temp = [];
        for (const key in this.dataList[0].prodPropValues) {
          // eslint-disable-next-line no-prototype-builtins
          if (this.dataList[0].prodPropValues.hasOwnProperty(key)) {
            const element = this.dataList[0].prodPropValues[key];
            if (element.propValue) {
              temp.push(this.dataList[0].prodPropValues[key]);
            }
          }
        }
        this.dataList[0].prodPropValues = temp;
      }
      if (!this.dataList[0].propName.trim()) {
        this.dataList[0].propName = "";
        this.$message.error("属性名不能为空");
        return;
      }
      if (this.dataList[0].prodPropValues.length < 1) {
        this.dataList[0].prodPropValues = [{ valueId: 0 }];
        this.$message.error("规格项不能为空");
        return;
      }
      if (this.dataList[0].propName.length > 10) {
        this.$message.error("属性名称长度不能大于10");
        return;
      }
      if (this.dataList[0].prodPropValues.find((el) => !el.propValue.trim())) {
        this.$message.error("属性值不能为空");
        return;
      }
      if (
        this.dataList[0].prodPropValues.find((el) => el.propValue.length > 20)
      ) {
        this.$message.error("属性值长度不能大于20");
        return;
      }
      this.$http({
        url: this.$http.adornUrl("/prod/spec"),
        method: this.dataList[0].propId ? "put" : "post",
        data: this.$http.adornData({
          propId: this.dataList[0].propId || undefined,
          propName: this.dataList[0].propName,
          prodPropValues: this.dataList[0].prodPropValues,
        }),
      }).then(() => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.visible = false;
        this.$emit("refreshDataList", this.page);
      });
    },
    clearProdPropValues() {
      if (this.dataList[0].prodPropValues.length === 1) {
        return;
      }
      for (let i = 0; i < this.dataList[0].prodPropValues.length; i++) {
        const element = this.dataList[0].prodPropValues[i];
        if (!element.propValue) {
          this.dataList[0].prodPropValues.splice(i, 1);
        }
      }
    },
    addInput() {
      const temp = this.dataList[0].prodPropValues;
      if (temp[temp.length - 1].propValue) {
        temp.push({});
      }
    },
  },
};
</script>

<style scoped lang="scss">
.prop-value-input {
  padding: 3px;
}

.add-input {
  margin: 3px;
}
</style>
