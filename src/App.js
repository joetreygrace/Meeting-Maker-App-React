import React, { Component } from "react";

import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";

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
        <Home user={this.state.user} />
      </>
    );
  }
}

export default App;
