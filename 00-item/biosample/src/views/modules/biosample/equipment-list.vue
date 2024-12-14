<template>
  <div class="mod-config">
    <el-form size="mini" :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('biosample:equipment:save')" type="primary" @click="addOrUpdateHandle()">新增冰箱</el-button>
        <router-link :to="{path: '/biosample-equipmentgroup'}">
          <el-button v-if="isAuth('biosample:equipmentgroup:list')" type="plain">容器组管理</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <el-row :gutter="10">
      <el-col :span="8" v-for="item in dataList" :key="item.id">
        <el-card :body-style="{ padding: '0px' }" style="margin-bottom: 10px">
          <el-row>
            <el-col :span="8">
              <img style="width: 100px; height: 110px" :src="item.photo" />
            </el-col>
            <el-col :span="16">
              <p style="font-weight: bold">
                {{item.name}} ({{item.brand}})
              </p>
              <p>
                编码：{{item.code}}
              </p>
              <p>
                型号：{{item.equipmentModelName}}
              </p>
              <p>
                层列：{{item.rowNums}} * {{item.columnNums}}   / 长宽高：{{item.depth}} * {{item.width}} * {{item.height}}
              </p>
            </el-col>
            <el-col :span="24">
              <div style="margin-left: 10px">
                <table style="width: 100%; cellpadding: 0px; cellspacing: 0px">
                  <tr>
                    <td>冻存架：<span style="color: lightseagreen">{{item.shelfCnt}}</span></td>
                    <td>冻存盒：<span style="color: lightseagreen">{{item.boxCnt}}</span></td>
                    <td>样本：<span style="color: lightseagreen">{{item.sampleCnt}}</span></td>
                  </tr>
                </table>
              </div>
            </el-col>
          </el-row>
          <div>
            <div class="bottom clearfix" style="text-align: center; margin: 5px">
              <el-button-group size="mini">
                <el-button size="mini" type="plain" @click="addOrUpdateHandle(item.id)">修改</el-button>
                <el-button size="mini" type="primary">配置</el-button>
                <el-button size="mini" type="plain" @click="deleteHandle(item.id)">删除</el-button>
                <!--<el-button size="mini" type="plain">复制</el-button>-->
              </el-button-group>
            </div>
          </div>
        </el-card>
      </el-col>

    </el-row>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[12, 24, 48, 120]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './equipment-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 12,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/biosample/equipment/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/biosample/equipment/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>
