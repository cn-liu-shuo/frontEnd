<template>
    <div>
        <!-- -->
        <!-- {{ count }} {{ hello }} -->
        {{ stateCount }}
        <el-button @click="fn(5)">点击</el-button>
        {{ name }}
    </div>
</template>

<script>
// vuex内置四个辅助函数  mapActions, mapGetters, mapMutations, mapState
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
    };
  },

  mounted() {
  },

  methods: {
    // mapMutations mapActions
    ...mapActions({
        // 自定义函数名： vuex中的actions的方法名
        fn: "handleChange"
    })

    // 访问子模块
    // mapXXXs("空间名称",["属性1，属性2，...."])
    // mapXXXs("空间名称",{
//      "新名字1": "vuex中的原名字1",
//      "新名字2": "vuex中的原名字2"

    // })
  },

  computed: {
    // mapGetters mapState
    // 相当于this.$store.state 数组里的名字和vuex中的一致
    // ...mapState(["count", "hello"])
    // 自定义名字
    ...mapState({
        stateCount: "count"
    }),
    ...mapState('user', ['name'])
  }
};
</script>