<template>
  <div class="header">
    <div class="left-title">
      <i class="el-icon-s-unfold"></i>江苏传智播客教育科技股份有限公司
    </div>
    <div class="right-title">
      <el-input placeholder="请输入内容">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-dropdown placement="bottom" size="medium" :style="{marginRight: '10px'}">
        <span class="el-dropdown-link">消息</span>
        <el-dropdown-menu
          slot="dropdown"
          :style="{backgroundColor:'#2c3e50',color:'#fff',padding:'8px',fontSize:'12px'}"
        >消息</el-dropdown-menu>
      </el-dropdown>
      <img :src="userInfo.photo" alt />
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{userInfo.name}}
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: null
    }
  },
  methods: {
    getuserInfo () {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.userInfo = userInfo
    }
  },
  created () {
    this.getuserInfo()
  }
}
</script>

<style lang="less" scoped>
div.header {
  height: 100%;
  display: flex;
  .left-title {
    line-height: 50px;
  }
  .right-title {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .el-input {
      width: 15%;
      margin-right: 20px;
    }
    img {
      width: 35px;
      height: 35px;
      margin-right: 10px;
      line-height: 50px;
      line-height: 50px;
      border-radius: 50%;
    }
  }
}
</style>
