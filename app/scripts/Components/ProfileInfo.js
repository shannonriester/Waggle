import React from 'react';
import Dropzone from 'react-dropzone';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      editProfile: store.session.get('editProfile'),
      session: store.session.toJSON(),
      user: this.props.user,
      profilePicSrc: [],
      files: [],
    }
  },
  saveEdits: function(e) {
    e.preventDefault();
    let newProfilePic = '/assets/default_dog_large';
      // console.log('profilePic BEFORE if statement', newProfilePic);
    let newBody = this.refs.aboutInfo.value;

    if (this.state.profilePicSrc[0] !== newProfilePic) {
        // console.log('profilePic INSIDE if statement ', newProfilePic);
      newProfilePic = this.state.profilePicSrc;
    }
    if (this.state.files.length) {
      store.session.updateBkgrndImgs(this.state.files, newBody);
    }

    let userProfileUpdate = store.userCollection.get(this.state.user._id);
    userProfileUpdate.updateProfile(newProfilePic, newBody)
    store.session.updateProfile(newProfilePic, newBody);


    // this.props.updateUsers();

    // console.log(this.props);
    // console.log(store.userCollection);
  },
  onDrop: function(files) {
    files.forEach((file, i) => {
      let newReader = new FileReader();
      let url = newReader.readAsDataURL(file);
      newReader.onloadend = function (e) {
         this.setState({
             files: [newReader.result]
         })
       }.bind(this);
    });
  },
  cancelEdit: function() {
    store.session.set('editProfile', false);
  },
  handleImgChange: function(e) {
    e.preventDefault();
    let file = this.refs.file.files[0];
    let reader = new FileReader();
    let url = reader.readAsDataURL(file);
   reader.onloadend = function (e) {
      this.setState({
          profilePicSrc: [reader.result]
      })
    }.bind(this);
      reader.readAsDataURL(file);
  },
  updateState: function() {
    // store.userCollection.fetch();
    this.setState({
      session: store.session.toJSON(),
      // users: store.userCollection.toJSON(),
      editProfile: store.session.get('editProfile'),
  });
  },
  componentWillReceiveProps: function(newProps) {
    // console.log('new props', newProps);
    this.setState({user: newProps.user});
  },
  componentDidMount: function() {
    // store.userCollection.fetch();
    store.session.on('change', this.updateState);
    // store.userCollection.on('change update', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
    // store.userCollection.off('change update', this.updateState);
  },
  render: function() {
    // console.log(this.state.user);
    let bkgrndImgs;
    let profilePic;
    let profileBody;
    let editImages;
    let styles;

    let profilePicFile;

    let url = `${this.state.user.profile.profilePic}`;
    let profilePicUrl = {backgroundImage: 'url(' + url + ')'};

    if (this.state.user.bkgrndImgs.length) {
      styles = {backgroundImage: 'url(' + this.state.user.bkgrndImgs[0] + ')'};
    }
    if (!this.state.editProfile) {
        profileBody =(
          <p className="about-bio">
            {this.state.user.profile.bio}
          </p>);
    } else if (this.state.editProfile) {
      profilePicFile = (
          <input className="input-file"
            type="file"
            name="user[profilePic]"
            ref="file"
            accept="image/*"
            onChange={this.handleImgChange} />);

        bkgrndImgs = (
          <form  className="profile-image-form" onSubmit={this.onDrop}>
            <img className="profile-pic-preview" src={this.state.profilePicSrc}/>
            <div className="dropzone-container">
              <Dropzone className="dropzone" ref="dropzone" onDrop={this.onDrop} onClick={this.onOpenClick}>
                <i className="icon-camera fa fa-camera-retro" aria-hidden="true"></i>
              </Dropzone>
              {this.state.files.length > 0 ? <div className="upload-status-container">
                  <h2>Uploading {this.state.files.length} file(s)...</h2>
                  <div>{this.state.files.map((file, i) => <img key={i} src={file.preview} /> )}</div>
                  </div> : null}
            </div>
          </form>);

      profileBody = (
        <form className="form-about" onSubmit={this.saveEdits}>
          <textarea  className="bio-textarea" defaultValue={this.state.user.profile.bio} tabIndex="1" role="textbox" ref="aboutInfo" />
          <input className="submit-btn" type="submit" value="submit" role="button" />
          <div className="edit-btn-container">
            <button className="submit-edits" onClick={this.saveEdits} tabIndex="3">submit</button>
            <button className="submit-edits" onClick={this.cancelEdit} tabIndex="4">cancel</button>
          </div>
        </form>);
    }
    return (
      <div className="profile-info-component">
        <header>
          <div className="profile-background-images" style={styles}>
            {bkgrndImgs}
            <div className="profile-pic-container">
              {profilePicFile}
              <figure className="profile-pic" style={profilePicUrl}></figure>
            </div>

          </div>
        </header>

        <main className="profile-main">
          <ul className="ul-about-data">
            <li>{this.state.user.firstName}, {this.state.user.age}</li>
            <li>{this.state.user.dog.dogName}, {this.state.user.dog.dogAge}, {this.state.user.dog.dogBreed}</li>
            <li>{this.state.user.city}, {this.state.user.regionName}</li>
          </ul>
          {profileBody}
        </main>

      </div>
    );

  }
});
