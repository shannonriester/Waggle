import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div className="app-component">
        {this.props.children}
      </div>
    );
  }
});
