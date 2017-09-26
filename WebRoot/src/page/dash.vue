<template>
  <div>
        <ul class="breadcrumb">
          <li><router-link :to="{path: '/home'}">首页</router-link></li>
          <li>Haddop监控</li>
        </ul>
        <div class="p30">
          <table style="width: 100%;border: 1px dashed #ccc;"><tr>
          <td style="width: 50%;">
            <center><table width="75%" align="center"><tr><td>最大: {{hmumax}}</td><td>大小: {{hmucommitted}}</td><td>已使用: {{hmuused}}</td></tr></table></center>
            <div style="height: 350px; width: 600px;">
              <IEcharts :option="line" @ready="onReady" theme="macarons"></IEcharts>
            </div>
          </td>
          <td>
            <center><table width="75%" align="center"><tr><td>已启动的总数: {{thread_started}}</td><td>活动: {{thread_active}}</td><td>守护进程: {{thread_daemon}}</td></tr></table></center>
            <div style="height: 350px; width: 600px;">
              <IEcharts :option="line2" @ready="onReady2" theme="macarons"></IEcharts>
            </div>
          </td>
          </tr></table>
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
        thread_started: null,
        thread_daemon: null,
        thread_active: null,
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
                  return parseInt(value/1024/1000) + "M";
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
		      },
        line2: {
            color: ['#6495ed','#2ec7c9','#6495ed',
                      '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0',
                      '#1e90ff','#ff6347','#7b68ee','#00fa9a','#ffd700',
                      '#6699FF','#ff6666','#3cb371','#b8860b','#30e0e0'],
            legend: {
              y: 'bottom',
              data:['活动进程', '守护进程']
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
              splitArea : {show : true},
              splitLine: {
                show: true
              }
            },
            series: [{
                name: '活动进程',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: []
              },
              {
                  name: '守护进程',
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
      onReady2 (instance) {
        const that = this
        that.chart2 = instance
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
    },
    update2 () {
        const that = this;
        var url = "http://localhost:8089/monitor/thread";
        var d = new Date();
        this.$http.post(url, {point: 1}).then(function(response){
            var data = response.data;
            var thread_daemon = data.thread_daemon[0];
            var thread_started = data.thread_started[0];
            var thread_active = data.thread_active[0];
            var opt = that.chart2.getOption();
            var str = dateFormat(d, 'HH:mm:ss');
            that.thread_daemon = thread_daemon;
            that.thread_started = thread_started;
            that.thread_active = thread_active;
            opt.xAxis[0].data.shift();
            opt.series[0].data.shift();
            opt.series[1].data.shift();
            opt.xAxis[0].data.push(str);
            opt.series[0].data.push(thread_active);
            opt.series[1].data.push(thread_daemon);
            that.chart2.setOption(opt);
        }).catch(function(response) {
          console.log(response)
        });
    },
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

        var url2 = "http://localhost:8089/monitor/thread";
        this.$http.post(url2, {point: 200}).then(function(response){
            var data = response.data;
            var thread_daemon = data.thread_daemon;
            var thread_started = data.thread_started;
            var thread_active = data.thread_active;
            var timestamps = [];
            var values1 = [];
            var values2 = [];
            var size = thread_daemon.length;
            var num = (size - 1) * 5 * 1000;
            var t = new Date().getTime() - num;
            for (var i = 0; i < size; i++) {
              var d = new Date(t);
              var str = dateFormat(d, 'HH:mm:ss');
              timestamps.push(str);
              values1.push(thread_active[i]);
              values2.push(thread_daemon[i]);
              t += 5 * 1000;
            }
            that.thread_started = thread_started[size - 1];
            that.thread_daemon = thread_daemon[size - 1];
            that.thread_active = thread_active[size - 1];
            that.chart2.setOption({
              xAxis: {
                data: timestamps
              },
              series: [{
                data: values1
              },{
                data: values2
              }]
            });
            that.timer2 = setInterval(that.update2, 5000);
        }).catch(function(response) {
          console.log(response)
        });
    },
    beforeDestroy () {
      const that = this
      if (that.timer1) {
        clearInterval(that.timer1)
        that.timer1 = null
      }
      if (that.timer2) {
        clearInterval(that.timer2)
        that.timer2 = null
      }
    }
  }
</script>
<style>
</style>