<template>
  <div id="app">
    <!-- 入口文件 main.js
        页面的入口文件是app.vue
        路由的出口 <router-view/>
    -->
    <!-- 
      所有的页面都可以叫组件，也就是说 一个页面是由多个组件组成的  并且vue只有一个页面 叫单页面开发

      所以没办法跳转页面，只能跳转组件。 跳转组件先配路由

     -->
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/huo">huo</router-link> |
      <router-link to="/ji">姬</router-link>
      <router-link to="/text">text</router-link>
    </nav>
    <h1>123</h1>
    <router-view/>
  </div>
</template>
<script>
  export default{
    data(){
      return{

      }
    },
    methods: {
      
    }
  }
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
