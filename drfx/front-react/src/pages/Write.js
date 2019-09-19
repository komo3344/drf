import React from 'react';
import PropTypes from 'prop-types';

class Write extends React.Component {
  state = {
    title : null,
    content: null,
    image: null
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

  handleImageChange = e => {
    this.setState({
      image: e.target.files[0]
    })
  }
  render() {
    return (
      <div>
        <div>
          <h3>게시물작성 </h3>
          <form onSubmit={e => this.props.handle_write(e, this.state)}>
            <label htmlFor="title">title</label>
            <input
              autoFocus
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
              required
              ref="file"
              id="image"
              accept="image/*"
              type="file"
              name="image"
              onChange={this.handleImageChange}
            />
            <input type="submit" />
          </form>
        </div>
      </div>

    );
  }
}

export default Write;

Write.propTypes = {
  handle_write: PropTypes.func.isRequired
};