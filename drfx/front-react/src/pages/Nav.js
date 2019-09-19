import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  const logged_out_nav = (
    <ul>
      <span onClick={() => props.display_form('login')}>login</span><br />
      <span onClick={() => props.display_form('signup')}>signup</span>
    </ul>
  );

  const logged_in_nav = (
    <ul>
      <span onClick={props.handle_logout}>logout</span>
    </ul>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}



Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};

export default Nav;