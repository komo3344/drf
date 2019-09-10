import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Users extends Component {
    state = {
        Users: []
    };

    async componentDidMount() {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/v1/users/');
            const Users = await res.json();
            this.setState({
                Users
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                {this.state.Users.map(item => (
                    <div key={item.url}>
                        <h4>ID : {item.username}</h4>
                        <p>EMAIL : {item.email}</p><br />
                    </div>
                ))}
                <p><Link to='/'>Home</Link></p>
            </div>
        );
    }
}

export default Users;