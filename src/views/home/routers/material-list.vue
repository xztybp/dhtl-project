<template>
  <div class="material-list" v-loading="loading">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>图片管理</span>
      </div>
      <el-radio-group v-model="radio1" @change="allCollectInfo">
        <el-radio-button label="全选"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
      <el-row justify="center">
        <el-col :span="6" v-for="(item,index) in imageList" :key="index">
          <img :src="item.url" class="image" />
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <div class="start">
                <i
                  :class="item.is_collected? 'el-icon-star-on': 'el-icon-star-off'"
                  @click="collectImage(item.id,item.is_collected)"
                ></i>
              </div>
              <div class="delete">
                <i class="el-icon-delete-solid" @click="delImage(item.id)"></i>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
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
      radio1: '全选',
      imageList: [],
      loading: false,
      total: 100,
      page: 1
    }
  },
  methods: {
    // 获取图片列表信息
    getImageData (collect = false) {
      this.$axios({
        url: 'user/images',
        method: 'GET',
        params: {
          collect: collect,
          page: this.page,
          per_page: 10
        }
      }).then(res => {
        console.log(res)
        this.imageList = res.results
        this.total = res.total_count
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },
    // 获取是否收藏图片信息
    allCollectInfo (collect) {
      console.log(collect)
      this.loading = true
      if (collect === '全选') {
        this.getImageData(false)
      } else {
        this.getImageData(true)
      }
    },
    // 删除操作
    delImage (id) {
      this.$axios({
        url: `user/images/${id}`,
        method: 'DELETE'
      }).then(res => {
        console.log(res)
        if (this.radio1 === '全选') {
          this.getImageData()
        } else {
          this.getImageData(true)
        }
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      })
    },
    // 改变收藏状态
    collectImage (id, isok) {
      this.$axios({
        url: `user/images/${id}`,
        method: 'PUT',
        data: {
          collect: isok ? !isok : !isok
        }
      }).then(res => {
        if (this.radio1 === '全选') {
          this.getImageData()
        } else {
          this.getImageData(true)
        }
        this.$message({
          type: 'success',
          message: res.collect ? '收藏成功!' : '已取消收藏'
        })
      })
    },
    // 上一页
    prevClick () {
      this.page--
      this.getImageData()
    },
    // 下一页
    nextClick () {
      this.page++
      this.getImageData()
    },
    // 点击页
    currentClick (page) {
      this.page = page
      this.getImageData()
    }
  },
  created () {
    this.getImageData()
  }
}
</script>

<style lang="less" scoped>
.material-list {
  .el-col {
    text-align: center;
    img {
      width: 200px;
      height: 200px;
    }
    .bottom {
      display: flex;
      div {
        width: 50%;
        text-align: center;
        .el-icon-star-on,
        .el-icon-star-off,
        .el-icon-delete-solid {
          font-size: 24px;
          cursor: pointer;
          &.el-icon-star-on {
            color: red;
          }
        }
      }
    }
  }
  .el-pagination {
    text-align: center;
  }
}
</style>
