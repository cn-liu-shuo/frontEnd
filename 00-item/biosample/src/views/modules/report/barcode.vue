<template>
  <div>
    <el-dialog
      title="条形码"
      width="260px"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <div style="max-height: 260px; overflow-y: auto;">
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

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="visible = false">关闭</el-button>
        <el-button type="primary" size="mini" @click="printPdf">{{'打印(' + this.barcodeList.length + '个)'}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import JsBarcode from 'jsbarcode'
  import { getLodop } from '@/utils/LodopFuncs'
  export default {
    props: {
      barcodeList: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        visible: false
      }
    },
    methods: {
      init () {
        this.visible = true
        this.$nextTick(() => {
          for (let idx in this.barcodeList) {
            JsBarcode('.barcode' + idx).init()
          }
          /** JsBarcode('#barcode', '1234', {
            format: 'pharmacode',
            lineColor: '#0aa',
            width: 4,
            height: 40,
            displayValue: false
          }).init() */
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
