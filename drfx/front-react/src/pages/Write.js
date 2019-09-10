import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Write extends Component {
  state = {
    title: '',
    content: ''
  };
  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handle_write = (e, data) => {
    const { x } = this.state;
    this.setState({
      title: x.title,
      content: x.Component
    })

    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/v1/users/posts/', {
      method: 'POST',
      body : this.state
    })
    
  }
  render(){
    return (
      <div>
        <div>
          <h3>게시물작성 </h3>
          <form onSumit={this.handle_write}>
            <label htmlFor="title">title</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handle_change}
            />
            <label htmlFor="content">content</label>
            <input
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handle_change}
            />
            <input type="submit" />
          </form>
        </div>
        <div>
          <p><Link to='/'>Home</Link></p>
        </div>
      </div>

    );
  }
}

export default Write;