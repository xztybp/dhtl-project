<template>
  <div class="left-nav">
    <div class="logo el-menu-item">
      <img src="../../../assets/images/logo_admin.png" alt />
    </div>
    <el-menu
      default-active="/index"
      class="el-menu-vertical-demo"
      background-color="rgb(53, 59, 78)"
      text-color="#fff"
      active-text-color="#409eff"
      :unique-opened="true"
      :router="true">
      <el-menu-item index="/index">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <span>内容管理</span>
        </template>
        <el-menu-item index="/index/main">发布文章</el-menu-item>
        <el-menu-item index="/index/page1">内容列表</el-menu-item>
        <el-menu-item index="/index/page2">评论列表</el-menu-item>
        <el-menu-item index="/index/main">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/index/main">图文数据</el-menu-item>
        <el-menu-item index="/index/page1">粉丝概括</el-menu-item>
        <el-menu-item index="/index/page2">粉丝画像</el-menu-item>
        <el-menu-item index="/index/main">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/index/main">
        <i class="el-icon-menu"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
div.left-nav {
  .logo {
    background-color: #2e2f32;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 120px;
    }
  }
  .el-menu-vertical-demo.el-menu {
    border-right: 0;
    &>li,.el-submenu__title:hover {
      background-color:  #2a2f3e !important;
    }
    ul.el-menu.el-menu--inline li.el-menu-item:hover {
      background-color: #0094ff !important;
      color: #fff !important;
    }
  }
}
</style>
