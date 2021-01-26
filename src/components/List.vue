<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :value="item.price / 100"
        size="large"
        :label="`${item.server_name}/${item.level_desc}`"
      >
        <van-tag plain type="danger">{{item.price / 100}}</van-tag>
        <template #title>
          <div class="custom-title">{{item.format_equip_name}}</div>
          <van-tag plain type="primary" v-for="(tag, ti) in item.highlights" :key="ti">{{tag}}</van-tag>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
// import Data from './data/1.json'

const serverId = [115, 121, 122, 120]

export default {
  data() {
    return {
      page: 0,
      list: [],
      loading: false,
      finished: true,
      listLoading: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.loading = false
      // this.getList()
      this.getServerData()
    },
    getList() {
      this.loading = false
      return false
      try {
        setTimeout(() => {
          this.page++
          const data = require('./data/' + this.page + '.json')
          console.log(this.page, this.loading)
          this.list = this.list.concat(data.result)
          this.finished = data.is_last_page
          this.loading = false
        }, 1000)
      } catch (err) {
        this.finished = true
      }

      // todo
    },

    getServerData() {
      serverId.forEach(key => {
        const data = require('./data/' + key + '.json')
        this.list = this.list.concat(data.result)
      })
      this.finished = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
