<template>
  <div>
    <!-- -->
    <h1>路由守卫</h1>
  </div>
</template>

<script>
export default {
  name: "protect",
  /* 
    1.全局路由守卫 beforeEach afterEach
    2.局部路由守卫
        beforeRouteEnter 进入路由之前的验证
        beforeRouteLeave 离开路由前的验证
        beforeRouteUpdate 路由更新前的验证
    3.路由独享守卫
  
  */
  /* shift + alt + a */
  /* 
    to: 到哪里去
    from: 从哪里来
    next: 放行
  */
  beforeRouteEnter(to, from, next) {
    console.log(to.path, "到哪去");
    console.log(from.path, "从哪来");
    // 放行
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log(to.path, "到哪去");
    console.log(from.path, "从哪来");

    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to.path, "到哪去");
    console.log(from.path, "从哪来");

    next()
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>