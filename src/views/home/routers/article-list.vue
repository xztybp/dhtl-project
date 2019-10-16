<template>
  <div class="article-lish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <div class="text item">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="文章状态:" :style="{color:'red'}">
            <!-- router-link添加native事件修饰符之后变为原生事件 -->
            <router-link @click.native="getstatus" to="/article/list/">全部</router-link>
            <router-link @click.native="getstatus" to="/article/list/?status=0">草稿</router-link>
            <router-link @click.native="getstatus" to="/article/list/?status=1">待审核</router-link>
            <router-link @click.native="getstatus" to="/article/list/?status=2">审核通过</router-link>
            <router-link @click.native="getstatus" to="/article/list/?status=3">审核失败</router-link>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.channel_id" placeholder="请选择" clearable>
              <el-option
                v-for="(item,index) in channels"
                :label="item.name"
                :value="item.id"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-date-picker
              v-model="form.date"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="filterArticle">筛选</el-button>
    </el-card>
    <el-card :body-style="{ padding: '0px' }" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>共找到{{total}}条符合条件的内容</span>
      </div>
      <ul class="comment">
        <li v-for="(item,index) in ArticleList" :key="index">
          <img :src="item.cover.images[0]" class="image" />
          <div style="padding: 14px;" class="comment-ar">
            <span>{{item.title}}</span>
            <div class="del">
              <template>
                <el-button plain type="primary" size="mini" v-if="item.status===''">全部</el-button>
                <el-button plain type="primary" size="mini" v-if="item.status===0">草稿</el-button>
                <el-button plain type="primary" size="mini" v-if="item.status===1">待审核</el-button>
                <el-button plain type="primary" size="mini" v-if="item.status===2">审核通过</el-button>
                <el-button plain type="primary" size="mini" v-if="item.status===3">审核失败</el-button>
              </template>
            </div>
            <time class="time" :style="{fontSize:'12px'}">{{item.pubdate}}</time>
          </div>
          <el-button plain size="mini" @click="delData(item.id)">
            <i class="el-icon-delete"></i>删除
          </el-button>
          <el-button plain size="mini" @click="editData(item.id)">
            <i class="el-icon-edit"></i>修改
          </el-button>
        </li>
      </ul>
      <el-pagination
        :background="true"
        layout="prev, pager, next"
        :total="total"
        @next-click="nextclick"
        @prev-click="prevClick"
        @current-change="currentChange"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        channel_id: '',
        date: []
      },
      page: 1,
      ArticleList: [],
      channels: [],
      /* 此处total不能为空 */
      total: 1,
      status: '',
      loading: false
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    // 获取文章列表
    getArticleList () {
      // 声明一个空对象
      let filterMsg = {}
      // 筛选文章状态
      if (this.status) {
        filterMsg.status = this.status
      }
      // 筛选文章频道
      if (this.form.channel_id) {
        filterMsg.channel_id = this.form.channel_id
      }
      /* 此处需注意必须判断两个条件  由于用户选择后取消会返回null null没有length属性 */
      if (this.form.date !== null && this.form.date.length > 0) {
        filterMsg.begin_pubdate = this.form.date[0]
        filterMsg.end_pubdate = this.form.date[1]
      }
      this.loading = true
      this.$axios({
        method: 'GET',
        url: 'articles',
        // 重要*****如果请求方式是 POST：使用 data 来进行传参
        // 重要*****如果请求方式是 GET：使用 params 来进行传参
        params: {
          page: this.page,
          ...filterMsg
        }
      }).then(res => {
        setTimeout(() => {
          console.log(res)
          this.loading = false
          this.ArticleList = res.results
          this.total = res.total_count
        }, 500)
      })
    },
    // 获取频道信息
    getchannels () {
      this.$axios({
        method: 'GET',
        url: 'channels'
      }).then(res => {
        /*     console.log(res)
        console.log(this.$route) */
        this.channels = res.channels
      })
    },
    // 获取状态信息
    getstatus () {
      this.status = this.$route.query.status
      this.form.channel_id = ''
      this.form.date = []
      this.$axios({
        method: 'GET',
        url: 'articles',
        params: {
          page: this.page,
          status: this.status
        }
      }).then(res => {
        /*    console.log(res) */
        this.ArticleList = res.results
        this.total = res.total_count
      })
    },
    // 筛选文章
    filterArticle () {
      this.getArticleList()
    },
    // 上一页
    prevClick (page) {
      /* console.log(page) */
      this.page--
      this.getArticleList()
    },
    // 下一页
    nextclick (page) {
      this.page++
      this.getArticleList()
    },
    // 根据当前页码索引
    currentChange (page) {
      this.page = page
      this.getArticleList()
    },
    // 删除方法
    delData (id) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$axios({
          url: `articles/${id}`,
          method: 'DELETE'
        })
          .then(res => {
            this.getArticleList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(() => {
            this.$message.error('删除失败')
          })
      })
    },
    // 编辑方法
    editData (id) {
      // 此处如果使用params进行传参,则跳转地址不会进行显示id值
      this.$router.push({ name: 'publish', query: { id: id } })
    }
  },
  created () {
    this.getArticleList()
    this.getchannels()
  }
}
</script>

<style lang='less' scoped>
a:-webkit-any-link {
  margin-right: 25px;
  color: #2c3e50;
  &:hover {
    color: #0094ff;
  }
}
// 给a标签添加颜色
.router-link-exact-active.router-link-active {
  color: #0094ff;
}
ul.comment {
  li {
    overflow: hidden;
    padding: 15px 5px;
    border: 1px dotted #e7e7e9;
    img {
      float: left;
      width: 120px;
      height: 120px;
    }
    div.comment-ar {
      float: left;
      div.del {
        overflow: hidden;
        margin: 10px 0;
        .el-button {
          float: left;
        }
      }
    }
    .el-button {
      float: right;
      margin-right: 10px;
    }
  }
}
.el-pagination {
  margin: 20px 5px 40px 5px;
  text-align: center;
}
</style>
