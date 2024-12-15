<template>
    <div>
        <h1>huo</h1>
        <div class="box">
            <p>
                <span>哈哈</span>
            </p>
            <p>
                <span>嘿嘿</span>
            </p>
        </div>
        <div class="huo">huo</div>
        <texts></texts>
    </div>
</template>
<script>
import texts from "./text"
    export default{
        components: {
            texts
        }
    }
</script>
<style scoped lang="scss">

// 导入scss文件

@import '@/assets/style.scss';


/* scoped 只在当前组件中生效， 减少样式冲突 */
// lang css/scss/less/sass
// css:层叠样式表
// sass: 是一种动态语言 新增变量 运算
// scss: sass引入的新语法，兼容css3 继承sass
// less 是一个css预处理语言 新增变量等  less比sass和scss慢，所以一般公司都用scss
// .box p span{
//     color: aqua;
// }
// 变量 用$+名字
$main-color: #ccc; 
$width: 100px;
$height: 20px;

h1 {
    background-color: $main-color;
    height: $width + $height;
}
// ::v-deep  /deep/ 样式穿透
// css层级太深不好改样式   ::v-deep解决这个问题
::v-deep .text h1{
    background-color: aquamarine !important;
}


.huo {
    background-color: aquamarine;
}
</style>