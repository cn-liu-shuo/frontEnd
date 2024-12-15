<template>
  <div id="app">
    <!-- 路由的出口 -->
    <router-view/>
  </div>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
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

/* 全局滚动条样式，兼容不同浏览器 */
*::-webkit-scrollbar {
width: 8px;
height: 8px;
}

*::-webkit-scrollbar-thumb {
background: #ccc;
border-radius: 5px;
}

/* 兼容Firefox、IE */
* {
scrollbar-width: 10px;
scrollbar-base-color: green;
scrollbar-track-color: red;
scrollbar-arrow-color: blue;
}
</style>
