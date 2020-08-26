import React, { Component } from "react";

import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import { Router } from "@reach/router";

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
          <Home path="/" user={this.state.user} />
        </Router>
      </>
    );
  }
}

export default App;
