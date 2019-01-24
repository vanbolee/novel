<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
body, html {
	height: 100%;
	background-color: #f5f5f5;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.cube-tab_active{
	color: #26A2FF;
}
</style>
