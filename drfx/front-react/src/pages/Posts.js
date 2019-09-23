import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { URL, Write } from 'pages';
import deleteAPI from './API'

const style = {
  image: {
    border: '1px solid #ccc',
    background: '#fefefe',
  },
};
class Posts extends Component {
  state = {
    posts: [],
    editing: false,
    writeShowResults: false
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
  //////////////////////////////////////////////////////////////////////////////////////
  handleDelete = url => {
    deleteAPI(url)
    .then(() => {
      this.postlist()
    })
  }
  //////////////////////////////////////////////////////////////////////////////////////
  async postlist() {
    console.log('postlist실행')
    try {
      const res = await fetch(URL.posts);
      const posts = await res.json();
      console.log(posts)
      this.setState({
        posts
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleUpdate = (id) => {
    this.setState({
      editing: !this.state.editing
    })
    fetch(`${URL.posts}${id}/`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          id: id,
          title: json.title,
          content: json.content,
          image: json.image,

        })
      })

  }

  handleModify = (e, data) => {
    this.setState({
      editing: !this.state.editing
    })
    e.preventDefault();
    var form_data = new FormData();
    form_data.append('image', data.image);
    form_data.append('title', data.title);
    form_data.append('content', data.content);

    fetch(`${URL.posts}${this.state.id}/`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      },
      body: form_data
    }).then(() => {
      this.postlist()
    })

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
    this.setState({
      writeShowResults : !this.state.writeShowResults
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
        res.json()
      })
      .then(json => {
        this.setState({
          logged_in: true,
          displayed_form: '',
        });
      }).then(() => {
        this.postlist()
      })
  }

  onClick = () => {
    this.setState({
      writeShowResults: !this.state.writeShowResults
    })
  }
  handleImageChange = e => {
    this.setState({
      image: e.target.files[0]
    })
  }
  render() {
    return (
      <div>
        <div>

        </div>

        <div>
          {this.state.editing
            ? (
              <div>
                <h3>수정중</h3>
                <form onSubmit={(e) => { this.handleModify(e, this.state) }}>
                  <label htmlFor="title">title</label>
                  <input
                    autoFocus
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
                  /><br />
                  <input
                    required
                    ref="file" //필요
                    id="image"
                    accept="image/*"
                    type="file"
                    name="image"
                    onChange={this.handleImageChange}
                  />
                  <input type="submit" />
                </form>
              </div>
            )
            : (
              <div>
                <h3>게시판</h3>
                <input type="submit" value="게시물 작성" onClick={this.onClick} />
                {this.state.writeShowResults ? <Write handle_write={this.handle_write} /> : null}
                {this.state.posts.slice(0).reverse().map(item =>
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

                      <button onClick={() => { this.handleDelete(item.url) }}>삭제</button>
                      <button onClick={() => { this.handleUpdate(item.id) }}>수정</button>
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