import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { URL, Posts, Users, Nav, SignupForm, LoginForm, Write } from 'pages';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      check: false
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch(`${URL.userlist}${localStorage.getItem('id')}/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }
  handle_login = (e, data) => {
    e.preventDefault();
    fetch(URL.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        localStorage.setItem('id', json.user.id);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username
        });
      });
  };

  handle_write = (e, data) => {
    console.log('글 작성 시작')
    this.setState({
      check : true
    })
    e.preventDefault();
    var form_data = new FormData();

    form_data.append('image', data.image);
    form_data.append('title', data.title);
    form_data.append('content', data.content);

    fetch(URL.posts, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        Authorization: `JWT ${localStorage.getItem('token')}`
      },
      body: form_data

    })
      .then(res => {
        console.log(res, '글 작성 끝')
        this.setState({
          displayed_form: '',
          check : false
        });
      })
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch(URL.signup, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': document.querySelector('meta[name="csrf-token"]')
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: data.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      case 'write':
        form = <Write handle_write={this.handle_write} />
        break;
      default:
        form = null;
    }
    return (
      <div>
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : 'Please Log In'
          }
        </h3>
        <p><Link to='/users'>User List</Link></p>
        <p><Link to='/posts'>posts List</Link></p>
        <Route path="/posts" component={Posts} />
        <Route path="/users" component={Users} />

      </div>
    );

  }
}
export default App;

