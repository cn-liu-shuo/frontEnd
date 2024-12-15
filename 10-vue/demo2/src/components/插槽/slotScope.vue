<template>
  <div>
    <!-- -->
    <h2>作用域插槽</h2>
    <slot :scope="row"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      row: ["金铲铲", "csgo", "原神", "三角洲", "崩坏三", "DNF"]
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>