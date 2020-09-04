import React, { Component } from "react";

import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import Meetings from "./Meetings";
import Register from "./Register";
import { Router, navigate } from "@reach/router";
import firebase from "./Firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((FbUser) => {
      if (FbUser) {
        this.setState({
          user: FbUser,
          displayName: FbUser.displayName,
          userID: FbUser.uid,
        });
        const meetingsRef = firebase.database().ref("meetings/" + FbUser.uid);

        meetingsRef.on("value", (snapshot) => {
          let meetings = snapshot.val();
          let meetingsList = [];
          for (let item in meetings) {
            meetingsList.push({
              meetingId: item,
              meetingName: meetings[item].meetingName,
            });
          }
          this.setState({
            meetings: meetingsList,
            howManyMeetings: meetingsList.length,
          });
        });
      } else {
        this.setState({ user: null });
      }
    });
  }

  registerUser = (userName) => {
    firebase.auth().onAuthStateChanged((FbUser) => {
      FbUser.updateProfile({
        displayName: userName,
      }).then(() => {
        this.setState({
          user: FbUser,
          displayName: FbUser.displayName,
          userID: FbUser.uid,
        });
        navigate("/meetings");
      });
    });
  };

  logoutUser = (e) => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null,
    });
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  addMeeting = (meetingName) => {
    const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);
    ref.push({ meetingName: meetingName });
  };

  render() {
    return (
      <>
        <Navigation user={this.state.user} logoutUser={this.logoutUser} />
        {this.state.user && (
          <Welcome
            userName={this.state.displayName}
            logoutUser={this.logoutUser}
          />
        )}
        <Router>
          <Login path="/login" user={this.state.user} />
          <Meetings
            path="/meetings"
            user={this.state.user}
            meetings={this.state.meetings}
            addMeeting={this.addMeeting}
          />
          <Register
            path="/register"
            registerUser={this.registerUser}
            user={this.state.user}
          />
          <Home path="/" user={this.state.user} />
        </Router>
      </>
    );
  }
}

export default App;
