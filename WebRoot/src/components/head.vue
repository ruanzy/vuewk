<template>
<div class="app-head">
    <div class="app-logo"><i class="fa fa-cubes"></i> 大数据监控平台</div>
    <ul class="navigation navigation-left">
      <li><router-link :to="{path: '/hadoop'}"><i class="fa fa-sitemap"></i> Haddop监控</router-link></li>
      <li><router-link :to="{path: '/spark'}"><i class="fa fa-desktop"></i> Spark监控</router-link></li>
      <li><router-link :to="{path: '/analyse'}"><i class="fa fa-task"></i> 分析任务</router-link></li>
      <li><router-link :to="{path: '/file'}"><i class="fa fa-file"></i> 文件管理</router-link></li>
      <li class="dropdown" @click.stop='dropdown'>
				<a class="dropdown-toggle" href="javascript:void(0)"><i class="fa fa-cube"></i> 系统管理 <span
					class="caret"></span></a>
				<ul class="dropdown-menu" v-show='dropdownActive'>
					<li><router-link :to="{path: '/user'}"><i class="fa fa-user"></i> 用户管理</router-link></li>
					<li><router-link :to="{path: '/role'}"><i class="fa fa-user"></i> 角色管理</router-link></li>
          <li><router-link :to="{path: '/dash'}"><i class="fa fa-user"></i> 日志管理</router-link></li>
					<li class="divider"></li>
					<li><router-link :to="{path: '/dash'}"><i class="fa fa-user"></i> 系统设置</router-link></li>
				</ul>
      </li>
    </ul>
    <ul class="navigation navigation-right">
      <li><a>{{userName}}, 您好!</a></li>
      <li><a href="javascript:void(0)" @click='logout'><i class="fa fa-power-off"></i> 退出</a></li>
    </ul>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Welcome to Your Vue.js App',
      dropdownActive: false,
      userName: ''
    }
  },
  methods: {
    dropdown (){
      this.dropdownActive = !this.dropdownActive;
    },
    logout () {
      var that = this;
      this.$Modal.confirm('确定要退出系统吗?', function(v){
		if(v){
	      sessionStorage.setItem('userName', '')
	      that.$router.push('/login')
		}
	  })
    }
  },
  mounted () {
    var that = this;
    let userName = sessionStorage.getItem('userName')
    this.userName = userName
    document.addEventListener('click', function(){
      that.dropdownActive = false;
    });  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-logo{
height:60px;
float: left;
font-weight: bold;
padding: 20px 20px;
font-size: 18px;
line-height: 20px;
}
.app-logo:after{
  clear: both;
}
.app-head{
height:60px;
color: #fff;
border:0px solid #ddd;
background-color: #2b83f9;
background-image: linear-gradient(143deg,#18a689 20%,#1ab394 81%,#7BCCB5);
background: #324157;
}

.navigation {
  float: left;
}

.navigation:after{
  clear: both;
}

.navigation > li {
  float: left;
}

.navigation > li > a {
  color: #fff;
  display: block;
  padding: 20px 15px;
  text-decoration: none;
  color: #bfcbd9;
}
.navigation-left {
    float: left!important;
}
.navigation-right {
    float: right!important;
    margin-right: 15px;
}
</style>
