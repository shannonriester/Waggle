import React from 'react';
import Dropzone from 'react-dropzone';

import store from '../store';
import ProfileInteractive from './ProfileInteractive';

export default React.createClass({
  getInitialState: function() {
    return {
      session: store.session.toJSON(),
      editProfile: store.session.get('editProfile'),
      user: this.props.user,
      matched: this.props.matched,
      profilePicSrc: [],
      files: [],
    }
  },
  saveEdits: function(e) {
    e.preventDefault();
    let newBody = this.refs.aboutInfo.value;
      let newProfilePic = this.state.profilePicSrc;
      let userProfileUpdate = store.userCollection.get(this.state.user._id);

    if (this.state.files.length) {
      userProfileUpdate.updateProfile(newProfilePic, newBody)
    }
    userProfileUpdate.updateProfile(newProfilePic, newBody)
    store.session.updateProfile(newProfilePic, newBody);
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
  editProfile: function(e) {
    e.preventDefault();
    store.session.set('editProfile', true);
  },
  cancelEdit: function(e) {
    e.preventDefault();
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
    this.setState({
      session: store.session.toJSON(),
      editProfile: store.session.get('editProfile'),
  });
  },
  componentWillReceiveProps: function(newProps) {
    this.setState({
      user: newProps.user,
      matched: newProps.matched,
    });
  },
  componentDidMount: function() {
    store.session.on('change', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
  },
  render: function() {
    let profileBody;
    let profilePicFile;
    let styles;
    let bkgrndImgForm;

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

      bkgrndImgForm = (
        <form  className="profile-image-form" onSubmit={this.onDrop}>

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
        <section className="header-section-prof-info">
          <div className="profile-background-images" style={styles}>
            {bkgrndImgForm}
          </div>
          <div className="profile-pic-container">
            {profilePicFile}
            <div className="profile-pic-preview" style={{backgroundImage: `url(${this.state.profilePicSrc})`}}></div>
            <figure className="profile-pic" style={{backgroundImage: `url(${this.state.user.profile.profilePic})`}}></figure>
          </div>
            <ProfileInteractive
              session={this.state.session}
              user={this.state.user}
              message={this.props.messageUser}
              toggleMatch={this.props.toggleMatch}
              matched={this.state.matched}
              editProfile={this.editProfile}
            />
        </section>

        <main className="profile-main">
          <ul className="ul-about-data">
            <li>
              <i className="about-user-icon fa fa-user" aria-hidden="true"></i> {this.state.user.firstName}, {this.state.user.age}
            </li>
            <li>
              <i className="about-user-icon fa fa-paw" aria-hidden="true"></i> {this.state.user.dog.dogName}, {this.state.user.dog.dogAge}, {this.state.user.dog.dogBreed}
            </li>
            <li>
              <i className="about-user-icon fa fa-globe" aria-hidden="true"></i> {this.state.user.city}, {this.state.user.regionName}
            </li>
          </ul>
          {profileBody}
        </main>

      </div>
    );

  }
});
