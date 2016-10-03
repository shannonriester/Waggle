import React from 'react';
import Dropzone from 'react-dropzone';

import store from '../store';
import ProfileInteractive from './ProfileInteractive';
import BackgroundSlider from './BackgroundSlider';
import UserRecentPlaces from './UserRecentPlaces';
import MyMatches from '../Components/MyMatches';

export default React.createClass({
  getInitialState: function() {
    return {
      session: store.session.toJSON(),
      editProfile: store.session.get('editProfile'),
      user: this.props.user,
      sentMatch: this.props.sentMatch,
      findingMatchStatus: this.props.findingMatchStatus,
      matched: this.props.matched,
      profilePicSrc: '',
      backgroundImgs: [],
    }
  },
  saveEdits: function(e) {
    e.preventDefault();
    let newBody = this.refs.aboutInfo.value;

    let userProfileUpdate = store.userCollection.get(this.state.user._id);

    userProfileUpdate.updateProfile(this.refs.file.files[0], newBody);
    store.session.updateProfile(this.refs.file.files[0], newBody);

    if (this.state.backgroundImgs.length > 0) {
      store.session.updateBkgrndImgs(this.state.backgroundImgs);
      userProfileUpdate.updateBkgrndImgs(this.state.backgroundImgs);
    }
  },
  onDrop: function(files) {
    this.setState({backgroundImgs: files});
  },
  editProfile: function(e) {
    e.preventDefault();
    store.session.set('editProfile', !store.session.get('editProfile'));
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
      sentMatch: newProps.sentMatch,
      profilePicSrc: newProps.user.profile.profilePic,
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
    let hidden;
    let editClickMe;
    let bkgrndImgForm;
    let myMatches;
    let hideMyMatches;

    if (!this.state.editProfile && this.state.user.username) {
      textareaBio = (<p className="about-bio">{this.state.user.profile.bio}</p>);
      styles = this.state.user.profile.profilePic;
      profilePicFile = null;

    } else if (this.state.editProfile && this.state.user.username) {
      styles = this.state.profilePicSrc;
      editClickMe = (<h4 className="edit-profile-click-me">Click to change...</h4>);
      hidden = 'none';

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
            {this.state.backgroundImgs.length > 0 ? <div className="upload-status-container">
                <h2>To be uploaded {this.state.backgroundImgs.length}...</h2>
                <div className="img-preview-container">{this.state.backgroundImgs.map((file, i) => <img className="background-img-preview" key={i} src={file.preview} />)}
                </div>
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
  }

  // console.log();
  // console.log(this.props.params);
  if (this.state.session.username === this.props.params) {
    myMatches = (<MyMatches myMatches={this.props.allMyMatches}/>);
  } else {
    hideMyMatches = 'none';
  }

    // console.log(this.state.user);
    return (
      <div className="profile-info-component">
        <div>
          <section className="header-profile-section">
            <BackgroundSlider profile={this.state.user.profile}/>
              {bkgrndImgForm}
            <div className="profile-pic-container">
              {profilePicFile}
              <section className="profile-pic-section">
                <div className="figure-container">
                  <figure className="profile-pic" style={{backgroundImage: `url(${styles})`}}>
                    {editClickMe}
                  </figure>
                  <figcaption className="profile-figcaption">
                  <ul className="profile-about-ul">
                    <li className="profile-about-li"><i className="about-user-icon fa fa-user" aria-hidden="true"></i> <p>{this.state.user.username}, {this.state.user.age}</p></li>
                    <li className="profile-about-li"><i className="about-user-icon fa fa-paw" aria-hidden="true"></i> <p>{this.state.user.dog.dogName}, {this.state.user.dog.dogBreed}</p></li>
                  </ul>
                  </figcaption>
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
            </div>
          </section>
          <div className="upper-profile-container">
            <section className="profile-main">
              <h2 className="about-heading">About {this.state.user.username}</h2>
              {textareaBio}
            </section>
            <section className="profile-footer" style={{display: hideMyMatches}}>
              <div className="matched-wagglrs">
                {myMatches}
              </div>
            </section>
          </div>
          <section className="profile-recent-places-container">
            <h2 className="h2-recent-places">Recent Places</h2>
            <ul className="ul-recent-places">
              <UserRecentPlaces recentPlaces={this.props.recentPlaces} />
            </ul>
          </section>
        </div>
      </div>
    );

  }
});
