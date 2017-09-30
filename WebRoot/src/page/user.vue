<template>
    <div>
        <ul class="breadcrumb">
          <li><router-link :to="{path: '/home'}">首页</router-link></li>
          <li>系统管理</li>
          <li>用户管理</li>
        </ul>
        <div class="p30">
          <p>
		      <button class="btn btn-primary" @click='add'><i class="fa fa-plus"></i> 增加</button>
		      </p> 
          <v-table
           is-horizontal-resize
           style="width:100%"
           :columns="tableConfig.columns"
           :table-data="tableConfig.tableData"
           :on-row-click="tableConfig.onRowClick"
           :show-vertical-border="true"
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          title-bg-color="#eef1f6"
          :row-mouse-enter="rowMouseEnter"
          :row-mouse-leave="rowMouseLeave"
          ></v-table>
			    <p>
				  <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="tableConfig.total" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
			    </p>
		    </div>
    </div>
</template>

<script>
import Vue from 'vue'
import '../components/box.js'
var bus = new Vue();
export default {
  data () {
    return {
      tableConfig: {
        page: 1,
        pageSize: 10,
        total: 0,
        tableData: [],
        columns: [
          {field: 'username', title: '用户名', width: 100, titleAlign: 'center', columnAlign: 'center'},
          {field: 'phone', title: '手机号码', width: 150, titleAlign: 'center', columnAlign: 'center'},
          {field: 'email', title: 'E-mail', width: 200, titleAlign: 'center', columnAlign: 'center'},
          {field: 'regtime', title: '注册时间', width: 200, titleAlign: 'center', columnAlign: 'left', isResize: true},
          {field: 'custome-adv', title: '操作', width: 180, titleAlign: 'center', columnAlign: 'center', componentName: 'mytable-operation'}
        ],
        titleBgColor: '#e1e1e1',
        onRowClick (rowIndex, rowData) {
          console.log(rowIndex)
          console.log(rowData)
        }
      }
    }
  },
  created () {
    const that = this;
    bus.$on('del', function (id) { 
        that.del(id);
    });
    bus.$on('update', function (data) { 
        that.update(data);
    });
    that.getTableData();
  },
  methods: {
    getTableData(){
        const that = this;
        var page = that.tableConfig.page;
        var pagesize = that.tableConfig.pageSize;
        var url = "user/list";
        var params = {page: page, pagesize: pagesize};
        this.$http.post(url, params).then(function(response){
            var data = response.data;
            that.tableConfig.tableData = data.data;
            that.tableConfig.total = data.total;
        }).catch(function(response) {
          console.log(response)
        });
    },
    add () {
      const that = this;
      var $Modal = that.$Modal;
      var rowData = {
        username: '',
        password: '111111',
        deptid: 1,
        phone: '222222',
        email: 'rzy@163.com'
      };
      var options = {
        show: true,
        heigt: 500,
        width: 450,
        title: '增加',
        component: {
          name: 'myaddtr',
          data: rowData
        },
        buttons: [
          {
            text: '确定',
            action: function(){
              that.save(rowData);
              $Modal.close(d)
            }
          },
          {
            text: '取消',
            action: function(){
              $Modal.close(d)
            }
          }
        ]
      }
      var d = $Modal.dialog(options)
    },
    save (data) {
        const that = this;
        var url = "user/add";
        this.$http.post(url, data).then(function(response){
          that.getTableData();
        }).catch(function(response) {
          console.log(response)
        });
    },
    update (data) {
        const that = this;
        var url = "user/update";
        this.$http.post(url, data).then(function(response){
          that.getTableData();
        }).catch(function(response) {
          console.log(response)
        });
    },
    del (username) {
        const that = this;
        var url = "user/del";
        this.$http.post(url, {username: username}).then(function(response){
          that.getTableData();
        }).catch(function(response) {
          console.log(response)
        });
    },
    pageChange (page) {
      const that = this;
      that.tableConfig.page = page;
      that.getTableData();
    },
    pageSizeChange (pageSize) {
      const that = this;
      that.tableConfig.pageSize = pageSize;
      that.getTableData();
    }
  }
}
// 自定义列组件
Vue.component('mytable-operation', {
  template: `<span>
    <a href="" @click.stop.prevent="update(rowData,index)">编辑</a>&nbsp;
    <a href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
    </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    update () {
      var rowData = this.rowData;
      var $Modal = this.$Modal;
      var options = {
        show: true,
        heigt: 500,
        width: 450,
        title: '编辑',
        component: {
          name: 'myaddtr',
          data: rowData
        },
        buttons: [
          {
            text: '确定',
            action: function(){
              bus.$emit('update', rowData);
              $Modal.close(d)
            }
          },
          {
            text: '取消',
            action: function(){
              $Modal.close(d)
            }
          }
        ]
      }
      var d = $Modal.dialog(options)
    },
    deleteRow () {
      var rowData = this.rowData;
      this.$Modal.confirm('确定要删除数据吗?', function(v){
        if(v){
          bus.$emit('del', rowData.username);
        }
      })
    }
  }
})

Vue.component('myaddtr', {
  template: `<form id="form" class="form-horizontal">
    <div class="form-group">
      <label for="username" class="form-label">用户名：</label> 
      <div class="form-input-block"><input type="text" class="form-input" v-model="data.username" /></div>
    </div>
    <div class="form-group">
      <label for="phone" class="form-label">手机号码：</label> 
      <div class="form-input-block"><input type="text" class="form-input" v-model="data.phone" /></div>
    </div>
    <div class="form-group">
      <label for="email" class="form-label">E-mail：</label> 
      <div class="form-input-block"><input type="text" class="form-input" v-model="data.email" /></div>
    </div>
	</form>`,
  props: {
    data: {
      type: Object
    }
  }
});
</script>