<template>
  <div class="user-center">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户信息</span>
      </div>
      <ul>
        <li>
          <img :src="form.photo" alt />
          <el-link :underline="false" type="primary" @click="dialogVisible=true">更换图像</el-link>
        </li>
        <li>
          <template v-if="flag">
            <h1>{{form.name}}</h1>
            <h3>{{form.intro}}</h3>
          </template>
          <template v-else>
            <el-form label-width="80px" :model="form">
              <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="简介">
                <el-input v-model="form.intro"></el-input>
              </el-form-item>
            </el-form>
            <el-button @click="flag = true">取 消</el-button>
            <el-button type="primary" @click="editInfo">确 定</el-button>
          </template>
        </li>
        <li class="btn">
          <el-link :underline="false" type="primary" @click="flag=!flag" v-if="flag">修改</el-link>
        </li>
      </ul>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" width="25%">
      <el-tabs type="card">
        <el-tab-pane label="上传图片">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :http-request="editUserImg"
            v-loading="loading"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" :width="250" :height="250" />
            <i v-else class="el-icon-upload avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delImgURL">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        intro: '',
        photo: ''
      },
      flag: true,
      dialogVisible: false,
      imgUrl: '',
      loading: false
    }
  },
  methods: {
    // 编辑用户信息
    editInfo () {
      this.$axios({
        url: 'user/profile',
        method: 'PATCH',
        data: {
          name: this.form.name,
          intro: this.form.intro
        }
      }).then(res => {
        console.log(res)
        this.$store.commit('changeUserInfo', res)
        this.flag = true
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    },
    editUserImg (imgInfo) {
      this.loading = true
      console.log(imgInfo)
      let fd = new FormData()
      fd.append('photo', imgInfo.file)
      console.log(fd.get('photo'))
      this.$axios({
        url: 'user/photo',
        method: 'PATCH',
        data: fd
      }).then(res => {
        this.$store.commit('changeUserImg', res)
        this.form.photo = this.$store.state.userInfo.photo
        this.imgUrl = this.$store.state.userInfo.photo
        this.loading = false
        this.$message({
          message: '图片上传成功',
          type: 'success'
        })
      })
    },
    delImgURL () {
      this.dialogVisible = false
      this.imgUrl = ''
    },
    // 编辑图片
    /*  handleAvatarSuccess (response, file, fileList) {
      console.log(response) */
    /* this.imageUrl = response.data.url */
    /*     this.imageUrl = URL.createObjectURL(file.raw)
      this.$message({
        message: '图片上传成功',
        type: 'success'
      }) */
    /*   } */
    // 获取账户信息
    getuserInfo () {
      this.$axios({
        url: 'user/profile',
        method: 'GET'
      }).then(res => {
        this.form = res
      })
    }
    // 编辑用户信息
  },
  created () {
    this.getuserInfo()
    console.log(this.userInfo)
  }
}
</script>

<style lang="less" scoped>
div.user-center {
  ul {
    overflow: hidden;
    li {
      float: left;
      h1 {
        font-size: 12px;
      }
      h3 {
        color: darkgray;
      }
      img {
        display: block;
        margin-right: 15px;
        width: 150px;
        height: 150px;
        background-color: red;
      }
    }
    li.btn {
      float: right;
    }
  }
}
.avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  div.el-upload {
    i.el-icon-upload.avatar-uploader-icon {
      font-size: 80px;
    }
  }
}
</style>
