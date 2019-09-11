import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Posts extends Component {
    state = {
        posts: []
    };

    handleDelete = url=> {
        fetch(url, {
          method: 'DELETE',
          headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
          }
        });
        window.location.reload();
    }
    
    async componentDidMount() {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/v1/users/posts/');
            const posts = await res.json();
            this.setState({
                posts
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                {this.state.posts.map(item => 
                    (
                    <div key={item.url}>
                        <h4>제목 : {item.title}</h4>
                        <p>내용 : {item.content}</p>
                        <p>작성자 : {item.owner}</p>
                        <p>생성일 : {item.created_at}</p>
                        <button onClick={() => { this.handleDelete(item.url) }}>삭제</button>
                        <br /><br />
                    </div>
                    )
                )
                }
                  <p><Link to='/'>Home</Link></p>
            </div>
        );
    }
}

export default Posts;