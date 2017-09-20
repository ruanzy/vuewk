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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
::-webkit-scrollbar {
    width: 5px;
    background-color: #F5F5F5;
}
::-webkit-scrollbar-thumb {
    background-color: #999;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
