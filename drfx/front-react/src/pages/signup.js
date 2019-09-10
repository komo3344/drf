import React, { Component } from 'react';

class Signup extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('http://127.0.0.1:8000/api/v1/rest-auth/registration/', {
      method: 'POST',
      body: data,
    });
    window.location.assign('http://127.0.0.1:3000');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">ID 입력: </label>
        <input id="username" name="username" type="text" /><br />

        <label htmlFor="email">Eamil 입력: </label>
        <input id="email" name="email" type="email" /><br />

        <label htmlFor="password1">비밀번호 입력: </label>
        <input id="password1" name="password1" type="text" /><br />

        <label htmlFor="password2">비밀번호 확인: </label>
        <input id="password2" name="password2" type="text" /><br />

        <button>회원가입</button>
      </form>
    );
  }
}

export default Signup;