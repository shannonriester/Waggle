import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <nav className="nav-component">
          <ul>
            <li>
              <i className="nav-icon fa fa-user" aria-hidden="true"></i>
            </li>
            <li>
              <img className="nav-icon" src="../../assets/bone.svg" alt="image of a cute dog-bone" role="button"/>
            </li>
          </ul>
        </nav>
      );
    }
});
