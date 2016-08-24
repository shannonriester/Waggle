import React from 'react';
import Dropzone from 'react-dropzone';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      editProfile: store.session.get('editProfile'),
      profilePicSrc: [],
      files: [],
    }
  },
  saveEdits: function(e) {
    e.preventDefault();
    let newProfilePic = '/assets/default_dog_large';
      // if (this.props.refs.profilePic)
      console.log('profilePic BEFORE if statement', newProfilePic);
    let newBody = this.refs.aboutInfo.value;

    if (this.state.profilePicSrc[0] !== newProfilePic) {
        console.log('profilePic INSIDE if statement ', newProfilePic);
      newProfilePic = this.state.profilePicSrc;
    }
    if (this.state.files.length) {
      store.session.updateBkgrndImgs(this.state.files, newBody);
    }

    store.session.set('editProfile', false);
    store.session.updateProfile(newProfilePic, newBody);
  },
  onDrop: function(files) {
    files.forEach((file, i) => {
      let newReader = new FileReader();
      console.log(newReader);
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
    // this.refs.dropzone.open();
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
    this.setState({
      session: store.session.toJSON(),
      editProfile: store.session.get('editProfile'),
      users: store.userCollection.toJSON(),
  });
  },
  componentDidMount: function() {
    store.userCollection.fetch();
    store.session.on('change', this.updateState);
    store.userCollection.on('change update', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
    store.userCollection.off('change update', this.updateState);
  },
  render: function() {
    let bkgrndImgs;
    let profilePic;
    let profileBody;
    let editImages;
    let styles;

    let profilePicFile;

    let url = `${this.props.user.profile.profilePic}`;
    let profilePicUrl = {backgroundImage: 'url(' + url + ')'};

    if (this.props.user.bkgrndImgs.length) {
      styles = {backgroundImage: 'url(' + this.props.user.bkgrndImgs[0] + ')'};
    }
    if (!this.state.editProfile) {
        profileBody =(
          <p className="about-bio">
            {this.props.user.profile.bio}
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
          <textarea  className="bio-textarea" defaultValue={this.props.user.profile.bio} tabIndex="1" role="textbox" ref="aboutInfo" />
          <input className="submit-btn" type="submit" value="submit" role="button" />
          <div className="edit-btn-container">
            <button className="submit-edits" onClick={this.saveEdits} tabIndex="2">submit</button>
            <button className="submit-edits" onClick={this.cancelEdit} tabIndex="3">cancel</button>
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
            <li>{this.props.user.firstName}, {this.props.user.age}</li>
            <li>{this.props.user.dog.dogName}, {this.props.user.dog.dogAge}, {this.props.user.dog.dogBreed}</li>
            <li>{this.props.user.city}, {this.props.user.regionName}</li>
          </ul>
          {profileBody}
        </main>

      </div>
    );

  }
});
