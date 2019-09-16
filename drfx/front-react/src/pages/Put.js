import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Put extends React.Component {
  state = {};
  handle_change = e => {
    let title = e.target.title;
    let content = e.target.content;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[title] = title;
      newState[content] = content;
      return newState;
    });
  };
  render() {
    return (
      <div>
          <h1>수정 페이지</h1>
          <div>
          <h3>게시물수정 </h3>
          <form onSubmit={e => this.props.handle_put(e, this.state)}>
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

export default Put;

Put.propTypes = {
    handle_put: PropTypes.func.isRequired
  };