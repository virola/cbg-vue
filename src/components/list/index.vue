<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        size="large"
        :label="`${item.server_name} / ${item.level_desc}`"
        @click="goDetail(item)"
      >
        <template #title>
          <div class="custom-title"><van-tag plain type="danger">{{item.price / 100}}</van-tag><span>{{item.format_equip_name}}</span><van-tag type="danger" v-if="item.allow_bargain">还</van-tag></div>
          <van-tag plain type="primary" v-for="(tag, ti) in item.highlights" :key="ti">{{tag}}</van-tag>
        </template>
        <template #label>
          <div>
            {{`${item.server_name} / ${item.level_desc}`}}
          </div>
          <div>{{item.game_ordersn}}</div>
          <div>{{item.serverid}}</div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import listData from './data'

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
    },

    getServerData() {
      listData.forEach(data => {
        this.list = this.list.concat(data.result)
      })
      this.finished = true
    },

    goDetail(item) {
      console.log(item)
      this.$router.push('/about?data=' + item.game_ordersn)
    }
  }
}
</script>

<style lang="scss" scoped></style>
