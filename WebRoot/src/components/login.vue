<template>
<div>
  <input type="text" v-model="username"/>
  <input type="password" v-model="password"/>
  <button @click='login'>登录</button>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Welcome to Your Vue.js App',
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.username && this.password) {
        sessionStorage.setItem('userName', this.username)
        this.$router.push('/home')
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
margin: 0;
padding: 0;
font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
