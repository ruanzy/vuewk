<template>
<div class="app-head">
    <div class="app-logo">大数据监控平台</div>
    <ul role="navigation">
      <li><router-link :to="{path: '/dash'}"><i class="fa fa-sitemap"></i> Haddop监控</router-link></li>
      <li><a class="nav-link" href="#" title="Spark监控"><i class="fa fa-desktop"></i> Spark监控</a></li>
      <li><router-link :to="{path: '/content'}"><i class="fa fa-task"></i> 分析任务</router-link></li>
      <li><a class="nav-link" href="#" title="文件管理"><i class="fa fa-file"></i> 文件管理</a></li>
    </ul>
    <ul id="op">
      <li>{{userName}}, 您好!</li>
      <li><a href="javascript:void(0)" @click='logout'><i class="fa fa-power-off"></i> 退出</a></li>
    </ul>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Welcome to Your Vue.js App',
      userName: ''
    }
  },
  methods: {
    logout () {
      var that = this;
      this.$Modal.confirm('确定要删除数据吗!', function(v){
		if(v){
	      sessionStorage.setItem('userName', '')
	      that.$router.push('/login')
		}
	  })
    }
  },
  mounted () {
    let userName = sessionStorage.getItem('userName')
    this.userName = userName
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-logo{
height:60px;
display: inline-block;
padding: 0 20px;
font-weight: bold;
font-size: 20px;
}
.app-head{
height:60px;
color: #fff;
border:0px solid #ddd;
background-color: #2b83f9;
background-image: linear-gradient(143deg,#18a689 20%,#1ab394 81%,#7BCCB5);
}

ul {
  list-style: none;
  display: inline-block;
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
#op{
  float: right;
}
</style>
