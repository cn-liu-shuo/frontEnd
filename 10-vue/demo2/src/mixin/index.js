export const mixin = {
    data(){
        return{
            msg: "孙悟空吃大闸蟹"
        }
    },
    methods: {
        handle(){
            console.log(this.msg);
        }
    }
}