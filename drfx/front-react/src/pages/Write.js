import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Write extends React.Component {
  state = {
    title: '',
    content: ''
  };
  handle_change = e => {
    const title = e.target.title
    const content = e.target.content
    this.setState({
      title: title,
      content: content
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
              type="text"
              name="title"
              onChange={this.handle_change}
            />
            <label htmlFor="content">content</label>
            <input
              type="text"
              name="content"
              onChange={this.handle_change}
            />
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