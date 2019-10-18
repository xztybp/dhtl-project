<template>
  <div class="comment_list">
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%" fixed v-loading="loading">
        <el-table-column prop="title" label="标题" width="600"></el-table-column>
        <el-table-column prop="comment_status" label="评论状态" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.comment_status" type="success" size="mini">启用</el-button>
            <el-button v-if="!scope.row.comment_status" type="danger" size="mini">禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数" align="center"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数" align="center"></el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="scope.row.comment_status"
              @click="handleEdit(scope.row.id,scope.row.comment_status)"
            >关闭评论</el-button>
            <el-button
              size="mini"
              v-if="!scope.row.comment_status"
              @click="handleEdit(scope.row.id,scope.row.comment_status)"
            >打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @prev-click="prevClick"
        @next-click="nextClick"
        @current-change="currentClick"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          title: '',
          comment_status: '',
          total_comment_count: '',
          fans_comment_count: ''
        }
      ],
      total: 1,
      page: 1,
      loading: false
    }
  },
  methods: {
    // 页面加载渲染页面
    getComment (page = 1) {
      this.$axios({
        url: 'articles',
        method: 'GET',
        params: {
          response_type: 'comment',
          page: page
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.results
        this.total = res.total_count
        this.loading = false
      })
    },
    // 打开或关闭文章评论功能
    handleEdit (id, status) {
      this.$confirm(
        status
          ? '此操作将关闭文章评论, 是否继续?'
          : '此操作将启用文章评论, 是否继续',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.$axios({
          url: `comments/status?article_id=${id}`,
          method: 'PUT',
          data: {
            // 每次取反
            allow_comment: status ? !status : !status
          }
        }).then(res => {
          console.log(res)
          this.comment_statu = res.allow_comment
          this.getComment()
          this.$message({
            type: 'success',
            message: status ? '禁用成功!' : '启用成功'
          })
        })
      })
    },
    // 点击上一页
    prevClick (page) {
      this.loading = true
      this.getComment(page)
    },
    // 点击下一页
    nextClick (page) {
      this.loading = true
      this.getComment(page)
    },
    // 点击当前页
    currentClick (page) {
      this.loading = true
      this.getComment(page)
    }
  },
  created () {
    this.getComment()
  }
}
</script>
<style lang="less" scoped>
div.comment_list {
  text-align: center;
  .has-gutter {
    position: fixed !important;
  }
  .el-pagination {
    margin: 30px 0 10px;
  }
}
</style>
