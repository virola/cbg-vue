<template>
  <div>
    <div>
      <van-radio-group v-model="platform" direction="horizontal">
        <van-radio name="">All</van-radio>
        <van-radio :name="2">Android</van-radio>
        <van-radio :name="1">IOS</van-radio>
      </van-radio-group>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        size="large"
        :label="`${item.server_name} / ${item.level_desc}`"
        @click="goDetail(item)"
        is-link
        v-show="!platform || platform == item.platform_type"
      >
        <template #title>
          <div class="full-width flex">
            <div class="custom-title">
              <van-tag type="primary" v-if="!item.pass_fair_show">公</van-tag>
              <van-tag type="danger" v-if="item.allow_bargain">还</van-tag>
              <span>{{ item.format_equip_name }}</span>
            </div>
            <van-tag plain type="danger">{{ item.price / 100 }}</van-tag>
          </div>
          <van-tag plain type="primary" v-for="(tag, ti) in item.highlights" :key="ti">{{ tag }}</van-tag>
        </template>
        <template #label>
          <div>
            {{ `${item.server_name} / ${item.level_desc}` }} /
            <i class="icon" :class="{ 'icon-android': item.platform_type == 2, 'icon-ios': item.platform_type == 1 }"></i>
          </div>
          <div>{{ item.serverid }}/ <span>{{ item.game_ordersn }}</span></div>
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
      platform: '',
      page: 0,
      list: [],
      loading: false,
      finished: true,
      listLoading: false,
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

<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.full-width {
  width: 100%;
}

.icon {
  display: inline-block;
}
.icon-android,
.icon-ios {
  width: 0.75rem;
  height: 0.75rem;
  background-size: 100% 100%;
}
.icon-android {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjOThCRTM0IiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHJ4PSI1Ii8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNCAyKSIgZmlsbD0iI0ZGRiI+PHBhdGggZD0iTTE4IDhzLS4yMzgtMy4yNzItMy4wMDUtNC45ODNhNi4wMzcgNi4wMzcgMCAwIDAtLjMyNi0uMTg4QzEzLjczMiAyLjMyNyAxMi41MzMgMiAxMSAyIDQuNDM2IDIgNCA4IDQgOGgxNHpNNy40NTcgNi4wNDNhLjU4Ny41ODcgMCAxIDAgMC0xLjE3My41ODcuNTg3IDAgMCAwIDAgMS4xNzN6bTcuMDQzIDBhLjU4Ny41ODcgMCAxIDAgMC0xLjE3My41ODcuNTg3IDAgMCAwIDAgMS4xNzN6Ii8+PHBhdGggZD0iTTUuNTc5IDEuMDNhLjU3Ni41NzYgMCAwIDAtLjIxLjc4NEw2LjczIDQuMTc1bC45OS0uNTg1LTEuMzU4LTIuMzUyYS41OC41OCAwIDAgMC0uNzg0LS4yMDl6bTEwLjg0MiAwYS41NzYuNTc2IDAgMCAxIC4yMS43ODRMMTUuMjcgNC4xNzVsLS45OS0uNTg1IDEuMzU4LTIuMzUyYS41OC41OCAwIDAgMSAuNzg0LS4yMDl6TTQgMTAuOTlWMjFhMSAxIDAgMCAwIDEgMWgxMS45NDhhMSAxIDAgMCAwIDEtLjk5NWwuMDQ3LTEwLjAxYTEgMSAwIDAgMC0xLTEuMDA0SDVhMSAxIDAgMCAwLTEgMXoiLz48cGF0aCBkPSJNNCA5aDE0djJINHoiLz48cmVjdCB5PSI5Ljk5MSIgd2lkdGg9IjMiIGhlaWdodD0iOS4wNCIgcng9IjEuNSIvPjxyZWN0IHg9IjE5IiB5PSI5Ljk5MSIgd2lkdGg9IjMiIGhlaWdodD0iOS40MzIiIHJ4PSIxLjUiLz48cGF0aCBkPSJNMTMgMjB2NC41MDFjMCAuODI4LjY2NiAxLjQ5OSAxLjUgMS40OTkuODI4IDAgMS41LS42NjUgMS41LTEuNDk5VjIwaC0zem0tNyAwdjQuNTAxQzYgMjUuMzMgNi42NjYgMjYgNy41IDI2Yy44MjggMCAxLjUtLjY2NSAxLjUtMS40OTlWMjBINnoiLz48L2c+PC9nPjwvc3ZnPg==);
}
.icon-ios {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjNEE0QTRBIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHJ4PSI1Ii8+PHBhdGggZD0iTTE4LjA1NCA1Ljc2NGMuODI1LS45OTYgMS4zNzktMi4zOCAxLjIyOC0zLjc2NC0xLjE4NS4wNDctMi42MjUuNzkyLTMuNDcyIDEuNzg1LS43Ni44ODQtMS40MjcgMi4yOTMtMS4yNSAzLjY0NSAxLjMyMi4xMDMgMi42NzItLjY3IDMuNDk0LTEuNjY2bTYuMTMgMTMuNTE4Yy0uMDMuMDgtLjQ5NyAxLjY5LTEuNjM0IDMuMzQ4LS45NzkgMS40MzctMiAyLjg3LTMuNjA2IDIuODk4LTEuNTc1LjAzLTIuMDgyLS45MzUtMy44ODYtLjkzNS0xLjgwMyAwLTIuMzY2LjkwNi0zLjg2Ljk2NS0xLjU1LjA2MS0yLjcyNy0xLjU1Mi0zLjcxOS0yLjk4MS0yLjAyNS0yLjkyNS0zLjU2OC04LjI2OC0xLjQ5Ni0xMS44NyAxLjAzNC0xLjc5MSAyLjg3NS0yLjkyMyA0Ljg3Ni0yLjk1NCAxLjUyNC0uMDI1IDIuOTU5IDEuMDI0IDMuODg5IDEuMDI0LjkzIDAgMi42NzQtMS4yNjggNC41MS0xLjA4Mi43NjUuMDM1IDIuOTIyLjMxIDQuMzEgMi4zMzctLjExNS4wNzMtMi41NzUgMS41MDItMi41NDggNC40ODQuMDMgMy41NjUgMy4xMjcgNC43NTIgMy4xNjQgNC43NjYiIGZpbGw9IiNGRkYiLz48L2c+PC9zdmc+);
}
</style>
