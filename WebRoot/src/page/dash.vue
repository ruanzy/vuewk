<template>
  <div>
        <ul class="breadcrumb">
          <li><router-link :to="{path: '/home'}">首页</router-link></li>
          <li>Haddop监控</li>
        </ul>
        <div class="p20">
          <h2>Haddop监控</h2>
        </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style>
</style>