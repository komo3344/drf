import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Posts extends Component {
    state = {
        posts: [],
        editing : false
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

    handleDelete = url => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        });
        window.location.reload();
    }

    handleUpdate = (id) => {
        this.setState({
            editing : !this.state.editing
        })
        fetch(`http://127.0.0.1:8000/api/v1/users/posts/${id}/`)
        .then(res => res.json())
        .then(json => {
            this.setState({
                id : id,
                title : json.title,
                content : json.content
            })
        })
        
    }

    handleTmp = (id) => {
        this.setState({
            editing : !this.state.editing
        })
        fetch(`http://127.0.0.1:8000/api/v1/users/posts/${id}/`,{
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                "title" : this.state.title,
                "content" : this.state.content
            })
        })
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
                <div>
                {this.state.editing
                    ? (
                        <div>
                            <h5>수정중</h5>
                            <form onSubmit={() => {this.handleTmp(this.state.id)}}>
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
                        )
                    : (
                        <div>
                            <h5>원래작업</h5>        
                            {this.state.posts.map(item =>
                                (
                                    <div key={item.url}>
                                        <h4>제목 : {item.title}</h4>
                                        <p>내용 : {item.content}</p>
                                        <p>작성자 : {item.owner}</p>
                                        <p>생성일 : {item.created_at}</p>
                                        <button onClick={() => {this.handleDelete(item.url)}}>삭제</button>
                                        <button onClick={() => {this.handleUpdate(item.id)}}>수정</button>
                                        <br /><br />
                                    </div>
                                )
                            )
                }           
                <p><Link to='/'>Home</Link></p>
                        </div>
                        )
                }
                </div>
                
            </div>
        );
    }
}

export default Posts;