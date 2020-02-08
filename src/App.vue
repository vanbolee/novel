<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    document.addEventListener(
      "touchmove",
      function(e) {
        if (!e._isScroller) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
    this.$store.commit("initClientData", {
      clientWidth: document.body.clientWidth,
      clientHeight: document.body.clientHeight
    });
  }
};
</script>

<style lang="less">
body,
html {
  height: 100%;
  background-color: #f5f5f5;
  -webkit-overflow-scrolling: touch;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.cube-tab_active {
  color: #26a2ff;
}
.red {
  color: #b93321;
}
</style>
