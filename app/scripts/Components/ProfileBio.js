import React from 'react';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      editing: store.session.get('isEditing'),
    }
  },
  updateEdits: function(e) {
    e.preventDefault();
    let userInfo = this.refs.userInfo.value
    let dogInfo = this.refs.dogInfo.value
    let locationInfo = this.refs.locationInfo.value
    let aboutInfo = this.refs.aboutInfo.value
    // store.session.updateEdits(userInfo, dogInfo, locationInfo, aboutInfo);
  },
  updateState: function() {
    this.setState({editing: store.session.get('isEditing')});
    console.log('updateState state', this.state.editing);
  },
  componentDidMount: function() {
    console.log('componentDidMount state', this.state.editing);
    this.setState({editing: store.session.get('isEditing')});
    store.session.on('change', this.updateState);
  },
  componentWillUnmount: function() {
    this.props.state.off('change', this.updateState);
  },
  render: function() {
    console.log(this.state.editing);
    let content;
    if (!this.state.editing) {
      content =(
        <div>
          <form className="profile-about-data">
            <ul className="ul-about-data">
              <li>Shannon, 28</li>
              <li>Auggie, 4</li>
              <li>Austin, 3 miles away</li>
            </ul>
          </form>
          <p className="about-bio">
            Hi I'm shannon and I like puppies and my dog is SO cute! His name is Auggie and he's a German-shepherd!
          </p>
        </div>
      );
    } else if (this.state.editing) {
        content = (
          <div>
            <form className="profile-about-data" onSubmit={this.updateEdits}>
              <ul className="ul-about-data">
                <li><label>Name, age</label><input type="text" value="Shannon, 28" tabIndex="1" role="textbox" ref="userInfo" /> </li>
                <li><input type="text" value="Auggie, 4" tabIndex="2" role="textbox" ref="dogInfo" /></li>
                <li><input type="text" value="Austin, 3 miles away" tabIndex="3" role="textbox" ref="locationInfo" /></li>
              </ul>
              <input type="submit" value="submit" role="button" onSubmit={this.updateEdits}/>
              <button onClick={this.updateEdits}>done</button>
            </form>
            <p className="about-bio">
              <input type="text" value="Hi I'm shannon and I like puppies and my dog is SO cute! His name is Auggie and he's a German-shepherd!" tabIndex="4" role="textbox" ref="aboutInfo"/>
            </p>
          </div>
      );

    }
    return (
      <main className="profile-main">
        {content}
      </main>
    );

  }
});
