<template>
  <div class="article-publish">
    <el-form ref="form" :model="form" label-width="80px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>发表文章</span>
        </div>
        <el-form-item label="文章标题">
          <el-input v-model="form.title" placeholder="文章名称" :style="{width:'40%'}"></el-input>
        </el-form-item>
        <el-form-item label="文章内容">
          <froala id="edit" :tag="'textarea'" :config="config" v-model="form.content"></froala>
        </el-form-item>
        <el-form-item label="封面图片">
          <el-radio-group v-model.number="form.cover.type" @change="changeImageBox">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <el-form-item>
            <div class="demo-image__placeholder">
              <div
                class="block"
                v-for="(item,index) in form.cover.type===-1? 0:form.cover.type"
                :key="index"
                @click="showBox(index)"
              >
                <span class="demonstration">点击图标选择图片</span>
                <el-image :src="form.cover.images[index]">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
            </div>
          </el-form-item>
        </el-form-item>
        <el-form-item label="文章类型">
          <channel @stf="func" :fts="form.channel_id"></channel>
        </el-form-item>
        <el-form-item>
          <el-divider></el-divider>
          <el-button type="primary" @click="publish(false) ">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
      </el-card>
    </el-form>
    <el-dialog :visible.sync="dialogVisible" width="55%">
      <el-tabs v-model="activeName" type="card" @tab-click="allCollectInfoHeader(activeName)">
        <el-tab-pane label="素材库" name="first">
          <el-card class="box-card">
            <el-radio-group v-model="radio1" @change="allCollectInfo">
              <el-radio-button label="false">全选</el-radio-button>
              <el-radio-button label="true">收藏</el-radio-button>
            </el-radio-group>
            <el-row justify="center">
              <el-col
                :span="6"
                v-for="(item,index) in imageList"
                :key="index"
                :style="{padding:'20px'}"
              >
                <img
                  :src="item.url"
                  :class="{active:activeIndex===index}"
                  :style="{width:'100px',height:'100px',boxSizing:'border-box',position:'relative'}"
                  @click="getimgID(item.url,index)"
                />
              </el-col>
            </el-row>
            <el-pagination
              :background="true"
              layout="prev, pager, next"
              :total="total"
              :style="{textAlign:'center'}"
            ></el-pagination>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :headers="{Authorization: `Bearer ${headers}`}"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" :width="250" :height="250" />
            <i v-else class="el-icon-upload avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import channel from '../components/channel'
export default {
  data () {
    return {
      form: {
        title: '',
        content: '',
        channel_id: '',
        cover: {
          images: [],
          type: 1
        }
      },
      dialogVisible: false,
      radio1: false,
      imageList: [],
      activeName: 'first',
      total: 1,
      // 判断元素是否为点击状态
      // 声明一个下标用来确定点击元素下标
      imgIndex: 1,
      activeIndex: -1,
      // 上传图片URL地址
      imageUrl: '',
      headers: '',
      config: {
        placeholderText: '请输入内容',
        height: '300px',
        language: 'zh_cn'
      },
      editMsg: []
    }
  },
  methods: {
    // 子传父本质:通过将父组件方法给子组件引用,当子组件在调用时传入实参实现子组件向父组件传参
    func (chan) {
      this.form.channel_id = chan
    },
    // 判断当期是否为编辑页面
    getEdit () {
      if (this.$route.query.id) {
        this.$axios({
          url: `articles/${this.$route.query.id}`,
          method: 'GET'
        }).then(res => {
          this.form = res
          console.log(this.form)
          console.log(res)
        })
      }
    },
    // 点击文章发表
    publish (status) {
      console.log(this.form)
      // 编辑状态时点击发表或存为草稿
      if (this.$route.query.id) {
        this.$axios({
          url: `articles/${this.$route.query.id}?draft=${status}`,
          method: 'PUT',
          data: this.form
        }).then(res => {
          console.log(this.$router)
          this.$router.push('list')
          this.$message({
            message: status ? '修改已成功并存入存入草稿' : '修改成功并已发布',
            type: 'success'
          })
        })
      } else {
        // 发布状态时点击发表或存为草稿
        this.$axios({
          url: `articles?draft=${status}`,
          method: 'POST',
          data: {
            ...this.form
          }
        }).then(res => {
          console.log(res)
          this.$router.push('list')
          this.$message({
            message: status ? '添加成功并存入存入草稿' : '添加成功并已发布',
            type: 'success'
          })
        })
      }
    },
    // 点击单选框按钮改变图片容器
    changeImageBox () {
      console.log(this.form.cover.type)
    },
    // 点击图片显示大盒子
    showBox (index) {
      console.log(index)
      // 获取用户点击图框下标 重要
      this.imgIndex = index
      this.dialogVisible = true
    },
    // 获取收藏状态
    allCollectInfo (value) {
      this.getImageList(value)
    },
    // 获取头部收藏状态
    allCollectInfoHeader (header) {
      console.log(header)
    },
    // 获取图片信息
    getImageList (collect = false) {
      this.$axios({
        url: 'user/images',
        method: 'GET',
        params: {
          collect: collect,
          per_page: 8
        }
      }).then(res => {
        console.log(res)
        this.imageList = res.results
        this.total = res.total_count
      })
    },
    // 点击图片获取图片idf
    getimgID (url, index) {
      console.log(url)
      /*       for (
        var i = 0;
        i < document.getElementsByClassName('image').length;
        i++
      ) {
        document.getElementsByClassName('image')[i].className = 'image';
      }
      document.getElementsByClassName('image')[index].className = 'image right';
      this.flag = true */
      // 此处有坑
      this.activeIndex = index
      this.form.cover.images[this.imgIndex] = url
    },
    // 点击素材上传图片
    handleAvatarSuccess (response, file, fileList) {
      console.log(response)
      /* this.imageUrl = response.data.url */
      this.imageUrl = URL.createObjectURL(file.raw)
      /*  this.form.cover.images[] */
      this.form.cover.images[this.imgIndex] = response.data.url
      this.$message({
        message: '图片上传成功',
        type: 'success'
      })
    }
  },
  // 开启监听路由,判断是否为编辑页面
  watch: {
    $route () {
      console.log(this.$route)
      for (var v in this.form) {
        if (v !== 'cover') {
          this.form[v] = ''
        } else {
          this.form[v].type = 1
          this.form[v].images = []
        }
      }
    }
  },
  components: {
    channel
  },
  created () {
    this.getEdit()
    this.headers = JSON.parse(localStorage.getItem('userInfo')).token
    console.log(this.headers)
  },
  // 钩子函数,当页面渲染完成立马发送请求
  mounted () {
    this.getImageList()
  }
}
</script>

<style lang="less" scoped>
div.demo-image__placeholder {
  display: flex;
  .block {
    text-align: center;
    border: 1px dashed black;
    .el-image {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 200px;
      .el-icon-picture-outline {
        font-size: 50px;
        cursor: pointer;
      }
    }
  }
}
img.active {
  border: 2px solid red;
}
.avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  div.el-upload {
    i.el-icon-upload.avatar-uploader-icon {
      font-size: 80px;
    }
  }
}
</style>
