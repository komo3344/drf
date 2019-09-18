import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Write extends React.Component {
  state = {};

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };
  getInitialState = ()=>{
    return{file: []}
  };
  _onChange = ()=>{
    // Assuming only image
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
  
     reader.onloadend = function (e) {
        this.setState({
            imgSrc: [reader.result],
            filename : file.name,
            filePath : url
        })
      }.bind(this);

      console.log(url); // Would see a path?
      console.log(file.name);
      
    // TODO: concat files
  };
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
  
  render() {
    return (
      <div>
        <div>
          <h3>게시물작성 </h3>
          <form onSubmit={e => this.props.handle_write(e, this.state)}>
            <label htmlFor="title">title</label>
            <input
              type="text"
              name="title"
              onChange={this.handle_change}
            />
            <label htmlFor="content">content</label>
            <input
              type="text"
              name="content"
              onChange={this.handle_change}
            /><br />
            <input 
              ref="file" 
              type="file" 
              name="user[image]" 
              multiple={true} // input 요소에 값을 두 개 이상 입력하는 것을 허용
              onChange={this._onChange}/><br />
              <h3>이미지 미리보기</h3>
              <img src={this.state.imgSrc} alt='' /><br />    
            <input type="submit" />
          </form>
          
        </div>
        <div>
          
          <p><Link to='/'>Home</Link></p>
        </div>
      </div>
      
    );
  }
}

export default Write;

Write.propTypes = {
  handle_write: PropTypes.func.isRequired
};