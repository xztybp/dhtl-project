<template>
  <el-select placeholder="请选择" clearable @change="sonTOfa" :value="fts">
    <el-option v-for="(item,index) in channels" :label="item.name" :value="item.id" :key="index"></el-option>
  </el-select>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      channels: []
    }
  },
  props: ['fts'],
  methods: {
    sonTOfa (value) {
      this.$emit('stf', value)
    }
  },
  created () {
    this.$axios({
      method: 'GET',
      url: 'channels'
    }).then(res => {
      this.channels = res.channels
    })
  }
}
</script>

<style>
</style>
