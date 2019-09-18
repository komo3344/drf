import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { URL, Write } from 'pages';
const style = {
    image: {
        border: '1px solid #ccc',
        background: '#fefefe',
    },
};
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
        }).then(() => {
            this.postlist()
        })
    }
    async postlist() {
        try {
            const res = await fetch(URL.posts);
            const posts = await res.json();
            this.setState({
                posts
            });
        } catch (e) {
            console.log(e);
        }
    }

    handleUpdate = (id) => {
        this.setState({
            editing : !this.state.editing
        })
        fetch(`${URL.posts}${id}/`)
        .then(res => res.json())
        .then(json => {
            this.setState({
                id : id,
                title : json.title,
                content : json.content,
                image : json.image,
                
            })
        })
        
    }

    handleModify = (id) => {
        this.setState({
            editing : !this.state.editing
        })
        fetch(`${URL.posts}${id}/`,{
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "title" : this.state.title,
                "content" : this.state.content,
                //"image" : this.state.image
            })
        }).then(() =>{
            this.postlist()
        })
        // console.log(`${URL.posts}${id}/`)
        // window.location.reload();
        
    }

    async componentDidMount() {
        try {
            const res = await fetch(URL.posts);
            const posts = await res.json();
            this.setState({
                posts
            });
        } catch (e) {
            console.log(e);
        }
    }
    handle_write = (e, data) => {
        e.preventDefault();
        var form_data = new FormData();

        form_data.append('image', data.image);
        form_data.append('title', data.title);
        form_data.append('content', data.content);      

        fetch(URL.posts, {
            method: 'POST',
            headers: {
                Accept : '*/*',
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
            body: form_data
            
        })
            .then(res => {
                res.json()
            })
            .then(json => {
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                });
            }).then(()=>{
                this.postlist()
            })
    }
    render(props) {
        
        
        return (
            <div>
                <Write handle_write={this.handle_write} />
                <div>
                {this.state.editing
                    ? (
                        <div>
                            <h5>수정중</h5>
                            <form onSubmit={() => {this.handleModify(this.state.id)}}>
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
                                        <img
                                         src={item.image}
                                         alt='No img'
                                         height={240}
                                         width={240}
                                         style={style.image
                                        }
                                        /><br />
                           
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