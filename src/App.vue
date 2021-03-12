<template>
  <div id="app">
    <div id="nav">
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/about">About</router-link>
      <router-link class="link" :to="`/about?data=${item}`" v-for="(item, index) in list" :key="index">{{item}}</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      list: [ '150' ]
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;

  .van-collapse-item__content {
    color: #333;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .link {
    margin: 0 20px;
  }
}

ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
table {
  border-collapse: collapse;
  width: 100%;

  td, th {
    border: 1px solid #ccc;
    padding: 2px 5px;
    text-align: left;
  }
}
</style>
