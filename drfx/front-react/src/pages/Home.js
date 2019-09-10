import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        <div>
          <p><Link to='/users'>User List</Link></p>
          <p><Link to='/posts'>posts List</Link></p>
        </div>
      )
    }
  }
  
  export default Home;