import React, { Component } from 'react';


class Home extends Component {
    constructor() {
      super();
      this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      
      fetch('http://127.0.0.1:8000/api/v1/rest-auth/login/', {
        method: 'POST',
        body: data
      });
      //window.location.assign('http://127.0.0.1:3000/posts/')
    }
  
    render() {
      return (
        <form onSubmit={this.handleLogin}>
          <label htmlFor="username">ID 입력: </label>
          <input id="username" name="username" type="text" /><br />
  
          <label htmlFor="email">Eamil 입력: </label>
          <input id="email" name="email" type="email" /><br />
  
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