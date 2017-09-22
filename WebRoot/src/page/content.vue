<template>
    <div>
        <ul class="breadcrumb">
          <li><router-link :to="{path: '/home'}">首页</router-link></li>
          <li>分析任务</li>
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
          :row-mouse-enter="rowMouseEnter"
          :row-mouse-leave="rowMouseLeave"
          ></v-table>
			    <p>
				  <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="50" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
			    </p>
		    </div>
    </div>
</template>

<script>
import Vue from 'vue'
import mockData from './tableData.js'
import '../components/box.js'
export default {
  data () {
    return {
      tableConfig: {
        tableData: mockData,
        columns: [
          {field: 'name', title: '姓名', width: 100, titleAlign: 'center', columnAlign: 'center'},
          {field: 'tel', title: '手机号码', width: 150, titleAlign: 'center', columnAlign: 'center'},
          {field: 'hobby', title: '爱好', width: 200, titleAlign: 'center', columnAlign: 'center'},
          {field: 'address', title: '地址', width: 200, titleAlign: 'center', columnAlign: 'left', isResize: true},
          {field: 'custome-adv', title: '操作', width: 180, titleAlign: 'center', columnAlign: 'center', componentName: 'table-operation'}
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
    this.tableConfig.tableData = mockData
  },
  methods: {
    add () {
      var $Modal = this.$Modal;
      var tableData = this.tableConfig.tableData;
      var rowData = {};
      var options = {
        show: true,
        heigt: 500,
        width: 450,
        title: '增加',
        component: {
          name: 'edittr',
          data: rowData
        },
        buttons: [
          {
            text: '确定',
            action: function(){
              tableData.push(rowData)
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
    }
  }
}
// 自定义列组件
Vue.component('table-operation', {
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
          name: 'edittr',
          data: rowData
        },
        buttons: [
          {
            text: '确定',
            action: function(){
              
              alert(rowData.name);
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
          alert(rowData.name)
        }
      })
    }
  }
})

Vue.component('edittr', {
  template: `<form id="form" class="form-horizontal">
    <div class="form-group">
      <label for="name" class="form-label">姓名：</label> 
      <div class="form-input-block"><input type="text" class="form-input" v-model="data.name" /></div>
    </div>
    <div class="form-group">
      <label for="name" class="form-label">手机号码：</label> 
      <div class="form-input-block"><input type="text" class="form-input" v-model="data.tel" /></div>
    </div>
    <div class="form-group">
      <label for="name" class="form-label">爱好：</label> 
      <div class="form-input-block"><input type="text" class="form-input" v-model="data.hobby" /></div>
    </div>
    <div class="form-group">
      <label for="name" class="form-label">地址：</label> 
      <div class="form-input-block"><input type="text" class="form-input" v-model="data.address" /></div>
    </div>
	</form>`,
  props: {
    data: {
      type: Object
    }
  }
})
</script>