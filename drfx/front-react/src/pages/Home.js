import React, { Component } from 'react';

class Home extends Component {
  state = {
    token: ''
  }
    constructor() {
      super();
      this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        fetch('http://127.0.0.1:8000/token-auth/', {
          method: 'POST',
          body: data,
        }).then(response => response.json()).then(response => console.log(response));
    }
  
    render() {
      return (
        <form onSubmit={this.handleLogin}>
          <p>{this.token}</p>
          <p>{console.log(this.token)}</p>
          <label htmlFor="username">ID 입력: </label>
          <input id="username" name="username" type="text" /><br />
  
          <label htmlFor="password">비밀번호 입력: </label>
          <input id="password" name="password" type="text" /><br />
          
          <button>로그인</button><br />
          <a href = "http://127.0.0.1:3000/signup/">회원가입</a><br />
          <a href = "http://127.0.0.1:3000/users/">User List</a><br />
          <a href = "http://127.0.0.1:3000/posts/">Posts</a><br />
        </form>
      );
    }
  }
  
  export default Home;