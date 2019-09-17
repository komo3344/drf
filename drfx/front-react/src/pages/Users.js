import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { URL } from 'pages';
class Users extends Component {
    state = {
        Users: []
    };

    async componentDidMount() {
        try {
            const res = await fetch(URL.userlist);
            const Users = await res.json();
            this.setState({
                Users
            });
        } catch (e) {
            console.log(e);
        }
    }

    render(){ 
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