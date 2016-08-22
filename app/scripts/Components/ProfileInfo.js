import React from 'react';
import Dropzone from 'react-dropzone';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      editing: store.session.get('isEditing'),
      profilePicSrc: [],
      files: [],
    }
  },
  saveEdits: function(e) {
    e.preventDefault();
    let newProfilePic = '/assets/default_dog_large.png';

    if (this.state.profilePicSrc[0]) {
      newProfilePic = this.state.profilePicSrc;
      console.log(newProfilePic);
    }
    // console.log(newProfilePic);
    let newUserName = this.refs.userInfoName.value;
    let newUserAge = this.refs.userInfoAge.value;
    let newDogName = this.refs.dogInfoName.value;
    let newDogAge = this.refs.dogInfoAge.value;
    let newDogBreed = this.refs.dogInfoBreed.value;
    let newAboutInfo = this.refs.aboutInfo.value;

    store.session.updateProfile(newProfilePic, newUserName, newUserAge, newDogName, newDogAge, newDogBreed, newAboutInfo);

    // console.log(this.state.files);
    if (this.state.files) {
    //   this.state.files.forEach((file, i) => {
    //     console.log(file);
        store.session.updateBkgrndImgs(this.state.files);
      // });
    }
    // store.session.set('isEditing', false);
  },
  onDrop: function(files) {
    // this.setState({files: files});
    // console.log(files);
    // let newFilesArr = [];
    // let adjustedFileData = files.map((file, i) => {
    //   let newFile = {
    //     lastModified: file.lastModified,
    //     lastModifiedDate: file.lastModifiedDate,
    //     name: file.name,
    //     size: file.size,
    //     type: file.type,
    //     webkitRelativePath: "",
    //   }
    //   return newFile;
    // });
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
  onOpenClick: function() {
    // this.refs.dropzone.open();
  },
  handleImgChange: function(e) {
    e.preventDefault();
    let file = this.refs.file.files[0];
    // console.log(file);
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
    store.userCollection.fetch();
    this.setState({
      session: store.session.toJSON(),
      editing: store.session.get('isEditing'),
      users: store.userCollection.toJSON(),
  });
  },
  componentDidMount: function() {
    store.session.on('change', this.updateState);
    store.userCollection.once('change update', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
    store.userCollection.off('change update', this.updateState);
  },
  render: function() {
    let content;
    let url = `${this.props.user.profile.profilePic}`;
    let styles = {backgroundImage: 'url(' + url + ')'};
    let backgroundImage;

    if (this.props.user.bkgrndImgs[0]) {
      backgroundImage = {backgroundImage: 'url(' + this.props.user.bkgrndImgs[0] + ')'};
    }

    if (!this.state.editing) {
      content =(
        <div>
          <form className="profile-about-data">
          <div className="profile-background-images" style={backgroundImage}>
          <figure className="profile-pic" style={styles}></figure>
          </div>
            <ul className="ul-about-data">
              <li>{this.props.user.profile.usersName}, {this.props.user.profile.usersAge}</li>
              <li>{this.props.user.dog.dogName}, {this.props.user.dog.dogAge}, {this.props.user.dog.breed}</li>
              <li>{this.props.user.city}, {this.props.user.regionName}</li>
            </ul>

            <p className="about-bio">
              {this.props.user.profile.bio}
            </p>
          </form>
        </div>
      );
    } else if (this.state.editing) {
      // console.log(this.state.profilePicSrc);
        content = (
          <div className="profile-info-component">
          <form  className="profile-image-form" onSubmit={this.handleImgChange}>
            <input
              type="file"
              name="user[profilePic]"
              ref="file"
              accept="image/*"
              onChange={this.handleImgChange} />
          </form>

          <form className="profile-about-data" onSubmit={this.saveEdits}>
          <figure className={this.state.profilePicSrc ? "profile-pic" : "default-profile-pic"} style={styles}></figure>
          <div className="dropzone-container">
            <Dropzone className="dropzone" ref="dropzone" onDrop={this.onDrop}>

            </Dropzone>
            <button type="button" onClick={this.onOpenClick}>
                    Open Dropzone
            </button>

            {this.state.files.length > 0 ? <div>
                <h2>Uploading {this.state.files.length} files...</h2>
                <div>{this.state.files.map((file, i) => <img key={i} src={file.preview} /> )}</div>
                </div> : null}

          </div>
          <img src={this.state.profilePicSrc} />

            <ul className="ul-about-data">
              <li>
                <label>user's name</label><input type="text" defaultValue={this.props.user.profile.usersName} tabIndex="1" role="textbox" ref="userInfoName" />
                <label>user's age</label><input type="text" defaultValue={this.props.user.profile.usersAge} tabIndex="2" role="textbox" ref="userInfoAge" />
              </li>

              <li>
                <label>dog name</label><input type="text" defaultValue={this.props.user.dog.dogName} tabIndex="3" role="textbox" ref="dogInfoName" />
                <label>dog age</label><input type="text" defaultValue={this.props.user.dog.dogAge} tabIndex="4" role="textbox" ref="dogInfoAge" />
                <label>dog breed</label><input type="text" defaultValue={this.props.user.dog.dogBreed} tabIndex="5" role="textbox" ref="dogInfoBreed" />
              </li>
            </ul>

            <textarea  className="about-bio" defaultValue={this.props.user.profile.bio} tabIndex="6" role="textbox" ref="aboutInfo" />

            <input type="submit" value="submit" role="button" />
            <button onClick={this.saveEdits} tabIndex="7">done</button>
          </form>
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
