<template>
  <div>
    <!-- 查 -->
    <div class="search" style="height: 64px;">
      <el-row :gutter="8">
        <el-col :span="4">
          <el-input size="mini" placeholder="设备名称/设备编码" v-model="queryInfo.tableInfo.key" clearable></el-input>
        </el-col>
        <el-col :span="20">
          <el-dropdown size="mini" split-button @click="lsOnSearch()">
            查询
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="lsAdvancedSearch()">高级查询</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="lsOnReset()">重置查询</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button size="mini" type="primary" @click="lsEquipmentAddOrUpdate()">新增冰箱</el-button>
          <el-button size="mini" @click="lsGoEquipmentGroup()">容器组管理</el-button>
          <el-button size="mini" @click="lsGoForzenshelf()">冻存架（分区）管理</el-button>
          <el-button size="mini">冻存盒管理</el-button>
          <el-button size="mini" type="primary" @click="lsOnExportExcel()">导出EXCEL</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 表 -->
    <div class="table">
      <el-row :gutter="10">
        <el-col :span="8" v-for="item in tableList" :key="item.index">
          <el-card :body-style="{ padding: '0px' }" style="margin-bottom: 10px;">
            <el-row>
              <el-col :span="8">
                <img width="100" height="110" :src="item.photo" alt="">
              </el-col>
              <el-col :span="16">
                <p style="font-weight: 700;">{{ item.name }}（{{ item.brand }}）</p>
                <p>编码：BS-{{ item.code }}</p>
                <p>型号：{{ item.equipmentModelName }}</p>
                <p>
                  层列：
                  <span style="color: lightseagreen;">{{ item.rowNums }} * {{ item.columnNums }}</span>
                  / 长宽高：{{ item.depth }} * {{ item.width }} * {{ item.height }}
                </p>
              </el-col>
              <el-col :span="24">
                <div style="margin-left: 10px;">
                  <table style="width: 100%;">
                    <tr>
                      <td>
                        冻存架：
                        <span style="color: lightseagreen;">{{ item.shelfCnt }}</span>
                      </td>
                      <td>
                        冰冻盒：
                        <span style="color: lightseagreen;">{{ item.boxCnt }}</span>
                      </td>
                      <td>
                        样本：
                        <span style="color: lightseagreen;">{{ item.sampleCnt }}</span>
                      </td>
                    </tr>
                  </table>
                </div>
              </el-col>
            </el-row>
            <div>
              <div style="margin: 15px 0 10px 0;text-align: center;">
                <el-button-group>
                  <el-button size="mini">编辑</el-button>
                  <el-button size="mini" type="primary" @click="lsOpenRefrigerator(item.id)">打开冰箱</el-button>
                  <el-button size="mini" @click="lsOnDel(item.id)">删除</el-button>
                </el-button-group>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 页 -->
    <div class="pagination">
      <pagination :total="total" :currentPage="queryInfo.tableInfo.page" :pageSize="queryInfo.tableInfo.limit" :page="page" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pagination>
    </div>
    <!-- 框 -->
    <div class="dialog">
      <el-dialog title="高级查询" :visible.sync="dialogVisible" width="50%">
        <el-form ref="form" :model="queryInfo.tableInfo" label-width="100px" size="mini">
          <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item label="设备名称">
                <el-input v-model="queryInfo.tableInfo.name" placeholder="设备名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备编码">
                <el-input v-model="queryInfo.tableInfo.code" placeholder="设备编码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item label="设备型号">
                <el-input v-model="queryInfo.tableInfo.equipmentModelName" placeholder="设备型号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="品牌">
                <el-input v-model="queryInfo.tableInfo.brand" placeholder="品牌"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item label="冻存架数量">
                <el-row>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.shelfCntStart" placeholder="起始值"></el-input>
                  </el-col>
                  <el-col :span="2">
                    -
                  </el-col>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.shelfCntEnd" placeholder="结束值"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="冻存盒数量">
                <el-row>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.boxCntStart" placeholder="起始值"></el-input>
                  </el-col>
                  <el-col :span="2">
                    -
                  </el-col>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.boxCntEnd" placeholder="结束值"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item label="样本数量">
                <el-row>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.sampleCntStart" placeholder="起始值"></el-input>
                  </el-col>
                  <el-col :span="2">
                    -
                  </el-col>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.sampleCntEnd" placeholder="结束值"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="宽度范围">
                <el-row>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.widthStart" placeholder="起始值"></el-input>
                  </el-col>
                  <el-col :span="2">
                    -
                  </el-col>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.widthEnd" placeholder="结束值"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item label="高度范围">
                <el-row>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.heightStart" placeholder="起始值"></el-input>
                  </el-col>
                  <el-col :span="2">
                    -
                  </el-col>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.heightEnd" placeholder="结束值"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="深度范围">
                <el-row>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.depthStart" placeholder="起始值"></el-input>
                  </el-col>
                  <el-col :span="2">
                    -
                  </el-col>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.depthEnd" placeholder="结束值"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item label="层数范围">
                <el-row>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.rowNumsStart" placeholder="起始值"></el-input>
                  </el-col>
                  <el-col :span="2">
                    -
                  </el-col>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.rowNumsEnd" placeholder="结束值"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="列数范围">
                <el-row>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.columnNumsStart" placeholder="起始值"></el-input>
                  </el-col>
                  <el-col :span="2">
                    -
                  </el-col>
                  <el-col :span="11">
                    <el-input v-model="queryInfo.tableInfo.columnNumsEnd" placeholder="结束值"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="text-align: right;margin-bottom: 0;margin-top: 20px">
            <el-button size="mini" @click="lsOnReset()">重置</el-button>
            <el-button size="mini" @click="dialogVisible = false">取消</el-button>
            <el-button size="mini" type="primary" @click="lsOnSearch()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <equipment-add-or-update ref="equipmentAddOrUpdateRef" v-if="equipmentAddOrUpdateVisible"></equipment-add-or-update>
  </div>
