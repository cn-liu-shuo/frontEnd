<template>
    <div>
        <h1>father {{ sonSend }}</h1>
        <button @click="add">给儿子加零花钱</button>
        <!-- 父传子 1,使用v-bind绑定自定义属性发送数据 -->
        <!-- 子传父 2，通过v-on绑定一个自定义方法（与emit相同） -->
        <!-- 
            v-bind="$attrs"爷传孙
            v-on="$listeners" 孙子给爷爷
         -->
        <son ref="qian" :father-money="msg" @sonMsg="getSend" v-bind="$attrs" v-on="$listeners"></son>
    </div>
</template>

<script>
    import son from './son.vue'
    export default{
        // 拦截爷爷给孙子的钱，$attrs无法接收
        props: {
            grandpaMsg: {
                type: String
            }
        },
        data(){
            return {
                msg: "爸爸给的零花钱",
                sonSend: ''
            }
        },
        components: {
            son
        },
        methods: {
            getSend(val) {
                console.log(val)
                this.sonSend = val
            },
            add(){
                // 调用子组件里的方法  给子组件用ref起个名，通过 this.$refs.名字.方法 去调用
                this.$refs.qian.add()
            }
        }

    }
</script>