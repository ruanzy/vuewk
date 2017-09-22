<template>
<div class="modal-mask" v-show="options.show" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container" v-bind:style="w">
        <div class="modal-header">
			<a class="close modal-close" @click="options.close">×</a>
			<h4>{{options.title}}</h4>
        </div>
        <div class="modal-body" v-bind:style="h">
			<component v-bind:is="options.component.name" v-bind:data="options.component.data">
			</component>
        </div>
        <div class="modal-footer">
		    <button class="btn btn-primary" v-for="btn in options.buttons"
              @click="btn.action">
              {{btn.text}}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
      twoWay: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    w () {
      return (this.options.width === null) ? '' : 'width:' + this.options.width + 'px;';
    },
    h: function() {
      return (this.options.heigt === null) ? '' : 'heigt:' + this.options.heigt + 'px;';
    }
  },
  methods: {
    callback () {
	  this.show2 = false
	  this.$emit('callback')
    },
    close () {
      this.showModal = false
    }
  },
  mounted () {
	document.body.appendChild(this.$el);
  }
}
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .2);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  min-width: 350px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 0px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1), 0 0 256px rgba(255, 255, 255, .3);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  color: #777777;
  box-shadow: 0 6px 14px rgba(0,0,0,.18);
    border: 1px solid rgba(0,0,0,.26);
}
.modal-header {
	padding: .7em;
    position: relative;
    white-space: nowrap;
	border-bottom: 0px solid #ccc;
	}

.modal-header h4 {
  color: #42b983;
  margin: 0;
  font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
    cursor: default;
    color: #777777;
	color: #009a61;
	opacity: .7;
}
.modal-header .modal-close {
    position: absolute;
    right: 0;
    top: 50%;
    width: 20px;
    margin: -10px 0 0 0;
    padding: 1px;
    height: 20px;
    color: #000;
    cursor: pointer;
    font-weight: bold;
    opacity: .4;
    font-size: 1.1em;
	display: block;
}
.modal-body {
	padding: 5px 20px;
    overflow-y: auto;
	font-size: 14px;
	color: #000;
	opacity: .7;
}

.modal-footer {
  border-top: 0px solid #ccc;
    padding: 8px 15px;
  line-height: 30px;
   border-bottom: 1px solid #ccc;
   text-align: right;
   display: block;
}

.modal-default-button {
  float: right;
}

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
