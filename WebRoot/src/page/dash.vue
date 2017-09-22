<template>
  <div>
        <ul class="breadcrumb">
          <li><router-link :to="{path: '/home'}">首页</router-link></li>
          <li>Haddop监控</li>
        </ul>
        <div class="p30">
          <div class="p20" style="height: 350px; width: 600px;border: 1px dashed #ccc;">
            <IEcharts :option="line" @ready="onReady"></IEcharts>
          </div>
          <p>服务器JVM总内存: 11111111</p>
          <p>服务器已使用内存: 11111111</p>
        </div>
  </div>
</template>
<script>
  export default {
    data () {
      const that = this
      return {
        xdata: [],
        data: [],
        timer: null,
        now: +new Date(1997, 9, 3),
        oneDay: 24 * 3600 * 1000,
        line: {
          title: {
            text: '服务器内存'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            }
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              show: false
            }
          },
          series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: that.data
          }]
        }
      }
    },
    methods: {
      onReady (instance) {
        const that = this
        that.chart = instance
      },
      randomData () {
        const that = this
        that.now = new Date(+that.now + that.oneDay)
        return {
          name: that.now.toString(),
          value: [
            [that.now.getFullYear(), that.now.getMonth() + 1, that.now.getDate()].join('/'),
            Math.round(Math.random()*(100 - 20 + 1) + 20)
          ]
        }
      }
    },
    beforeMount () {
      const that = this
      for (var i = 0; i < 100; i++) {
        that.data.push(that.randomData())
      }
    },
    mounted () {
      const that = this
      if (that.timer) {
        clearInterval(that.timer)
        that.timer = null
      }
      that.timer = setInterval(function () {
        that.data.shift()
        that.data.push(that.randomData())
        that.chart && that.chart.setOption({
          series: [{
            data: that.data
          }]
        })
      }, 1000)
    },
    beforeDestroy () {
      const that = this
      if (that.timer) {
        clearInterval(that.timer)
        that.timer = null
      }
    }
  }
</script>
<style>
</style>