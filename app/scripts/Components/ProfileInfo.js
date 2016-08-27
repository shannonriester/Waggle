import React from 'react';
import Dropzone from 'react-dropzone';

import store from '../store';
import ProfileInteractive from './ProfileInteractive';
import BackgroundSlider from './BackgroundSlider';

export default React.createClass({
  getInitialState: function() {
    return {
      session: store.session.toJSON(),
      editProfile: store.session.get('editProfile'),
      user: this.props.user,
      sentMatch: this.props.sentMatch,
      findingMatchStatus: this.props.findingMatchStatus,
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
      console.log(this.state.files);
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
    console.log('in the editProfile function', store.session.get('editProfile'));
    e.preventDefault();
    store.session.set('editProfile', !store.session.get('editProfile'));
  },
  cancelEdit: function(e) {
    e.preventDefault();
    store.session.set('editProfile', false);
  },
  handleImgChange: function(e) {
    e.preventDefault();
    //use this.state.profilePicSrc for the preview
    //before the user decides to save/submit as the
    //new profile picture

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
      user: store.userCollection.toJSON(),
      editProfile: store.session.get('editProfile'),
  });
  },
  componentWillReceiveProps: function(newProps) {
    this.setState({
      user: newProps.user,
      matched: newProps.matched,
      sentMatch: newProps.sentMatch,
      profilePicSrc: newProps.user.profile.profilePic[0],
      findingMatchStatus: newProps.findingMatchStatus,
    });
  },
  componentDidMount: function() {
    store.session.on('change', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
  },
  render: function() {
    let content;
    let textareaBio;
    let profilePicFile;
    let styles;
    let previewStyles;
    let bkgrndImgForm;

    if (!this.state.editProfile && this.state.user.username) {
      styles = this.state.profilePicSrc;
      textareaBio = null;

      content = (
      <div>
        <section className="header-profile-section">
          <BackgroundSlider />
            {bkgrndImgForm}
          <div className="profile-pic-container">
            {profilePicFile}
            <div className="profile-pic-preview" style={{backgroundImage: `url(${styles})`}}></div>
            <section className="profile-pic-section">
              <figure className="profile-pic" style={{backgroundImage: `url(${styles})`}}></figure>
              <figcaption className="profile-figcaption">{this.state.user.username}</figcaption>
            </section>
          </div>
            <ProfileInteractive
              session={this.state.session}
              user={this.state.user}
              message={this.props.messageUser}
              findingMatchStatus={this.state.findingMatchStatus}
              toggleMatch={this.props.toggleMatch}
              sentMatch={this.state.sentMatch}
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
          {textareaBio}
          <p className="about-bio">{this.state.user.profile.bio}</p>
        </main>
      </div>);

    } else if (this.state.editProfile && this.state.user.username) {
    styles = this.state.profilePicSrc;
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

    textareaBio = (
      <form className="form-about" onSubmit={this.saveEdits}>
        <textarea  className="bio-textarea" defaultValue={this.state.user.profile.bio} tabIndex="1" role="textbox" ref="aboutInfo" />
        <input className="submit-btn" type="submit" value="submit" role="button" />
        <div className="edit-btn-container">
          <button className="submit-edits" onClick={this.saveEdits} tabIndex="3">submit</button>
          <button className="submit-edits" onClick={this.cancelEdit} tabIndex="4">cancel</button>
        </div>
      </form>);

    content = (
      <div>
        <section className="header-profile-section">
          <BackgroundSlider />
            {bkgrndImgForm}
          <div className="profile-pic-container">
            {profilePicFile}
            <div className="profile-pic-preview" style={{backgroundImage: `url(${styles})`}}></div>
            <section className="profile-pic-section">
              <figure className="profile-pic" style={{backgroundImage: `url(${styles})`}}></figure>
              <figcaption className="profile-figcaption">{this.state.user.username}</figcaption>
            </section>
          </div>
            <ProfileInteractive
              session={this.state.session}
              user={this.state.user}
              message={this.props.messageUser}
              findingMatchStatus={this.state.findingMatchStatus}
              toggleMatch={this.props.toggleMatch}
              sentMatch={this.state.sentMatch}
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
          {textareaBio}
          <p className="about-bio">{this.state.user.profile.bio}</p>
        </main>
      </div>);
  }

    return (
      <div className="profile-info-component">
        {content}
      </div>
    );

  }
});
