<template>
    <div>
        <h1>爷爷</h1>
        <!-- 爷传孙： 发送数据和父传子一样 -->
        <!-- @sun="clickSun" 爷爷接受数据的方式和子传父一样 -->
        <father :grandpa-msg="msg" @sun="clickSun"></father>
    </div>
</template>
<script>
    import father from './father.vue';
    export default{
        data(){
            return{
                msg: "爷爷给了500块 "
            }
        },
        components: {
            father
        },
        methods: {
            clickSun(n){
                console.log(n);
            }
        }
    }
</script>