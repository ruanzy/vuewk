<template>
  <div>
        <ul class="breadcrumb">
          <li><router-link :to="{path: '/home'}">首页</router-link></li>
          <li>Haddop监控</li>
        </ul>
        <div class="p30">
          <div style="width: 600px;border: 1px dashed #ccc;">
            <center><table width="75%" align="center"><tr><td>最大: {{hmumax}}</td><td>大小: {{hmucommitted}}</td><td>已使用: {{hmuused}}</td></tr></table></center>
            <div style="height: 350px; width: 600px;">
              <IEcharts :option="line" @ready="onReady" theme="macarons"></IEcharts>
            </div>
          </div>
        </div>
  </div>
</template>
<script>
import {dateFormat} from '../components/date.js';
  export default {
    data () {
      const that = this
      return {
        timer: null,
        hmucommitted: null,
        hmuused: null,
        hmumax: null,
        line: {
            color: ['#6495ed','#2ec7c9','#6495ed',
                      '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0',
                      '#1e90ff','#ff6347','#7b68ee','#00fa9a','#ffd700',
                      '#6699FF','#ff6666','#3cb371','#b8860b','#30e0e0'],
            legend: {
              y: 'bottom',
              data:['堆内存已使用', '堆内存大小']
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                animation: false
              }
            },
            calculable : true,
            xAxis: {
              type: 'category',
              data: [],
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: '#777'
                }
              },
              splitLine: {
                show: true
              }
            },
            yAxis: {
              type: 'value',
              boundaryGap: [0, '100%'],
              axisLine: {
                lineStyle: {
                  color: '#777' 
                }
              },
              axisLabel : {
                formatter: function(value, index)
                {
                  return 5 * index + "M";
                }
              },
              splitArea : {show : true},
              splitLine: {
                show: true
              }
            },
            series: [{
                name: '堆内存大小',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                splitNumber : 10,
                data: []
              },
              {
                  name: '堆内存已使用',
                  type: 'line',
                  showSymbol: false,
                  hoverAnimation: false,
                  data: []
              }
            ]
		      }
        }
    },
    methods: {
      onReady (instance) {
        const that = this
        that.chart = instance
      },
      update () {
        const that = this;
        var url = "http://localhost:8089/monitor/memery";
        var d = new Date();
        this.$http.post(url, {point: 1}).then(function(response){
            var data = response.data;
            var hmucommitted = data.hmucommitted[0];
            var hmuused = data.hmuused[0];
            var hmumax = data.hmumax[0];
            var opt = that.chart.getOption();
            var str = dateFormat(d, 'HH:mm:ss');
            that.hmumax = hmumax;
            that.hmucommitted = hmucommitted;
            that.hmuused = hmuused;
            opt.xAxis[0].data.shift();
            opt.series[0].data.shift();
            opt.series[1].data.shift();
            opt.xAxis[0].data.push(str);
            opt.series[0].data.push(hmucommitted);
            opt.series[1].data.push(hmuused);
            that.chart.setOption(opt);
        }).catch(function(response) {
          console.log(response)
        });
      }
    },
    beforeMount () {
        const that = this;
    },
    mounted () {
        const that = this;
        var url = "http://localhost:8089/monitor/memery";
        this.$http.post(url, {point: 200}).then(function(response){
            var data = response.data;
            var hmucommitted = data.hmucommitted;
            var hmuused = data.hmuused;
            var hmumax = data.hmumax;
            var timestamps = [];
            var values1 = [];
            var values2 = [];
            var size = hmuused.length;
            var num = (size - 1) * 5 * 1000;
            var t = new Date().getTime() - num;
            for (var i = 0; i < size; i++) {
              var d = new Date(t);
              var str = dateFormat(d, 'HH:mm:ss');
              timestamps.push(str);
              values1.push(hmucommitted[i]);
              values2.push(hmuused[i]);
              t += 5 * 1000;
            }
            that.hmumax = hmumax[size - 1];
            that.hmucommitted = hmucommitted[size - 1];
            that.hmuused = hmuused[size - 1];
            that.chart.setOption({
              xAxis: {
                data: timestamps
              },
              series: [{
                data: values1
              },{
                data: values2
              }]
            });
            that.timer = setInterval(that.update, 5000);
        }).catch(function(response) {
          console.log(response)
        });
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