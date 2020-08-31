import React, { Component } from "react";

import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import Meetings from "./Meetings";
import Register from "./Register";
import { Router } from "@reach/router";
import firebase from "./Firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "Trey",
    };
  }

  render() {
    return (
      <>
        <Navigation user={this.state.user} />
        {this.state.user && <Welcome user={this.state.user} />}
        <Router>
          <Login path="/login" user={this.state.user} />
          <Meetings path="/meetings" user={this.state.user} />
          <Register path="/register" user={this.state.user} />
          <Home path="/" user={this.state.user} />
        </Router>
      </>
    );
  }
}

export default App;
