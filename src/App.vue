<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  div#app {
    height: 100%;
  }
}
#nprogress .bar {
  background: #0094ff !important; //自定义颜色
}
</style>
