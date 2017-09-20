<template>
<div class="app-sidebar">
    <ul v-for="(item, index) in menu" @click="i=index" class="menu">
        <h4 v-bind:class="[{'current': (i==index)}]"><i v-bind:class="[item.icon]"></i> {{item.name}}</h4>
        <ul v-show="index == i" class="submenu">
            <li v-for="li in item.child">
                <router-link :to="{path: li.link}"><i v-bind:class="[li.icon]"></i> {{li.name}}</router-link>
            </li>
        </ul>
    </ul>
</div>
</template>

<script>
import '../assets/bootstrap/fonts/font-awesome.min.css'
export default {
  data () {
    return {
      title: 'Welcome to Your Vue.js App',
      menu: [
        {
          name: '仪表板',
          icon: 'fa fa-dashboard',
          child: [
            {link: '/dash', name: '图表示例', icon: 'fa fa-book'}
          ]
        },
        {
          name: '借还款管理',
          child: [
            {link: 'borrow', name: '审核列表'},
            {link: 'loan', name: '打款列表'},
            {link: 'overdue', name: '逾期列表'},
            {link: 'refund', name: '还款列表'}
          ]
        },
        {
          name: '数据管理',
          child: [
            {link: '/content', name: '数据列表', icon: 'fa fa-table'}
          ]
        },
        {
          name: '私信管理',
          child: [
            {link: 'letter', name: '私信列表'}
          ]
        }
      ],
      ishow: false,
      i: 0
    }
  }

}
</script>
<style scoped>
.app-sidebar{
float:left;width:200px;border-right:1px solid #ddd;position: fixed; top: 60px;bottom: 0;
}
ul.menu {
  margin: 0;
  padding: 0;
  list-style: none;
}
ul.menu > h4{
  border-top: 0px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px 8px;
  margin: 0;
  color: #7f8c8d;
}
ul.menu > h4.current{
  font-weight: 600;
  color: #42b983;
}
ul.submenu {
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #ccc;
}
ul.submenu li{
  list-style: none;
}
ul.submenu li a{
  display: block;
  padding: 10px 0 10px 20px;
  text-decoration: none;
}
.router-link-active{
    color: #42b983;
}
</style>
