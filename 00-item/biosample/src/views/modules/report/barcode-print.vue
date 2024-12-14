<template>
  <div>
    <el-dialog
      title="条形码预打印"
      width="300px"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <div style="max-height: 260px; overflow-y: auto; overflow-x: hidden">
        <div v-for="(item, idx) in barcodeList" :id="'mybarcode'+idx">
          <svg :class="'barcode' + idx"
               :id="'barcode' + idx"
               jsbarcode-format="CODE128A"
               jsbarcode-linecolor="#FF"
               jsbarcode-displayvalue="true"
               jsbarcode-width="1"
               jsbarcode-height="20"
               :jsbarcode-value="item.barcodeValue"
               jsbarcode-textmargin="0"
               jsbarcode-margin="1"
               jsbarcode-fontsize="8">
          </svg>
        </div>
      </div>
      <div v-if="barcodeList.length <= 0" style="text-align: center">
        <span>无条码，请点击打印按钮生成</span>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-tooltip effect="dark" content="重新生成样本条码，并打印" placement="top">
          <el-input placeholder="条码个数" v-model="barcodeCnt" size="mini" style="width: 150px">
            <el-button slot="append" icon="el-icon-printer" type="primary"  :loading="printLoading" @click="init">打印</el-button>
          </el-input>
        </el-tooltip>

        <el-button size="mini" @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import JsBarcode from 'jsbarcode'
  import { getLodop } from '@/utils/LodopFuncs'
  import codecApi from '@/api/codecSequence'
  export default {
    data () {
      return {
        visible: false,
        printLoading: false,
        barcodeCnt: 1,
        barcodeList: []
      }
    },
    methods: {
      showDialog () {
        this.barcodeList = []
        this.visible = true
      },
      init () {
        this.printLoading = true
        this.barcodeList = []
        this.barcodeCnt = parseInt(this.barcodeCnt)
        if (this.barcodeCnt <= 0) {
          this.$message({
            message: '条码个数不能少于0 ！',
            type: 'warning',
            duration: 1000
          })
          this.printLoading = false
          return false
        }
        let SequenceRequest = {
          sequenceName: 'sample_code',
          requestCnt: this.barcodeCnt
        }
        codecApi.getSequenceNo(SequenceRequest).then(res => {
          for (let idx in res.data.sequenceList) {
            let curItem = res.data.sequenceList[idx]
            this.barcodeList.push({barcodeValue: curItem})
          }
          this.$nextTick(() => {
            for (let idx in this.barcodeList) {
              JsBarcode('.barcode' + idx).init()
            }
            this.printPdf()
            this.printLoading = false
          })
        }).catch(err => {
          console.error(err)
        })
      },
      // 查询数据
      printPdf () {
        let LODOP = getLodop()
        LODOP.PRINT_INIT('')
        LODOP.SET_PRINT_PAGESIZE(1, 450, 170, '')
        // LODOP.ADD_PRINT_HTM(88, 200, 350, 600,
        for (let i = 0; i < this.barcodeList.length; i++) {
          LODOP.NewPage()
          LODOP.ADD_PRINT_HTM(0, 0, 450, 170,
            document.getElementById('mybarcode' + i).innerHTML)
        }
        // LODOP.PRINT()
        LODOP.PREVIEW()
      }
    }
  }
</script>
