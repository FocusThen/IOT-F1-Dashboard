<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
//less
@import "./assets/_variables.less";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @black;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: @backgroundColor;
}
</style>
