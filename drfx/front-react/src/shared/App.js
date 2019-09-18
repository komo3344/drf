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
            file: ''
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
    /////////////////////////////////////
    _fileUploadHandler(e) {
    
        const formData = new FormData(); //form의 현재 key/value 들로 채워짐
        formData.append('file', e.target.files[0]);
        fetch(URL.login, {
          method: 'POST',
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          },
          body: formData
      })
        .then(response => {
        console.log(response)
        })
        .catch(err => console.log(err))
        }
        /////////////////////////////////////
        _handleImageChange(e) {
            e.preventDefault();
        
            let reader = new FileReader();
            let file = e.target.files[0];
        
            reader.onloadend = () => {
              this.setState({
                file: file,
              });
            }
        
            reader.readAsDataURL(file)
          }
          ////////////////////////////////////
    handle_write = (e, data) => {

        e.preventDefault();
        const formData = new FormData(); //form의 현재 key/value 들로 채워짐
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('image', data.filePath); //file path

        fetch(URL.posts, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
            body: formData
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
            //window.location.reload();
            console.log(data);
            console.log(data.title);
            console.log(data.content);
            //console.log(file);
    };

    handle_signup = (e, data) => {
        e.preventDefault();
        fetch(URL.signup, {
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

