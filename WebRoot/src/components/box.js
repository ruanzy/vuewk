import Vue from 'vue'
import Alert from '../components/alert.vue'
Vue.prototype.$Modal = {
	confirm (msg, callback){
		var div = Vue.extend(Alert)
		var options = {
			show: true,
			heigt: 500,
			width: 350,
			title: '提示',
			content: msg,
			close: function(){
				document.body.removeChild(dd.$el)
			},
			buttons: [
				{
					text: '确定',
					action: function(){
						callback && callback.call(dd.$el, true)
						document.body.removeChild(dd.$el)
					}
				},
				{
					text: '取消',
					action: function(){
						callback && callback.call(dd.$el, false)
						document.body.removeChild(dd.$el)
					}
				}
			]
		}
		var dd = new div({propsData: {options : options}}).$mount()
		document.body.appendChild(dd.$el)
	},
	alert2 (msg, callback){
		var div = Vue.extend(Alert)
		var options = {
			show: true,
			heigt: 500,
			width: 350,
			title: '提示',
			content: msg,
			close: function(){
				document.body.removeChild(dd.$el)
			},
			buttons: [
				{
					text: '确定',
					action: function(){
						callback && callback.call(dd.$el)
						document.body.removeChild(dd.$el)
					}
				}
			]
		}
		var dd = new div({propsData: {options : options}}).$mount()
		document.body.appendChild(dd.$el)
	}
};