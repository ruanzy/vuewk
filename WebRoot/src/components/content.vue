<template>
	<div class="app-content">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Welcome to Your Vue.js App'
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-content{
position: absolute; top: 60px;bottom: 0;left: 0;right: 0;margin-left: 0px;
padding: 0px;
overflow-y: auto;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: inline-block;
}

a {
  color: #fff;
  display: block;
  padding: 20px 15px;
  text-decoration: none;
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>
