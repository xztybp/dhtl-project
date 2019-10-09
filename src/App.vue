<template>
  <div id="app">
    <router-view></router-view>
    <div class="container">
      <router-view name="header"></router-view>
      <router-view name="main"></router-view>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less">
body,
html {
  height: 100%;
  div#app {
    height: 100%;
    display: flex;
    .left {
      width: 200px;
      height: 100%;
      background-color: #323745;
    }
    div.container {
      flex: 1;
      display: flex;
      flex-direction: column;
      .header {
        height: 80px;
        width: 100%;
        background-color: #0094ff;
      }
      .main {
        flex: 1;
        background-color: #f2f3f5;
      }
    }
  }
}
</style>