</template>

<script>
import fileDownload from 'js-file-download'
import equipment from '../../../api/equipment'
import pagination from '../../../components/pagination'
import equipmentAddOrUpdate from './equipment-add-or-update.vue'
export default {
  components: {
    pagination,
    equipmentAddOrUpdate
  },
  data () {
    return {
      equipmentAddOrUpdateVisible: false,
      dialogVisible: false,
      visible: false,
      queryInfo: {
        tableInfo: {
          key: null,
          name: null,
          code: null,
          equipmentModelName: null,
          brand: null,
          shelfCntStart: null,
          shelfCntEnd: null,
          boxCntStart: null,
          boxCntEnd: null,
          sampleCntStart: null,
          sampleCntEnd: null,
          rowNumsStart: null,
          rowNumsEnd: null,
          columnNumsStart: null,
          columnNumsEnd: null,
          widthStart: null,
          widthEnd: null,
          heightStart: null,
          heightEnd: null,
          depthStart: null,
          depthEnd: null,
          page: 1,
          limit: 12
        }
      },
      tableList: [],
      total: null,
      page: [12, 24, 48, 120]
    }
  },
  created () {
    this.lsGetTableList()
  },
  methods: {
    lsGetTableList () {
      equipment.getEquipmentList(this.queryInfo.tableInfo).then(({data}) => {
        this.tableList = data.page.list
        this.total = data.page.totalCount
      })
    },
    handleSizeChange (val) {
      this.queryInfo.tableInfo.limit = val
      this.queryInfo.tableInfo.page = 1
      this.lsGetTableList()
    },
    handleCurrentChange (val) {
      this.queryInfo.tableInfo.page = val
      this.lsGetTableList()
    },
    // 查询
    lsOnSearch () {
      this.lsGetTableList()
      this.dialogVisible = false
    },
    // 高级查询
    lsAdvancedSearch () {
      this.queryInfo.tableInfo = {
        key: null,
        name: null,
        code: null,
        equipmentModelName: null,
        brand: null,
        shelfCntStart: null,
        shelfCntEnd: null,
        boxCntStart: null,
        boxCntEnd: null,
        sampleCntStart: null,
        sampleCntEnd: null,
        rowNumsStart: null,
        rowNumsEnd: null,
        columnNumsStart: null,
        columnNumsEnd: null,
        widthStart: null,
        widthEnd: null,
        heightStart: null,
        heightEnd: null,
        depthStart: null,
        depthEnd: null,
        page: 1,
        limit: 12
      }
      this.dialogVisible = true
    },
    // 重置查询
    lsOnReset () {
      this.queryInfo.tableInfo = {
        key: null,
        name: null,
        code: null,
        equipmentModelName: null,
        brand: null,
        shelfCntStart: null,
        shelfCntEnd: null,
        boxCntStart: null,
        boxCntEnd: null,
        sampleCntStart: null,
        sampleCntEnd: null,
        rowNumsStart: null,
        rowNumsEnd: null,
        columnNumsStart: null,
        columnNumsEnd: null,
        widthStart: null,
        widthEnd: null,
        heightStart: null,
        heightEnd: null,
        depthStart: null,
        depthEnd: null,
        page: 1,
        limit: 12
      }
      this.lsGetTableList()
    },
    // 新增冰箱
    lsEquipmentAddOrUpdate () {
      this.equipmentAddOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.equipmentAddOrUpdateRef.init()
      })
    },
    // 容器组管理
    lsGoEquipmentGroup () {
      this.$router.push('/biosample-equipmentgroup')
    },
    // 冻存架（分区）管理
    lsGoForzenshelf () {
      this.$router.push('/biosample-forzenshelf')
    },
    // 导出
    lsOnExportExcel () {
      equipment.exportExcel(this.queryInfo.tableInfo).then(response => {
        let blob = new Blob([response.data], {
          type: 'application/vnd.ms-excel'
        })
        fileDownload(blob, '样本来源' + Date.parse(new Date()) + '.xlsx')
      })
    },
    // 打开冰箱
    lsOpenRefrigerator (id) {
      this.$router.push({
        path: `/biosample/equipment-edit/${id}`
      })
    },
    // 删除
    lsOnDel (id) {
      this.$confirm(`确定对[id=${id}]进行删除操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        equipment.delete(id).then(res => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }

}
</script>