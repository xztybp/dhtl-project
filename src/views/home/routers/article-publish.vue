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
        <el-form-item label="封面图片" v-model="form.status">
          <el-radio-group>
            <el-radio label="单图"></el-radio>
            <el-radio label="三图"></el-radio>
            <el-radio label="无图"></el-radio>
            <el-radio label="自动"></el-radio>
          </el-radio-group>
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
        channel_id: ''
      },
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
        })
      }
    },

    publish (status) {
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
          url: `articles`,
          method: 'POST',
          data: {
            draft: status,
            cover: {
              type: 1,
              images: [
                'http://toutiao.meiduo.site/Fhp5OXHbYJzUdd8pCJGjX4i9K_7y'
              ]
            },
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
    }
  },
  // 开启监听路由,判断是否为编辑页面
  watch: {
    $route () {
      console.log(this.$route)
      for (var v in this.form) {
        this.form[v] = ''
      }
    }
  },
  components: {
    channel
  },
  created () {
    this.getEdit()
  }
}
</script>

<style lang="less" scoped>
</style>
