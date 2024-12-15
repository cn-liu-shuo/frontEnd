<template>
    <div>
        <h1>vuex</h1>
        <h2>state {{ this.$store.state.count }}</h2>
        <h2>计算getter  {{ this.$store.getters.count }}</h2>
        <el-button @click="change">修改mutations</el-button>
        <el-button @click="changeAct">修改action</el-button>
    </div>
</template>
<script>
    export default{
        data() {
            return{

            }
        },
        created() {
            // 调用子模块user里的变量
            console.log(this.$store.state.user.name);
            // this.$store.state 将vuex中的state数据取出来
            console.log(this.$store.state.count);
        },
        methods: {
            change(){
                // 非严格模式 直接通过this.$store.commit(mutations的方法名，传参)调用mutations
                this.$store.commit("CHANGE_COUNT", 10)
            },
            changeAct(){
                // 调用action方法
                this.$store.dispatch("handleChange", 666)
                // 调用子模块的action
                this.$store.dispatch("user/Rename")
            }
        }
    }

</script>