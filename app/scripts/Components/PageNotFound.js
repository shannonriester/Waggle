import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div className="page-not-found-component">
        <h1>Lost page...</h1>
        <div className="lost-background" style={{backgroundImage:`url(/assets/Lost-Dog-Awareness.png)`}}></div>
        <Link className="link" to="/"><h2>Homeward Bound!</h2></Link>
      </div>
    );
  }
});
