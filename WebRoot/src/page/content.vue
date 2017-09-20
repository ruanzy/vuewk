<template>
    <div>
        <ul class="breadcrumb">
          <li><router-link :to="{path: '/home'}">首页</router-link></li>
          <li>分析任务</li>
        </ul>
        <div class="p20">
          <p><button class="btn btn-primary" @click='add'>增加</button></p>
		  <p><button class="btn btn-primary" @click='add2'>增加2</button></p>
		  <h4 slot="header">数据列表</h4>
		  			  <div slot="body"  style="padding: 20px 30px;">	  
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
			<modal :show.sync="showModal" :options.sync="options">

			  
			  <div slot="footer">	 
				<button class="btn btn-primary"
              @click="ok">
              确定
            </button>
			            <button class="btn btn-primary"
              @click="close">
              关闭
            </button>
			 </div> 
			</modal>
			<alert :show.sync="showAlert" :options.sync="options" @callback="alertCallback"></alert>
		</div>
    </div>
</template>

<script>
import Vue from 'vue'
import mockData from './tableData.js'
import modal from '../components/dialog.vue'
import alert from '../components/alert.vue'
export default {
  components: { modal, alert },
  data () {
    return {
      showAlert: false,
      showModal: false,
	  options: {
		heigt: 500,
		width: 350,
		title: 'asdasd',
		content: 'asdasd'
	  },
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
      var o = {'name': '韩伟', 'img': '1.jpg', 'gender': '女', 'nickname': '韩', 'birthday': '1993-12-7', 'height': '166', 'email': 'han@gmail.com', 'tel': '177*****2222', 'hobby': '钢琴、书法、唱歌', 'address': '上海市浦东新区东方路818号建行一楼', 'job': '码农'}
      this.tableConfig.tableData.push(o)
	  this.showModal = true
    },
    add2 () {
	  this.showAlert = true
    },
    ok () {
      alert('asdd')
      this.showModal = false
    },
    close () {
      this.showModal = false
    },
	alertCallback () {
      this.showAlert = false
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
      alert('编辑: ' + this.index)
      console.log(this.index)
      console.log(this.rowData[this.field])
      console.log(this.rowData)
    },
    deleteRow () {
      alert('删除: ' + this.index)
      console.log(this.index)
      console.log(this.rowData[this.field])
      console.log(this.rowData)
    }
  }
})
</script>