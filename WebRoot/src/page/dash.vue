<template>
  <div>
        <ul class="breadcrumb">
          <li><router-link :to="{path: '/home'}">首页</router-link></li>
          <li>Haddop监控</li>
        </ul>
        <p>服务器JVM总内存: {{memery.total}}</p>
        <p>服务器已使用内存: {{memery.total - memery.free}}</p>
        <div class="p20" style="height: 400px; width: 500px;">
          <IEcharts :option="bar" :loading="loading"></IEcharts>
        </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      memery: {
        total: 0,
        free: 0
      },
      bar: {
        title: {
          text: 'ECharts Hello World'
        },
        tooltip: {},
        xAxis: {
          data: ['Shirt', 'Sweater', 'Chiffon Shirt', 'Pants', 'High Heels', 'Socks']
        },
        yAxis: {},
        series: [{
          name: 'Sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  },
  created () {
    var params = {page: 1, pagesize: 10};
    var url = "http://localhost:8089/monitor/memery";
    this.$http.get(url, {params: params}).then(response => {
      var data = response.body
      this.memery.total = data.total
      this.memery.free = data.free
    }, response => {
      // error callback 
    })
  },
  methods: {
    a: function () {}
  }
}
</script>
<style>
</style>