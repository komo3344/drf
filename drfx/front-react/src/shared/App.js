import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Posts, Users, Nav, SignupForm, LoginForm, Write } from 'pages';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: localStorage.getItem('token') ? true : false,
            username: ''
        };
    }

    componentDidMount() {
        if (this.state.logged_in) {
            fetch(`http://127.0.0.1:8000/api/v1/users/${localStorage.getItem('id')}/`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json)
                    this.setState({ username: json.username });
                });
        }
    }
    handle_login = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
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
        e.preventDefault();
        console.log(data)
        fetch('http://127.0.0.1:8000/api/v1/users/posts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                res.json()
            })
            .then(json => {
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                });
            });
            window.location.reload();

    };

    handle_signup = (e, data) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/api/v1/rest-auth/registration/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken' : document.querySelector('meta[name="csrf-token"]')
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

