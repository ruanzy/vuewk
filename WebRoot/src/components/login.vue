<template>
<div>
  <input type="text" v-model="username"/>
  <input type="password" v-model="password"/>
  <button @click='login'>登录</button>
</div>
</template>

<script>
import md5 from 'js-md5';
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
      const that = this;
      var url = "user/login";
      var username = this.username;
      var password = this.password;
      var _password = md5(username + '_' + password);
      var params = {username: username, password: _password};
      this.$http.post(url, params).then(function(response){
          var data = response.data;
          if (data.code == 0) {
            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('userName', data.username)
            this.$router.push('/home')
          }else if (data.code == 10001) {
            that.$Modal.alert('用户名或密码错误!'); 
          }
      }).catch(function(response) {
        console.log(response)
      });
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
