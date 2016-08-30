import React from 'react';

import store from '../../store';

export default React.createClass({
  // getInitialState() {
  //   return {
  //     dogName: '',
  //     dogAge: '',
  //     dogBreed: '',
  //   }
  // },
  // updateRefs: function() {
  //   let dogName = this.refs.dogName.value;
  //   let dogAge = this.refs.dogAge.value;
  //   let dogBreed = this.refs.dogBreed.value;
  //
  //   this.setState({
  //     dogName: dogName,
  //     dogAge: dogAge,
  //     dogBreed: dogBreed,
  //   });
  // },
  signup2(e) {
    e.preventDefault();
    let dogName = this.refs.dogName.value;
    let dogAge = this.refs.dogAge.value;
    let dogBreed = this.refs.dogBreed.value;

    store.session.set('dog', {dogName: dogName, dogAge: dogAge, dogBreed: dogBreed});
    // store.session.set('dog', dogAge);
    // store.session.set('dog', dogBreed);

    this.props.signup2(dogName, dogAge, dogBreed);
    // this.setState({dogName: dogName, dogAge: dogAge, dogBreed: dogBreed});
  },
  componentDidMount: function() {
    this.refs.dogName.value = store.session.get('dog').dogName;
    this.refs.dogAge.value = store.session.get('dog').dogAge;
    this.refs.dogBreed.value = store.session.get('dog').dogBreed;
  },
  render() {
    return (
      <div>
        <form className="modal-body signup2" onSubmit={this.signup2}>
          <h3>Tell us about your dog</h3>
          <label htmlFor="input-dogName">Name</label>
          <input className="user-info-input signup-input" onChange={this.updateRefs} type="text"  placeholder="your dog's name" ref="dogName" role="textbox" tabIndex="1" />

          <label htmlFor="input-dogAge">Age</label>
          <input className="user-info-input signup-input" onChange={this.updateRefs} type="text"  placeholder="your dog's age" ref="dogAge" role="textbox" tabIndex="2" />

          <label htmlFor="input-dogBreed">Breed</label>
          <input className="user-info-input signup-input" onChange={this.updateRefs} type="text"  placeholder="what breed is your dog?" ref="dogBreed" role="textbox" tabIndex="3" />

          <input className="submit-btn" type="submit" />

        </form>
        <footer className="modal-footer signup-footer">
          <button className="modal-btn" role="button" tabIndex="4" onClick={this.signup2}>Next</button>
          <button className="modal-btn back-btn" role="button" tabIndex="4" onClick={this.props.back}>Back</button>
        </footer>
      </div>
    );
  }
});
