<template>
<div class="modal-mask" v-show="show" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container" v-bind:style="{width: options.width + 'px'}">
        <div class="modal-header">
          <slot name="header">
            default header
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            default body
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            default footer
            <button class="btn btn-primary modal-default-button"
              @click="show = false">
              关闭
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
    },
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    }
  },
  data () {
    return {
    }
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
  max-width: 1000px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 0px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1), 0 0 256px rgba(255, 255, 255, .3);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h4 {
  color: #42b983;
  margin: 0;
  padding: 8px 15px;
  line-height: 30px;
   border-bottom: 1px solid #ccc;
}

.modal-body {
    max-height: 450px;
    overflow-y: auto;
}

.modal-footer {
  border-top: 1px solid #ccc;
    padding: 8px 15px;
  line-height: 30px;
   border-bottom: 1px solid #ccc;
   text-align: right;
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
.btn-primary {
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
}
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
</style>
