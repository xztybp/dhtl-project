<template>
  <div class="index">
    <el-container v-loading.fullscreen="loading">
      <el-aside width="200px">
        <left-nav></left-nav>
      </el-aside>
      <el-container>
        <el-header :style="{height: '50px'}">
          <top-nav></top-nav>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import topNav from './components/header'
import leftNav from './components/left-nav'
export default {
  data () {
    return {
      loading: false
    }
  },
  watch: {
    $route () {
      /*  console.log(this.$route) */
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    }
  },
  updated () {},
  components: {
    topNav,
    leftNav
  }
}
</script>

<style  lang="less" scoped>
div.index {
  height: 100%;
  .el-container {
    height: 100%;
    display: flex;
    .el-aside {
      background-color: #323745;
    }
    .el-container.is-vertical {
      .el-header {
        height: 200px;
        padding-right: 0;
        background-color: #fff;
      }
      .el-main {
        background-color: #f2f3f5;
        padding: 10px;
      }
    }
  }
}
</style>
