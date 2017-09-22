<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body{
margin: 0;
padding: 0;
font-family: 'Avenir', Helvetica, Arial, sans-serif;
font: 15px/1.5 "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;
overflow-y: hidden;
}
#app {
  color: #2c3e50;
}
.btn {
	display: inline-block;
	line-height: 1.42857143;
	padding: 6px 12px;
	color: #fff;
	white-space: nowrap;
	text-align: center;
	font-size: 14px;
	border: none;
	border: 1px solid transparent;
	border-radius: 0px;
	cursor: pointer;
}

.btn-primary {
	background-color: #1ab394;
	color: #fff;
	border-color: #179d82;
}

.btn-primary:hover, .btn-primary:focus, .btn-primary:active,
	.btn-primary.active, .open .dropdown-toggle.btn-primary, .btn-primary:active:focus,
	.btn-primary:active:hover, .btn-primary.active:hover, .btn-primary.active:focus
	{
	background-color: #18a689;
	border-color: #18a689;
	color: #FFFFFF;
}

.btn-default {
    background-color: #fff;
    border-color: #ccc;
	color: #333;
}

.btn-default:hover, .btn-default:focus, .btn-default:active {
	background-color: #e6e6e6;
}

.btn-group {
    display: inline-block;
    position: relative;
    vertical-align: middle;
}

.btn-group>.btn {
    position: relative;
    float: left;
	top: -1px;
}

.btn+.btn, .btn+.btn-group, .btn-group+.btn {
    margin-left: 8px
}
</style>
