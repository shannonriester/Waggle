import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      dogName: undefined,
      dogAge: undefined,
      dogBreed: undefined,
    }
  },
  signup2(e) {
    e.preventDefault();
    let dogName = this.refs.dogName.value;
    let dogAge = this.refs.dogAge.value;
    let dogBreed = this.refs.dogBreed.value;
    this.props.signup2(dogName, dogAge, dogBreed);
    this.setState({dogName: dogName, dogAge: dogAge, dogBreed: dogBreed});
  },
  render() {
    return (
      <form className="modal-body signup2" onSubmit={this.signup2}>
        <h3>Tell us about your dog</h3>
        <label htmlFor="input-dogName">Name</label>
        <input className="user-info-input" type="text" value={this.state.dogName} placeholder="your dog's name" ref="dogName" role="textbox" tabIndex="1" />

        <label htmlFor="input-dogAge">Age</label>
        <input className="user-info-input" type="text" value={this.state.dogAge} placeholder="your dog's age" ref="dogAge" role="textbox" tabIndex="2" />

        <label htmlFor="input-dogBreed">Breed</label>
        <input className="user-info-input" type="text" value={this.state.dogBreed} placeholder="what breed is your dog?" ref="dogBreed" role="textbox" tabIndex="3" />

        <input className="submit-btn" type="submit" value="submit" role="button" onSubmit={this.signup2} />
      </form>
    );
  }
});
