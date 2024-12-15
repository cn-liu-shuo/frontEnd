<template>
    <div>
        <h1>son {{ money }}</h1>
        <h3> 父传子 {{ fatherMoney }}</h3>
        <button @click="send">儿子孝敬爸爸</button>
        <!-- 子组件直接获取父元素变量 this.$parent-->
        <h3>儿子直接拿 {{ this.$parent.msg }}</h3>

        <h1>爷爷 {{ $attrs['grandpa-msg'] }}</h1>
        <button @click="grandpaSend">孙子孝敬爷爷</button>
    </div>
</template>

<script>
    export default{
        name: "pages",
        // 父传子2, 子组件通过props接收数据
        props: {
            // 接收数据
            fatherMoney: {
                // 接收的数据类型
                type: String,
                // 必传属性
                // required: true,
                // 默认值
                default: "默认值"
            }
        },
        data(){
            return{
                msg: "儿子给爸爸",
                money: 1,
                gift: "给爷爷买了个衣服"
            }
        },
        created() {
            console.log(this.$attrs, "爷爷给的钱");
        },
        methods: {
            grandpaSend(){
                // 孙传爷 和子传父发送数据一样
                this.$emit("sun", this.gift)
            },
            send(){
                // 子传父 1. 通过this.$emit()发送数据
                this.$emit("sonMsg", this.msg)
            },
            add(){
                this.money++
            }
        }

    }
</script>