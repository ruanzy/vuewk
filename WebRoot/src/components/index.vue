<template>
<div>
<app-head></app-head>
<app-content></app-content>
</div>
</template>

<script>
import appHead from './head.vue'
import appSidebar from './sidebar.vue'
import appContent from './content.vue'
export default {
  components: { appHead, appSidebar, appContent },
  data () {
    return {
      title: 'Welcome to Your Vue.js App'
    }
  }

}
</script>
<style>
</style>
