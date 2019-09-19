import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { URL } from 'pages';
const style = {
  image: {
    border: '1px solid #ccc',
    background: '#fefefe',
  },
};
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      editing: false,
      writing: false
    };
  }
  

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handleImageChange = e => {
    this.setState({
      image: e.target.files[0]
    })
  }

  handleDelete = url => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        this.newPostList()
      })

  }

  async newPostList() {
    console.log('newPostList 실행')
    try {
      const res = await fetch(URL.posts).then(console.log('패치완료'));
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

  handleModify = (id) => {
    console.log('글 수정 시작')
    var form_data = new FormData();

    form_data.append('title', this.state.title);
    form_data.append('content', this.state.content);
    form_data.append('image', this.state.image);


    this.setState({
      editing: !this.state.editing
    })
    fetch(`${URL.posts}${id}/`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      },
      body: form_data
    }).then(res =>
      this.newPostList()
    )
    console.log('글 수정 끝')
    
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

  shouldComponentUpdate(nextProps, nextState) {
    console.log('-----------shouldComponentUpdate------------',nextProps)
    return true
  }

  getSnapshotBeforeUpdate(prevProps, prevState){
    if (prevProps.check === true && this.props.check === false){
      this.newPostList()
    }
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot){

    if (snapshot !== null){
    }
    console.log('------------componentDidUpdate-------------')
  }



  render() {
    return (
      <div>
        <div>
          {this.state.editing
            ? (
              <div id='editing'>
                <h5>수정중</h5>
                <form onSubmit={() => { this.handleModify(this.state.id) }}>
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
                  <input
                    ref="file" 
                    id="image"
                    accept="image/png, image/jpeg"
                    type="file"
                    name="image"
                    onChange={this.handleImageChange}
                  />
                  <input type="submit" />
                </form>
              </div>
            )
            : (
              <div id='posting'>
                <h2>게시판</h2>
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