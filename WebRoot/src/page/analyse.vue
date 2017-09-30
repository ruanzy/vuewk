<template>
    <div>
        <ul class="breadcrumb">
          <li><router-link :to="{path: '/home'}">首页</router-link></li>
          <li>分析任务</li>
        </ul>
        <div class="p30">
          {{title}}
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      title: '分析任务'
    }
  }
}
</script>