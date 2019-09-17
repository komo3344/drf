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
            imgSrc: [reader.result]
        })
      }.bind(this);
    console.log(url) // Would see a path?
    // TODO: concat files
  };
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
              multiple="true"
              onChange={this._onChange}/>
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