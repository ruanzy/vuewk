<template>
    <div>
        <ul class="breadcrumb">
          <li><router-link :to="{path: '/home'}">首页</router-link></li>
          <li>系统管理</li>
          <li>角色管理</li>
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
          {field: 'name', title: '角色名', width: 200, titleAlign: 'center', columnAlign: 'center'},
          {field: 'custome-adv', title: '操作', width: 500, isResize:true, titleAlign: 'center', columnAlign: 'center', componentName: 'roletable-operation'}
        ],
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
        var url = "role/list";
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
        rolename: ''
      };
      var options = {
        show: true,
        heigt: 500,
        width: 450,
        title: '增加',
        component: {
          name: 'roleaddtr',
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
        var url = "role/add";
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
    del (id) {
        const that = this;
        var url = "role/del";
        this.$http.post(url, {id: id}).then(function(response){
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
Vue.component('roletable-operation', {
  template: `<span>
    <a href="" @click.stop.prevent="setPermission(rowData,index)">设置权限</a>&nbsp;
    <a href="" @click.stop.prevent="deleteRole(rowData,index)">删除</a>
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
    setPermission () {
      var rowData = this.rowData;
      var $Modal = this.$Modal;
      var options = {
        show: true,
        heigt: 500,
        width: 450,
        title: '设置权限',
        component: {
          name: 'loadpermissionCmp',
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
    deleteRole () {
      var rowData = this.rowData;
      this.$Modal.confirm('确定要删除数据吗?', function(v){
        if(v){
          bus.$emit('del', rowData.id);
        }
      })
    }
  }
})

Vue.component('roleaddtr', {
  template: `<form id="form" class="form-horizontal">
    <div class="form-group">
      <label for="rolename" class="form-label">角色名：</label> 
      <div class="form-input-block"><input type="text" class="form-input" v-model="data.rolename" /></div>
    </div>
	</form>`,
  props: {
    data: {
      type: Object
    }
  }
});
Vue.component('loadpermissionCmp', {
  template: `<form id="form" class="form-horizontal">
    <div class="form-group">
      <label for="rolename" class="form-label">角色名：</label> 
      <div class="form-input-block"><input type="text" class="form-input" v-model="data.rolename" /></div>
    </div>
	</form>`,
  props: {
    data: {
      type: Object
    }
  }
});
</script>